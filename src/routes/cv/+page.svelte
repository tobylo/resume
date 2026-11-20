<script lang="ts">
	import Button from '#lib/components/Button.svelte';
	import Meta from '#lib/components/Meta.svelte';
	import Closing from '#lib/components/Closing.svelte';
	import CvSheet from '#lib/components/cv/CvSheet.svelte';
	import CvHeader from '#lib/components/cv/CvHeader.svelte';
	import CvRunningHeader from '#lib/components/cv/CvRunningHeader.svelte';
	import CvProfile from '#lib/components/cv/CvProfile.svelte';
	import CvFacts from '#lib/components/cv/CvFacts.svelte';
	import CvHeading from '#lib/components/cv/CvHeading.svelte';
	import CvEntry from '#lib/components/cv/CvEntry.svelte';
	import CvRow from '#lib/components/cv/CvRow.svelte';
	import CvCredentials from '#lib/components/cv/CvCredentials.svelte';
	import {
		header,
		pageOneEntries,
		pageTwoEntries,
		earlierEngagements,
		updated,
		closingLine
	} from '#lib/cv.ts';
	import { yearsInProduction } from '#lib/projects/index.ts';

	const pages = 2;
</script>

<Meta
	title="CV · {header.name}"
	description="{header.name}'s CV on two A4 pages: {header.title.toLowerCase()} with {yearsInProduction} years in production software. Print it or save it as a PDF."
	path="/cv"
/>

<div class="cv bg-surface print:bg-canvas">
	<div class="page a4:gap-8 flex flex-col items-center gap-5 py-8 lg:py-14 print:block print:p-0">
		<div
			class="a4:w-[210mm] flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden"
		>
			<p class="text-ink-muted text-sm">Two A4 pages, from the same data as the site.</p>
			<Button variant="primary" size="sm" onclick={() => window.print()}>
				Print / save as PDF
			</Button>
		</div>

		<CvSheet page={1} {pages} note={updated}>
			<CvHeader />
			<CvProfile />
			<CvFacts />
			<section class="pt-6" aria-labelledby="cv-experience">
				<CvHeading id="cv-experience">Selected experience</CvHeading>
				{#each pageOneEntries as entry (entry.id)}
					<CvEntry {entry} />
				{/each}
			</section>
		</CvSheet>

		<CvSheet page={2} {pages} note={closingLine}>
			<CvRunningHeader />
			{#if pageTwoEntries.length}
				<section class="a4:pt-5" aria-labelledby="cv-experience-continued">
					<CvHeading id="cv-experience-continued">Selected experience, continued</CvHeading>
					{#each pageTwoEntries as entry (entry.id)}
						<CvEntry {entry} />
					{/each}
				</section>
			{/if}
			<section class="pt-[22px]" aria-labelledby="cv-earlier">
				<CvHeading id="cv-earlier">Earlier engagements · {earlierEngagements.count} more</CvHeading>
				{#each earlierEngagements.rows as row (row.id)}
					<CvRow {row} />
				{/each}
			</section>
			<CvCredentials />
		</CvSheet>
	</div>
</div>

<div class="print:hidden">
	<Closing />
</div>

<style>
	/* Only the sheets print: no site nav or footer, and the sheets carry their own margins. */
	@page cv {
		size: A4;
		margin: 0;
	}

	@media print {
		.cv {
			page: cv;
		}

		:global(body:has(.cv) > .contents > :not(main)) {
			display: none;
		}
	}
</style>
