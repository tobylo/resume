<script lang="ts">
	const description = `• Tobias Lolax • Professional tinkerer for the past ${new Date().getFullYear() - 2009} years\u00A0`;

	const radius = 85;
	const size = 200;
	const center = size / 2;
	const diameter = radius * 2;
	const circumference = Math.round(2 * Math.PI * radius);
	const circlePath = `M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${diameter},0 a ${radius},${radius} 0 1,1 -${diameter},0`;
</script>

<div class="relative flex max-h-96 items-center justify-center overflow-hidden">
	<svg
		class="absolute h-full w-full animate-[spin-backwards_50s_linear_infinite]"
		viewBox="0 0 {size} {size}"
	>
		<defs>
			<path id="circlePath" d={circlePath} fill="none" />
		</defs>
		<text class="fill-current text-sm uppercase dark:fill-slate-300">
			<textPath href="#circlePath" textLength={circumference} lengthAdjust="spacing"
				>{description}</textPath
			>
		</text>
	</svg>
	<img
		class="m-0 h-full w-full object-scale-down p-0 drop-shadow-xl"
		src="/mugshot.webp"
		alt="Hunkadory"
	/>
</div>
