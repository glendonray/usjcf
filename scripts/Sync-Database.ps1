<#
.SYNOPSIS
  Pull staging database into local Docker environment.
  Replaces all staging URLs with http://localhost:8080.

.DESCRIPTION
  Exports the staging database via SSH + WP-CLI and pipes it directly into
  the local MariaDB container. Then runs WP-CLI search-replace for content URLs.

.PREREQUISITES
  - Docker containers running: docker compose up -d
  - Git Bash installed (comes with Git for Windows)
  - SSH key configured for usjcfoundation host alias

.EXAMPLE
  .\scripts\Sync-Database.ps1
#>
param(
    [string]$StagingWpRoot = "/home/customer/www/staging7.usjcfoundation.com/public_html",
    [string]$StagingUrl    = "https://staging7.usjcfoundation.com",
    [string]$LocalUrl      = "http://localhost:8080",
    [string]$SshHost       = "usjcfoundation",
    [string]$DbName        = "usjcf_local",
    [string]$DbUser        = "usjcf",
    [string]$DbPass        = "usjcf_local"
)

$repoRoot  = Split-Path $PSScriptRoot -Parent
$bashPath  = "C:\Program Files\Git\bin\bash.exe"
$repoPosix = ($repoRoot -replace '\\', '/') -replace '^([A-Za-z]):', '/$1'

if (-not (Test-Path $bashPath)) {
    Write-Error "Git Bash not found at $bashPath. Install Git for Windows."
    exit 1
}

Write-Host "Checking Docker containers are running..."
$wpContainer = & docker compose --project-directory $repoRoot ps -q wordpress 2>$null
if (-not $wpContainer) {
    Write-Error "WordPress container is not running. Run: docker compose up -d"
    exit 1
}

Write-Host "Exporting staging DB and importing into local container..."
& $bashPath -c @"
ssh $SshHost '~/bin/wp db export - --path=$StagingWpRoot --add-drop-table' \
  | docker compose --project-directory '$repoPosix' exec -T db \
      mysql -u $DbUser -p$DbPass $DbName
"@

if ($LASTEXITCODE -ne 0) {
    Write-Error "Database import failed. Check SSH connection: ssh $SshHost"
    exit 1
}

Write-Host "Running URL search-replace..."
& $bashPath -c "cd '$repoPosix' && docker compose run --rm wpcli wp search-replace '$StagingUrl' '$LocalUrl' --all-tables"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Search-replace failed."
    exit 1
}

Write-Host ""
Write-Host "Done. Visit $LocalUrl to verify."
Write-Host "WP admin: $LocalUrl/wp-admin"
