<script lang="ts">
	import { devisor } from '#lib/devisor.ts';
</script>

<!--
	The one large accent block. In dark mode it becomes a raised surface with a yellow top
	rule and a yellow wordmark, so the page never glares.
-->
<section class="page lg:pt-section pt-14" aria-labelledby="devisor-feature">
	<div
		class="bg-accent text-on-accent border-on-accent dark:bg-surface dark:text-ink-body dark:border-t-accent flex flex-col gap-4 border-[1.5px] px-[22px] py-7 lg:flex-row lg:gap-16 lg:p-16 dark:border-0 dark:border-t-[3px]"
	>
		<div class="flex flex-col gap-4 lg:w-[520px] lg:shrink-0 lg:gap-5">
			<p class="label dark:text-ink-muted lg:text-tag text-[11px]/[14px] font-semibold">
				Side project · sharpening the craft
			</p>
			<h2
				id="devisor-feature"
				class="font-display dark:text-accent text-5xl/12 lg:text-[72px]/[72px]"
			>
				{devisor.name}
			</h2>
			<p class="dark:text-ink text-lg/[26px] font-medium lg:text-[22px]/[31px]">
				{devisor.tagline}
			</p>
		</div>
		<div class="flex flex-col gap-4 lg:flex-1 lg:gap-6 lg:pt-2">
			<p class="hidden text-[17px]/7 lg:block">{devisor.loop}</p>
			<p class="text-[15px]/6 lg:text-[17px]/7">
				<strong class="dark:text-ink font-bold">{devisor.observable.lead}</strong>
				{devisor.observable.body}
			</p>
			<div class="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px]/4 font-medium">
				{#each devisor.traits as trait (trait)}
					<span class="dark:text-ink-tag hidden lg:inline">{trait}</span>
				{/each}
				<a href="/devisor" class="dark:text-ink font-semibold underline underline-offset-4">
					<span class="lg:hidden">Read the write-up →</span>
					<span class="hidden lg:inline">Write-up →</span>
				</a>
			</div>
		</div>
	</div>
</section>
