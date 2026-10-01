<script>
	import { services } from '$lib/data.js';
</script>

<section id="services" class="services">
	<div class="container">
		<h2>Consultancy</h2>

		{#each services as { title, items }}
			<div class="services-category">
				<h3>{title}</h3>
				<div class="services-grid">
					{#each items as { icon, title, text }}
						<article class="service-card">
							<div class="service-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">{@html icon}</svg>
							</div>
							<h4>{title}</h4>
							<p>{text}</p>
						</article>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
