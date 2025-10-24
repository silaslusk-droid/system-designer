@echo off
REM Design System Generator - Easy Installer for Windows

echo ========================================
echo Design System Generator - Installer
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo Visit: https://nodejs.org/
    echo Download the LTS version ^(recommended^)
    echo.
    echo After installing Node.js, run this script again.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js found: %NODE_VERSION%
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X npm is not installed!
    echo npm should come with Node.js. Please reinstall Node.js.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo npm found: %NPM_VERSION%
echo.

echo Installing dependencies...
echo This may take a few minutes...
echo.

call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Installation complete!
    echo.
    echo To start the app, double-click 'start.bat'
    echo.
    pause
) else (
    echo.
    echo Installation failed!
    echo.
    echo Please try again or check for error messages above.
    echo.
    pause
    exit /b 1
)
