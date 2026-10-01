<script>
	import Meta from '$lib/components/Meta.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';

	let { data } = $props();
	const { post, html, older, newer } = $derived(data);

	const SITE = 'https://anselmelly.com';
	const url = $derived(`${SITE}/stories/${post.slug}/`);
	const shareUrl = $derived(encodeURIComponent(url));
	const shareText = $derived(encodeURIComponent(post.title));
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.excerpt,
		datePublished: post.date,
		dateModified: post.date,
		url,
		author: { '@type': 'Person', name: 'Ansel Kipchumba Melly', url: SITE },
		publisher: { '@type': 'Person', name: 'Ansel Kipchumba Melly' },
		image: `${SITE}/assets/logo.png`,
		keywords: (post.tags || []).join(', ')
	});
</script>

<Meta
	title="{post.title} | Ansel Melly"
	description={post.excerpt}
	path="/stories/{post.slug}/"
	type="article"
	published={post.date}
/>
<JsonLd data={jsonLd} />

<section class="stories">
	<div class="container">
		<a href="/stories/" class="post-back">&larr; Back to Stories</a>
		<article class="post-content">
			<div class="blog-card-meta">
				{#if post.category}<span class="blog-card-category">{post.category}</span>{/if}
				<span class="blog-card-date">{post.dateLine}</span>
			</div>
			<h1 class="post-title">{post.title}</h1>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- own markdown, rendered at build time -->
			{@html html}
			<div class="blog-card-tags">
				{#each post.tags || [] as t}<span class="blog-card-tag">{t}</span>{/each}
			</div>
			<div class="post-share">
				<span class="post-share-label">Share</span>
				<a class="post-share-link post-share-linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url={shareUrl}" target="_blank" rel="noopener" aria-label="Share on LinkedIn">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
				</a>
				<a class="post-share-link post-share-x" href="https://twitter.com/intent/tweet?url={shareUrl}&text={shareText}" target="_blank" rel="noopener" aria-label="Share on X">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.68L23.3 22h-7.02l-5.5-7.2L4.5 22H1.4l8.13-9.3L.7 2h7.2l4.97 6.57L18.9 2zm-1.23 18h1.95L7.4 3.9H5.3l12.37 16.1z" /></svg>
				</a>
			</div>
		</article>
		<nav class="post-nav">
			{#if older}
				<a class="post-nav-link post-nav-prev" href="/stories/{older.slug}/"><span class="post-nav-label">&larr; Older</span><span class="post-nav-title">{older.title}</span></a>
			{:else}<span></span>{/if}
			{#if newer}
				<a class="post-nav-link post-nav-next" href="/stories/{newer.slug}/"><span class="post-nav-label">Newer &rarr;</span><span class="post-nav-title">{newer.title}</span></a>
			{:else}<span></span>{/if}
		</nav>
	</div>
</section>
