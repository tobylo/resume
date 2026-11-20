<script lang="ts">
	import Meta from '#lib/components/Meta.svelte';
	import Closing from '#lib/components/Closing.svelte';
	import { contact, person } from '#lib/site.ts';

	// Shown as text as well as linked, so the address can be copied.
	const email = contact.email.replace('mailto:', '');
</script>

<Meta
	title="Privacy · Tobias Lolax"
	description="What happens to your data on tobylo.dev: hosting, cookieless visitor statistics, the job-fit analyzer, and your rights."
	path="/privacy"
/>

<section class="page pt-10 pb-10 lg:pt-24 lg:pb-18" aria-labelledby="privacy">
	<nav aria-label="Breadcrumb" class="label text-ink text-tag font-semibold">
		<a href="/" class="underline-offset-4 hover:underline">
			<span aria-hidden="true">←&nbsp;</span>tobylo.dev
		</a>
		<span aria-hidden="true">&nbsp;/&nbsp;</span>
		<span aria-current="page">Privacy</span>
	</nav>

	<h1 id="privacy" class="font-display text-mobile-display lg:text-display mt-6 lg:mt-7">
		Privacy
	</h1>

	<p class="text-ink-body lg:text-lead mt-5 max-w-[680px] text-[17px]/[26px] lg:mt-7">
		No cookies, no ads, no tracking across sites. This page says what does happen to your data on
		tobylo.dev, and who else sees it.
	</p>
</section>

<div
	class="page text-ink-body [&_a]:text-ink [&_h2]:text-ink [&_h2]:tracking-title lg:[&_h2]:text-title flex flex-col gap-10 pt-2 pb-14 text-base lg:gap-14 lg:pt-6 lg:pb-18 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-[22px]/[28px] [&_h2]:font-bold [&_li]:mt-2 [&_p]:mt-3.5 [&_section]:max-w-[680px] [&_ul]:mt-3.5 [&_ul]:list-disc [&_ul]:pl-5"
>
	<section aria-labelledby="responsible">
		<h2 id="responsible">Who's responsible</h2>
		<p>
			{person.name}, {person.location}, {person.country}. For questions or requests about your data,
			email <a href={contact.email}>{email}</a>.
		</p>
	</section>

	<section aria-labelledby="hosting">
		<h2 id="hosting">Hosting</h2>
		<p>
			Cloudflare hosts the site. To deliver each page and keep the site safe from abuse, it
			processes your IP address and the details of the request, such as the page, your browser and
			the time. Cloudflare can process this data outside the EU; the transfer is covered by the
			EU–US Data Privacy Framework and standard contractual clauses.
		</p>
		<p>
			The legal basis is my legitimate interest in running a secure website (GDPR Art. 6(1)(f)).
		</p>
	</section>

	<section aria-labelledby="statistics">
		<h2 id="statistics">Visitor statistics</h2>
		<p>
			Cloudflare Web Analytics counts visits: which pages are read, where visitors come from and how
			fast pages load. It sets no cookies, stores nothing in your browser, builds no profiles and
			doesn't follow you to other sites. The legal basis is my legitimate interest in knowing
			whether the site is read (GDPR Art. 6(1)(f)).
		</p>
	</section>

	<section aria-labelledby="analyzer">
		<h2 id="analyzer">The job-fit analyzer</h2>
		<p>
			When you open the analyzer, Cloudflare Turnstile checks that you're a person, even if you
			close it again without pasting anything. It processes your IP address and signals from your
			browser for that check.
		</p>
		<p>When you run an analysis:</p>
		<ul>
			<li>
				The ad is sent to Anthropic's API, which writes the analysis. Anthropic doesn't use it to
				train its models; see <a href="https://www.anthropic.com/legal/privacy" rel="noopener">
					Anthropic's privacy policy
				</a>. The analysis doesn't need names or contact details, so please leave them out.
			</li>
			<li>I don't store job ads. They aren't saved or logged on this site.</li>
			<li>
				To allow 5 analyses an hour, your IP address is kept with a counter for up to two hours,
				then deleted automatically.
			</li>
		</ul>
		<p>
			The legal basis is my legitimate interest in offering the analysis you asked for and
			protecting it from abuse (GDPR Art. 6(1)(f)).
		</p>
	</section>

	<section aria-labelledby="browser">
		<h2 id="browser">In your browser</h2>
		<p>
			If you switch between light and dark, your choice is saved in your browser's local storage so
			the site remembers it. It never leaves your device. Fonts are served from this site, not from
			a third party.
		</p>
	</section>

	<section aria-labelledby="email">
		<h2 id="email">Email</h2>
		<p>If you email me, I use your message to reply and keep it in my inbox, which Google hosts.</p>
	</section>

	<section aria-labelledby="rights">
		<h2 id="rights">Your rights</h2>
		<p>
			You can ask to see, correct or delete your data, to restrict how it's used, or object to it.
			Email me. You can also complain to
			<a href="https://www.imy.se/" rel="noopener">IMY</a>, the Swedish data protection authority.
		</p>
		<p class="label text-ink-muted text-tag mt-8!">Last updated 20 November 2026</p>
	</section>
</div>

<Closing />
