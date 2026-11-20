<script lang="ts">
	import { profile, openTo } from '#lib/home.ts';
</script>

<div class="a4:flex-row a4:gap-7 flex flex-col gap-5 pt-5">
	<p class="text-ink-body flex-1 text-[13px]/5">{profile}</p>
	<div
		class="border-line-strong a4:w-[200px] flex shrink-0 flex-col gap-[5px] border-l-[1.5px] pl-3.5"
	>
		<p class="label text-ink-muted text-[9.5px]/3 font-semibold">Open to</p>
		<p class="text-ink text-xs/[17px] font-semibold">{openTo.cv.roles}</p>
		<p class="text-ink-tag text-[11px]/[15px]">{openTo.cv.terms}</p>
	</div>
</div>
