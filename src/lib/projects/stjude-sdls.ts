import type { Project } from './types';

export const stjudeSdls: Project = {
	id: 'stjude-sdls',
	company: 'St. Jude Medical Inc',
	role: 'System Developer',
	description:
		'Refactoring of a LOB application to simplify the workload on administrators in their daily work.',
	group: { id: 'stjude', name: 'St. Jude Medical' },
	technologies: ['C#', 'WinForms', 'SQL', 'FluentMigrations', 'TopShelf', 'Trello'],
	period: {
		start: '2015',
		end: '2015'
	}
};
