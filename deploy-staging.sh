#!/bin/bash
# Deploy the built site (this directory's HTML/CSS/JS/img) to staging: new.dirtypawsanimalrescue.org
# Excludes repo docs/admin files. Run from the repo root on the redesign branch.
set -e
rsync -avz --delete -e "ssh -p 21098 -i $HOME/.ssh/dirtypaws_ed25519" \
  --exclude '.git' --exclude '*.md' --exclude 'deploy-staging.sh' --exclude '.gitignore' \
  ./ dirtndhb@server255.web-hosting.com:~/staging_new/
echo "Deployed. Verify: curl -sL http://new.dirtypawsanimalrescue.org/ | head"
