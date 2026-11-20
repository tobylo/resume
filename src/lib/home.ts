// Homepage copy that isn't project data.

import { projects, yearsInProduction } from '#lib/projects/index.ts';

export interface HeroVariant {
	headline: string;
	lead: string;
}

// Rotates in this order. Each stresses a different side: ownership, delivery, agents.
// Non-breaking spaces keep the last words together so no line ends on a lone word.
export const heroVariants: HeroVariant[] = [
	{
		headline: 'An engineer who thinks like a founder, and takes ownership like one.',
		lead: `${projects.length} client engagements over ${yearsInProduction} years, across finance, retail, IoT and the public sector. I do my best work when I own the product and the outcome, not just the tickets.`
	},
	{
		headline: 'Turning fuzzy problems into software people rely on.',
		lead: 'Engineer and tech lead. I take vague requirements to systems that hold up in production, from offline-first field apps to Kubernetes platforms.'
	},
	{
		headline: 'Rethinking how software gets built in the age of agents.',
		lead: `A hands-on engineer and tech lead with ${yearsInProduction} years in production. These days I'm working out how AI agents fit into a real team's workflow, and building the tooling to make that stick.`
	}
];

export const ROTATE_MS = 7000;

export const openTo = {
	roles: 'Senior / lead product engineering roles with real ownership. Stockholm hybrid or remote.',
	terms: "Permanent · 3 months' notice · SV / EN"
} as const;

export const worksIn = [
	'TypeScript',
	'Go',
	'C#',
	'SQL',
	'Neo4j',
	'Kubernetes',
	'Azure',
	'Cloudflare',
	'OpenTelemetry',
	'Agentic workflows'
] as const;

export const stats = [
	{ value: `${yearsInProduction} yrs`, label: 'in production software' },
	{ value: String(projects.length), label: 'client engagements' },
	{ value: '5+ yrs', label: 'in lead positions' },
	{
		value: 'Founder',
		label: 'of a 20+ person events company that runs itself. I handle its IT and admin.'
	}
] as const;

export const employer =
	'I work as a consultant at Active Solution (merged into Evidi AB in 2026), embedded in client teams across finance, retail, IoT and the public sector.';

// Notable names among the engagements not featured on the homepage.
export const moreClients = ['Cint', 'Global Fund Watch', 'Sveriges Radio', 'St. Jude Medical'];
