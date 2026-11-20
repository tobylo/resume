import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_TURNSTILE_SITE_KEY: {
		description:
			'Cloudflare Turnstile site key for the job fit dialog. Public; set in wrangler.toml [vars] and [previews.vars], or in .dev.vars locally.',
		public: true,
		// Pages are prerendered, so the key is inlined at build time.
		static: true,
		// Optional: without a key the check never renders and submit stays disabled,
		// but the site still builds.
		schema: (value) => value ?? ''
	}
});
