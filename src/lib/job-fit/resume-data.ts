import { projects } from '$lib/projects';
import { hobbyProjects } from '$lib/hobby-projects';
import { certifications, education, languages } from '$lib/credentials';
import type { ResumeContext } from './types';

export const resumeContext: ResumeContext = {
	education: {
		degree: education.degree,
		field: education.field,
		institution: education.institution,
		years: education.years
	},
	certifications: certifications.map(({ name, issuer, url }) => ({ name, issuer, url })),
	languages: languages.map(({ language, level }) => ({ language, level })),
	projects: projects.map((p) => ({
		company: p.company,
		role: p.role,
		description: p.description,
		outcome: p.outcome,
		technologies: p.technologies,
		period: p.period.end ? `${p.period.start}-${p.period.end}` : `${p.period.start}-present`
	})),
	hobbyProjects: hobbyProjects.map((p) => ({
		title: p.title,
		description: p.description,
		technologies: p.technologies ?? []
	})),
	allSkills: [...new Set(projects.flatMap((p) => p.technologies))].sort((a, b) =>
		a.localeCompare(b)
	)
};
