<script lang="ts">
	import LinuxFoundationLogo from 'virtual:icons/simple-icons/linuxfoundation';
	import MicrosoftLogo from 'virtual:icons/ion/logo-microsoft';

	import ContactCard from './ContactCard.svelte';
	import Profile from './Profile.svelte';
	import Certifier from '$lib/Certifier.svelte';
</script>

<div class="flex min-h-dvh w-full flex-grow justify-center bg-slate-700">
	<div
		class="grid max-w-screen-lg auto-rows-min grid-cols-1 gap-x-8 gap-y-4 justify-self-center bg-slate-300 p-12 shadow-2xl sm:grid-cols-[minmax(auto,400px)_1fr]"
	>
		<Profile />

		<div class="flex max-h-[400px] flex-col justify-center gap-4">
			<div class="flex flex-col gap-4 align-top font-serif text-xs italic sm:text-base">
				<span class="text-center font-sans text-2xl font-bold sm:text-left">Tobias Lolax</span>
				<span class="font-semibold">Curious tinkerer by nature</span>
				<span
					>A founder, CEO, consultant, software developer, hardware tinkerer, father of two, likes
					gaming (PC/console/board), hitting mountainbike trails with friends, craft beer and being
					social!</span
				>
			</div>

			<ContactCard />
		</div>

		<div class="grid w-full grid-cols-1 gap-8">
			<div class="block w-full overflow-hidden rounded bg-slate-600 text-white md:shadow-md">
				<div class="px-6 py-4">
					<div class="mb-2 text-base font-bold xl:text-xl">Education</div>
					<p class="text-xs sm:text-base">
						Bachelor of Engineering, Information Technology, 2005-2009, Novia University of Applied
						Sciences
					</p>

					<div class="mb-2 text-base font-bold xl:text-xl">Certifications</div>

					<div class="grid auto-cols-min grid-cols-[auto_1fr] gap-2 text-xs sm:text-base">
						<Certifier tooltip="The Linux Foundation">
							<LinuxFoundationLogo class="h-full" />
						</Certifier>
						<a
							class="font-normal text-white no-underline hover:text-blue-400"
							href="https://www.credly.com/badges/591adb36-1424-4119-81e2-2ee806063a41"
							target="_blank">Kubernetes Administrator</a
						>

						<Certifier tooltip="The Linux Foundation">
							<LinuxFoundationLogo class="h-full" />
						</Certifier>
						<a
							class="font-normal text-white no-underline hover:text-blue-400"
							href="https://www.credly.com/badges/ea350be1-0743-44ec-873e-fe214628e15d"
							target="_blank">Kubernetes Application Developer</a
						>

						<Certifier tooltip="Microsoft Certified">
							<MicrosoftLogo class="h-full" />
						</Certifier>
						<a
							class="font-normal text-white no-underline hover:text-blue-400"
							href="https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/66F629B1B2DF4B7A"
							target="_blank"
							>DevOps Engineer Expert
						</a>

						<Certifier tooltip="Microsoft Certified">
							<MicrosoftLogo class="h-full" />
						</Certifier>
						<a
							class="font-normal text-white no-underline hover:text-blue-400"
							href="https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/5F903E01ED02CCA5"
							target="_blank"
							>Azure Cosmos DB Developer Specialty
						</a>

						<Certifier tooltip="Microsoft Certified">
							<MicrosoftLogo class="h-full" />
						</Certifier>
						<a
							class="font-normal text-white no-underline hover:text-blue-400"
							href="https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/C654B890A7D89E44"
							target="_blank"
							>Azure Administrator Associate
						</a>

						<Certifier tooltip="Microsoft Certified">
							<MicrosoftLogo class="h-full" />
						</Certifier>
						<span>MCSA: Web Applications</span>

						<Certifier tooltip="Microsoft Certified">
							<MicrosoftLogo class="h-full" />
						</Certifier>
						<span>Solutions Developer: App Builder</span>

						<Certifier tooltip="Microsoft Certified">
							<MicrosoftLogo class="h-full" />
						</Certifier>
						<span>Solutions Developer: Web Applications</span>

						<Certifier tooltip="Microsoft Certified">
							<MicrosoftLogo class="h-full" />
						</Certifier>
						<span>Specialist: C#</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		//background-color: theme(colors.gray.400);
	}
</style>
