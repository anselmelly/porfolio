<script>
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';

	const links = [
		['/#about', 'About'],
		['/#services', 'Consultancy'],
		['/#portfolio', 'Portfolio'],
		['/#stack', 'Stack'],
		['/#testimonials', 'Testimonials'],
		['/#contact', 'Contact']
	];

	let open = $state(false);
</script>

<svelte:window onclick={(e) => !e.target.closest('.nav-container') && (open = false)} />

<header class="site-header">
	<nav class="nav-container">
		<div class="logo">
			<a href="/#home">
				<img src="/assets/logo-nav.webp" alt="Ansel Melly Logo" width="508" height="210" />
			</a>
		</div>
		<ul class="nav-links" class:active={open}>
			{#each links as [href, label]}
				<li><a {href} onclick={() => (open = false)}>{label}</a></li>
			{/each}
			<li>
				<a
					href="/stories/"
					class:active={page.url.pathname.startsWith('/stories')}
					onclick={() => (open = false)}>Stories</a
				>
			</li>
		</ul>
		<div class="nav-right">
			<ThemeToggle />
			<button
				class="mobile-menu-toggle"
				class:active={open}
				aria-label="Toggle menu"
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</nav>
</header>
