// Contact details and navigation shared by every page.

export const contact = {
	// The +resume suffix shows which emails came from the site.
	email: 'mailto:tobias.lolax+resume@gmail.com',
	linkedIn: 'https://www.linkedin.com/in/tobiaslolax/',
	gitHub: 'https://github.com/tobylo'
} as const;

export const languages =
	'Stockholm, Sweden · Swedish (native) · English (fluent) · Finnish (basic)';

export interface NavItem {
	label: string;
	href: string;
	/** Short mono label shown next to the item in the mobile menu. */
	hint: string;
}

export const navItems: NavItem[] = [
	{ label: 'Work', href: '/work', hint: '22 engagements' },
	{ label: 'Now building', href: '/devisor', hint: 'Devisor' },
	{ label: 'Contact', href: '#contact', hint: 'Email · LinkedIn' },
	{ label: 'Hobby lab', href: '/lab', hint: 'Side projects' }
];
