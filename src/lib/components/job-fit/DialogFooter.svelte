<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<!-- Action row at the bottom of a dialog state; sits at the foot of the mobile sheet. -->
<div
	class="border-line mt-auto flex justify-end gap-3 border-t px-5 pt-3.5 pb-[34px] lg:px-7 lg:py-5"
>
	{@render children()}
</div>
