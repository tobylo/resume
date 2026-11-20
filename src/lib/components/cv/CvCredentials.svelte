<script lang="ts">
	import {
		currentCertifications,
		previousCertifications,
		educationLines,
		languageLine,
		sideProjects
	} from '#lib/cv.ts';
	import CvHeading from './CvHeading.svelte';

	const column = 'border-line-strong flex flex-1 flex-col gap-2 border-t-[1.5px] pt-2';
	const item = 'text-ink-body text-[11.5px]/[17px]';
</script>

<div class="a4:flex-row a4:gap-7 flex flex-col gap-6 pt-[22px] pb-4">
	<section class={column} aria-labelledby="cv-certifications">
		<CvHeading ruled={false} id="cv-certifications">Certifications</CvHeading>
		{#each currentCertifications as group (group.issuer)}
			<p class={item}><strong class="text-ink">{group.issuer}:</strong> {group.names}</p>
		{/each}
		{#each previousCertifications as line (line)}
			<p class="text-ink-tag text-[11.5px]/[17px]">
				<strong class="text-ink">Previously:</strong>
				{line}
			</p>
		{/each}
	</section>

	<section class={column} aria-labelledby="cv-education">
		<CvHeading ruled={false} id="cv-education">Education & languages</CvHeading>
		<p class={item}>
			<strong class="text-ink">{educationLines.degree}</strong><br />{educationLines.school}
		</p>
		<p class={item}>{languageLine}</p>
	</section>

	<section class={column} aria-labelledby="cv-side-projects">
		<CvHeading ruled={false} id="cv-side-projects">Side projects</CvHeading>
		{#each sideProjects as project (project.id)}
			<p class={item}><strong class="text-ink">{project.name}:</strong> {project.line}</p>
		{/each}
	</section>
</div>
