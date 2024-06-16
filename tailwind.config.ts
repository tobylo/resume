import type { Config } from 'tailwindcss';
import { transform } from 'typescript';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			keyframes: {
				'spin-backwards': {
					from: {
						transform: 'rotate(360deg)'
					},
					to: {
						transform: 'rotate(0deg)'
					}
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
