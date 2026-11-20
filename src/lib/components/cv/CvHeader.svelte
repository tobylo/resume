<script lang="ts">
	import { header } from '#lib/cv.ts';
</script>

<header
	class="border-accent a4:flex-row a4:items-end a4:justify-between a4:gap-8 a4:pb-[18px] flex flex-col gap-4 border-b-[3px] pb-4"
>
	<div class="flex flex-col gap-1.5">
		<h1 class="font-display a4:text-[42px]/[44px] text-[34px]/9">{header.name}</h1>
		<p class="label text-ink text-[11px]/[14px] font-semibold">{header.title}</p>
	</div>
	<address
		class="a4:items-end a4:text-right text-ink flex flex-col gap-[3px] text-[11.5px]/4 not-italic"
	>
		<span>{header.location}</span>
		<a href={header.email.href} class="hover:underline">{header.email.label}</a>
		<a href={header.linkedIn.href} rel="me noopener" target="_blank" class="hover:underline">
			{header.linkedIn.label}
		</a>
		<span>
			<a href={header.gitHub.href} rel="me noopener" target="_blank" class="hover:underline">
				{header.gitHub.label}
			</a>
			·
			<a href={header.site.href} class="hover:underline">{header.site.label}</a>
		</span>
	</address>
</header>
