<script>
	import { about } from '$lib/data.js';
</script>

<section id="about" class="about">
	<div class="container">
		<div class="about-content">
			<div class="about-image">
				<img src="/assets/profile_picture.jpg" alt="Ansel Melly" />
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
