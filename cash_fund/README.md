# Cash fund page

This folder holds the **Cash Fund** page (`index.html`) and your **QR code
images**. You never need to edit `index.html` — everything the page shows
comes from **`cash_fund_config.js`** in the folder above.

## To customize

1. Open `cash_fund_config.js` (next to `config.js`) and fill in your Venmo /
   Zelle / PayPal handles and links. Add or remove apps freely.
2. **QR codes (optional):** save the QR image from your payment app
   (e.g. Venmo → Share → save the QR image), drop the file **into this
   folder**, and put its file name in that app's `qr` field:

   ```js
   qr: "venmo-qr.png",
   ```

   Leave `qr: ""` to skip the QR code for an app.

The page's colors and fonts come from the `theme` block in `config.js`, so it
always matches the main site automatically.
