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
