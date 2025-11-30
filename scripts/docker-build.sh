#!/bin/bash

# Docker Build Script for DRP Backend API
# This script builds and tests the DRP backend API in Docker

set -e

echo "🐳 Building DRP Backend API Docker Image..."

cd backend/drp-website-api

# Build Docker image
echo "Building Docker image..."
docker build -t drp-api:latest .

echo "✅ Docker image built successfully!"
echo ""
echo "To run the container:"
echo "  docker run -p 8000:8000 --env-file .env drp-api:latest"
echo ""
echo "Or use docker-compose:"
echo "  cd backend/drp-website-api"
echo "  docker-compose up"

