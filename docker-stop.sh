#!/bin/bash
# Design System Generator - Docker Stop Script for Mac/Linux

echo "🛑 Stopping Design System Generator..."
echo ""

docker-compose down

echo "✅ App stopped successfully!"
echo ""
echo "To start again, run: ./docker-start.sh"
