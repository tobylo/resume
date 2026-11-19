<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import Stats from '$lib/components/home/Stats.svelte';
	import SelectedWork from '$lib/components/home/SelectedWork.svelte';
	import DevisorFeature from '$lib/components/home/DevisorFeature.svelte';
	import Credentials from '$lib/components/home/Credentials.svelte';
	import Closing from '$lib/components/Closing.svelte';
</script>

<svelte:head>
	<title>Tobias Lolax · Senior engineer & tech lead</title>
	<meta
		name="description"
		content="Senior engineer and tech lead in Stockholm with 17 years in production software and 22 client engagements across finance, retail, IoT and the public sector."
	/>
</svelte:head>

<Hero />
<Stats />
<SelectedWork />
<DevisorFeature />
<Credentials />
<Closing />
