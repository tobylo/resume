<!--
	Page title, description, canonical URL and link preview tags. Every page renders one.
	The preview image is shared: src/routes/og.png renders it at build time.
-->
<script lang="ts">
	import { absoluteUrl, ogImage, person } from '#lib/site.ts';

	interface Props {
		title: string;
		description: string;
		/** The page's path, e.g. "/work". */
		path: string;
	}

	let { title, description, path }: Props = $props();

	const url = $derived(absoluteUrl(path));
	const image = absoluteUrl(ogImage.path);
	const imageAlt = `${person.name}, ${person.title.toLowerCase()} in ${person.location}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="tobylo.dev" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={String(ogImage.width)} />
	<meta property="og:image:height" content={String(ogImage.height)} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
