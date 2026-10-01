<script>
	import { portfolio } from '$lib/data.js';
</script>

<section id="portfolio" class="portfolio">
	<div class="container">
		<h2>Portfolio</h2>
		<p class="section-subtitle">A selection of projects I've built for clients</p>

		<div class="portfolio-grid">
			{#each portfolio as { url, img, name }}
				<a href={url} target="_blank" rel="noopener" class="portfolio-card">
					<img src="/assets/{img}" alt={name} loading="lazy" />
					<div class="portfolio-overlay">
						<h3>{name}</h3>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
