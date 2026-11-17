# Silverbyte Innovations — Website

The official website for **Silverbyte Innovations (Pty) Ltd**, a South African technology company that builds software and the automation that runs it.

**Live site:** [silverbyte.co.za](https://silverbyte.co.za)

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Tech Stack](#2-tech-stack)
- [3. Project Structure](#3-project-structure)
- [4. Local Development](#4-local-development)
- [5. Deployment](#5-deployment)
- [6. Editable Content — TODO Checklist](#6-editable-content--todo-checklist)
- [7. Content Reference — Where Everything Lives](#7-content-reference--where-everything-lives)
- [8. Theming](#8-theming)
- [9. Interactive Features](#9-interactive-features)
- [10. Accessibility](#10-accessibility)
- [11. Performance](#11-performance)
- [12. Legal and Compliance](#12-legal-and-compliance)
- [13. Browser Support](#13-browser-support)
- [14. Conventions](#14-conventions)
- [15. Troubleshooting](#15-troubleshooting)
- [16. License](#16-license)

---

## 1. Project Overview

This is a **single-page marketing site** with four supporting legal pages. It has no build step, no frameworks, and no server-side code. Everything is plain HTML, CSS, and vanilla JavaScript, served as-is by Netlify.

The site presents Silverbyte's core pitch — a working product plus the automation that keeps it running, with ongoing support — through:

- A **system boot sequence** on first load (1.4 seconds, skippable, session-once).
- A **live SVG system diagram** in the hero, with hover-preview, click-to-focus, and keyboard control.
- A **bento grid** of product surfaces, including a real code snippet and a mini workflow diagram.
- A **horizontal runbook timeline** paired with a **typewriter terminal** that streams a scripted run.
- A **CTA diagram** that echoes the hero and resolves to the contact node.

---

## 2. Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Markup | HTML5 | Semantic, no templating |
| Styles | Vanilla CSS | Custom properties, no preprocessor |
| Scripts | Vanilla JavaScript (ES5 IIFE) | No dependencies, no bundler |
| Display font | Space Grotesk | Loaded via Google Fonts |
| Body font | Inter | Loaded via Google Fonts |
| Mono font | JetBrains Mono | Loaded via Google Fonts |
| Hosting | Netlify | Connected to this GitHub repo |
| Analytics | **None** | Cookie-free by design (POPIA-friendly) |

There is **no build step**. Netlify serves the repo root as-is.

---

## 3. Project Structure

All files sit at the **repo root**. Netlify's publish directory is `/`.

```text
.
├── index.html              # The single-page site
├── styles.css              # All styles
├── script.js               # All interactivity
├── privacy.html            # POPIA privacy policy
├── paia.html               # PAIA manual
├── terms.html              # Terms of use
├── favicon.svg             # Chrome mark (SVG)
├── favicon-32.png          # PNG fallback
├── apple-touch-icon.png    # iOS home screen icon
├── og.png                  # 1200x630 social share image
├── site.webmanifest        # PWA manifest
├── robots.txt              # Crawler rules
├── sitemap.xml             # Sitemap
└── README.md               # This file
```

---

## 4. Local Development

### Quick preview

No install, no dependencies. Open `index.html` directly in a browser.

For a more accurate preview (correct relative paths, no `file://` quirks), run any static server from the project root:

```bash
# Python 3
python3 -m http.server 8080

# Node (via npx)
npx serve .
```

Then visit `http://localhost:8080`.

### Editing

Edit the files directly. There is no compile step. Refresh the browser to see changes.

---

## 5. Deployment

The site deploys automatically from GitHub via Netlify.

### How it works

1. Push to the `main` branch.
2. Netlify detects the push and redeploys.
3. The live site updates within ~30 seconds.

### Netlify settings (must match)

| Setting | Value |
| --- | --- |
| Build command | *(empty)* |
| Publish directory | `/` |
| Branch to deploy | `main` |

If the site shows "Page not found" after deploy, these settings are the first thing to check. See [section 15](#15-troubleshooting).

### Manual deploys

Avoid `netlify deploy --prod` on a Git-connected site. The next push to `main` will silently replace the manual deploy. Use `git push` instead.

---

## 6. Editable Content — TODO Checklist

Before launch, complete every item below. Each one is a real edit in a real file.

### 6.1 Personal and company details

| # | What to change | File | Current value | Replace with |
| --- | --- | --- | --- | --- |
| 1 | Information Officer surname | `privacy.html` | `[mokgata]` | My full surname |
| 2 | Information Officer surname | `paia.html` | `[Mokgata]` | My full surname |

### 6.2 Contact details

| # | What to change | File | Current value | Replace with |
| --- | --- | --- | --- | --- |
| 3 | Email address | `index.html` | `hello@silverbyte.co.za` | Your real domain email (appears 4 times) |
| 4 | Email fallback | `script.js` | `hello@silverbyte.co.za` | Your real domain email |
| 5 | Office location | `index.html` | `Centurion, Gauteng` | Your real city and province |
| 6 | Hours | `index.html` | `Mon–Fri · 9:00–18:00 SAST` | Your real business hours |
| 7 | Response window | `index.html` | `within 4h, business days` | Your real SLA |

### 6.3 Client names

| # | What to change | File | Current value | Replace with |
| --- | --- | --- | --- | --- |
| 8 | Logo strip | `index.html` | Six placeholders: `Northwind`, `Atlas & Co.`, `TERRAFORM`, `Cobalt Labs`, `Meridian`, `HELIOS` | Real client names (with permission), or remove the row |

### 6.4 Worked example copy

| # | What to change | File | Current value | Replace with |
| --- | --- | --- | --- | --- |
| 9 | Client name in bento tile | `index.html` | `Northwind` | Real client name or anonymized label |
| 10 | Client name in terminal script | `script.js` | `northwind` (inside `runScript`) | Match item 9 |
| 11 | Diagram `aria-label` | `index.html` | Mentions `northwind-commerce` | Match the actual example |

### 6.5 Statistics

| # | What to change | File | Current value | Replace with |
| --- | --- | --- | --- | --- |
| 12 | Hours saved | `index.html` | `+40 hrs/mo` and `data-count="40"` | Your real measured figure |
| 13 | Uptime | `index.html` | `99.97%` (two places) | Your real measured figure, or soften |
| 14 | Systems count | `index.html` | `nodes` 6, `flows` 7 | Match your real example |

### 6.6 Domain and URLs

| # | What to change | File | Current value | Replace with |
| --- | --- | --- | --- | --- |
| 15 | Canonical URL | `index.html` | `https://silverbyte.co.za/` | Your real domain |
| 16 | OG URLs | `index.html` | `https://silverbyte.co.za/` and `/og.png` | Your real domain |
| 17 | Twitter URLs | `index.html` | `https://silverbyte.co.za/og.png` | Your real domain |
| 18 | Canonical URL | `privacy.html` | `https://silverbyte.co.za/privacy.html` | Your real domain |
| 19 | Canonical URL | `paia.html` | `https://silverbyte.co.za/paia.html` | Your real domain |
| 20 | Canonical URL | `terms.html` | `https://silverbyte.co.za/terms.html` | Your real domain |
| 21 | Sitemap URL | `sitemap.xml` | `https://silverbyte.co.za/` | Your real domain |
| 22 | Robots sitemap URL | `robots.txt` | `https://silverbyte.co.za/sitemap.xml` | Your real domain |

### 6.7 Assets to create

| # | Asset | File | How to create |
| --- | --- | --- | --- |
| 23 | Social share image | `og.png` | Screenshot the hero at 1200x630, or design a minimal frame. Under 300 KB. |
| 24 | PNG favicon | `favicon-32.png` | Convert `favicon.svg` at 32x32 |
| 25 | Apple touch icon | `apple-touch-icon.png` | Convert `favicon.svg` at 180x180 |
| 26 | VAT number (optional) | `index.html` footer | Only if VAT-registered. Uncomment the placeholder line. |

### 6.8 Legal confirmations

| # | What to confirm | Action |
| --- | --- | --- |
| 27 | VAT registration status | Check SARS eFiling. If registered, uncomment the VAT line in the footer and add the number. If not, leave it commented. |
| 28 | Company income tax number | **Do not put `908246307` on the site.** It belongs on invoices, not the website. It is not a VAT number. |
| 29 | Client permissions | Confirm you have permission to name every client in the logo strip. If not, anonymize or remove. |

---

## 7. Content Reference — Where Everything Lives

This section tells you where to find each piece of content. Use it with the checklist above.

### 7.1 Navigation

**File:** `index.html`

```html
<nav class="nav">...</nav>
```

Links: `Platform`, `Solutions`, `Process`, `Contact`. Each has a `data-section` attribute that matches a section `id`.

### 7.2 Hero

**File:** `index.html`

- Headline: `<h1 class="hero-title">` with two lines (`build it.` / `run it.`)
- Kicker: `<div class="hero-kicker">`
- Supporting sentence: `<aside class="hero-side">` → `<p>`
- Spec list: `<div class="spec">` (scope, automation, support)
- Buttons: `<div class="hero-actions">`
- Stat callouts: `<div class="callout c1">` and `<div class="callout c2">`

### 7.3 System diagram

**File:** `index.html`

- Header: `<div class="diagram-head">` (title, node count, flow count, state)
- SVG: `<svg class="diagram-svg">`
- Nodes: six `<g class="dg-node" data-node="...">` groups
- Flow paths: `<path class="dg-flow" data-from="..." data-to="...">`
- Labels: `<text class="dg-label">`
- Packets (moving dots): `<circle class="packet pkt">`

> **Important:** if you rename a node, update the `data-node` attribute on the `<g>` group, the `data-from` / `data-to` attributes on every connected flow path, and the same attributes on every connected static line. Otherwise hover and focus highlighting will silently break.

### 7.4 Logo strip

**File:** `index.html`

```html
<section class="logos" id="company">
  <div class="logos-inner">
    <span class="logos-label">Trusted by</span>
    <div class="logo-row">
      <!-- six wordmarks here -->
    </div>
  </div>
</section>
```

### 7.5 Bento grid

**File:** `index.html`, `<div class="bento" id="solutions">`

| Tile | Class | Contains |
| --- | --- | --- |
| Worked example | `tile tile-wide` | Paragraphs + flow chips |
| Code snippet | `tile tile-code` | `reorder.workflow.ts` |
| Mini diagram | `tile tile-mini-diagram` | Small SVG + label |
| Stat | `tile tile-stat` | Count-up number |
| Status | `tile tile-status` | Support copy + uptime ticker |
| Automation layer | `tile tile-wide` (single row) | Four-row list |
| Stack | `tile` | Text |

### 7.6 Bridge strip

**File:** `index.html`, `<div class="bridge">`

A marquee of pipeline stages. The content is duplicated by `script.js` at runtime for a seamless loop, so you only edit the first copy in the HTML.

### 7.7 Runbook

**File:** `index.html`, `<section class="runbook" id="runbook">`

- Header: `<div class="runbook-head">`
- Run ID: `<b id="runId">` (auto-generated by `script.js`)
- Timeline nodes: four `<div class="rnode" data-step="0">` through `3`
- Terminal: `<div class="run-terminal">` (head, body, status)

The terminal's **scripted content** lives in `script.js`, in the `runScript` array.

### 7.8 CTA

**File:** `index.html`, `<section class="cta" id="contact">`

- Headline: `<h2>`
- Paragraph: `<p>`
- Primary and support buttons: `<div class="cta-actions">`
- Meta rows: `<div class="cta-meta">` (office, hours, response, copy)
- Diagram echo: `<div class="cta-diagram">` (SVG with contact node)

### 7.9 Footer

**File:** `index.html`, `<footer>`

- Wordmark
- Clock: `<span class="footer-clock">` with `id="footerClock"`
- Legal line: `<span class="footer-legal">` (copyright, reg number, Privacy/PAIA/Terms links)

### 7.10 Terminal script

**File:** `script.js`

```javascript
var runScript = [
  { step: 0, lines: [ /* ... */ ] },
  { step: 1, lines: [ /* ... */ ] },
  { step: 2, lines: [ /* ... */ ] },
  { step: 3, lines: [ /* ... */ ] }
];
```

Each line object has:

| Key | Type | Purpose |
| --- | --- | --- |
| `t` | string | Timestamp (e.g. `'00:00.12'`) |
| `txt` | string | The line text |
| `cls` | string | Optional class: `'t-ok'` green, `'t-warn'` yellow, `''` default |

If you change the diagram node names or the worked example client, update these strings to match, or the terminal will describe a system that no longer matches the diagram.

---

## 8. Theming

The site is dark by default with a light-mode toggle. All colors are CSS custom properties defined in `styles.css` under two selectors:

```css
[data-theme="dark"]  { /* dark tokens */  }
[data-theme="light"] { /* light tokens */ }
```

### Key tokens

| Token | Purpose |
| --- | --- |
| `--bg`, `--bg-elev`, `--bg-elev-2` | Background layers |
| `--border`, `--border-strong` | Hairlines |
| `--text`, `--text-dim`, `--text-faint` | Type hierarchy |
| `--chrome` | The metal gradient (the accent) |
| `--accent-line`, `--accent-text` | Accent for text and lines |
| `--accent-fill` | Accent fill (buttons, dots) |
| `--term-bg` | Terminal background (stays dark in both themes) |

### The chrome accent

The "silver" is a **material gradient**, not a flat color:

```css
--chrome: linear-gradient(135deg, #FBFBFC 0%, #C9CACE 28%, #8E8F95 52%, #E6E7EA 74%, #A8A9AD 100%);
```

A flat `#C0C0C0` would read as gray. The gradient is what makes it read as metal. In light mode, the same gradient shifts to a darker steel (`#5C5D63 → #4A4B50`) so it stays legible on the warm off-white background.

### Adding a theme

Add a new `[data-theme="name"]` block with the same token names. The toggle in `script.js` cycles between `dark` and `light`; extend it there if you add a third.

---

## 9. Interactive Features

All interactivity lives in `script.js`, inside a single IIFE. There is no framework, no router, no state library.

| Feature | Behavior | Notes |
| --- | --- | --- |
| Boot sequence | 1.4s system boot on first visit; skipped on refresh | Skippable by click / key / scroll / touch; session-once via `sessionStorage` (`sb-booted`) |
| Theme toggle | Dark ↔ light with a radial clip-path sweep | Choice persisted in `localStorage` (`sb-theme`) |
| Nav indicator | Underline slides to the active section on scroll | Hover previews without committing |
| Diagram hover | Dims unrelated flows, brightens connected ones | Non-destructive |
| Diagram focus | Click a node to lock focus; click empty space or `Esc` to release | Keyboard: `Tab` + `Enter` / `Space`; `aria-pressed` updated |
| Diagram parallax | Whole SVG shifts ~6px opposite the cursor | Disabled on touch |
| Cursor-aware packets | Packet speed responds to cursor proximity | Uses `data-base-dur` to preserve each packet's base speed |
| Scroll reveal | `.reveal` elements fade/translate in on first view | Per-section signature entrances (slide, terminal boot, path draw) |
| Magnetic buttons | Chrome CTAs pull ~6px toward the cursor | Disabled on touch |
| Stat count-up | `+40` counts from 0 when scrolled into view | One-shot |
| Uptime ticker | Status tile jitters around `99.97%` | Purely decorative |
| Bridge strip | Slow monospace marquee of the pipeline | Pauses on hover |
| Copy email | Copies the address with a `copied ✓` flash | Falls back to `execCommand` if Clipboard API is unavailable |
| Footer clock | SAST (UTC+2) timestamp, ticks every second | No DST offset needed |
| Runbook terminal | Streams a scripted four-step run with typewriter effect | Starts when the runbook section enters view |
| Re-run button | Replays the terminal sequence after completion | Spins the icon briefly |

### Reduced motion

Every animation is guarded by `prefers-reduced-motion: reduce`. When enabled:

- The boot is skipped entirely.
- Reveals appear instantly.
- The bridge marquee stops.
- Shimmer, pulses, and typewriter effects are suppressed.
- Diagram nodes and lines are shown in their final state.

If you add new animation, wrap it in the same guard.

---

## 10. Accessibility

- **Keyboard:** Diagram nodes are `tabindex="0"` with `role="button"` and `aria-pressed`. Enter / Space toggles focus; Escape releases it. The theme toggle and copy button are real `<button>` elements.
- **Labels:** Diagram has a descriptive `aria-label`. Icon-only buttons have `aria-label`.
- **Focus rings:** `:focus-visible` is styled on diagram nodes and interactive controls.
- **Reduced motion:** Fully respected (see section 9).
- **Color contrast:** Text tokens meet WCAG AA against their backgrounds in both themes. If you change tokens, verify contrast before shipping.
- **Semantics:** One `<h1>` per page; section headings are `<h2>`; legal pages use `<main>` with a heading hierarchy.

### Known gaps

- The terminal's typewriter output is visual. Screen readers read each line's text, not the per-character typing. The output is the same once complete.

---

## 11. Performance

The site is intentionally light:

- **No frameworks.** No React, no Vue, no jQuery.
- **No bundler.** Files are served as-is.
- **No analytics.** No third-party scripts at runtime.
- **One external request:** Google Fonts (three families, via a single CSS link).
- **SVG diagrams are inline.** No image requests for the hero or CTA diagrams.

### If you need to shave more

1. **Self-host the fonts.** Download the woff2 files, put them in `/fonts/`, and replace the Google Fonts `<link>` with `@font-face` rules. This removes the third-party request and improves first paint on slow connections.
2. **Preload the display font.** If you keep Google Fonts, add a `<link rel="preload">` for Space Grotesk 500 (the hero weight) to avoid a flash of fallback type.
3. **Audit the SVGs.** The hero diagram is ~14 KB of inline SVG. It's fine, but the flow paths could be simplified.

Run Lighthouse (Chrome DevTools → Lighthouse, mobile preset) before launch. Target: 90+ Performance, 100 Accessibility, 100 Best Practices.

---

## 12. Legal and Compliance

The site is built for a **South African private company (Pty) Ltd**, and includes the disclosures that requires.

### Companies Act

The footer displays the registered name and registration number:

```text
© 2025 Silverbyte Innovations (Pty) Ltd · Reg. K2026876216
```

This is required for a South African private company on its website. Do not remove it.

### POPIA

- **No cookies, no analytics.** The privacy policy states this plainly.
- **Privacy policy** (`privacy.html`) explains what is collected (email enquiries, server logs), why, how long it's kept, and how to exercise POPIA rights.
- **Information Officer** must be a named person. Replace `[Mokgata]` in `privacy.html` and `paia.html` before launch.
- **Cross-border transfer:** because there is no analytics, there is no cross-border transfer of personal information to disclose.

### PAIA

`paia.html` is the manual required under section 51 of the Promotion of Access to Information Act. It follows the standard structure and points requesters to Form 2 of the PAIA regulations.

### VAT

The footer includes a commented-out VAT line:

```html
<!-- VAT No. — add only after confirming VAT registration on SARS eFiling -->
```

Do **not** uncomment it until VAT registration is confirmed. The company income tax number (`908246307`) is **not** a VAT number and should not appear on the site. It belongs on invoices and SARS correspondence only.

### Client names

The logo strip uses placeholder client names. Before launch, either:

- Replace with real client names (with permission), or
- Replace the row with a softer line and remove the `logo-row` block.

Do not publish client names you don't have permission to use.

### Templates disclaimer

The legal pages are templates. They are structurally correct and POPIA-aligned, but they are not legal advice. If the company raises funding, signs enterprise clients, or handles sensitive personal information, have a commercial attorney review them.

---

## 13. Browser Support

- **Modern evergreen browsers:** Chrome, Edge, Firefox, Safari (last two versions).
- **CSS features used:** custom properties, `clamp()`, `color-mix()`, `mask-image`, `clip-path`, `backdrop-filter`, `IntersectionObserver`, `prefers-reduced-motion`, `prefers-color-scheme`.
- **JavaScript features used:** ES5 syntax throughout (no transpilation needed), plus `IntersectionObserver`, `requestAnimationFrame`, `navigator.clipboard` (with fallback).
- **No IE support.** The site uses CSS features IE doesn't implement and makes no attempt to polyfill them.

If you need to support older browsers, the two most likely breakages are `color-mix()` (used for the nav background) and `backdrop-filter` (used for the nav blur). Both degrade gracefully.

---

## 14. Conventions

If you're editing this repo, a few rules keep it consistent.

- **No frameworks.** Keep it vanilla. The site is deliberately dependency-free.
- **Tokens over literals.** Colors, radii, and easing curves are CSS custom properties. Don't hard-code hex values in components.
- **One accent.** The chrome gradient is the only accent. Don't introduce a second brand color.
- **Motion is opt-in.** Every animation must respect `prefers-reduced-motion`. If you add a new one, add the guard.
- **No emoji in content.** The site's register is technical and restrained. Emoji in UI copy breaks it.
- **No third-party scripts.** If you need analytics, use a cookie-free provider (Plausible, Fathom) and add it as a single `<script>` tag. Do not add a tag manager.
- **Comments explain *why*, not *what*.** The code is already readable. Comments should explain non-obvious decisions (e.g., why the terminal stays dark in light mode).

---

## 15. Troubleshooting

### "Page not found" on Netlify after deploy

This means Netlify isn't finding `index.html` where it expects it. Check, in order:

1. **Repo structure.** Is `index.html` at the repo root? If it's in a subfolder, set Netlify's **Publish directory** to that folder.
2. **Build settings.** In Netlify: **Project configuration → Build & deploy → Build settings**. Build command should be empty; publish directory should be `/` (or the subfolder).
3. **Deploy file explorer.** In Netlify: **Deploys → [latest deploy] → file explorer**. Confirm `index.html` is visible at the top level.
4. **Trigger a redeploy.** Push a trivial commit or click **Deploy site** in the Netlify UI.

### Boot sequence doesn't play

The boot is session-once. To replay it:

- Open a new tab, or
- Clear `sessionStorage` in DevTools → Application → Session Storage → `sb-booted`, or
- Open an incognito window.

If it doesn't play on a fresh session, check the browser console for a JS error.

### Theme doesn't persist

The theme is stored in `localStorage` under `sb-theme`. If it doesn't persist, check that `localStorage` is available (some privacy modes block it). The toggle still works; it just won't remember the choice.

### Diagram hover / focus doesn't highlight

The highlight logic reads `data-from` and `data-to` on each flow path, and `data-node` on each node group. If you renamed a node, update the path attributes to match or the highlighting will silently do nothing.

### Terminal doesn't start

The terminal starts when the runbook section enters the viewport (via `IntersectionObserver`, threshold `0.35`). If it doesn't start:

- Scroll the runbook section fully into view.
- Check the console for a JS error.
- If `IntersectionObserver` is unavailable (very old browser), the script falls back to `setTimeout(playRun, 600)` after load.

### Light mode looks washed out

The light theme uses a darker steel gradient for the chrome accent. If contrast feels weak in daylight, bump `--border-strong` from `0.24` to `0.32` and `--accent-line` from `0.55` to `0.65`. Test on a physical screen, not just DevTools.

### Legal page links return 404

The footer links use `.html` (e.g. `/privacy.html`). Confirm:

1. The files are named exactly `privacy.html`, `paia.html`, `terms.html`.
2. They sit at the repo root, not in a subfolder.
3. The links in the footer of every page match the filenames.

---

## 16. License

© 2025 Silverbyte Innovations (Pty) Ltd. All rights reserved.

The site's code, design, and content are proprietary. Do not reproduce or redistribute without permission.

Client names and logos (where present) are used with permission or in anonymized form.
