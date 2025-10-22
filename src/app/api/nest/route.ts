import { NextRequest } from "next/server";
import { jsonOK, jsonBad, env } from "@/lib/api-util";

// Google Smart Device Management API (Nest x Yale lock) control stub.
export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const { action, door } = body || {};
    const token = env("GOOGLE_SDM_TOKEN", "");
    if(!token) return jsonBad("Set GOOGLE_SDM_TOKEN");
    if(action === "lock" || action === "unlock"){
      return jsonOK({ note: "Stub lock action", action, door });
    }
    return jsonBad("Unknown action");
  }catch(e:any){
    return jsonBad(e.message || "Nest error", 500);
  }
}
