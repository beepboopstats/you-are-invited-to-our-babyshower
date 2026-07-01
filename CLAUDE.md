# Claude Code — Handoff & Working Guide

This document orients Claude Code (or any AI coding assistant) to this
repository so it can make safe, consistent changes without re-deriving the
architecture each time. Read this before editing.

---

## What this project is

A **single-file, no-build baby shower website** meant to be reused as a GitHub
template. The entire site is `index.html`. There is no bundler, no framework,
no package.json, and no dependencies beyond two Google Fonts loaded via `<link>`.

The design goal is **modularity for non-technical users**: content and theme
are fully separated from markup and logic, so a person who has never written
code can customize the site by editing two clearly-marked blocks.

## Architecture in one screen

`index.html` has four parts, top to bottom:

1. **`<head>` + `<style>`** — a `:root` block of CSS custom properties (the
   entire theme: palette, fonts, radius, spacing, hero background) followed by
   component styles that consume only those variables.
2. **`<body>` markup** — static skeleton with empty elements. Text nodes carry
   a `data-bind="key"` attribute; lists (registry, gallery) are empty
   containers filled at runtime.
3. **`CONFIG` object** (bottom `<script>`) — the single source of content:
   strings, dates, the `registries` array, the `photos` array, and RSVP fields.
4. **ENGINE** (same script, IIFE below CONFIG) — reads CONFIG and populates the
   DOM: fills `data-bind` nodes, computes the countdown, wires the RSVP button,
   builds the registry grid, builds/hides the gallery, and generates the
   `.ics` calendar file as an in-browser Blob.

Data flows one way: **CONFIG → ENGINE → DOM**. Nothing writes back to CONFIG.

## The golden rule

**Content and theme changes go in CONFIG or `:root` — never in the markup or
engine.** If a user asks to change wording, dates, links, colors, or fonts,
edit only those two blocks. Touch markup/engine only when adding a genuinely
new *type* of feature (a new section, a new interactive behavior).

## How to make common changes

- **New content field (text):** add a key to CONFIG, add an element with a
  matching `data-bind="key"` in the markup. The engine fills it automatically —
  no engine edit needed.
- **New registry item / photo:** these are data-driven. Add an object to the
  `registries` or `photos` array in CONFIG. Do not touch markup or engine.
- **New button in the event section:** add markup inside `.event__actions`
  (reuse `.btn` + `.btn--solid` / `.btn--ghost`), add config fields, and add a
  small wiring block in the engine near the RSVP block (step "2b").
- **New whole section:** add a `<section>` (wrap contents in `.wrap`), separate
  it with `<hr class="divider" />`, style with existing tokens, and drive any
  dynamic content from CONFIG via `data-bind` or a new engine block.
- **Theme / rebrand:** edit `:root` only. Palette is 6 named colors; the two
  fonts are `--font-display` and `--font-body` (also update the `<head>` font
  `<link>` if swapping the actual typefaces). Hero background is `--hero-bg`.

## Conventions to preserve

- **No build step.** Keep it a single static file that works when opened via
  `file://` (double-click). Do not introduce a bundler, npm deps, or a
  framework. Do not fetch external JSON at runtime — that breaks `file://`.
- **No browser storage.** Do not use `localStorage` / `sessionStorage`.
- **Colors and type come from variables.** Never hard-code a hex value in a
  component rule; add or reuse a `--token`. (A few intentional exceptions exist,
  e.g. the dark text-on-gold button color — match that pattern if extending.)
- **Accessibility floor:** every interactive element needs a visible
  `:focus-visible` outline; images need `alt`; the `prefers-reduced-motion`
  block must keep working. External links use `target="_blank"` +
  `rel="noopener noreferrer"`; `mailto:` links stay in the same tab.
- **Graceful empties.** Empty arrays hide their section (see the gallery and
  RSVP logic). Preserve this when adding data-driven pieces.
- **CSS specificity:** styles are single-class selectors by design. Keep it that
  way to avoid the section/element specificity clashes on padding and margins.

## Verifying changes

There is no test suite. Validate visually:

1. Open `index.html` in a browser (or render headless with Playwright/Chromium)
   and confirm all four sections display and the countdown shows a number.
2. Click **Add to calendar** → an `.ics` downloads. Click **RSVP** → opens the
   configured link (or mail client for `mailto:`).
3. Check a narrow viewport (~380px) — the layout should collapse to one column
   and the registry grid should reflow.
4. Confirm no console errors.

## Deployment

`.github/workflows/deploy.yml` publishes the repo to GitHub Pages on every push
to `main` (no build — it uploads the repo as-is). The repo owner must set
**Settings → Pages → Source = GitHub Actions** once. Don't add a build step to
this workflow; the site is already static.

## Files

```
index.html                    # the whole site: theme, markup, CONFIG, engine
images/                       # user photos (referenced from CONFIG.photos)
.github/workflows/deploy.yml  # Pages deploy (no build)
README.md                     # end-user customization guide
CLAUDE.md                     # this file
LICENSE                       # MIT
```

## Out of scope / do not do

- Don't add a backend, database, or server. RSVP is intentionally a link out.
- Don't collect or store personal data in the page.
- Don't reproduce copyrighted images or fonts without a proper license; the
  bundled fonts are Google Fonts (open license).
