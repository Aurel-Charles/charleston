# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for **Le Charleston**, a jazz bar and concert venue in Amiens, France. Built with Hugo + Tailwind CSS. Events are fetched from the Facebook Graph API and committed to `data/events.json`, triggering a Netlify rebuild.

## Commands

```bash
npm run dev            # Hugo dev server at http://localhost:1313
npm run build          # Production build (hugo --minify) → public/
npm run fetch-events   # Fetch events from Facebook API → data/events.json
```

Prerequisites: Hugo Extended v0.120+, Node.js v20+.

## Architecture

### Event pipeline

```
Facebook Graph API
  → scripts/fetch-events.js   (requires PAGE_ID + FACEBOOK_ACCESS_TOKEN env vars)
  → data/events.json           (committed; triggers Netlify rebuild)
  → layouts/index.html         (reads via site.Data.events at build time)
```

GitHub Actions (`.github/workflows/fetch-events.yml`) runs `fetch-events` daily at 06:00 UTC and commits any changes. Netlify then rebuilds automatically.

### Hugo rendering

- `layouts/_default/baseof.html` — base HTML shell, includes all partials
- `layouts/index.html` — homepage: hero, event grid (filters past events via `start_time`), ambiance section
- `layouts/partials/` — `head.html`, `header.html`, `footer.html`, `event-card.html`
- `content/_index.md` — homepage frontmatter (title, tagline)
- `assets/css/main.css` — Tailwind directives + Google Fonts; compiled by Hugo Pipes + PostCSS

### Styling

Tailwind v3 with custom `gold` color palette and Playfair Display (serif) / Inter (sans) fonts. `hugo.toml` sets `writeStats = true` to generate `hugo_stats.json` for Tailwind CSS purging.

### ES Modules

`package.json` sets `"type": "module"`. Config files (`tailwind.config.js`, `postcss.config.js`) must use `export default`, not `module.exports`.

## Key config files

| File | Purpose |
|------|---------|
| `hugo.toml` | Site metadata, baseURL, params (address, email, FB link) |
| `netlify.toml` | Build command, Hugo v0.145.0 + Node v20 env, security headers |
| `tailwind.config.js` | Theme (gold palette, fonts, content scan paths) |
