import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit({ preprocess: vitePreprocess(), adapter: adapter() })],
	// Fixed at build time so the prerendered HTML and the hydrated page agree,
	// whatever the visitor's clock says.
	define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) }
});
