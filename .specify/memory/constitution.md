<!--
Sync Impact Report
- Version change: 0.0.0 → 1.0.0 (initial creation)
- Added principles:
  - I. Code Quality & Best Practices
  - II. Visual Design — Clean, Modern & Attractive
  - III. Performance
  - IV. Dependency Minimalism
  - V. Incremental Implementation & User Control
  - VI. Agent Delegation & Review
- Added sections:
  - Technology Stack & Dependency Policy
  - Development Workflow
  - Governance
- Removed sections: N/A (initial creation)
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ compatible (Constitution Check is dynamic)
  - .specify/templates/spec-template.md ✅ compatible (Success Criteria aligns)
  - .specify/templates/tasks-template.md ✅ compatible (phase/checkpoint structure aligns)
- Follow-up TODOs: None
-->

# Resume Site Constitution

## Core Principles

### I. Code Quality & Best Practices

All code MUST follow current best practices for its technology.

- TypeScript strict mode MUST be enabled; `any` is forbidden except at true system boundaries
- ESLint and Prettier MUST pass with zero warnings before any commit
- Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) MUST be used; legacy reactive syntax (`$:`, `export let`) is forbidden
- Components MUST be small, single-responsibility, and composable
- Dead code, unused imports, and commented-out code MUST be removed
- Variable and function names MUST be descriptive and self-documenting
- Semantic HTML elements MUST be used over generic `div`/`span` where applicable
- All interactive elements MUST be keyboard-navigable with visible focus indicators
- ARIA attributes MUST be used only when semantic HTML is insufficient
- Color MUST NOT be the sole means of conveying information

### II. Visual Design — Clean, Modern & Attractive

The site MUST present a clean, modern, and visually attractive profile.

- Design MUST be minimal yet distinctive; generic template aesthetics are forbidden
- Tailwind CSS 4 MUST be used for all styling; inline styles are forbidden except for truly dynamic values
- Typography MUST use a clear hierarchy with consistent scale and spacing
- Color palette MUST support both light and dark themes with WCAG AA contrast minimum
- Animations and transitions MUST be subtle, purposeful, and respect `prefers-reduced-motion`
- Layout MUST be fully responsive across mobile, tablet, and desktop breakpoints
- Print styles MUST be maintained for resume-appropriate output

### III. Performance

The site MUST load fast and score high on Core Web Vitals.

- Lighthouse performance score MUST be 95+ on both mobile and desktop
- Largest Contentful Paint (LCP) MUST be under 2.5 seconds
- Cumulative Layout Shift (CLS) MUST be under 0.1
- Total page weight MUST stay under 200KB gzipped (excluding fonts)
- Images MUST use modern formats (WebP/AVIF) with appropriate sizing and lazy loading
- JavaScript bundle MUST be minimized; CSS-only solutions MUST be preferred where possible
- Static site generation via `adapter-static` MUST be used for zero server overhead, EXCEPT for features explicitly requiring server-side processing (e.g., secure API endpoints), which MAY use `adapter-cloudflare` with justification documented in the feature's plan.md

### IV. Dependency Minimalism

Dependencies MUST be justified and kept to the minimum necessary.

- The latest stable version of every library MUST be used
- A new dependency MUST be justified: if the same result can be achieved in under 30 lines of custom code, the custom approach MUST be used instead
- Dependencies MUST NOT be added for trivial operations (string manipulation, simple DOM helpers, basic math)
- Bundle size impact MUST be evaluated before adding any dependency
- Existing project dependencies are pre-approved (see Technology Stack below); new additions require explicit justification in the relevant plan or spec document

### V. Incremental Implementation & User Control

Work MUST be delivered in the smallest useful increments.

- Each implementation session MUST tackle only the smallest logical set of tasks, then update documentation and stop
- The user MUST explicitly approve before proceeding to the next set of tasks
- Every deliverable MUST leave the project in a buildable, working state; partial implementations that break the build are forbidden
- Documentation (`tasks.md`, `plan.md`) MUST be updated after each session to reflect current status

### VI. Agent Delegation & Review

Specialized agents MUST be used for their designated domains, and their output MUST be reviewed.

- The `svelte:svelte-file-editor` agent MUST be used for all Svelte component creation, editing, and review
- The `build-error-resolver` agent MUST be used when build or type errors occur
- The `code-reviewer` agent MUST be used after writing or modifying code
- The `security-auditor` agent MUST be used after implementing features that handle user input or external data
- Output from every delegated agent task MUST be reviewed before presenting results to the user

## Technology Stack & Dependency Policy

**Runtime**: Bun (latest stable)
**Framework**: SvelteKit 2 with Svelte 5
**Styling**: Tailwind CSS 4 with `@tailwindcss/postcss` and `@tailwindcss/typography`
**Language**: TypeScript 5 (strict mode)
**Build**: Vite 7
**Adapter**: `@sveltejs/adapter-static` (default) or `@sveltejs/adapter-cloudflare` (when server-side processing required)
**Icons**: `unplugin-icons` with `@iconify/json`
**UI Components**: `@melt-ui/svelte` with `@melt-ui/pp` preprocessor
**CSS Optimization**: `cssnano`
**Linting**: ESLint 9 with `eslint-plugin-svelte`, `typescript-eslint`, `eslint-config-prettier`
**Formatting**: Prettier with `prettier-plugin-svelte` and `prettier-plugin-tailwindcss`
**Type Checking**: `svelte-check`

| Category      | Pre-Approved                  | Requires Justification          |
| ------------- | ----------------------------- | ------------------------------- |
| Framework     | SvelteKit 2, Svelte 5         | Any framework addition          |
| Styling       | Tailwind CSS 4, cssnano       | Any CSS library or preprocessor |
| Icons         | unplugin-icons, @iconify/json | Any icon library                |
| UI Components | @melt-ui/svelte               | Any component library           |
| Build         | Vite 7, TypeScript 5          | Any build plugin                |
| Linting       | ESLint 9, Prettier            | Any lint rule package           |

## Development Workflow

### Session Protocol

1. Review current `tasks.md` to identify the next smallest logical set of tasks
2. Implement only those tasks, delegating to specialized agents per Principle VI
3. Run quality gates (see below) to verify zero errors
4. Update documentation to reflect completed work
5. Present results to the user and **STOP**
6. Wait for explicit user approval before proceeding to next tasks

### Quality Gates

All gates MUST pass before a session is considered complete:

- `bun run check` MUST pass (svelte-check + TypeScript)
- `bun run lint` MUST pass (Prettier + ESLint)
- `bun run build` MUST succeed with zero warnings
- Visual inspection of changes via `bun run dev` before marking complete

### Commit Discipline

- Commits MUST only be created when explicitly requested by the user
- Commit messages MUST be concise and describe the "why" over the "what"

## Governance

- This constitution supersedes all other development practices for this project
- Amendments require documentation of the change, rationale, and a version bump
- Version increments follow semantic versioning: MAJOR for principle removals or redefinitions, MINOR for new principles or material expansions, PATCH for clarifications and wording
- All implementation work MUST verify compliance with these principles before completion
- Use `CLAUDE.md` for runtime development guidance once generated

**Version**: 1.1.0 | **Ratified**: 2026-02-05 | **Last Amended**: 2026-02-05
