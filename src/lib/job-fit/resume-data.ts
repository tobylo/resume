import { projects } from '$lib/projects';
import { hobbyProjects } from '$lib/hobby-projects';
import type { ResumeContext } from './types';

export const resumeContext: ResumeContext = {
	education: {
		degree: 'Bachelor of Engineering',
		field: 'Information Technology',
		institution: 'Novia University of Applied Sciences',
		years: '2005-2009'
	},
	certifications: [
		{
			name: 'Certified Kubernetes Administrator (CKA)',
			issuer: 'The Linux Foundation',
			url: 'https://www.credly.com/badges/591adb36-1424-4119-81e2-2ee806063a41'
		},
		{
			name: 'Certified Kubernetes Application Developer (CKAD)',
			issuer: 'The Linux Foundation',
			url: 'https://www.credly.com/badges/ea350be1-0743-44ec-873e-fe214628e15d'
		},
		{
			name: 'DevOps Engineer Expert',
			issuer: 'Microsoft',
			url: 'https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/66F629B1B2DF4B7A'
		},
		{
			name: 'Azure Cosmos DB Developer Specialty',
			issuer: 'Microsoft',
			url: 'https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/5F903E01ED02CCA5'
		},
		{
			name: 'Azure Administrator Associate',
			issuer: 'Microsoft',
			url: 'https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/C654B890A7D89E44'
		},
		{ name: 'MCSA: Web Applications', issuer: 'Microsoft' },
		{ name: 'Solutions Developer: App Builder', issuer: 'Microsoft' },
		{ name: 'Solutions Developer: Web Applications', issuer: 'Microsoft' },
		{ name: 'Specialist: C#', issuer: 'Microsoft' }
	],
	languages: [
		{ language: 'Swedish', level: 'Native' },
		{ language: 'English', level: 'Fluent' },
		{ language: 'Finnish', level: 'Basic' }
	],
	projects: projects.map((p) => ({
		company: p.company,
		role: p.role,
		description: p.description,
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
