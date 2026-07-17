/* ================================================================
   CASH FUND CONFIG — the ONLY file to edit for the cash fund page.

   The "Cash Fund" registry button opens cash_fund/index.html, and
   that page is built entirely from this file: every payment app you
   list below becomes a card with your handle, an optional "Open"
   button, and an optional QR code image.

   QR codes (optional): save the QR image from your payment app
   (Venmo → "Share" → save image, etc.), drop the file into the
   cash_fund/ folder, and put its file name in the `qr` field below.

   Like config.js, this file is loaded with a plain <script> tag, so
   everything keeps working when you double-click index.html locally.
   ================================================================ */
window.CASH_FUND_CONFIG = {
  /* --- Page text --- */
  heading: "Cash Fund",
  sub: "No amount is too small! 💛",

  /* --- Payment methods ---
     Each entry becomes one card on the page. Add, remove, or reorder
     freely. Fields:

       name    (required) — the app's name, e.g. "Venmo"
       icon    (optional) — an emoji shown next to the name
       handle  (optional) — your username / phone / email on that app.
                            Shown with a "Copy" button.
       url     (optional) — a link straight to your profile / payment
                            page. Adds an "Open" button. Leave "" for
                            apps that have no link (like Zelle).
       qr      (optional) — file name of a QR code image you placed in
                            the cash_fund/ folder, e.g. "venmo-qr.png".
                            Leave "" for no QR code.
       note    (optional) — a short line of instructions, e.g. what to
                            put in the payment note.

     Leave any optional field as "" to skip it — the card adjusts
     automatically. */
  methods: [
    {
      name:   "Venmo",
      icon:   "💸",
      handle: "@Alicia-Formanack",
      url:    "",
      qr:     "venmo.png",   // e.g. "venmo-qr.png" (file in the cash_fund/ folder)
      note:   "Add a 🍼 in the payment note!",
    },
    {
      name:   "Zelle",
      icon:   "💰",
      handle: "4806163188",
      url:    "",   // Zelle has no profile links — guests use the handle above
      qr:     "zelle.png",   // e.g. "zelle-qr.png"
      note:   "Find us using the phone number.",
    },
  ],

  /* --- Closing text --- */
  thanks:    "Thank you! Hope to see you in person.",
  backLabel: "← Back to the invitation",
};
