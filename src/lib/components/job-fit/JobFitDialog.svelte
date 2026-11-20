<script lang="ts">
	import { tick } from 'svelte';
	import { jobFit } from '#lib/job-fit/dialog.svelte.ts';
	import { analyze, type ErrorKind, type Failure, type Outcome } from '#lib/job-fit/analyze.ts';
	import type { FitAnalysis } from '#lib/job-fit/types.ts';
	import ErrorView from './ErrorView.svelte';
	import InputView from './InputView.svelte';
	import LoadingView from './LoadingView.svelte';
	import Report from './Report.svelte';

	type View =
		| { name: 'input'; failure?: Extract<Failure, { kind: 'not-a-job-ad' | 'invalid' }> }
		| { name: 'loading' }
		| { name: 'error'; kind: ErrorKind }
		| { name: 'report'; analysis: FitAnalysis };

	let dialog: HTMLDialogElement | undefined;
	let view = $state.raw<View>({ name: 'input' });
	// The job ad lives here, so it is still in the box after an error or a close.
	// It is never stored anywhere else.
	let jobAd = $state('');
	let request: AbortController | undefined;

	const isReport = $derived(view.name === 'report');

	function viewFor(outcome: Outcome): View {
		if (outcome.ok) return { name: 'report', analysis: outcome.analysis };
		if (outcome.kind === 'not-a-job-ad' || outcome.kind === 'invalid') {
			return { name: 'input', failure: outcome };
		}
		return { name: 'error', kind: outcome.kind };
	}

	// Each state names the element that should take focus when it appears; the one that
	// had it is usually gone.
	function focusView() {
		const target = dialog?.querySelector<HTMLElement>('[data-autofocus]');
		(target ?? dialog)?.focus();
	}

	async function show(next: View) {
		view = next;
		await tick();
		focusView();
	}

	function abort() {
		request?.abort();
		request = undefined;
	}

	async function submit(turnstileToken: string) {
		abort();
		const current = new AbortController();
		request = current;
		show({ name: 'loading' });
		try {
			const outcome = await analyze({ jobDescription: jobAd, turnstileToken }, current.signal);
			if (request !== current) return;
			request = undefined;
			show(viewFor(outcome));
		} catch {
			// Aborted: closed or cancelled, and whoever aborted has moved on.
		}
	}

	function cancel() {
		abort();
		show({ name: 'input' });
	}

	function another() {
		jobAd = '';
		show({ name: 'input' });
	}

	// Esc, the close button and every "Close" end up here, through the dialog's close event.
	function onclose() {
		abort();
		// A report survives an accidental close; anything else reopens on the input.
		if (view.name !== 'report') view = { name: 'input' };
		jobFit.close();
	}

	// Follows jobFit.open: every opener calls jobFit.show(), every close goes through jobFit.close().
	function modal(node: HTMLDialogElement) {
		dialog = node;
		if (jobFit.open && !node.open) {
			node.showModal();
			focusView();
		} else if (!jobFit.open && node.open) {
			node.close();
		}
	}
</script>

<!--
	One native modal for every "Analyze job fit" button: a centred dialog from lg up, a
	full-screen sheet below. showModal() traps focus and returns it to the opener on close.
-->
<dialog
	{@attach modal}
	{onclose}
	aria-labelledby="job-fit-title"
	class={[
		'bg-canvas text-ink backdrop:bg-on-accent/40 m-0 h-dvh max-h-none w-full max-w-none overscroll-contain outline-none',
		'lg:border-line-strong lg:m-auto lg:h-fit lg:max-h-[calc(100dvh-4rem)] lg:border-[1.5px]',
		isReport ? 'lg:w-[760px]' : 'lg:w-[600px]'
	]}
>
	{#if jobFit.open}
		<div class="flex min-h-full flex-col">
			<header
				class={[
					'border-line bg-canvas sticky top-0 z-10 flex items-start justify-between gap-4 border-b px-5 pt-4 pb-5 lg:gap-6 lg:py-6',
					isReport ? 'lg:px-8' : 'lg:px-7'
				]}
			>
				<div class="flex flex-col gap-1.5 lg:gap-2">
					<p class="label text-ink-muted text-[11px]/[14px] font-semibold lg:text-[12px]/4">
						{isReport ? 'Job fit report' : 'Job fit analyzer'}
					</p>
					<h2
						id="job-fit-title"
						class="text-[24px]/7 font-[weight:var(--display-weight)] tracking-[-0.025em] lg:text-[28px]/8"
					>
						{isReport ? 'Your fit report' : 'Is Tobias a fit for your role?'}
					</h2>
				</div>
				<button
					type="button"
					class="text-ink -m-2 mt-0 inline-flex size-10 shrink-0 items-center justify-center lg:-mt-2"
					aria-label="Close"
					onclick={() => jobFit.close()}
				>
					<svg
						class="size-6"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path d="M6 6l12 12M18 6L6 18" />
					</svg>
				</button>
			</header>

			{#if view.name === 'input'}
				<InputView
					bind:value={
						() => jobAd,
						(value) => {
							jobAd = value;
							// The server's verdict was about the old text.
							if (view.name === 'input' && view.failure) view = { name: 'input' };
						}
					}
					failure={view.failure}
					onsubmit={submit}
				/>
			{:else if view.name === 'loading'}
				<LoadingView oncancel={cancel} />
			{:else if view.name === 'error'}
				<ErrorView
					kind={view.kind}
					onclose={() => jobFit.close()}
					onretry={() => show({ name: 'input' })}
				/>
			{:else}
				<Report analysis={view.analysis} onanother={another} />
			{/if}
		</div>
	{/if}
</dialog>
