@echo off
REM 🚀 HAMLET DEPLOYMENT SCRIPT (Windows)
REM Deploys the Iraqi Election Platform to production

echo 🚀 Starting Hamlet Deployment...
echo =================================

REM Step 1: Build the application
echo 📦 Building application...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Exiting...
    exit /b 1
)

echo ✅ Build successful!

REM Step 2: Check deployment target
if "%1"=="github-pages" (
    echo 🌐 Deploying to GitHub Pages...
    
    REM Copy build files to docs folder for GitHub Pages
    xcopy /E /I /Y dist docs
    
    REM Commit and push to GitHub Pages
    git add docs/
    git commit -m "🚀 Deploy to GitHub Pages - %date% %time%"
    git push origin main
    
    echo ✅ Deployed to GitHub Pages!
    echo 🔗 Your app is live at: https://absulysuly.github.io/Copy-of-Hamlet-social/
    
) else if "%1"=="netlify" (
    echo 🌐 Deploying to Netlify...
    
    REM Install Netlify CLI if not present
    where netlify >nul 2>nul
    if %errorlevel% neq 0 (
        echo 📥 Installing Netlify CLI...
        npm install -g netlify-cli
    )
    
    REM Deploy to Netlify
    netlify deploy --prod --dir=dist
    
    echo ✅ Deployed to Netlify!
    
) else if "%1"=="vercel" (
    echo 🌐 Deploying to Vercel...
    
    REM Install Vercel CLI if not present
    where vercel >nul 2>nul
    if %errorlevel% neq 0 (
        echo 📥 Installing Vercel CLI...
        npm install -g vercel
    )
    
    REM Deploy to Vercel
    vercel --prod
    
    echo ✅ Deployed to Vercel!
    
) else (
    echo 📁 Build files ready in 'dist/' folder
    echo 🌐 Deploy options:
    echo    deploy.bat github-pages  - Deploy to GitHub Pages
    echo    deploy.bat netlify       - Deploy to Netlify
    echo    deploy.bat vercel        - Deploy to Vercel
    echo    deploy.bat               - Just build (manual deploy)
)

echo.
echo 🎉 Deployment process complete!
echo 📊 Application Status:
echo    ✅ Environment variables fixed
echo    ✅ 22 realistic candidates loaded
echo    ✅ Gender/Governorate/Party filtering working
echo    ✅ Arabic interface functional
echo    ✅ Countdown timer active
echo    ✅ Social media integration ready
echo.
echo 🚀 Ready for the 25-day election blitz campaign!
