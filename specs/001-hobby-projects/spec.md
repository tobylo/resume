# Feature Specification: Hobby Projects Section

**Feature Branch**: `001-hobby-projects`
**Created**: 2026-02-05
**Status**: Draft
**Input**: User description: "Somewhere on the page I'd like to include the hobby projects that I've worked on, perhaps with an image, a title and a description. It shouldn't take up too much space, my work resume is still the most important."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Hobby Projects at a Glance (Priority: P1)

A visitor browsing the resume scrolls past the work experience and sees a compact section showcasing the site owner's hobby projects. Each project shows a thumbnail image, a title, and a short description. The section is clearly secondary to the work timeline above and does not compete for visual attention.

**Why this priority**: This is the core value of the feature — making hobby projects visible without detracting from the primary work resume content.

**Independent Test**: Can be fully tested by scrolling the page and verifying that hobby project cards render below the main content with image, title, and description visible.

**Acceptance Scenarios**:

1. **Given** the page has loaded, **When** the visitor scrolls past the work experience timeline, **Then** they see a "Hobby Projects" section containing one or more project cards
2. **Given** a hobby project card is visible, **When** the visitor looks at it, **Then** they see a thumbnail image, a project title, and a short description
3. **Given** the hobby projects section is visible alongside the work timeline, **When** the visitor compares both sections, **Then** the work timeline is clearly the dominant content (larger, more prominent placement)

---

### User Story 2 - Browse Hobby Projects on Mobile (Priority: P2)

A visitor on a mobile device sees the hobby projects section stacked vertically in a compact layout that does not require excessive scrolling.

**Why this priority**: Mobile responsiveness is essential for a resume site but is secondary to the core feature rendering correctly.

**Independent Test**: Can be tested by viewing the page at mobile viewport widths (320px-768px) and verifying hobby project cards stack cleanly.

**Acceptance Scenarios**:

1. **Given** the visitor is on a mobile device, **When** they scroll to the hobby projects section, **Then** the cards display in a single-column layout with appropriately sized images
2. **Given** the visitor is on a tablet or desktop, **When** they view the hobby projects section, **Then** the cards display in a multi-column grid layout

---

### User Story 3 - Hobby Projects in Print (Priority: P3)

When the visitor prints the page, hobby projects are hidden so they do not consume paper space that the work resume needs.

**Why this priority**: Print support exists in the current site but hobby projects are secondary content that must not crowd the printed resume.

**Independent Test**: Can be tested by using the browser print preview and verifying hobby projects are hidden in the print layout.

**Acceptance Scenarios**:

1. **Given** the visitor triggers print, **When** the print preview renders, **Then** hobby projects are hidden from print output to preserve space for the work resume

---

### Edge Cases

- What happens when a hobby project has no image? The card MUST still render with a placeholder or fallback visual.
- What happens when the description text is very long? Text MUST be truncated or clamped to maintain the compact card layout.
- What happens when there is only one hobby project? The section MUST still render correctly without visual imbalance.

## Clarifications

### Session 2026-02-05

- Q: Are hobby project cards clickable when they have a URL? → A: Cards with a URL are clickable links that open in a new tab; cards without a URL are static (non-interactive).
- Q: Should hobby project cards display technology tags? → A: Technologies are shown only on hover or expand (hidden by default) to keep the compact layout.
- Q: What image aspect ratio should hobby project thumbnails use? → A: Flexible — accept any aspect ratio, crop/fit to a consistent container using object-fit.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The page MUST display a "Hobby Projects" section below the existing work experience content
- **FR-002**: Each hobby project card MUST display a thumbnail image, a title, and a short description
- **FR-003**: The hobby projects section MUST be visually secondary to the work experience timeline (smaller heading, compact cards, lighter visual weight)
- **FR-004**: The section MUST support a configurable list of hobby projects defined in a data file, following the existing project data pattern
- **FR-005**: Hobby project cards MUST be responsive across mobile, tablet, and desktop breakpoints
- **FR-006**: The section MUST be hidden when the page is printed
- **FR-007**: Each hobby project card MUST handle missing images gracefully with a fallback visual
- **FR-008**: Description text MUST be clamped to a maximum of 3 lines to maintain compact layout
- **FR-009**: Cards with a URL MUST be clickable and open the link in a new tab; cards without a URL MUST be static (non-interactive)
- **FR-010**: Technology tags MUST be hidden by default and revealed only on hover or expand interaction to preserve compact layout
- **FR-011**: Thumbnail images MUST accept any aspect ratio and be cropped/fitted to a consistent container size

### Key Entities

- **HobbyProject**: Represents a personal/hobby project. Key attributes: id, title, description, image path (optional), optional URL link to the project, optional list of technologies used

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Visitors can identify all hobby projects within 5 seconds of scrolling to the section
- **SC-002**: The hobby projects section occupies no more than 30% of the visible page height at any viewport width
- **SC-003**: The page maintains a Lighthouse performance score of 95+ after the feature is added
- **SC-004**: The hobby projects section renders correctly at viewport widths from 320px to 2560px
- **SC-005**: Print output contains zero hobby project content, preserving full space for the work resume

### Assumptions

- Hobby project images will be provided by the user as static assets (WebP format preferred per constitution)
- The number of hobby projects is expected to be small (2-6 items) and will not require pagination or filtering
- The section placement is below the main grid (work experience + sidebar) as a full-width footer-style section
