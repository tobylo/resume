// Client side of /api/analyze: sends the job ad and sorts the answer into what the
// dialog shows next. The limits mirror the endpoint's; the server stays the authority.

import type {
	AnalyzeErrorResponse,
	AnalyzeRequest,
	AnalyzeResponse,
	FitAnalysis,
	OverallFit
} from './types.ts';

export const MIN_CHARS = 50;
export const MAX_CHARS = 10000;

/** What went wrong, as the dialog groups it. */
export type Failure =
	| { kind: 'not-a-job-ad' }
	/** Any other input the server refused, with its message. */
	| { kind: 'invalid'; message: string }
	| { kind: 'rate-limited' }
	| { kind: 'verification' }
	/** The model, the server or the network. */
	| { kind: 'failed' };

/** Failures that replace the input with an error state; the rest show under the box. */
export type ErrorKind = Exclude<Failure['kind'], 'not-a-job-ad' | 'invalid'>;

export type Outcome = { ok: true; analysis: FitAnalysis } | ({ ok: false } & Failure);

function failureFor(body: AnalyzeErrorResponse): Failure {
	switch (body.code) {
		case 'NOT_A_JOB_AD':
			return { kind: 'not-a-job-ad' };
		case 'VALIDATION_ERROR':
			return { kind: 'invalid', message: body.error };
		case 'RATE_LIMITED':
			return { kind: 'rate-limited' };
		case 'CAPTCHA_FAILED':
			return { kind: 'verification' };
		default:
			return { kind: 'failed' };
	}
}

const FITS: readonly unknown[] = ['strong', 'partial', 'not-ideal'] satisfies OverallFit[];

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

// Enough of the shape that the report can render it; the endpoint validates the rest.
function isAnalysis(value: unknown): value is FitAnalysis {
	return (
		isObject(value) &&
		FITS.includes(value.overallFit) &&
		typeof value.overallSummary === 'string' &&
		Array.isArray(value.strengths) &&
		Array.isArray(value.gaps)
	);
}

function isResponse(body: unknown): body is AnalyzeResponse | AnalyzeErrorResponse {
	if (!isObject(body)) return false;
	if (body.success === true) return isAnalysis(body.analysis);
	return body.success === false && typeof body.code === 'string' && typeof body.error === 'string';
}

/**
 * Posts the job ad. Resolves with the report or a failure; rejects only when `signal`
 * aborts, so the caller can tell "closed" from "failed".
 */
export async function analyze(request: AnalyzeRequest, signal: AbortSignal): Promise<Outcome> {
	let body: unknown;
	try {
		const response = await fetch('/api/analyze', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
			signal
		});
		body = await response.json();
	} catch (err) {
		if (signal.aborted) throw err;
		return { ok: false, kind: 'failed' };
	}

	if (!isResponse(body)) return { ok: false, kind: 'failed' };
	if (body.success) return { ok: true, analysis: body.analysis };
	return { ok: false, ...failureFor(body) };
}
