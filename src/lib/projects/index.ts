export type { Project } from './types';

import { fintechNb } from './fintech-nb';
import { brandskyddsforeningen } from './brandskyddsforeningen';
import { hm } from './hm';
import { mfex as fintechEcm } from './fintech-ecm';
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
	fintechEcm,
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

// Get all unique technologies across all projects, sorted alphabetically
export const allTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].sort((a, b) =>
	a.localeCompare(b)
);

// Get all unique roles across all projects
export const allRoles = [...new Set(projects.map((p) => p.role))].sort((a, b) =>
	a.localeCompare(b)
);
