# Data Model: Hobby Projects Section

**Feature**: 001-hobby-projects
**Date**: 2026-02-05

## Entities

### HobbyProject

Represents a personal/hobby project for display in the hobby projects section.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier (kebab-case slug, e.g., `"my-game-engine"`) |
| `title` | `string` | Yes | Display title of the project |
| `description` | `string` | Yes | Short description (will be clamped to 3 lines in the UI) |
| `image` | `string \| undefined` | No | Path to thumbnail image relative to `static/` (e.g., `"/hobby-projects/my-project.webp"`). When absent, a placeholder visual is rendered. |
| `url` | `string \| undefined` | No | External URL to the project (e.g., GitHub repo, live demo). When present, the card becomes a clickable link opening in a new tab. |
| `technologies` | `string[]` | No | List of technologies used. Defaults to empty array. Hidden by default, revealed on hover/expand. |

### Validation Rules

- `id` MUST be unique across all hobby projects
- `id` MUST be a non-empty kebab-case string (lowercase, hyphens only)
- `title` MUST be a non-empty string
- `description` MUST be a non-empty string
- `image` when provided MUST be a valid path starting with `/hobby-projects/`
- `url` when provided MUST be a valid URL starting with `http://` or `https://`
- `technologies` when provided MUST be a non-empty array of non-empty strings

### TypeScript Interface

```typescript
export interface HobbyProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  technologies?: string[];
}
```

## Relationships

- **HobbyProject** is independent — no relationships to the existing `Project` (work projects) entity
- The hobby projects list is a static ordered array exported from `src/lib/hobby-projects/index.ts`
- Display order is determined by array position (first item = first displayed)

## Data Volume

- Expected: 2-6 items
- No pagination, filtering, or search required
- All data is compile-time static (no runtime fetching)
