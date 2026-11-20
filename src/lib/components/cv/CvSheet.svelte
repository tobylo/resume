<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		page,
		pages,
		note,
		children
	}: {
		page: number;
		pages: number;
		/** The footer's left-hand line. */
		note: string;
		children: Snippet;
	} = $props();
</script>

<!-- One A4 sheet: 210 × 297 mm on paper and on wide screens, full width and natural height on phones. -->
<section
	aria-label="CV page {page} of {pages}"
	class="bg-canvas border-line a4:h-[297mm] a4:w-[210mm] a4:px-14 a4:pt-[52px] a4:pb-10 flex w-full flex-col border px-5 pt-7 pb-6 print:border-0 {page >
	1
		? 'print:break-before-page'
		: ''}"
>
	{@render children()}

	<footer
		class="border-line text-ink-muted a4:mt-auto mt-8 flex justify-between gap-4 border-t pt-2.5 font-mono text-[9.5px]/3 tracking-[0.04em]"
	>
		<p>{note}</p>
		<p class="a4:block hidden shrink-0">{page} / {pages}</p>
	</footer>
</section>
