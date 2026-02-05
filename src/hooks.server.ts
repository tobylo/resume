import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self'; " +
			"script-src 'self' https://challenges.cloudflare.com; " +
			"style-src 'self' 'unsafe-inline'; " +
			'frame-src https://challenges.cloudflare.com; ' +
			"connect-src 'self' https://challenges.cloudflare.com; " +
			"img-src 'self' data:; " +
			"font-src 'self'"
	);

	return response;
};
