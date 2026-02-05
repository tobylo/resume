# Tasks: Hobby Projects Section

**Input**: Design documents from `/specs/001-hobby-projects/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: No test tasks included — not requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the data module and directory structure shared by all user stories

- [x] T001 Create HobbyProject interface in `src/lib/hobby-projects/types.ts` per data-model.md (id, title, description, image?, url?, technologies?)
- [x] T002 [P] Create hobby projects data module in `src/lib/hobby-projects/index.ts` with placeholder entries and hobbyProjects export array
- [x] T003 [P] Create `static/hobby-projects/` directory for thumbnail images

**Checkpoint**: Data module ready — component implementation can begin

---

## Phase 2: User Story 1 — View Hobby Projects at a Glance (Priority: P1) MVP

**Goal**: Visitors see a compact hobby projects section below the work experience, with cards showing image, title, description, clickable URL links, and technology tags revealed on hover/expand.

**Independent Test**: Scroll below the work experience grid and verify hobby project cards render with image (or placeholder), title, description. Click a card with a URL to confirm it opens in a new tab. Hover to see technology tags.

### Implementation for User Story 1

- [x] T004 [P] [US1] Create HobbyProjectCard component in `src/lib/HobbyProjectCard.svelte` — card with thumbnail image (lazy-loaded, object-fit cover, fallback placeholder), title, description (clamped to 3 lines), conditional `<a>` wrapper for URL (target="\_blank", rel="noopener noreferrer") vs static `<article>`, technology tags hidden by default and revealed on hover/tap via group-hover and $state toggle. Use Svelte 5 $props(). Support dark mode via existing Tailwind dark: variant. Add visible focus-visible outline on the `<a>` wrapper for keyboard navigation accessibility.
- [x] T005 [P] [US1] Create HobbyProjects section container in `src/lib/HobbyProjects.svelte` — section with "Hobby Projects" heading (visually secondary: smaller than work projects heading), responsive grid layout (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3), imports hobbyProjects from data module, iterates with {#each}. Include print-hide class on section wrapper.
- [x] T006 [US1] Add HobbyProjects section to `src/routes/+page.svelte` — import HobbyProjects component and place it below the main content grid (after the closing `</div>` of the lg:grid-cols-[1fr_2fr] grid), inside the max-w-6xl container.

**Checkpoint**: Hobby projects section visible on desktop with all card features working. MVP complete.

---

## Phase 3: User Story 2 — Mobile Responsive (Priority: P2)

**Goal**: Hobby projects section displays in a clean single-column layout on mobile and scales to multi-column on wider viewports.

**Independent Test**: View page at 320px, 768px, 1024px, and 1440px viewport widths. Cards stack single-column on mobile, 2-column on tablet, 3-column on desktop.

### Implementation for User Story 2

- [x] T007 [US2] Verify and refine responsive grid breakpoints in `src/lib/HobbyProjects.svelte` — ensure grid-cols-1 at mobile, sm:grid-cols-2 at tablet, lg:grid-cols-3 at desktop. Adjust gap and padding for mobile viewports.
- [x] T008 [US2] Verify and refine card image and text sizing in `src/lib/HobbyProjectCard.svelte` — ensure thumbnail container and font sizes scale appropriately at narrow viewports (320px-768px). Verify touch-based tech tag reveal works on mobile.

**Checkpoint**: Section renders correctly across all breakpoints (320px to 2560px).

---

## Phase 4: User Story 3 — Print Hidden (Priority: P3)

**Goal**: Hobby projects section is completely hidden from print output.

**Independent Test**: Open browser print preview (Ctrl+P) and verify zero hobby project content appears.

### Implementation for User Story 3

- [x] T009 [US3] Verify print-hide class is applied to hobby projects section wrapper in `src/lib/HobbyProjects.svelte` (should already be present from T005). If not, add it. Confirm `app.css` print media query hides elements with print-hide class.
- [x] T010 [US3] Test print preview in browser — verify hobby projects section is completely absent from print output and work resume fills the available space.

**Checkpoint**: Print output contains zero hobby project content.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates and final validation

- [ ] T011 Run quality gates: `bun run check` (TypeScript + Svelte), `bun run lint` (Prettier + ESLint), `bun run build` (zero warnings)
- [ ] T012 Run quickstart.md verification checklist from `specs/001-hobby-projects/quickstart.md`
- [ ] T013 Update `specs/001-hobby-projects/tasks.md` with completion status for all tasks

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup (Phase 1) completion — BLOCKS US2 and US3
- **User Story 2 (Phase 3)**: Depends on US1 (Phase 2) — refines components created in US1
- **User Story 3 (Phase 4)**: Depends on US1 (Phase 2) — verifies print behavior of components from US1
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Requires Phase 1 setup complete. No other story dependencies.
- **User Story 2 (P2)**: Requires US1 components to exist (refines them for mobile). Can run in parallel with US3.
- **User Story 3 (P3)**: Requires US1 components to exist (verifies print behavior). Can run in parallel with US2.

### Within User Story 1

- T004 (HobbyProjectCard) and T005 (HobbyProjects) can be built in parallel [P] since they are different files
- T006 (page integration) depends on both T004 and T005

### Parallel Opportunities

- T002 and T003 can run in parallel (different directories)
- T004 and T005 can be started in parallel (different .svelte files)
- US2 (Phase 3) and US3 (Phase 4) can run in parallel after US1 completes

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: User Story 1 (T004-T006)
3. **STOP and VALIDATE**: Scroll page, verify cards render correctly on desktop
4. Deploy/demo if ready — this delivers the core feature value

### Incremental Delivery

1. Phase 1 (Setup) → Data module ready
2. Phase 2 (US1) → Cards visible on desktop → **MVP!**
3. Phase 3 (US2) → Mobile responsive → Deploy
4. Phase 4 (US3) → Print hidden → Deploy
5. Phase 5 (Polish) → Quality gates pass → Feature complete

### Session Boundaries (per Constitution Principle V)

Each session MUST implement the smallest logical set of tasks then stop:

- **Session 1**: Phase 1 (T001-T003) — Setup data module and directory
- **Session 2**: Phase 2 (T004-T006) — MVP card components and page integration
- **Session 3**: Phase 3 + Phase 4 (T007-T010) — Mobile + Print refinements
- **Session 4**: Phase 5 (T011-T013) — Quality gates and final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No test tasks generated — tests were not requested in the spec
- Agent delegation per Constitution Principle VI:
  - `svelte:svelte-file-editor` MUST be used for T004, T005, T006, T007, T008, T009
  - `code-reviewer` MUST be used after each implementation session
  - `build-error-resolver` MUST be used if quality gates fail
- Stop at each checkpoint to validate independently
- User MUST approve before proceeding to next session
