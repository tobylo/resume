<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		ruled = true,
		children
	}: {
		id: string;
		/** A strong rule under the label; off where the column carries its own rule. */
		ruled?: boolean;
		children: Snippet;
	} = $props();
</script>

<h2
	{id}
	class="text-ink font-mono text-[10.5px]/[14px] font-bold tracking-[0.1em] uppercase {ruled
		? 'border-line-strong border-b-[1.5px] pb-2'
		: ''}"
>
	{@render children()}
</h2>
