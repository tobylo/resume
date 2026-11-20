<script lang="ts">
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$app/env/public';
	import { MAX_CHARS, MIN_CHARS, type Failure } from '#lib/job-fit/analyze.ts';
	import Button from '#lib/components/Button.svelte';
	import Turnstile from './Turnstile.svelte';

	let {
		value = $bindable(''),
		failure,
		onsubmit
	}: {
		/** The job ad. Kept by the dialog, so it survives errors and closing. */
		value?: string;
		/** Why the server refused the last submit; cleared by the dialog once the ad is edited. */
		failure?: Extract<Failure, { kind: 'not-a-job-ad' | 'invalid' }>;
		onsubmit: (turnstileToken: string) => void;
	} = $props();

	let token = $state('');
	let turnstileFailed = $state(false);

	const format = (n: number) => n.toLocaleString('en-US');
	const count = $derived(value.length);
	const tooLong = $derived(count > MAX_CHARS);

	const error = $derived.by(() => {
		if (tooLong)
			return `That's over ${format(MAX_CHARS)} characters. Trim it to the role and requirements.`;
		if (failure?.kind === 'not-a-job-ad')
			return "This doesn't look like a job ad. Paste a listing with the role, requirements or qualifications.";
		return failure?.message;
	});

	const canSubmit = $derived(count >= MIN_CHARS && !error && token !== '');

	function submit(event: SubmitEvent) {
		event.preventDefault();
		if (canSubmit) onsubmit(token);
	}
</script>

<form class="flex flex-1 flex-col" onsubmit={submit}>
	<div class="flex flex-1 flex-col gap-3 p-5 lg:px-7 lg:py-6">
		<label for="job-ad" class="sr-only">Job ad</label>
		<textarea
			id="job-ad"
			bind:value
			data-autofocus
			aria-invalid={error ? true : undefined}
			aria-describedby="job-ad-hint job-ad-count"
			placeholder="Paste the full job ad here: the role, responsibilities and requirements."
			class="border-line-strong bg-canvas text-ink placeholder:text-ink-muted/70 aria-invalid:border-error min-h-40 flex-1 resize-none border-[1.5px] p-3.5 text-[16px]/6 focus-visible:outline-offset-2 lg:h-[220px] lg:flex-none lg:p-4"
		></textarea>
		<div class="flex justify-between gap-6">
			{#if error}
				<p id="job-ad-hint" class="text-error grow basis-0 text-sm/5">{error}</p>
			{:else}
				<p id="job-ad-hint" class="text-ink-muted font-mono text-[11px]/[14px] lg:text-[12px]/4">
					At least {MIN_CHARS} characters
				</p>
			{/if}
			<p
				id="job-ad-count"
				class={[
					'shrink-0 font-mono text-[11px]/[14px] lg:text-[12px]/4',
					tooLong ? 'text-error' : 'text-ink-muted'
				]}
			>
				{format(count)} / {format(MAX_CHARS)}
			</p>
		</div>
		{#if PUBLIC_TURNSTILE_SITE_KEY}
			<Turnstile sitekey={PUBLIC_TURNSTILE_SITE_KEY} bind:token bind:failed={turnstileFailed} />
			{#if turnstileFailed}
				<p class="text-error text-sm/5">
					The Cloudflare check couldn't run. An ad blocker or strict privacy settings can block it;
					allow it for this site and reopen the analyzer.
				</p>
			{/if}
		{:else}
			<p class="text-ink-muted text-sm/5">The Cloudflare check isn't set up on this build.</p>
		{/if}
	</div>

	<div
		class="border-line flex flex-col gap-2.5 border-t px-5 pt-3.5 pb-[34px] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-7 lg:py-5"
	>
		<Button type="submit" variant="accent" size="dialog" class="lg:shrink-0" disabled={!canSubmit}>
			Analyze fit →
		</Button>
		<p
			class="text-ink-muted lg:text-ink-body text-tag/[18px] text-center lg:order-first lg:text-left lg:text-[14px]/5"
		>
			I don't store job ads. Up to 5 reports per hour.
		</p>
	</div>
</form>
