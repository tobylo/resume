// Devisor's copy, shared by the homepage feature, the Devisor page and the hobby
// project entry the job fit analyzer reads. Change it here, once.

export const devisor = {
	name: 'Devisor',
	tagline:
		'A development supervisor that works alongside you, from first spike to shipped feature. My testbed for how far agentic development can go in 2026.',
	loop: 'Devisor assists through the whole loop: exploring ideas with spikes and PoCs, shaping the plan, triaging what comes in, and building in greenfield and brownfield codebases. Each step runs as a structured workflow on whichever agent harness you prefer.',
	observable: {
		lead: 'Observable end to end.',
		body: 'Every run is traced, so Devisor can learn from its own work and improve its workflows over time.'
	},
	traits: ['Go', 'Structured workflows', 'Any agent harness'],
	technologies: ['Go', 'Agentic workflows', 'OpenTelemetry'],
	status: 'In active development · private repo'
} as const;
