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
