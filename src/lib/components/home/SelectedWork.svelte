<script lang="ts">
	import { projects, featuredProjects } from '#lib/projects/index.ts';
	import { employer, moreClients } from '#lib/home.ts';
	import WorkRow from './WorkRow.svelte';

	const rest = projects.filter((project) => !project.featured);
	const firstYear = Math.min(...rest.map((project) => Number(project.period.start)));
	const lastYear = Math.max(
		...rest.map((project) => Number(project.period.end ?? project.period.start))
	);
</script>

<section id="work" class="page lg:pt-section scroll-mt-8 pt-14" aria-labelledby="selected-work">
	<div
		class="flex flex-col gap-2.5 pb-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-10"
	>
		<div class="flex flex-col gap-2.5 lg:gap-3.5">
			<h2 id="selected-work" class="font-display lg:text-heading text-[34px]/[38px]">
				Selected work
			</h2>
			<p class="text-ink-body max-w-[720px] text-[15px]/[23px] lg:text-base">{employer}</p>
		</div>
		<p class="label text-ink-muted text-tag hidden shrink-0 lg:block">
			{featuredProjects.length} of {projects.length} engagements
		</p>
	</div>

	{#each featuredProjects as project (project.id)}
		<WorkRow {project} />
	{/each}

	<div
		class="border-t-line border-b-line-strong flex flex-col gap-3 border-t border-b-[1.5px] py-6 lg:flex-row lg:items-baseline lg:gap-8 lg:py-8"
	>
		<p
			class="text-ink-muted font-mono text-[13px]/4 font-medium lg:w-[140px] lg:shrink-0 lg:text-sm/[18px]"
		>
			{firstYear} — {lastYear}
		</p>
		<p class="text-ink-body flex-1 text-[16px]/[25px] lg:text-[17px]/7">
			<strong class="text-ink font-bold">{rest.length} more engagements.</strong>
			Including {moreClients.slice(0, -1).join(', ')} and {moreClients.at(-1)}.
		</p>
		<a
			href="/work"
			class="shrink-0 text-[15px]/5 font-semibold underline underline-offset-4 lg:text-[15px]/[18px]"
		>
			Full timeline →
		</a>
	</div>
</section>
