<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		topic,
		title,
		body,
		accent = false,
		children
	}: {
		topic: string;
		title: string;
		body: string;
		/** The yellow cell. In dark it becomes a surface with a yellow top rule, like the header. */
		accent?: boolean;
		/** Anything after the body, such as a link. */
		children?: Snippet;
	} = $props();

	const tone = $derived(
		accent
			? {
					cell: 'bg-accent text-on-accent border-t-on-accent px-6 pb-6 dark:bg-surface dark:text-ink dark:border-t-accent dark:border-t-[3px]',
					topic: 'dark:text-ink-muted',
					body: 'dark:text-ink-body'
				}
			: { cell: 'border-t-line-strong', topic: 'text-ink-muted', body: 'text-ink-body' }
	);
</script>

<div class="flex flex-col gap-3.5 border-t-[1.5px] pt-5 {tone.cell}">
	<p class="label text-tag {tone.topic}">{topic}</p>
	<h3 class="text-[20px]/[26px] font-bold tracking-[-0.015em] lg:text-[22px]/7">{title}</h3>
	<p class="text-[16px]/[25px] {tone.body}">{body}</p>
	{@render children?.()}
</div>
