# Excellent.lk

Official website of **Excellent.lk** – a growing Sri Lankan digital brand. This repo is the **foundation** of the site: a fast, single-page React app that lists our services and links to them.

- **Live site:** https://excellent-lk.vercel.app (auto-deploys from `main` on Vercel)
- **Stack:** React 18 + Vite 5, plain CSS (no UI library, no router)
- **Status:** Foundation complete – content is partly placeholder (see [Status](#status))

---

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

Requires Node 18+.

---

## Status

### Done
| Area | What exists |
|---|---|
| **Header** | Logo + `HOME · ABOUT · SERVICE · PRICES`, a black pill that slides to the active section, scroll-progress bar, "Get Started" button, mobile burger menu |
| **Hero** | Staggered entrance, floating fox logo with mouse parallax (desktop), orange paper-cut wave, orbiting dot, scroll-down hint |
| **About** | Intro text, animated stats, **Connect with us** icon buttons (Telegram, WhatsApp, TikTok, Facebook) |
| **Service** | Clickable service cards that open in a new tab (see [Services](#services-live)) |
| **Prices** | Three plan cards; "Choose …" scrolls to the contact icons |
| **Footer** | Brand + copyright |
| **Animation** | Scroll reveal, count-up numbers, hover effects – all pause off-screen and switch off for `prefers-reduced-motion` |
| **Performance** | Measured at 60 fps in a headless test browser (see [Performance](#performance-notes)) |

### Services (live)
1. **Premium Lot Calculator** – trading workspace (position sizing, journal, wallet tracking). Telegram channel icon on the card.
   https://lost-size-calculator-frontend.vercel.app
2. **LY Sweet & Fancy House** – sweets, pooja items, toys and gifts shop in Kataragama, orders via WhatsApp.
   https://l-y-sweet-house.vercel.app/

### Still placeholder (needs real content)
- About text and the stats (`100+ Projects`, `50+ Clients`, `24/7 Support`) in `src/data/site.js`
- All prices show `LKR 0` and the plan feature lists are samples
- Facebook button label says "Follow our page" (no page name yet)
- "Get Started" and "Choose …" both just scroll the page – no checkout or contact form yet

### Not done / decided against
- **Login** – removed on purpose until there is a real backend for accounts
- **Extra pages / router** – single page by design (less to load)
- **Contact form** – not built; people reach us through the social icons
- **Not yet tested** on real phones, Safari or Firefox (only headless Chromium at 1280, 1440, 1920 and 390 px wide)

---

## How to change things

Almost everything is edited in **`src/data/site.js`** – no component changes needed.

| I want to… | Edit |
|---|---|
| Change hero text | `HERO` |
| Change About text / stats | `ABOUT.text`, `ABOUT.stats` |
| Change social links | `ABOUT.socials` (`id` must be `telegram`, `whatsapp`, `tiktok` or `facebook`) |
| Add a service | add an object to `SERVICES` (below) |
| Change prices | `PRICES` |
| Change nav items | `NAV` (each `id` must match a section `id`) |

**Add a service** – it becomes a clickable card automatically:

```js
{
  icon: "gift",                     // "calculator" or "gift" (add more in Services.jsx ICONS)
  title: "My New Service",
  text: "One or two sentences about it.",
  url: "https://example.com",
  cta: "Open Service",
  telegram: "https://t.me/xxxx",    // optional – shows a Telegram icon on the card
}
```

**Colours** are CSS variables at the top of `src/styles/global.css` (`:root`), matched to the logo:
orange `#ff6a00` (main) · dark orange `#e24d00` · ink `#141414` · white.

---

## Project structure

```
index.html                 page shell, fonts (Inter, Exo 2)
vite.config.js             Vite + React plugin
public/
  logo-mark.png            fox emblem (transparent) – hero + header
  logo.png                 full logo with wordmark
src/
  main.jsx                 entry
  App.jsx                  assembles the page + global hooks
  data/site.js             ALL content (see above)
  components/
    Header.jsx             nav, sliding pill, progress bar, mobile menu
    Hero.jsx               hero + mouse parallax loop
    PaperWave.jsx          orange layered wave (3 stacked SVGs)
    About.jsx              text, count-up stats, Connect with us
    Services.jsx           service cards
    Prices.jsx             plan cards
    Footer.jsx
    Reveal.jsx             wrapper that fades children in on scroll
    SocialIcons.jsx        inline SVG icons
  hooks/
    useActiveSection.js    which section is on screen (nav highlight)
    useReveal.js           scroll-reveal observer
    useOffscreenPause.js   pauses endless animations when off screen
  styles/global.css        all styling
```

---

## Performance notes

Animations had lagged, so these rules keep them smooth – please keep them when adding new effects:

- **Animate only `transform` and `opacity`** (GPU). Avoid animating `box-shadow`, `filter`, `width/height`.
- **No SVG filters or blurred `filter: drop-shadow` on moving elements.** The wave's shadow is drawn as static offset shapes for this reason.
- **Don't combine `mask` / `backdrop-filter` with an animated element.**
- Endless animations should live inside a `data-live` block so `useOffscreenPause` can pause them off screen.
- Everything respects `prefers-reduced-motion` (see the bottom of `global.css`).

Measured in headless Chromium (software rendering, 1440×900): hero idle, mouse-move and scroll all hold 60 fps (before the fix: 18 / 18 / 32 fps).

---

## Deployment

Vercel is connected to this repo: merging to `main` redeploys the live site. Build command `npm run build`, output `dist`.

## Workflow

Work happens on a branch and goes to `main` through a pull request:

| PR | What |
|---|---|
| #1 | Foundation: header, hero, About / Service / Prices, logo colours |
| #2 | First service: Premium Lot Calculator |
| #3 | Telegram icon on that service |
| #4 | Connect with us social icons (About) |
| #5 | `.lk` in black in the hero title |
| #6 | Second service: LY Sweet & Fancy House |
| #7 | Removed login, desktop UX fixes, animations |
| #8 | Animation lag fix (60 fps) |

## Roadmap ideas

- Real About story, stats and prices
- Contact section or floating WhatsApp button
- More services (just add to `SERVICES`)
- SEO basics: social share image, `sitemap`/`robots`, page title per section
- Real-device testing (iPhone Safari, Android Chrome, Firefox)
- Login/accounts only once a backend exists
