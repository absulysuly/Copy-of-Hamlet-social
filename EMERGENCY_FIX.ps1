# ============================================
# HAMLET EMERGENCY FIX SCRIPT
# Run this if EVERYTHING is broken
# ============================================

Write-Host "============================================" -ForegroundColor Red
Write-Host "HAMLET EMERGENCY FIX - NUCLEAR OPTION" -ForegroundColor Red
Write-Host "============================================" -ForegroundColor Red
Write-Host ""
Write-Host "This script will:" -ForegroundColor Yellow
Write-Host "  1. Force delete node_modules (even with permissions)" -ForegroundColor White
Write-Host "  2. Reset git to clean state" -ForegroundColor White
Write-Host "  3. Pull latest working code" -ForegroundColor White
Write-Host "  4. Fresh install everything" -ForegroundColor White
Write-Host ""

$response = Read-Host "This will DELETE local changes. Continue? (type YES)"
if ($response -ne "YES") {
    Write-Host "Cancelled. No changes made." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "[STEP 1/6] Killing Node processes..." -ForegroundColor Cyan

# Kill any node processes that might be locking files
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process vite -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "✓ Processes killed" -ForegroundColor Green
Write-Host ""

Write-Host "[STEP 2/6] Forcing node_modules deletion..." -ForegroundColor Cyan

# Method 1: PowerShell force delete
if (Test-Path "node_modules") {
    Write-Host "  Attempting PowerShell force delete..." -ForegroundColor Gray
    Remove-Item "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

# Method 2: If still exists, use robocopy trick (Windows only)
if (Test-Path "node_modules") {
    Write-Host "  Attempting robocopy method..." -ForegroundColor Gray
    
    # Create empty directory
    $emptyDir = "empty_temp_dir"
    New-Item -ItemType Directory -Path $emptyDir -Force | Out-Null
    
    # Use robocopy to mirror empty directory (deletes everything)
    robocopy $emptyDir node_modules /MIR /R:0 /W:0 | Out-Null
    
    # Clean up
    Remove-Item $emptyDir -Force
    Remove-Item "node_modules" -Force -ErrorAction SilentlyContinue
}

# Method 3: If STILL exists, use rd command
if (Test-Path "node_modules") {
    Write-Host "  Attempting rd command..." -ForegroundColor Gray
    cmd /c "rd /s /q node_modules" 2>$null
}

if (Test-Path "node_modules") {
    Write-Host "✗ Could not delete node_modules" -ForegroundColor Red
    Write-Host "  Please manually delete it in File Explorer:" -ForegroundColor Yellow
    Write-Host "  1. Close all programs" -ForegroundColor White
    Write-Host "  2. Restart computer if needed" -ForegroundColor White
    Write-Host "  3. Delete node_modules folder manually" -ForegroundColor White
    Write-Host "  4. Re-run this script" -ForegroundColor White
    Read-Host "Press Enter to exit"
    exit 1
} else {
    Write-Host "✓ node_modules deleted" -ForegroundColor Green
}

# Also delete package-lock.json
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force
    Write-Host "✓ package-lock.json deleted" -ForegroundColor Green
}

Write-Host ""
Write-Host "[STEP 3/6] Resetting git to clean state..." -ForegroundColor Cyan

# Fetch latest from remote
git fetch origin 2>&1 | Out-Null

# Check if we have the feature branch with fixes
$hasFixes = git branch -r | Select-String "cursor/bc-fe0b3d5d"

if ($hasFixes) {
    Write-Host "  Found feature branch with fixes" -ForegroundColor Gray
    git checkout cursor/bc-fe0b3d5d-2126-4252-90b8-a037b645faf2-1334 2>&1 | Out-Null
    git reset --hard origin/cursor/bc-fe0b3d5d-2126-4252-90b8-a037b645faf2-1334 2>&1 | Out-Null
} else {
    Write-Host "  Using main branch" -ForegroundColor Gray
    git checkout main 2>&1 | Out-Null
    git reset --hard origin/main 2>&1 | Out-Null
}

# Clean untracked files
git clean -fd 2>&1 | Out-Null

Write-Host "✓ Git reset complete" -ForegroundColor Green
Write-Host ""

Write-Host "[STEP 4/6] Creating public directory..." -ForegroundColor Cyan

# Create public directory if it doesn't exist
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" -Force | Out-Null
}

Write-Host "✓ Public directory ready" -ForegroundColor Green
Write-Host ""

Write-Host "[STEP 5/6] Installing dependencies..." -ForegroundColor Cyan
Write-Host "  This will take 2-5 minutes..." -ForegroundColor Gray

# Fresh install
npm install --loglevel=error

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ npm install failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try these fixes:" -ForegroundColor Yellow
    Write-Host "  1. Check internet connection" -ForegroundColor White
    Write-Host "  2. Run as Administrator" -ForegroundColor White
    Write-Host "  3. Disable antivirus temporarily" -ForegroundColor White
    Write-Host "  4. Clear npm cache: npm cache clean --force" -ForegroundColor White
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "[STEP 6/6] Copying candidate data..." -ForegroundColor Cyan

# Find candidate data
$candidateFiles = Get-ChildItem -Path "E:\HamletUnified\full_consolidation\candidates\master\" -Filter "*.csv" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending

if ($candidateFiles.Count -gt 0) {
    $sourceFile = $candidateFiles[0].FullName
    Copy-Item -Path $sourceFile -Destination "public\candidates.csv" -Force
    Write-Host "✓ Candidate data copied: $($candidateFiles[0].Name)" -ForegroundColor Green
} else {
    Write-Host "⚠ No candidate data found" -ForegroundColor Yellow
    Write-Host "  Please manually copy your CSV to: public\candidates.csv" -ForegroundColor Gray
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "EMERGENCY FIX COMPLETE!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your platform is now ready!" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Start dev server: npm run dev" -ForegroundColor White
Write-Host "  2. Open browser: http://localhost:3000" -ForegroundColor White
Write-Host "  3. Verify candidates load" -ForegroundColor White
Write-Host ""

$response = Read-Host "Start dev server now? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
    Write-Host ""
    npm run dev
} else {
    Write-Host ""
    Write-Host "You can start it later with: npm run dev" -ForegroundColor Gray
}
