import type { Project } from './types';

export const aTrain: Project = {
	id: 'a-train',
	company: 'A-Train',
	role: 'System Developer',
	description:
		'Developed an partner facing ticket booking service which also integrated with SMS service providers. Porting of existing applications from Java to C#.',
	technologies: [
		'Java',
		'C#',
		'WCF',
		'Windows Services',
		'REST',
		'SQL',
		'Nancy',
		'NUnit',
		'Dapper'
	],
	period: {
		start: '2013',
		end: '2013'
	}
};
