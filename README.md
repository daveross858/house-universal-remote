# House Universal Remote (Next.js + Tailwind)

A custom web dashboard for iPad kiosk control of Fire TV, Sonos, Govee lights, Resideo thermostat, and Nest lock.

## Quick start

```bash
pnpm i  # or npm i / yarn
cp .env.example .env.local
pnpm dev
# open http://localhost:3000
```

> For iPad kiosk: Safari → Share → Add to Home Screen → Guided Access.

## Environment

Create `.env.local` from the template:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Fire TV
FIRETV_BRIDGE_URL=http://pi.local:9123

# Sonos (temporary test token; in prod implement OAuth)
SONOS_OAUTH_TOKEN=

# Govee
GOVEE_API_KEY=

# Resideo (Honeywell Home)
RESIDEO_OAUTH_TOKEN=

# Nest (Google SDM)
GOOGLE_SDM_TOKEN=
```

## Fire TV Bridge

Run a small bridge on your Raspberry Pi that exposes `/command` and talks ADB to your Fire TV.
Example minimal Python (not included as a service here):

```py
# firetv-bridge.py (example)
from flask import Flask, request, jsonify
import subprocess, os

ADB = "/usr/bin/adb"  # ensure adb installed and Fire TV paired with ADB debugging enabled
ADDR = os.environ.get("FIRETV_IP", "192.168.1.100")

app = Flask(__name__)

def adb(cmd):
    return subprocess.run([ADB, "shell"] + cmd, capture_output=True, text=True)

@app.post("/command")
def command():
    data = request.get_json() or {}
    action = data.get("action")
    if action == "home": adb(["input", "keyevent", "3"])
    elif action == "back": adb(["input", "keyevent", "4"])
    elif action == "playpause": adb(["input", "keyevent", "85"])
    elif action == "up": adb(["input", "keyevent", "19"])
    elif action == "down": adb(["input", "keyevent", "20"])
    elif action == "left": adb(["input", "keyevent", "21"])
    elif action == "right": adb(["input", "keyevent", "22"])
    elif action == "select": adb(["input", "keyevent", "23"])
    elif action == "power": adb(["input", "keyevent", "26"])
    elif action == "launch":
        appid = data.get("app")
        if appid: adb(["monkey", "-p", appid, "-c", "android.intent.category.LAUNCHER", "1"])
    return jsonify({"ok": True})
```

## Notes

- API routes are **stubs** wired to your UI, ready to swap in real calls to each vendor's API once tokens are configured.
- Prefer **local control** when available (e.g., Govee Local API, Sonos LAN).
- Scenes are implemented in `/api/scenes` and call other endpoints server-side.
- The UI is tuned for iPad mini 2: big tiles, minimal chrome.
- Uses App Router (Next.js 15), Tailwind 3, Framer Motion.

## Deploy

- **Local/Pi**: `pnpm build && pnpm start` then access from your iPad (same LAN).
- **Vercel**: Add environment variables in Project Settings → Deploy.

