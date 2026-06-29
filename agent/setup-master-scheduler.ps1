# Auto-run master agent every 2 days
$taskName = "AIToolDuel-MasterAgent"
$nodePath = (Get-Command node).Source
$action = New-ScheduledTaskAction -Execute $nodePath -Argument '"C:\\Users\\13165\\New folder\\agent\\master-agent.mjs"' -WorkingDirectory 'C:\\Users\\13165\\New folder'
$trigger1 = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday,Wednesday,Friday -At 8am
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 2)
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger1 -Settings $settings -RunLevel Highest -Force
Write-Host "✅ Master agent scheduled: Mon/Wed/Fri at 8am"