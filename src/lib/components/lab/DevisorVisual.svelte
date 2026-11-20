<script lang="ts">
	import { devisor } from '#lib/devisor.ts';
	import { corner, frame } from './frame.ts';
</script>

<!-- Like the homepage feature: yellow in light, a surface with a yellow top rule in dark. -->
<div
	class="{frame} bg-accent text-on-accent border-on-accent dark:bg-surface dark:border-t-accent dark:border-0 dark:border-t-[3px]"
>
	<p class="{corner} dark:text-ink-muted">Now building</p>
	<p class="font-display dark:text-accent text-[64px]/[64px]">{devisor.name}</p>
</div>
