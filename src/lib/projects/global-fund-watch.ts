import type { Project } from './types';

export const globalFundWatch: Project = {
	id: 'global-fund-watch',
	company: 'Global Fund Watch',
	role: 'System Developer & Project Lead',
	description:
		'Took over a product previously built by a third party, starting with analysis. Led the move to a cloud-native setup: CI/CD, containerization, a bare-metal Kubernetes hosting environment, refactoring and new development of the product.',
	technologies: [
		'Node.js',
		'React',
		'TypeScript',
		'MongoDB',
		'GraphQL',
		'Kubernetes',
		'Linkerd',
		'Memcached',
		'Redis',
		'Prometheus',
		'Grafana',
		'Helm',
		'Azure DevOps',
		'AKS',
		'KeyVault'
	],
	period: {
		start: '2018',
		end: '2019'
	}
};
