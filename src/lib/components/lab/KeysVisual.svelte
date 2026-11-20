<script lang="ts">
	import { corner, frame } from './frame.ts';

	const keys = ['Ctrl', 'Shift', 'F6'];
	const cap = 'border-[1.5px] border-b-4 px-3.5 py-2.5 font-mono text-[18px]/[22px] font-semibold';
</script>

<div class="{frame} bg-surface border-line-strong">
	<p class={corner}>Start / stop clicking</p>
	<div class="flex flex-wrap items-center gap-1.5 lg:gap-2">
		{#each keys as key, i (key)}
			{#if i > 0}
				<span class="text-ink-muted text-[20px]/6 font-bold">+</span>
			{/if}
			<kbd
				class="{cap} {i === keys.length - 1
					? 'bg-accent text-on-accent border-on-accent'
					: 'bg-canvas border-line-strong'}"
			>
				{key}
			</kbd>
		{/each}
	</div>
</div>
