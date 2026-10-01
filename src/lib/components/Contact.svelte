<script>
	import { onMount } from 'svelte';

	let box;

	// embed.js reads document.currentScript and mounts the form right after itself,
	// so the tag has to be created at runtime inside the container
	onMount(() => {
		const s = document.createElement('script');
		s.src = 'https://forms.impactmetrik.com/embed.js';
		s.dataset.formId = 'ba05dbc3-7860-494b-adb0-4580dabc3cdf';
		s.dataset.type = 'inline';
		s.dataset.color = '#1D9E75';
		box.appendChild(s);
		return () => box.replaceChildren();
	});
</script>

<section id="contact" class="contact">
	<div class="container">
		<h2>Get in Touch</h2>
		<div class="contact-content">
			<div class="contact-form" bind:this={box}></div>
		</div>
	</div>
</section>
