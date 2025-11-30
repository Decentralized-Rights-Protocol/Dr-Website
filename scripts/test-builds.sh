#!/bin/bash

# Build Test Script
# Tests all Next.js projects to ensure they build successfully

set -e

echo "🧪 Testing all builds..."

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

test_project() {
    local project_name=$1
    local project_dir=$2
    
    echo -e "${BLUE}Testing ${project_name}...${NC}"
    
    cd "$project_dir"
    
    if npm run build; then
        echo -e "${GREEN}✅ ${project_name} build successful!${NC}"
        cd ..
        return 0
    else
        echo -e "${RED}❌ ${project_name} build failed!${NC}"
        cd ..
        return 1
    fi
}

# Test main site
test_project "Main Site" "src"

# Test app-portal
test_project "App Portal" "app-portal"

# Test explorer
test_project "Explorer" "explorer"

# Test API docs
test_project "API Docs" "api"

echo ""
echo -e "${GREEN}All builds tested successfully!${NC}"

