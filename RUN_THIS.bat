@echo off
echo ========================================
echo SMART CAMPAIGN - DEPLOYMENT TEST
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
echo.

echo Step 2: Building project...
call npm run build
echo.

echo Step 3: Starting preview server...
echo Open browser to: http://localhost:4173
call npm run preview

pause
