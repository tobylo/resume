<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant =
		| 'accent' // the one yellow call to action
		| 'primary' // filled ink in light, outlined in dark so yellow stays the only filled button
		| 'cta' // primary in light, accent in dark (closing sections, where no other yellow is on screen)
		| 'outline';
	type Size = 'md' | 'sm' | 'dialog';

	type Props = {
		variant?: Variant;
		size?: Size;
		block?: boolean;
		children: Snippet;
	} & (({ href: string } & HTMLAnchorAttributes) | ({ href?: undefined } & HTMLButtonAttributes));

	let {
		variant = 'outline',
		size = 'md',
		block = false,
		children,
		class: className = '',
		...rest
	}: Props = $props();

	const variants: Record<Variant, string> = {
		accent: 'bg-accent text-on-accent border-on-accent hover:brightness-95',
		primary:
			'bg-ink text-canvas border-ink hover:opacity-85 dark:bg-transparent dark:text-ink dark:border-line-strong dark:hover:bg-surface dark:hover:opacity-100',
		cta: 'bg-ink text-canvas border-ink hover:opacity-85 dark:bg-accent dark:text-on-accent dark:border-accent dark:hover:opacity-100 dark:hover:brightness-95',
		outline: 'bg-transparent text-ink border-line-strong hover:bg-surface'
	};

	const sizes: Record<Size, string> = {
		md: 'px-6 py-4 text-base/5 font-bold',
		sm: 'px-[18px] py-2.5 text-sm/[18px] font-semibold',
		// Dialog footers; the weight follows the variant (below).
		dialog: 'px-[22px] py-3.5 text-[16px]/5'
	};

	const classes = $derived(
		[
			'inline-flex items-center justify-center gap-2 border-[1.5px] transition-[background-color,opacity,filter] duration-150 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100',
			variants[variant],
			sizes[size],
			size === 'dialog' ? (variant === 'outline' ? 'font-semibold' : 'font-bold') : '',
			block ? 'w-full' : '',
			className
		].join(' ')
	);
</script>

{#if rest.href !== undefined}
	<a class={classes} {...rest as HTMLAnchorAttributes}>{@render children()}</a>
{:else}
	<button type="button" class={classes} {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
