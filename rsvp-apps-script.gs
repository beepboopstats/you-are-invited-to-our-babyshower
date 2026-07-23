/* ============================================================================
   RSVP → Google Sheet  (Google Apps Script)

   This is the tiny backend that receives RSVPs from the website's form and
   appends them as rows to a Google Sheet you own. It is the ONLY moving part
   outside the static site, and it runs on Google's servers for free.

   ----------------------------------------------------------------------------
   ONE-TIME SETUP  (~3 minutes)
   ----------------------------------------------------------------------------
   1. Create a new Google Sheet (sheets.new). This is where RSVPs will land.
   2. In that sheet: Extensions → Apps Script. Delete whatever code is there.
   3. Paste THIS ENTIRE FILE into the editor. Save (the disk icon).
   4. Click Deploy → New deployment.
        • Select type (gear icon) → Web app
        • Description:  RSVP endpoint
        • Execute as:   Me
        • Who has access:  Anyone            <-- important, must be "Anyone"
      Click Deploy, then Authorize access (approve the permissions for your
      own account — this lets the script write to your sheet).
   5. Copy the "Web app URL" it shows you. It looks like:
        https://script.google.com/macros/s/AKfy........./exec
   6. Paste that URL into config.js as  rsvpEndpoint: "…"  and save.

   Done. The RSVP button on the site now opens a form and each submission adds
   a row: Timestamp | Name | Number attending.

   ----------------------------------------------------------------------------
   NOTES
   ----------------------------------------------------------------------------
   • If you later EDIT this script, you must Deploy → Manage deployments →
     (edit the existing one) → Version: New version → Deploy. The URL stays
     the same. Creating a brand-new deployment gives a NEW URL instead.
   • To see a running headcount in the sheet, put in any empty cell:
        =SUM(C2:C)
   • The site sends data with a "simple" text/plain request and mode:"no-cors",
     so no CORS configuration is needed here.
   ============================================================================ */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid two submissions writing at once
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Add a header row the first time anything is written.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Number attending"]);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (err) { data = {}; }
    }

    var name = String(data.name || "").slice(0, 100);

    // A declining guest sends the literal string "No"; anyone attending sends a
    // headcount. Store "No" as-is; otherwise coerce to a sane positive integer.
    var count;
    if (String(data.count).toLowerCase() === "no") {
      count = "No";
    } else {
      count = parseInt(data.count, 10);
      if (isNaN(count) || count < 1) count = 1;
    }

    sheet.appendRow([new Date(), name, count]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// A GET handler so visiting the URL in a browser shows a friendly message
// instead of an error (also handy for a quick "is it deployed?" check).
function doGet() {
  return ContentService.createTextOutput("RSVP endpoint is live.");
}
