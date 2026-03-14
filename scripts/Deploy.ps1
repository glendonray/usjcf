<#
.SYNOPSIS
  Deploy to staging or production.
  Uses Windows OpenSSH (built-in) — no WSL or Git Bash required.

.EXAMPLE
  .\scripts\Deploy.ps1 staging
  .\scripts\Deploy.ps1 production
#>
param(
    [Parameter(Mandatory)]
    [ValidateSet("staging", "production", "prod")]
    [string]$Target
)

$stagingPath = "/home/customer/www/staging7.usjcfoundation.com/public_html"
$prodPath    = "/home/customer/www/usjcfoundation.com/public_html"
$sshHost     = "usjcfoundation"

switch ($Target) {
    "staging" {
        $deployPath = $stagingPath
        $branch     = "staging"
        $siteUrl    = "https://staging7.usjcfoundation.com"
    }
    { $_ -in "production", "prod" } {
        $deployPath = $prodPath
        $branch     = "main"
        $siteUrl    = "https://usjcfoundation.com"
        Write-Host "WARNING: You are about to deploy to PRODUCTION." -ForegroundColor Red
        $answer = Read-Host "Type 'yes' to continue"
        if ($answer -ne "yes") { Write-Host "Aborted."; exit 0 }
    }
}

Write-Host "Deploying branch '$branch' to $siteUrl..." -ForegroundColor Yellow

$remoteCmd = "set -e; cd '$deployPath'; echo 'Pulling latest code...'; git pull origin $branch; echo 'Flushing caches...'; ~/bin/wp cache flush --path=. 2>/dev/null && echo 'Object cache flushed.' || echo 'No object cache.'; ~/bin/wp sg purge --all --path=. 2>/dev/null && echo 'SiteGround cache purged.' || echo 'SG cache not available.'; echo 'Done!'"

& ssh $sshHost $remoteCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deploy complete -> $siteUrl" -ForegroundColor Green
} else {
    Write-Error "Deploy failed."
    exit 1
}
