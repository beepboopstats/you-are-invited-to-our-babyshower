/* ================================================================
   CONFIG — the ONLY file most people need to edit.

   Everything the page shows — text, dates, links, colors, fonts,
   and images — lives here. Change a value, save, reload. You never
   need to touch index.html.

   This file is loaded by index.html via <script src="config.js">,
   which is why it works both on the web and when you just
   double-click index.html to open it locally.
   ================================================================ */
window.CONFIG = {
  /* --- Page metadata --- */
  title:       "Baby Shower",     // browser tab + hero heading
  description: "Alicia & Billu invites you to our baby shower.",  // search / link preview

  /* --- Sharing / SEO ---
     Note: link previews on social/chat apps (Facebook, iMessage, WhatsApp,
     Slack, X) do NOT run JavaScript, so these injected tags won't show there.
     Search engines that render JS (Google, Bing) will. See README. */
  meta: {
    // Canonical/base URL where the site is actually hosted. Used for the
    // canonical link, the social share URL, and to make the share image absolute.
    siteUrl: "https://www.beepboopstats.com/you-are-invited-to-our-babyshower/",
    // Image shown in social link previews (path or full URL; ideal ~1200x630).
    shareImage: "images/together.jpeg",
    shareImageAlt: "Alicia & Billu, parents-to-be",
    // Tab icon — a single emoji (rendered as an inline SVG favicon).
    favicon: "🍼",
  },

  /* --- Hero --- */
  subtitle:   "Join Alicia & Billu to celebrate a new beginning",
  body:       "General text body here — a warm sentence or two inviting your guests, sharing what to expect, or anything else you'd like them to know.",

  /* --- Event --- */
  eventDate:   "2026-09-05",   // date of the event, "YYYY-MM-DD" (shown as "Sep 5, 2026")
  eventStart:  "14:00",        // start time, 24-hour "HH:MM" (shown as "2:00 pm")
  eventEnd:    "17:00",        // end time, 24-hour "HH:MM" (for the calendar file)
  // Shown on the page and used for the calendar event. The calendar file's
  // timezone is deduced from the US state at the end of this address
  // (e.g. "…, AZ" → America/Phoenix). If no US state is recognized, the time
  // is left "floating" (shown as-is in the guest's own calendar).
  location:    "2013 N Center St, Flagstaff, AZ",
  // Calendar event name + notes. calendarTitle falls back to `title` if blank.
  calendarTitle:    "Alicia & Billu's Baby Shower",
  calendarDetails:  "Join us to celebrate!",

  /* --- RSVP --- */
  // The RSVP button link. Use a full web URL (Google Form, Partiful, etc.)
  //   rsvpUrl: "https://forms.gle/your-form",
  // or an email link, which opens the guest's mail app pre-addressed:
  //   rsvpUrl: "mailto:you@example.com?subject=Baby%20Shower%20RSVP",
  // Set rsvpUrl to "" (empty) to hide the RSVP button entirely.
  rsvpUrl:   
  	"mailto:beepboopstats@gmail.com?subject=RSVP:%20Alicia-Billu%20Baby%20Shower",
  rsvpLabel: "RSVP",

  /* --- Registry --- */
  registryHeading: "Baby Registry",
  registrySub:     "Your presence is the gift — but if you'd like to bring something, here are some registries with items we think we will most need.",
  registries: [
    { name: "Amazon",    
    	note: "Everyday essentials", 
    	url: "https://www.amazon.com/baby-reg/" 
    	},
    { name: "Target",    
    	note: "Nursery & gear",      
    	url: "https://www.target.com/gift-registry/" 
    	},
    { name: "IKEA",      
    	note: "Furniture picks",     
    	url: "https://www.ikea.com/" 
    	},
    { name: "Cash Fund", 
    	note: "Toward the big stuff", 
    	url: "https://www.example.com/cash-fund" },
  ],

  /* --- Footer --- */
  footerHeading:  "With love",
  // Photos: drop images in the /images folder and reference them, or use URLs.
  // Leave the array empty ([]) to hide the gallery entirely.
  photos: [
    { src: "images/together.jpeg", alt: "Us at the beach" },
    { src: "images/together.jpeg", alt: "The nursery" },
  ],
  footerNote:     "Can't wait to celebrate with you. Please RSVP by August 20th.",
  footerSignoff:  "— The Parents-to-be",

  /* ================================================================
     THEME — the entire look of the page. Change a color or font
     here and the whole site updates. Colors accept any CSS color
     (hex like "#e8b04b", or "rgba(...)").
     ================================================================ */
  theme: {
    /* Palette */
    bg:        "#1d2b2a",                 // deep pine — page background
    bg2:       "#24403c",                 // card / panel background
    ink:       "#f3ede1",                 // primary text (warm cream)
    inkSoft:   "#c3c9be",                 // secondary text
    accent:    "#e8b04b",                 // honey gold — highlights, ring
    accent2:   "#7fb09b",                 // sage — links, secondary accent
    line:      "rgba(243,237,225,0.16)",  // hairline dividers

    /* Type — if you swap these for other typefaces, also update the
       Google Fonts <link> in index.html's <head>. */
    fontDisplay: '"Fraunces", Georgia, serif',
    fontBody:    '"Nunito Sans", system-ui, sans-serif',

    /* Shape & rhythm */
    radius:   "14px",
    maxWidth: "680px",                         // content column width
    gap:      "clamp(1.75rem, 4vw, 3rem)",     // space between sections

    /* Hero background image (a path in /images, or a full URL). A dark
       overlay is added automatically so the title stays readable.
       Leave "" (empty) to use a solid color background instead. */
    heroImage: "images/together.jpeg",

    /* Advanced: set heroBg to a full CSS background value to override
       heroImage entirely — e.g. a gradient or solid color:
         heroBg: "radial-gradient(120% 120% at 20% 0%, #2c4d47 0%, #1d2b2a 70%)",
       Leave "" to use heroImage (or the :root fallback) instead. */
    heroBg: "",

    /* Fill color for the box behind the hero text, so the title and
       body stay readable over a busy background photo. Use a
       semi-transparent color (the rgba "0.55" below is 55% opaque).
       Leave "" (empty) for no panel — text sits directly on the image. */
    heroPanel: "rgba(29,43,42,0.55)",
  },
};
