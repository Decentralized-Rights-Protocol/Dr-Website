#!/bin/bash
# Elder key rotation script
# Usage: ./rotate_elder_key.sh <new_public_key> <admin_key>

set -e

NEW_PUBLIC_KEY="$1"
ADMIN_KEY="$2"
API_URL="${API_URL:-https://api.decentralizedrights.com}"

if [ -z "$NEW_PUBLIC_KEY" ] || [ -z "$ADMIN_KEY" ]; then
    echo "Usage: $0 <new_public_key> <admin_key>"
    exit 1
fi

echo "Rotating elder key..."

response=$(curl -s -X POST "$API_URL/elders/rotate" \
    -H "Content-Type: application/json" \
    -d "{\"new_public_key\": \"$NEW_PUBLIC_KEY\", \"admin_key\": \"$ADMIN_KEY\"}")

if echo "$response" | grep -q '"success":true'; then
    echo "✅ Elder key rotated successfully"
    echo "$response" | jq .
else
    echo "❌ Failed to rotate elder key"
    echo "$response"
    exit 1
fi

