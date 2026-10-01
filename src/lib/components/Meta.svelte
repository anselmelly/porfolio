<script>
	const SITE = 'https://anselmelly.com';

	let {
		title,
		description,
		ogDescription = description,
		twitterDescription = ogDescription,
		keywords = '',
		path = '',
		image = `${SITE}/assets/logo.png`,
		type = 'website',
		published = ''
	} = $props();

	const url = $derived(SITE + path);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords}<meta name="keywords" content={keywords} />{/if}
	<meta name="author" content="Ansel Kipchumba Melly" />
	<meta name="robots" content="index, follow" />
	<meta name="google-site-verification" content="w1gewQK3moI5ZcbPmKPglTV6VV6jpXXs_F0_d65xeTU" />
	<link rel="canonical" href={url} />

	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:image" content={image} />
	{#if published}<meta property="article:published_time" content={published} />{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={twitterDescription} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:creator" content="@anselmelly" />
</svelte:head>
