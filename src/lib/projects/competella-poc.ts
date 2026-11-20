import type { Project } from './types';

export const competellaPoc: Project = {
	id: 'competella-poc',
	company: 'Competella',
	role: 'System Developer',
	description: 'Developed a POC for redundant and scalable call routing service.',
	group: { id: 'competella', name: 'Competella' },
	label: 'PoC',
	technologies: ['C#', 'Redis', 'IPC', 'TopShelf', 'ProtoBuf', 'JSON'],
	period: {
		start: '2015',
		end: '2015'
	}
};
