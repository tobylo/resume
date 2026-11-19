export interface Project {
	id: string;
	company: string;
	role: string;
	description: string;
	technologies: string[];
	period: {
		start: string;
		end: string | null; // null = ongoing
	};
	/** Headline result, shown in bold next to the description on the site and CV. */
	outcome?: string;
	/** Listed under "Selected work" on the homepage and on page 1 of the CV. */
	featured?: boolean;
	/** Engagements sharing a group are shown as one client on the timeline and CV. */
	group?: {
		id: string;
		name: string;
	};
}
