# Full Session Record — 2026-06-03 (everything DirtyPaws from today, consolidated)
**THIS REPO (`DirtyPaws-website`, private) = the ONLY DirtyPaws location.** Copies of today's material that landed earlier in `~/Projects/DirtyPaws/notes/` and `PROJECT_STATUS.md` are SUPERSEDED by this file (left in place pending John's folder consolidation — do not add anything further there).
**Siblings in this repo:** `RECON-2026-06-03.md` (site + hosting + SSH state, sections A-G) · `R02-Findings-Remediation-Plan.md` (Kathleen approvals)

---

## 1. Canva connector — authenticated + verified (all tests passed)

| Test | Result |
|---|---|
| READ design | ✅ June 6 flyer text pulled live |
| EXPORT PPTX | ✅ Real 1.0MB PowerPoint verified on disk |
| COPY design | ✅ Original untouched (verified by re-read) |
| EDIT + COMMIT | ✅ "June 6"→"June 13" on the copy, committed, visible |

- Demo artifact in Canva: **"DEMO - Sat Jun 13 (Claude-edited copy)"** (design `DAHLjNxwTcQ`) — keep or delete freely. Original = `DAHIROlLc64`, untouched.
- **Lesson:** connector edits are invisible drafts until commit — always commit BEFORE sharing a link.
- Capabilities: read/search/comments · AI-generate (presentations via outline→structured flow) · editing transactions · import by URL · export PPTX/PDF/PNG · brand kits/templates + autofill · folders/assets.

## 2. Queued: Canva brand kit + flyer templates (NOT started)

One brand kit (logo/colors/fonts) + 2-3 brand templates with date/time/location autofill ("Adoption Saturday" master) → each event = 30-second autofill, never rebuilt from scratch. Check Canva plan tier (brand features may need Pro). John = trained Graphic Designer / Art Director; flyers are his original design work.

## 3. DirtyPaws folder consolidation (John's project — Claude creates NOTHING new)

Scatter inventory found on the machine (2026-06-03 scan):
- `~/Projects/DirtyPaws/` (April hub — superseded as a destination)
- `~/Projects/DirtyPaws-website/` ← **THE repo (canonical, private)**
- `My Drive/Current To Do/2026 DirtyPaws/` · `2025 DirtyPaws/` · `2025 Archives/2025 DirtyPaws/` (#4/#5 are duplicates of each other — same Event 2024.08.10 files) · `To Dos - vDirtyPaws/`
- Loose: `Downloads/DirtyPaws-Event-2026.94.10.pdf` · `My Drive/DirtyPaws-website.gdoc` · `Drive Archive/To File Arc/DirtyPaws website to do's.gdoc`
**HARD RULE:** never create another DirtyPaws folder anywhere. Writes go HERE only.

## 4. Website + hosting (full detail in RECON-2026-06-03.md)

- Live-site audit: 0/17 April issues fixed; **adoption + volunteer form links broken for the public** (`/edit` → must be `/viewform`); exposed Maps API key; 15-month-stale event; typos; SEO gaps
- Hosting: **Stellar cPanel plan, active to Mar 14 2027**, 3-domain capacity, WordPress installer present
- **SSH: enabled + verified tonight.** `ssh -p 21098 -i ~/.ssh/dirtypaws_ed25519 dirtndhb@server255.web-hosting.com` · **WP-CLI 2.6.0 preinstalled** · PHP CLI 7.2.34 (set staging subdomain to PHP 8.x via MultiPHP before WP install) · `public_html/` = live builder site, NEVER touch
- Decisions: WP-CLI over SSH (WP-MCP plugin skipped — John prefers CLI) · repo private while prototyping (Pages preview consequently off) · staging subdomain on existing hosting → Kathleen review → cutover last
- R02 = the three Kathleen approvals; email drafted (RECON §F), NOT yet sent — sends before any execution

## 5. Account/access findings + method lessons

- Namecheap account DirtyPawsAR (Kathleen Ellis) · 2FA OFF (fix: TOTP on John's phone, with her OK) · device-verification emails route to Kathleen (dependency to eliminate) · Support PIN known to John (not recorded here deliberately)
- **Working recon method:** John clicks in his real logged-in Brave; Claude reads via `screencapture` + image read. Claude browser extension (in Brave, pairs with claude.ai/Desktop) = the control path for real-browser work. **No debug-profile workbenches** — fresh profiles manufacture device-verification lockouts (tonight's hard lesson). Workbench leftover to clean: `/tmp/brave-cdp` (contains a saved Namecheap password; wipe with `rm -rf /tmp/brave-cdp` — pending John's go)
- Google Voice texts: not readable from Claude (no SMS-to-email forwarding enabled); voicemails ARE readable via Gmail. Kathleen's "copy this website" reference text still unfound — John to search Voice for `http`/`www` in her thread; April benchmark analysis suggests it was likely CC4C (communityconcernforcats.org)

## 6. Next session (open Claude Code in THIS repo)

1. Send Kathleen email (RECON §F / R02)
2. On Approval 1: execute live-site quick fixes (builder via John or browser-extension session; Claude Code verifies each fix live)
3. On Approval 2: API key restriction + TOTP 2FA + account contact
4. On Approval 3: subdomain + MultiPHP 8.x + `wp core download/config/install` → migrate April prototype → Kathleen review → DNS/docroot cutover
5. Separately: Canva brand kit/templates when John triggers it

## 7. LIVE FIX EXECUTED (2026-06-03 evening) — Events page
- John updated the Events headline in the builder: "Saturday, Feb. 21th, 2025" → **"Saturday, June 6, 2026"** (PetSmart/Ygnacio line unchanged) and PUBLISHED
- **Verified live from outside within seconds** (curl: date present on /Events/) — first item of R02 Approval-1 territory done early as routine webmaster content update
- Flyer PNG staged at `~/Downloads/DirtyPaws-Event-2026-06-06.png` (exported from Canva original) — optional 2-min add later (Picture element → upload → Publish); becomes moot post-WordPress
- STILL OPEN on live site: the two form-link `/edit`→`/viewform` fixes (highest impact; 2 pastes in builder) — do before Saturday's event traffic if possible

## 8. FOUND: Kathleen's reference website (the design model)
**https://www.streetcatsclub.org/barncatprogram** — the site Kathleen texted long ago as the model for the new website (John located it 2026-06-03). Wix-built. Two readings to confirm with her: (a) overall site style/structure as the design model, (b) specifically a BARN CAT PROGRAM page/program like theirs (working-cat placement). Design analysis appended below when agent completes. The April prototype design (charcoal + rainbow, card grid) should be reconciled against this reference BEFORE the WordPress build.

## 9. Design iterations (evening) + Petfinder next step
- Staging site built, proofed (content-parity: all PASS, 3 flags fixed), and art-directed live with John: pure-black header + dark wordmark logo (`assets/logos/logo-dark.png`; was 403 file-perms, fixed 644) · palette re-sampled FROM the rainbow-heart logo (pink #f03090 · orange #f07830 · yellow #f0d830 · green #30a878 · blue #30a8d8) replacing Street Cats orange · heart-gradient DONATE button · rainbow step numbers · nav nowrap fix · cache-busting ?v=N (now v=5) · nav: Home removed (logo = home), order = Events · Adopt · How to Adopt · Volunteer · Resources · About · DONATE
- **NEXT (John, tomorrow): register free Petfinder developer account → API key + secret** (petfinder.com/developers; org CA2823). Then Claude wires a server-side PHP proxy + live cat grid into staging so Kathleen's review shows actual current cats (no double entry ever; cats page self-updates from the volunteers' existing Petfinder workflow). WordPress phase inherits the same integration.
