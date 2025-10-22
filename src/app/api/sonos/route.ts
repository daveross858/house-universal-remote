import { NextRequest } from "next/server";
import { jsonOK, jsonBad, env } from "@/lib/api-util";

// Minimal Sonos control via Cloud Control API (OAuth2).
// In production, you'd refresh tokens and call group/player endpoints.
export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const { action, group, volume } = body || {};
    const token = env("SONOS_OAUTH_TOKEN", "");
    if(!token) return jsonBad("Set SONOS_OAUTH_TOKEN");
    const api = "https://api.ws.sonos.com/control/api/v1";
    if(action === "setVolume"){
      // Example endpoint – replace with actual household/group endpoint you own
      // You will need to list devices and store group or player IDs.
      return jsonOK({ note: "Stub volume call", group, volume });
    }
    if(["play","pause","next","previous"].includes(action)){
      return jsonOK({ note: "Stub playback call", action, group });
    }
    return jsonBad("Unknown action");
  }catch(e:any){
    return jsonBad(e.message || "Sonos error", 500);
  }
}
