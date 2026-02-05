export type { HobbyProject } from './types';

import type { HobbyProject } from './types';

export const hobbyProjects: HobbyProject[] = [
	{
		id: 'sdd-sub5',
		title: 'Spec driven development',
		description: 'A new trial to see how far one can push agentic coding in 2025. Rebuilding an old WordPress/WooCommerce site from scratch into a jamstack using headless CMS and eCommerce platforms.',
		technologies: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'Sentry', 'CommerceLayer', 'Cloudflare']
	},
	{
		id: 'daddy-status',
		title: 'Daddy Status monitor',
		description: 'A crude embedded app that monitored my MS Teams status, disguised in a picture frame. Used to stand outside my work study during covid times when working from home with two small children who every now and then bursted into my room while in meetings.',
		url: 'https://github.com/tobylo/daddy-status/blob/master/README.md',
		technologies: ['C', 'ESP32', 'GraphAPI', 'OAuth']
	}
];
