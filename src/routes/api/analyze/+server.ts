import type { RequestHandler } from './$types';
import type {
	AnalyzeRequest,
	AnalyzeResponse,
	AnalyzeErrorResponse,
	FitAnalysis
} from '$lib/job-fit/types';
import { buildSystemPrompt } from '$lib/job-fit/prompt';
import { resumeContext } from '$lib/job-fit/resume-data';
import Anthropic from '@anthropic-ai/sdk';

const MIN_CHARS = 50;
const MAX_CHARS = 10000;
const MAX_BODY_SIZE = 20000;
const MAX_TOKEN_LENGTH = 2048;
const RATE_LIMIT = 5;
const JOB_KEYWORDS = [
	'role',
	'responsibilities',
	'requirements',
	'experience',
	'skills',
	'qualifications',
	'position',
	'candidate',
	'team',
	'company'
];
const MIN_KEYWORD_MATCHES = 2;

function errorResponse(
	status: number,
	error: string,
	code: AnalyzeErrorResponse['code']
): Response {
	return new Response(
		JSON.stringify({ success: false, error, code } satisfies AnalyzeErrorResponse),
		{
			status,
			headers: { 'Content-Type': 'application/json' }
		}
	);
}

function successResponse(analysis: FitAnalysis): Response {
	return new Response(JSON.stringify({ success: true, analysis } satisfies AnalyzeResponse), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ secret, response: token, remoteip: ip })
		});
		const result = (await response.json()) as {
			success: boolean;
			hostname?: string;
			'error-codes'?: string[];
		};
		if (!result.success) {
			console.error('Turnstile verification failed:', result['error-codes']);
			return false;
		}
		return true;
	} catch (err) {
		console.error('Turnstile siteverify request failed:', err);
		return false;
	}
}

async function checkRateLimit(kv: App.Platform['env']['KV'], ip: string): Promise<boolean> {
	const now = Date.now();
	const currentHour = Math.floor(now / 3600000);
	const prevHour = currentHour - 1;
	const elapsed = (now % 3600000) / 3600000;

	const currentKey = `rate:${ip}:${currentHour}`;
	const prevKey = `rate:${ip}:${prevHour}`;

	const [currentVal, prevVal] = await Promise.all([kv.get(currentKey), kv.get(prevKey)]);
	const currentCount = parseInt(currentVal ?? '0');
	const prevCount = parseInt(prevVal ?? '0');

	// Sliding window approximation: weight previous window by remaining fraction
	const weightedCount = prevCount * (1 - elapsed) + currentCount;
	if (weightedCount >= RATE_LIMIT) return false;

	await kv.put(currentKey, String(currentCount + 1), { expirationTtl: 7200 });
	return true;
}

function validateJobDescription(text: string): string | null {
	if (text.length < MIN_CHARS) {
		return `Job description must be at least ${MIN_CHARS} characters`;
	}
	if (text.length > MAX_CHARS) {
		return 'Job description is too long (max 10,000 characters)';
	}
	const lowerText = text.toLowerCase();
	const matches = JOB_KEYWORDS.filter((kw) => lowerText.includes(kw));
	if (matches.length < MIN_KEYWORD_MATCHES) {
		return 'This does not appear to be a job description. Please paste a job listing that includes role details, requirements, or qualifications.';
	}
	return null;
}

function isValidFitAnalysis(data: unknown): data is FitAnalysis {
	if (!data || typeof data !== 'object') return false;
	const obj = data as Record<string, unknown>;
	if (!['strong', 'partial', 'not-ideal'].includes(obj.overallFit as string)) return false;
	if (typeof obj.overallSummary !== 'string' || obj.overallSummary.length > 500) return false;
	if (!Array.isArray(obj.strengths) || obj.strengths.length === 0) return false;
	if (!Array.isArray(obj.gaps)) return false;
	// Validate strengths have resumeReferences with length limits
	for (const s of obj.strengths) {
		if (!s || typeof s !== 'object') return false;
		if (typeof s.title !== 'string' || s.title.length > 200) return false;
		if (typeof s.description !== 'string' || s.description.length > 1000) return false;
		if (!Array.isArray(s.resumeReferences)) return false;
		if (!s.resumeReferences.every((r: unknown) => typeof r === 'string' && r.length <= 200))
			return false;
	}
	// Validate gaps with length limits
	for (const g of obj.gaps) {
		if (!g || typeof g !== 'object') return false;
		if (typeof g.title !== 'string' || g.title.length > 200) return false;
		if (typeof g.description !== 'string' || g.description.length > 1000) return false;
		if (
			g.mitigation !== undefined &&
			(typeof g.mitigation !== 'string' || g.mitigation.length > 500)
		)
			return false;
	}
	return true;
}

function countResumeReferences(analysis: FitAnalysis): number {
	return analysis.strengths.reduce((sum, s) => sum + s.resumeReferences.length, 0);
}

async function callLLM(
	apiKey: string,
	jobDescription: string,
	attempt: number = 1
): Promise<FitAnalysis> {
	const client = new Anthropic({ apiKey });
	const systemPrompt = buildSystemPrompt(resumeContext);

	const message = await client.messages.create({
		model: 'claude-sonnet-4-5-20250514',
		max_tokens: 2048,
		system: systemPrompt,
		messages: [{ role: 'user', content: jobDescription }]
	});

	const textContent = message.content.find((c) => c.type === 'text');
	if (!textContent || textContent.type !== 'text') {
		throw new Error('No text content in LLM response');
	}

	let parsed: unknown;
	try {
		// Strip markdown code fences if present
		let text = textContent.text.trim();
		if (text.startsWith('```')) {
			text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
		}
		parsed = JSON.parse(text);
	} catch {
		throw new Error('Failed to parse LLM response as JSON');
	}

	if (!isValidFitAnalysis(parsed)) {
		throw new Error('LLM response does not match expected schema');
	}

	// SC-003: Verify at least 3 resume references
	if (countResumeReferences(parsed) < 3 && attempt === 1) {
		return callLLM(apiKey, jobDescription, 2);
	}

	return parsed;
}

export const POST: RequestHandler = async ({ request, platform }) => {
	if (!platform?.env) {
		return errorResponse(500, 'Server configuration error', 'INTERNAL_ERROR');
	}

	const { KV, ANTHROPIC_API_KEY, TURNSTILE_SECRET_KEY } = platform.env;

	// Enforce request body size limit
	const contentLength = parseInt(request.headers.get('content-length') ?? '0');
	if (contentLength > MAX_BODY_SIZE) {
		return errorResponse(413, 'Request body too large', 'VALIDATION_ERROR');
	}

	// Parse request body
	let body: AnalyzeRequest;
	try {
		body = await request.json();
	} catch {
		return errorResponse(400, 'Invalid request body', 'VALIDATION_ERROR');
	}

	const { jobDescription, turnstileToken } = body;

	if (!jobDescription || typeof jobDescription !== 'string') {
		return errorResponse(400, 'Job description is required', 'VALIDATION_ERROR');
	}

	if (!turnstileToken || typeof turnstileToken !== 'string') {
		return errorResponse(400, 'CAPTCHA token is required', 'VALIDATION_ERROR');
	}

	// Validate turnstile token length
	if (turnstileToken.length > MAX_TOKEN_LENGTH) {
		return errorResponse(400, 'Invalid CAPTCHA token', 'VALIDATION_ERROR');
	}

	// Input validation
	const validationError = validateJobDescription(jobDescription);
	if (validationError) {
		return errorResponse(400, validationError, 'VALIDATION_ERROR');
	}

	// Turnstile verification
	const ip = request.headers.get('cf-connecting-ip') ?? '127.0.0.1';
	const turnstileValid = await verifyTurnstile(turnstileToken, TURNSTILE_SECRET_KEY, ip);
	if (!turnstileValid) {
		return errorResponse(403, 'CAPTCHA verification failed. Please try again.', 'CAPTCHA_FAILED');
	}

	// Rate limiting (sliding window)
	const allowed = await checkRateLimit(KV, ip);
	if (!allowed) {
		return errorResponse(429, 'Rate limit exceeded. Please try again in an hour.', 'RATE_LIMITED');
	}

	// Claude API call + response parsing
	try {
		const analysis = await callLLM(ANTHROPIC_API_KEY, jobDescription);
		return successResponse(analysis);
	} catch {
		return errorResponse(500, "Analysis couldn't be completed. Please try again.", 'LLM_ERROR');
	}
};
