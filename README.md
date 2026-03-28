# Le Charleston

Site web du Charleston, bar jazz et salle de concert à Amiens.

Built with **Hugo** + **Tailwind CSS v3**, deployed on **Netlify**, with events automatically synced from the Facebook Page via a daily GitHub Actions cron job.

---

## Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.120+ (`extended` edition required for Hugo Pipes / PostCSS)
- Node.js v20+
- npm

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
hugo server -D
```

The site will be available at `http://localhost:1313`.

Hugo Pipes processes Tailwind CSS automatically via PostCSS. The `extended` edition of Hugo is required.

---

## Facebook Events Sync

### Environment variables

| Variable | Description |
|---|---|
| `PAGE_ID` | Your Facebook Page numeric ID |
| `FACEBOOK_ACCESS_TOKEN` | A long-lived Page access token |

To get a long-lived token, follow [Facebook's guide](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived-access-tokens/).

### Run locally

```bash
PAGE_ID=your_page_id FACEBOOK_ACCESS_TOKEN=your_token node scripts/fetch-events.js
```

This writes the result to `data/events.json`. The Hugo dev server will hot-reload automatically.

### Seed data

`data/events.json` is pre-seeded with 3 mock events for local development. Running the script above will overwrite it with real data.

---

## GitHub Actions (automated sync)

The workflow `.github/workflows/fetch-events.yml` runs every day at **06:00 UTC**.

### Required repository secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `FACEBOOK_ACCESS_TOKEN` | Your long-lived Page access token |
| `PAGE_ID` | Your Facebook Page numeric ID |

When events change, the workflow commits the updated `data/events.json` and pushes. This push triggers a Netlify rebuild automatically.

### Manual trigger

You can also trigger the workflow manually from the **Actions** tab → **Fetch Facebook Events** → **Run workflow**.

---

## Netlify Deployment

### Build settings

| Setting | Value |
|---|---|
| Build command | `npm install && hugo --minify` |
| Publish directory | `public` |

These are already configured in `netlify.toml`.

### Environment variables (Netlify)

No Facebook credentials are needed in Netlify — events are committed to the repo by GitHub Actions before Netlify builds.

Netlify will automatically rebuild whenever a new commit is pushed (including the bot commits from the cron job).

---

## Project Structure

```
le-charleston/
├── .github/workflows/fetch-events.yml   # Daily cron job
├── assets/css/main.css                  # Tailwind directives + Google Fonts
├── content/_index.md                    # Homepage front matter
├── data/events.json                     # Auto-generated event list
├── layouts/
│   ├── _default/baseof.html             # Base HTML shell
│   ├── index.html                       # Homepage template
│   └── partials/
│       ├── head.html                    # <head> + CSS pipeline
│       ├── header.html                  # Fixed navigation
│       ├── footer.html                  # Footer + contact info
│       └── event-card.html             # Reusable event card
├── scripts/fetch-events.js              # Facebook API fetcher
├── hugo.toml                            # Hugo configuration
├── netlify.toml                         # Netlify build config
├── tailwind.config.js
└── postcss.config.js
```

---

## Updating `baseURL`

Before deploying, update `baseURL` in `hugo.toml` to match your Netlify domain:

```toml
baseURL = "https://your-site.netlify.app/"
```
