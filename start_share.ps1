# Start static server
$serverProc = Start-Process node -ArgumentList "serve.cjs" -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 2

# Start cloudflared tunnel
& .\cloudflared.exe tunnel --url http://127.0.0.1:5173
