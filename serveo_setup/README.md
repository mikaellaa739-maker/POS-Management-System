# Serveo Tunnel Setup — M2 POS Frontend

## What it does
Creates a public URL for `localhost:5174` (POS frontend) so other modules can access it via the internet (no same-WiFi needed).

## How to use
1. Start the frontend first: `npx vite --port 5174 --strictPort`
2. **Open a new terminal** and run:
   ```bash
   ssh -o ServerAliveInterval=60 -R 80:localhost:5174 serveo.net
   ```
3. You'll see output like:
   ```
   Forwarding HTTP traffic from https://RANDOM.serveo.net
   ```
4. **Copy that URL** (e.g. `https://abc123.serveo.net`)
5. Update `../.env`:
   ```
   VITE_INVENTORY_URL=https://RANDOM.serveo.net    ← replace with actual URL
   VITE_DASHBOARD_URL=https://DASHBOARD.serveo.net ← M3 frontend URL
   ```
6. Restart the frontend (`Ctrl+C` then `npx vite --port 5174 --strictPort`)

## Windows
Run `start_serveo_tunnel.bat` (requires SSH — comes with Windows 10/11 or Git Bash).

## Important
- Each restart generates a **new random URL** → update `.env` again
- Keep the terminal window with serveo open while presenting
- SSH must be installed (macOS/Linux: built-in, Windows: Git Bash or WSL)
