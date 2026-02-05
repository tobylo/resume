# Implementation Plan: Hobby Projects Section

**Branch**: `001-hobby-projects` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-hobby-projects/spec.md`

## Summary

Add a compact, visually secondary "Hobby Projects" section below the existing work experience grid on the resume page. Each hobby project displays as a card with a thumbnail image, title, and short description. Cards with a URL link externally in a new tab. Technology tags are hidden by default and revealed on hover/expand. The section is hidden from print output and fully responsive across all breakpoints.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode enabled)
**Framework**: SvelteKit 2.49 with Svelte 5.46
**Styling**: Tailwind CSS 4.1 with `@tailwindcss/postcss` and `@tailwindcss/typography`
**Runtime**: Bun (latest stable)
**Build**: Vite 7.3
**Primary Dependencies**: No new dependencies required — all work uses pre-approved stack
**Storage**: Static TypeScript data files (same pattern as `src/lib/projects/`)
**Testing**: Manual visual inspection + `bun run check` + `bun run lint` + `bun run build`
**Target Platform**: Static site (adapter-static), all modern browsers
**Project Type**: Single SvelteKit application (existing)
**Performance Goals**: Lighthouse 95+, LCP < 2.5s, CLS < 0.1, page weight < 200KB gzipped
**Constraints**: No new dependencies; images must be lazy-loaded WebP/AVIF; static generation via adapter-static
**Scale/Scope**: 2-6 hobby project items, single page addition

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                     | Gate                                                                                                                    | Status                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| I. Code Quality               | Svelte 5 runes only, strict TS, ESLint/Prettier zero warnings, semantic HTML, keyboard-navigable, ARIA only when needed | PASS — plan uses Svelte 5 `$props`/`$state`, strict TS, semantic `<article>`/`<section>`                       |
| II. Visual Design             | Tailwind CSS 4, light/dark themes, WCAG AA contrast, responsive, print styles                                           | PASS — Tailwind-only styling, dark mode support via existing custom variant, print-hide class, responsive grid |
| III. Performance              | Lighthouse 95+, LCP < 2.5s, CLS < 0.1, < 200KB gzipped, lazy loading, static gen                                        | PASS — images lazy-loaded, static data, no JS-heavy interactions, adapter-static                               |
| IV. Dependency Minimalism     | No new dependencies unless justified, latest stable versions                                                            | PASS — zero new dependencies                                                                                   |
| V. Incremental Implementation | Smallest task sets, update docs, wait for approval                                                                      | PASS — plan structured for incremental delivery                                                                |
| VI. Agent Delegation          | svelte:svelte-file-editor for Svelte, code-reviewer after changes, build-error-resolver for errors                      | PASS — plan directs agent usage in task execution                                                              |

**Result**: All gates PASS. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-hobby-projects/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── lib/
│   ├── hobby-projects/
│   │   ├── types.ts              # HobbyProject interface
│   │   └── index.ts              # Hobby project data + exports
│   ├── HobbyProjects.svelte      # Section container component
│   └── HobbyProjectCard.svelte   # Individual card component
├── routes/
│   └── +page.svelte              # Modified — add HobbyProjects import and section

static/
└── hobby-projects/               # Thumbnail images (WebP, provided by user)
```

**Structure Decision**: Follows the existing `src/lib/projects/` pattern (separate `types.ts` + `index.ts` data module) but in a new `src/lib/hobby-projects/` directory to maintain clear separation between work projects and hobby projects. Components live at `src/lib/` level alongside existing components (`Projects.svelte`, `ProjectCard.svelte`).

## Complexity Tracking

> No violations to justify — all gates passed.
