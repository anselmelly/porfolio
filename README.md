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

## License

All rights reserved.
