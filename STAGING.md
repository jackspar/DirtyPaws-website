# Staging Environment — new.dirtypawsanimalrescue.org
**Created 2026-06-03 via SSH/UAPI. Completely isolated from the live site (own docroot).**

| Item | Value |
|---|---|
| URL | http://new.dirtypawsanimalrescue.org (HTTPS once AutoSSL issues a cert for the subdomain) |
| Docroot on server | `~/staging_new` (NOT public_html — live site untouched) |
| Crawler block | robots.txt Disallow all + meta noindex on placeholder (keep on all staged pages until launch) |
| SSH | `ssh -p 21098 -i ~/.ssh/dirtypaws_ed25519 dirtndhb@server255.web-hosting.com` |
| Deploy | `./deploy-staging.sh` (rsync of the built site from this branch to staging docroot) |
| DNS note | Subdomain DNS auto-added by cPanel; allow propagation time after creation |

**Plan:** static streetcats-model build (this branch) deploys here for Kathleen's review → after design approval, WordPress port (Approval 3 / cutover still gated on Kathleen).

## DEPLOYED — 2026-06-03 evening
- Full streetcats-model build (branch `redesign-streetcats`, commit fd0bf6e) deployed to staging docroot
- **Verified from outside: all 8 pages HTTP 200** · homepage title "Dirty Paws Animal Rescue — Cat Adoption in Contra Costa County" · noindex confirmed · robots.txt Disallow-all
- DNS: authoritative record live (dns1.namecheaphosting.com → 162.213.253.39); global propagation within minutes of deploy
- **Review URL for John (and later Kathleen): http://new.dirtypawsanimalrescue.org** (HTTPS pending AutoSSL's next run)
