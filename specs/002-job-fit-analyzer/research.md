# Research: Job Fit Analyzer

**Feature**: 002-job-fit-analyzer
**Date**: 2026-02-05

## Research Questions & Decisions

### 1. Hosting Architecture for Server-Side LLM Calls

**Decision**: Cloudflare Pages with Functions (via adapter-cloudflare)

**Rationale**:

- SvelteKit has built-in support via `@sveltejs/adapter-cloudflare`
- Minimal migration from current `adapter-static`
- 100,000 function invocations/month on free tier (sufficient for portfolio)
- Seamless KV bindings for rate limiting
- Zero cold-start on edge network
- All services in one ecosystem (Pages, KV, Turnstile)

**Alternatives Considered**:
| Option | Rejected Because |
|--------|------------------|
| Vercel Serverless | 10s timeout (LLM may exceed), separate ecosystem |
| Separate API (Workers) | Extra infrastructure, CORS complexity |
| Keep static + client-side | Cannot secure API keys client-side |

### 2. LLM Provider Selection

**Decision**: Anthropic Claude API (claude-3-haiku or claude-3-sonnet)

**Rationale**:

- Best quality for nuanced job fit analysis
- Cost-effective: ~$0.0001-0.001 per analysis at expected volume
- Excellent TypeScript SDK (`@anthropic-ai/sdk`)
- System prompts reliably constrain output to job-fit-only responses
- Works in Cloudflare Workers/Pages Functions environment

**Alternatives Considered**:
| Option | Rejected Because |
|--------|------------------|
| OpenAI GPT-4 | Higher cost, less consistent structured output |
| Cloudflare Workers AI | Smaller models, less nuanced analysis |
| Local/self-hosted | Complexity, hosting cost, latency |

**Model Choice**:

- **claude-3-haiku**: Fast (1-3s), cheapest, good for simple analysis
- **claude-3-sonnet**: Better quality (5-10s), moderate cost - **Recommended for job fit**

### 3. CAPTCHA Solution

**Decision**: Cloudflare Turnstile

**Rationale**:

- Free forever with no traffic limits
- Privacy-focused (non-interactive by default)
- Native Cloudflare ecosystem integration
- Simple server-side validation API
- No user friction (invisible challenge)

**Alternatives Considered**:
| Option | Rejected Because |
|--------|------------------|
| reCAPTCHA v3 | Privacy concerns (Google tracking) |
| hCaptcha | More friction for users, separate ecosystem |
| No CAPTCHA | Abuse risk, violates FR-012 requirement |

**Implementation**:

```html
<!-- Client-side widget -->
<div class="cf-turnstile" data-sitekey="{PUBLIC_TURNSTILE_SITE_KEY}"></div>
```

```typescript
// Server-side validation
const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
	method: 'POST',
	body: JSON.stringify({
		secret: env.TURNSTILE_SECRET_KEY,
		response: turnstileToken
	})
});
```

### 4. Rate Limiting Approach

**Decision**: Cloudflare KV with per-IP hourly counter

**Rationale**:

- Included in Pages free tier (3M reads, 600K writes/month)
- Distributed across all edge locations
- Automatic TTL cleanup (no manual expiration management)
- Simple implementation pattern
- No additional billing concerns

**Implementation Pattern**:

```typescript
const ip = request.headers.get('cf-connecting-ip');
const hourKey = `rate:${ip}:${Math.floor(Date.now() / 3600000)}`;
const count = parseInt((await env.KV.get(hourKey)) || '0');

if (count >= 5) {
	return new Response('Rate limited', { status: 429 });
}

await env.KV.put(hourKey, String(count + 1), { expirationTtl: 3600 });
```

**Alternatives Considered**:
| Option | Rejected Because |
|--------|------------------|
| Durable Objects | Overkill for simple counter, higher cost |
| Upstash Redis | Separate service, billing complexity |
| In-memory | Lost on cold start, not distributed |

### 5. Modal Dialog Implementation

**Decision**: Melt-UI Dialog primitive (already in project)

**Rationale**:

- `@melt-ui/svelte` already installed and configured
- Headless components work with existing Tailwind styling
- Built-in accessibility (focus trap, keyboard nav, ARIA)
- Svelte 5 runes compatible

**No new dependency required**.

### 6. Resume Data Compilation Strategy

**Decision**: Build-time compilation of structured resume data

**Rationale**:

- Resume data already structured in `src/lib/projects/` and `src/lib/hobby-projects/`
- Can compile at build time into LLM-friendly format
- No runtime data fetching needed
- Keeps API endpoint stateless

**Implementation**:

- Create `src/lib/job-fit/resume-data.ts` that imports and formats all resume data
- Include: education, certifications, projects (with roles + technologies), skills
- Format as structured text for LLM context window

## Environment Variables Required

| Variable                    | Description          | Where to Set              |
| --------------------------- | -------------------- | ------------------------- |
| `ANTHROPIC_API_KEY`         | Claude API key       | Cloudflare Pages secrets  |
| `TURNSTILE_SECRET_KEY`      | Turnstile validation | Cloudflare Pages secrets  |
| `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile widget     | Cloudflare Pages env vars |

## Cost Estimate (Monthly)

| Service                    | Usage                           | Cost                  |
| -------------------------- | ------------------------------- | --------------------- |
| Cloudflare Pages Functions | ~100 invocations                | $0 (free tier)        |
| Cloudflare KV              | ~200 reads, ~100 writes         | $0 (free tier)        |
| Cloudflare Turnstile       | ~100 validations                | $0 (free)             |
| Anthropic Claude API       | ~100 analyses @ ~2K tokens each | ~$0.50-2.00           |
| **Total**                  |                                 | **~$0.50-2.00/month** |
