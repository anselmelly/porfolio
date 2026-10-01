<script>
	import { testimonials } from '$lib/data.js';
</script>

<section id="testimonials" class="testimonials">
	<div class="container">
		<h2>Testimonials</h2>
		<div class="testimonials-grid">
			{#each testimonials as { quote, name, role }}
				<article class="testimonial-card">
					<div class="testimonial-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
					<blockquote>
						<p>{quote}</p>
					</blockquote>
					<cite>
						<strong>{name}</strong>
						<span>{role}</span>
					</cite>
				</article>
			{/each}
		</div>
	</div>
</section>
