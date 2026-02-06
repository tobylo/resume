<script lang="ts">
	import type { FitAnalysis, OverallFit } from '$lib/job-fit/types';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import { theme } from '$lib/theme.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const MAX_CHARS = 10000;
	const MIN_CHARS = 50;
	const WARN_THRESHOLD = 9500;

	interface Props {
		open: boolean;
		onsubmit: (data: { jobDescription: string; turnstileToken: string }) => void;
		oncancel?: () => void;
	}

	let { open = $bindable(false), onsubmit, oncancel }: Props = $props();

	type DialogState = 'input' | 'loading' | 'result' | 'error';

	let dialogState: DialogState = $state('input');
	let jobDescription: string = $state('');
	let analysis: FitAnalysis | null = $state(null);
	let errorMessage: string = $state('');
	let errorCode: string = $state('');
	let statusMessage: string = $state('');
	let turnstileReady = $state(false);

	let charCount = $derived(jobDescription.length);
	let isOverLimit = $derived(charCount > MAX_CHARS);
	let isNearLimit = $derived(charCount > WARN_THRESHOLD);
	let canSubmit = $derived(charCount >= MIN_CHARS && charCount <= MAX_CHARS && turnstileReady);

	const {
		elements: { overlay, content, title, close, portalled },
		states: { open: meltOpen }
	} = createDialog({
		forceVisible: true
	});

	$effect(() => {
		meltOpen.set(open);
	});

	$effect(() => {
		const isOpen = $meltOpen;
		if (isOpen !== open) {
			open = isOpen;
		}
	});

	$effect(() => {
		if (!open) {
			// Abort in-flight request if closing during loading
			if (dialogState === 'loading') {
				oncancel?.();
			}
			// Preserve result state so accidental close doesn't lose analysis
			if (dialogState !== 'result') {
				dialogState = 'input';
				jobDescription = '';
				analysis = null;
			}
			errorMessage = '';
			errorCode = '';
			statusMessage = '';
		}
	});

	let turnstileWidgetId: string | null = $state(null);

	$effect(() => {
		if (open && dialogState === 'input' && PUBLIC_TURNSTILE_SITE_KEY) {
			renderTurnstile();
		}
	});

	let turnstileScriptFailed = $state(false);

	function loadTurnstileScript(): Promise<void> {
		if (document.querySelector('script[src*="turnstile"]')) {
			return Promise.resolve();
		}
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
			script.async = true;
			script.onload = () => resolve();
			script.onerror = () => reject(new Error('Failed to load Turnstile script'));
			document.head.appendChild(script);
		});
	}

	async function renderTurnstile() {
		try {
			await loadTurnstileScript();
		} catch {
			turnstileScriptFailed = true;
			return;
		}
		turnstileScriptFailed = false;
		turnstileReady = false;
		await tick();
		const container = document.getElementById('turnstile-container');
		if (!container || !window.turnstile) return;
		if (turnstileWidgetId) {
			window.turnstile.remove(turnstileWidgetId);
		}
		container.innerHTML = '';
		turnstileWidgetId = window.turnstile.render(container, {
			sitekey: PUBLIC_TURNSTILE_SITE_KEY,
			theme: theme.dark ? 'dark' : 'light',
			callback: () => {
				turnstileReady = true;
			},
			'expired-callback': () => {
				turnstileReady = false;
				if (turnstileWidgetId && window.turnstile) {
					window.turnstile.reset(turnstileWidgetId);
				}
			},
			'error-callback': () => {
				turnstileScriptFailed = true;
				turnstileReady = false;
			}
		});
	}

	function cleanupTurnstile() {
		if (turnstileWidgetId && window.turnstile) {
			window.turnstile.remove(turnstileWidgetId);
			turnstileWidgetId = null;
		}
		turnstileReady = false;
	}

	function handleSubmit() {
		if (!canSubmit) return;
		statusMessage = 'Analyzing job fit...';
		dialogState = 'loading';
		let turnstileToken = '';
		if (turnstileWidgetId && window.turnstile) {
			turnstileToken = window.turnstile.getResponse(turnstileWidgetId) ?? '';
		}
		onsubmit({ jobDescription, turnstileToken });
	}

	function handleCancel() {
		oncancel?.();
		dialogState = 'input';
		statusMessage = '';
	}

	function resetToInput() {
		cleanupTurnstile();
		dialogState = 'input';
		analysis = null;
		errorMessage = '';
		errorCode = '';
		jobDescription = '';
		statusMessage = '';
	}

	function retrySubmit() {
		dialogState = 'input';
		errorMessage = '';
		errorCode = '';
		statusMessage = '';
	}

	export function setLoading() {
		statusMessage = 'Analyzing job fit...';
		dialogState = 'loading';
	}

	export function setResult(result: FitAnalysis) {
		analysis = result;
		dialogState = 'result';
		statusMessage = `Analysis complete: ${fitLabel(result.overallFit)}`;
	}

	export function setError(message: string, code: string) {
		errorMessage = message;
		errorCode = code;
		dialogState = 'error';
		statusMessage = 'An error occurred';
	}

	function fitBadgeClasses(fit: OverallFit): string {
		switch (fit) {
			case 'strong':
				return 'bg-green-600 text-white';
			case 'partial':
				return 'bg-yellow-500 text-black';
			case 'not-ideal':
				return 'bg-red-600 text-white';
		}
	}

	function fitBadgeIcon(fit: OverallFit): string {
		switch (fit) {
			case 'strong':
				return 'M5 13l4 4L19 7';
			case 'partial':
				return 'M5 12h14';
			case 'not-ideal':
				return 'M6 18L18 6M6 6l12 12';
		}
	}

	function fitLabel(fit: OverallFit): string {
		switch (fit) {
			case 'strong':
				return 'Strong Fit';
			case 'partial':
				return 'Partial Fit';
			case 'not-ideal':
				return 'Not Ideal';
		}
	}

	function contactHeading(fit: OverallFit): string {
		switch (fit) {
			case 'strong':
				return "Let's get in touch!";
			case 'partial':
				return "Interested? Let's talk";
			case 'not-ideal':
				return 'Want to connect?';
		}
	}
</script>

<div use:melt={$portalled} class="print-hide">
	{#if open}
		<div
			use:melt={$overlay}
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/50"
		></div>
		<div
			use:melt={$content}
			transition:fly={{ y: 8, duration: 200 }}
			class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
		>
			<div
				class="flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-lg bg-slate-300 shadow-xl sm:max-w-2xl dark:bg-slate-800"
			>
				<!-- Header -->
				<div
					class="flex items-center justify-between border-b border-slate-400 px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-600"
				>
					<h2 use:melt={$title} class="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
						Job Fit Analyzer
					</h2>
					<button
						use:melt={$close}
						class="rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-400/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
						aria-label="Close dialog"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<!-- Body -->
				<div class="flex-1 overflow-y-auto p-4 sm:p-6" aria-live="polite">
					<!-- Screen reader status announcement -->
					<div class="sr-only" role="status">{statusMessage}</div>

					{#if dialogState === 'input'}
						<div transition:fade={{ duration: 150 }}>
							{@render inputState()}
						</div>
					{:else if dialogState === 'loading'}
						<div transition:fade={{ duration: 150 }}>
							{@render loadingState()}
						</div>
					{:else if dialogState === 'result'}
						<div transition:fade={{ duration: 150 }}>
							{@render resultState()}
						</div>
					{:else if dialogState === 'error'}
						<div transition:fade={{ duration: 150 }}>
							{@render errorState()}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

{#snippet inputState()}
	<div class="flex flex-col gap-4">
		<p class="text-sm text-slate-700 dark:text-slate-300">
			Paste a job description below to analyze how well Tobias fits the role.
		</p>

		<div class="flex flex-col gap-1">
			<textarea
				bind:value={jobDescription}
				placeholder="Paste the job description here..."
				aria-label="Job description"
				rows={6}
				class="w-full resize-y rounded-md border border-slate-400 bg-white p-3 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
			></textarea>

			<div class="flex items-center justify-between text-xs">
				<span
					class={isOverLimit
						? 'font-semibold text-red-600 dark:text-red-400'
						: isNearLimit
							? 'font-semibold text-yellow-600 dark:text-yellow-400'
							: 'text-slate-500 dark:text-slate-400'}
				>
					{charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
					{#if isOverLimit}
						(over limit)
					{:else if isNearLimit}
						(approaching limit)
					{/if}
				</span>
				{#if charCount > 0 && charCount < MIN_CHARS}
					<span class="text-slate-500 dark:text-slate-400">
						{MIN_CHARS - charCount} more characters needed
					</span>
				{/if}
			</div>
		</div>

		<div id="turnstile-container" class="min-h-[65px]"></div>
		{#if turnstileScriptFailed}
			<p class="text-xs text-yellow-600 dark:text-yellow-400">
				CAPTCHA could not load. You may need to disable your ad blocker or try again later.
			</p>
		{/if}

		<button
			type="button"
			onclick={handleSubmit}
			disabled={!canSubmit}
			class="w-full rounded-md bg-slate-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:disabled:hover:bg-slate-600"
		>
			Analyze Job Fit
		</button>
	</div>
{/snippet}

{#snippet loadingState()}
	<div class="flex flex-col items-center justify-center gap-4 py-12">
		<div
			class="h-10 w-10 animate-spin rounded-full border-4 border-slate-400 border-t-slate-700 dark:border-slate-600 dark:border-t-slate-300"
		></div>
		<p class="text-sm font-medium text-slate-700 dark:text-slate-300">Analyzing job fit...</p>
		<button
			type="button"
			onclick={handleCancel}
			class="text-sm text-slate-500 underline transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
		>
			Cancel
		</button>
	</div>
{/snippet}

{#snippet resultState()}
	{#if analysis}
		<div class="flex flex-col gap-6">
			<!-- Overall Fit Badge & Summary -->
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-3">
					<span
						class="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-base font-semibold {fitBadgeClasses(
							analysis.overallFit
						)}"
					>
						<svg
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d={fitBadgeIcon(analysis.overallFit)}
							/>
						</svg>
						{fitLabel(analysis.overallFit)}
					</span>
				</div>
				<p class="text-sm text-slate-700 dark:text-slate-300">{analysis.overallSummary}</p>
			</div>

			<!-- Strengths -->
			{#if analysis.strengths.length > 0}
				<div class="flex flex-col gap-3">
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Strengths</h3>
					{#each analysis.strengths as strength (strength.title)}
						<div class="rounded-md bg-slate-600 p-3 text-white shadow-sm sm:p-4 dark:bg-slate-700">
							<h4 class="mb-1 text-sm font-semibold">{strength.title}</h4>
							<p class="mb-2 text-xs text-slate-200">{strength.description}</p>
							{#if strength.resumeReferences.length > 0}
								<div class="flex flex-wrap gap-1">
									{#each strength.resumeReferences as ref (ref)}
										<span class="rounded-sm bg-slate-500 px-2 py-0.5 text-xs">{ref}</span>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- Gaps -->
			{#if analysis.gaps.length > 0}
				<div class="flex flex-col gap-3">
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Gaps</h3>
					{#each analysis.gaps as gap (gap.title)}
						<div class="rounded-md bg-slate-600 p-3 text-white shadow-sm sm:p-4 dark:bg-slate-700">
							<h4 class="mb-1 text-sm font-semibold">{gap.title}</h4>
							<p class="text-xs text-slate-200">{gap.description}</p>
							{#if gap.mitigation}
								<p class="mt-2 text-xs text-green-300">
									<span class="font-semibold">Mitigation:</span>
									{gap.mitigation}
								</p>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- Get in Touch -->
			<div class="flex flex-col gap-3">
				<h3 class="text-lg font-bold text-slate-900 dark:text-white">
					{contactHeading(analysis.overallFit)}
				</h3>
				<div
					class="grid grid-cols-1 gap-2 rounded-md bg-slate-600 p-4 text-sm text-white shadow-sm min-[500px]:grid-cols-2 dark:bg-slate-700"
				>
					<!-- mailto uses +resume suffix for tracking -->
					<a
						href="mailto:tobias.lolax+resume@gmail.com"
						class="flex items-center gap-2 font-normal text-white no-underline transition-colors hover:text-blue-300"
					>
						<svg
							class="h-4 w-4 shrink-0"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
							/>
						</svg>
						<span class="truncate">tobias.lolax@gmail.com</span>
					</a>
					<a
						href="https://www.linkedin.com/in/tobiaslolax/"
						target="_blank"
						class="flex items-center gap-2 font-normal text-white no-underline transition-colors hover:text-blue-300"
					>
						<svg
							class="h-4 w-4 shrink-0"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
							/>
						</svg>
						<span>LinkedIn</span>
					</a>
				</div>
			</div>

			<button
				type="button"
				onclick={resetToInput}
				class="text-sm text-slate-500 underline transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
			>
				Analyze another job description
			</button>
		</div>
	{/if}
{/snippet}

{#snippet errorState()}
	<div class="flex flex-col items-center gap-4 py-8">
		<div class="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
			<svg
				class="h-8 w-8 text-red-600 dark:text-red-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
				/>
			</svg>
		</div>
		<div class="text-center">
			<p class="text-sm font-medium text-slate-900 dark:text-white">Something went wrong</p>
			<p class="mt-1 text-xs text-slate-600 dark:text-slate-400">{errorMessage}</p>
			{#if errorCode}
				<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Code: {errorCode}</p>
			{/if}
		</div>
		<button
			type="button"
			onclick={retrySubmit}
			class="rounded-md bg-slate-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-slate-600 dark:hover:bg-slate-500"
		>
			Try Again
		</button>
	</div>
{/snippet}
