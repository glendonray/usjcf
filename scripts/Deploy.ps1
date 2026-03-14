<#
.SYNOPSIS
  Deploy to staging or production via deploy.sh.

.EXAMPLE
  .\scripts\Deploy.ps1 staging
  .\scripts\Deploy.ps1 production
#>
param(
    [Parameter(Mandatory)]
    [ValidateSet("staging", "production", "prod")]
    [string]$Target
)

$repoRoot  = Split-Path $PSScriptRoot -Parent
$bashPath  = "C:\Program Files\Git\bin\bash.exe"
$repoPosix = ($repoRoot -replace '\\', '/') -replace '^([A-Za-z]):', '/$1'

if (-not (Test-Path $bashPath)) {
    Write-Error "Git Bash not found at $bashPath. Install Git for Windows."
    exit 1
}

& $bashPath -c "cd '$repoPosix' && bash deploy.sh $Target"
