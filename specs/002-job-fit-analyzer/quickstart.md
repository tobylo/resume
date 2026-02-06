# Quickstart: Job Fit Analyzer

**Feature**: 002-job-fit-analyzer
**Date**: 2026-02-05

## Prerequisites

- Bun runtime (already installed)
- Cloudflare account (for Pages, KV, Turnstile)
- Anthropic API key

## Local Development Setup

### 1. Install New Dependencies

```bash
bun add -d @sveltejs/adapter-cloudflare
bun add @anthropic-ai/sdk
```

### 2. Update SvelteKit Adapter

Edit `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-cloudflare';
// ... rest of config
```

### 3. Create Environment Files

Create `.dev.vars` (for local Cloudflare development):

```env
ANTHROPIC_API_KEY=sk-ant-...
TURNSTILE_SECRET_KEY=0x...
```

Create `.env` (for SvelteKit, client-side vars only):

```env
PUBLIC_TURNSTILE_SITE_KEY=0x...
```

### 4. Create wrangler.toml

```toml
name = "resume"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "KV"
id = "<your-kv-namespace-id>"
preview_id = "<your-preview-kv-namespace-id>"
```

### 5. Update TypeScript Types

Edit `src/app.d.ts`:

```typescript
declare global {
	namespace App {
		interface Platform {
			env: {
				KV: KVNamespace;
				ANTHROPIC_API_KEY: string;
				TURNSTILE_SECRET_KEY: string;
			};
		}
	}
}
```

### 6. Run Development Server

```bash
# Standard SvelteKit dev (without Cloudflare bindings)
bun run dev

# With Cloudflare bindings (requires wrangler)
bunx wrangler pages dev -- bun run build
```

## Cloudflare Setup

### 1. Create Turnstile Widget

1. Go to Cloudflare Dashboard → Turnstile
2. Add site → Choose "Managed" mode
3. Copy Site Key (public) and Secret Key

### 2. Create KV Namespace

```bash
bunx wrangler kv namespace create KV
bunx wrangler kv namespace create KV --preview
```

Update `wrangler.toml` with the returned IDs.

### 3. Set Environment Secrets

In Cloudflare Pages dashboard → Settings → Environment Variables:

| Variable                    | Type   | Value        |
| --------------------------- | ------ | ------------ |
| `ANTHROPIC_API_KEY`         | Secret | `sk-ant-...` |
| `TURNSTILE_SECRET_KEY`      | Secret | `0x...`      |
| `PUBLIC_TURNSTILE_SITE_KEY` | Plain  | `0x...`      |

### 4. Bind KV Namespace

In Cloudflare Pages dashboard → Settings → Functions → KV namespace bindings:

| Variable name | KV namespace            |
| ------------- | ----------------------- |
| `KV`          | (select your namespace) |

## File Structure After Implementation

```
src/
├── lib/
│   ├── job-fit/
│   │   ├── types.ts          # TypeScript types
│   │   ├── resume-data.ts    # Compiled resume context
│   │   └── prompt.ts         # LLM system prompt
│   ├── JobFitButton.svelte   # Floating action button
│   └── JobFitDialog.svelte   # Modal dialog component
├── routes/
│   ├── api/
│   │   └── analyze/
│   │       └── +server.ts    # POST /api/analyze endpoint
│   └── +page.svelte          # (modified to include button)
└── app.d.ts                  # (modified for Cloudflare types)
```

## Testing Checklist

### Local Testing

- [ ] Dialog opens when button clicked
- [ ] Input validation works (50 char minimum)
- [ ] Submit button disabled until valid
- [ ] Loading state appears during submission
- [ ] Results display with correct structure
- [ ] Dialog closes via X, Escape, outside click
- [ ] Keyboard navigation works

### Production Testing

- [ ] Turnstile widget renders and validates
- [ ] Rate limiting blocks after 5 requests/hour
- [ ] LLM returns structured analysis
- [ ] Error messages display for all error codes
- [ ] Analysis references actual resume data

## Commands Reference

```bash
# Development
bun run dev                    # Start dev server
bun run check                  # TypeScript check
bun run lint                   # Lint code

# Build & Preview
bun run build                  # Build for production
bun run preview                # Preview build locally

# Cloudflare
bunx wrangler pages dev        # Local with CF bindings
bunx wrangler pages deploy     # Deploy to Cloudflare
```

## Troubleshooting

### "KV is not defined"

Ensure `wrangler.toml` has correct KV bindings and you're running with `wrangler pages dev`.

### "CAPTCHA failed" in development

Turnstile may not work on localhost. Use test keys from Cloudflare docs or skip validation in dev mode.

### "Rate limited" immediately

Check KV namespace is bound correctly. Clear rate limit entries:

```bash
bunx wrangler kv key delete --namespace-id=<id> "rate:<ip>:<timestamp>"
```

### LLM timeout

Claude API has occasional latency spikes. Implement client-side timeout (30s) with retry option.
