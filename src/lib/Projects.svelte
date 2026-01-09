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

<div class="not-prose flex flex-col gap-4 dark:text-white">
	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between">
			<h2 class="text-base font-bold xl:text-xl">Projects</h2>
			<button
				type="button"
				class="print-hidden flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 text-xs transition-colors {selectedTech
					? 'bg-blue-500 text-white'
					: 'bg-slate-400 text-slate-800 hover:bg-slate-500'}"
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
					{#each allTechnologies as tech}
						<button
							type="button"
							class="cursor-pointer rounded-sm px-2 py-0.5 text-xs transition-colors {selectedTech ===
							tech
								? 'bg-blue-500 text-white'
								: 'bg-slate-400 text-slate-800 hover:bg-slate-500'}"
							onclick={() => toggleFilter(tech)}
						>
							{tech}
						</button>
					{/each}
				</div>
				{#if selectedTech}
					<button
						type="button"
						class="cursor-pointer self-start text-xs text-slate-600 underline hover:text-slate-800"
						onclick={() => (selectedTech = null)}
					>
						Clear filter
					</button>
				{/if}
			</div>
		{/if}
	</div>

	<div class="relative flex flex-col">
		<!-- Timeline line -->
		<div
			class="timeline-line absolute top-2 bottom-2 left-1.75 w-0.5 bg-slate-400 dark:bg-slate-500"
		></div>

		{#each filteredProjects as project (project.id)}
			<div class="timeline-row relative flex gap-4 pb-4 last:pb-0">
				<!-- Timeline dot -->
				<div
					class="timeline-dot relative z-10 mt-2 h-4 w-4 shrink-0 rounded-full border-2 border-slate-400 bg-slate-300 dark:border-slate-500 dark:bg-slate-800"
				></div>

				<!-- Card -->
				<div class="flex-1">
					<ProjectCard {project} />
				</div>
			</div>
		{/each}
	</div>

	{#if filteredProjects.length === 0}
		<p class="text-center text-slate-600">No projects found with this technology.</p>
	{/if}
</div>
