<script>
	import ParticleNetwork from './ParticleNetwork.svelte';
	import { socials } from '$lib/data.js';
</script>

<section id="home" class="hero">
	<ParticleNetwork />

	<div class="hero-content">
		<p class="hero-tagline">CODE. DATA. INSIGHTS.</p>
		<h1 class="hero-greeting">Hi!</h1>
		<h2 class="hero-name">I am Ansel</h2>
		<p class="hero-title">Statistician &amp; Software Engineer</p>
		<p class="hero-experience">
			10+ years experience | BSc Statistics &amp; Economics<br />MSc Data Science &amp; Analytics (in progress)
		</p>

		<div class="social-links">
			{#each socials as { href, label, svg }}
				<a {href} target="_blank" rel="noopener" aria-label={label}>
					<svg viewBox="0 0 24 24" fill="currentColor">{@html svg}</svg>
				</a>
			{/each}
		</div>

		<div class="cta-buttons">
			<a href="#contact" class="btn btn-primary">Get in Touch</a>
			<a href="/assets/AnselMelly_Resume.pdf" class="btn btn-secondary" download>Download CV</a>
		</div>
	</div>

	<a href="#about" class="scroll-down" aria-label="Scroll down">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="10" />
			<polyline points="8 12 12 16 16 12" />
			<line x1="12" y1="8" x2="12" y2="16" />
		</svg>
	</a>
</section>
