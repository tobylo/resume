<script lang="ts">
	import { corner, frame } from './frame.ts';

	// Illustrative values, not a real rider.
	const readout = [
		{ label: 'Check-in', value: '✓' },
		{ label: 'Transponder', value: '#4471' },
		{ label: 'Black Group', value: '1:07.5' }
	];
</script>

<!-- An ink panel in light; outlined in dark, like the primary button, so it never glares. -->
<div class="{frame} bg-ink text-canvas border-line-strong dark:text-ink dark:bg-transparent">
	<p class="{corner} text-accent">● Live at the track</p>
	<div class="grid grid-cols-[minmax(0,180px)_1fr] gap-y-1.5 font-mono text-[15px]/5">
		{#each readout as row (row.label)}
			<span>{row.label}</span>
			<span>{row.value}</span>
		{/each}
	</div>
</div>
