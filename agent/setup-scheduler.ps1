# Sets up Windows Task Scheduler to auto-publish a new comparison every week
# Run this once: powershell -ExecutionPolicy Bypass -File agent\setup-scheduler.ps1

$taskName = "AIToolDuel-Weekly-Publisher"
$scriptPath = "C:\Users\13165\New folder\agent\run.mjs"
$nodePath = (Get-Command node).Source

$action = New-ScheduledTaskAction `
  -Execute $nodePath `
  -Argument "`"$scriptPath`" --schedule" `
  -WorkingDirectory "C:\Users\13165\New folder"

$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 9am

$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 1)

Register-ScheduledTask `
  -TaskName $taskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -RunLevel Highest `
  -Force

Write-Host "✅ Scheduler set up! Every Monday at 9am a new comparison will be published automatically."
Write-Host "To run manually now: node agent/run.mjs --schedule"
