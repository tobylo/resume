// Bindings and secrets the worker reads from `cloudflare:workers` (see wrangler.toml and .dev.vars.example).
declare module 'cloudflare:workers' {
	export const env: {
		KV: import('@cloudflare/workers-types').KVNamespace;
		ANTHROPIC_API_KEY: string;
		TURNSTILE_SECRET_KEY: string;
	};
}
