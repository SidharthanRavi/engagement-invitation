# Sidharthan ♥ Suma Bala — Engagement Invitation

A mobile-first, 2.5D parallax invitation. Pure HTML + CSS + JavaScript — no frameworks, no build step, no CDN scripts (only Google Fonts, with graceful fallbacks). **Just open `index.html`.**

```
/index.html
/css/style.css
/js/script.js            ← all editable content lives in the CONFIG object at the top
/assets/img/             ← (empty) drop WebP/SVG images here if you add any
/assets/svg/kolam.svg    ← kolam border tile, favicon.svg
/assets/audio/           ← put music.mp3 here
```

## Editing details
Open `js/script.js` and edit `CONFIG` (top of file): names, date/time, venue, map link, story captions, flight/boarding-pass text, music path, WhatsApp number for RSVPs, and sample wishes.

- Date `"2026-11-29"`; leave `time` as `""` for an all-day event, or set `"HH:MM"` (24h, IST by default) to drive the countdown and the `.ics` file.
- `whatsappNumber`: digits with country code, e.g. `"919876543210"`. If empty, WhatsApp lets the guest pick a contact.
- If you change names or the date, also update `<title>` and the `<meta>` tags in `index.html` (search engines/link previews read those, not the JS).

## Swapping images / characters
The couple, burger, fries, plane, diyas and garlands are hand-built SVG, so there are no heavy images (total payload is well under 1 MB). To use your own artwork:
1. Export Pixar-style renders as **WebP** (≤ 200 KB each) into `/assets/img/`.
2. Replace a character: in `index.html` find the element with `data-char="bride"` / `data-char="groom"` and put an `<img src="assets/img/bride.webp" alt="…" loading="lazy">` inside it (remove `data-char` so the SVG isn't injected).
3. Replace a backdrop: swap the `.skyline` / `.mandap` SVG blocks for `<img>` tags inside the same `.layer`.

## Placeholder assets to replace (optional)
| Asset | Where | Notes |
|---|---|---|
| Music | `assets/audio/music.mp3` | Missing file → a soft built-in synthesized melody plays instead |
| Couple illustrations | inline SVG (`characterSVG()` in script.js) | Replace with your 3D renders (see above) |
| Burger sign text | `CONFIG.story.burgerSign` | Generic sign — not a trademarked logo |
| Favicon / kolam | `assets/svg/` | Swap freely |
| Link-preview image | add `<meta property="og:image">` in index.html | 1200×630 JPG/WebP |
| WhatsApp number | `CONFIG.whatsappNumber` | Currently empty |

## Features & notes
- **Parallax:** every scene has 4–6 `.layer`s with `data-depth` (small = far/slow, large = near/fast). Only `transform`/`opacity` are animated. The story scene is pinned with `position: sticky` and driven by scroll progress.
- **Touch-drag + tilt:** drag horizontally on touch devices; tap the tilt button (top-right, touch devices only) to enable device tilt. iOS 13+ shows a permission prompt (must be triggered by a tap — it is). If tilt is unavailable/denied it falls back to scroll + drag.
- **Audio:** off by default; the mute button starts playback from a tap, satisfying iOS autoplay rules.
- **Wishes:** stored in the visitor's own `localStorage` — they are visible only on that device (no server).
- **Reduced motion:** `prefers-reduced-motion` disables parallax, falling petals and looping animations.

## Run locally
Double-click `index.html`, or serve the folder: `python -m http.server 8080` → http://localhost:8080

## Deploy
**Netlify:** drag the whole folder onto https://app.netlify.com/drop (or connect the repo; build command empty, publish directory `.`).

**GitHub Pages:** push to a repo → *Settings → Pages* → Source: *Deploy from a branch* → `main` / `(root)`. Your site will be at `https://<user>.github.io/<repo>/`.

Then paste the live URL into WhatsApp — the "Share on WhatsApp" button already includes it.
