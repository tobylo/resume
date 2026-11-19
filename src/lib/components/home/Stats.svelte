<script lang="ts">
	import { stats } from '$lib/home';
</script>

<section
	class="border-t-line-strong border-b-line border-t-[1.5px] border-b"
	aria-label="At a glance"
>
	<dl class="page grid grid-cols-2 lg:grid-cols-4">
		{#each stats as stat, i (stat.value)}
			<div
				class="flex flex-col gap-1 py-5 lg:gap-1.5 lg:py-8 {i >= 2
					? 'border-line border-t lg:border-t-0'
					: ''}"
			>
				<dt class="sr-only">{stat.label}</dt>
				<dd class="font-display lg:text-heading text-[34px]/[38px]">{stat.value}</dd>
				<dd class="text-ink-muted pr-4 text-sm/[18px] lg:text-[15px]/[18px]" aria-hidden="true">
					{stat.label}
				</dd>
			</div>
		{/each}
	</dl>
</section>
