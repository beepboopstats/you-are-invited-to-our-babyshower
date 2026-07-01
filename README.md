# 🍼 One-Page Baby Shower Template

A single-file, no-build website for a baby shower. Hosts the essentials —
title, date, location, a live countdown, an **Add to calendar** button, and
links to your registries — plus a customizable footer with photos.

Everything lives in one `index.html`. There is nothing to install, no build
step, and no dependencies. Open the file in a browser and it works.

> **Use this template →** Click the green **Use this template** button at the
> top of the repo to make your own copy, then edit the config (below) and turn
> on GitHub Pages.

---

## Quick start

1. **Use this template** to create your own repository.
2. Open `index.html` and scroll to the **`CONFIG`** block near the bottom.
3. Change the text, date, location, and registry links to yours.
4. (Optional) Drop photos in an `images/` folder and list them in `CONFIG.photos`.
5. (Optional) Change colors and fonts in the **`:root`** theme block near the top.
6. Commit — GitHub Pages publishes automatically (see **Publishing** below).

To preview locally, just double-click `index.html`. Because the whole site is
self-contained, opening the file directly works fine — no server required.

---

## Customizing the content

All content is in the `CONFIG` object at the bottom of `index.html`. You only
edit values; the page rebuilds itself to match.

| Field | What it controls |
|---|---|
| `title`, `subtitle`, `body` | The hero section text |
| `eventStart`, `eventEnd` | Event time in `YYYY-MM-DDTHH:MM:SS` (24-hour, local). Drives the countdown and the calendar file. |
| `dateDisplay` | How the date reads on the page (free text, e.g. `"Sep 4, 2026"`) |
| `location` | Location shown on the page |
| `calendarTitle`, `calendarLocation`, `calendarDetails` | What goes inside the downloadable calendar event |
| `rsvpUrl`, `rsvpLabel` | The RSVP button. Use a form URL (Google Forms, Partiful, etc.) or a `mailto:` link. Set `rsvpUrl: ""` to hide the button. |
| `registryHeading`, `registrySub` | Registry section heading + intro line |
| `registries` | The registry buttons — see below |
| `footerHeading`, `footerNote`, `footerSignoff` | Footer text |
| `photos` | Footer photo gallery — see below |

### Registry buttons

Add, remove, or reorder freely. Each entry is one button:

```js
registries: [
  { name: "Amazon", note: "Everyday essentials", url: "https://www.amazon.com/baby-reg/" },
  { name: "Cash Fund", note: "Toward the big stuff", url: "https://example.com/fund" },
],
```

- `name` — the big label
- `note` — a short line underneath (optional; use `""` to skip)
- `url` — where the button links

### Photos

```js
photos: [
  { src: "images/photo1.jpg", alt: "Us at the beach" },
  { src: "images/photo2.jpg", alt: "The nursery" },
],
```

Put image files in an `images/` folder next to `index.html`, or use full URLs.
Leave the array empty (`photos: []`) and the gallery disappears automatically.

---

## Customizing the look

The theme is a set of CSS variables in the `:root` block at the top of
`index.html`. Change a value once and it updates everywhere.

```css
:root {
  --bg:      #1d2b2a;   /* page background   */
  --ink:     #f3ede1;   /* main text         */
  --accent:  #e8b04b;   /* highlights, ring  */
  --accent-2:#7fb09b;   /* links             */
  --font-display: "Fraunces", Georgia, serif;
  --font-body:    "Nunito Sans", system-ui, sans-serif;
  /* ...radius, spacing, and hero background live here too */
}
```

**Hero background.** Set `--hero-bg` to a color, gradient, or image:

```css
--hero-bg: #24403c;                                  /* solid  */
--hero-bg: url("images/hero.jpg") center/cover;      /* photo  */
--hero-bg: radial-gradient(120% 120% at 20% 0%, #2c4d47, #1d2b2a); /* default */
```

**Fonts.** The two Google Fonts are loaded via the `<link>` in the `<head>`.
To swap them, change that link and the `--font-display` / `--font-body`
variables to match.

The layout is responsive by default and collapses to a single column on
phones; the registry grid reflows to fit however many items you list.

---

## Publishing with GitHub Pages

This repo includes a workflow at `.github/workflows/deploy.yml` that publishes
the site on every push to `main`. To turn it on once:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push a change to `main` (or run the workflow manually from the **Actions**
   tab). Your site goes live at
   `https://<your-username>.github.io/<repo-name>/`.

That's it — future edits publish themselves when you commit.

### Custom domain (optional)

Add a `CNAME` file containing your domain, and set the domain under
**Settings → Pages**. See
[GitHub's docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## File layout

```
.
├── index.html                 ← the entire site (edit CONFIG + :root)
├── images/                    ← your photos (create this yourself)
├── .github/workflows/deploy.yml
├── README.md
├── CLAUDE.md                  ← handoff guide for Claude Code / AI assistants
└── LICENSE
```

## License

Released under the MIT License — free to use, copy, and adapt. See `LICENSE`.
