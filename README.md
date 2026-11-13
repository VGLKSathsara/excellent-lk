# Excellent.lk – website foundation

Single-page React (Vite) site. Navigation scrolls between sections (HOME | ABOUT | SERVICE | PRICES) – no extra pages, so nothing extra to load. Login opens as a popup.

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
  components/      Header, Hero, PaperWave, About, Services, Prices, Footer, LoginModal
  hooks/           useActiveSection (highlights current nav item)
  styles/global.css  colour tokens at the top (:root)
```

## Brand colours (from the logo)

- Orange `#ff6a00` (main), darker `#e24d00`
- Ink/black `#141414`
- White `#ffffff`

## Next steps

- Replace placeholder text and prices in `src/data/site.js`
- Connect real auth in `LoginModal.jsx` (`handleSubmit`)
- Add a contact section / WhatsApp button, then split into routes only if needed
