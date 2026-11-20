import type { Project } from './types';

export const competellaPoc: Project = {
	id: 'competella-poc',
	company: 'Competella',
	role: 'System Developer',
	description: 'Built a proof of concept for a redundant, scalable call-routing service.',
	group: { id: 'competella', name: 'Competella' },
	label: 'PoC',
	keyTechnologies: ['C#', 'Redis', 'ProtoBuf', 'IPC', 'TopShelf'],
	technologies: ['C#', 'Redis', 'IPC', 'TopShelf', 'ProtoBuf', 'JSON'],
	period: {
		start: '2015',
		end: '2015'
	}
};
