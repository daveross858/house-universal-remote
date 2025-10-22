import { NextRequest } from "next/server";
import { jsonOK, jsonBad, env } from "@/lib/api-util";

// Honeywell Home (Resideo) OAuth2 control stub.
export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const { action, temp, mode } = body || {};
    const token = env("RESIDEO_OAUTH_TOKEN", "");
    if(!token) return jsonBad("Set RESIDEO_OAUTH_TOKEN");
    if(action === "set"){
      return jsonOK({ note: "Stub set thermostat", temp, mode });
    }
    return jsonBad("Unknown action");
  }catch(e:any){
    return jsonBad(e.message || "Resideo error", 500);
  }
}
