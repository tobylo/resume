<script lang="ts">
	import { heroVariants, ROTATE_MS, openTo, worksIn } from '$lib/home';
	import { contact, person } from '$lib/site';
	import { jobFit } from '$lib/job-fit/dialog.svelte';
	import Button from '../Button.svelte';

	let active = $state(0);
	let hovered = $state(false);
	let focused = $state(false);
	let reducedMotion = $state(false);

	const paused = $derived(hovered || focused || reducedMotion);

	$effect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = query.matches;
		const onChange = (event: MediaQueryListEvent) => (reducedMotion = event.matches);
		query.addEventListener('change', onChange);
		return () => query.removeEventListener('change', onChange);
	});

	$effect(() => {
		if (paused) return;
		const timer = setInterval(() => (active = (active + 1) % heroVariants.length), ROTATE_MS);
		return () => clearInterval(timer);
	});
</script>

<section
	class="page pt-10 pb-8 lg:pt-28 lg:pb-24"
	aria-label="Introduction"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
	onfocusin={() => (focused = true)}
	onfocusout={() => (focused = false)}
>
	<div class="flex items-center gap-3 lg:gap-3.5">
		<img
			src="/avatar.webp"
			alt=""
			width="96"
			height="96"
			class="border-line-strong size-10 shrink-0 border-[1.5px] lg:size-9"
		/>
		<p class="label text-ink lg:text-tag flex flex-col gap-0.5 text-xs/4 lg:flex-row lg:gap-0">
			<span class="font-semibold lg:font-medium">{person.name}</span>
			<span class="text-ink-muted lg:text-ink">
				<span class="hidden lg:inline">&nbsp;·&nbsp;</span>{person.title}<span
					class="hidden lg:inline">&nbsp;·&nbsp;{person.location}</span
				>
			</span>
		</p>
	</div>

	<!-- Every variant shares one grid cell, so the block always has the tallest one's height. -->
	<h1 class="mt-6 grid max-w-[1180px] lg:mt-10">
		{#each heroVariants as variant, i (variant.headline)}
			<span
				class="font-display text-mobile-display xl:text-display transition-opacity duration-500 [grid-area:1/1] motion-reduce:transition-none lg:text-[72px]/[74px] {i ===
				active
					? 'opacity-100'
					: 'invisible opacity-0'}"
				aria-hidden={i !== active}
			>
				{variant.headline}
			</span>
		{/each}
	</h1>

	<div
		class="mt-6 flex flex-col gap-5 lg:mt-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20"
	>
		<div class="flex flex-col gap-5 lg:max-w-[640px] lg:gap-7">
			<div class="grid">
				{#each heroVariants as variant, i (variant.lead)}
					<p
						class="text-ink-body lg:text-lead text-[17px]/[26px] transition-opacity duration-500 [grid-area:1/1] motion-reduce:transition-none {i ===
						active
							? 'opacity-100'
							: 'invisible opacity-0'}"
						aria-hidden={i !== active}
					>
						{variant.lead}
					</p>
				{/each}
			</div>

			<div class="flex flex-col gap-2.5 lg:gap-4">
				<div class="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-3">
					<Button variant="accent" onclick={() => jobFit.show()}>
						<span class="lg:hidden">Is Tobias a fit? Paste the job ad →</span>
						<span class="hidden lg:inline">Is Tobias a fit for your role? Paste the job ad →</span>
					</Button>
					<Button variant="outline" href="/cv">Download CV</Button>
				</div>
				<p class="text-ink-body pt-1 text-sm/5 lg:pt-0 lg:text-[15px]/[22px]">
					Get an AI-written match report against my actual experience. I don't store job ads.
				</p>
			</div>

			<div
				class="flex items-center gap-1.5 pt-3 lg:gap-2 lg:pt-1"
				role="group"
				aria-label="Headlines"
			>
				{#each heroVariants.keys() as i (i)}
					<button
						type="button"
						onclick={() => (active = i)}
						class="flex h-6 items-center"
						aria-label="Show headline {i + 1} of {heroVariants.length}"
						aria-pressed={i === active}
					>
						<span
							class="block h-[3px] transition-[width,background-color] duration-300 motion-reduce:transition-none {i ===
							active
								? 'bg-ink w-8 lg:w-12'
								: 'bg-track w-4 lg:w-6'}"
						></span>
					</button>
				{/each}
				<span class="label text-ink-muted pl-2 text-[11px]/[14px] lg:text-xs/4" aria-live="off">
					{active + 1} / {heroVariants.length}
				</span>
			</div>
		</div>

		<aside
			class="border-line-strong flex flex-col gap-2.5 border-l-[1.5px] py-1 pl-[18px] lg:w-[360px] lg:shrink-0 lg:gap-3.5 lg:py-0 lg:pl-6"
			aria-label="Open to"
		>
			<p class="label text-ink-muted lg:text-tag text-xs/4">Open to</p>
			<p class="text-[17px]/[25px] font-semibold lg:text-lg/[27px]">{openTo.roles}</p>
			<div class="flex flex-col gap-2.5 lg:pt-2.5">
				<p class="label text-ink-muted text-[11px]/4 lg:text-xs/[18px]">{openTo.terms}</p>
				<div class="flex gap-5 text-[15px]/5 font-semibold underline underline-offset-4 lg:gap-6">
					<a href={contact.email}>Email ↗</a>
					<a href={contact.linkedIn} rel="me noopener" target="_blank">LinkedIn ↗</a>
					<a href={contact.gitHub} rel="me noopener" target="_blank">GitHub ↗</a>
				</div>
			</div>
		</aside>
	</div>

	<div
		class="border-line mt-5 flex flex-col gap-2 border-t pt-4 lg:mt-10 lg:flex-row lg:items-baseline lg:gap-6"
	>
		<p class="label text-ink-muted lg:text-tag text-xs/4 lg:w-[120px] lg:shrink-0">Works in</p>
		<p class="text-base/[25px] font-semibold lg:text-[17px]/[26px]">{worksIn.join(' · ')}</p>
	</div>
</section>
