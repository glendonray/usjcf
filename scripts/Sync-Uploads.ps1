<#
.SYNOPSIS
  Sync wp-content/uploads from staging server to local wp-content/uploads/.

.DESCRIPTION
  Uses rsync inside a temporary Alpine Docker container to pull uploads from
  staging via SSH. Avoids Windows rsync/SSH compatibility issues entirely.
  Only downloads files that are new or changed (incremental sync).

.PREREQUISITES
  - Docker Desktop running
  - SSH key at ~/.ssh/glendonray

.EXAMPLE
  .\scripts\Sync-Uploads.ps1

.EXAMPLE
  # Dry run — show what would be synced without downloading
  .\scripts\Sync-Uploads.ps1 -DryRun
#>
param(
    [string]$StagingWpRoot = "/home/customer/www/staging7.usjcfoundation.com/public_html",
    [string]$SshUser       = "u225-csxvaaggozg8",
    [string]$SshHost       = "ssh.usjcfoundation.com",
    [int]$SshPort          = 18765,
    [string]$SshKeyPath    = "$env:USERPROFILE\.ssh\glendonray",
    [switch]$DryRun
)

$repoRoot     = Split-Path $PSScriptRoot -Parent
$localUploads = Join-Path $repoRoot "wp-content\uploads"
$remoteUploads = "${SshUser}@${SshHost}:${StagingWpRoot}/wp-content/uploads/"

# Ensure local uploads directory exists
if (-not (Test-Path $localUploads)) {
    New-Item -ItemType Directory -Path $localUploads | Out-Null
    Write-Host "Created: $localUploads"
}

if (-not (Test-Path $SshKeyPath)) {
    Write-Error "SSH key not found at: $SshKeyPath"
    exit 1
}

$rsyncFlags = "-az --progress"
if ($DryRun) {
    $rsyncFlags += " --dry-run"
    Write-Host "[DRY RUN] No files will be downloaded."
}

Write-Host ""
Write-Host "Syncing uploads from staging..."
Write-Host "  From: $remoteUploads"
Write-Host "  To:   $localUploads"
Write-Host ""

# Write a shell script to a temp file with Unix line endings.
# This avoids Windows CRLF issues and quote-escaping headaches with sh -c.
# The key is copied to /tmp inside the container because bind-mounted files
# can't have their permissions changed (read-only filesystem layer).
$tmpScript = [System.IO.Path]::Combine($env:TEMP, "usjcf-sync-uploads.sh")
$shScript = @"
#!/bin/sh
set -e
apk add --quiet --no-progress rsync openssh-client
cp /root/.ssh/id_rsa /tmp/id_rsa
chmod 600 /tmp/id_rsa
rsync $rsyncFlags \
  -e "ssh -p $SshPort -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i /tmp/id_rsa" \
  $remoteUploads /uploads/
"@
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($tmpScript, $shScript.Replace("`r`n", "`n"), $utf8NoBom)

docker run --rm `
    -v "${localUploads}:/uploads" `
    -v "${SshKeyPath}:/root/.ssh/id_rsa:ro" `
    -v "${tmpScript}:/sync.sh:ro" `
    alpine sh /sync.sh

$exitCode = $LASTEXITCODE
Remove-Item $tmpScript -Force -ErrorAction SilentlyContinue

if ($exitCode -eq 0) {
    Write-Host ""
    Write-Host "Done. Uploads synced to: $localUploads"
} else {
    Write-Error "rsync failed (exit code $exitCode)."
    exit $exitCode
}
