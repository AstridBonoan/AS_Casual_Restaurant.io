# Ember Bowl Co. — Fast Casual Restaurant

Mobile-first React + Tailwind site for ordering, promotions, and pickup/delivery.

**Live site (after setup):** [https://astridbonoan.github.io/AS_Casual_Restaurant.io/](https://astridbonoan.github.io/AS_Casual_Restaurant.io/)

## Features

- Menu with categories, filters, and one-tap add to cart
- Pickup vs delivery toggle with ETA and fees
- Promo codes (`WELCOME15`, `PICKUP10`, `LUNCH8`)
- Mobile cart sheet and sticky checkout bar
- GitHub Actions CI (lint + build)
- Automated deploy to the `gh-pages` branch for **GitHub Pages → Deploy from a branch**

## Local development

```bash
npm install
npm run dev
```

Preview the production build (with GitHub Pages base path):

```bash
npm run build
npm run preview
```

## GitHub Pages setup

1. Push this repo to `main`.
2. Wait for the **Deploy to GitHub Pages** workflow to finish (creates/updates the `gh-pages` branch).
3. In the repo: **Settings → Pages → Build and deployment**
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / `/ (root)`
4. Save. The site will be available at the URL above within a few minutes.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Vite dev server          |
| `npm run build`| Production build to `dist` |
| `npm run lint` | ESLint                   |
| `npm run preview` | Preview production build |

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
