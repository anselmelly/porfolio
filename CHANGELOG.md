# Changelog

All notable changes to anselmelly.com. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [Semantic Versioning](https://semver.org/) as described in the README ("Releasing").

## [2.0.0] - 2026-10-01

Rebuilt the site on SvelteKit. Same design, same URLs, same content.

### Changed
- Site is now SvelteKit 2 + Svelte 5, prerendered to static files with `adapter-static` and served by Cloudflare Workers from `build/`.
- Homepage sections are Svelte components driven by `src/lib/data.js` (socials, services, portfolio, stack, testimonials, clients).
- Stories render from `src/posts/*.md` at build time; `sitemap.xml` and `llms.txt` are generated from the post list.
- Deploys run `npm run build` then `npx wrangler deploy` through Cloudflare Workers Builds.
- Dependencies refreshed: Vite 8, vite-plugin-svelte 7, markdown-it 15, Wrangler 4.145 (TypeScript stays on 5.x until SvelteKit supports 7).

### Performance
- Self-hosted fonts (Syne, DM Sans, DM Mono, latin subset) with `font-display: swap` and preload for the two used above the fold.
- Devicon replaced by a 4.6 KB self-hosted subset of the 12 icons in use (was a 1.5 MB CDN font).
- Portfolio and client images converted to WebP (2.27 MB to 0.31 MB); responsive `srcset` for the nav logo and profile photo; explicit `width`/`height` on images.
- Contact form (impactmetrik embed, ~290 KB) loads only when it nears the viewport.
- Stylesheet inlined into each page to remove the render-blocking request.
- Lighthouse (desktop, live): Performance 99, Accessibility 100, Best Practices 100, SEO 100.

### Fixed
- Light-theme color contrast on service cards and the footer credit link.
- Theme is set before first paint (no flash); the device theme is followed until the visitor picks one.

### Removed
- `build-posts.js`, `header.js`, `post-template.html` and the hand-written HTML pages.

## [1.0.0] - 2026-09-15

Baseline: the hand-written static site.

### Added
- Single-page portfolio: hero with particle network, about, consultancy services, portfolio, tech stack, testimonials, contact and clients.
- Stories blog: markdown posts rendered to static pages by `build-posts.js`, with per-post meta tags and JSON-LD, prev/next links and LinkedIn/X share buttons.
- Light/dark theme, SEO (sitemap, robots.txt, JSON-LD) and `llms.txt` for AI discoverability.
- Contact form via the ImpactMetrik forms widget; deploys through Cloudflare Workers Builds.
