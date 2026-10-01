<script>
	import { stack } from '$lib/data.js';
</script>

<section id="stack" class="stack">
	<div class="container">
		<h2>Tech Stack</h2>

		{#each stack as { title, items }}
			<div class="stack-category">
				<h3>{title}</h3>
				<div class="stack-grid">
					{#each items as { name, icon, letter }}
						<div class="stack-item">
							{#if icon}<i class={icon}></i>{:else}<span class="stack-letter">{letter}</span>{/if}
							<span>{name}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
