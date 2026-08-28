<script lang="ts">
	import type { Snippet } from 'svelte';

	const { href, children }: { href?: string; children: Snippet } = $props();
</script>

{#snippet contact()}
	<div class="grid grid-cols-[auto_1fr] gap-x-4 p-1 lg:grid-cols-1 lg:justify-items-center">
		{@render children()}
	</div>
{/snippet}

{#if href}
	<a {href} class="text-ink-soft hover:text-accent font-normal no-underline transition-colors">
		{@render contact()}
	</a>
{:else}
	{@render contact()}
{/if}
