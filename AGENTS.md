# Working in this repository

These rules apply to every agent session here, whatever the harness. "The owner" is the repository's owner. Harness-specific notes live in that harness's own file (`CLAUDE.md` for Claude Code).

## What this is

tobylo.dev: the owner's resume site. A recruiter should get role, terms and contact details within ten seconds; a hiring manager should find outcomes, how the owner thinks, and side projects. Pages, as redesigned (being built slice by slice): home, full timeline (`/work`), Devisor write-up (`/devisor`), hobby lab (`/lab`), printable CV (`/cv`), and the job-fit analyzer (dialog plus `/api/analyze`).

## Stack and commands

SvelteKit 3 with Svelte 5, Vite 8, TypeScript (strict), Tailwind CSS 4, Bun, deployed as a Cloudflare Worker with static assets (`@sveltejs/adapter-cloudflare` 9). Kit config lives in `vite.config.ts`; `src/lib` is imported as `#lib/...` with file extensions. Pages are prerendered and served as static assets, with headers from `_headers`; only `/api/analyze` runs in the Worker, reading its bindings from `cloudflare:workers` (typed in `src/cloudflare.d.ts`) and getting its headers from `src/hooks.server.ts`.

Worker config lives in `wrangler.toml`: compatibility date and flags, vars, KV, and the `previews` block. Previews share the compatibility date, flags and assets with production, but take vars and bindings only from `previews`, so a new var or binding goes in both places. Workers Builds deploys `main` and builds a Preview of every other branch. Secrets are not in the repo: `wrangler secret put` for production, `wrangler preview base-config secret put` for Previews.

```bash
bun run dev       # dev server
bun run check     # svelte-check + TypeScript
bun run lint      # Prettier + ESLint
bun run format    # auto-format
bun run build     # production build
bun run preview   # serve the build with wrangler dev
```

Local secrets for the analyzer go in `.dev.vars` (see `.dev.vars.example`).

## Source of truth

- **Design:** the Paper file "tobylo.dev — homepage redesign". Its "Pages" page holds every screen (light, dark, mobile, job fit, CV, link preview); its "Design system" page holds the colour, type and component sheets; the "Build notes — decisions" artboard records the decisions. Read exact values from Paper (`get_jsx`, `get_computed_styles`, `get_tokens`), never from screenshots. Paper's design tokens export as the Tailwind `@theme`.
- **Content:** `src/lib/projects` and `src/lib/hobby-projects`. The homepage, timeline, CV and the analyzer's prompt all read from them, so content changes happen there, once. Use `featuredProjects` and `groupByClient()` rather than filtering by hand.

## Code

- Svelte runes only (`$state`, `$derived`, `$effect`, `$props`); no `$:` or `export let`.
- TypeScript strict, no `any`.
- Tailwind utilities on theme tokens; no inline styles and no hard-coded colours. Light and dark both come from the tokens.
- Semantic HTML, keyboard reachable, visible focus, and `prefers-reduced-motion` respected (the hero rotation pauses).
- Prefer the platform: native `<dialog>`, CSS, and small components over new dependencies.
- Svelte MCP: before writing Svelte or SvelteKit code, look up the current docs with the Svelte MCP (`list-sections`, then `get-documentation`); before calling it done, run `svelte-autofixer` on every `.svelte` and `.svelte.ts` file you touched until it reports nothing.

## The job-fit analyzer

- The job ad is untrusted input. It reaches the model only as data; the system prompt says so and output is validated with zod before it is returned.
- Keep the guards: Turnstile verification, the per-IP rate limit (5 per hour, KV), input length and keyword checks, and the CSP in `hooks.server.ts`.
- The site does not store job ads. Do not add logging or storage that would make "I don't store job ads" untrue.
- Copy in the UI must match the API's real behaviour (limits, errors, what happens to the ad).

## How we work

- **Branches.** One branch per PR, from `origin/main`.
- **Gates.** Before every commit: `bun run check`, `bun run lint` and `bun run build` all pass. Commit exactly the tree that passed.
- **Code Health.** Files a commit adds or changes should score 10 in CodeScene (`code_health_review`). If one can't, say why in the PR.
- **Review.** Before pushing, run the local adversarial review (`adversarial-review` skill: Codex and CodeRabbit) until both come back clean or every remaining finding is declined with reasoning. On the PR, answer every Codex and CodeRabbit finding: "fixed in <sha>", or the reasoning.
- **Ready means green.** A PR is ready when its checks pass (CodeRabbit, Workers Builds) and its Preview (the workers.dev URL in the Cloudflare comment) has been looked at for the pages it touches, in light and dark, on desktop and mobile widths.
- **Commits and PRs.** Write them as the owner would: what changes and why, plain and short. No AI attribution, co-author trailers or "generated with" footers. Commit with the owner's GitHub noreply address (`4395405+tobylo@users.noreply.github.com`): pushes with the private address are rejected. Entire adds an `Entire-Checkpoint:` trailer to each commit, linking it to the session that made it; keep it, it is not attribution.
- **Scope.** Keep a PR to its slice. Propose other work separately instead of widening it.
- **Failures.** A tool, check or build that fails is yours once you see it: look into it briefly, fix it if small, otherwise tell the owner what failed, the likely cause and what you recommend.

## Working with the owner

- The owner often reads from a phone. Put results, links and anything they need to see in the message itself.
- Commands for the owner's machine work in fish: one line, absolute paths.
- Keep going on authorized work. Ask only when the answer changes what you do.
