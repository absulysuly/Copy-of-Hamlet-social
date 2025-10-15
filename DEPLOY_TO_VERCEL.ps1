# ============================================
# HAMLET PLATFORM - VERCEL DEPLOYMENT
# Automated deployment to production
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "HAMLET PLATFORM - VERCEL DEPLOYMENT" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "[STEP 1/5] Installing Vercel CLI..." -ForegroundColor Yellow
    Write-Host "  This is needed to deploy from command line" -ForegroundColor Gray
    Write-Host ""
    
    npm install -g vercel
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install Vercel CLI" -ForegroundColor Red
        Write-Host ""
        Write-Host "Alternative: Deploy via Vercel website" -ForegroundColor Yellow
        Write-Host "  1. Go to https://vercel.com" -ForegroundColor White
        Write-Host "  2. Sign in with GitHub" -ForegroundColor White
        Write-Host "  3. Click 'New Project'" -ForegroundColor White
        Write-Host "  4. Import: Copy-of-Hamlet-social" -ForegroundColor White
        Write-Host "  5. Click 'Deploy'" -ForegroundColor White
        Write-Host ""
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    Write-Host "✓ Vercel CLI installed" -ForegroundColor Green
} else {
    Write-Host "[STEP 1/5] Vercel CLI found ✓" -ForegroundColor Green
}

Write-Host ""
Write-Host "[STEP 2/5] Checking candidate data..." -ForegroundColor Yellow

if (-not (Test-Path "public\candidates.csv")) {
    Write-Host "✗ Candidate data missing!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Looking for candidate files..." -ForegroundColor Gray
    
    $candidateFiles = Get-ChildItem -Path "E:\HamletUnified\full_consolidation\candidates\master\" -Filter "*.csv" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
    
    if ($candidateFiles.Count -gt 0) {
        $sourceFile = $candidateFiles[0].FullName
        Write-Host "  Found: $($candidateFiles[0].Name)" -ForegroundColor White
        
        if (-not (Test-Path "public")) {
            New-Item -ItemType Directory -Path "public" -Force | Out-Null
        }
        
        Copy-Item -Path $sourceFile -Destination "public\candidates.csv" -Force
        Write-Host "✓ Candidate data copied" -ForegroundColor Green
    } else {
        Write-Host "✗ No candidate files found!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please manually copy your candidate CSV to:" -ForegroundColor Yellow
        Write-Host "  public\candidates.csv" -ForegroundColor White
        Write-Host ""
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-Host "✓ Candidate data found" -ForegroundColor Green
}

Write-Host ""
Write-Host "[STEP 3/5] Testing production build..." -ForegroundColor Yellow
Write-Host "  Building optimized version..." -ForegroundColor Gray

npm run build --silent

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Build failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Yellow
    Write-Host "  1. Run: npm install" -ForegroundColor White
    Write-Host "  2. Fix any TypeScript errors" -ForegroundColor White
    Write-Host "  3. Check package.json is correct" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Build successful" -ForegroundColor Green

# Check build size
$distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "  Build size: $([math]::Round($distSize, 2)) MB" -ForegroundColor Gray

Write-Host ""
Write-Host "[STEP 4/5] Logging into Vercel..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  A browser window will open for authentication" -ForegroundColor Gray
Write-Host "  Please sign in with GitHub" -ForegroundColor Gray
Write-Host ""

vercel login

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Login failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[STEP 5/5] Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "  This will take 1-2 minutes..." -ForegroundColor Gray
Write-Host ""

# Deploy to production
vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Deployment failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try deploying via website instead:" -ForegroundColor Yellow
    Write-Host "  https://vercel.com/new" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your platform is now LIVE!" -ForegroundColor White
Write-Host ""
Write-Host "Vercel will show you the URL above" -ForegroundColor Gray
Write-Host "It will look like: https://copy-of-hamlet-social-xxx.vercel.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Open the URL and test your platform" -ForegroundColor White
Write-Host "  2. Share the link with candidates" -ForegroundColor White
Write-Host "  3. (Optional) Add a custom domain in Vercel dashboard" -ForegroundColor White
Write-Host ""
Write-Host "Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host ""
