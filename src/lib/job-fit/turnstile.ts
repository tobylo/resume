// Loads Cloudflare's Turnstile script once, on first use, with explicit rendering.

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let loading: Promise<void> | undefined;

export function loadTurnstile(): Promise<void> {
	if (window.turnstile) return Promise.resolve();
	loading ??= new Promise<void>((resolve, reject) => {
		const script = document.createElement('script');
		script.src = SCRIPT_URL;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => {
			// Let the next attempt try again (an ad blocker switched off, say).
			script.remove();
			loading = undefined;
			reject(new Error('Turnstile script failed to load'));
		};
		document.head.appendChild(script);
	});
	return loading;
}
