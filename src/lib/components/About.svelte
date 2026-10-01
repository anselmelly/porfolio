<script>
	import { about } from '$lib/data.js';
</script>

<section id="about" class="about">
	<div class="container">
		<div class="about-content">
			<div class="about-image">
				<img
					src="/assets/profile_picture-300.webp"
					srcset="/assets/profile_picture-300.webp 300w, /assets/profile_picture.webp 560w"
					sizes="300px"
					alt="Ansel Melly"
					width="560"
					height="560"
					loading="lazy"
					decoding="async"
				/>
			</div>
			<div class="about-text">
				<h2>About Me</h2>
				{#each about as p}
					<p>{p}</p>
				{/each}
			</div>
		</div>
	</div>
</section>
