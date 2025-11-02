#!/usr/bin/env pwsh
Write-Host "🚀 Starting Railway Deployment..." -ForegroundColor Green

# Configuration
$ServiceName = "hamlet-unified"

# 1. Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed" -ForegroundColor Red
    exit 1
}

# 2. Build the Next.js app
Write-Host "🏗️ Building Next.js application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# 3. Deploy to Railway
if (Get-Command railway -ErrorAction SilentlyContinue) {
    Write-Host "📤 Deploying to Railway service: $ServiceName" -ForegroundColor Yellow
    railway up --service $ServiceName
} else {
    Write-Host "⚠️ Railway CLI not found. Running in simulation mode." -ForegroundColor Red
    Write-Host "💡 Install with: npm install -g @railway/cli" -ForegroundColor Cyan
    Write-Host "💡 Then run: railway login && railway link" -ForegroundColor Cyan
}

Write-Host "✅ Deployment script completed successfully!" -ForegroundColor Green
