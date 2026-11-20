// The sitemap robots.txt points to, prerendered with the rest of the site.

import { absoluteUrl } from '#lib/site.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

const pages = ['/', '/work', '/devisor', '/lab', '/cv', '/privacy'];

export const GET: RequestHandler = () => {
	const urls = pages.map((path) => `\t<url><loc>${absoluteUrl(path)}</loc></url>`).join('\n');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
