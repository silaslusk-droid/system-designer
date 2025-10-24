@echo off
REM Design System Generator - Docker Stop Script for Windows

echo Stopping Design System Generator...
echo.

docker-compose down

echo.
echo App stopped successfully!
echo.
echo To start again, double-click docker-start.bat
pause
