# Scale41 website

Multilingual landing page (DE, EN, ES, PT) with contact form backed by Supabase via a Vercel serverless function.

## Deployment
1. Upload the **contents** of this folder to the GitHub repository root (including `api/` and `assets/`).
2. Import the repository in Vercel; Framework Preset: Other; Root Directory: `./`.
3. Run `supabase-setup.sql` in Supabase SQL Editor.
4. In Vercel > Project > Settings > Environment Variables, add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from Supabase project settings. The service role key is secret: never put it in GitHub or browser JavaScript.
5. Deploy / redeploy and test form submission, then verify entries in Supabase Table Editor > leads.

Note: configure rate limiting / CAPTCHA before opening the contact form to untrusted public traffic. Add privacy policy, legal notice, and verified email/contact details before launch. The `hello@scale41.ch` footer email is a placeholder and must be changed before publishing.
