#!/usr/bin/env node
// Generates static /stories/<slug>/index.html pages with real per-post meta tags
// and JSON-LD, from stories/*.md + stories/index.json. Run before deploy.

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const ROOT = __dirname;
const STORIES_DIR = path.join(ROOT, 'stories');
const SITE_URL = 'https://anselmelly.com';

const md = new MarkdownIt();
const defaultLinkRender = md.renderer.rules.link_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const href = token.attrGet('href') || '';
    if (/^https?:\/\//.test(href) && !href.startsWith(SITE_URL)) {
        token.attrSet('target', '_blank');
        token.attrSet('rel', 'noopener');
    }
    return defaultLinkRender(tokens, idx, options, env, self);
};

const posts = JSON.parse(fs.readFileSync(path.join(STORIES_DIR, 'index.json'), 'utf8'));
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const template = fs.readFileSync(path.join(ROOT, 'post-template.html'), 'utf8');

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const raw = fs.readFileSync(path.join(STORIES_DIR, `${post.slug}.md`), 'utf8');
    const rendered = md.render(raw);

    const older = i < posts.length - 1 ? posts[i + 1] : null;
    const newer = i > 0 ? posts[i - 1] : null;
    const navHtml = `
        ${older ? `<a class="post-nav-link post-nav-prev" href="/stories/${older.slug}/"><span class="post-nav-label">&larr; Older</span><span class="post-nav-title">${escapeHtml(older.title)}</span></a>` : '<span></span>'}
        ${newer ? `<a class="post-nav-link post-nav-next" href="/stories/${newer.slug}/"><span class="post-nav-label">Newer &rarr;</span><span class="post-nav-title">${escapeHtml(newer.title)}</span></a>` : '<span></span>'}
    `;

    const dateStr = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const metaLine = post.readTime ? `${dateStr} &middot; ${post.readTime} read` : dateStr;
    const categoryHtml = post.category ? `<span class="blog-card-category">${escapeHtml(post.category)}</span>` : '';
    const tagsHtml = (post.tags || []).map(t => `<span class="blog-card-tag">${escapeHtml(t)}</span>`).join('');

    const canonical = `${SITE_URL}/stories/${post.slug}/`;
    const ogImage = `${SITE_URL}/assets/logo.png`;

    const shareUrl = encodeURIComponent(canonical);
    const shareText = encodeURIComponent(post.title);
    const shareHtml = `<div class="post-share">
        <span class="post-share-label">Share</span>
        <a class="post-share-link post-share-linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener" aria-label="Share on LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
        </a>
        <a class="post-share-link post-share-x" href="https://twitter.com/intent/tweet?url=${shareUrl}&amp;text=${shareText}" target="_blank" rel="noopener" aria-label="Share on X">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.68L23.3 22h-7.02l-5.5-7.2L4.5 22H1.4l8.13-9.3L.7 2h7.2l4.97 6.57L18.9 2zm-1.23 18h1.95L7.4 3.9H5.3l12.37 16.1z"/></svg>
        </a>
    </div>`;

    const contentHtml = `<div class="blog-card-meta">${categoryHtml}<span class="blog-card-date">${metaLine}</span></div><h1 class="post-title">${escapeHtml(post.title)}</h1>` + rendered + `<div class="blog-card-tags">${tagsHtml}</div>` + shareHtml;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        url: canonical,
        author: {
            '@type': 'Person',
            name: 'Ansel Kipchumba Melly',
            url: SITE_URL
        },
        publisher: {
            '@type': 'Person',
            name: 'Ansel Kipchumba Melly'
        },
        image: ogImage,
        keywords: (post.tags || []).join(', ')
    };

    let html = template
        .replaceAll('{{TITLE}}', escapeHtml(post.title))
        .replaceAll('{{DESCRIPTION}}', escapeHtml(post.excerpt))
        .replaceAll('{{CANONICAL}}', canonical)
        .replaceAll('{{OG_IMAGE}}', ogImage)
        .replaceAll('{{PUBLISHED_TIME}}', post.date)
        .replaceAll('{{CONTENT}}', contentHtml)
        .replaceAll('{{NAV}}', navHtml)
        .replaceAll('{{JSON_LD}}', JSON.stringify(jsonLd, null, 2));

    const outDir = path.join(STORIES_DIR, post.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log(`built stories/${post.slug}/index.html`);
}

// regenerate sitemap.xml with real post URLs
const sitemapPosts = posts.map(p => `\t<url>
\t\t<loc>${SITE_URL}/stories/${p.slug}/</loc>
\t\t<lastmod>${p.date}</lastmod>
\t\t<changefreq>monthly</changefreq>
\t\t<priority>0.7</priority>
\t</url>`).join('\n');

const sitemapPath = path.join(ROOT, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(/\t<!-- Blog Posts -->\n(?:\t<url>[\s\S]*?<\/url>\n)*/, '');
sitemap = sitemap.replace('</urlset>', `\t<!-- Blog Posts -->\n${sitemapPosts}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);
console.log('updated sitemap.xml with post URLs');
