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

<div
	class="inline-flex items-center justify-center rounded-full p-0 text-sm font-medium text-white transition-colors hover:text-gray-400 focus-visible:text-white focus-visible:ring-3 focus-visible:ring-offset-2"
	use:melt={$trigger}
	aria-label="Certifier"
>
	{@render children()}
</div>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-lg bg-white shadow-sm"
	>
		<div use:melt={$arrow}></div>
		<p class="px-4 py-1">{tooltip}</p>
	</div>
{/if}
