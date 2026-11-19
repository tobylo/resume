import type { Project } from './types';

export const mfex: Project = {
	id: 'mfex',
	company: 'MFEX Mutual Funds Exchange',
	role: 'DevOps Engineer',
	description:
		'A major B2B digital fund distribution platform. Part of a small DevOps team automating and streamlining delivery for the development teams, from pipelines and code quality to nightly test environments. Migrated an existing Kubernetes setup to a more stable, modern platform, integrated with hosting providers for nightly test environments, and proved out moving all nightly environments to the cloud.',
	technologies: [
		'C#',
		'PowerShell',
		'Bash',
		'Azure DevOps',
		'Octopus Deploy',
		'WhiteSource',
		'SonarQube',
		'Kubernetes',
		'Linkerd',
		'cert-manager',
		'Helm',
		'Datadog'
	],
	period: {
		start: '2020',
		end: '2022'
	}
};
