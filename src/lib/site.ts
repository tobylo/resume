// Contact details and navigation shared by every page.

import { projects } from '#lib/projects/index.ts';

export const contact = {
	// The +resume suffix shows which emails came from the site.
	email: 'mailto:tobias.lolax+resume@gmail.com',
	// The CV is read on paper and copied by hand, so it shows the plain address.
	cvEmail: 'tobias.lolax@gmail.com',
	linkedIn: 'https://www.linkedin.com/in/tobiaslolax/',
	gitHub: 'https://github.com/tobylo'
} as const;

export const person = {
	name: 'Tobias Lolax',
	title: 'Senior engineer & tech lead',
	location: 'Stockholm',
	country: 'Sweden'
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
	{ label: 'Work', href: '/work', hint: `${projects.length} engagements` },
	{ label: 'Now building', href: '/devisor', hint: 'Devisor' },
	{ label: 'Contact', href: '#contact', hint: 'Email · LinkedIn' },
	{ label: 'Hobby lab', href: '/lab', hint: 'Side projects' }
];
