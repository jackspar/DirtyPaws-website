# R02 — Findings & Remediation Plan
**Dirty Paws Animal Rescue website + hosting · June 3, 2026**
**Prepared by:** John Real, volunteer webmaster · with Claude
**For:** Kathleen Ellis — review + three approvals requested below
**Companion:** R01 (April kickoff) · RECON-2026-06-03.md (full technical findings, this repo)

---

## The short version

The website has not changed since February 21, 2026, and the most damaging problem is invisible from the inside: **the "apply to adopt" and "apply to volunteer" links are broken for the public.** They point to the form-owner editing URLs, so every visitor who clicks gets Google's "Access Denied" page. People actively trying to adopt a cat or volunteer are being turned away — and have been for months.

The good news found this week: the rescue **already owns everything needed to fix all of it** — real cPanel hosting (paid through March 2027) with room for a modern WordPress site to be built alongside the current one at zero additional cost and zero risk to the live site.

---

## APPROVAL 1 — Quick fixes to the live site (~1 hour, no risk)

All done inside the existing Namecheap website builder; nothing structural changes.

1. **Fix both application form links** — change the URL ending from `/edit` to `/viewform` (adoption + volunteer). *This is the single highest-impact fix available — it un-breaks adoptions.*
2. **Events page** — remove the stale "Feb. 21th, 2025" listing; replace with current events or "Follow us on Instagram for upcoming events"
3. **Twitter icon** — currently links to Twitter's own page on all 9 pages; remove it (or supply the rescue's handle if one exists)
4. **About page** — three text fixes: remove "and Dogs" (we are a cat rescue), "oppurtunities" → "opportunities," "adoped" → "adopted"
5. **Page titles/descriptions** — add "Dirty Paws Animal Rescue" to page titles so Google searches show the org name, not just "Home"

## APPROVAL 2 — Security & account hygiene (~30 minutes)

1. **Restrict the exposed Google Maps API key** (visible in the site's public code since at least April) — 5 minutes in Google Cloud Console; prevents anyone copying it and running up usage on the account
2. **Turn on two-factor authentication** on the Namecheap account (currently OFF), set to an authenticator app on John's phone as operating webmaster — with your sign-off
3. **Add John's email as an account contact** so device-verification codes stop depending on one inbox

## APPROVAL 3 — The real fix: a modern site, built safely alongside the current one

- The current builder limits everything (the SEO problems, no cat profiles, no Petfinder integration, the update friction)
- A complete 9-page redesigned prototype **already exists** (built in April: new design, all content, events archive, Petfinder-ready cat cards) — it needs your review, current photos, and Petfinder API credentials
- Plan: install WordPress on the rescue's **existing hosting** at a staging address (e.g., `new.dirtypawsanimalrescue.org`), move the prototype into it, you review at leisure, and the public site only switches over when you approve. The current site stays untouched and live the entire time
- After switchover: you (or any volunteer) can update photos, events, and cats yourself — that was the point of the WordPress recommendation in R01

## What happens on your "yes"

Each approval executes as its own batch, every change is verified against the live site immediately, and everything is logged in the project repo. Nothing outside an approved batch gets touched. Approve 1 alone, 1+2, or all three — they're independent.

---

*Technical appendix (full audit tables, hosting details, DNS/SSL findings): RECON-2026-06-03.md in this repository.*
