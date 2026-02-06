# Implementation Plan: Job Fit Analyzer

**Branch**: `002-job-fit-analyzer` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-job-fit-analyzer/spec.md`

## Summary

Add a floating "Is Tobias suitable for..." button that opens a modal dialog where recruiters can paste a job description. The system validates via Cloudflare Turnstile, rate-limits via KV, and sends the request to Anthropic Claude API which returns a structured fit analysis comparing the job requirements against Tobias's resume data.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode)
**Framework**: SvelteKit 2.49 + Svelte 5.46
**Primary Dependencies**: @sveltejs/adapter-cloudflare, @anthropic-ai/sdk, @melt-ui/svelte (dialogs)
**Styling**: Tailwind CSS 4.1
**Storage**: Cloudflare KV (rate limit state)
**Testing**: Manual testing via `bun run dev` + Cloudflare Pages preview
**Target Platform**: Cloudflare Pages with Functions
**Project Type**: Web (SvelteKit static → hybrid with serverless functions)
**Performance Goals**: LLM response <15s for 95% of requests (SC-002)
**Constraints**: 5 requests/IP/hour rate limit, CAPTCHA required
**Scale/Scope**: Low-traffic personal portfolio (~100 analyses/month expected)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                     | Status                    | Notes                                                      |
| ----------------------------- | ------------------------- | ---------------------------------------------------------- |
| I. Code Quality               | ✅ Pass                   | TypeScript strict, Svelte 5 runes, ESLint/Prettier         |
| II. Visual Design             | ✅ Pass                   | Floating button + modal follows existing Tailwind patterns |
| III. Performance              | ⚠️ Requires justification | LLM calls add latency; mitigated by loading states         |
| IV. Dependency Minimalism     | ✅ Pass                   | Only 2 new deps: adapter-cloudflare, @anthropic-ai/sdk     |
| V. Incremental Implementation | ✅ Pass                   | Feature isolated, can be built incrementally               |
| VI. Agent Delegation          | ✅ Pass                   | Will use svelte-file-editor, security-auditor agents       |

### Performance Justification (Principle III)

The LLM integration necessarily adds 5-15 seconds of latency for the analysis response. This is acceptable because:

1. The feature is opt-in (user explicitly requests analysis)
2. Clear loading states communicate progress
3. The value proposition (AI analysis) justifies the wait
4. Static content remains unaffected (Lighthouse 95+ maintained)

## Project Structure

### Documentation (this feature)

```text
specs/002-job-fit-analyzer/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.yaml         # OpenAPI spec for /api/analyze
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── lib/
│   ├── job-fit/                    # NEW: Feature module
│   │   ├── types.ts                # Request/response types
│   │   ├── resume-data.ts          # Compiled resume for LLM context
│   │   └── prompt.ts               # System prompt template
│   ├── JobFitButton.svelte         # NEW: Floating trigger button
│   ├── JobFitDialog.svelte         # NEW: Modal dialog component
│   ├── projects/                   # EXISTING: Resume data source
│   └── hobby-projects/             # EXISTING: Resume data source
├── routes/
│   ├── api/
│   │   └── analyze/
│   │       └── +server.ts          # NEW: Server endpoint
│   └── +page.svelte                # MODIFY: Add JobFitButton
└── app.d.ts                        # MODIFY: Add Cloudflare platform types

# Config files (repository root)
├── svelte.config.js                # MODIFY: Switch to adapter-cloudflare
├── wrangler.toml                   # NEW: Cloudflare bindings config
└── package.json                    # MODIFY: Add new dependencies
```

**Structure Decision**: Single web application with SvelteKit hybrid rendering (static pages + serverless API). Feature module isolated in `src/lib/job-fit/` following existing pattern from `src/lib/projects/`.

## Complexity Tracking

| Aspect          | Complexity | Justification                             |
| --------------- | ---------- | ----------------------------------------- |
| Adapter change  | Low        | SvelteKit built-in support for Cloudflare |
| LLM integration | Medium     | Single API call with structured prompt    |
| Rate limiting   | Low        | Simple KV counter pattern                 |
| CAPTCHA         | Low        | Turnstile has native Cloudflare support   |
| Modal dialog    | Low        | Melt-UI already in project                |

No constitution violations requiring justification. Total new dependencies: 2 (adapter-cloudflare, @anthropic-ai/sdk).

## New Dependencies Justification

### @sveltejs/adapter-cloudflare

**Required**: Enables server-side API routes on Cloudflare Pages
**Replaces**: @sveltejs/adapter-static (cannot run server code)
**Bundle impact**: Build-time only, no client bundle increase

### @anthropic-ai/sdk

**Required**: Official SDK for Claude API calls
**Alternative rejected**: Raw fetch - SDK provides better TypeScript types, automatic retries, and structured output parsing
**Bundle impact**: Server-side only, not included in client bundle

## Post-Design Constitution Check

_Re-evaluation after Phase 1 design completion._

| Principle                     | Status  | Notes                                                                |
| ----------------------------- | ------- | -------------------------------------------------------------------- |
| I. Code Quality               | ✅ Pass | All types defined, strict mode maintained                            |
| II. Visual Design             | ✅ Pass | Design uses existing Tailwind patterns, Melt-UI for accessibility    |
| III. Performance              | ✅ Pass | Justified: opt-in feature, loading states, static content unaffected |
| IV. Dependency Minimalism     | ✅ Pass | 2 new deps both justified and necessary                              |
| V. Incremental Implementation | ✅ Pass | Clear task breakdown possible, feature isolated                      |
| VI. Agent Delegation          | ✅ Pass | svelte-file-editor for components, security-auditor for API          |

**Gate Status**: ✅ **PASSED** - Ready for task generation
