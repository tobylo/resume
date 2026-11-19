<script lang="ts">
	import { certifications, education } from '#lib/credentials.ts';

	const current = certifications.filter((cert) => cert.featured && cert.current);
	const previous = certifications.filter((cert) => cert.featured && !cert.current);
</script>

<section class="page flex flex-col gap-8 pt-14 lg:gap-10 lg:pt-24" aria-label="Credentials">
	<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
		<h2 class="label text-ink-muted lg:text-tag text-xs/4 lg:w-[140px] lg:shrink-0 lg:pt-1">
			Certifications
		</h2>
		<ul class="grid grid-cols-2 gap-x-5 gap-y-[18px] lg:flex lg:gap-12">
			{#each current as cert (cert.name)}
				<li class="flex flex-col gap-0.5 lg:gap-1">
					<a
						href={cert.url}
						rel="noopener"
						target="_blank"
						class="text-[15px]/[21px] font-bold hover:underline lg:text-[17px]/6"
					>
						{cert.shortName ?? cert.name}&nbsp;↗
					</a>
					<span class="text-ink-muted text-[13px]/[18px] lg:text-sm/5">
						{cert.issuer} Certified
					</span>
				</li>
			{/each}
			{#if previous.length > 0}
				<li class="text-ink-muted flex flex-col gap-0.5 lg:gap-1">
					<span class="text-[15px]/[21px] font-bold lg:text-[17px]/6">
						{previous.map((cert) => cert.shortName ?? cert.name).join(' & ')}
					</span>
					<span class="text-[13px]/[18px] lg:text-sm/5">{previous[0].issuer} · previously</span>
				</li>
			{/if}
		</ul>
	</div>

	<div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-8">
		<h2 class="label text-ink-muted lg:text-tag text-xs/4 lg:w-[140px] lg:shrink-0 lg:pt-1">
			Education
		</h2>
		<div class="flex flex-col gap-0.5 lg:gap-1">
			<p class="text-[15px]/[21px] font-bold lg:text-[17px]/6">
				{education.shortDegree}, {education.field}
			</p>
			<p class="text-ink-muted text-[13px]/[18px] lg:text-sm/5">
				{education.institution} · {education.years.replace('-', '–')}
			</p>
		</div>
	</div>
</section>
