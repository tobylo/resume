import type { Project } from './types';

export const brandskyddsforeningen: Project = {
	id: 'brandskyddsforeningen',
	company: 'Brandskyddsföreningen',
	role: 'System Developer & Frontend Lead',
	description:
		"Full-stack position as frontend lead on a progressive web app serving many kinds of users, built generically to take on new service offerings. The inspection flow works fully offline and syncs when back online, or whenever the inspector chooses. Used by all of Elektriska Nämnden's licensed inspectors in the field. CI/CD in Azure DevOps, Bicep for IaC, hosted in Azure.",
	technologies: [
		'C#',
		'Dapper',
		'Duende BFF',
		'React',
		'TypeScript',
		'Vite',
		'React Router',
		'IndexedDB',
		'PWA',
		'Bicep',
		'Azure DevOps'
	],
	period: {
		start: '2023',
		end: '2024'
	}
};
