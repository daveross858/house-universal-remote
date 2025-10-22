    "use client";
    import React, { useState } from "react";
    import Link from "next/link";
    import axios from "axios";

    export default function LightsPage() {
      const [device, setDevice] = useState<string>("living-room");
const [bri, setBri] = useState<number>(50);
const [color, setColor] = useState<string>("#ffffff");
content = (<div className="tile space-y-4">
  <div className="font-semibold">Govee Lights</div>
  <div className="flex flex-wrap gap-3 items-center">
    <label>Device:</label>
    <input value={device} onChange={e=>setDevice(e.target.value)} className="bg-black/40 border border-gray-700 rounded px-3 py-2"/>
    <label>Brightness: {bri}</label>
    <input type="range" min="1" max="100" value={bri} onChange={e=>setBri(parseInt(e.target.value))}/>
    <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
  </div>
  <div className="flex gap-2 flex-wrap">
    <button onClick={()=>axios.post("/api/govee",{ action:"on", device })} className="px-3 py-2 rounded-lg bg-green-600/20 border border-green-600/30">On</button>
    <button onClick={()=>axios.post("/api/govee",{ action:"off", device })} className="px-3 py-2 rounded-lg bg-red-600/20 border border-red-600/30">Off</button>
    <button onClick={()=>axios.post("/api/govee",{ action:"brightness", device, value: bri })} className="px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-600/30">Set Brightness</button>
    <button onClick={()=>axios.post("/api/govee",{ action:"color", device, value: color })} className="px-3 py-2 rounded-lg bg-purple-600/20 border border-purple-600/30">Set Color</button>
  </div>
</div>)

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Lights</h1>
            <Link href="/" className="underline">Home</Link>
          </div>
          <div className="grid gap-4">
            {content}
          </div>
        </div>
      );
    }
