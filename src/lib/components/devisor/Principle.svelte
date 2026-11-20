<script lang="ts">
	let { title, body }: { title: string; body: string } = $props();
</script>

<div class="border-line-strong flex flex-col gap-2.5 border-t-[1.5px] pt-5">
	<h3 class="text-[20px]/[26px] font-bold tracking-[-0.01em] lg:text-[22px]/7">{title}</h3>
	<p class="text-ink-body text-[16px]/[25px] lg:text-base">{body}</p>
</div>
