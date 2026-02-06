# Resume Site Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-05

## Active Technologies

- TypeScript 5.9 (strict mode)
- SvelteKit 2.49 + Svelte 5.46
- Tailwind CSS 4.1
- Vite 7.3
- Bun (runtime)

## Project Structure

```text
src/
├── lib/
│   ├── projects/          # Work project data + types
│   ├── hobby-projects/    # Hobby project data + types (001-hobby-projects)
│   ├── job-fit/           # Job fit analyzer module (002-job-fit-analyzer)
│   ├── *.svelte           # Reusable components
│   └── theme.svelte.ts    # Theme state
├── routes/
│   ├── api/analyze/       # Job fit API endpoint (002-job-fit-analyzer)
│   ├── +page.svelte       # Main resume page
│   ├── +page.ts           # Prerender config
│   └── +layout.svelte     # Root layout
└── app.css                # Global styles + print styles
static/
├── mugshot.webp
└── hobby-projects/        # Hobby project thumbnails
```

## Commands

```bash
bun run dev       # Start dev server
bun run build     # Build static site
bun run preview   # Preview build
bun run check     # TypeScript + Svelte type checking
bun run lint      # Prettier + ESLint
bun run format    # Auto-format
```

## Code Style

- TypeScript: Strict mode, no `any`
- Svelte: Runes only (`$state`, `$derived`, `$effect`, `$props`), no `$:` or `export let`
- Styling: Tailwind CSS 4 only, no inline styles
- HTML: Semantic elements, accessible, keyboard-navigable

## Recent Changes

- 002-job-fit-analyzer: Job fit analyzer with LLM integration (Cloudflare Pages + Claude API)
- 001-hobby-projects: Adding hobby projects section with image cards

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
