<script lang="ts">
	import { theme } from '#lib/theme.svelte.ts';
	import { loadTurnstile } from '#lib/job-fit/turnstile.ts';

	let {
		sitekey,
		token = $bindable(''),
		failed = $bindable(false)
	}: {
		sitekey: string;
		/** The current Turnstile token; empty until the check passes, and again once it expires. */
		token?: string;
		/** True when the script or the check failed to load. */
		failed?: boolean;
	} = $props();

	// Renders the widget into its container, and again when the theme changes.
	// Removed with the container, so every visit to the input gets a fresh check.
	function widget(container: HTMLElement) {
		const dark = theme.dark;
		let id: string | undefined;
		let removed = false;
		token = '';

		loadTurnstile().then(
			() => {
				if (removed) return;
				failed = false;
				id = window.turnstile.render(container, {
					sitekey,
					theme: dark ? 'dark' : 'light',
					callback: (value) => {
						token = value;
						failed = false;
					},
					'expired-callback': () => {
						token = '';
						if (id) window.turnstile.reset(id);
					},
					'error-callback': () => {
						token = '';
						failed = true;
					}
				});
			},
			() => {
				if (!removed) failed = true;
			}
		);

		return () => {
			removed = true;
			if (id) window.turnstile.remove(id);
		};
	}
</script>

<div {@attach widget} class="min-h-[65px]"></div>
