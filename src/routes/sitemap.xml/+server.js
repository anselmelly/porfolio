import { posts } from '$lib/server/posts.js';
import changelog from '../../../CHANGELOG.md?raw';

const SITE = 'https://anselmelly.com';

// homepage changes ship as releases: use the newest "## [x.y.z] - date" in CHANGELOG.md
const SITE_UPDATED = changelog.match(/^## \[\d[^\]]*\] - (\d{4}-\d{2}-\d{2})/m)[1];
// posts are sorted newest first
const STORIES_UPDATED = posts[0].date;
const RESUME_UPDATED = '2026-09-02';

// [path, lastmod, changefreq, priority]
const pages = [
	['/', SITE_UPDATED, 'monthly', '1.0'],
	['/stories/', STORIES_UPDATED, 'weekly', '0.8'],
	['/assets/AnselMelly_Resume.pdf', RESUME_UPDATED, 'yearly', '0.6'],
	...posts.map((p) => [`/stories/${p.slug}/`, p.date, 'monthly', '0.7'])
];

export const prerender = true;

export const GET = () =>
	new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		([loc, mod, freq, pri]) =>
			`\t<url>\n\t\t<loc>${SITE}${loc}</loc>\n\t\t<lastmod>${mod}</lastmod>\n\t\t<changefreq>${freq}</changefreq>\n\t\t<priority>${pri}</priority>\n\t</url>`
	)
	.join('\n')}
</urlset>
`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
