<script lang="ts">
	let { filled }: { /** Bars filled out of three. */ filled: 1 | 2 | 3 } = $props();
</script>

<div class="flex shrink-0 gap-1" aria-hidden="true">
	{#each [1, 2, 3] as bar (bar)}
		<span class={['h-2.5 w-7', bar <= filled ? 'bg-ink' : 'bg-track']}></span>
	{/each}
</div>
