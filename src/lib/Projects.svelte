<script lang="ts">
	import { slide } from 'svelte/transition';
	import { projects, allTechnologies } from './projects';
	import ProjectCard from './ProjectCard.svelte';

	let selectedTech = $state<string | null>(null);
	let filterExpanded = $state(false);

	const filteredProjects = $derived(
		selectedTech ? projects.filter((p) => p.technologies.includes(selectedTech!)) : projects
	);

	function toggleFilter(tech: string) {
		selectedTech = selectedTech === tech ? null : tech;
	}
</script>

<div class="not-prose flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between">
			<h2 class="font-display text-lg font-bold xl:text-xl">Selected work</h2>
			<button
				type="button"
				class="print-hidden flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-xs transition-colors {selectedTech
					? 'bg-accent text-accent-contrast'
					: 'border-edge bg-card text-ink-soft hover:border-accent/40 hover:text-accent border'}"
				onclick={() => (filterExpanded = !filterExpanded)}
			>
				<span>Filter{selectedTech ? `: ${selectedTech}` : ''}</span>
				<svg
					class="h-3 w-3 transition-transform {filterExpanded ? 'rotate-180' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
		</div>

		{#if filterExpanded}
			<div transition:slide={{ duration: 200 }} class="flex flex-col gap-2">
				<div class="flex flex-wrap gap-1">
					{#each allTechnologies as tech (tech)}
						<button
							type="button"
							class="cursor-pointer rounded-full px-2.5 py-0.5 text-xs transition-colors {selectedTech ===
							tech
								? 'bg-accent text-accent-contrast'
								: 'border-edge bg-card text-ink-soft hover:border-accent/40 hover:text-accent border'}"
							onclick={() => toggleFilter(tech)}
						>
							{tech}
						</button>
					{/each}
				</div>
				{#if selectedTech}
					<button
						type="button"
						class="text-accent hover:text-accent/80 cursor-pointer self-start text-xs underline"
						onclick={() => (selectedTech = null)}
					>
						Clear filter
					</button>
				{/if}
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-3">
		{#each filteredProjects as project (project.id)}
			<ProjectCard {project} />
		{/each}
	</div>

	{#if filteredProjects.length === 0}
		<p class="text-ink-muted text-center">No projects found with this technology.</p>
	{/if}
</div>
