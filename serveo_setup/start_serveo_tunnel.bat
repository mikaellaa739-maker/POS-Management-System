@echo off
REM Serveo Tunnel for M2 POS Frontend
REM Exposes localhost:5174 via a public URL
REM URL format: https://RANDOM.serveo.net
REM Copy the URL and update ..\.env VITE_INVENTORY_URL and VITE_DASHBOARD_URL
echo Starting Serveo tunnel to port 5174...
echo Wait for the "Forwarding" message, then copy the https URL.
echo.
ssh -o ServerAliveInterval=60 -R 80:localhost:5174 serveo.net
echo.
echo Tunnel closed.
pause
