# Data Model: Job Fit Analyzer

**Feature**: 002-job-fit-analyzer
**Date**: 2026-02-05

## Entities

### JobDescription (Input)

User-provided job description text for analysis.

| Field          | Type   | Constraints     | Description                             |
| -------------- | ------ | --------------- | --------------------------------------- |
| text           | string | 50-10,000 chars | Raw job description from recruiter      |
| turnstileToken | string | Required        | Cloudflare Turnstile verification token |

**Validation Rules**:

- Minimum 50 characters (FR-003)
- Maximum 10,000 characters (Edge case)
- Must pass Turnstile verification (FR-012)

### FitAnalysis (Output)

Structured analysis returned by the LLM.

| Field          | Type                                 | Description            |
| -------------- | ------------------------------------ | ---------------------- |
| overallFit     | 'strong' \| 'partial' \| 'not-ideal' | Qualitative assessment |
| overallSummary | string                               | 1-2 sentence summary   |
| strengths      | StrengthItem[]                       | Why Tobias fits        |
| gaps           | GapItem[]                            | Potential gaps         |

### StrengthItem

| Field            | Type     | Description                        |
| ---------------- | -------- | ---------------------------------- |
| title            | string   | Brief strength title               |
| description      | string   | Explanation with resume references |
| resumeReferences | string[] | Specific items from resume         |

### GapItem

| Field       | Type    | Description                                           |
| ----------- | ------- | ----------------------------------------------------- |
| title       | string  | Brief gap title                                       |
| description | string  | Honest assessment                                     |
| mitigation  | string? | Optional: related experience that partially addresses |

### RateLimitEntry (Internal)

KV storage for rate limiting.

| Key Pattern                 | Value          | TTL   |
| --------------------------- | -------------- | ----- |
| `rate:{ip}:{hourTimestamp}` | number (count) | 3600s |

**Example**: `rate:192.168.1.1:1707148800` → `3`

### ResumeData (Compiled Context)

Build-time compiled resume data for LLM context.

| Field          | Type                  | Source                            |
| -------------- | --------------------- | --------------------------------- |
| education      | EducationEntry        | +page.svelte (hardcoded)          |
| certifications | CertificationEntry[]  | +page.svelte (hardcoded)          |
| languages      | LanguageEntry[]       | +page.svelte (hardcoded)          |
| projects       | ProjectSummary[]      | src/lib/projects/                 |
| hobbyProjects  | HobbyProjectSummary[] | src/lib/hobby-projects/           |
| skills         | string[]              | Derived from project technologies |

## TypeScript Type Definitions

```typescript
// src/lib/job-fit/types.ts

// === Request/Response Types ===

export interface AnalyzeRequest {
	jobDescription: string;
	turnstileToken: string;
}

export interface AnalyzeResponse {
	success: true;
	analysis: FitAnalysis;
}

export interface AnalyzeErrorResponse {
	success: false;
	error: string;
	code: 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'CAPTCHA_FAILED' | 'LLM_ERROR' | 'INTERNAL_ERROR';
}

// === Analysis Types ===

export type OverallFit = 'strong' | 'partial' | 'not-ideal';

export interface FitAnalysis {
	overallFit: OverallFit;
	overallSummary: string;
	strengths: StrengthItem[];
	gaps: GapItem[];
}

export interface StrengthItem {
	title: string;
	description: string;
	resumeReferences: string[];
}

export interface GapItem {
	title: string;
	description: string;
	mitigation?: string;
}

// === Resume Context Types ===

export interface ResumeContext {
	education: EducationEntry;
	certifications: CertificationEntry[];
	languages: LanguageEntry[];
	projects: ProjectSummary[];
	hobbyProjects: HobbyProjectSummary[];
	allSkills: string[];
}

export interface EducationEntry {
	degree: string;
	field: string;
	institution: string;
	years: string;
}

export interface CertificationEntry {
	name: string;
	issuer: string;
	url?: string;
}

export interface LanguageEntry {
	language: string;
	level: 'Native' | 'Fluent' | 'Basic';
}

export interface ProjectSummary {
	company: string;
	role: string;
	description: string;
	technologies: string[];
	period: string;
}

export interface HobbyProjectSummary {
	title: string;
	description: string;
	technologies: string[];
}
```

## State Transitions

### Dialog State Machine

```
[Closed] ──(click button)──→ [Input]
   ↑                            │
   │                            ├──(submit valid)──→ [Loading]
   │                            │                        │
   │                            │                        ├──(success)──→ [Result]
   │                            │                        │                  │
   │                            │                        └──(error)────→ [Error]
   │                            │                                          │
   │                            └──(close)─────────────────────────────────┤
   │                                                                       │
   └───────────────────────────(close)─────────────────────────────────────┘
```

**States**:

- `closed`: Dialog not visible
- `input`: Dialog open, awaiting job description input
- `loading`: Request in flight, showing spinner
- `result`: Analysis displayed successfully
- `error`: Error message displayed with retry option

## Relationships

```
┌─────────────────┐     validates      ┌──────────────┐
│  JobDescription │────────────────────│   Turnstile  │
└────────┬────────┘                    └──────────────┘
         │
         │ rate-limited by
         ▼
┌─────────────────┐
│ RateLimitEntry  │
└────────┬────────┘
         │
         │ if allowed
         ▼
┌─────────────────┐    provides context  ┌──────────────┐
│    LLM Call     │◄─────────────────────│  ResumeData  │
└────────┬────────┘                      └──────────────┘
         │
         │ returns
         ▼
┌─────────────────┐
│  FitAnalysis    │
└─────────────────┘
```
