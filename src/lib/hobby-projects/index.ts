export type { HobbyProject, HobbyVisual, HobbyIllustration, HobbyLink } from './types';

import type { HobbyProject } from './types';
import { devisor } from '#lib/devisor.ts';

// The hobby lab's cards, in page order. The job fit analyzer reads title,
// description and technologies from here too.
export const hobbyProjects: HobbyProject[] = [
	{
		id: 'devisor',
		title: devisor.name,
		description: `${devisor.tagline} ${devisor.loop} ${devisor.observable.lead} ${devisor.observable.body} ${devisor.status}.`,
		summary: devisor.tagline,
		meta: 'Go · Private repo · 2026',
		visual: { kind: 'devisor', alt: '' },
		links: [{ label: 'Read the write-up', href: '/devisor' }],
		technologies: [...devisor.technologies],
		cv: { name: devisor.name, line: 'a development supervisor for coding agents, in Go.' }
	},
	{
		id: 'sub5-backoffice',
		title: 'SUB5 event backoffice & rider app',
		description:
			'Replaced the Excel workflows for motorcycle track days: check-in, transponder and pit-box assignment, MYLAPS export, groups set from live lap times, and a page where riders follow their own laps.',
		meta: 'SvelteKit · Cloudflare · In use',
		visual: {
			kind: 'track',
			alt: 'A rider checked in at the track: transponder #4471, Black Group, lap time 1:07.5.'
		},
		technologies: ['SvelteKit', 'Svelte 5', 'Cloudflare Workers', 'D1', 'Cloudflare Access'],
		cv: { name: 'SUB5 backoffice', line: 'track-day operations on SvelteKit and Cloudflare.' }
	},
	{
		id: 'sdd-sub5',
		title: 'SUB5 Racing & Event site',
		description:
			'How far can you push agentic coding? Rebuilt a complete WordPress and WooCommerce site from scratch as a jamstack on a headless CMS and commerce platform.',
		meta: 'Agentic coding trial · 2025',
		visual: {
			kind: 'image',
			src: '/hobby-projects/sdd-sub5.webp',
			width: 1742,
			height: 963,
			alt: 'The SUB5 Racing & Event homepage: a rider leaning into a corner under the headline "Utveckla din körning på bana".'
		},
		technologies: [
			'SvelteKit',
			'TypeScript',
			'Tailwind',
			'CommerceLayer',
			'Cloudflare',
			'Sentry',
			'Resend'
		]
	},
	{
		id: 'auto-clicker',
		title: 'Auto clicker',
		description:
			'Clicking, macro recording and playback for Wayland (KDE Plasma, niri, Hyprland). Lives in the tray, hotkeys work in fullscreen games, and nothing stays pressed when you stop.',
		meta: 'Rust · Linux · Open source',
		visual: { kind: 'keys', alt: 'The hotkey Ctrl + Shift + F6 starts and stops clicking.' },
		links: [{ label: 'GitHub', href: 'https://github.com/tobylo/auto-clicker' }],
		technologies: ['Rust', 'Linux', 'Wayland', 'KDE Plasma'],
		cv: { name: 'Auto clicker', line: 'Rust tray app for Wayland.' }
	},
	{
		id: 'daddy-status',
		title: 'Daddy Status',
		description:
			'A picture frame outside my study that showed my Teams status, built during the pandemic when two small children kept bursting into meetings.',
		meta: 'C · ESP32 · Open source',
		visual: {
			kind: 'image',
			src: '/hobby-projects/daddy-status.webp',
			width: 1768,
			height: 2048,
			alt: 'A white picture frame with a cartoon portrait and the statuses "Pappa-status", "I möte" and "Upptagen".'
		},
		links: [{ label: 'GitHub', href: 'https://github.com/tobylo/daddy-status' }],
		technologies: ['C', 'ESP32', 'GraphAPI', 'OAuth']
	},
	{
		id: 'bgg-what-to-play',
		title: 'What to Play',
		description:
			'A BoardGameGeek data dump in a vector database, queried with RAG to pick a game from player count and preferences.',
		meta: 'RAG experiment · Open source',
		visual: {
			kind: 'query',
			alt: 'A question to the search: "Four of us, about an hour, nothing too heavy. What should we play?"'
		},
		links: [
			{ label: 'Scraper on GitHub', href: 'https://github.com/tobylo/bgg-scraper' },
			{ label: 'Search on GitHub', href: 'https://github.com/tobylo/bgg-vectorizer-search' }
		],
		technologies: ['Bun', 'TypeScript', 'Weaviate', 'OpenAI']
	}
];
