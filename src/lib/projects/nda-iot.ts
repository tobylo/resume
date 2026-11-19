import type { Project } from './types';

export const ndaIot: Project = {
	id: 'nda-iot',
	company: 'IoT platform (under NDA)',
	role: 'System Developer & Tech Lead',
	description:
		'Tech lead on a scalable IoT solution for thousands of devices, controlled from a custom React Native app, with a web admin showing a real-time map of the active fleet.',
	outcome: 'Led the work from architecture to rollout, designed to scale from day one.',
	featured: true,
	technologies: [
		'C#',
		'TypeScript',
		'Azure Functions',
		'Event Hubs',
		'IoT Hub',
		'CosmosDB',
		'Table Storage',
		'React Native',
		'AppCenter',
		'HockeyApp',
		'MQTT',
		'ASP.NET Core',
		'SignalR'
	],
	period: {
		start: '2016',
		end: '2018'
	}
};
