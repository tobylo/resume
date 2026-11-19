// Education, certifications and languages: shown on the homepage and CV, and given to
// the job fit analyzer. Change them here, once.

export interface Certification {
	name: string;
	/** Shorter name for tight layouts (homepage). */
	shortName?: string;
	issuer: string;
	url?: string;
	/** Still valid. Expired ones are shown as "previously". */
	current: boolean;
	/** Shown on the homepage and CV page 1; the rest only reach the analyzer. */
	featured?: boolean;
}

export const education = {
	degree: 'Bachelor of Engineering',
	shortDegree: 'B.Eng',
	field: 'Information Technology',
	institution: 'Novia University of Applied Sciences',
	years: '2005-2009'
} as const;

export const certifications: Certification[] = [
	{
		name: 'DevOps Engineer Expert',
		issuer: 'Microsoft',
		url: 'https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/66F629B1B2DF4B7A',
		current: true,
		featured: true
	},
	{
		name: 'Azure Administrator Associate',
		shortName: 'Azure Administrator',
		issuer: 'Microsoft',
		url: 'https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/C654B890A7D89E44',
		current: true,
		featured: true
	},
	{
		name: 'Azure Cosmos DB Developer Specialty',
		shortName: 'Cosmos DB Specialty',
		issuer: 'Microsoft',
		url: 'https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/5F903E01ED02CCA5',
		current: true,
		featured: true
	},
	{
		name: 'Certified Kubernetes Administrator (CKA)',
		shortName: 'CKA',
		issuer: 'The Linux Foundation',
		url: 'https://www.credly.com/badges/591adb36-1424-4119-81e2-2ee806063a41',
		current: false,
		featured: true
	},
	{
		name: 'Certified Kubernetes Application Developer (CKAD)',
		shortName: 'CKAD',
		issuer: 'The Linux Foundation',
		url: 'https://www.credly.com/badges/ea350be1-0743-44ec-873e-fe214628e15d',
		current: false,
		featured: true
	},
	{ name: 'MCSA: Web Applications', issuer: 'Microsoft', current: false },
	{ name: 'Solutions Developer: App Builder', issuer: 'Microsoft', current: false },
	{ name: 'Solutions Developer: Web Applications', issuer: 'Microsoft', current: false },
	{ name: 'Specialist: C#', issuer: 'Microsoft', current: false }
];

export const languages = [
	{ language: 'Swedish', level: 'Native' },
	{ language: 'English', level: 'Fluent' },
	{ language: 'Finnish', level: 'Basic' }
] as const;
