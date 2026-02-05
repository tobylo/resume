# Research: Hobby Projects Section

**Feature**: 001-hobby-projects
**Date**: 2026-02-05

## Research Summary

This feature requires no external research or new technology decisions. All unknowns from the Technical Context are resolved using existing project patterns and the pre-approved technology stack.

## Decisions

### 1. Data Module Pattern

**Decision**: Use a separate `src/lib/hobby-projects/` directory with `types.ts` and `index.ts`, mirroring the existing `src/lib/projects/` pattern.

**Rationale**: The existing work projects use this pattern successfully. Consistency reduces cognitive load and keeps the codebase predictable. Hobby projects are a distinct domain from work projects and warrant their own directory.

**Alternatives considered**:
- Adding hobby projects to the existing `src/lib/projects/` module with a `type: 'hobby' | 'work'` discriminator — Rejected because it would couple two unrelated data sets and require modifying the existing Project type, risking regressions in the work timeline.
- A single flat file `src/lib/hobby-projects.ts` — Rejected because it breaks the established pattern and would be harder to extend if more projects are added later.

### 2. Component Architecture

**Decision**: Two new Svelte 5 components — `HobbyProjects.svelte` (section container) and `HobbyProjectCard.svelte` (individual card).

**Rationale**: Matches the existing `Projects.svelte` / `ProjectCard.svelte` pattern. Single-responsibility per constitution Principle I. The container handles layout; the card handles individual item rendering.

**Alternatives considered**:
- A single monolithic component — Rejected because it violates the "small, single-responsibility" rule in the constitution.
- Reusing `ProjectCard.svelte` with conditional rendering — Rejected because hobby projects have a fundamentally different layout (image + title + description vs. timeline + company + role + technologies). Sharing would add complexity without benefit.

### 3. Image Handling

**Decision**: Use `<img>` tags with `loading="lazy"` and `object-fit: cover` in a fixed-height container. Images stored in `static/hobby-projects/` as WebP files.

**Rationale**: Native lazy loading is sufficient (no need for Intersection Observer). `object-fit: cover` handles the flexible aspect ratio requirement from the clarification. Static directory matches the existing `static/mugshot.webp` pattern.

**Alternatives considered**:
- SvelteKit's `$lib` import for images — Rejected because static assets in `static/` are the standard pattern for this project and provide direct URL references.
- A dedicated image optimization library — Rejected per constitution Principle IV (dependency minimalism). The images are small thumbnails and WebP is already optimized.

### 4. Print Hiding Strategy

**Decision**: Add the existing `print-hide` CSS class to the hobby projects section wrapper.

**Rationale**: The project already uses `print-hide` in `app.css` (`display: none !important` in `@media print`). Reusing this class maintains consistency and requires zero new CSS.

**Alternatives considered**:
- A new `print-hidden-section` class — Rejected because `print-hide` already exists and serves the exact same purpose.

### 5. Card Interactivity Pattern

**Decision**: Conditionally wrap card content in an `<a>` tag when a URL exists, otherwise render as a static `<article>`. Use Svelte 5 `$props()` for the hobby project data.

**Rationale**: Using a native `<a>` tag (with `target="_blank"` and `rel="noopener noreferrer"`) is the most accessible approach for external links. Cards without a URL use `<article>` for semantic correctness. No JavaScript click handlers needed.

**Alternatives considered**:
- Always using a `<button>` with `onclick` navigation — Rejected because it breaks native browser behaviors (right-click, middle-click, status bar URL preview) and is less accessible.
- Always using `<a>` with `href="#"` for URL-less cards — Rejected because it creates misleading interactive affordances.

### 6. Technology Tags Reveal

**Decision**: Use CSS-only hover reveal with Tailwind's `group-hover` utility. On mobile (touch devices), use a `$state` toggle triggered by tapping the card.

**Rationale**: CSS-only hover is the simplest approach per constitution Principle IV and III (minimize JS, prefer CSS solutions). The `$state` toggle for mobile provides an equivalent interaction without hover capability.

**Alternatives considered**:
- A dedicated expand/collapse button — Rejected because it adds visual clutter to an intentionally compact section.
- Always showing technologies — Rejected per the clarification (hidden by default to keep cards compact).

## No NEEDS CLARIFICATION Items Remaining

All technical decisions are resolved. The feature is ready for Phase 1 design.
