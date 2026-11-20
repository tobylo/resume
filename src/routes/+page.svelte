<script lang="ts">
	import Hero from '#lib/components/home/Hero.svelte';
	import Stats from '#lib/components/home/Stats.svelte';
	import SelectedWork from '#lib/components/home/SelectedWork.svelte';
	import DevisorFeature from '#lib/components/home/DevisorFeature.svelte';
	import Credentials from '#lib/components/home/Credentials.svelte';
	import Closing from '#lib/components/Closing.svelte';
	import { projects, yearsInProduction } from '#lib/projects/index.ts';
</script>

<svelte:head>
	<title>Tobias Lolax · Senior engineer & tech lead</title>
	<meta
		name="description"
		content="Senior engineer and tech lead in Stockholm with {yearsInProduction} years in production software and {projects.length} client engagements across finance, retail, IoT and the public sector."
	/>
</svelte:head>

<Hero />
<Stats />
<SelectedWork />
<DevisorFeature />
<Credentials />
<Closing />
