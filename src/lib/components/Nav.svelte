<script lang="ts">
	import { page } from '$app/state';
	import { navItems, contact } from '#lib/site.ts';
	import { jobFit } from '#lib/job-fit/dialog.svelte.ts';
	import Button from './Button.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let menu: HTMLDialogElement | undefined = $state();

	const isActive = (href: string) =>
		href.startsWith('/') &&
		(page.url.pathname === href || page.url.pathname.startsWith(`${href}/`));

	function openMenu() {
		menu?.showModal();
	}

	function closeMenu() {
		menu?.close();
	}

	function openJobFit() {
		closeMenu();
		jobFit.show();
	}

	// The menu is hidden from the desktop breakpoint up; close it there so a modal
	// that can no longer be seen never leaves the page inert (a tablet rotating, say).
	$effect(() => {
		const desktop = window.matchMedia('(width >= 64rem)');
		const onChange = (event: MediaQueryListEvent) => {
			if (event.matches) closeMenu();
		};
		desktop.addEventListener('change', onChange);
		return () => desktop.removeEventListener('change', onChange);
	});
</script>

<header class="border-line border-b">
	<nav class="page flex items-center justify-between py-3.5 lg:py-8" aria-label="Main">
		<a href="/" class="text-ink font-mono text-[15px]/[18px] font-semibold tracking-[0.02em]">
			tobylo.dev
		</a>

		<!-- Desktop -->
		<div class="hidden items-center gap-10 lg:flex">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class="text-ink-muted hover:text-ink aria-[current=page]:text-ink text-[15px]/[18px] font-medium transition-colors aria-[current=page]:underline aria-[current=page]:decoration-[1.5px] aria-[current=page]:underline-offset-4"
				>
					{item.label}
				</a>
			{/each}
			<div class="flex items-center gap-3">
				<ThemeToggle />
				<Button variant="primary" size="sm" onclick={() => jobFit.show()}>Analyze job fit</Button>
			</div>
		</div>

		<!-- Mobile -->
		<div class="flex items-center gap-2 lg:hidden">
			<Button variant="primary" size="sm" class="px-3.5" onclick={() => jobFit.show()}>
				Job fit
			</Button>
			<button
				type="button"
				onclick={openMenu}
				class="text-ink inline-flex size-10 items-center justify-center"
				aria-label="Open menu"
				aria-haspopup="dialog"
			>
				<svg
					class="size-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M4 7h16M4 12h16M4 17h16" />
				</svg>
			</button>
		</div>
	</nav>
</header>

<dialog
	bind:this={menu}
	class="bg-canvas text-ink m-0 h-dvh max-h-none w-full max-w-none backdrop:bg-transparent lg:hidden"
	aria-label="Menu"
>
	<div class="flex min-h-full flex-col">
		<div class="page border-line flex items-center justify-between border-b py-3.5">
			<a
				href="/"
				onclick={closeMenu}
				class="font-mono text-[15px]/[18px] font-semibold tracking-[0.02em]"
			>
				tobylo.dev
			</a>
			<button
				type="button"
				onclick={closeMenu}
				class="inline-flex size-10 items-center justify-center"
				aria-label="Close menu"
			>
				<svg
					class="size-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		</div>

		<ul class="page pt-3">
			{#each navItems as item (item.href)}
				<li class="border-line border-b">
					<a
						href={item.href}
						onclick={closeMenu}
						aria-current={isActive(item.href) ? 'page' : undefined}
						class="flex items-baseline justify-between py-4"
					>
						<span class="font-display text-[34px]/[38px]">{item.label}</span>
						<span class="text-ink-muted font-mono text-xs tracking-[0.06em] uppercase">
							{item.hint}
						</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="page flex flex-col gap-2.5 pt-8">
			<Button variant="accent" block onclick={openJobFit}>
				Is Tobias a fit? Paste the job ad →
			</Button>
			<Button variant="outline" block href="/cv" onclick={closeMenu}>Download CV</Button>
		</div>

		<div class="page mt-auto flex items-center justify-between pt-6 pb-10">
			<div class="flex gap-6 text-[15px]/[18px] font-semibold underline underline-offset-4">
				<a href={contact.linkedIn} rel="me noopener" target="_blank">LinkedIn ↗</a>
				<a href={contact.gitHub} rel="me noopener" target="_blank">GitHub ↗</a>
			</div>
			<ThemeToggle />
		</div>
	</div>
</dialog>
