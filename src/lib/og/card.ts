// The link preview card (Paper: "Link preview (OG image 1200×630)"), as the plain
// element tree satori takes. Runs only at build time, from src/routes/og.png.

import { ogImage, person } from '#lib/site.ts';
import { leadYears } from '#lib/home.ts';
import { projects, yearsInProduction } from '#lib/projects/index.ts';

export const OG_WIDTH = ogImage.width;
export const OG_HEIGHT = ogImage.height;

// Light theme values from src/app.css. Link previews have no theme.
const color = {
	canvas: '#ffffff',
	ink: '#0e0e0e',
	inkStrong: '#000000',
	inkBody: '#3a3a3a',
	subtitle: '#1a1a1a',
	accent: '#ffd000'
} as const;

/** The three mono stats along the bottom; counts come from the data so a rebuild keeps them current. */
export const ogStats = [
	`${yearsInProduction} yrs in production`,
	`${projects.length} engagements`,
	`${leadYears} lead`
];

export interface OgNode {
	type: string;
	props: {
		style?: Record<string, string | number>;
		children?: OgChild | OgChild[];
		[key: string]: unknown;
	};
}
type OgChild = OgNode | string;

const el = (
	type: string,
	style: Record<string, string | number>,
	children?: OgChild | OgChild[],
	attrs: Record<string, unknown> = {}
): OgNode => ({ type, props: { ...attrs, style, children } });

const mono = { fontFamily: 'JetBrains Mono', fontWeight: 600 } as const;
const sans = { fontFamily: 'Inter' } as const;

function header(avatar: string): OgNode {
	return el('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
		el(
			'img',
			{ width: 64, height: 64, boxSizing: 'border-box', border: `2px solid ${color.ink}` },
			undefined,
			{ src: avatar, width: 64, height: 64 }
		),
		el(
			'div',
			{ ...mono, fontSize: 22, letterSpacing: 0.44, lineHeight: '28px', color: color.inkStrong },
			'tobylo.dev'
		)
	]);
}

function identity(): OgNode {
	return el('div', { display: 'flex', flexDirection: 'column', gap: 18 }, [
		el(
			'div',
			{
				...sans,
				fontSize: 128,
				fontWeight: 800,
				letterSpacing: -5.12,
				lineHeight: '120px',
				color: color.inkStrong
			},
			person.name
		),
		el(
			'div',
			{
				...sans,
				fontSize: 34,
				fontWeight: 600,
				letterSpacing: -0.34,
				lineHeight: '40px',
				color: color.subtitle
			},
			`${person.title} · ${person.location}`
		)
	]);
}

function statRow(): OgNode {
	return el(
		'div',
		{ display: 'flex', gap: 36 },
		ogStats.map((text) =>
			el(
				'div',
				{
					...mono,
					fontSize: 20,
					letterSpacing: 1.2,
					lineHeight: '24px',
					textTransform: 'uppercase',
					color: color.inkBody
				},
				text
			)
		)
	);
}

/** The whole card. `avatar` is a data URI of the 64px avatar. */
export function ogCard(avatar: string): OgNode {
	return el(
		'div',
		{
			display: 'flex',
			width: OG_WIDTH,
			height: OG_HEIGHT,
			backgroundColor: color.canvas
		},
		[
			el(
				'div',
				{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					flexGrow: 1,
					padding: '64px 72px'
				},
				[header(avatar), identity(), statRow()]
			),
			el('div', {
				width: 40,
				flexShrink: 0,
				boxSizing: 'border-box',
				backgroundColor: color.accent,
				borderLeft: `2px solid ${color.ink}`
			})
		]
	);
}
