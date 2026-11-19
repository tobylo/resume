import type { Project } from '#lib/projects/index.ts';

/** "2024 — now", "2022 — 2023", or "2018" for a single year. */
export function formatPeriod({ start, end }: Project['period']): string {
	if (end === null) return `${start} — now`;
	return start === end ? start : `${start} — ${end}`;
}

/** Tags joined with " · ", each kept on one line. */
export function joinTags(tags: readonly string[]): string {
	return tags.map((tag) => tag.replaceAll(' ', ' ')).join(' · ');
}
