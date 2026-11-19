import { browser } from '$app/environment';

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

// Mirrors the inline script in app.html: an explicit choice wins, otherwise the system decides.
function createTheme() {
	let choice = $state<Choice>(browser ? readChoice() : null);
	let systemDark = $state(browser && window.matchMedia('(prefers-color-scheme: dark)').matches);
	const dark = $derived(choice ? choice === 'dark' : systemDark);

	// The page always shows what the store resolved, so the toggle never "does nothing".
	const apply = () => document.documentElement.classList.toggle('dark', dark);

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
