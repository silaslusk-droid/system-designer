@echo off
REM Design System Generator - Easy Launcher for Windows

echo ========================================
echo Design System Generator
echo ========================================
echo.
echo Starting the app...
echo.
echo The app will open in your browser automatically
echo URL: http://localhost:5173
echo.
echo IMPORTANT: Keep this window open while using the app
echo           Press Ctrl+C to stop the app
echo.

REM Open browser after starting the server
start "" http://localhost:5173

REM Start the dev server
call npm run dev
