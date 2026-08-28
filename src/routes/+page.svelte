<script lang="ts">
	import LinuxFoundationLogo from 'virtual:icons/simple-icons/linuxfoundation';
	import MicrosoftLogo from 'virtual:icons/ion/logo-microsoft';
	import CiscoLogo from 'virtual:icons/simple-icons/cisco';

	import ContactCard from './ContactCard.svelte';
	import Profile from './Profile.svelte';
	import Certifier from '$lib/Certifier.svelte';
	import Projects from '$lib/Projects.svelte';
	import HobbyProjects from '$lib/HobbyProjects.svelte';
	import TopBar from '$lib/TopBar.svelte';
	import JobFitCard from '$lib/JobFitCard.svelte';
	import JobFitDialog from '$lib/JobFitDialog.svelte';
	import { projects } from '$lib/projects';
	import { resumeContext } from '$lib/job-fit/resume-data';
	import type { AnalyzeResponse, AnalyzeErrorResponse } from '$lib/job-fit/types';

	let dialogOpen = $state(false);
	let dialog: JobFitDialog;
	let abortController: AbortController | null = null;

	const stats = [
		{ value: `${new Date().getFullYear() - 2009}`, label: 'years shipping software' },
		{ value: `${projects.length}`, label: 'client engagements' },
		{ value: `${resumeContext.certifications.length}`, label: 'active & past certifications' },
		{ value: 'K8s', label: 'CKA + CKAD certified' }
	];

	async function handleAnalyze(data: { jobDescription: string; turnstileToken: string }) {
		abortController?.abort();
		abortController = new AbortController();

		try {
			const response = await fetch('/api/analyze', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					jobDescription: data.jobDescription,
					turnstileToken: data.turnstileToken
				}),
				signal: abortController.signal
			});

			const result: AnalyzeResponse | AnalyzeErrorResponse = await response.json();

			if (result.success) {
				dialog.setResult(result.analysis);
			} else {
				dialog.setError(result.error, result.code);
			}
		} catch (err) {
			if (err instanceof DOMException && err.name === 'AbortError') return;
			dialog.setError(
				'Network error. Please check your connection and try again.',
				'INTERNAL_ERROR'
			);
		} finally {
			abortController = null;
		}
	}

	function handleCancel() {
		abortController?.abort();
	}

	function openDialog() {
		dialogOpen = true;
	}
</script>

<div id="top" class="print-container bg-canvas text-ink flex min-h-dvh w-full flex-col">
	<TopBar onanalyze={openDialog} />

	<div
		class="print-container mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-8"
	>
		<!-- Hero -->
		<section
			class="resume-card border-edge bg-card flex flex-col items-center gap-6 rounded-2xl border p-6 sm:flex-row sm:p-8"
		>
			<div class="print-hide w-56 shrink-0 sm:w-64">
				<Profile />
			</div>

			<div class="not-prose flex flex-col justify-center gap-2 text-center sm:text-left">
				<h1 class="font-display text-3xl font-bold sm:text-4xl">Tobias Lolax</h1>
				<p class="text-ink-muted text-base sm:text-lg">Curious tinkerer by nature</p>
				<p class="text-ink-soft mt-1 text-sm sm:text-base">
					A founder, CEO, consultant, software developer, hardware tinkerer, father of two, likes
					gaming (PC/console/board), hitting mountainbike trails with friends, caffè macchiato and being
					social!
				</p>
				<div class="print-hide mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
					<span class="bg-accent-tint text-accent rounded-full px-3 py-1 text-xs font-semibold"
						>Cloud-native solutions</span
					>
					<span class="bg-accent-tint text-accent rounded-full px-3 py-1 text-xs font-semibold"
						>Interactive web apps</span
					>
					<span class="bg-accent-tint text-accent rounded-full px-3 py-1 text-xs font-semibold"
						>Frontend exploration</span
					>
					<span class="bg-accent-tint text-accent rounded-full px-3 py-1 text-xs font-semibold"
						>Exploring Zig & Go</span
					>
				</div>
			</div>
		</section>

		<!-- Stat row -->
		<div class="print-hide not-prose grid grid-cols-2 gap-4 lg:grid-cols-4">
			{#each stats as stat (stat.label)}
				<div class="border-edge bg-card flex flex-col gap-0.5 rounded-2xl border px-5 py-4">
					<div class="font-display text-accent text-3xl font-extrabold">{stat.value}</div>
					<div class="text-ink-muted text-xs sm:text-sm">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Main Content -->
		<div class="print-grid grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
			<!-- Work column -->
			<section id="work" class="scroll-mt-20">
				<Projects />
			</section>

			<!-- Sidebar -->
			<div class="not-prose flex flex-col gap-6">
				<JobFitCard onanalyze={openDialog} />

				<div
					id="certifications"
					class="resume-card border-edge bg-card scroll-mt-20 overflow-hidden rounded-2xl border"
				>
					<div class="px-6 py-5">
						<h2 class="font-display mb-3 text-lg font-bold">Certifications</h2>
						<div class="grid grid-cols-[auto_1fr] gap-2 text-xs sm:text-sm">
							<Certifier tooltip="The Linux Foundation">
								<LinuxFoundationLogo class="h-full" />
							</Certifier>
							<a
								class="text-accent font-normal no-underline hover:underline"
								href="https://www.credly.com/badges/591adb36-1424-4119-81e2-2ee806063a41"
								target="_blank">Kubernetes Administrator</a
							>

							<Certifier tooltip="The Linux Foundation">
								<LinuxFoundationLogo class="h-full" />
							</Certifier>
							<a
								class="text-accent font-normal no-underline hover:underline"
								href="https://www.credly.com/badges/ea350be1-0743-44ec-873e-fe214628e15d"
								target="_blank">Kubernetes Application Developer</a
							>

							<Certifier tooltip="Microsoft Certified">
								<MicrosoftLogo class="h-full" />
							</Certifier>
							<a
								class="text-accent font-normal no-underline hover:underline"
								href="https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/66F629B1B2DF4B7A"
								target="_blank">DevOps Engineer Expert</a
							>

							<Certifier tooltip="Microsoft Certified">
								<MicrosoftLogo class="h-full" />
							</Certifier>
							<a
								class="text-accent font-normal no-underline hover:underline"
								href="https://learn.microsoft.com/api/credentials/share/en-us/tobylo-activesolution/5F903E01ED02CCA5"
								target="_blank">Azure Cosmos DB Developer Specialty</a
							>

							<Certifier tooltip="Microsoft Certified">
								<MicrosoftLogo class="h-full" />
							</Certifier>
							<a
								class="text-accent font-normal no-underline hover:underline"
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

				<div class="resume-card border-edge bg-card overflow-hidden rounded-2xl border">
					<div class="px-6 py-5">
						<h2 class="font-display mb-3 text-lg font-bold">Education</h2>
						<p class="text-sm sm:text-base">
							Bachelor of Engineering, Information Technology, 2005-2009, Novia University of
							Applied Sciences
						</p>
					</div>
				</div>

				<div class="resume-card border-edge bg-card overflow-hidden rounded-2xl border">
					<div class="px-6 py-5">
						<h2 class="font-display mb-3 text-lg font-bold">Courses</h2>
						<div class="grid grid-cols-[auto_1fr] gap-2 text-xs sm:text-sm">
							<Certifier tooltip="Cisco Networking Academy">
								<CiscoLogo class="h-full" />
							</Certifier>
							<span>CCNA (Cisco Certified Network Associate)</span>
						</div>
					</div>
				</div>

				<div class="resume-card border-edge bg-card overflow-hidden rounded-2xl border">
					<div class="px-6 py-5">
						<h2 class="font-display mb-3 text-lg font-bold">Languages</h2>
						<div class="flex flex-col gap-1 text-xs sm:text-sm">
							<div class="flex justify-between">
								<span>Swedish</span>
								<span class="text-ink-muted">Native</span>
							</div>
							<div class="flex justify-between">
								<span>English</span>
								<span class="text-ink-muted">Fluent</span>
							</div>
							<div class="flex justify-between">
								<span>Finnish</span>
								<span class="text-ink-muted">Basic</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Hobby Projects -->
				<HobbyProjects />
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="border-edge border-t">
		<div class="not-prose mx-auto w-full max-w-6xl px-4 py-6 sm:px-8">
			<ContactCard />
		</div>
	</footer>
</div>

<JobFitDialog
	bind:open={dialogOpen}
	onsubmit={handleAnalyze}
	oncancel={handleCancel}
	bind:this={dialog}
/>
