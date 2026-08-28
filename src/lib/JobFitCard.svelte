<script lang="ts">
	let { onanalyze }: { onanalyze: () => void } = $props();

	const years = new Date().getFullYear() - 2009;
</script>

<div
	class="print-hide border-accent/20 bg-accent-tint flex flex-col items-start gap-3 rounded-2xl border p-6"
>
	<h2 class="font-display text-accent text-lg font-bold">Hiring? Check the fit.</h2>
	<p class="text-ink-soft text-sm leading-relaxed">
		Paste your job description and get an honest, AI-generated report on how my {years} years of work
		match your role.
	</p>
	<button
		type="button"
		class="bg-accent text-accent-contrast hover:bg-accent/90 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors"
		onclick={onanalyze}
	>
		Analyze job fit
	</button>
</div>
