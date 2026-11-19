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

	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			systemDark = event.matches;
			document.documentElement.classList.toggle('dark', choice ? choice === 'dark' : systemDark);
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
			document.documentElement.classList.toggle('dark', choice === 'dark');
		}
	};
}

export const theme = createTheme();
