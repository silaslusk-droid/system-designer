#!/bin/bash
# Design System Generator - Docker Launcher for Mac/Linux

echo "🎨 Design System Generator (Docker)"
echo "===================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed!"
    echo ""
    echo "Please install Docker Desktop first:"
    echo "👉 Visit: https://www.docker.com/products/docker-desktop"
    echo ""
    echo "After installing Docker Desktop:"
    echo "1. Open Docker Desktop"
    echo "2. Wait for it to fully start"
    echo "3. Run this script again"
    exit 1
fi

echo "✅ Docker found: $(docker --version)"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker Desktop is not running!"
    echo ""
    echo "Please start Docker Desktop and try again."
    echo "Look for the Docker icon in your menu bar/system tray."
    exit 1
fi

echo "✅ Docker is running"
echo ""

echo "🚀 Starting Design System Generator..."
echo ""
echo "📦 First time may take 2-5 minutes to download and build..."
echo ""

# Start with docker-compose
docker-compose up --build

echo ""
echo "App is running at: http://localhost:5173"
echo ""
echo "⚠️  Keep this window open while using the app"
echo "⚠️  Press Ctrl+C to stop the app"
echo ""

# Open browser after a short delay
(sleep 5 && open http://localhost:5173 2>/dev/null || xdg-open http://localhost:5173 2>/dev/null) &
