export type { HobbyProject } from './types';

import type { HobbyProject } from './types';

export const hobbyProjects: HobbyProject[] = [
	{
		id: 'devisor',
		title: 'Devisor',
		description:
			'A development supervisor that structures the work around coding agents, from first spike to shipped feature: exploring ideas with spikes and proofs of concept, shaping the plan, triaging what comes in, and building in greenfield and brownfield codebases. Each step runs as a structured workflow on any agent harness, and every run is traced so the workflows can improve over time. In active development in a private repository; a testbed for how far agentic development can go in 2026.',
		technologies: ['Go', 'Agentic workflows', 'OpenTelemetry']
	},
	{
		id: 'sdd-sub5',
		title: 'SUB5 Racing & Event',
		image: '/hobby-projects/sdd-sub5.webp',
		description:
			'A 2025 trial to see how far one can push agentic coding. Rebuilding an old, complete WordPress/WooCommerce site from scratch into a jamstack using headless CMS and eCommerce platforms.',
		technologies: [
			'SvelteKit',
			'TypeScript',
			'TailwindCSS',
			'Sentry',
			'CommerceLayer',
			'Cloudflare',
			'Resend'
		]
	},
	{
		id: 'daddy-status',
		title: 'Daddy Status monitor',
		description:
			'A crude embedded app that monitored my MS Teams status, disguised in a picture frame. Used to stand outside my work study during covid times when working from home with two small children who every now and then bursted into my room while in meetings.',
		image: '/hobby-projects/daddy-status.webp',
		url: 'https://github.com/tobylo/daddy-status/blob/master/README.md',
		technologies: ['C', 'ESP32', 'GraphAPI', 'OAuth']
	},
	{
		id: 'bgg-what-to-play',
		title: 'What to Play (BGG)',
		description:
			'Explored trying to use a data dump of BoardGameGeek imported into a vector database and use RAG to query what game to play based on how many players we have and our preferences.',
		image: '',
		url: 'https://github.com/tobylo/bgg-scraper',
		technologies: ['Bun', 'TypeScript', 'Weaviate', 'OpenAI']
	}
];
