// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte';

declare global {
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
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
