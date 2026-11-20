// The printable CV at /cv: two A4 pages, derived from the shared data so the CV
// can never drift from the site. Copy lives with the data it describes.

import {
	projects,
	featuredProjects,
	groupByClient,
	headlineTags,
	type Project
} from '#lib/projects/index.ts';
import { hobbyProjects } from '#lib/hobby-projects/index.ts';
import { certifications, education, languages, type Certification } from '#lib/credentials.ts';
import { contact, person } from '#lib/site.ts';
import { stats } from '#lib/home.ts';
import { toClient, clientRole } from '#lib/work.ts';
import { formatPeriod } from '#lib/format.ts';

export interface Link {
	label: string;
	href: string;
}

/** "https://www.linkedin.com/in/x/" → "linkedin.com/in/x". */
const bare = (url: string) => url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '');

const site: Link = { label: 'tobylo.dev', href: 'https://tobylo.dev' };

export const header = {
	name: person.name,
	title: person.title,
	location: `${person.location}, ${person.country}`,
	email: { label: contact.cvEmail, href: `mailto:${contact.cvEmail}` },
	linkedIn: { label: bare(contact.linkedIn), href: contact.linkedIn },
	gitHub: { label: bare(contact.gitHub), href: contact.gitHub },
	site
};

export const facts = stats.map(({ value, label, cvLabel }) => ({ value, label: cvLabel ?? label }));

export interface Entry {
	id: string;
	period: string;
	company: string;
	role: string;
	description: string;
	/** The outcome's first sentence, set in bold; the rest follows in body text. */
	outcome?: { lead: string; rest?: string };
	tags: string[];
}

function splitOutcome(outcome: string): Entry['outcome'] {
	const [lead, ...rest] = outcome.split(/(?<=\.)\s+/);
	return { lead, rest: rest.length ? rest.join(' ') : undefined };
}

function toEntry(project: Project): Entry {
	return {
		id: project.id,
		period: formatPeriod(project.period),
		company: project.company,
		role: project.role,
		description: project.cvDescription ?? project.description,
		outcome: project.outcome ? splitOutcome(project.outcome) : undefined,
		tags: headlineTags(project)
	};
}

// Page 1 holds this many featured entries; the rest continue on page 2.
const PAGE_ONE_ENTRIES = 4;
const entries = featuredProjects.map(toEntry);
export const pageOneEntries = entries.slice(0, PAGE_ONE_ENTRIES);
export const pageTwoEntries = entries.slice(PAGE_ONE_ENTRIES);

export interface Row {
	id: string;
	period: string;
	name: string;
	role: string;
	line: string;
}

const earlier = projects.filter((project) => !project.featured);

// One line per client. A group's line is written once, on one of its engagements.
function rowLine(list: Project[], id: string): string {
	const lines = list.flatMap((project) => project.cvDescription ?? []);
	if (lines.length !== 1) {
		throw new Error(`CV row ${id} needs exactly one cvDescription, found ${lines.length}`);
	}
	return lines[0];
}

export const earlierEngagements = {
	count: earlier.length,
	rows: groupByClient(earlier).map((group): Row => {
		const client = toClient(group);
		return {
			id: client.id,
			period: formatPeriod(client.period),
			name: client.name,
			role: clientRole(client),
			line: rowLine(client.projects, client.id)
		};
	})
};

/** "Microsoft: A, B, C" or "Kubernetes CKA & CKAD (Linux Foundation)": one line per issuer. */
function byIssuer(list: Certification[]): Map<string, Certification[]> {
	const groups = new Map<string, Certification[]>();
	for (const cert of list) groups.set(cert.issuer, [...(groups.get(cert.issuer) ?? []), cert]);
	return groups;
}

const featured = certifications.filter((cert) => cert.featured);

export const currentCertifications = [...byIssuer(featured.filter((cert) => cert.current))].map(
	([issuer, list]) => ({ issuer, names: list.map((cert) => cert.name).join(', ') })
);

export const previousCertifications = [...byIssuer(featured.filter((cert) => !cert.current))].map(
	([issuer, list]) => {
		const names = list.map((cert) => cert.shortName ?? cert.name).join(' & ');
		const topic = list[0].topic ? `${list[0].topic} ` : '';
		return `${topic}${names} (${issuer.replace(/^The /, '')})`;
	}
);

export const educationLines = {
	degree: `${education.shortDegree}, ${education.field}`,
	school: `${education.institution}, ${education.years.replace('-', '–')}`
};

export const languageLine = languages
	.map(({ language, level }) => `${language} (${level.toLowerCase()})`)
	.join(' · ');

export const sideProjects = hobbyProjects.flatMap((project) =>
	project.cv ? { id: project.id, ...project.cv } : []
);

export const updated = `Updated ${__BUILD_MONTH__}`;
export const closingLine = 'Full timeline, side projects and a job-fit analyzer at tobylo.dev';
