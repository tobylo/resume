<script lang="ts">
	import type { Project } from '#lib/projects/index.ts';
	import { formatPeriod, joinTags } from '#lib/format.ts';

	let { project }: { project: Project } = $props();

	const tags = $derived(project.keyTechnologies ?? project.technologies.slice(0, 8));
</script>

<article
	class="border-line lg:py-row flex flex-col gap-2.5 border-t py-6 lg:grid lg:grid-cols-[140px_340fr_460fr_212fr] lg:gap-8"
	aria-labelledby="work-{project.id}"
>
	<p class="text-ink-muted font-mono text-[13px]/4 font-medium lg:pt-1.5 lg:text-sm/[18px]">
		{formatPeriod(project.period)}
	</p>
	<div class="flex flex-col gap-0.5 lg:gap-1.5">
		<h3 id="work-{project.id}" class="tracking-title lg:text-title text-[22px]/7 font-bold">
			{project.company}
		</h3>
		<p class="text-ink-muted text-[15px]/5 lg:text-[16px]/5">{project.role}</p>
	</div>
	<div class="flex flex-col gap-2.5 lg:gap-3.5">
		<p class="text-ink-body text-[16px]/[25px] lg:text-base">{project.description}</p>
		{#if project.outcome}
			<p class="text-[16px]/[25px] font-semibold lg:text-base">{project.outcome}</p>
		{/if}
	</div>
	<p class="text-ink-tag font-mono text-xs/5 lg:pt-1.5 lg:text-[13px]/[21px]">
		{joinTags(tags)}
	</p>
</article>
