    "use client";
    import React, { useState } from "react";
    import Link from "next/link";
    import axios from "axios";

    export default function LockPage() {
      const [door, setDoor] = useState<string>("front");
content = (<div className="tile space-y-4">
  <div className="font-semibold">Lock</div>
  <div className="flex gap-3 items-center">
    <label>Door:</label>
    <input value={door} onChange={e=>setDoor(e.target.value)} className="bg-black/40 border border-gray-700 rounded px-3 py-2"/>
    <button onClick={()=>axios.post("/api/nest",{ action:"lock", door })} className="px-3 py-2 rounded-lg bg-green-600/20 border border-green-600/30">Lock</button>
    <button onClick={()=>axios.post("/api/nest",{ action:"unlock", door })} className="px-3 py-2 rounded-lg bg-red-600/20 border border-red-600/30">Unlock</button>
  </div>
</div>)

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Lock</h1>
            <Link href="/" className="underline">Home</Link>
          </div>
          <div className="grid gap-4">
            {content}
          </div>
        </div>
      );
    }
