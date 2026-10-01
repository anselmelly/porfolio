# anselmelly.com

Personal portfolio website for Ansel Melly - Statistician & Software Engineer.

## Live Site

[https://anselmelly.com](https://anselmelly.com)

## Tech Stack

- SvelteKit 2 + Svelte 5, prerendered to static files with `adapter-static`
- Plain CSS (`src/app.css`) with CSS variables and light/dark themes
- `markdown-it` renders the stories at build time
- Google Fonts (Syne, DM Sans, DM Mono)
- Devicon for tech stack icons
- Interactive particle network animation
- Cloudflare Workers static assets (Wrangler) for hosting

## Features

- Responsive design with dark/light mode support
- Interactive hero section with particle network
- Consultancy showcase
- Portfolio/client gallery
- Tech stack display with icons
- Testimonials section
- Contact form
- SEO optimized with meta tags, sitemap, and robots.txt
- AI-friendly with llms.txt for discoverability

## Structure

```
.
├── src/
│   ├── app.html           # Document shell: fonts, theme-before-paint script, GTM
│   ├── app.css            # All styles
│   ├── lib/
│   │   ├── data.js        # Homepage content: socials, services, portfolio, stack, ...
│   │   ├── components/    # Nav, Footer, ThemeToggle, Hero, Portfolio, Meta, JsonLd, ...
│   │   └── server/posts.js  # Loads and renders stories (markdown-it), build time only
│   ├── posts/
│   │   ├── index.json     # Post metadata (title, date, excerpt, tags, ...)
│   │   └── <slug>.md      # Post source content
│   └── routes/
│       ├── +page.svelte           # Homepage
│       ├── stories/               # /stories/ list and /stories/<slug>/ posts
│       ├── sitemap.xml/           # Generated from the page list + posts
│       └── llms.txt/              # Generated, includes the story list
├── static/                # Copied as-is: assets/, robots.txt, sitemap.xsl, favicon.ico,
│                          # post.html (legacy ?slug= redirect)
├── svelte.config.js       # adapter-static, output to build/
└── wrangler.jsonc         # Cloudflare Workers static assets config
```

## Adding a story

1. Add `src/posts/<slug>.md`.
2. Add an entry (slug, title, date, excerpt, category, tags, readTime) to `src/posts/index.json`.
3. Build. The page, sitemap and llms.txt update on their own.

## Local Development

```bash
npm install
npm run dev      # Vite dev server on http://localhost:8934
npm run build    # prerender the whole site into build/
npm run preview  # serve build/ locally
```

## Deploy

```bash
npm run deploy
```

Runs the build then `wrangler deploy`.

## Releasing

Versions follow [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`), tagged `vX.Y.Z`:

| Bump | Use it for | Example |
|---|---|---|
| **MAJOR** | A rebuild or change that breaks URLs or the deploy setup | 1.0.0 to 2.0.0 (static HTML to SvelteKit) |
| **MINOR** | A new section, page or feature | adding a Projects page |
| **PATCH** | Fixes, performance, styling, copy and new stories | fixing contrast, publishing a post |

To cut a release:

1. Move the changes under a new `## [X.Y.Z] - YYYY-MM-DD` heading in `CHANGELOG.md` and commit.
2. Make sure the tree is clean on `main`, then run `npm version patch` (or `minor` / `major`). It bumps `package.json`, commits `release vX.Y.Z` and creates an annotated tag.
3. `git push origin main --follow-tags`
4. `gh release create vX.Y.Z --title "vX.Y.Z" --notes-file <(sed -n '/^## \[X.Y.Z\]/,/^## \[/p' CHANGELOG.md | sed '$d')`

Pushing `main` is what deploys the site (Cloudflare Workers Builds); tags and releases only mark a version.

## License

All rights reserved.
