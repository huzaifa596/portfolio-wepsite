# Connect the contact form

Every message becomes a row in your Google Sheet and an email in your inbox. The site itself stays frontend only.

1. Create a new Google Sheet at sheets.new, signed in with the Google account that should get the emails.
2. Open **Extensions, Apps Script**. Delete what is there and paste everything from `Code.gs`. Save.
3. Press **Deploy, New deployment**. Choose type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Press **Deploy** and approve access. Google warns that the app is unverified because you wrote it yourself. Choose **Advanced**, then continue.
5. Copy the web app URL. It ends in `/exec`.
6. Copy `.env.example` to `.env` and paste the URL after `VITE_CONTACT_FORM_URL=`. Restart `npm run dev`.
7. Add the same setting on your host (Netlify or Vercel, environment variables) and redeploy.

Send yourself a test message from the site and check the sheet.

If you edit `Code.gs` later, use **Deploy, Manage deployments, Edit, New version**, so the URL stays the same.

Good to know: the URL is visible in the site code, as with any frontend form. The script checks every message, limits them to 30 an hour and can only add rows.
