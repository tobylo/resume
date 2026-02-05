<script lang="ts">
	import type { HobbyProject } from './hobby-projects/types';

	let { project }: { project: HobbyProject } = $props();

	let showTech = $state(false);
</script>

{#snippet cardBody()}
	{#if project.image}
		<div
			class="grid overflow-hidden transition-all duration-200 {showTech
				? 'grid-rows-[1fr]'
				: 'grid-rows-[0fr] group-hover:grid-rows-[1fr]'}"
		>
			<img
				src={project.image}
				alt={project.title}
				loading="lazy"
				class="min-h-0 w-full"
			/>
		</div>
	{/if}

	<div class="px-4 py-3">
		<h3 class="mb-1 text-base font-bold">{project.title}</h3>
		<p
			class="text-xs text-slate-200 sm:text-sm {showTech
				? ''
				: 'line-clamp-3 group-hover:line-clamp-none'}"
		>
			{project.description}
		</p>

		{#if project.technologies && project.technologies.length > 0}
			<div
				class="mt-2 flex flex-wrap gap-1 overflow-hidden transition-all duration-200 {showTech
					? 'max-h-40 opacity-100'
					: 'max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100'}"
			>
				{#each project.technologies as tech (tech)}
					<span class="rounded-sm bg-slate-500 px-2 py-0.5 text-xs">{tech}</span>
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

{#if project.url}
	<a
		href={project.url}
		target="_blank"
		rel="noopener noreferrer"
		class="group block overflow-hidden rounded-sm bg-slate-600 text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-slate-700 dark:hover:bg-slate-600"
	>
		{@render cardBody()}
	</a>
{:else}
	<div
		class="group overflow-hidden rounded-sm bg-slate-600 text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-slate-700 dark:hover:bg-slate-600"
		onclick={() => (showTech = !showTech)}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				showTech = !showTech;
			}
		}}
		tabindex="0"
		role="button"
		aria-expanded={showTech}
	>
		{@render cardBody()}
	</div>
{/if}
