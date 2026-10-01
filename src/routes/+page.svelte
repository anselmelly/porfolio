<script>
	import Meta from '$lib/components/Meta.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Services from '$lib/components/Services.svelte';
	import Portfolio from '$lib/components/Portfolio.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Clients from '$lib/components/Clients.svelte';
	import { person } from '$lib/data.js';
</script>

<Meta
	title="Ansel Melly | Statistician & Software Engineer"
	description="Ansel Melly: Statistician & Software Engineer with 10+ years experience in statistical analysis, data science, and web development. Specializes in R, Python, Laravel, PHP, MySQL, and statistical modeling."
	ogDescription="Statistician & Software Engineer with 10+ years experience in statistical analysis, data science, and web development. Expert in R, Python, Laravel, and data-driven solutions."
	twitterDescription="Statistician & Software Engineer with 10+ years experience in statistical analysis, data science, and web development."
	keywords="statistician, software engineer, data scientist, web developer, consultant, data consultant, IT consultant, R programming, Python, Laravel, PHP, MySQL, statistical analysis, data analysis, Kenya, Nairobi, SPSS, Stata, Excel, API integration, WordPress, freelance developer"
/>
<JsonLd data={person} />

<Hero />
<About />
<Stats />
<Services />
<Portfolio />
<Stack />
<Testimonials />
<Contact />
<Clients />
