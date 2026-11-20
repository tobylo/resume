<script lang="ts">
	import Meta from '#lib/components/Meta.svelte';
	import Hero from '#lib/components/home/Hero.svelte';
	import Stats from '#lib/components/home/Stats.svelte';
	import SelectedWork from '#lib/components/home/SelectedWork.svelte';
	import DevisorFeature from '#lib/components/home/DevisorFeature.svelte';
	import Credentials from '#lib/components/home/Credentials.svelte';
	import Closing from '#lib/components/Closing.svelte';
	import { projects, yearsInProduction } from '#lib/projects/index.ts';
</script>

<Meta
	title="Tobias Lolax · Senior engineer & tech lead"
	description="Senior engineer and tech lead in Stockholm with {yearsInProduction} years in production software and {projects.length} client engagements across finance, retail, IoT and the public sector."
	path="/"
/>

<Hero />
<Stats />
<SelectedWork />
<DevisorFeature />
<Credentials />
<Closing />
