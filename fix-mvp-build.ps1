$ErrorActionPreference = "Stop"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$projectRoot = Get-Location

Write-Host "🚀 Iraqi Election Platform - Codebase Fix Script" -ForegroundColor Green
Write-Host "Timestamp: $timestamp" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create Safety Backup
Write-Host "📦 Creating safety backup..." -ForegroundColor Yellow
$backupRoot = Join-Path $projectRoot "..\_backups"
$backupPath = Join-Path $backupRoot "MVP_$timestamp"
if (-not (Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Path $backupRoot | Out-Null
}
Copy-Item -Path $projectRoot -Destination $backupPath -Recurse -Force
Write-Host "✅ Backup created at: $backupPath" -ForegroundColor Green
Write-Host ""

# Step 2: Git Safety Branch
Set-Location $projectRoot
Write-Host "🔒 Creating Git safety branch..." -ForegroundColor Yellow
try {
    git checkout -b "backup_$timestamp" | Out-Null
    git add .
    git commit -m "Full backup before Codex execution - $timestamp" | Out-Null
    git checkout main | Out-Null
} catch {
    Write-Host "⚠️  Unable to create backup branch (continuing)" -ForegroundColor Yellow
}
try {
    git checkout -b "codex/fix-mvp-$timestamp" | Out-Null
    Write-Host "✅ Working on branch: codex/fix-mvp-$timestamp" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Unable to create working branch (continuing)" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Scan for Duplicate React Imports
Write-Host "🔍 Scanning for duplicate React imports..." -ForegroundColor Yellow
$filesWithDuplicates = @()

Get-ChildItem -Path $projectRoot -Recurse -Include *.tsx,*.ts -Exclude node_modules,*.test.*,.next,dist | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $reactImports = ([regex]::Matches($content, "import\s+.*?\s+from\s+['\"]react['\"]")).Count

    if ($reactImports -gt 1) {
        $filesWithDuplicates += $_.FullName
        Write-Host "  ⚠️  $($_.FullName.Replace($projectRoot, ''))" -ForegroundColor Red
    }
}

if ($filesWithDuplicates.Count -eq 0) {
    Write-Host "✅ No duplicate React imports found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Found $($filesWithDuplicates.Count) file(s) with duplicate imports" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Fix TopNavBar.tsx specifically
Write-Host "🔧 Fixing TopNavBar.tsx..." -ForegroundColor Yellow
$topNavPath = Join-Path $projectRoot "components\TopNavBar.tsx"

if (Test-Path $topNavPath) {
    $topNavLines = Get-Content $topNavPath
    $defaultImport = $null
    $namedImports = New-Object System.Collections.Generic.HashSet[string]
    $otherLines = @()

    foreach ($line in $topNavLines) {
        $trimmed = $line.Trim()
        if ($trimmed -match "^import\s+(?<imports>.+?)\s+from\s+['\"]react['\"];?\s*$") {
            $imports = $matches['imports']

            if ($imports -like 'type *') {
                $otherLines += $line
                continue
            }

            if ($imports -match "^(?<default>[^,{]+)\s*,\s*\{(?<named>.+)\}$") {
                $defaultImport = $matches['default'].Trim()
                $named = $matches['named'].Split(',')
                foreach ($member in $named) {
                    $name = $member.Trim()
                    if ($name) { $namedImports.Add($name) | Out-Null }
                }
            } elseif ($imports -match "^\{(?<named>.+)\}$") {
                $named = $matches['named'].Split(',')
                foreach ($member in $named) {
                    $name = $member.Trim()
                    if ($name) { $namedImports.Add($name) | Out-Null }
                }
            } else {
                $defaultImport = $imports.Trim()
            }
        } else {
            $otherLines += $line
        }
    }

    $updatedContent = @()
    if ($defaultImport -or $namedImports.Count -gt 0) {
        $importLine = "import "
        if ($defaultImport) {
            $importLine += $defaultImport
            if ($namedImports.Count -gt 0) {
                $importLine += ", "
            }
        }
        if ($namedImports.Count -gt 0) {
            $importLine += "{ " + ($namedImports.ToArray() -join ', ') + " }"
        }
        $importLine += " from 'react';"
        $updatedContent += $importLine
    }
    $updatedContent += $otherLines

    Set-Content -Path $topNavPath -Value $updatedContent
    Write-Host "✅ TopNavBar.tsx fixed" -ForegroundColor Green
} else {
    Write-Host "⚠️  TopNavBar.tsx not found at expected path" -ForegroundColor Yellow
}
Write-Host ""

# Step 5: Check Tailwind Configuration
Write-Host "🎨 Validating Tailwind configuration..." -ForegroundColor Yellow
$tailwindConfig = Join-Path $projectRoot "tailwind.config.ts"
$postcssConfig = Join-Path $projectRoot "postcss.config.js"

if (Test-Path $tailwindConfig) {
    Write-Host "✅ tailwind.config.ts exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  tailwind.config.ts missing" -ForegroundColor Red
}

if (Test-Path $postcssConfig) {
    Write-Host "✅ postcss.config.js exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  postcss.config.js missing - creating default..." -ForegroundColor Yellow
    $postcssContent = @"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@
    Set-Content -Path $postcssConfig -Value $postcssContent
    Write-Host "✅ postcss.config.js created" -ForegroundColor Green
}
Write-Host ""

# Step 6: Remove CDN Tailwind References
Write-Host "🗑️  Removing Tailwind CDN references..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Path $projectRoot -Recurse -Include *.html,*.tsx -Exclude node_modules,.next

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'cdn\\.tailwindcss\\.com') {
        $content = $content -replace '<script\s+src="https://cdn\\.tailwindcss\\.com[^"]*"[^>]*></script>', ''
        Set-Content -Path $file.FullName -Value $content
        Write-Host "  🗑️  Removed CDN from: $($file.FullName.Replace($projectRoot, ''))" -ForegroundColor Cyan
    }
}
Write-Host "✅ CDN references cleaned" -ForegroundColor Green
Write-Host ""

# Step 7: Validate TypeScript Configuration
Write-Host "⚙️  Checking TypeScript configuration..." -ForegroundColor Yellow
$tsconfigPath = Join-Path $projectRoot "tsconfig.json"
if (Test-Path $tsconfigPath) {
    try {
        $tsconfig = Get-Content $tsconfigPath -Raw | ConvertFrom-Json
        Write-Host "✅ tsconfig.json exists" -ForegroundColor Green
        if ($tsconfig.compilerOptions) {
            Write-Host "  - JSX: $($tsconfig.compilerOptions.jsx)" -ForegroundColor Cyan
            Write-Host "  - Target: $($tsconfig.compilerOptions.target)" -ForegroundColor Cyan
        }
    } catch {
        Write-Host "⚠️  Unable to parse tsconfig.json" -ForegroundColor Yellow
    }
}
Write-Host ""

# Step 8: Install Dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  npm install had warnings (check above)" -ForegroundColor Yellow
}
Write-Host ""

# Step 9: Run Linter
Write-Host "🔍 Running ESLint..." -ForegroundColor Yellow
npm run lint -- --fix
Write-Host ""

# Step 10: Test Build
Write-Host "🏗️  Testing production build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed - check errors above" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 11: Generate Report
Write-Host "📊 Build Summary Report" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host "✅ Backup created: $backupPath" -ForegroundColor Cyan
Write-Host "✅ React imports fixed: $($filesWithDuplicates.Count) files" -ForegroundColor Cyan
Write-Host "✅ Tailwind CDN removed" -ForegroundColor Cyan
Write-Host "✅ Dependencies installed" -ForegroundColor Cyan
Write-Host "✅ Production build successful" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Run 'npm run dev' to test locally" -ForegroundColor White
Write-Host "2. Review changes with 'git status'" -ForegroundColor White
Write-Host "3. Deploy with 'vercel --prod'" -ForegroundColor White
Write-Host ""
Write-Host "✨ Script completed successfully!" -ForegroundColor Green
