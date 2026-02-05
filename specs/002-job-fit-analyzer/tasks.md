# Tasks: Job Fit Analyzer

**Input**: Design documents from `/specs/002-job-fit-analyzer/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.yaml

**Tests**: No automated tests specified - manual testing via `bun run dev` and Cloudflare Pages preview.

**Organization**: Tasks grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, adapter migration, and dependency installation

- [x] T001 Install new dependencies: `bun add -d @sveltejs/adapter-cloudflare && bun add @anthropic-ai/sdk`
- [x] T002 Update svelte.config.js to use adapter-cloudflare instead of adapter-static
- [x] T003 [P] Create wrangler.toml with KV namespace bindings at repository root
- [x] T004 [P] Update src/app.d.ts with Cloudflare Platform types (KV, env vars)
- [x] T005 [P] Create .dev.vars template for local development secrets
- [x] T006 Verify build succeeds with new adapter: `bun run build`

**Checkpoint**: Cloudflare adapter configured, build passes, ready for feature development

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types and data modules that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create src/lib/job-fit/types.ts with all TypeScript interfaces from data-model.md
- [x] T008 [P] Create src/lib/job-fit/resume-data.ts that compiles resume context from existing data modules
- [x] T009 [P] Create src/lib/job-fit/prompt.ts with LLM system prompt template for job fit analysis - include instruction to respond in the same language as the job description
- [x] T010 Run type check to verify types are correct: `bun run check`

**Checkpoint**: Foundation ready - all shared types and data modules available for user stories

---

## Phase 3: User Story 1 - Submit Job Description for Fit Analysis (Priority: P1) 🎯 MVP

**Goal**: Recruiter can click button, enter job description, and receive AI-generated fit analysis

**Independent Test**: Click floating button → enter job description → submit → see structured analysis with strengths/gaps

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create src/lib/JobFitButton.svelte - fixed-position floating button component
- [ ] T012 [P] [US1] Create src/lib/JobFitDialog.svelte - modal dialog with Melt-UI (input state), character counter, max 10000 char limit with warning
- [ ] T013 [US1] Add JobFitButton to src/routes/+page.svelte (import and render)
- [ ] T014 [US1] Add Turnstile widget script and component to JobFitDialog.svelte
- [ ] T015 [US1] Create src/routes/api/analyze/+server.ts with POST handler skeleton
- [ ] T016 [US1] Implement Turnstile verification in +server.ts (call siteverify API)
- [ ] T017 [US1] Implement rate limiting in +server.ts using Cloudflare KV
- [ ] T018 [US1] Implement input validation in +server.ts: (a) reject <50 chars, (b) reject >10000 chars with "description too long" error, (c) job description heuristic - require ≥2 keywords from: role, responsibilities, requirements, experience, skills, qualifications, position, candidate, team, company
- [ ] T019 [US1] Implement Claude API call in +server.ts with system prompt from prompt.ts
- [ ] T020 [US1] Parse and validate LLM response structure in +server.ts - ensure FitAnalysis schema, verify ≥3 total resumeReferences across strengths (SC-003), retry once if insufficient
- [ ] T021 [US1] Add loading state UI to JobFitDialog.svelte (spinner during API call)
- [ ] T022 [US1] Add result display UI to JobFitDialog.svelte (overall fit, strengths, gaps sections)
- [ ] T023 [US1] Wire up form submission in JobFitDialog.svelte → fetch /api/analyze
- [ ] T024 [US1] Manual test: Full flow with real job description - verify (a) analysis quality, (b) interaction time <30s excluding LLM wait (SC-001), (c) analysis references ≥3 resume items (SC-003)
- [ ] T025 [US1] Run quality gates: `bun run check && bun run lint && bun run build`

**Checkpoint**: User Story 1 complete - recruiters can submit job descriptions and receive analyses

---

## Phase 4: User Story 2 - Close and Dismiss Dialog (Priority: P2)

**Goal**: Recruiter can close dialog at any point via close button, outside click, or Escape key

**Independent Test**: Open dialog → verify close via X button, click outside, Escape key all work

### Implementation for User Story 2

- [ ] T026 [US2] Add close button (X) to JobFitDialog.svelte header
- [ ] T027 [US2] Configure Melt-UI dialog for click-outside-to-close behavior
- [ ] T028 [US2] Configure Melt-UI dialog for Escape key handling
- [ ] T029 [US2] Add dialog state reset on close (clear previous results when reopening)
- [ ] T030 [US2] Manual test: All close mechanisms work in all dialog states (input, loading, result, error)
- [ ] T031 [US2] Run quality gates: `bun run check && bun run lint`

**Checkpoint**: User Story 2 complete - dialog dismissal works consistently

---

## Phase 5: User Story 3 - Handle Errors Gracefully (Priority: P3)

**Goal**: When errors occur, recruiter sees helpful messages and can retry

**Independent Test**: Simulate error conditions → verify friendly error messages and retry option

### Implementation for User Story 3

- [ ] T032 [US3] Add error state UI to JobFitDialog.svelte with user-friendly error messages
- [ ] T033 [US3] Map API error codes to user-friendly messages in JobFitDialog.svelte, including LLM_ERROR for malformed/unexpected responses ("Analysis couldn't be completed. Please try again.")
- [ ] T034 [US3] Add retry button to error state (preserves job description text)
- [ ] T035 [US3] Handle network errors (fetch failures) with appropriate messaging
- [ ] T036 [US3] Handle rate limit errors (429) with "try again in an hour" message
- [ ] T037 [US3] Handle CAPTCHA errors (403) with "verification failed" message
- [ ] T038 [US3] Manual test: Trigger each error type and verify messaging
- [ ] T039 [US3] Run quality gates: `bun run check && bun run lint`

**Checkpoint**: User Story 3 complete - all error scenarios handled gracefully

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, security audit, final validation

- [ ] T040 Ensure dialog is keyboard navigable (focus trap, tab order) per FR-015
- [ ] T041 Add ARIA labels to dialog elements for screen reader compatibility
- [ ] T042 [P] Review button/dialog styling for dark mode compatibility
- [ ] T043 [P] Verify floating button doesn't obscure content on mobile viewports
- [ ] T044 Run security-auditor agent on src/routes/api/analyze/+server.ts
- [ ] T045 Run code-reviewer agent on all new components
- [ ] T046 Final quality gates: `bun run check && bun run lint && bun run build`
- [ ] T047 Manual end-to-end test with Cloudflare Pages preview deployment
- [ ] T048 Update specs/002-job-fit-analyzer/quickstart.md with any discovered setup notes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup (T006 build passing)
- **User Story 1 (Phase 3)**: Depends on Foundational (T010 types verified)
- **User Story 2 (Phase 4)**: Depends on US1 dialog component existing (T012)
- **User Story 3 (Phase 5)**: Depends on US1 API endpoint existing (T015-T020)
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: MVP - can be delivered standalone after Foundational phase
- **User Story 2 (P2)**: Enhances US1 - requires dialog to exist but tests independently
- **User Story 3 (P3)**: Enhances US1 - requires API to exist but tests independently

### Within User Story 1 (Critical Path)

```
T011, T012 (parallel: button + dialog skeleton)
    ↓
T013 (integrate button into page)
    ↓
T014 (add Turnstile to dialog)
    ↓
T015 → T016 → T017 → T018 → T019 → T020 (API endpoint chain)
    ↓
T021, T022 (parallel: loading + result UI)
    ↓
T023 (wire up submission)
    ↓
T024, T025 (test + quality gates)
```

### Parallel Opportunities

**Phase 1 (Setup)**:

```
T003, T004, T005 can run in parallel (different files)
```

**Phase 2 (Foundational)**:

```
T008, T009 can run in parallel (different files, both depend on T007)
```

**Phase 3 (US1)**:

```
T011, T012 can run in parallel (button and dialog are separate components)
T021, T022 can run in parallel (loading and result UI are separate states)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup → Cloudflare adapter working
2. Complete Phase 2: Foundational → Types and resume data ready
3. Complete Phase 3: User Story 1 → Full analysis flow working
4. **STOP and VALIDATE**: Test with real job descriptions
5. Deploy to Cloudflare Pages preview for validation

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → **MVP: Analyzable!** → Deploy/Demo
3. Add User Story 2 → Better UX (closing) → Deploy
4. Add User Story 3 → Production-ready (error handling) → Deploy
5. Polish → Accessible, secure, reviewed → Final release

### Single Developer Strategy

Work sequentially through phases:

1. Setup (T001-T006)
2. Foundation (T007-T010)
3. US1 Implementation (T011-T025)
4. Validate MVP works end-to-end
5. US2 (T026-T031)
6. US3 (T032-T039)
7. Polish (T040-T048)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Manual testing approach per plan.md (no automated test suite)
- Use svelte:svelte-file-editor agent for all Svelte component tasks
- Use security-auditor agent for API endpoint review (T044)
- Use code-reviewer agent for final review (T045)
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
