<script>
	import { stats } from '$lib/data.js';
</script>

<section class="stats">
	<div class="container">
		<div class="stats-grid">
			{#each stats as { n, label }}
				<div class="stat-item">
					<span class="stat-number">{n}</span>
					<span class="stat-label">{label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
