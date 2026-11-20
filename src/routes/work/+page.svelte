<script lang="ts">
	import Meta from '#lib/components/Meta.svelte';
	import Closing from '#lib/components/Closing.svelte';
	import ClientRow from '#lib/components/work/ClientRow.svelte';
	import { eras, timelineStats, plural } from '#lib/work.ts';

	const { engagements, clients, firstYear, years } = timelineStats;

	const stats = [
		{ value: String(engagements), label: 'engagements' },
		{ value: String(clients), label: 'clients' },
		{ value: `${years} yrs`, label: 'in production' }
	];
</script>

<Meta
	title="Full timeline · Tobias Lolax"
	description="Every client engagement since {firstYear}, most recent first: {engagements} engagements for {clients} clients, from medtech and public radio to retail, IoT and finance."
	path="/work"
/>

<section class="page pt-10 pb-10 lg:pt-24 lg:pb-18" aria-labelledby="timeline">
	<nav aria-label="Breadcrumb" class="label text-ink text-tag font-semibold">
		<a href="/" class="underline-offset-4 hover:underline">
			<span aria-hidden="true">←&nbsp;</span>tobylo.dev
		</a>
		<span aria-hidden="true">&nbsp;/&nbsp;</span>
		<span aria-current="page">Work</span>
	</nav>

	<h1 id="timeline" class="font-display text-mobile-display lg:text-display mt-6 lg:mt-7">
		Full timeline
	</h1>

	<div
		class="mt-5 flex flex-col gap-6 lg:mt-7 lg:flex-row lg:items-end lg:justify-between lg:gap-20"
	>
		<p class="text-ink-body lg:text-lead max-w-[640px] text-[17px]/[26px]">
			{engagements} engagements since {firstYear}, from medtech and public radio to retail, IoT and
			finance. Most recent first.
		</p>
		<dl class="flex shrink-0 gap-8 lg:gap-12">
			{#each stats as stat (stat.label)}
				<div class="flex flex-col-reverse gap-1">
					<dt class="text-ink-muted text-[14px]/[18px]">{stat.label}</dt>
					<dd class="font-display text-[32px]/9">{stat.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<div class="page flex flex-col gap-14 lg:gap-24">
	{#each eras as era (era.id)}
		<section aria-labelledby={era.id}>
			<header
				class="border-line-strong flex flex-col gap-2 border-t-[1.5px] pt-5 pb-6 lg:flex-row lg:items-baseline lg:gap-8 lg:pt-7 lg:pb-8"
			>
				<p class="label text-ink-muted text-tag lg:w-[140px] lg:shrink-0">{era.period}</p>
				<h2 id={era.id} class="font-display text-[34px]/[38px] lg:flex-1 lg:text-[40px]/[44px]">
					{era.heading}
				</h2>
				<p class="label text-ink-muted text-tag lg:shrink-0">
					{plural(era.engagements, 'engagement')}
				</p>
			</header>
			{#each era.clients as client (client.id)}
				<ClientRow {client} />
			{/each}
		</section>
	{/each}
</div>

<Closing heading="Seen enough? Let's compare notes." />
