# Excellent.lk – website foundation

Single-page React (Vite) site. Navigation scrolls between sections (HOME | ABOUT | SERVICE | PRICES) – no extra pages, so nothing extra to load. 

## Run

```bash
npm install
npm run dev      # development
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Structure

```
public/            logo-mark.png, logo.png (transparent, cropped)
src/
  data/site.js     all text/content (edit here first)
  components/      Header, Hero, PaperWave, About, Services, Prices, Footer, Reveal, SocialIcons
  hooks/           useActiveSection (current nav item), useReveal (scroll animations)
  styles/global.css  colour tokens at the top (:root)
```

## Brand colours (from the logo)

- Orange `#ff6a00` (main), darker `#e24d00`
- Ink/black `#141414`
- White `#ffffff`

## Next steps

- Replace placeholder text and prices in `src/data/site.js`
- Add login later only when there is a real backend for it (the popup was removed for now)
- Add a contact section / WhatsApp button, then split into routes only if needed
