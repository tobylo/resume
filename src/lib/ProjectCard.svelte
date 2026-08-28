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
	class="resume-card border-edge bg-card text-ink hover:border-accent/40 block w-full cursor-pointer overflow-hidden rounded-2xl border text-left transition-all duration-200 hover:shadow-sm"
	onclick={() => (isExpanded = !isExpanded)}
>
	<div class="px-6 py-4">
		<div class="mb-1 flex items-center justify-between gap-2">
			<div class="text-base font-bold xl:text-lg">{project.company}</div>
			<div
				class="bg-accent-tint text-accent shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
			>
				{formatPeriod(project.period)}
			</div>
		</div>

		<div class="text-ink-muted mb-2 text-sm">{project.role}</div>

		<!-- Expanded view (shown when expanded OR in print) -->
		<div class="expanded-content" class:hidden={!isExpanded}>
			<p class="text-ink-soft mb-4 text-xs sm:text-sm">{project.description}</p>

			<div class="tech-tags flex flex-wrap gap-1">
				{#each project.technologies as tech (tech)}
					<span class="tech-tag bg-accent-tint text-accent rounded-full px-2 py-0.5 text-xs"
						>{tech}</span
					>
				{/each}
			</div>
		</div>

		<!-- Collapsed view (hidden in print) -->
		<div class="collapsed-content" class:hidden={isExpanded}>
			<div class="flex flex-wrap gap-1">
				{#each visibleTechnologies as tech (tech)}
					<span class="tech-tag bg-accent-tint text-accent rounded-full px-2 py-0.5 text-xs"
						>{tech}</span
					>
				{/each}
				{#if hiddenCount > 0}
					<span class="border-edge text-ink-muted rounded-full border px-2 py-0.5 text-xs"
						>+{hiddenCount} more</span
					>
				{/if}
			</div>
		</div>
	</div>
</button>
