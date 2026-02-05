<script lang="ts">
	import type { Project } from './projects';

	let { project }: { project: Project } = $props();

	let isExpanded = $state(false);
	const maxVisibleTechnologies = 4;
	const visibleTechnologies = $derived(project.technologies.slice(0, maxVisibleTechnologies));
	const hiddenCount = $derived(project.technologies.length - maxVisibleTechnologies);

	function formatPeriod(period: { start: string; end: string | null }) {
		if (!period.end) return `${period.start} - Present`;
		if (period.start === period.end) return period.start;
		return `${period.start} - ${period.end}`;
	}
</script>

<button
	type="button"
	class="block w-full cursor-pointer overflow-hidden rounded-sm bg-slate-600 text-left text-white transition-all duration-200 hover:scale-[1.02] hover:bg-slate-500 hover:shadow-lg md:shadow-md dark:bg-slate-700 dark:hover:bg-slate-600"
	onclick={() => (isExpanded = !isExpanded)}
>
	<div class="px-6 py-4">
		<div class="mb-1 flex items-center justify-between gap-2">
			<div class="text-base font-bold xl:text-xl">{project.company}</div>
			<div class="shrink-0 text-xs text-slate-300">{formatPeriod(project.period)}</div>
		</div>

		<div class="mb-2 text-sm text-slate-300">{project.role}</div>

		<!-- Expanded view (shown when expanded OR in print) -->
		<div class="expanded-content" class:hidden={!isExpanded}>
			<p class="mb-4 text-xs sm:text-sm">{project.description}</p>

			<div class="flex flex-wrap gap-1">
				{#each project.technologies as tech (tech)}
					<span class="rounded-sm bg-slate-500 px-2 py-0.5 text-xs">{tech}</span>
				{/each}
			</div>
		</div>

		<!-- Collapsed view (hidden in print) -->
		<div class="collapsed-content" class:hidden={isExpanded}>
			<div class="flex flex-wrap gap-1">
				{#each visibleTechnologies as tech (tech)}
					<span class="rounded-sm bg-slate-500 px-2 py-0.5 text-xs">{tech}</span>
				{/each}
				{#if hiddenCount > 0}
					<span class="rounded-sm bg-slate-400 px-2 py-0.5 text-xs">+{hiddenCount} more</span>
				{/if}
			</div>
		</div>
	</div>
</button>
