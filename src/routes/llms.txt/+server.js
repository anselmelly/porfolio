import { posts } from '$lib/server/posts.js';

const SITE = 'https://anselmelly.com';

const head = `# Ansel Melly - Statistician & Software Engineer

> Professional portfolio of Ansel Kipchumba Melly, a statistician and software engineer based in Kenya with 10+ years of experience.

## About

Ansel Melly is a statistician and software engineer specializing in:
- Statistical analysis and data science (R, Python, SPSS, Stata, Excel)
- Web development (PHP, Laravel, WordPress, JavaScript, MySQL)
- API integration and system connectivity
- Linux server administration and Git version control

BSc Statistics & Economics (KCA University). Currently pursuing MSc Data Science & Analytics at Strathmore University.

## Pages

- [Homepage](https://anselmelly.com/): About, consultancy services, portfolio, tech stack, testimonials, and contact.
- [Stories](https://anselmelly.com/stories/): Blog covering data science, software engineering, and consulting.
- [Resume/CV](https://anselmelly.com/assets/AnselMelly_Resume.pdf): Full work history, education, and skills.

`;

const tail = `## Consultancy

### Statistical Services
- Research design and methodology
- Data analysis and interpretation
- Statistical modeling and forecasting
- Survey design and sampling

### Data Science
- Machine learning model development
- Data visualization and reporting
- Predictive analytics
- Database management

### Web Development
- Custom web applications (Laravel/PHP)
- WordPress development
- Database design (MySQL)
- API development and integration

### Consulting
- Data strategy consulting
- IT consulting
- System integration
- Technical project management

## Projects

- [ImpactMetrik Surveys](https://surveys.impactmetrik.com): A Monitoring & Evaluation survey and data collection platform, in beta. See the [build series on Stories](https://anselmelly.com/stories/impactmetrik-the-three-year-vibecoded-build/).

## Contact

- Website: https://anselmelly.com
- Email: ansel@anselmelly.com
- LinkedIn: https://www.linkedin.com/in/anselmelly
- GitHub: https://github.com/anselmelly
- Location: Nairobi, Kenya

## Portfolio

Featured clients include government agencies, NGOs, and private sector organizations across East Africa.

## Tech Stack

### Data Science Tools
R, Python, SPSS, Stata, Excel, SQL

### Development Stack
PHP, Laravel, WordPress, JavaScript, MySQL, Linux, Git, Claude AI
`;

export const prerender = true;

export const GET = () =>
	new Response(
		head +
			'## Stories\n\n' +
			posts.map((p) => `- [${p.title}](${SITE}/stories/${p.slug}/): ${p.excerpt}`).join('\n') +
			'\n\n' +
			tail,
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
	);
