<script lang="ts">
	import Closing from '#lib/components/Closing.svelte';
	import HobbyCard from '#lib/components/lab/HobbyCard.svelte';
	import { hobbyProjects } from '#lib/hobby-projects/index.ts';

	// The first row is on screen on desktop; load the rest as the page scrolls.
	const eagerCount = 3;
</script>

<svelte:head>
	<title>Hobby lab · Tobias Lolax</title>
	<meta
		name="description"
		content="What Tobias Lolax builds outside client work: Devisor, software for a motorcycle track-day business, an auto clicker for Wayland, and other experiments with agents and RAG."
	/>
</svelte:head>

<section class="page pt-10 pb-10 lg:pt-24 lg:pb-18" aria-labelledby="hobby-lab">
	<nav aria-label="Breadcrumb" class="label text-ink text-tag font-semibold">
		<a href="/" class="underline-offset-4 hover:underline">
			<span aria-hidden="true">←&nbsp;</span>tobylo.dev
		</a>
		<span aria-hidden="true">&nbsp;/&nbsp;</span>
		<span aria-current="page">Hobby lab</span>
	</nav>

	<h1 id="hobby-lab" class="font-display text-mobile-display lg:text-display mt-6 lg:mt-7">
		Hobby lab
	</h1>

	<p class="text-ink-body lg:text-lead mt-5 max-w-[680px] text-[17px]/[26px] lg:mt-7">
		What I build outside client work: tools for my own desk, software for a motorcycle track-day
		business, and experiments to see how far agents can go.
	</p>
</section>

<ul class="page grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-y-16 xl:grid-cols-3">
	{#each hobbyProjects as project, i (project.id)}
		<li class="flex flex-col"><HobbyCard {project} lazy={i >= eagerCount} /></li>
	{/each}
</ul>

<Closing />
