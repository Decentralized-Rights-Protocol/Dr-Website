#!/bin/bash

# DRP Web Ecosystem Deployment Script
# This script builds and deploys all DRP projects

set -e

echo "🚀 Starting DRP Web Ecosystem Deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build and deploy main site
print_status "Building main site..."
cd src
npm install
npm run build
print_success "Main site built successfully!"

# Build and deploy app-portal
print_status "Building app-portal..."
cd ../app-portal
npm install
npm run build
print_success "App-portal built successfully!"

# Build and deploy explorer
print_status "Building explorer..."
cd ../explorer
npm install
npm run build
print_success "Explorer built successfully!"

# Build and deploy API docs
print_status "Building API docs..."
cd ../api
npm install
npm run build
print_success "API docs built successfully!"

# Return to root
cd ..

print_success "All projects built successfully!"
print_status "Ready for deployment to Vercel"

echo ""
echo "To deploy:"
echo "  cd src && vercel --prod"
echo "  cd app-portal && vercel --prod"
echo "  cd explorer && vercel --prod"
echo "  cd api && vercel --prod"

