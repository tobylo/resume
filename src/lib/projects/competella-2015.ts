import type { Project } from './types';

export const competella2015: Project = {
	id: 'competella-2015',
	company: 'Competella',
	role: 'System Developer',
	description:
		"Took the proof of concept to production, rebuilding most components of the client's line-of-business system to scale.",
	group: { id: 'competella', name: 'Competella' },
	label: 'Prod',
	keyTechnologies: ['C#', 'Redis', 'ProtoBuf', 'IPC', 'TopShelf', 'Skype for Business'],
	technologies: [
		'C#',
		'Redis',
		'IPC',
		'TopShelf',
		'ProtoBuf',
		'JSON',
		'Git',
		'Visual Studio Online',
		'Lync/Skype for Business'
	],
	period: {
		start: '2015',
		end: '2015'
	}
};
