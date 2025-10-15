# HAMLET PROJECT - AUTOMATIC FIX SCRIPT
# This script will fix all common issues and get your platform running

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "HAMLET PROJECT - AUTOMATIC SETUP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify we're in the correct directory
Write-Host "[1/6] Verifying directory..." -ForegroundColor Yellow
$currentDir = Get-Location
Write-Host "Current directory: $currentDir" -ForegroundColor White

if ($currentDir.Path -notlike "*Copy-of-Hamlet-social*") {
    Write-Host "❌ ERROR: You must run this script from the Copy-of-Hamlet-social directory!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run:" -ForegroundColor Yellow
    Write-Host "  cd E:\HamletUnified\Copy-of-Hamlet-social" -ForegroundColor White
    Write-Host "  .\FIX_EVERYTHING.ps1" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Directory verified" -ForegroundColor Green
Write-Host ""

# Step 2: Check Node.js and npm
Write-Host "[2/6] Checking Node.js and npm..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: Node.js or npm not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Step 3: Clean install dependencies
Write-Host "[3/6] Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

# Kill any processes on port 3000
Write-Host "  Killing any processes on port 3000..." -ForegroundColor Gray
try {
    npx kill-port 3000 2>$null
} catch {
    # Ignore errors if port is not in use
}

# Remove old installations
Write-Host "  Removing old node_modules..." -ForegroundColor Gray
if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force -ErrorAction SilentlyContinue
}

# Fresh install
Write-Host "  Installing packages..." -ForegroundColor Gray
npm install --silent

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: npm install failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 4: Copy candidate data
Write-Host "[4/6] Copying candidate data..." -ForegroundColor Yellow

# Create public directory if it doesn't exist
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" -Force | Out-Null
}

# Find the latest cleaned candidates file
$candidateFiles = Get-ChildItem -Path "E:\HamletUnified\full_consolidation\candidates\master\" -Filter "CLEANED_CANDIDATES_*.csv" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending

if ($candidateFiles.Count -eq 0) {
    Write-Host "⚠️  WARNING: No cleaned candidate file found!" -ForegroundColor Yellow
    Write-Host "Looking for MASTER_CANDIDATES instead..." -ForegroundColor Gray
    
    $candidateFiles = Get-ChildItem -Path "E:\HamletUnified\full_consolidation\candidates\master\" -Filter "MASTER_CANDIDATES_*.csv" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
}

if ($candidateFiles.Count -gt 0) {
    $sourceFile = $candidateFiles[0].FullName
    $destFile = "public\candidates.csv"
    
    Copy-Item -Path $sourceFile -Destination $destFile -Force
    
    Write-Host "✅ Copied: $($candidateFiles[0].Name)" -ForegroundColor Green
    
    # Count candidates
    $lines = Get-Content $destFile
    $candidateCount = $lines.Count - 1  # Subtract header row
    Write-Host "   Total candidates: $candidateCount" -ForegroundColor White
} else {
    Write-Host "⚠️  WARNING: Could not find candidate data!" -ForegroundColor Yellow
    Write-Host "   You'll need to manually copy your candidate file to public\candidates.csv" -ForegroundColor Gray
}
Write-Host ""

# Step 5: Verify critical files
Write-Host "[5/6] Verifying project files..." -ForegroundColor Yellow

$criticalFiles = @(
    "package.json",
    "vite.config.ts",
    "index.html",
    "index.tsx",
    "components\HamletCandidateBrowser.tsx"
)

$allFilesExist = $true
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (missing)" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "⚠️  Some critical files are missing. The platform may not work correctly." -ForegroundColor Yellow
}
Write-Host ""

# Step 6: Test build
Write-Host "[6/6] Testing production build..." -ForegroundColor Yellow
Write-Host "Building... This may take a minute..." -ForegroundColor Gray

npm run build --silent

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build succeeded!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Build failed, but dev server might still work" -ForegroundColor Yellow
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start the development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Open your browser to:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. To access the candidate browser:" -ForegroundColor White
Write-Host "   Navigate to the Election section" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Ask if user wants to start dev server now
$response = Read-Host "Would you like to start the dev server now? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    npm run dev
} else {
    Write-Host ""
    Write-Host "You can start it manually with: npm run dev" -ForegroundColor Gray
    Write-Host ""
}
