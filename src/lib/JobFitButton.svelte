<script lang="ts">
	const { onclick }: { onclick: () => void } = $props();
</script>

<button
	type="button"
	class="print-hide fixed right-4 bottom-4 z-40 cursor-pointer rounded-full bg-slate-600 p-3 text-white shadow-lg transition-all duration-200 hover:bg-slate-500 hover:shadow-xl active:scale-95 sm:right-6 sm:bottom-6 sm:px-6 sm:py-3 sm:text-base"
	aria-label="Are we a match?"
	{onclick}
>
	<!-- Icon only on small screens -->
	<svg
		class="h-5 w-5 sm:hidden"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
		/>
	</svg>
	<!-- Full text on sm+ -->
	<span class="hidden text-sm font-medium sm:inline">Are we a match?</span>
</button>
