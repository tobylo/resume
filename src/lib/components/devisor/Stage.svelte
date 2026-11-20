<script lang="ts">
	let { step, name, body }: { step: number; name: string; body: string } = $props();
</script>

<!-- One step of the loop: a row of the list on mobile, a column from lg. -->
<li
	class="border-line flex flex-col gap-2.5 border-b py-6 last:border-b-0 lg:flex-1 lg:gap-3.5 lg:border-r lg:border-b-0 lg:px-7 lg:pt-8 lg:pb-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
>
	<p class="label text-tag font-semibold">{String(step).padStart(2, '0')}</p>
	<h3 class="tracking-title lg:text-title text-[22px]/7 font-extrabold dark:font-bold">{name}</h3>
	<p class="text-ink-body text-[16px]/[25px]">{body}</p>
</li>
