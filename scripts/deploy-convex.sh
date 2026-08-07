#!/bin/bash

# DRP Website - Convex Deployment Script
# This script works around macOS esbuild compatibility issues

set -e

echo "🚀 Starting DRP Convex Deployment..."

# Check if we're on macOS with the problematic version
if [[ "$(uname)" == "Darwin" ]]; then
    MACOS_VERSION=$(sw_vers -productVersion)
    KERNEL_VERSION=$(uname -r)
    
    echo "📋 System Info:"
    echo "   macOS Version: $MACOS_VERSION"
    echo "   Kernel Version: $KERNEL_VERSION"
    
    # Check if we have the known incompatible version
    if [[ "$KERNEL_VERSION" == *"20.6.0"* ]] || [[ "$MACOS_VERSION" == *"13."* ]] || [[ "$MACOS_VERSION" == *"14."* ]]; then
        echo "⚠️  Detected macOS version with potential esbuild compatibility issues"
        
        # Try to remove the problematic esbuild and reinstall
        echo "🔧 Attempting esbuild fix..."
        
        # Navigate to project directory
        cd "$(dirname "$0")/.."
        
        # Remove the problematic esbuild binary
        if [ -d "node_modules/convex/node_modules/@esbuild/darwin-x64" ]; then
            echo "🗑️  Removing incompatible esbuild binary..."
            rm -rf node_modules/convex/node_modules/@esbuild/darwin-x64
        fi
        
        # Try to use the override from package.json
        if grep -q '"esbuild"' package.json; then
            echo "📦 Using package.json esbuild override..."
        else
            echo "⚠️  No esbuild override found in package.json"
        fi
    fi
fi

# Set deployment target
DEPLOYMENT=${1:-"courteous-wildcat-368"}
echo "🎯 Deployment target: $DEPLOYMENT"

# Set environment variables
export CONVEX_DEPLOYMENT="$DEPLOYMENT"

# Try deployment with dry run first
echo "🔍 Testing deployment with dry-run..."
npx convex deploy --dry-run || {
    echo "❌ Dry run failed - esbuild issue persists"
    
    # Try alternative approach - use the production deployment directly
    echo "🔄 Trying alternative deployment method..."
    
    # Try to force deployment without codegen
    npx convex deploy --codegen disable || {
        echo "❌ Alternative deployment failed"
        
        # Last resort - try to deploy via the Convex API directly
        echo "🆘 Last resort: Manual deployment required"
        echo ""
        echo "To deploy manually:"
        echo "1. Use a Linux machine or macOS 12.0"
        echo "2. Run: cd /Users/user/DRP\ website && npx convex deploy"
        echo "3. Or use GitHub Actions: ./scripts/deploy-convex.sh"
        echo ""
        exit 1
    }
}

echo "✅ Deployment test successful!"

# Now do the real deployment
echo "🚀 Deploying to Convex..."
npx convex deploy --codegen enable

echo "✅ Convex deployment completed!"
echo ""
echo "📊 Deployment Info:"
echo "   URL: https://${DEPLOYMENT}.convex.cloud"
echo "   Dashboard: https://dashboard.convex.dev/t/neontechnox/drp/${DEPLOYMENT}"
echo ""
echo "🎉 Next steps:"
echo "1. Set NEXT_PUBLIC_CONVEX_URL=https://${DEPLOYMENT}.convex.cloud in Vercel"
echo "2. Test the deployed functions"
echo "3. Connect frontend to the real backend"