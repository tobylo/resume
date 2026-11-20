// The link preview image, rendered once at build time so its stats follow the data
// (the New Year rebuild moves "yrs in production"). Prerendered, so satori and resvg
// run only in Node during the build and never in the Worker.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { OG_HEIGHT, OG_WIDTH, ogCard } from '#lib/og/card.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

// Loaded by name at prerender time instead of imported. The Cloudflare adapter bundles
// every server import into the Worker build, and resvg is a native Node addon that
// can't be bundled; this way neither library is bundled into the Worker either.
const load = <T>(id: string): Promise<T> => import(/* @vite-ignore */ id);

// Paths from the project root: the build runs there, and the bundled route doesn't
// live next to its source. Satori needs static woff/ttf files, not woff2 or variable fonts.
const fromRoot = (...parts: string[]) => readFile(join(process.cwd(), ...parts));
const fontsource = (pkg: string, file: string) =>
	fromRoot('node_modules', '@fontsource', pkg, 'files', file);

export const GET: RequestHandler = async () => {
	const [{ default: satori }, { Resvg }] = await Promise.all([
		load<typeof import('satori')>('satori'),
		load<typeof import('@resvg/resvg-js')>('@resvg/resvg-js')
	]);
	const [inter600, inter800, mono600, avatar] = await Promise.all([
		fontsource('inter', 'inter-latin-600-normal.woff'),
		fontsource('inter', 'inter-latin-800-normal.woff'),
		fontsource('jetbrains-mono', 'jetbrains-mono-latin-600-normal.woff'),
		fromRoot('src', 'lib', 'og', 'avatar.png')
	]);

	const svg = await satori(ogCard(`data:image/png;base64,${avatar.toString('base64')}`), {
		width: OG_WIDTH,
		height: OG_HEIGHT,
		fonts: [
			{ name: 'Inter', data: inter600, weight: 600, style: 'normal' },
			{ name: 'Inter', data: inter800, weight: 800, style: 'normal' },
			{ name: 'JetBrains Mono', data: mono600, weight: 600, style: 'normal' }
		]
	});
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();

	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
