<script lang="ts">
	import type { Row } from '#lib/cv.ts';

	let { row }: { row: Row } = $props();
</script>

<!-- One earlier client on one compact line: period, name and role, what the work was. -->
<article
	class="border-line a4:flex-row a4:gap-4 flex break-inside-avoid flex-col gap-1 border-b py-[5px] last:border-b-0"
	aria-labelledby="cv-{row.id}"
>
	<p class="text-ink-tag w-[90px] shrink-0 font-mono text-[10px]/4">{row.period}</p>
	<div class="a4:w-[200px] flex shrink-0 flex-col">
		<h3 id="cv-{row.id}" class="text-ink text-xs/4 font-bold">{row.name}</h3>
		<p class="text-ink-muted text-[10.5px]/[14px]">{row.role}</p>
	</div>
	<p class="text-ink-body flex-1 text-[11.5px]/4">{row.line}</p>
</article>
