# Quickstart: Hobby Projects Section

**Feature**: 001-hobby-projects
**Date**: 2026-02-05

## Prerequisites

- Bun installed (latest stable)
- Repository cloned and on branch `001-hobby-projects`
- Dependencies installed: `bun install`

## Adding a New Hobby Project

1. Optionally add a thumbnail image to `static/hobby-projects/` (WebP format recommended, any aspect ratio)

2. Create a new data file in `src/lib/hobby-projects/` (e.g., `my-project.ts`):

```typescript
import type { HobbyProject } from './types';

export const myProject: HobbyProject = {
  id: 'my-project',
  title: 'My Project',
  description: 'A short description of what this project does and why it exists.',
  image: '/hobby-projects/my-project.webp',
  url: 'https://github.com/user/my-project',
  technologies: ['Svelte', 'TypeScript', 'Tailwind']
};
```

3. Import and add it to the array in `src/lib/hobby-projects/index.ts`:

```typescript
import { myProject } from './my-project';

export const hobbyProjects = [
  // ... existing projects
  myProject
];
```

4. Verify:

```bash
bun run check   # TypeScript + Svelte check
bun run lint     # Prettier + ESLint
bun run dev      # Visual inspection at http://localhost:5173
```

## Development Commands

| Command | Purpose |
|---|---|
| `bun run dev` | Start dev server with hot reload |
| `bun run build` | Build static site |
| `bun run preview` | Preview built site |
| `bun run check` | TypeScript + Svelte type checking |
| `bun run lint` | Prettier + ESLint validation |
| `bun run format` | Auto-format with Prettier |

## Verification Checklist

- [ ] Hobby projects section appears below the work experience grid
- [ ] Each card shows image (or placeholder), title, and description
- [ ] Description text is clamped at 3 lines
- [ ] Cards with a URL are clickable and open in a new tab
- [ ] Cards without a URL are not clickable
- [ ] Technology tags appear on hover (desktop) or tap (mobile)
- [ ] Section is hidden in print preview
- [ ] Dark mode renders correctly
- [ ] Mobile layout stacks cards in a single column
- [ ] `bun run check` passes
- [ ] `bun run lint` passes
- [ ] `bun run build` succeeds with zero warnings
