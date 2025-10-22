import { NextRequest } from "next/server";
import { jsonOK, jsonBad } from "@/lib/api-util";

// Example scene runner that calls other endpoints server-side.
export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const { id } = body || {};
    if(!id) return jsonBad("Missing scene id");
    if(id === "movie"){
      await fetch(new URL("/api/govee", process.env.NEXT_PUBLIC_BASE_URL), { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action:"brightness", device:"living-room", value: 20 }) });
      await fetch(new URL("/api/sonos", process.env.NEXT_PUBLIC_BASE_URL), { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action:"setVolume", group:"living", volume: 20 }) });
      await fetch(new URL("/api/firetv", process.env.NEXT_PUBLIC_BASE_URL), { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action:"launch", app:"com.netflix.ninja" }) });
      return jsonOK({ ok:true, scene:"movie" });
    }
    if(id === "away"){
      await fetch(new URL("/api/nest", process.env.NEXT_PUBLIC_BASE_URL), { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action:"lock", door:"front" }) });
      await fetch(new URL("/api/govee", process.env.NEXT_PUBLIC_BASE_URL), { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action:"off", device:"house" }) });
      await fetch(new URL("/api/resideo", process.env.NEXT_PUBLIC_BASE_URL), { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action:"set", temp: 68, mode: "heat" }) });
      return jsonOK({ ok:true, scene:"away" });
    }
    return jsonBad("Unknown scene");
  }catch(e:any){
    return jsonBad(e.message || "Scene error", 500);
  }
}
