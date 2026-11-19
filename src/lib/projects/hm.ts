import type { Project } from './types';

export const hm: Project = {
	id: 'hm',
	company: 'H&M',
	role: 'System Developer · Platform',
	description:
		'Built a scalable, message-based e-commerce and CMS platform on Azure, integrated with existing services, with automated onboarding through Azure DevOps. Also built an early OpenAI proof of concept for generating product descriptions from product attributes.',
	outcome: 'Took the platform to launch-ready. The department was shut down weeks before go-live.',
	featured: true,
	keyTechnologies: ['Event-driven', 'Service Bus', 'Cosmos DB', 'Azure Functions', 'OpenAI', 'C#'],
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
