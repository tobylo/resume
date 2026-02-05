<script lang="ts">
	const { onclick }: { onclick: () => void } = $props();
</script>

<button
	type="button"
	class="print-hide fixed right-4 bottom-4 z-40 cursor-pointer rounded-full bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-slate-500 hover:shadow-xl active:scale-95 sm:right-6 sm:bottom-6 sm:px-6 sm:py-3 sm:text-base"
	{onclick}
>
	Is Tobias a good fit?
</button>
