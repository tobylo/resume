import type { Project } from './types';

export const stjudeSdls: Project = {
	id: 'stjude-sdls',
	company: 'St. Jude Medical Inc',
	role: 'System Developer',
	description:
		"Refactored a line-of-business application to lighten administrators' daily workload.",
	cvDescription:
		'Line-of-business, statistics, order management and distribution systems, including SAP integrations.',
	group: { id: 'stjude', name: 'St. Jude Medical' },
	keyTechnologies: ['C#', 'SQL', 'WinForms', 'TopShelf'],
	technologies: ['C#', 'WinForms', 'SQL', 'FluentMigrations', 'TopShelf', 'Trello'],
	period: {
		start: '2015',
		end: '2015'
	}
};
