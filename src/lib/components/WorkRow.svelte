<script lang="ts">
	import type { Snippet } from 'svelte';
	import { joinTags } from '#lib/format.ts';

	let {
		id,
		period,
		title,
		role,
		tags,
		dense = false,
		children
	}: {
		id: string;
		period: string;
		title: string;
		role: string;
		tags: readonly string[];
		/** Tighter desktop type and spacing, for the long list on the full timeline. */
		dense?: boolean;
		/** The description column. */
		children: Snippet;
	} = $props();

	// Mobile is the same either way; only the desktop metrics differ.
	const size = $derived(
		dense
			? {
					row: 'lg:py-7',
					offset: 'lg:pt-1',
					heading: 'lg:gap-1',
					title: 'lg:text-[20px]/[26px] lg:tracking-[-0.01em]',
					role: 'lg:text-[15px]/5'
				}
			: {
					row: 'lg:py-row',
					offset: 'lg:pt-1.5',
					heading: 'lg:gap-1.5',
					title: 'lg:text-title',
					role: 'lg:text-[16px]/5'
				}
	);
</script>

<article
	class="border-line flex flex-col gap-2.5 border-t py-6 lg:grid lg:grid-cols-[140px_340fr_460fr_212fr] lg:gap-8 {size.row}"
	aria-labelledby="work-{id}"
>
	<p class="text-ink-muted font-mono text-[13px]/4 font-medium lg:text-sm/[18px] {size.offset}">
		{period}
	</p>
	<div class="flex flex-col gap-0.5 {size.heading}">
		<h3 id="work-{id}" class="tracking-title text-[22px]/7 font-bold {size.title}">
			{title}
		</h3>
		<p class="text-ink-muted text-[15px]/5 {size.role}">{role}</p>
	</div>
	<div class="flex flex-col gap-2.5 lg:gap-3.5">
		{@render children()}
	</div>
	<p class="text-ink-tag font-mono text-xs/5 lg:text-[13px]/[21px] {size.offset}">
		{joinTags(tags)}
	</p>
</article>
