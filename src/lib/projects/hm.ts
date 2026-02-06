import type { Project } from './types';

export const hm: Project = {
	id: 'hm',
	company: 'H&M',
	role: 'System Developer',
	description:
		'Development of a scalable, message-based system for rapid expansion possibilities. The platform integrated with existing services and contained an e-commerce solution and a CMS. Automated onboarding using Azure DevOps. Also implemented a POC for generating suggestions to product descriptions based on product attributes.',
	technologies: [
		'C#',
		'Minimal API',
		'Bicep',
		'CosmosDB',
		'Service Bus',
		'Azure Functions',
		'OpenAI',
		'SQL',
		'ElasticSearch'
	],
	period: {
		start: '2022',
		end: '2023'
	}
};
