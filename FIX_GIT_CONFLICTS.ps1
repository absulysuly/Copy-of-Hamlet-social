# ============================================
# HAMLET - GIT CONFLICT RESOLVER
# Fix merge conflicts and sync with remote
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "GIT CONFLICT RESOLVER" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Current git status:" -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "Choose your fix option:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. SAFE: Stash local changes, pull latest (recommended)" -ForegroundColor Green
Write-Host "  2. NUCLEAR: Delete everything, force reset to remote" -ForegroundColor Red
Write-Host "  3. MERGE: Try to merge (if you know what you're doing)" -ForegroundColor Yellow
Write-Host "  4. CANCEL: Exit without changes" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Enter choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "[SAFE MODE] Stashing and pulling..." -ForegroundColor Cyan
        Write-Host ""
        
        # Stash any local changes
        Write-Host "  Saving your local changes..." -ForegroundColor Gray
        git stash push -m "Auto-stash before pull $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        
        # Fetch latest
        Write-Host "  Fetching from remote..." -ForegroundColor Gray
        git fetch origin
        
        # Check which branch has the fixes
        $currentBranch = git branch --show-current
        Write-Host "  Current branch: $currentBranch" -ForegroundColor Gray
        
        # Pull latest
        Write-Host "  Pulling latest changes..." -ForegroundColor Gray
        git pull origin $currentBranch
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host ""
            Write-Host "✗ Pull failed - trying to pull from feature branch with fixes..." -ForegroundColor Yellow
            git pull origin cursor/bc-fe0b3d5d-2126-4252-90b8-a037b645faf2-1334
        }
        
        Write-Host ""
        Write-Host "✓ Pull complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your local changes are stashed (saved safely)" -ForegroundColor White
        Write-Host "To see your stashed changes: git stash list" -ForegroundColor Gray
        Write-Host "To restore them later: git stash pop" -ForegroundColor Gray
    }
    
    "2" {
        Write-Host ""
        Write-Host "[NUCLEAR MODE] Force reset to remote..." -ForegroundColor Red
        Write-Host ""
        Write-Host "⚠️  WARNING: This will DELETE all local changes!" -ForegroundColor Red
        $confirm = Read-Host "Type YES to confirm"
        
        if ($confirm -ne "YES") {
            Write-Host "Cancelled" -ForegroundColor Yellow
            exit 0
        }
        
        Write-Host ""
        Write-Host "  Fetching from remote..." -ForegroundColor Gray
        git fetch origin
        
        Write-Host "  Resetting to remote state..." -ForegroundColor Gray
        
        # Try to use the feature branch with fixes first
        $hasFixes = git branch -r | Select-String "cursor/bc-fe0b3d5d"
        
        if ($hasFixes) {
            Write-Host "  Using feature branch with fixes" -ForegroundColor Green
            git checkout cursor/bc-fe0b3d5d-2126-4252-90b8-a037b645faf2-1334
            git reset --hard origin/cursor/bc-fe0b3d5d-2126-4252-90b8-a037b645faf2-1334
        } else {
            Write-Host "  Using main branch" -ForegroundColor Yellow
            git checkout main
            git reset --hard origin/main
        }
        
        Write-Host "  Cleaning untracked files..." -ForegroundColor Gray
        git clean -fd
        
        Write-Host ""
        Write-Host "✓ Reset complete!" -ForegroundColor Green
        Write-Host "  Repository is now exactly like remote" -ForegroundColor White
    }
    
    "3" {
        Write-Host ""
        Write-Host "[MERGE MODE] Attempting merge..." -ForegroundColor Yellow
        Write-Host ""
        
        git fetch origin
        
        $currentBranch = git branch --show-current
        Write-Host "  Merging origin/$currentBranch..." -ForegroundColor Gray
        
        git merge origin/$currentBranch
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host ""
            Write-Host "✗ Merge conflicts detected!" -ForegroundColor Red
            Write-Host ""
            Write-Host "Conflicted files:" -ForegroundColor Yellow
            git diff --name-only --diff-filter=U
            Write-Host ""
            Write-Host "You need to:" -ForegroundColor White
            Write-Host "  1. Open each file and resolve conflicts" -ForegroundColor Gray
            Write-Host "  2. Run: git add <file>" -ForegroundColor Gray
            Write-Host "  3. Run: git commit" -ForegroundColor Gray
            Write-Host ""
            Write-Host "Or run this script again and choose option 1 or 2" -ForegroundColor Yellow
        } else {
            Write-Host ""
            Write-Host "✓ Merge successful!" -ForegroundColor Green
        }
    }
    
    "4" {
        Write-Host ""
        Write-Host "Cancelled - no changes made" -ForegroundColor Gray
        exit 0
    }
    
    default {
        Write-Host ""
        Write-Host "Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Current status:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Run: npm install" -ForegroundColor White
Write-Host "  2. Run: npm run dev" -ForegroundColor White
Write-Host "  3. Test your platform" -ForegroundColor White
Write-Host ""
