import type { Project } from './types';

export const competella2015: Project = {
	id: 'competella-2015',
	company: 'Competella',
	role: 'System Developer',
	description:
		'Implementation of a previously developed POC. This project touched most components of the clients existing LOB system, rebuilding them to become scalable.',
	group: { id: 'competella', name: 'Competella' },
	label: 'Prod',
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
