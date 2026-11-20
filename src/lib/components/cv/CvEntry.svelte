<script lang="ts">
	import type { Entry } from '#lib/cv.ts';
	import { joinTags } from '#lib/format.ts';

	let { entry }: { entry: Entry } = $props();
</script>

<article
	class="border-line a4:flex-row a4:gap-4 flex break-inside-avoid flex-col gap-1 border-b py-3"
	aria-labelledby="cv-{entry.id}"
>
	<p class="text-ink-tag a4:pt-0.5 w-[90px] shrink-0 font-mono text-[10.5px]/[14px] font-medium">
		{entry.period}
	</p>
	<div class="flex flex-1 flex-col gap-1">
		<div class="a4:flex-row a4:items-baseline a4:justify-between a4:gap-3 flex flex-col">
			<h3 id="cv-{entry.id}" class="text-ink text-[14px]/[18px] font-bold">{entry.company}</h3>
			<p class="text-ink-tag shrink-0 text-[11.5px]/4">{entry.role}</p>
		</div>
		<p class="text-ink-body text-xs/[17px]">{entry.description}</p>
		{#if entry.outcome}
			<p class="text-ink text-xs/[17px] font-bold">
				{entry.outcome.lead}
				{#if entry.outcome.rest}
					<span class="text-ink-tag font-normal">{entry.outcome.rest}</span>
				{/if}
			</p>
		{/if}
		<p class="text-ink-tag font-mono text-[10px]/[14px]">{joinTags(entry.tags)}</p>
	</div>
</article>
