#!/usr/bin/env bash
# =============================================================================
# sync-plugins-to-staging.sh — Sync plugins and untracked themes from
#                              production to staging.
#
# Use this after deploying to staging to restore plugins/themes that are
# no longer tracked in git (they live only on the server filesystem).
#
# Usage:
#   bash scripts/sync-plugins-to-staging.sh
#
# Requires the 'usjcfoundation' SSH host alias in ~/.ssh/config
# =============================================================================
set -euo pipefail

PROD_PATH="/home/customer/www/usjcfoundation.com/public_html"
STAGING_PATH="/home/customer/www/staging7.usjcfoundation.com/public_html"
SSH_HOST="usjcfoundation"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Syncing plugins from production → staging...${NC}"
ssh -o LogLevel=QUIET "$SSH_HOST" "
  rsync -a --delete \
    '$PROD_PATH/wp-content/plugins/' \
    '$STAGING_PATH/wp-content/plugins/'
  echo 'Plugins synced.'
"

echo -e "${YELLOW}Syncing parent theme (jcif) from production → staging...${NC}"
ssh -o LogLevel=QUIET "$SSH_HOST" "
  rsync -a --delete \
    '$PROD_PATH/wp-content/themes/jcif/' \
    '$STAGING_PATH/wp-content/themes/jcif/'
  echo 'Parent theme synced.'
"

echo -e "${YELLOW}Activating all installed plugins on staging...${NC}"
ssh -o LogLevel=QUIET "$SSH_HOST" \
  "~/bin/wp plugin activate --all --path='$STAGING_PATH'"

echo -e "${GREEN}✓ Sync complete.${NC}"
