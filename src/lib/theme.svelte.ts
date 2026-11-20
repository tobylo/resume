import { browser } from '$app/env';

type Choice = 'light' | 'dark' | null;

const STORAGE_KEY = 'theme';

function readChoice(): Choice {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored === 'light' || stored === 'dark' ? stored : null;
	} catch {
		return null;
	}
}

// Browser chrome (theme-color in app.html): a choice turns its scheme's tag on for all media and
// the other off; without one, each tag goes back to matching its own system scheme.
function applyThemeColor(choice: Choice) {
	for (const meta of document.querySelectorAll<HTMLMetaElement>(
		'meta[name="theme-color"][data-scheme]'
	)) {
		const scheme = meta.dataset.scheme;
		if (choice) meta.media = scheme === choice ? 'all' : 'not all';
		else meta.media = `(prefers-color-scheme: ${scheme})`;
	}
}

// Mirrors the inline script in app.html: an explicit choice wins, otherwise the system decides.
function createTheme() {
	let choice = $state<Choice>(browser ? readChoice() : null);
	let systemDark = $state(browser && window.matchMedia('(prefers-color-scheme: dark)').matches);
	const dark = $derived(choice ? choice === 'dark' : systemDark);

	// The page always shows what the store resolved, so the toggle never "does nothing".
	const apply = () => {
		document.documentElement.classList.toggle('dark', dark);
		applyThemeColor(choice);
	};

	if (browser) {
		apply();
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			systemDark = event.matches;
			apply();
		});
	}

	return {
		get dark() {
			return dark;
		},
		toggle() {
			choice = dark ? 'light' : 'dark';
			try {
				localStorage.setItem(STORAGE_KEY, choice);
			} catch {
				/* the choice still applies for this visit */
			}
			apply();
		}
	};
}

export const theme = createTheme();
