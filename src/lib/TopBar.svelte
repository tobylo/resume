<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';

	let { onanalyze }: { onanalyze: () => void } = $props();
</script>

<header class="print-hide border-edge bg-canvas/90 sticky top-0 z-30 border-b backdrop-blur">
	<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
		<a href="#top" class="font-display text-ink text-base font-bold no-underline">tobylo.dev</a>
		<nav class="text-ink-muted hidden items-center gap-5 text-sm md:flex">
			<a class="text-ink-muted hover:text-accent font-normal no-underline" href="#work">Work</a>
			<a class="text-ink-muted hover:text-accent font-normal no-underline" href="#certifications"
				>Certifications</a
			>
			<a class="text-ink-muted hover:text-accent font-normal no-underline" href="#hobby-lab"
				>Hobby lab</a
			>
		</nav>
		<div class="flex items-center gap-3">
			<button
				type="button"
				class="bg-accent text-accent-contrast hover:bg-accent/90 cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm"
				onclick={onanalyze}
			>
				Analyze job fit
			</button>
			<ThemeToggle />
		</div>
	</div>
</header>
