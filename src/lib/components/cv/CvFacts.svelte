<script lang="ts">
	import { facts } from '#lib/cv.ts';
	import { worksIn } from '#lib/home.ts';
	import { joinTags } from '#lib/format.ts';
</script>

<dl class="border-line a4:grid-cols-4 mt-[18px] grid grid-cols-2 border-y">
	{#each facts as fact (fact.value)}
		<div class="flex flex-col-reverse gap-px py-2.5">
			<dt class="text-ink-muted text-[10.5px]/[14px]">{fact.label}</dt>
			<dd class="text-ink text-[20px]/6 font-(--display-weight) tracking-[-0.02em]">
				{fact.value}
			</dd>
		</div>
	{/each}
</dl>

<dl class="a4:flex-row a4:items-baseline a4:gap-4 flex flex-col gap-1 pt-3">
	<dt class="label text-ink-muted w-[90px] shrink-0 text-[9.5px]/3 font-semibold">Works in</dt>
	<dd class="text-ink text-xs/[18px] font-semibold">{joinTags(worksIn)}</dd>
</dl>
