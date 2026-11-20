<script lang="ts">
	import { contact, languages } from '#lib/site.ts';
</script>

<footer
	class="page flex flex-col-reverse gap-3.5 pt-7 pb-8 lg:flex-row lg:items-center lg:justify-between lg:pt-14 lg:pb-12"
>
	<p class="text-ink-muted text-sm lg:text-[15px]/[18px]">{languages}</p>
	<div class="flex gap-6 text-[15px]/[18px] font-semibold lg:gap-7">
		<a href={contact.linkedIn} rel="me noopener" target="_blank" class="hover:underline">
			LinkedIn
		</a>
		<a href={contact.gitHub} rel="me noopener" target="_blank" class="hover:underline">GitHub</a>
		<a href="/lab" class="hover:underline">Hobby lab</a>
		<a href="/privacy" class="hover:underline">Privacy</a>
	</div>
</footer>
