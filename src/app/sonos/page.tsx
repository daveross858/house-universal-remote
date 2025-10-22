    "use client";
    import React, { useState } from "react";
    import Link from "next/link";
    import axios from "axios";

    export default function SonosPage() {
      const [group, setGroup] = useState<string>("living");
const [vol, setVol] = useState<number>(20);
content = (<div className="tile space-y-4">
  <div className="font-semibold">Sonos</div>
  <div className="flex gap-3 items-center">
    <label>Group:</label>
    <input value={group} onChange={e=>setGroup(e.target.value)} className="bg-black/40 border border-gray-700 rounded px-3 py-2"/>
    <label>Volume: {vol}</label>
    <input type="range" min="0" max="100" value={vol} onChange={e=>setVol(parseInt(e.target.value))} />
    <button onClick={()=>axios.post("/api/sonos",{ action:"setVolume", group, volume: vol })} className="px-3 py-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-600/30">Set</button>
  </div>
  <div className="flex gap-2 flex-wrap">
    <button onClick={()=>axios.post("/api/sonos",{ action:"play", group })} className="px-3 py-2 rounded-lg bg-green-600/20 border border-green-600/30">Play</button>
    <button onClick={()=>axios.post("/api/sonos",{ action:"pause", group })} className="px-3 py-2 rounded-lg bg-yellow-600/20 border border-yellow-600/30">Pause</button>
    <button onClick={()=>axios.post("/api/sonos",{ action:"next", group })} className="px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-600/30">Next</button>
  </div>
</div>)

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Sonos</h1>
            <Link href="/" className="underline">Home</Link>
          </div>
          <div className="grid gap-4">
            {content}
          </div>
        </div>
      );
    }
