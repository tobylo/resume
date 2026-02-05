<script lang="ts">
	import { hobbyProjects } from './hobby-projects';
	import HobbyProjectCard from './HobbyProjectCard.svelte';
</script>

<section class="print-hide flex flex-col gap-4">
	<h2 class="text-center text-base font-bold xl:text-xl">Hobby Projects</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
		{#each hobbyProjects as project (project.id)}
			<HobbyProjectCard {project} />
		{/each}
	</div>
</section>
