# ePortfolio

A modern, accessible and multilingual (FR/EN) ePortfolio for a Software Engineer.
Built as a clean, extensible technical base — ready to be filled with your own content
and deployed automatically to GitHub Pages.

## Tech stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** for dev server and build
- **React Router** for client-side routing (localized routes)
- **Tailwind CSS v4** (CSS-first config via `@tailwindcss/vite`) with class-based dark mode and design tokens
- **ESLint** + **Prettier** for code quality
- **GitHub Actions** → **GitHub Pages** for automatic deployment
- Lightweight, dependency-free **i18n** and **SEO** helpers

## Getting started

Requires Node.js 24+ (see `.nvmrc`; run `nvm use` to match).

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build locally
```

## npm scripts

| Script                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR.             |
| `npm run build`        | Type-check, build, sitemap and pre-render to `dist/`. |
| `npm run sitemap`      | Generate `dist/sitemap.xml` and update `robots.txt`. |
| `npm run prerender`    | Pre-render localized routes into static HTML (requires a prior `vite build`). |
| `npm run preview`      | Serve the production build locally.             |
| `npm run lint`         | Run ESLint over the project.                    |
| `npm run lint:fix`     | Run ESLint and auto-fix what it can.            |
| `npm run format`       | Format the codebase with Prettier.              |
| `npm run format:check` | Check formatting without writing changes.       |
| `npm run typecheck`    | Type-check the project without emitting output. |

## Project structure

```
src/
├─ components/
│  ├─ Header/            # Sticky nav: smooth-scroll links + active-section spy
│  ├─ Footer/            # Footer with social links
│  ├─ Layout/            # App shell: skip link, header, <main>, footer
│  ├─ LanguageSwitcher/  # FR/EN switch that preserves the current section
│  ├─ ThemeToggle/       # Light/dark toggle
│  ├─ Seo/               # <title> and meta tags
│  ├─ projects/          # Project explorer, cards, drawer detail panel
│  ├─ sections/          # Landing sections (Hero, About, Skills, Projects)
│  └─ ui/                # Reusable primitives (Button, Drawer, Section…)
├─ config/               # SECTIONS: single source of truth for ids + nav order
├─ data/                 # Static content (profile, projects, skills, journey)
├─ hooks/                # useScrollSpy (IntersectionObserver-based)
├─ i18n/                 # Translations (fr.ts, en.ts) + language context/helpers
├─ pages/                # Landing (single page) + NotFound
├─ routes/               # AppRoutes: localized route tree
├─ styles/               # Global CSS and design tokens
├─ theme/                # Theme context + provider (dark mode)
├─ types/                # Shared TypeScript types
├─ utils/                # Small helpers (cx, path builders, smooth scroll)
├─ App.tsx               # Router + providers
└─ main.tsx              # Entry point
```

The UI is kept separate from the data: sections only handle presentation, while
content lives in `src/data` and translatable UI strings live in `src/i18n`.

## Single-page navigation & smooth scrolling

- Each language renders **one landing page** (`src/pages/Landing.tsx`) that stacks
  all sections: `#hero`, `#about`, `#skills`, `#projects`.
- The section list and order live in `src/config/sections.ts`, shared by the
  `Header` navigation and the `Landing` page so ids can't drift.
- Clicking a header link smooth-scrolls to the section, moves keyboard focus to
  it, and updates the URL hash so links like `/fr#projects` are shareable.
- Smooth scrolling falls back to instant jumps when `prefers-reduced-motion` is set.
- The header highlights the section currently in view using `useScrollSpy`.

## Projects

- The projects section on the landing page includes search, filters and pagination.
- Clicking **View details** opens a right-side drawer (50% width on desktop).
- Deep links use `/:lang/projects/:slug` (e.g. `/fr/projects/polyconquest`).

### Available routes

```
/                          → redirects to /fr
/fr, /en                   → landing page (all sections)
/fr#projects, /en#about…   → deep link to a section
/fr/projects/:slug         → open a project in the drawer
```

## FR/EN internationalization

- Language is part of the URL: the landing page lives under `/:lang` (`/fr`, `/en`).
- `/` redirects to the default language (`/fr`).
- Translations are centralized in `src/i18n/fr.ts` and `src/i18n/en.ts`; both must
  satisfy the `Translation` interface (`src/types`), so a missing key is a
  compile-time error.
- The `LanguageSwitcher` swaps only the `/:lang` segment of the path, preserving
  the hash and query.

## Dark mode

- Uses a class-based dark variant (`.dark` on `<html>`).
- The theme is persisted in `localStorage` and defaults to the system preference
  on first visit.
- An inline script in `index.html` applies the theme before the first paint.

## SEO

- **Pre-rendered HTML** at build time: each localized route (`/fr`, `/en`, project deep links) gets a full `index.html` with content, meta tags and JSON-LD already in the document — visible to search engines and social scrapers (LinkedIn, Twitter/X, etc.) without executing JavaScript.
- The `Seo` component manages per-page metadata on client navigations: title, description, canonical URL, Open Graph, Twitter cards, `hreflang` alternates and Schema.org JSON-LD (`Person`, `WebSite`, `CreativeWork`).
- `index.html` ships rich fallback meta tags for the default French landing page.
- `scripts/generate-sitemap.mjs` writes `dist/sitemap.xml` with `hreflang` alternates; `public/robots.txt` references the sitemap.

## Accessibility

- Semantic HTML, skip link, visible keyboard focus, `prefers-reduced-motion` support.
- The drawer uses `role="dialog"`, focus management and Escape to close.

## GitHub Pages

The site is deployed as a **project site** at `https://<username>.github.io/Eportfolio/`
from a repository named `Eportfolio`. CI sets `BASE_PATH=/Eportfolio/` at build time;
local dev keeps `base: '/'`.

`public/404.html` and an inline script in `index.html` restore deep links on refresh.

`.github/workflows/deploy.yml` deploys on every push to `main`: lint, typecheck,
build, then publish via GitHub Actions.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Customizing the content

- Profile, projects, skills, journey and interests: `src/data/index.ts`.
- UI text: `src/i18n/fr.ts` and `src/i18n/en.ts`.
- Colors / theme: tokens in `src/styles/index.css`.
