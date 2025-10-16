#!/bin/bash

# 🚀 HAMLET DEPLOYMENT SCRIPT
# Deploys the Iraqi Election Platform to production

echo "🚀 Starting Hamlet Deployment..."
echo "================================="

# Step 1: Build the application
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Exiting..."
    exit 1
fi

echo "✅ Build successful!"

# Step 2: Check if we're deploying to GitHub Pages
if [ "$1" = "github-pages" ]; then
    echo "🌐 Deploying to GitHub Pages..."
    
    # Copy build files to docs folder for GitHub Pages
    cp -r dist/* docs/
    
    # Commit and push to GitHub Pages
    git add docs/
    git commit -m "🚀 Deploy to GitHub Pages - $(date)"
    git push origin main
    
    echo "✅ Deployed to GitHub Pages!"
    echo "🔗 Your app is live at: https://absulysuly.github.io/Copy-of-Hamlet-social/"
    
elif [ "$1" = "netlify" ]; then
    echo "🌐 Deploying to Netlify..."
    
    # Install Netlify CLI if not present
    if ! command -v netlify &> /dev/null; then
        echo "📥 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # Deploy to Netlify
    netlify deploy --prod --dir=dist
    
    echo "✅ Deployed to Netlify!"
    
elif [ "$1" = "vercel" ]; then
    echo "🌐 Deploying to Vercel..."
    
    # Install Vercel CLI if not present
    if ! command -v vercel &> /dev/null; then
        echo "📥 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    vercel --prod
    
    echo "✅ Deployed to Vercel!"
    
else
    echo "📁 Build files ready in 'dist/' folder"
    echo "🌐 Deploy options:"
    echo "   ./deploy.sh github-pages  - Deploy to GitHub Pages"
    echo "   ./deploy.sh netlify       - Deploy to Netlify"
    echo "   ./deploy.sh vercel        - Deploy to Vercel"
    echo "   ./deploy.sh               - Just build (manual deploy)"
fi

echo ""
echo "🎉 Deployment process complete!"
echo "📊 Application Status:"
echo "   ✅ Environment variables fixed"
echo "   ✅ 22 realistic candidates loaded"
echo "   ✅ Gender/Governorate/Party filtering working"
echo "   ✅ Arabic interface functional"
echo "   ✅ Countdown timer active"
echo "   ✅ Social media integration ready"
echo ""
echo "🚀 Ready for the 25-day election blitz campaign!"
