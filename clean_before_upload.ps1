[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$projectRoot = Get-Location
$removedItems = [System.Collections.Generic.HashSet[string]]::new()
$skippedItems = [System.Collections.Generic.HashSet[string]]::new()
$notes = New-Object System.Collections.Generic.List[string]

function Get-DisplayPath {
    param([string]$FullPath)

    if ([string]::IsNullOrEmpty($FullPath)) {
        return $FullPath
    }

    try {
        return Resolve-Path -LiteralPath $FullPath -Relative -ErrorAction Stop
    } catch {
        if ($FullPath.StartsWith($projectRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
            $relative = $FullPath.Substring($projectRoot.Length)
            $trimChars = New-Object 'System.Collections.Generic.List[char]'
            $trimChars.Add([System.IO.Path]::DirectorySeparatorChar) | Out-Null
            if ([System.IO.Path]::DirectorySeparatorChar -ne [System.IO.Path]::AltDirectorySeparatorChar) {
                $trimChars.Add([System.IO.Path]::AltDirectorySeparatorChar) | Out-Null
            }

            return $relative.TrimStart($trimChars.ToArray())
        }
    }

    return $FullPath
}

function Get-ProjectType {
    param([string]$Path)

    if (Get-ChildItem -Path $Path -Filter 'next.config.*' -File -ErrorAction SilentlyContinue) {
        return 'Next.js'
    }

    try {
        $packageJson = Get-Content -Path (Join-Path $Path 'package.json') -Raw -ErrorAction Stop | ConvertFrom-Json
        $scripts = $packageJson.scripts
        if ($scripts -and ($scripts.PSObject.Properties.Name -contains 'dev')) {
            $devScript = $scripts.dev
            if ($devScript -match 'next') {
                return 'Next.js'
            }
            if ($devScript -match 'vite') {
                return 'Vite'
            }
        }
    } catch {
        # package.json missing or invalid
    }

    if (Get-ChildItem -Path $Path -Filter 'vite.config.*' -File -ErrorAction SilentlyContinue) {
        return 'Vite'
    }

    return 'Unknown'
}

function Remove-Target {
    param(
        [string]$RelativePath,
        [switch]$IsFile
    )

    if ([System.IO.Path]::IsPathRooted($RelativePath)) {
        $fullPath = $RelativePath
    } else {
        $fullPath = Join-Path $projectRoot $RelativePath
    }

    if (Test-Path -LiteralPath $fullPath) {
        $displayPath = Get-DisplayPath -FullPath $fullPath
        try {
            if ($IsFile) {
                Remove-Item -LiteralPath $fullPath -Force -ErrorAction Stop
            } else {
                Remove-Item -LiteralPath $fullPath -Recurse -Force -ErrorAction Stop
            }
            [void]$removedItems.Add($displayPath)
        } catch {
            $notes.Add("Failed to remove $displayPath: $($_.Exception.Message)")
        }
    } else {
        if ([System.IO.Path]::IsPathRooted($RelativePath)) {
            $displayPath = Get-DisplayPath -FullPath $RelativePath
        } else {
            $displayPath = $RelativePath
        }

        [void]$skippedItems.Add($displayPath)
    }
}

function Remove-PatternMatches {
    param(
        [string[]]$Patterns,
        [switch]$Recurse,
        [switch]$FilesOnly
    )

    if (-not $Patterns -or $Patterns.Count -eq 0) {
        return
    }

    $searchPath = if ($Recurse) { Join-Path $projectRoot '*' } else { $projectRoot }

    foreach ($pattern in $Patterns) {
        $parameters = @{
            Path        = $searchPath
            Include     = $pattern
            Force       = $true
            ErrorAction = 'SilentlyContinue'
        }

        if ($Recurse) {
            $parameters.Recurse = $true
        }

        $items = Get-ChildItem @parameters
        foreach ($item in $items) {
            if ($item.PSIsContainer) {
                if (-not $FilesOnly) {
                    Remove-Target -RelativePath $item.FullName
                }
            } else {
                Remove-Target -RelativePath $item.FullName -IsFile
            }
        }
    }
}

function Get-PackageManager {
    if (Test-Path (Join-Path $projectRoot 'pnpm-lock.yaml')) {
        return @{ Name = 'pnpm'; Install = @('pnpm', 'install', '--frozen-lockfile'); Prune = @('pnpm', 'prune', '--prod') }
    }
    if (Test-Path (Join-Path $projectRoot 'yarn.lock')) {
        return @{ Name = 'yarn'; Install = @('yarn', 'install', '--frozen-lockfile'); Prune = @('yarn', 'install', '--frozen-lockfile', '--production=true') }
    }
    if (Test-Path (Join-Path $projectRoot 'package-lock.json')) {
        return @{ Name = 'npm'; Install = @('npm', 'ci'); Prune = @('npm', 'prune', '--production') }
    }
    if (Test-Path (Join-Path $projectRoot 'bun.lockb')) {
        return @{ Name = 'bun'; Install = @('bun', 'install'); Prune = @('bun', 'install', '--production') }
    }
    if (Test-Path (Join-Path $projectRoot 'package.json')) {
        return @{ Name = 'npm'; Install = @('npm', 'install'); Prune = @('npm', 'prune', '--production') }
    }
    return $null
}

function Invoke-Process {
    param([string[]]$Command)

    if (-not $Command -or -not (Get-Command $Command[0] -ErrorAction SilentlyContinue)) {
        $notes.Add("Skipping command because it is unavailable: $($Command -join ' ')")
        return
    }

    $arguments = @()
    if ($Command.Count -gt 1) {
        $arguments = $Command[1..($Command.Count - 1)]
    }

    & $Command[0] @arguments | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed ($($Command -join ' ')) with exit code $LASTEXITCODE"
    }
}

$projectType = Get-ProjectType -Path $projectRoot

$buildArtifacts = switch ($projectType) {
    'Next.js' { @('.next', '.vercel', 'out', '.turbo') }
    'Vite' { @('dist', '.cache', '.turbo') }
    default { @('.next', 'dist', '.vercel', '.cache', '.turbo') }
}

$commonArtifacts = @('.wrangler', 'build', 'coverage', 'tmp', 'temp', '.tmp', '.parcel-cache', 'node_modules/.cache')

foreach ($artifact in ($buildArtifacts + $commonArtifacts)) {
    Remove-Target -RelativePath $artifact
}

$staleEnvPatterns = @('.env.local', '.env.development', '.env.test', '.env.*.local', '.env.backup')
Remove-PatternMatches -Patterns $staleEnvPatterns -Recurse -FilesOnly

$logPatterns = @('*.log')
Remove-PatternMatches -Patterns $logPatterns -Recurse -FilesOnly

$junkFiles = @('.DS_Store', 'Thumbs.db')
Remove-PatternMatches -Patterns $junkFiles -Recurse -FilesOnly

if (Test-Path (Join-Path $projectRoot 'node_modules')) {
    Remove-Target -RelativePath 'node_modules'
}

$pkgManager = Get-PackageManager
if ($null -ne $pkgManager) {
    try {
        Invoke-Process -Command $pkgManager.Install
        $notes.Add("Dependencies reinstalled with $($pkgManager.Name)")
        Invoke-Process -Command $pkgManager.Prune
        $notes.Add("Pruned development dependencies with $($pkgManager.Name)")
    } catch {
        $notes.Add($_.Exception.Message)
    }
} else {
    $notes.Add('No package manager lockfile found. Skipped dependency reinstall.')
}

$formatSet = {
    param($set)

    if ($set.Count -gt 0) {
        return ($set.ToArray() | Sort-Object) -join ', '
    }

    return 'None'
}

$summary = @()
$summary += "Project: $($projectRoot)"
$summary += "Detected: $projectType"
$summary += "Removed: " + (& $formatSet $removedItems)
$summary += "Missing/Skipped: " + (& $formatSet $skippedItems)
if ($notes.Count -gt 0) {
    $summary += 'Notes:'
    $summary += $notes
}

$summary | ForEach-Object { Write-Host $_ }
exit 0
