import type { Handle } from '@sveltejs/kit/hooks';

// Inter and JetBrains Mono are only found once the stylesheet has loaded, which puts them
// last in the critical chain. Preload the Latin variable files every page uses, so they
// load alongside the CSS. The other subsets stay lazy: browsers fetch them only when a
// page needs those characters.
const LATIN_FONTS = /\/(inter|jetbrains-mono)-latin-wght-normal\.[\w-]+\.woff2$/;

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type, path }) =>
			type === 'js' || type === 'css' || (type === 'font' && LATIN_FONTS.test(path))
	});

	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self'; " +
			"script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; " +
			"style-src 'self' 'unsafe-inline'; " +
			'frame-src https://challenges.cloudflare.com; ' +
			"connect-src 'self' https://challenges.cloudflare.com; " +
			"img-src 'self' data:; " +
			"font-src 'self'; " +
			"base-uri 'self'; " +
			"form-action 'self'; " +
			"object-src 'none'"
	);

	return response;
};
