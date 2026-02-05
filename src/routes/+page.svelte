<script lang="ts">
	import LinuxFoundationLogo from 'virtual:icons/simple-icons/linuxfoundation';
	import MicrosoftLogo from 'virtual:icons/ion/logo-microsoft';
	import CiscoLogo from 'virtual:icons/simple-icons/cisco';

	import ContactCard from './ContactCard.svelte';
	import Profile from './Profile.svelte';
	import Certifier from '$lib/Certifier.svelte';
	import Projects from '$lib/Projects.svelte';
	import HobbyProjects from '$lib/HobbyProjects.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import JobFitButton from '$lib/JobFitButton.svelte';
	import JobFitDialog from '$lib/JobFitDialog.svelte';
	import type { FitAnalysis, AnalyzeErrorResponse } from '$lib/job-fit/types';

	let dialogOpen = $state(false);
	let dialog: JobFitDialog;

	async function handleAnalyze(data: { jobDescription: string; turnstileToken: string }) {
		try {
			const response = await fetch('/api/analyze', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					jobDescription: data.jobDescription,
					turnstileToken: data.turnstileToken
				})
			});

			const result = await response.json();

			if (result.success) {
				dialog.setResult(result.analysis as FitAnalysis);
			} else {
				const err = result as AnalyzeErrorResponse;
				dialog.setError(err.error, err.code);
			}
		} catch {
			dialog.setError(
				'Network error. Please check your connection and try again.',
				'INTERNAL_ERROR'
			);
		}
	}
</script>

<div class="print-container flex min-h-dvh w-full justify-center bg-slate-700 dark:bg-slate-900">
	<div
		class="print-container relative flex w-full max-w-6xl flex-col bg-slate-300 shadow-2xl dark:bg-slate-800"
	>
		<!-- Theme Toggle -->
		<div class="absolute top-4 right-4 z-10">
			<ThemeToggle />
		</div>
		<!-- Hero Section -->
		<div class="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
			<div class="print-hide w-56 shrink-0 sm:w-72">
				<Profile />
			</div>

			<div
				class="not-prose flex flex-col justify-center gap-1 text-center sm:text-left dark:text-white"
			>
				<h1 class="font-sans text-3xl font-bold sm:text-4xl">Tobias Lolax</h1>
				<p class="font-serif text-lg italic">Curious tinkerer by nature</p>
				<p class="mt-1 font-serif text-sm italic sm:text-base">
					A founder, CEO, consultant, software developer, hardware tinkerer, father of two, likes
					gaming (PC/console/board), hitting mountainbike trails with friends, craft beer and being
					social!
				</p>
				<div class="print-hide mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
					<span class="rounded-sm bg-slate-600 px-2 py-1 text-xs text-white"
						>Cloud-native solutions</span
					>
					<span class="rounded-sm bg-slate-600 px-2 py-1 text-xs text-white"
						>Interactive web apps</span
					>
					<span class="rounded-sm bg-slate-600 px-2 py-1 text-xs text-white"
						>Frontend exploration</span
					>
					<span class="rounded-sm bg-slate-600 px-2 py-1 text-xs text-white"
						>Exploring Zig & Go</span
					>
				</div>
				<div class="mt-4">
					<ContactCard />
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="grid flex-1 grid-cols-1 gap-6 p-8 pt-0 sm:p-12 sm:pt-0 lg:grid-cols-[1fr_2fr]">
			<!-- Left Column: Education & Certifications -->
			<div class="not-prose flex flex-col gap-6 dark:text-white">
				<div class="overflow-hidden rounded-sm bg-slate-600 text-white shadow-md">
					<div class="px-6 py-4">
						<h2 class="mb-2 text-xl font-bold">Education</h2>
						<p class="text-sm sm:text-base">
							Bachelor of Engineering, Information Technology, 2005-2009, Novia University of
							Applied Sciences
						</p>
					</div>
				</div>

				<div class="overflow-hidden rounded-sm bg-slate-600 text-white shadow-md">
					<div class="px-6 py-4">
						<h2 class="mb-2 text-xl font-bold">Certifications</h2>
						<div class="grid grid-cols-[auto_1fr] gap-2 text-xs sm:text-sm">
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
								target="_blank">DevOps Engineer Expert</a
							>

							<Certifier tooltip="Microsoft Certified">
								<MicrosoftLogo class="h-full" />
							</Certifier>
							<a
								class="font-normal text-white no-underline hover:text-blue-400"
								href="https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/5F903E01ED02CCA5"
								target="_blank">Azure Cosmos DB Developer Specialty</a
							>

							<Certifier tooltip="Microsoft Certified">
								<MicrosoftLogo class="h-full" />
							</Certifier>
							<a
								class="font-normal text-white no-underline hover:text-blue-400"
								href="https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/C654B890A7D89E44"
								target="_blank">Azure Administrator Associate</a
							>

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

				<div class="overflow-hidden rounded-sm bg-slate-600 text-white shadow-md">
					<div class="px-6 py-4">
						<h2 class="mb-2 text-xl font-bold">Courses</h2>
						<div class="grid grid-cols-[auto_1fr] gap-2 text-xs sm:text-sm">
							<Certifier tooltip="Cisco Networking Academy">
								<CiscoLogo class="h-full" />
							</Certifier>
							<span>CCNA (Cisco Certified Network Associate)</span>
						</div>
					</div>
				</div>

				<div class="overflow-hidden rounded-sm bg-slate-600 text-white shadow-md">
					<div class="px-6 py-4">
						<h2 class="mb-2 text-xl font-bold">Languages</h2>
						<div class="flex flex-col gap-1 text-xs sm:text-sm">
							<div class="flex justify-between">
								<span>Swedish</span>
								<span class="text-slate-300">Native</span>
							</div>
							<div class="flex justify-between">
								<span>English</span>
								<span class="text-slate-300">Fluent</span>
							</div>
							<div class="flex justify-between">
								<span>Finnish</span>
								<span class="text-slate-300">Basic</span>
							</div>
						</div>
					</div>
				</div>
				<!-- Hobby Projects -->
				<HobbyProjects />
			</div>

			<!-- Right Column: Projects -->
			<div>
				<Projects />
			</div>
		</div>
	</div>
</div>

<JobFitButton onclick={() => (dialogOpen = true)} />
<JobFitDialog bind:open={dialogOpen} onsubmit={handleAnalyze} bind:this={dialog} />
