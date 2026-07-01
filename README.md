# 🍼 One-Page Baby Shower Template

A no-build website for a baby shower. Hosts the essentials — title, date,
location, a live countdown, an **Add to calendar** button, and links to your
registries — plus a customizable footer with photos.

Everything you edit lives in one file: **`config.js`**. The markup and logic
sit in `index.html` and you never need to touch them. There is nothing to
install, no build step, and no dependencies. Open `index.html` in a browser and
it works.

> **Use this template →** Click the green **Use this template** button at the
> top of the repo to make your own copy, then edit `config.js` and turn on
> GitHub Pages.

---

## Quick start

1. **Use this template** to create your own repository.
2. Open **`config.js`**.
3. Change the text, date, location, and registry links to yours.
4. (Optional) Drop photos in the `images/` folder and list them in `photos`.
5. (Optional) Change colors, fonts, and the hero image in the **`theme`** block
   at the bottom of `config.js`.
6. Commit — GitHub Pages publishes automatically (see **Publishing** below).

To preview locally, just double-click `index.html`. Because `config.js` is
loaded with a plain `<script>` tag (not fetched), opening the file directly
works fine — no server required.

---

## Customizing the content

All content is in the `CONFIG` object in `config.js`. You only edit values; the
page rebuilds itself to match.

| Field | What it controls |
|---|---|
| `title`, `description` | Browser tab / hero heading, and the link-preview text |
| `subtitle`, `body` | The hero section text |
| `eventDate` | Event date, `"YYYY-MM-DD"`. Drives the countdown, the calendar file, and the date shown on the page (formatted like `Sep 5, 2026`). |
| `eventStart`, `eventEnd` | Start / end time, 24-hour `"HH:MM"`. The start time is also shown on the page (formatted like `2:00 pm`). |
| `location` | The address — shown on the page **and** used for the calendar event. The event's timezone is deduced from the US state at the end of it (e.g. `…, AZ` → Arizona time); unrecognized locations use a floating local time. |
| `calendarTitle`, `calendarDetails` | Name and notes for the downloadable calendar event. `calendarTitle` falls back to `title` if left blank. |
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

Put image files in the `images/` folder next to `index.html`, or use full URLs.
Leave the array empty (`photos: []`) and the gallery disappears automatically.

### Sharing & SEO

The `meta` block in `config.js` controls the browser-tab icon and how the link
looks when shared:

```js
meta: {
  siteUrl:       "https://www.beepboopstats.com/you-are-invited-to-our-babyshower/",
  shareImage:    "images/together.jpeg",   // preview thumbnail (ideal ~1200×630)
  shareImageAlt: "Alicia & Billu, parents-to-be",
  favicon:       "🍼",                       // tab icon (any single emoji)
},
```

The page title and description for previews come from the `title` and
`description` fields above — you don't repeat them here.

**Privacy — the page is _unlisted_ by default.** `index.html` ships with
`<meta name="robots" content="noindex, nofollow">`, so search engines won't list
it (sensible, since it shows names and an address). Link previews when you share
the URL still work regardless. To make it publicly searchable, change that tag to
`index, follow`.

> **Heads-up on link previews.** These preview tags are added by JavaScript, and
> the scrapers behind **Facebook / iMessage / WhatsApp / Slack / X** don't run
> JavaScript — so rich previews won't show there (Google/Bing, which do render
> JS, will see them). If you need previews to work in chat apps, move the
> `og:*` / `twitter:*` / `canonical` tags into `index.html`'s `<head>` as plain
> static tags with your real values. See `CLAUDE.md` for details.

---

## Customizing the look

The theme is the `theme` block inside `config.js`. Change a value once and it
updates everywhere — colors accept any CSS color (a hex like `"#e8b04b"` or an
`"rgba(...)"`).

```js
theme: {
  bg:      "#1d2b2a",   // page background
  ink:     "#f3ede1",   // main text
  accent:  "#e8b04b",   // highlights, ring
  accent2: "#7fb09b",   // links
  fontDisplay: '"Fraunces", Georgia, serif',
  fontBody:    '"Nunito Sans", system-ui, sans-serif',
  // ...radius, spacing, hero image, and hero text panel live here too
},
```

**Hero background.** The simplest option is `heroImage` — a path or URL to a
photo. A dark overlay is added automatically so the title stays readable:

```js
heroImage: "images/together.jpeg",   // photo with auto dark overlay
heroImage: "",                        // no image — uses a solid/gradient bg
```

For full control, set `heroBg` to any CSS background value (a gradient or solid
color); it overrides `heroImage`:

```js
heroBg: "radial-gradient(120% 120% at 20% 0%, #2c4d47 0%, #1d2b2a 70%)",
```

**Hero text panel.** If the hero photo makes the title or body hard to read, set
`heroPanel` to a semi-transparent color to place a fill box behind the text.
Leave it `""` for no panel:

```js
heroPanel: "rgba(29,43,42,0.55)",   // 55%-opaque pine box behind hero text
heroPanel: "",                       // text sits directly on the photo
```

**Fonts.** The two Google Fonts are loaded via the `<link>` in `index.html`'s
`<head>`. To swap them, change that link and the `fontDisplay` / `fontBody`
values to match.

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
├── config.js                  ← EDIT THIS: all content, colors, and images
├── index.html                 ← markup + engine (you don't need to touch this)
├── images/                    ← your photos
├── .github/workflows/deploy.yml
├── README.md
├── CLAUDE.md                  ← handoff guide for Claude Code / AI assistants
└── LICENSE
```

## License

Released under the MIT License — free to use, copy, and adapt. See `LICENSE`.
