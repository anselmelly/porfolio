<script>
	import Meta from '$lib/components/Meta.svelte';

	let { data } = $props();
</script>

<Meta
	title="Stories | Ansel Melly"
	description="Notes on data science, statistics, and software engineering from Ansel Melly."
	path="/stories/"
/>

<section class="stories">
	<div class="container">
		<h2>Stories</h2>
		<p class="contact-intro stories-intro">Notes on data, statistics, and building software.</p>
		<div class="blog-list">
			{#each data.posts as post}
				<a class="blog-card" href="/stories/{post.slug}/">
					<div class="blog-card-meta">
						{#if post.category}<span class="blog-card-category">{post.category}</span>{/if}
						<span class="blog-card-date">{post.dateLine}</span>
					</div>
					<h3>{post.title}</h3>
					<p>{post.excerpt}</p>
					<div class="blog-card-tags">
						{#each post.tags || [] as t}<span class="blog-card-tag">{t}</span>{/each}
					</div>
				</a>
			{:else}
				<p class="contact-intro">No posts yet.</p>
			{/each}
		</div>
	</div>
</section>
