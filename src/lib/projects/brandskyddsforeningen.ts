import type { Project } from './types';

export const brandskyddsforeningen: Project = {
	id: 'brandskyddsforeningen',
	company: 'Brandskyddsföreningen',
	role: 'System Developer & Frontend lead',
	description:
		'Fullstack position but as frontend lead. The system handles many different personas and is generically built to accommodate new service offerings. Frontend is built as a PWA, and parts of it work offline since the application can be used in areas with spotty reception. CI/CD in Azure DevOps, Bicep for IaC, hosted in Azure.',
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
