<script lang="ts">
	import { theme } from './theme.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		theme.init();
	});
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	class="cursor-pointer rounded-full bg-slate-600 p-2 text-white transition-colors hover:bg-slate-500 dark:bg-slate-400 dark:text-slate-900 dark:hover:bg-slate-300"
	aria-label="Toggle dark mode"
>
	{#if theme.dark}
		<!-- Sun icon -->
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
	{:else}
		<!-- Moon icon -->
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	{/if}
</button>
