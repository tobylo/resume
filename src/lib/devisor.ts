// Devisor's copy, shared by the homepage feature, the Devisor page and the hobby
// project entry the job fit analyzer reads. Change it here, once.

/** A run of text, or a phrase set in bold. */
export type Segment = string | { strong: string };

// The page header shows this sentence alone; the homepage and the analyzer get the full tagline.
const summary =
	'A development supervisor that works alongside you, from first spike to shipped feature.';
const status = 'In active development · private repo';

// Why I'm building it: one entry per paragraph.
const why: readonly (readonly Segment[])[] = [
	[
		"Coding agents have become remarkably good at writing code. What they're still bad at is everything around it: exploring an idea before committing to it, deciding what's worth building, sorting what comes in, and keeping a real codebase coherent over time."
	],
	[
		'Today that work happens in my head, in chat logs and in scattered notes. Devisor is my attempt to give it a home: a supervisor that structures the work around the agents, so a quick spike and a production feature can both move fast without the codebase paying for it later.'
	],
	[
		"It's also an honest experiment: ",
		{
			strong: 'how much of what I do as a senior consultant can a well-run agent factory take over?'
		},
		' Building it keeps me sharp in exactly the areas that question touches.'
	]
];

export const devisor = {
	name: 'Devisor',
	summary,
	tagline: `${summary} My testbed for how far agentic development can go in 2026.`,
	loop: 'Devisor assists through the whole loop: exploring ideas with spikes and PoCs, shaping the plan, triaging what comes in, and building in greenfield and brownfield codebases. Each step runs as a structured workflow on whichever agent harness you prefer.',
	observable: {
		lead: 'Observable end to end.',
		body: 'Every run is traced, so Devisor can learn from its own work and improve its workflows over time.'
	},
	traits: ['Go', 'Structured workflows', 'Any agent harness'],
	technologies: ['Go', 'Agentic workflows', 'OpenTelemetry'],
	status,

	// The write-up at /devisor.
	facts: [
		{ label: 'Written in', value: 'Go' },
		{ label: 'Runs on', value: 'Any agent harness' },
		{ label: 'Status', value: status }
	],
	why,
	stagesNote: 'Each step is a structured workflow',
	stages: [
		{
			name: 'Explore',
			body: 'Spikes and PoCs to test an idea quickly, with findings captured instead of thrown away.'
		},
		{
			name: 'Plan',
			body: "Shape what's worth building, at the level of detail the work actually needs."
		},
		{
			name: 'Triage',
			body: 'Sort incoming bugs, ideas and requests, and route each to the right workflow.'
		},
		{
			name: 'Build',
			body: 'Agents implement in greenfield and brownfield codebases, with Devisor supervising.'
		},
		{
			name: 'Observe',
			body: 'Every run is traced, so the workflows can learn from what worked and improve over time.'
		}
	],
	principles: [
		{
			title: 'Structured, not rigid',
			body: 'A throwaway spike and a production feature need different amounts of process. Workflows scale to the job instead of forcing one heavy path on everything.'
		},
		{
			title: 'Harness-agnostic',
			body: "Devisor supervises the agents; it doesn't replace them. Any agent harness can do the work, so you're not locked into one vendor."
		}
	],
	questionsIntro:
		'Devisor doubles as my testbed for these. No particular order, and no final answers yet.',
	questions: [
		{
			topic: 'Requirements',
			title: 'Can agents run the requirements workflow in practice?',
			body: "Taking a fuzzy ask to a plan that's worth building, with agents facilitating the conversation and real people answering it. The part of the job I'd most expect to need a human."
		},
		{
			topic: 'Memory',
			title: 'Does shared memory make agents better teammates?',
			body: "Evaluating Entire for memory that carries across agents, sessions and repos, so context isn't rebuilt from scratch every run."
		},
		{
			topic: 'Evals',
			title: 'Can the workflows improve themselves?',
			body: 'Every session is stored in full: prompts, text, tool calls and sub-agents. The bet is that this history makes good evals, and good evals make an automated self-improvement loop possible.'
		},
		{
			topic: 'Forge',
			title: 'Does the git forge need rethinking for agents?',
			body: 'Trying Entire Forge as a faster git forge for the agentic era, where many agents push and review far more often than people do.'
		},
		{
			topic: 'CI',
			title: 'Can CI keep pace with agents?',
			body: 'Using Dagger to make pipelines fast and reproducible enough that an agent can run them locally, on every change, before anything reaches review.'
		}
	],
	invite: {
		topic: 'Want to see it?',
		title: "The repo is private, but I'm happy to walk you through it.",
		body: "A live walkthrough beats a README while the core settles. Bring your own questions about agents in your team's workflow.",
		cta: 'Email me'
	}
} as const;
