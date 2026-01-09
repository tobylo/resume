import type { Project } from './types';

export const openSystemGroup: Project = {
	id: 'open-system-group',
	company: 'Open System Group AB',
	role: 'System Developer',
	description:
		'Lead developer of a modular Silverlight web application for monitoring and analysis of property consumption data. The application collects consumption values and meter readings from building automation systems and presents them in an easily understandable way. Features include media supplier management for cost calculations, weather normalization, forecasts and budgets, alarm thresholds, and integration with third-party SMS/email services. Also developed a modular data collection engine, a driver for reading BatScan UPS status via self-hosted OPC server, and web applications for alarm search and HVAC reports.',
	technologies: [
		'C#',
		'Silverlight',
		'SQL',
		'WCF',
		'Composite Application Library',
		'T-SQL',
		'SVN',
		'Telerik Controls',
		'Advosol OPC DA',
		'ASP.NET MVC',
		'Entity Framework',
		'AutoFac',
		'AutoMapper',
		'KendoUI',
		'Telerik Reporting',
		'jQuery',
		'Compact SQL'
	],
	period: {
		start: '2009',
		end: '2013'
	}
};
