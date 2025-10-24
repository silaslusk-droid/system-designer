@echo off
REM Design System Generator - Docker Launcher for Windows

echo ========================================
echo Design System Generator (Docker)
echo ========================================
echo.

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Docker is not installed!
    echo.
    echo Please install Docker Desktop first:
    echo Visit: https://www.docker.com/products/docker-desktop
    echo.
    echo After installing Docker Desktop:
    echo 1. Open Docker Desktop
    echo 2. Wait for it to fully start
    echo 3. Run this script again
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('docker --version') do set DOCKER_VERSION=%%i
echo Docker found: %DOCKER_VERSION%
echo.

REM Check if Docker is running
docker info >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Docker Desktop is not running!
    echo.
    echo Please start Docker Desktop and try again.
    echo Look for the Docker icon in your system tray.
    pause
    exit /b 1
)

echo Docker is running
echo.

echo Starting Design System Generator...
echo.
echo First time may take 2-5 minutes to download and build...
echo.

REM Open browser after a short delay
start "" http://localhost:5173

REM Start with docker-compose
docker-compose up --build

echo.
echo App is running at: http://localhost:5173
echo.
echo IMPORTANT: Keep this window open while using the app
echo            Press Ctrl+C to stop the app
echo.
