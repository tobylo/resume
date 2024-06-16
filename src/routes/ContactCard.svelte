<script lang="ts">
	import GlobeLogo from 'virtual:icons/hugeicons/maps-global-01';
	import GitHubLogo from 'virtual:icons/hugeicons/github-01';
	import EmailSymbol from 'virtual:icons/material-symbols/alternate-email-rounded';
	import LinkedInLogo from 'virtual:icons/radix-icons/linkedin-logo';
	import ContactDetail from './ContactDetail.svelte';
</script>

<div
	class="full-w flex flex-col flex-wrap justify-between rounded-md bg-gray-200 p-4 text-xs md:gap-y-1 lg:flex-row md:text-sm"
>
	<ContactDetail>
		<GlobeLogo class="h-full" />
		<span>Stockholm, Sweden</span>
	</ContactDetail>

	<ContactDetail href="mailto:tobias.lolax+resume@gmail.com">
		<EmailSymbol class="h-full" />
		<span>tobias.lolax@gmail.com</span>
	</ContactDetail>

	<ContactDetail href="https://www.linkedin.com/in/tobiaslolax/">
		<LinkedInLogo class="h-full" />
		tobiaslolax
	</ContactDetail>

	<ContactDetail href="https://github.com/tobylo">
		<GitHubLogo class="h-full" />
		<span>@tobylo</span>
	</ContactDetail>
</div>
