// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte';

interface TurnstileRenderOptions {
	sitekey: string;
	theme?: 'light' | 'dark' | 'auto';
	callback?: (token: string) => void;
	'expired-callback'?: () => void;
	'error-callback'?: () => void;
	execution?: 'render' | 'execute';
	action?: string;
}

interface TurnstileWidget {
	render(container: string | HTMLElement, options: TurnstileRenderOptions): string;
	getResponse(widgetId: string): string | undefined;
	remove(widgetId: string): void;
	reset(widgetId: string): void;
}

declare global {
	interface Window {
		turnstile: TurnstileWidget;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				KV: KVNamespace;
				ANTHROPIC_API_KEY: string;
				TURNSTILE_SECRET_KEY: string;
			};
			cf?: IncomingRequestCfProperties;
			ctx: ExecutionContext;
			caches: CacheStorage;
		}
	}
}

export {};
