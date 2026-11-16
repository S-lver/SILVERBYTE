# Silverbyte Innovations — Website

The official website for **Silverbyte Innovations (Pty) Ltd** — a South African technology company that builds software and the automation that runs it.

**Live site:** [silverbyte.co.za](https://silverbyte.co.za)

---

## Table of contents

- [What this is](#what-this-is)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Content edits](#content-edits)
- [Theming](#theming)
- [Interactive features](#interactive-features)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Legal & compliance](#legal--compliance)
- [Browser support](#browser-support)
- [Conventions](#conventions)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## What this is

A single-page marketing site with four supporting legal pages. It presents Silverbyte's core pitch — **a working product plus the automation that keeps it running, with ongoing support** — through:

- A **system boot sequence** on first load (1.4s, skippable, session-once).
- A **live SVG system diagram** in the hero, with hover-preview, click-to-focus, and keyboard control.
- A **bento grid** of product surfaces, including a real code snippet and a mini workflow diagram.
- A **horizontal runbook timeline** paired with a **typewriter terminal** that streams a scripted run.
- A **CTA diagram** that echoes the hero and resolves to the contact node.

The site is deliberately **static**: no frameworks, no build step, no server-side code. Everything is plain HTML, CSS, and vanilla JavaScript.

---

## Tech stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Markup | HTML5 | Semantic, no templating |
| Styles | Vanilla CSS | Custom properties, no preprocessor |
| Scripts | Vanilla JS (ES5-compatible IIFE) | No dependencies, no bundler |
| Type | Space Grotesk (display), Inter (body), JetBrains Mono (mono) | Loaded via Google Fonts |
| Hosting | Netlify | Connected to this GitHub repo |
| Analytics | None | Cookie-free by design (POPIA-friendly) |

There is **no build step**. Netlify serves the repo root as-is.

---

## Project structure
.
├── index.html # The single-page site
├── styles.css # All styles (tokens, components, responsive, reduced-motion)
├── script.js # All interactivity (IIFE, no dependencies)
├── privacy.html # POPIA privacy policy
├── paia.html # PAIA manual (Companies Act requirement)
├── terms.html # Terms of use
├── favicon.svg # Chrome wordmark mark
├── favicon-32.png # PNG fallback
├── apple-touch-icon.png
├── og.png # 1200×630 social share image
├── site.webmanifest # PWA manifest
├── robots.txt
├── sitemap.xml
└── README.md

text

All files sit at the **repo root**. Netlify's publish directory is `/`.

---

## Getting started

### Local preview

No install, no dependencies. Just open `index.html` in a browser.

For a more accurate preview (correct relative paths, no `file://` quirks), run any static server from the project root:

```bash
# Python 3
python3 -m http.server 8080

# Node (if you have npx)
npx serve .
Then visit http://localhost:8080.

Editing
Edit the files directly. There is no compile step. Refresh the browser to see changes.

Deployment
The site deploys automatically from GitHub via Netlify.

How it works
Push to the main branch.

Netlify detects the push and redeploys.

The live site updates within ~30 seconds.

Netlify settings (must match)
Setting	Value
Build command	(empty)
Publish directory	/
Branch to deploy	main
If the site shows "Page not found" after deploy, these settings are the first thing to check — see Troubleshooting.

Manual deploys
Avoid netlify deploy --prod on a Git-connected site: the next push to main will silently replace the manual deploy. Use git push instead.

Content edits
Every user-facing string is in the HTML. The most commonly changed items:

Contact details
Search for hello@silverbyte.co.za — it appears in:

Hero primary CTA (mailto:)

CTA primary + support buttons (mailto:)

copyEmail button (data-email attribute)

CTA diagram contact node (mailto:)

script.js copy-to-clipboard fallback (search hello@silverbyte.co.za)

Also in index.html CTA meta:

Centurion, Gauteng — office

Mon–Fri · 9:00–18:00 SAST — hours

within 4h, business days — response

Client names (logo strip)
In index.html, the <div class="logo-row"> block contains six placeholder wordmarks (Northwind, Atlas & Co., TERRAFORM, Cobalt Labs, Meridian, HELIOS). Replace with real client names — or, if you don't have permission to name them, replace the row with a softer line and remove the logo-row block.

Worked example copy
The bento's wide tile references a fictional client (Northwind). If you rename the client, also update:

The runScript array in script.js (terminal lines mention northwind)

The SVG diagram's aria-label in index.html

Diagram labels
Node labels live in the SVG inside index.html:

Storefront, Inventory, AI triage, ERP sync, Handoff, Support

If you change these, update the corresponding data-node attributes and the data-from/data-to attributes on the flow paths, or the hover/focus highlighting will break.

Legal pages
In privacy.html and paia.html, replace [surname] with the full name of the Information Officer (required under POPIA).

Stats
+40 hrs/mo — hero callout, bento stat tile (data-count="40")

99.97% uptime — hero callout, status tile

12 systems — no longer on the site; the hero callout was replaced by +40 hrs/mo during the build

Replace with measured figures if you have them, or soften to ranges if you don't.

Theming
The site is dark by default with a light-mode toggle. All colors are CSS custom properties defined in styles.css under two selectors:

css
[data-theme="dark"] { /* dark tokens */ }
[data-theme="light"] { /* light tokens */ }
Key tokens
Token	Purpose
--bg, --bg-elev, --bg-elev-2	Background layers
--border, --border-strong	Hairlines
--text, --text-dim, --text-faint	Type hierarchy
--chrome	The metal gradient (accent)
--accent-line, --accent-text	Accent for text and lines
--accent-fill	Accent fill (buttons, dots)
--term-bg	Terminal background (stays dark in both themes)
Adding a theme
Add a new [data-theme="name"] block with the same token names. The toggle in script.js cycles between dark and light; extend it there if you add a third.

The chrome accent
The "silver" is a material gradient, not a flat color:

css
--chrome: linear-gradient(135deg, #FBFBFC 0%, #C9CACE 28%, #8E8F95 52%, #E6E7EA 74%, #A8A9AD 100%);
A flat #C0C0C0 would read as "gray." The gradient is what makes it read as metal. In light mode, the same gradient shifts to a darker steel (#5C5D63 → #4A4B50) so it stays legible on the warm off-white background.

Interactive features
All interactivity is in script.js, inside a single IIFE. There is no framework, no router, no state library.

Feature	Behavior	Notes
Boot sequence	1.4s system boot on first visit; skipped on refresh (sessionStorage)	Skippable by click/key/scroll/touch
Theme toggle	Dark ↔ light with a radial clip-path sweep	Choice persisted in localStorage (sb-theme)
Nav indicator	Underline slides to the active section on scroll	Hover previews without committing
Diagram hover	Dims unrelated flows, brightens connected ones	Non-destructive
Diagram focus	Click a node to lock focus; click empty space or Esc to release	Keyboard: Tab + Enter/Space; aria-pressed updated
Diagram parallax	Whole SVG shifts ~6px opposite the cursor	Disabled on touch
Cursor-aware packets	Packet speed responds to cursor proximity	Uses data-base-dur to preserve each packet's base speed
Scroll reveal	.reveal elements fade/translate in on first view	Per-section signature entrances (slide, terminal boot, path draw)
Magnetic buttons	Chrome CTAs pull ~6px toward the cursor	Disabled on touch
Stat count-up	+40 counts from 0 when scrolled into view	One-shot
Uptime ticker	Status tile jitters around 99.97%	Purely decorative
Bridge strip	Slow monospace marquee of the pipeline	Pauses on hover
Copy email	Copies hello@silverbyte.co.za with a copied ✓ flash	Falls back to execCommand if Clipboard API is unavailable
Footer clock	SAST (UTC+2) timestamp, ticks every second	No DST offset needed
Runbook terminal	Streams a scripted four-step run with typewriter effect	Starts when the runbook section enters view
Re-run button	Replays the terminal sequence after completion	Spins the icon briefly
Reduced motion
Every animation is guarded by prefers-reduced-motion: reduce. When enabled:

The boot is skipped entirely.

Reveals appear instantly.

The bridge marquee stops.

Shimmer, pulses, and typewriter effects are suppressed.

Diagram nodes and lines are shown in their final state.

If you add new animation, wrap it in the same guard.

Accessibility
Keyboard: Diagram nodes are tabindex="0" with role="button" and aria-pressed. Enter/Space toggles focus; Escape releases it. The theme toggle and copy button are real <button> elements.

Labels: Diagram has a descriptive aria-label. Icon-only buttons have aria-label. The copy button's feedback is visual only, but the copied state is announced via the button's existing label.

Focus rings: :focus-visible is styled on diagram nodes and interactive controls.

Reduced motion: Fully respected (see above).

Color contrast: Text tokens meet WCAG AA against their backgrounds in both themes. If you change tokens, verify contrast before shipping.

Semantics: One <h1> per page; section headings are <h2>; legal pages use <main> with a heading hierarchy.

Known gaps
The cookie banner has been removed, so there is no consent UI to test.

The terminal's typewriter output is visual; screen readers will read each line's text but not the per-character typing. This is intentional — the output is the same once complete.

Performance
The site is intentionally light:

No frameworks. No React, no Vue, no jQuery.

No bundler. Files are served as-is.

No analytics. No third-party scripts at runtime.

One external request: Google Fonts (three families, via a single CSS link).

SVG diagrams are inline. No image requests for the hero or CTA diagrams.

If you need to shave more
Self-host the fonts. Download the woff2 files, put them in /fonts/, and replace the Google Fonts <link> with @font-face rules. This removes the third-party request and improves first paint on slow connections.

Preload the display font. If you keep Google Fonts, add a <link rel="preload"> for Space Grotesk 500 (the hero weight) to avoid a flash of fallback type.

Audit the SVGs. The hero diagram is ~14KB of inline SVG. It's fine, but if you wanted to trim, the flow paths could be simplified.

Run Lighthouse (Chrome DevTools → Lighthouse, mobile preset) before launch. Target: 90+ Performance, 100 Accessibility, 100 Best Practices.

Legal & compliance
The site is built for a South African private company (Pty) Ltd, and includes the disclosures that requires.

Companies Act
The footer displays the registered name and registration number:

text
© 2025 Silverbyte Innovations (Pty) Ltd · Reg. K2026876216
This is required for a South African private company on its website. Do not remove it.

POPIA
No cookies, no analytics. The privacy policy states this plainly.

Privacy policy (privacy.html) explains what is collected (email enquiries, server logs), why, how long it's kept, and how to exercise POPIA rights.

Information Officer must be a named person. Replace [surname] in privacy.html and paia.html before launch.

Cross-border transfer: Because there is no analytics, there is no cross-border transfer of personal information to disclose.

PAIA
paia.html is the manual required under section 51 of the Promotion of Access to Information Act. It follows the standard structure and points requesters to Form 2 of the PAIA regulations.

VAT
The footer includes a commented-out VAT line:

html
<!-- VAT No. — add only after confirming VAT registration on SARS eFiling -->
Do not uncomment it until VAT registration is confirmed. The company income tax number (908246307) is not a VAT number and should not appear on the site — it belongs on invoices and SARS correspondence only.

Client names
The logo strip uses placeholder client names. Before launch, either:

Replace with real client names (with permission), or

Replace the row with a softer line and remove the logo-row block.

Do not publish client names you don't have permission to use.

Templates disclaimer
The legal pages are templates. They are structurally correct and POPIA-aligned, but they are not legal advice. If the company raises funding, signs enterprise clients, or handles sensitive personal information, have a commercial attorney review them.

Browser support
Modern evergreen browsers: Chrome, Edge, Firefox, Safari (last two versions).

CSS features used: custom properties, clamp(), color-mix(), mask-image, clip-path, backdrop-filter, IntersectionObserver, prefers-reduced-motion, prefers-color-scheme.

JavaScript features used: ES5 syntax throughout (no transpilation needed), plus IntersectionObserver, requestAnimationFrame, navigator.clipboard (with fallback).

No IE support. The site uses CSS features IE doesn't implement and makes no attempt to polyfill them.

If you need to support older browsers, the two most likely breakages are color-mix() (used for the nav background) and backdrop-filter (used for the nav blur). Both degrade gracefully — the nav falls back to its base color and loses the blur.

Conventions
If you're editing this repo, a few rules keep it consistent:

No frameworks. Keep it vanilla. The site is deliberately dependency-free.

Tokens over literals. Colors, radii, and easing curves are CSS custom properties. Don't hard-code hex values in components.

One accent. The chrome gradient is the only accent. Don't introduce a second brand color.

Motion is opt-in. Every animation must respect prefers-reduced-motion. If you add a new one, add the guard.

No emoji in content. The site's register is technical and restrained. Emoji in UI copy breaks it.

No third-party scripts. If you need analytics, use a cookie-free provider (Plausible, Fathom) and add it as a single <script> tag. Do not add a tag manager.

Comments explain why, not what. The code is already readable. Comments should explain non-obvious decisions (e.g., why the terminal stays dark in light mode).

Troubleshooting
"Page not found" on Netlify after deploy
This means Netlify isn't finding index.html where it expects it. Check, in order:

Repo structure. Is index.html at the repo root? If it's in a subfolder, set Netlify's Publish directory to that folder.

Build settings. In Netlify: Project configuration → Build & deploy → Build settings. Build command should be empty; publish directory should be / (or the subfolder).

Deploy file explorer. In Netlify: Deploys → [latest deploy] → file explorer. Confirm index.html is visible at the top level.

Trigger a redeploy. Push a trivial commit or click Deploy site in the Netlify UI.

Boot sequence doesn't play
The boot is session-once. To replay it:

Open a new tab, or

Clear sessionStorage in DevTools → Application → Session Storage → sb-booted, or

Open an incognito window.

If it doesn't play on a fresh session, check the browser console for a JS error. The boot is the first thing script.js runs.

Theme doesn't persist
The theme is stored in localStorage under sb-theme. If it doesn't persist, check that localStorage is available (some privacy modes block it). The toggle still works; it just won't remember the choice.

Diagram hover/focus doesn't highlight
The highlight logic reads data-from and data-to on each flow path, and data-node on each node group. If you renamed a node, update the path attributes to match or the highlighting will silently do nothing.

Terminal doesn't start
The terminal starts when the runbook section enters the viewport (via IntersectionObserver, threshold 0.35). If it doesn't start:

Scroll the runbook section fully into view.

Check the console for a JS error.

If IntersectionObserver is unavailable (very old browser), the script falls back to setTimeout(playRun, 600) after load.

Light mode looks washed out
The light theme uses a darker steel gradient for the chrome accent (see [data-theme="light"] in styles.css). If contrast feels weak in daylight, bump --border-strong from 0.24 to 0.32 and --accent-line from 0.55 to 0.65. Test on a physical screen, not just DevTools.

License
© 2025 Silverbyte Innovations (Pty) Ltd. All rights reserved.

The site's code, design, and content are proprietary. Do not reproduce or redistribute without permission.

Client names and logos (where present) are used with permission or in anonymized form.

text

### Notes on the README

- **It's written for the person maintaining the site**, not for visitors. The tone is direct and practical.
- **The troubleshooting section is the most valuable part** — it covers the exact "Page not found" issue you hit, plus the sessionStorage quirk with the boot, the theme persistence, and the diagram-rename gotcha.
- **The legal section is explicit about what not to do** — don't remove the reg number, don't uncomment VAT until confirmed, don't publish client names without permission, and the tax number stays off the site.
- **The conventions section** is short on purpose. It's there so future-you (or a collaborator) doesn't accidentally introduce a framework, a second accent color, or a third-party script.
- **It documents the removal of GA** in the tech stack table (`Analytics | None | Cookie-free by design`) so the decision is recorded, not just the current state.

Save it as `README.md` in the repo root. GitHub will render it on the repo homepage automatically.
