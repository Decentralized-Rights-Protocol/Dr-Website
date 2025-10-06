#!/bin/bash

# DRP Learn-to-Earn API Startup Script

echo "🚀 Starting DRP Learn-to-Earn API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create database directory if it doesn't exist
mkdir -p data

# Set environment variables
export EXPLORER_DB="data/learn_progress.db"
export DRP_NODE_URL="http://localhost:8545"
export POLL_INTERVAL_SECONDS="6"

# Start the API server
echo "🌐 Starting FastAPI server on http://localhost:8001..."
echo "📚 API Documentation available at http://localhost:8001/docs"
echo "🔍 Health check available at http://localhost:8001/health"

uvicorn main:app --host 0.0.0.0 --port 8001 --reload
