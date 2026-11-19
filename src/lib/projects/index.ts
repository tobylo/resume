export type { Project } from './types';
import type { Project } from './types';

import { fintechNb } from './fintech-nb';
import { brandskyddsforeningen } from './brandskyddsforeningen';
import { hm } from './hm';
import { mfex } from './mfex';
import { globalFundWatch } from './global-fund-watch';
import { cint } from './cint';
import { ndaIot } from './nda-iot';
import { competella2015 } from './competella-2015';
import { softone } from './softone';
import { stjudeSdls } from './stjude-sdls';
import { kmd } from './kmd';
import { competellaPoc } from './competella-poc';
import { sosAlarm } from './sos-alarm';
import { itsPerfect } from './its-perfect';
import { stanleySecurity } from './stanley-security';
import { stjudeRay } from './stjude-ray';
import { stjudeOrder } from './stjude-order';
import { tya } from './tya';
import { sverigesRadio } from './sveriges-radio';
import { aTrain } from './a-train';
import { stjudeDistribution } from './stjude-distribution';
import { openSystemGroup } from './open-system-group';

export const projects = [
	fintechNb,
	brandskyddsforeningen,
	hm,
	mfex,
	globalFundWatch,
	cint,
	ndaIot,
	competella2015,
	softone,
	stjudeSdls,
	kmd,
	competellaPoc,
	sosAlarm,
	itsPerfect,
	stanleySecurity,
	stjudeRay,
	stjudeOrder,
	tya,
	sverigesRadio,
	aTrain,
	stjudeDistribution,
	openSystemGroup
];

// Projects shown under "Selected work" on the homepage and CV, in list order
export const featuredProjects = projects.filter((p) => p.featured);

// Ungrouped projects stand alone; grouped ones share one client entry, kept in list order
export function groupByClient(
	list: Project[]
): { id: string; name: string; projects: Project[] }[] {
	const groups: { id: string; name: string; projects: Project[] }[] = [];
	for (const project of list) {
		const key = project.group?.id ?? project.id;
		const existing = groups.find((g) => g.id === key);
		if (existing) {
			existing.projects.push(project);
		} else {
			groups.push({ id: key, name: project.group?.name ?? project.company, projects: [project] });
		}
	}
	return groups;
}

// Get all unique technologies across all projects, sorted alphabetically
export const allTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].sort((a, b) =>
	a.localeCompare(b)
);

// Get all unique roles across all projects
export const allRoles = [...new Set(projects.map((p) => p.role))].sort((a, b) =>
	a.localeCompare(b)
);
