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
}
