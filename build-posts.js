#!/usr/bin/env node
// Generates static /posts/<slug>/index.html pages with real per-post meta tags
// and JSON-LD, from posts/*.md + posts/index.json. Run before deploy.

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const ROOT = __dirname;
const POSTS_DIR = path.join(ROOT, 'posts');
const SITE_URL = 'https://anselmelly.com';

const md = new MarkdownIt();
const posts = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, 'index.json'), 'utf8'));
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const template = fs.readFileSync(path.join(ROOT, 'post-template.html'), 'utf8');

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${post.slug}.md`), 'utf8');
    const rendered = md.render(raw);

    const older = i < posts.length - 1 ? posts[i + 1] : null;
    const newer = i > 0 ? posts[i - 1] : null;
    const navHtml = `
        ${older ? `<a class="post-nav-link post-nav-prev" href="/posts/${older.slug}/"><span class="post-nav-label">&larr; Older</span><span class="post-nav-title">${escapeHtml(older.title)}</span></a>` : '<span></span>'}
        ${newer ? `<a class="post-nav-link post-nav-next" href="/posts/${newer.slug}/"><span class="post-nav-label">Newer &rarr;</span><span class="post-nav-title">${escapeHtml(newer.title)}</span></a>` : '<span></span>'}
    `;

    const dateStr = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const metaLine = post.readTime ? `${dateStr} &middot; ${post.readTime} read` : dateStr;
    const categoryHtml = post.category ? `<span class="blog-card-category">${escapeHtml(post.category)}</span>` : '';
    const tagsHtml = (post.tags || []).map(t => `<span class="blog-card-tag">${escapeHtml(t)}</span>`).join('');

    const contentHtml = `<div class="blog-card-meta">${categoryHtml}<span class="blog-card-date">${metaLine}</span></div><h1 class="post-title">${escapeHtml(post.title)}</h1>` + rendered + `<div class="blog-card-tags">${tagsHtml}</div>`;

    const canonical = `${SITE_URL}/posts/${post.slug}/`;
    const ogImage = `${SITE_URL}/assets/logo.png`;

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

    const outDir = path.join(POSTS_DIR, post.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log(`built posts/${post.slug}/index.html`);
}

// regenerate sitemap.xml with real post URLs
const sitemapPosts = posts.map(p => `\t<url>
\t\t<loc>${SITE_URL}/posts/${p.slug}/</loc>
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
