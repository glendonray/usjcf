#!/usr/bin/env bash
# =============================================================================
# push-db-staging.sh — Push local Docker database to staging server
#
# Usage:
#   bash scripts/push-db-staging.sh
#
# Prerequisites:
#   - Docker containers running: docker compose up -d
#   - SSH key configured for the 'usjcfoundation' host alias in ~/.ssh/config
# =============================================================================
set -euo pipefail

STAGING_PATH="/home/customer/www/staging7.usjcfoundation.com/public_html"
STAGING_URL="https://staging7.usjcfoundation.com"
LOCAL_URL="http://localhost:8080"
SSH_HOST="usjcfoundation"
DB_NAME="usjcf_local"
DB_USER="usjcf"
DB_PASS="usjcf_local"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${RED}WARNING: This will OVERWRITE the staging database with your local database.${NC}"
read -rp "Type 'yes' to continue: " answer
[[ "$answer" == "yes" ]] || { echo "Aborted."; exit 1; }

echo -e "${YELLOW}Exporting local database and pushing to staging...${NC}"
docker compose exec -T db mysqldump -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" \
  | ssh -o LogLevel=QUIET "$SSH_HOST" "~/bin/wp db import - --path='$STAGING_PATH'"

echo "Running URL search-replace on staging..."
ssh -o LogLevel=QUIET "$SSH_HOST" \
  "~/bin/wp search-replace '$LOCAL_URL' '$STAGING_URL' --all-tables --path='$STAGING_PATH'"

echo -e "${GREEN}✓ Database pushed to staging → ${STAGING_URL}${NC}"
