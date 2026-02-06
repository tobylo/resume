# Feature Specification: Job Fit Analyzer

**Feature Branch**: `002-job-fit-analyzer`
**Created**: 2026-02-05
**Status**: Draft
**Input**: User description: "Add a feature where a visiting recruiter can hit a 'Is Tobias suitable for..' button. A dialog opens asking for a job description. This is sent to an LLM which compares the job description against all experience and education, returning an honest review of fit (pros and cons). The LLM integration must be firewalled to prevent misuse."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Submit Job Description for Fit Analysis (Priority: P1)

A recruiter visits Tobias's portfolio site and wants to quickly assess whether he would be a good fit for an open position. They click the "Is Tobias suitable for..." button, paste or type the job description into a dialog, and receive an AI-generated analysis comparing Tobias's qualifications against the role requirements.

**Why this priority**: This is the core value proposition - enabling recruiters to quickly get an honest assessment without manual review. Without this, the feature has no purpose.

**Independent Test**: Can be fully tested by clicking the button, entering a sample job description, and verifying a meaningful analysis is returned within reasonable time.

**Acceptance Scenarios**:

1. **Given** a recruiter is viewing the portfolio, **When** they click the "Is Tobias suitable for..." button, **Then** a dialog opens with a text area for entering a job description
2. **Given** the dialog is open, **When** the recruiter enters a job description (minimum 50 characters) and submits, **Then** the system displays a loading indicator while processing
3. **Given** a valid job description was submitted, **When** processing completes, **Then** the recruiter sees a structured analysis with an overall fit summary, "Why Tobias fits" section, and "Potential gaps" section
4. **Given** any analysis is displayed, **When** the recruiter reads it, **Then** the analysis references specific skills/experience from Tobias's actual resume data

---

### User Story 2 - Close and Dismiss Dialog (Priority: P2)

A recruiter opens the analysis dialog but decides not to proceed, or has finished reviewing the results and wants to return to the portfolio.

**Why this priority**: Essential for basic usability - users must be able to exit the dialog at any point without confusion.

**Independent Test**: Can be tested by opening the dialog and verifying all close mechanisms work (X button, clicking outside, Escape key).

**Acceptance Scenarios**:

1. **Given** the dialog is open (any state), **When** the recruiter clicks the close button, **Then** the dialog closes and returns to the portfolio view
2. **Given** the dialog is open, **When** the recruiter clicks outside the dialog area, **Then** the dialog closes
3. **Given** the dialog is open, **When** the recruiter presses the Escape key, **Then** the dialog closes
4. **Given** an analysis was displayed and the dialog is closed, **When** the recruiter reopens the dialog, **Then** it shows a fresh state (no previous results)

---

### User Story 3 - Handle Errors Gracefully (Priority: P3)

When something goes wrong (network issues, service unavailable, rate limiting), the recruiter receives helpful feedback rather than a broken experience.

**Why this priority**: Important for production readiness but not core functionality. Users should understand when and why the feature isn't working.

**Independent Test**: Can be tested by simulating error conditions and verifying appropriate error messages are displayed.

**Acceptance Scenarios**:

1. **Given** the recruiter submits a job description, **When** the LLM service is unavailable, **Then** a friendly error message is displayed suggesting to try again later
2. **Given** the recruiter submits a job description, **When** rate limits are exceeded, **Then** a message indicates too many requests and suggests waiting
3. **Given** an error occurred, **When** the recruiter views the error, **Then** they have an option to try again without re-entering their job description

---

### Edge Cases

- What happens when the job description is too short (under 50 characters)? System shows validation message asking for more detail.
- What happens when the job description is extremely long (over 10,000 characters)? System truncates or shows a max length warning.
- What happens when the user submits an empty form? Submit button is disabled until minimum content is entered.
- How does the system handle non-English job descriptions? Analysis proceeds in the detected language or falls back to English.
- What happens if the LLM returns an unexpectedly formatted response? System shows a generic fallback message and logs the issue.
- What happens if someone tries to abuse the endpoint with non-job-description content? The system prompt constrains responses to job fit analysis only.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST display a fixed-position floating "Is Tobias suitable for..." button that remains visible while scrolling
- **FR-002**: System MUST open a modal dialog when the button is clicked
- **FR-003**: Dialog MUST contain a text area for entering job descriptions with a minimum of 50 characters required
- **FR-004**: Dialog MUST contain a submit button that is disabled until minimum character count is met
- **FR-005**: System MUST show a loading state while the analysis is being generated
- **FR-006**: System MUST display the analysis results with: (1) qualitative overall summary (e.g., "Strong fit", "Partial fit", "Not ideal"), (2) "Why Tobias fits" section, and (3) "Potential gaps" section
- **FR-007**: Analysis MUST reference actual data from Tobias's resume/portfolio (skills, experience, education)
- **FR-008**: System MUST provide honest assessment including potential gaps or areas where qualifications don't match
- **FR-009**: System MUST allow closing the dialog via close button, clicking outside, or pressing Escape
- **FR-010**: LLM integration MUST be secured so it can only be used for job fit analysis (not general-purpose queries)
- **FR-011**: System MUST implement rate limiting to prevent abuse (default: 5 requests per IP per hour)
- **FR-012**: System MUST require CAPTCHA verification before processing each analysis request
- **FR-013**: System MUST validate that submitted content appears to be a job description before processing (heuristic: contains ≥2 job-related keywords such as role, responsibilities, requirements, experience, skills, qualifications)
- **FR-014**: System MUST handle errors gracefully with user-friendly messages
- **FR-015**: Dialog MUST be accessible (keyboard navigable, screen reader compatible)

### Key Entities

- **Job Description**: Text input from recruiter describing an open position (50-10,000 characters)
- **Fit Analysis**: Structured response containing qualitative overall summary (Strong fit/Partial fit/Not ideal), strengths match section, and potential gaps section
- **Resume Data**: Tobias's skills, work experience, education, and projects (sourced from existing portfolio data)
- **Request Context**: Metadata for rate limiting (IP address, timestamp, request count)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Recruiters can complete the entire flow (open dialog, enter description, receive analysis) in under 30 seconds of interaction time (excluding LLM processing)
- **SC-002**: LLM processing returns analysis within 15 seconds for 95% of requests
- **SC-003**: Analysis responses reference at least 3 specific items from Tobias's actual resume data
- **SC-004**: 100% of attempts to use the LLM for non-job-fit purposes receive only job-fit-related responses (no general chat capability)
- **SC-005**: Dialog is fully usable via keyboard only (all interactive elements focusable and operable)
- **SC-006**: Rate limiting successfully blocks excessive requests while allowing legitimate use

## Clarifications

### Session 2026-02-05

- Q: Where should the "Is Tobias suitable for..." button be placed on the page? → A: Fixed position (floating button always visible while scrolling)
- Q: How should the system manage LLM API costs? → A: Rate limiting (5/hr/IP) plus CAPTCHA verification before each request
- Q: What format should the analysis output take? → A: Pros/cons sections plus qualitative overall summary (e.g., "Strong fit", "Partial fit", "Not ideal")
- Q: What CAPTCHA solution will be used? → A: Cloudflare Turnstile (privacy-focused, free, native Cloudflare integration)

## Assumptions

- The portfolio already contains structured data about Tobias's experience, skills, and education that can be passed to the LLM
- A suitable LLM service is available that can accept system prompts to constrain output
- The hosting environment supports server-side API calls (not a purely static site deployment for this feature)
- Basic styling will follow existing portfolio design patterns
