<script lang="ts">
	import { projects } from '#lib/projects/index.ts';
	import Button from '#lib/components/Button.svelte';
	import DialogFooter from './DialogFooter.svelte';

	let { oncancel }: { oncancel: () => void } = $props();

	// Time-based, not real progress: the endpoint answers in one go.
	const steps = [
		{ label: 'Reading the job ad', at: 0 },
		{ label: `Matching it against ${projects.length} engagements`, at: 2500 },
		{ label: 'Writing the report', at: 9000 }
	];

	let current = $state(0);

	// Steps the list along on a clock while it is on screen.
	function advance() {
		const timers = steps.slice(1).map((step, i) => setTimeout(() => (current = i + 1), step.at));
		return () => timers.forEach(clearTimeout);
	}
</script>

<div class="flex flex-col gap-5 px-5 pt-8 pb-9 lg:px-7">
	<div class="flex gap-1.5" aria-hidden="true">
		{#each steps as step, i (step.label)}
			<span class={['h-1 flex-1', i < current ? 'bg-ink' : i === current ? 'bg-accent' : 'bg-line']}
			></span>
		{/each}
	</div>
	<ol {@attach advance} class="text-tag/[18px] flex flex-col gap-3 font-mono tracking-[0.04em]">
		{#each steps as step, i (step.label)}
			<li
				class={i < current
					? 'text-ink-muted font-medium'
					: i === current
						? 'text-ink font-bold'
						: 'text-ink-muted/70 font-medium'}
				aria-current={i === current ? 'step' : undefined}
			>
				<span aria-hidden="true">{i < current ? '✓' : i === current ? '→' : '·'}</span>
				{step.label}
			</li>
		{/each}
	</ol>
	<p class="sr-only" role="status">{steps[current].label}</p>
	<p class="text-ink-body text-sm/[23px]">
		Claude is reading your job ad against my project history, certifications and side projects.
	</p>
</div>

<DialogFooter>
	<Button size="dialog" class="flex-1 lg:flex-none" data-autofocus onclick={oncancel}>
		Cancel
	</Button>
</DialogFooter>
