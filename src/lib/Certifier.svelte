<script lang="ts">
	const {
		tooltip,
		children
	}: {
		tooltip: string;
		children: Snippet;
	} = $props();

	import { createTooltip, melt } from '@melt-ui/svelte';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
</script>

<div class="trigger" use:melt={$trigger} aria-label="Certifier">
	{@render children()}
</div>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-lg bg-white shadow"
	>
		<div use:melt={$arrow}></div>
		<p class="px-4 py-1">{tooltip}</p>
	</div>
{/if}

<style lang="postcss">
	.trigger {
		@apply inline-flex items-center justify-center rounded-full;
		@apply text-white transition-colors hover:text-gray-400;
		@apply focus-visible:ring focus-visible:text-white focus-visible:ring-offset-2;
		@apply p-0 text-sm font-medium;
	}
</style>
