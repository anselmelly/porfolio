import MarkdownIt from 'markdown-it';
import meta from '../../posts/index.json';

const SITE = 'https://anselmelly.com';
const files = import.meta.glob('../../posts/*.md', { query: '?raw', import: 'default', eager: true });

const md = new MarkdownIt();
const defaultLinkOpen =
	md.renderer.rules.link_open ||
	((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const href = token.attrGet('href') || '';
	if (/^https?:\/\//.test(href) && !href.startsWith(SITE)) {
		token.attrSet('target', '_blank');
		token.attrSet('rel', 'noopener');
	}
	return defaultLinkOpen(tokens, idx, options, env, self);
};

const fmt = (d) =>
	new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** All posts, newest first, with a ready-to-print date line */
export const posts = [...meta]
	.sort((a, b) => new Date(b.date) - new Date(a.date))
	.map((p) => ({ ...p, dateLine: p.readTime ? `${fmt(p.date)} · ${p.readTime} read` : fmt(p.date) }));

export function getPost(slug) {
	const i = posts.findIndex((p) => p.slug === slug);
	if (i < 0) return null;
	const raw = files[`../../posts/${slug}.md`];
	return {
		post: posts[i],
		html: md.render(raw),
		newer: i > 0 ? posts[i - 1] : null,
		older: i < posts.length - 1 ? posts[i + 1] : null
	};
}
