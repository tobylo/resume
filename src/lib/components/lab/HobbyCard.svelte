<script lang="ts">
	import type { Component } from 'svelte';
	import type { HobbyProject } from '#lib/hobby-projects/index.ts';
	import DevisorVisual from './DevisorVisual.svelte';
	import TrackVisual from './TrackVisual.svelte';
	import KeysVisual from './KeysVisual.svelte';
	import QueryVisual from './QueryVisual.svelte';

	let { project, lazy = false }: { project: HobbyProject; lazy?: boolean } = $props();

	const illustrations: Record<'devisor' | 'track' | 'keys' | 'query', Component> = {
		devisor: DevisorVisual,
		track: TrackVisual,
		keys: KeysVisual,
		query: QueryVisual
	};

	const isExternal = (href: string) => /^https?:\/\//.test(href);
</script>

<article class="flex flex-col gap-3.5" aria-labelledby="{project.id}-title">
	{#if project.visual.kind === 'image'}
		<img
			src={project.visual.src}
			alt={project.visual.alt}
			width={project.visual.width}
			height={project.visual.height}
			loading={lazy ? 'lazy' : 'eager'}
			decoding="async"
			class="border-line-strong h-60 w-full border-[1.5px] object-cover"
		/>
	{:else}
		{@const Illustration = illustrations[project.visual.kind]}
		{#if project.visual.alt}
			<div role="img" aria-label={project.visual.alt}><Illustration /></div>
		{:else}
			<div aria-hidden="true"><Illustration /></div>
		{/if}
	{/if}

	<p class="label text-ink-muted pt-1.5 text-[12px]/4">{project.meta}</p>
	<h2 id="{project.id}-title" class="text-[22px]/7 font-bold tracking-[-0.015em]">
		{project.title}
	</h2>
	<p class="text-ink-body text-[16px]/[25px]">{project.summary ?? project.description}</p>

	{#if project.links?.length}
		<p class="flex flex-wrap gap-x-6 gap-y-2">
			{#each project.links as link (link.href)}
				{@const external = isExternal(link.href)}
				<a
					href={link.href}
					target={external ? '_blank' : undefined}
					rel={external ? 'noopener noreferrer' : undefined}
					aria-label="{link.label}, {project.title}"
					class="text-[15px]/5 font-semibold underline decoration-1 underline-offset-4"
				>
					{link.label} <span aria-hidden="true">{external ? '↗' : '→'}</span>
				</a>
			{/each}
		</p>
	{:else}
		<p class="text-ink-tag font-mono text-[12px]/5">{project.technologies.join(' · ')}</p>
	{/if}
</article>
