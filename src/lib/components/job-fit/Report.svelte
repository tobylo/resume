<script lang="ts">
	import { contact } from '#lib/site.ts';
	import type { FitAnalysis, OverallFit } from '#lib/job-fit/types.ts';
	import Button from '#lib/components/Button.svelte';
	import FitMeter from './FitMeter.svelte';

	let {
		analysis,
		onanother
	}: {
		analysis: FitAnalysis;
		/** Clears the box and goes back to the input. */
		onanother: () => void;
	} = $props();

	const verdicts: Record<OverallFit, { label: string; bars: 1 | 2 | 3; closing: string }> = {
		strong: { label: 'Strong fit', bars: 3, closing: "Let's get in touch!" },
		partial: { label: 'Partial fit', bars: 2, closing: "Interested? Let's talk" },
		'not-ideal': { label: 'Not an ideal fit', bars: 1, closing: 'Want to connect?' }
	};

	const verdict = $derived(verdicts[analysis.overallFit]);
	const strong = $derived(analysis.overallFit === 'strong');
</script>

<!-- Everything here is model output: rendered as text only, never as HTML. -->

<!-- Yellow for a strong fit only; never red. In dark the yellow block becomes a surface with a yellow top rule. -->
<div
	class={[
		'flex flex-col gap-4 px-5 py-[22px] lg:px-8 lg:py-7',
		strong
			? 'bg-accent text-on-accent border-on-accent dark:bg-surface dark:text-ink dark:border-t-accent border-b-[1.5px] dark:border-t-[3px] dark:border-b-0'
			: 'border-line-strong border-b-[1.5px]'
	]}
>
	<div class="flex items-center gap-4">
		<FitMeter filled={verdict.bars} />
		<h3
			class={[
				'tracking-heading text-[32px]/9 font-[weight:var(--display-weight)] outline-none',
				strong && 'dark:text-accent'
			]}
			tabindex="-1"
			data-autofocus
		>
			{verdict.label}
		</h3>
	</div>
	<p class="text-[16px]/[25px] lg:text-base/[27px]">{analysis.overallSummary}</p>
</div>

<section
	class="flex flex-col px-5 pt-[22px] pb-1 lg:px-8 lg:pt-7 lg:pb-2"
	aria-labelledby="fit-strengths"
>
	<h3 id="fit-strengths" class="label text-ink pb-2 text-[12px]/4 font-semibold">
		Strengths · {analysis.strengths.length}
	</h3>
	{#each analysis.strengths as strength, i (i)}
		<div class="border-line flex flex-col gap-2 border-t py-[18px]">
			<h4 class="text-[19px]/[25px] font-bold tracking-[-0.01em]">{strength.title}</h4>
			<p class="text-ink-body text-[16px]/[25px]">{strength.description}</p>
			{#if strength.resumeReferences.length > 0}
				<ul class="flex flex-wrap gap-2 pt-0.5">
					{#each strength.resumeReferences as reference, j (j)}
						<li class="border-line-strong text-ink border px-2 py-[3px] font-mono text-[12px]/4">
							{reference}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</section>

{#if analysis.gaps.length > 0}
	<section class="flex flex-col px-5 pt-4 pb-1 lg:px-8 lg:pt-5 lg:pb-2" aria-labelledby="fit-gaps">
		<h3 id="fit-gaps" class="label text-ink pb-2 text-[12px]/4 font-semibold">
			Gaps · {analysis.gaps.length}
		</h3>
		{#each analysis.gaps as gap, i (i)}
			<div class="border-line flex flex-col gap-2 border-t pt-[18px] pb-6">
				<h4 class="text-[19px]/[25px] font-bold tracking-[-0.01em]">{gap.title}</h4>
				<p class="text-ink-body text-[16px]/[25px]">{gap.description}</p>
				{#if gap.mitigation}
					<p class="bg-surface border-line-strong mt-1 flex gap-3 border-l-[3px] px-3.5 py-3">
						<span class="label shrink-0 text-[12px]/[22px] font-semibold">Bridge</span>
						<span class="text-sm/[22px]">{gap.mitigation}</span>
					</p>
				{/if}
			</div>
		{/each}
	</section>
{/if}

<section
	class="border-line-strong flex flex-col gap-4 border-t-[1.5px] px-5 pt-[22px] pb-[34px] lg:px-8 lg:py-7"
	aria-labelledby="fit-contact"
>
	<h3
		id="fit-contact"
		class="text-title/[30px] font-[weight:var(--display-weight)] tracking-[-0.025em]"
	>
		{verdict.closing}
	</h3>
	<div class="flex flex-wrap items-center gap-x-3 gap-y-4">
		<Button variant="primary" size="dialog" href={contact.email}>Email me</Button>
		<Button size="dialog" href={contact.linkedIn} target="_blank" rel="noopener">LinkedIn ↗</Button>
		<button
			type="button"
			class="w-full text-left text-sm/5 font-semibold underline decoration-1 lg:ml-auto lg:w-auto"
			onclick={onanother}
		>
			Analyze another job ad
		</button>
	</div>
	<p class="text-ink-muted text-tag/[19px]">
		Written by Claude from my real project history. Worth a sanity check, like any AI summary.
	</p>
</section>
