/**
 * A photo or screenshot, served from static/. `src` is the full-size file;
 * each entry in `widths` is a smaller copy beside it, named `<name>-<width>.webp`,
 * so the card can offer a srcset.
 */
export interface HobbyImage {
	kind: 'image';
	src: string;
	width: number;
	height: number;
	widths: number[];
	alt: string;
}

/**
 * A drawn card visual, built as a small component in $lib/components/lab:
 * the Devisor wordmark, the track-day readout, the hotkey keycaps or the RAG query.
 */
export interface HobbyIllustration {
	kind: 'devisor' | 'track' | 'keys' | 'query';
	/** What the illustration shows, for screen readers. Empty when it only repeats the title. */
	alt: string;
}

export type HobbyVisual = HobbyImage | HobbyIllustration;

export interface HobbyLink {
	/** Link text without an arrow: the card adds → for pages here and ↗ for other sites. */
	label: string;
	href: string;
}

export interface HobbyProject {
	id: string;
	title: string;
	/** What the analyzer reads; also the card copy unless `summary` is set. */
	description: string;
	/** Shorter card copy, for entries whose description is longer than a card holds. */
	summary?: string;
	/** The mono line above the title: stack, status, year. */
	meta: string;
	visual: HobbyVisual;
	/** Links shown under the card copy. A card without links shows its technologies instead. */
	links?: HobbyLink[];
	technologies: string[];
	/** Listed under "Side projects" on the CV, as a short name and a one-line description. */
	cv?: { name: string; line: string };
}
