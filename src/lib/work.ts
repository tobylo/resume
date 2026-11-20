// The full timeline at /work: every engagement, grouped into eras and then by client.

import {
	projects,
	groupByClient,
	headlineTags,
	firstYear,
	yearsInProduction,
	type Project
} from '#lib/projects/index.ts';
import { formatPeriod } from '#lib/format.ts';

/** One client on the timeline: a single engagement, or a group of them shown as one row. */
export interface TimelineClient {
	id: string;
	name: string;
	role: string;
	period: Project['period'];
	tags: string[];
	projects: Project[];
}

export interface Era {
	id: string;
	heading: string;
	/** "2022 — now": from the first start to the last end of the era's engagements. */
	period: string;
	engagements: number;
	clients: TimelineClient[];
}

// Newest first. An engagement belongs to the first era it started in or after.
const eraDefinitions = [
	{ from: 2022, heading: 'Leading the frontend, owning the platform' },
	{ from: 2016, heading: 'Cloud, Kubernetes and a first tech lead role' },
	{ from: 2013, heading: 'Many clients, many stacks' },
	{ from: 2009, heading: 'Where it started' }
] as const;

/** One period covering all of them: earliest start to latest end, or "now" if any is ongoing. */
function spanOf(list: Project[]): Project['period'] {
	const starts = list.map((project) => Number(project.period.start));
	const ends = list.map((project) => project.period.end);
	const ongoing = ends.includes(null);
	return {
		start: String(Math.min(...starts)),
		end: ongoing ? null : String(Math.max(...ends.map(Number)))
	};
}

function toClient(group: { id: string; name: string; projects: Project[] }): TimelineClient {
	return {
		...group,
		role: [...new Set(group.projects.map((project) => project.role))].join(' / '),
		period: spanOf(group.projects),
		tags: [...new Set(group.projects.flatMap(headlineTags))].slice(0, 8)
	};
}

function eraOf(project: Project) {
	const era = eraDefinitions.find(({ from }) => Number(project.period.start) >= from);
	if (!era) throw new Error(`No timeline era for ${project.id} (${project.period.start})`);
	return era;
}

export const eras: Era[] = eraDefinitions.flatMap((definition) => {
	const inEra = projects.filter((project) => eraOf(project) === definition);
	// An era with no engagements has no period to show, so it is left out.
	if (!inEra.length) return [];
	return {
		id: `era-${definition.from}`,
		heading: definition.heading,
		period: formatPeriod(spanOf(inEra)),
		engagements: inEra.length,
		clients: groupByClient(inEra).map(toClient)
	};
});

export const timelineStats = {
	engagements: projects.length,
	clients: groupByClient(projects).length,
	firstYear,
	years: yearsInProduction
};

export const plural = (count: number, noun: string) => `${count} ${noun}${count === 1 ? '' : 's'}`;
