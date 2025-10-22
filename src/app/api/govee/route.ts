import { NextRequest } from "next/server";
import { jsonOK, jsonBad, env } from "@/lib/api-util";

// Uses Govee Cloud API. Prefer Local API when possible for speed.
export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const { action, device, value } = body || {};
    const key = env("GOVEE_API_KEY", "");
    if(!key) return jsonBad("Set GOVEE_API_KEY");
    const headers = { "Govee-API-Key": key, "content-type":"application/json" };

    if(action === "on" || action === "off"){
      return jsonOK({ note: "Stub power call", device, state: action });
    }
    if(action === "brightness"){
      return jsonOK({ note: "Stub brightness call", device, value });
    }
    if(action === "color"){
      return jsonOK({ note: "Stub color call", device, value });
    }
    return jsonBad("Unknown action");
  }catch(e:any){
    return jsonBad(e.message || "Govee error", 500);
  }
}
