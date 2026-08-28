<script lang="ts">
	import type { Snippet } from 'svelte';
	import '@fontsource-variable/bricolage-grotesque';
	import '@fontsource-variable/instrument-sans';
	import '../app.css';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
