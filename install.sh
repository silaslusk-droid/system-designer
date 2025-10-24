#!/bin/bash
# Design System Generator - Easy Installer for Mac/Linux

echo "🎨 Design System Generator - Installer"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "👉 Visit: https://nodejs.org/"
    echo "👉 Download the LTS version (recommended)"
    echo ""
    echo "After installing Node.js, run this script again."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed!"
    echo "npm should come with Node.js. Please reinstall Node.js."
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 To start the app, run:"
    echo "   ./start.sh"
    echo ""
    echo "Or simply double-click the 'start.sh' file"
else
    echo ""
    echo "❌ Installation failed!"
    echo ""
    echo "Please try again or check for error messages above."
    exit 1
fi
