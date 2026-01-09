import { browser } from '$app/environment';

function createTheme() {
	let darkMode = $state(false);

	if (browser) {
		// Check localStorage first, then system preference
		const stored = localStorage.getItem('theme');
		if (stored) {
			darkMode = stored === 'dark';
		} else {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
	}

	return {
		get dark() {
			return darkMode;
		},
		toggle() {
			darkMode = !darkMode;
			if (browser) {
				localStorage.setItem('theme', darkMode ? 'dark' : 'light');
				document.documentElement.classList.toggle('dark', darkMode);
			}
		},
		init() {
			if (browser) {
				document.documentElement.classList.toggle('dark', darkMode);
			}
		}
	};
}

export const theme = createTheme();
