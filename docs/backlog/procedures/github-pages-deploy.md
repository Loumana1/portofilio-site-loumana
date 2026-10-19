# Procedure: GitHub Pages deploy pipeline

**Status:** Ready to implement when Loumana says go.  
**Checklist:** `../CHECKLIST.md` §1.  
**Repo:** `Loumana1/portofilio-site-loumana`  
**Pages URL (now):** `https://Loumana1.github.io/portofilio-site-loumana/`  
**Vite `base`:** `'/portofilio-site-loumana/'`  
**Later:** domain **loumana.co**. QA-D2 = commit needed media; 3D must ship.

## Goal

Push to `main` → GitHub Actions builds with Vite → Pages serves `dist/` → visitors see the update.

## Why not “run Vite on GitHub”

GitHub Pages only hosts static files. Vite runs in CI at build time. Visitors never load Vite.

## Steps (when Loumana says go)

1. **URL (QA-D1)**  
   - Now: `base: '/portofilio-site-loumana/'`  
   - Later: custom domain **loumana.co** → DNS + Pages custom domain; usually `base: '/'`

2. **Vite config**  
   - Set `base`  
   - Keep `publicDir: 'assets'` so games, fonts, downloads copy into `dist/`

3. **Workflow file** `.github/workflows/deploy.yml` (sketch)

```yaml
name: Deploy site
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. **Repo settings**  
   Settings → Pages → Build and deployment → Source: **GitHub Actions**.

5. **Media (QA-D2)**  
   Without a plan, 3D models and beat MP3s will be missing online (gitignored). Resolve before calling deploy “done”.

6. **Smoke test**  
   Home, both doors, one release detail, radio, about, one game `index.html`, press kit + CV PDFs.

## Day-to-day after it works

```text
edit → commit (when asked) → push main → wait for Actions green → refresh live URL
```

No `python` server and no manual `dist/` upload for visitors.
