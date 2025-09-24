#!/bin/bash

# Development script for DRP Next.js website

echo "🚀 Starting Decentralized Rights Protocol Website Development..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start development server
echo "🔥 Starting development server..."
npm run dev
