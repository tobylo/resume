<script lang="ts">
	let { maxHeight }: { maxHeight?: number } = $props();

	const description = `Tobias Lolax • Professional tinkerer for the past ${new Date().getFullYear() - 2009} years • `;

	function calculateRotation(text: string, index: number) {
		return ((1 / text.length) * index * 360).toFixed(0);
	}
</script>

<div class="relative max-h-96 overflow-hidden">
	<div
		class="absolute h-full w-full animate-[spin-backwards_50s_linear_infinite] rounded-full text-sm md:text-xl"
	>
		{#each description as char, index}
			<div
				class="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 transform text-center uppercase"
				style="--tw-rotate: {calculateRotation(description, index)}deg"
			>
				{char}
			</div>
		{/each}
	</div>
	<img
		class="m-0 h-full w-full object-scale-down p-0 drop-shadow-xl"
		src="/mugshot.webp"
		alt="Hunkadory"
	/>
</div>

<style>
	img {
		object-fit: contain;
	}
</style>
