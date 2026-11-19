# tobylo.dev

Source for [tobylo.dev](https://tobylo.dev): Tobias Lolax's resume site, with a full engagement timeline, a hobby lab, a printable CV and a job-fit analyzer that compares a pasted job ad against the real project history.

Built with SvelteKit, Svelte 5, Tailwind CSS 4 and Bun, deployed on Cloudflare Workers.

```bash
bun install
bun run dev
```

The job-fit analyzer needs Cloudflare bindings and secrets locally: copy `.dev.vars.example` to `.dev.vars` and fill it in.

Working rules for contributors and agents are in [AGENTS.md](AGENTS.md).
