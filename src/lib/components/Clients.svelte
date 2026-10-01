<script>
	import { clients } from '$lib/data.js';
</script>

<section class="clients">
	<div class="container">
		<h2>Trusted By</h2>
		<div class="clients-grid">
			{#each clients as { img, name }}
				<div class="client-logo light-logo">
					<img src="/assets/clients/{img}" alt={name} loading="lazy" />
				</div>
			{/each}
		</div>
	</div>
</section>
