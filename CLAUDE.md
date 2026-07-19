# Claude Code — Handoff & Working Guide

This document orients Claude Code (or any AI coding assistant) to this
repository so it can make safe, consistent changes without re-deriving the
architecture each time. Read this before editing.

---

## What this project is

A **no-build baby shower website** meant to be reused as a GitHub template. All
user-editable content and theme live in **`config.js`**; `index.html` holds the
markup and engine. There is no bundler, no framework, no package.json, and no
dependencies beyond two Google Fonts loaded via `<link>`.

The design goal is **modularity for non-technical users**: content and theme
are fully separated from markup and logic, so a person who has never written
code can customize the entire site by editing **one file, `config.js`**.

## Architecture in one screen

Two files:

- **`config.js`** — the single source of everything editable. Defines one global
  `window.CONFIG` object: content (strings, dates, `registries`, `photos`, RSVP
  fields) plus a nested **`theme`** block (palette, fonts, radius/spacing, hero
  image, hero background, and the hero text `heroPanel` fill).

- **`index.html`** — four parts, top to bottom:
  1. **`<head>`** — loads `config.js` first; then a static `<title>` +
     `description` (fallbacks), a **static `robots: noindex, nofollow`** tag, and
     a static emoji **favicon**; then a **metadata injector** script that builds
     `<title>`, description, canonical, Open Graph, and Twitter Card tags from
     `CONFIG.title`/`description`/`meta`; then the font `<link>`; then a
     `<style>` block whose `:root` holds **theme *fallbacks*** (used only for the
     split second before config applies, or if it fails to load); then a small
     inline **theme-applier** script that maps `CONFIG.theme.*` onto the CSS
     custom properties (`--bg`, `--accent`, `--hero-bg`, `--hero-panel`, …) on
     `document.documentElement`. The head scripts run before the body paints.
  2. **`<body>` markup** — static skeleton with empty elements. Text nodes carry
     a `data-bind="key"` attribute; lists (registry, gallery) are empty
     containers filled at runtime.
  3. **ENGINE** (bottom `<script>`, an IIFE) — reads `window.CONFIG` and
     populates the DOM: fills `data-bind` nodes, computes the countdown, wires
     the RSVP button, builds the registry grid, builds/hides the gallery, and
     generates the `.ics` calendar file as an in-browser Blob. (It no longer
     touches `<title>`/meta — the head injector owns those.)

Data flows one way: **config.js → theme-applier + ENGINE → DOM.** Nothing writes
back to CONFIG.

There is one secondary page, **`cash_fund/index.html`** (opened by the
"Cash Fund" registry button), which repeats the same architecture in
miniature: all of its content lives in **`cash_fund_config.js`** at the repo
root (`window.CASH_FUND_CONFIG` — page text plus a `methods` array of payment
apps: `name`, `icon`, `handle`, `url`, `qr`, `note`), while its **theme is
inherited** from `CONFIG.theme` — the page loads both `../config.js` and
`../cash_fund_config.js` and runs the same theme-applier map, so the two pages
always match. Optional QR code images live in the `cash_fund/` folder and are
referenced by file name in each method's `qr` field. Every method field except
`name` is optional; empty fields don't render (Zelle typically has a `handle`
but no `url`). Its `robots: noindex` tag is static for the same privacy reason
as the main page (it shows payment handles), and the "Copy" button falls back
to `document.execCommand("copy")` because `navigator.clipboard` is unavailable
over `file://`.

`config.js` is loaded with a plain `<script src>` tag (NOT `fetch`), which is
why the site still works from `file://` (double-click) as well as over http.

## The golden rule

**Content and theme changes go in `config.js` — never in the markup or engine.**
If a user asks to change wording, dates, links, colors, fonts, or the hero image,
edit `config.js` only. The `:root` block in `index.html` is a fallback mirror;
don't send users there to change the look. Touch markup/engine only when adding a
genuinely new *type* of feature (a new section, a new interactive behavior).

## How to make common changes

- **New content field (text):** add a key to `CONFIG` in `config.js`, add an
  element with a matching `data-bind="key"` in the markup. The engine fills it
  automatically — no engine edit needed.
- **New registry item / photo:** these are data-driven. Add an object to the
  `registries` or `photos` array in `config.js`. Do not touch markup or engine.
- **Cash fund page (payment apps / handles / QR codes):** data-driven too — edit
  the `methods` array in `cash_fund_config.js` (and drop QR images in
  `cash_fund/`). Do not touch `cash_fund/index.html`.
- **Footer mini-game (runner art / obstacles / speed / jump / text color /
  button label):** edit `game_config.js` (`window.GAME_CONFIG`; player +
  obstacles accept an emoji or an image path; `textColor` colors the in-game
  score/game-over text; `button.emoji` + `button.text` set the "Play a game"
  button label). Every key is optional — the engine has built-in defaults.
  `config.js` → `gameButton` remains the on/off switch (`""` removes the
  game) and the fallback label when `button` is empty. Don't touch the
  engine for tuning.
- **New button in the event section:** add markup inside `.event__actions`
  (reuse `.btn` + `.btn--solid` / `.btn--ghost`), add config fields, and add a
  small wiring block in the engine near the RSVP block (step "2b").
- **New whole section:** add a `<section>` (wrap contents in `.wrap`), separate
  it with `<hr class="divider" />`, style with existing tokens, and drive any
  dynamic content from `config.js` via `data-bind` or a new engine block.
- **New theme token:** add a key to `CONFIG.theme`, add a matching entry to the
  `map` in the `<head>` theme-applier (e.g. `myToken: "--my-token"`), consume
  `var(--my-token)` in the CSS, and add a `:root` fallback. The `heroImage` /
  `heroBg` / `heroPanel` keys are handled specially in the applier (not via the
  plain `map`) — follow that pattern for tokens that build a composite value or
  toggle a class.
- **Theme / rebrand:** edit `CONFIG.theme` in `config.js`. Palette is 6 named
  colors; the two fonts are `fontDisplay` / `fontBody` (also update the `<head>`
  font `<link>` if swapping the actual typefaces). Hero background is `heroImage`
  (auto dark overlay) or `heroBg` (raw CSS override); `heroPanel` is a fill color
  behind the hero text for legibility. Keep the `:root` fallbacks in `index.html`
  in sync if you rename or add tokens.
- **Sharing / SEO metadata:** lives in `CONFIG.meta` (`siteUrl`, `shareImage`,
  `shareImageAlt`, `favicon`); og/twitter title+description reuse `CONFIG.title` /
  `CONFIG.description`. The head **metadata injector** turns these into tags at
  runtime. **Caveat:** non-rendering social scrapers (Facebook, iMessage, Slack,
  WhatsApp, X) don't run JS, so injected `og:*`/`twitter:*` tags won't appear in
  their previews (Google/Bing render JS and will). To make chat previews work,
  promote those tags to **static** tags in `<head>` with literal values. The
  `robots noindex` tag and the favicon are intentionally **static** already (see
  Conventions) — do not move them into the injector alone.

## Conventions to preserve

- **No build step.** Keep it static files that work when `index.html` is opened
  via `file://` (double-click). Do not introduce a bundler, npm deps, or a
  framework. **Load config as a `<script src>` tag, never via `fetch`/`import`** —
  `fetch` of a local file is blocked over `file://` and would break double-click
  preview. This is why `config.js` assigns `window.CONFIG` rather than being a
  JSON file or an ES module.
- **No browser storage.** Do not use `localStorage` / `sessionStorage`.
- **Colors and type come from variables.** Never hard-code a hex value in a
  component rule; add or reuse a `--token` (and drive it from `CONFIG.theme`).
  (A few intentional exceptions exist, e.g. the dark text-on-gold button color —
  match that pattern if extending.)
- **Accessibility floor:** every interactive element needs a visible
  `:focus-visible` outline; images need `alt`; the `prefers-reduced-motion`
  block must keep working. External links use `target="_blank"` +
  `rel="noopener noreferrer"`; `mailto:` links stay in the same tab.
- **Graceful empties.** Empty arrays hide their section (see the gallery and
  RSVP logic). Preserve this when adding data-driven pieces.
- **CSS specificity:** styles are single-class selectors by design. Keep it that
  way to avoid the section/element specificity clashes on padding and margins.
- **Privacy floor stays static.** The `robots: noindex, nofollow` tag is
  hardcoded in `<head>`, not JS-injected — the page shows names + a home address
  and must not be indexed even if the engine fails to run. Keep it static (and
  static-first) if you touch metadata. Don't add trackers or collect personal
  data (RSVP is a link out).

## Verifying changes

There is no test suite. Validate visually:

1. Open `index.html` in a browser (or render headless with Playwright/Chromium)
   and confirm all four sections display, the theme colors from `config.js`
   applied (no flash of fallback colors), and the countdown shows a number.
2. Click **Add to calendar** → an `.ics` downloads. Click **RSVP** → opens the
   configured link (or mail client for `mailto:`).
3. Check a narrow viewport (~380px) — the layout should collapse to one column
   and the registry grid should reflow.
4. Confirm no console errors (a common one: `config.js` syntax error, which
   leaves the page on fallbacks — run `node --check config.js`).
5. Metadata: in DevTools **Elements → `<head>`**, confirm the injector added
   `link[rel=canonical]`, `og:*`, `twitter:*`, and the emoji favicon, and that
   **View-source** shows the static `robots noindex` + favicon without JS.

## Deployment

`.github/workflows/deploy.yml` publishes the repo to GitHub Pages on every push
to `main` (no build — it uploads the repo as-is). The repo owner must set
**Settings → Pages → Source = GitHub Actions** once. Don't add a build step to
this workflow; the site is already static.

## Files

```
config.js                     # ALL editable content + theme (window.CONFIG)
index.html                    # markup, :root fallbacks, theme-applier, engine
game_config.js                # settings for the footer mini-game (window.GAME_CONFIG; optional)
cash_fund_config.js           # editable content for the cash fund page (window.CASH_FUND_CONFIG)
cash_fund/index.html          # cash fund page (same architecture; theme inherited from config.js)
cash_fund/                    # also holds the user's QR code images (+ a README for them)
images/                       # user photos (referenced from CONFIG.photos / theme)
rsvp-apps-script.gs           # OPTIONAL Google Apps Script backend for RSVPs (user pastes into their own Sheet)
.github/workflows/deploy.yml  # Pages deploy (no build)
README.md                     # end-user customization guide
CLAUDE.md                     # this file
LICENSE                       # MIT
```

## RSVP modes

The RSVP button has three modes, chosen by config (engine step "2b"):
- **`rsvpEndpoint` set** — the button opens an on-page `<dialog>` form (name +
  number attending). Submit does a `fetch` POST (`mode:"no-cors"`,
  `text/plain` body so there's no CORS preflight) to a Google Apps Script Web
  App the user deploys against their **own** Google Sheet (see
  `rsvp-apps-script.gs`). No backend lives in *this* repo; the site stays
  static and `file://`-openable. `rsvpEndpoint` takes priority over `rsvpUrl`.
- **`rsvpUrl` set** (endpoint empty) — classic link-out (web URL or `mailto:`).
- **neither set** — the button is removed.
This is an **opt-in** feature: the template ships with `rsvpEndpoint: ""`, so
the default is still link-out and no personal data is collected unless the
owner deliberately wires up their sheet.

## Out of scope / do not do

- Don't add a backend, database, or server **to this repo**. The optional RSVP
  form posts to a user-owned Google Apps Script endpoint (see "RSVP modes"),
  which lives outside the repo — that's the only sanctioned data sink. Keep the
  site itself static and `file://`-openable.
- Don't collect or store personal data in the page beyond the opt-in RSVP form,
  and never persist it in browser storage.
- Don't reproduce copyrighted images or fonts without a proper license; the
  bundled fonts are Google Fonts (open license).
