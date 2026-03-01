#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Deploy code to staging or production
#
# Usage:
#   bash deploy.sh staging      → pull staging branch to staging server
#   bash deploy.sh production   → pull main branch to production server (prompts)
#
# Requires the 'usjcfoundation' SSH host alias in ~/.ssh/config
# =============================================================================
set -euo pipefail

STAGING_PATH="/home/customer/www/staging7.usjcfoundation.com/public_html"
PROD_PATH="/home/customer/www/usjcfoundation.com/public_html"
SSH_HOST="usjcfoundation"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

case "${1:-}" in
  staging)
    DEPLOY_PATH="$STAGING_PATH"
    BRANCH="staging"
    SITE_URL="https://staging7.usjcfoundation.com"
    ;;
  production|prod)
    DEPLOY_PATH="$PROD_PATH"
    BRANCH="main"
    SITE_URL="https://usjcfoundation.com"
    echo -e "${RED}WARNING: You are about to deploy to PRODUCTION.${NC}"
    read -rp "Type 'yes' to continue: " answer
    [[ "$answer" == "yes" ]] || { echo "Aborted."; exit 1; }
    ;;
  *)
    echo "Usage: bash deploy.sh [staging|production]"
    exit 1
    ;;
esac

echo -e "${YELLOW}Deploying branch '${BRANCH}' → ${SITE_URL}${NC}"

ssh -o LogLevel=QUIET "$SSH_HOST" "
  set -e
  cd '$DEPLOY_PATH'

  echo 'Pulling latest code...'
  git pull origin '$BRANCH'

  echo 'Flushing object cache...'
  wp cache flush --path=. 2>/dev/null && echo 'Object cache flushed.' || echo 'No object cache active — skipping.'

  echo 'Flushing SiteGround cache...'
  wp sg purge --all --path=. 2>/dev/null && echo 'SiteGround cache purged.' || echo 'SG cache CLI not available — purge from admin if needed.'

  echo 'Done!'
"

echo -e "${GREEN}✓ Deploy complete → ${SITE_URL}${NC}"
