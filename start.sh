#!/bin/bash
# Design System Generator - Easy Launcher for Mac/Linux

echo "🎨 Design System Generator"
echo "=========================="
echo ""
echo "Starting the app..."
echo ""
echo "🌐 The app will open in your browser automatically"
echo "📍 URL: http://localhost:5173"
echo ""
echo "⚠️  Keep this window open while using the app"
echo "⚠️  Press Ctrl+C to stop the app"
echo ""

# Open browser after a short delay
(sleep 3 && open http://localhost:5173 2>/dev/null || xdg-open http://localhost:5173 2>/dev/null) &

# Start the dev server
npm run dev
