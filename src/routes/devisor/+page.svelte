<script lang="ts">
	import Meta from '#lib/components/Meta.svelte';
	import Closing from '#lib/components/Closing.svelte';
	import Principle from '#lib/components/devisor/Principle.svelte';
	import QuestionCell from '#lib/components/devisor/QuestionCell.svelte';
	import Stage from '#lib/components/devisor/Stage.svelte';
	import { devisor } from '#lib/devisor.ts';
	import { contact } from '#lib/site.ts';
</script>

<Meta
	title="Devisor · Tobias Lolax"
	description="{devisor.summary} Why I'm building Devisor, the loop it runs, its principles and the questions it lets me explore."
	path="/devisor"
/>

<!--
	The page's accent block. In dark it becomes a raised surface with a yellow top rule and a
	yellow wordmark, like the homepage feature.
-->
<section
	class="bg-accent text-on-accent border-b-on-accent dark:bg-surface dark:border-t-accent border-b-[1.5px] dark:border-t-[3px] dark:border-b-0"
	aria-labelledby="devisor"
>
	<div class="page flex flex-col gap-6 pt-10 pb-12 lg:gap-8 lg:pt-24 lg:pb-20">
		<nav aria-label="Breadcrumb" class="label text-tag dark:text-ink font-semibold">
			<a href="/" class="underline-offset-4 hover:underline">
				<span aria-hidden="true">←&nbsp;</span>tobylo.dev
			</a>
			<span aria-hidden="true">&nbsp;/&nbsp;</span>
			<span aria-current="page">Now building</span>
		</nav>

		<h1
			id="devisor"
			class="font-display dark:text-accent text-[72px]/[72px] lg:text-[160px]/[150px] lg:tracking-[-0.045em]"
		>
			{devisor.name}
		</h1>

		<p
			class="dark:text-ink max-w-[900px] text-[20px]/[28px] font-medium tracking-[-0.01em] lg:text-[32px]/[42px]"
		>
			{devisor.summary}
		</p>

		<dl
			class="border-t-on-accent dark:border-t-line flex flex-wrap gap-x-14 gap-y-5 border-t-[1.5px] pt-6"
		>
			{#each devisor.facts as fact (fact.label)}
				<div class="flex flex-col gap-1.5">
					<dt class="label dark:text-ink-muted text-[12px]/4 font-semibold">{fact.label}</dt>
					<dd class="dark:text-ink text-[18px]/[22px] font-semibold">{fact.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section
	class="page lg:pt-section flex flex-col gap-6 pt-14 lg:flex-row lg:gap-8"
	aria-labelledby="why"
>
	<h2 id="why" class="font-display lg:text-heading text-[34px]/[38px] lg:w-[512px] lg:shrink-0">
		Why I'm building it
	</h2>
	<div
		class="text-ink-body flex flex-col gap-5 text-[17px]/[27px] lg:gap-[22px] lg:text-[19px]/[31px]"
	>
		{#each devisor.why as paragraph, i (i)}
			<p>
				{#each paragraph as segment, j (j)}
					{#if typeof segment === 'string'}{segment}{:else}<strong class="text-ink font-bold">
							{segment.strong}
						</strong>{/if}
				{/each}
			</p>
		{/each}
	</div>
</section>

<section class="page lg:pt-section lg:gap-row flex flex-col gap-6 pt-14" aria-labelledby="loop">
	<header class="flex flex-col gap-2.5 lg:flex-row lg:items-end lg:justify-between">
		<h2 id="loop" class="font-display lg:text-heading text-[34px]/[38px]">The loop</h2>
		<p class="label text-ink-muted text-tag">{devisor.stagesNote}</p>
	</header>
	<ol class="border-line-strong flex flex-col border-y-[1.5px] lg:flex-row">
		{#each devisor.stages as stage, i (stage.name)}
			<Stage step={i + 1} name={stage.name} body={stage.body} />
		{/each}
	</ol>
</section>

<section
	class="page lg:pt-section lg:gap-row flex flex-col gap-6 pt-14"
	aria-labelledby="principles"
>
	<h2 id="principles" class="font-display lg:text-heading text-[34px]/[38px]">Principles</h2>
	<div class="grid gap-8 lg:grid-cols-2">
		{#each devisor.principles as principle (principle.title)}
			<Principle title={principle.title} body={principle.body} />
		{/each}
	</div>
</section>

<section class="page lg:pt-section flex flex-col gap-8 pt-14 lg:gap-12" aria-labelledby="questions">
	<header class="flex flex-col gap-2.5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
		<h2 id="questions" class="font-display lg:text-heading text-[34px]/[38px]">
			Questions I'm exploring
		</h2>
		<p class="text-ink-body text-[16px]/[25px] lg:w-[460px] lg:shrink-0 lg:text-base">
			{devisor.questionsIntro}
		</p>
	</header>
	<div class="grid gap-8 lg:grid-cols-3 lg:gap-y-12">
		{#each devisor.questions as question (question.topic)}
			<QuestionCell topic={question.topic} title={question.title} body={question.body} />
		{/each}
		<QuestionCell
			topic={devisor.invite.topic}
			title={devisor.invite.title}
			body={devisor.invite.body}
			accent
		>
			<a
				href={contact.email}
				class="self-start text-[16px]/5 font-bold underline decoration-[1.5px] underline-offset-4"
			>
				{devisor.invite.cta}<span aria-hidden="true">&nbsp;→</span>
			</a>
		</QuestionCell>
	</div>
</section>

<Closing secondary={{ label: '← Back to tobylo.dev', href: '/' }} />
