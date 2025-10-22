    "use client";
    import React, { useState } from "react";
    import Link from "next/link";
    import axios from "axios";

    export default function ClimatePage() {
      const [temp, setTemp] = useState<number>(72);
const [mode, setMode] = useState<string>("heat");
content = (<div className="tile space-y-4">
  <div className="font-semibold">Thermostat</div>
  <div className="flex flex-wrap gap-3 items-center">
    <label>Set Temp: {temp}°F</label>
    <input type="range" min="60" max="80" value={temp} onChange={e=>setTemp(parseInt(e.target.value))} />
    <select value={mode} onChange={e=>setMode(e.target.value)} className="bg-black/40 border border-gray-700 rounded px-3 py-2">
      <option value="heat">Heat</option>
      <option value="cool">Cool</option>
      <option value="off">Off</option>
    </select>
    <button onClick={()=>axios.post("/api/resideo",{ action:"set", temp, mode })} className="px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-600/30">Apply</button>
  </div>
</div>)

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Climate</h1>
            <Link href="/" className="underline">Home</Link>
          </div>
          <div className="grid gap-4">
            {content}
          </div>
        </div>
      );
    }
