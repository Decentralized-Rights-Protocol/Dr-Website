#!/bin/bash

# Vercel Deployment Script for DRP Web Ecosystem
# This script deploys all projects to Vercel

set -e

echo "🚀 Deploying DRP Web Ecosystem to Vercel..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}Please login to Vercel first:${NC}"
    vercel login
fi

# Function to deploy project
deploy_project() {
    local project_name=$1
    local project_dir=$2
    
    echo -e "${BLUE}Deploying ${project_name}...${NC}"
    cd "$project_dir"
    
    if vercel --prod --yes; then
        echo -e "${GREEN}✅ ${project_name} deployed successfully!${NC}"
        cd ..
        return 0
    else
        echo -e "${YELLOW}⚠️  ${project_name} deployment had issues${NC}"
        cd ..
        return 1
    fi
}

# Deploy Main Site
deploy_project "Main Site" "src"

# Deploy App Portal
deploy_project "App Portal" "app-portal"

# Deploy Explorer
deploy_project "Explorer" "explorer"

# Deploy API Docs
deploy_project "API Docs" "api"

# Deploy Backend API
deploy_project "Backend API" "backend/drp-website-api"

echo ""
echo -e "${GREEN}✅ All deployments complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Vercel Dashboard for each project"
echo "2. Configure custom domains"
echo "3. Verify all deployments are working"
echo ""
echo "See VERCEL_DEPLOYMENT_COMPLETE.md for detailed instructions"

