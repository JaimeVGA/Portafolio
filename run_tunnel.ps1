$ErrorActionPreference = "SilentlyContinue"

# Check if node server is already running on 5173, if not start it
$existingNode = Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*node*" }
$serverProc = Start-Process node -ArgumentList "serve.cjs" -PassThru -NoNewWindow

Start-Sleep -Seconds 2

# Test pinggy
$ssh = "C:\Windows\System32\OpenSSH\ssh.exe"
& $ssh -p 443 -R0:localhost:5173 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ServerAliveInterval=30 a.pinggy.io
