<script lang="ts">
	import { contact } from '#lib/site.ts';
	import Button from '#lib/components/Button.svelte';
	import type { ErrorKind } from '#lib/job-fit/analyze.ts';
	import DialogFooter from './DialogFooter.svelte';

	let {
		kind,
		onclose,
		onretry
	}: {
		kind: ErrorKind;
		onclose: () => void;
		/** Back to the input, with the job ad still in the box. */
		onretry: () => void;
	} = $props();

	const copy: Record<ErrorKind, { label: string; title: string; body: string }> = {
		'rate-limited': {
			label: 'Limit reached',
			title: "That's 5 reports this hour.",
			body: 'The analyzer is rate-limited to keep it fair and affordable. Try again in an hour, or skip the robot and email me directly.'
		},
		verification: {
			label: 'Verification failed',
			title: "Couldn't confirm you're human.",
			body: "The Cloudflare check didn't go through. Strict privacy settings or a VPN can cause this. Refresh the check and try again."
		},
		failed: {
			label: 'Something went wrong',
			title: "The analysis didn't finish.",
			body: "That's on my side, not yours. Your job ad is still in the box, so you can try again right away, or email it to me instead."
		}
	};

	const text = $derived(copy[kind]);
</script>

<div class="flex flex-col gap-3.5 px-5 pt-8 pb-9 lg:px-7">
	<p class="label text-ink text-[12px]/4 font-semibold">{text.label}</p>
	<h3 class="text-[22px]/7 font-bold tracking-[-0.015em] outline-none" tabindex="-1" data-autofocus>
		{text.title}
	</h3>
	<p class="text-ink-body text-[16px]/[25px]">{text.body}</p>
</div>

<DialogFooter>
	{#if kind === 'failed'}
		<Button size="dialog" class="flex-1 lg:flex-none" href={contact.email}>Email me</Button>
	{:else}
		<Button size="dialog" class="flex-1 lg:flex-none" onclick={onclose}>Close</Button>
	{/if}
	{#if kind === 'rate-limited'}
		<Button variant="primary" size="dialog" class="flex-1 lg:flex-none" href={contact.email}>
			Email me
		</Button>
	{:else}
		<Button variant="primary" size="dialog" class="flex-1 lg:flex-none" onclick={onretry}>
			Try again
		</Button>
	{/if}
</DialogFooter>
