<script lang="ts">
	import { hobbyProjects } from './hobby-projects';
	import HobbyProjectCard from './HobbyProjectCard.svelte';
</script>

<section id="hobby-lab" class="print-hide flex scroll-mt-20 flex-col gap-4">
	<h2 class="font-display text-lg font-bold xl:text-xl">Hobby lab</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
		{#each hobbyProjects as project (project.id)}
			<HobbyProjectCard {project} />
		{/each}
	</div>
</section>
