<script lang="ts">
	import { header } from '#lib/cv.ts';
</script>

<!-- Page 2's running head. It repeats page 1, so phones, where the sheets run on, leave it out. -->
<div
	class="border-accent a4:flex hidden items-baseline justify-between border-b-[3px] pb-3"
	aria-hidden="true"
>
	<p class="text-ink text-[18px]/[22px] font-extrabold tracking-[-0.02em]">{header.name}</p>
	<p class="text-ink-tag font-mono text-[10px]/[14px] font-medium tracking-[0.06em]">
		<a href={header.email.href} tabindex="-1" class="hover:underline">{header.email.label}</a>
		·
		<a href={header.site.href} tabindex="-1" class="hover:underline">{header.site.label}</a>
	</p>
</div>
