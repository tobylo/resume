<script lang="ts">
	import { clientRole, type TimelineClient } from '#lib/work.ts';
	import { formatPeriod } from '#lib/format.ts';
	import WorkRow from '../WorkRow.svelte';

	let { client }: { client: TimelineClient } = $props();

	const [first, ...others] = $derived(client.projects);
	const role = $derived(clientRole(client));
</script>

<WorkRow
	dense
	id={client.id}
	period={formatPeriod(client.period)}
	title={client.name}
	{role}
	tags={client.tags}
>
	{#if others.length}
		<ul class="flex flex-col gap-2.5">
			{#each client.projects as project (project.id)}
				<li class="flex gap-3.5">
					<span class="text-ink-muted text-tag min-w-10 shrink-0 font-mono leading-[25px]">
						{project.label ?? formatPeriod(project.period)}
					</span>
					<span class="text-ink-body text-[16px]/[25px]">{project.description}</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-ink-body text-[16px]/[25px]">{first.description}</p>
	{/if}
</WorkRow>
