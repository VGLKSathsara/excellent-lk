# Excellent.lk

Official website of **Excellent.lk** – a growing Sri Lankan digital brand. This repo is the **foundation** of the site: a fast, single-page React app that lists our services and links to them.

- **Live site:** https://vexlorlk.vercel.app (auto-deploys from `main` on Vercel)
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
| **Hero** | Staggered entrance, floating fox logo with mouse parallax (desktop), orange paper-cut wave, static decorative rings, scroll-down hint |
| **About** | Intro text, animated stats, **Connect with us** icon buttons (Telegram, WhatsApp, TikTok, Facebook) |
| **Service** | Clickable service cards that open in a new tab (see [Services](#services-live)) |
| **Prices** | **Trade Tool Set** price list: Starter $1.99 (Chart Skin Pro only), Standard $8.99 (one market, lifetime), Popular $9.99 (both markets, 30 days), Pro Bundle $14.99 (featured, both markets lifetime, with a toggleable year-end offer), each with ✓ / – features; CTAs scroll to the contact icons |
| **Footer** | Brand + tagline, quick nav links, social icons, copyright and a "Back to top" link |
| **Floating contact** | A persistent WhatsApp button (bottom-right, all sections) for a one-tap way to reach us |
| **SEO basics** | `robots.txt`, `sitemap.xml`, canonical link, a dedicated 1200×630 social share image, `Organization` structured data (JSON-LD), a real favicon/app-icon set and web manifest |
| **Animation** | Scroll reveal, count-up numbers, hover effects – all pause off-screen and switch off for `prefers-reduced-motion` |
| **Performance** | Measured at 60 fps in a headless test browser (see [Performance](#performance-notes)) |

### Services (live)
1. **Premium Lot Calculator** – trading workspace (position sizing, journal, wallet tracking). Telegram channel icon on the card.
   https://lost-size-calculator-frontend.vercel.app
2. **LY Sweet & Fancy House** – sweets, pooja items, toys and gifts shop in Kataragama, orders via WhatsApp.
   https://l-y-sweet-house.vercel.app/
3. **Kadadev Sadaluva** – guesthouse and event venue in Kataragama New Town (rooms, halls, jeep safaris).
   https://kadadev-sadaluva.vercel.app/

### Still placeholder (needs real content)
- About text and the stats (`100+ Projects`, `50+ Clients`, `24/7 Support`) in `src/data/site.js`
- Facebook button label says "Follow our page" (no page name yet)
- "Get Started" and plan CTAs both just scroll to the contact icons – no checkout or contact form yet

### Not done / decided against
- **Login** – removed on purpose until there is a real backend for accounts
- **Extra pages / router** – single page by design (less to load)
- **Contact form** – not built; people reach us through the social icons and the floating WhatsApp button
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
| Change prices / plans | `PRICING` (title + plans; each feature is `{ label, included, note? }`) |
| Change nav items | `NAV` (each `id` must match a section `id`) |

**Add a service** – it becomes a clickable card automatically:

```js
{
  icon: "gift",                     // "calculator", "gift" or "stay" (add more in Services.jsx ICONS)
  title: "My New Service",
  text: "One or two sentences about it.",
  url: "https://example.com",
  cta: "Open Service",
  telegram: "https://t.me/xxxx",    // optional – shows a Telegram icon on the card
}
```

**Colours** are CSS variables at the top of `src/styles/global.css` (`:root`), matched to the logo:
orange `#ff6a00` (main) · dark orange `#e24d00` · ink `#141414` · white.

**Updating the favicon / app icons / social share image** – all generated from `public/logo-mark.png` and `public/logo.png` with Pillow (not a build step, just run once and commit the output):
```python
from PIL import Image
src = Image.open("public/logo-mark.png").convert("RGBA")
# pad to a square canvas on white, resize to each size, save favicon.ico / icon-192.png /
# icon-512.png / apple-touch-icon.png; see git history of this file for the exact script.
```
If the logo changes, regenerate `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` and `social-share.png` the same way and keep their dimensions (180×180, 192×192, 512×512, 1200×630) unchanged so `index.html` and `site.webmanifest` don't need edits.

---

## Project structure

```
index.html                 page shell, fonts (Inter, Exo 2)
vite.config.js             Vite + React plugin
public/
  logo-mark.png            fox emblem (transparent) – hero + header
  logo.png                 full logo with wordmark
  social-share.png         1200×630 Open Graph / Twitter card image
  favicon.ico              16/32/48/256 multi-size favicon
  apple-touch-icon.png     180×180 icon for iOS home screen
  icon-192.png, icon-512.png  PWA/manifest icons
  site.webmanifest         web app manifest (name, icons, theme color)
  robots.txt, sitemap.xml  crawler directives + the one indexed URL
  googlef61b22950cb6cbb6.html  Google Search Console ownership proof
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
    Footer.jsx             brand, quick links, socials, back-to-top
    FloatingWhatsApp.jsx   persistent WhatsApp contact button
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
| #10 | Removed stray orbiting dot from the hero |
| #11 | Hero corner text now "Sri Lanka"; new Trade Tool Set price list |
| #12 | Third service: Kadadev Sadaluva |
| #13 | Richer footer (quick links + socials + back-to-top), floating WhatsApp button, SEO basics (`robots.txt`, `sitemap.xml`, canonical + social image tags) |
| #14 | Google Search Console ownership file |
| #15 | Pro-level SEO: real favicon/app-icon set, web manifest, dedicated social share image, `Organization` structured data (JSON-LD), Apple/PWA meta tags |
| #16 | New "Standard" plan ($8.99, one market, lifetime); Popular's calculator changed from "Forex OR Crypto" to "Forex AND Crypto" (both markets, 30 days); pricing grid is now 4-up on desktop |
| #17 | Richer footer, floating WhatsApp button, SEO basics |
| #18 | Pro-level SEO: real icon set, manifest, social card, structured data |
| #19 | Added Standard plan; Popular bundles both markets |
| #20 | "Paper and ember" premium redesign: warm paper-toned palette tied to the hero's paper-cut wave, locked brand orange + an espresso-ink dark; About rebuilt as a quiet intro + inline stat strip; Services rebuilt as a dark editorial showcase with bespoke per-venture SVG motifs (chart line, sweets, guesthouse gate); Pricing chrome decluttered (dropped the all-caps eyebrow/tier labels, recolored to match); Header/Footer retoned; removed a large amount of now-dead CSS left over from the old card-grid system |

## Roadmap ideas

- Real About story and stats
- Contact section / contact form
- More services (just add to `SERVICES`)
- Real-device testing (iPhone Safari, Android Chrome, Firefox)
- Login/accounts only once a backend exists
