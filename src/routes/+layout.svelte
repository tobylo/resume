<script lang="ts">
	import type { Snippet } from 'svelte';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Nav />
<main>
	{@render children()}
</main>
<Footer />
