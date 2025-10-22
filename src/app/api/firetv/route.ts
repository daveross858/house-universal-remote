import { NextRequest } from "next/server";
import { jsonOK, jsonBad, env } from "@/lib/api-util";

// This forwards commands to a local Fire TV bridge (running on your Pi or LAN).
// Bridge expected API: POST /command { action: "home" | "back" | "playpause" | "up" | ... , app? }
export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const { action, app } = body || {};
    if(!action) return jsonBad("Missing action");
    const bridge = env("FIRETV_BRIDGE_URL"); // e.g., http://pi.local:9123
    const r = await fetch(`${bridge}/command`, {
      method: "POST",
      headers: { "content-type":"application/json" },
      body: JSON.stringify({ action, app })
    });
    const data = await r.json().catch(()=>({ ok:true }));
    return jsonOK({ ok: true, bridge: data });
  }catch(e:any){
    return jsonBad(e.message || "FireTV error", 500);
  }
}
