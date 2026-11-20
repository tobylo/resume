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
	/** Headline technologies shown as tags where space is tight (homepage, timeline, CV entries), in display form. */
	keyTechnologies?: string[];
	/** Listed under "Selected work" on the homepage and "Selected experience" on the CV (page 1 holds four; the rest continue on page 2). */
	featured?: boolean;
	/** Engagements sharing a group are shown as one client on the timeline and CV. */
	group?: {
		id: string;
		name: string;
	};
	/**
	 * Shorter copy for the printed CV, where the full description doesn't fit: the entry text for
	 * featured engagements, the one-line row for the rest. A group's row takes it from exactly one
	 * of its engagements.
	 */
	cvDescription?: string;
	/** Short label for this engagement within its group on the timeline (e.g. "PoC"). Defaults to its period. */
	label?: string;
}
