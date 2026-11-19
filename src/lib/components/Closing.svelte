<script lang="ts">
	import { contact } from '#lib/site.ts';
	import { jobFit } from '#lib/job-fit/dialog.svelte.ts';
	import Button from './Button.svelte';

	let { heading = "Hiring for a role like this? Let's compare notes." }: { heading?: string } =
		$props();
</script>

<section id="contact" class="page scroll-mt-8 pt-18 lg:pt-35">
	<div
		class="border-line-strong flex flex-col gap-7 border-b-[1.5px] pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-14"
	>
		<h2 class="font-display lg:text-closing max-w-[860px] text-[40px]/[42px] text-balance">
			{heading}
		</h2>
		<div class="flex shrink-0 flex-col gap-2.5 lg:gap-3">
			<Button variant="cta" class="lg:justify-start" onclick={() => jobFit.show()}>
				Analyze job fit
			</Button>
			<Button variant="outline" href={contact.email} class="lg:justify-start">Email me</Button>
		</div>
	</div>
</section>
