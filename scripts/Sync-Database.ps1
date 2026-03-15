<#
.SYNOPSIS
  Pull staging database into local Docker environment.
  Replaces all staging URLs with http://localhost:8080.

.DESCRIPTION
  Exports the staging database via SSH + WP-CLI, saves to a temp file,
  imports into the local MariaDB container, then runs URL search-replace.
  Uses Windows OpenSSH (built-in) — no WSL or Git Bash required.

.PREREQUISITES
  - Docker containers running: docker compose up -d
  - SSH key configured for usjcfoundation host alias in ~/.ssh/config

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

$repoRoot = Split-Path $PSScriptRoot -Parent
$tmpSql   = [System.IO.Path]::Combine($env:TEMP, "usjcf-sync.sql")

# Verify ssh is available
if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    Write-Error "ssh not found. Enable OpenSSH in Windows Settings > Optional Features."
    exit 1
}

# Verify Docker containers are running
Write-Host "Checking Docker containers are running..."
$wpContainer = & docker compose --project-directory $repoRoot ps -q wordpress 2>$null
if (-not $wpContainer) {
    Write-Error "WordPress container is not running. Run: docker compose up -d"
    exit 1
}

# Wait for MariaDB to be ready (can take 15-30s after a fresh start)
Write-Host "Waiting for MariaDB to be ready..."
$maxWait = 60
$waited  = 0
do {
    & docker compose --project-directory $repoRoot exec -T db mysqladmin ping "-u$DbUser" "-p$DbPass" --silent 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { break }
    Start-Sleep -Seconds 3
    $waited += 3
    Write-Host "  Still waiting... ($waited s)"
} while ($waited -lt $maxWait)

if ($LASTEXITCODE -ne 0) {
    Write-Error "MariaDB did not become ready after $maxWait seconds."
    exit 1
}
Write-Host "  MariaDB is ready."

# Export DB from staging via SSH
# PowerShell decodes external command output using [Console]::OutputEncoding, which defaults
# to CP437 on Windows. Force UTF-8 so the SQL dump's Unicode content is preserved correctly.
Write-Host "Exporting staging DB via SSH..."
$prevOutputEncoding = [Console]::OutputEncoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$sqlLines = & ssh $SshHost "~/bin/wp db export - --path=$StagingWpRoot --add-drop-table"
[Console]::OutputEncoding = $prevOutputEncoding
if ($LASTEXITCODE -ne 0 -or -not $sqlLines) {
    Write-Error "SSH export failed. Test connection with: ssh $SshHost `"echo ok`""
    exit 1
}

# Write to temp file (UTF-8 without BOM to avoid MySQL parse errors)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($tmpSql, [string[]]$sqlLines, $utf8NoBom)
Write-Host "  Saved to: $tmpSql"

# Copy SQL file into the container and import from there (avoids pipe encoding issues)
Write-Host "Importing into local MariaDB container..."
$dbContainerId = & docker compose --project-directory $repoRoot ps -q db
docker cp $tmpSql "${dbContainerId}:/tmp/usjcf-import.sql"
docker exec $dbContainerId sh -c "mysql -u$DbUser -p${DbPass} $DbName < /tmp/usjcf-import.sql"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Database import failed."
    exit 1
}
docker exec $dbContainerId rm /tmp/usjcf-import.sql

# Search-replace staging URL with local URL
Write-Host "Running URL search-replace..."
& docker compose --project-directory $repoRoot run --rm wpcli wp search-replace $StagingUrl $LocalUrl --all-tables
if ($LASTEXITCODE -ne 0) {
    Write-Error "Search-replace failed."
    exit 1
}

Remove-Item $tmpSql -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Done. Visit $LocalUrl"
Write-Host "WP admin: $LocalUrl/wp-admin"
