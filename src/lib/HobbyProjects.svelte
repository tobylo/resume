<script lang="ts">
	import { hobbyProjects } from './hobby-projects';
	import HobbyProjectCard from './HobbyProjectCard.svelte';
</script>

<section class="print-hide flex flex-col gap-4">
	<h2 class="text-center text-base font-bold xl:text-xl">Hobby Projects</h2>
	<div class="flex flex-col gap-4">
		{#each hobbyProjects as project (project.id)}
			<HobbyProjectCard {project} />
		{/each}
	</div>
</section>
