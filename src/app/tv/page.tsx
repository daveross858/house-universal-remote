    "use client";
    import React, { useState } from "react";
    import Link from "next/link";
    import axios from "axios";

    export default function TVPage() {
      content = (<div className="tile space-y-3">
  <div className="font-semibold">Fire TV Controls</div>
  <div className="flex gap-2 flex-wrap">
    {["home","back","playpause","up","down","left","right","select","power"].map(key => (
      <button key={key} onClick={async()=>{await axios.post("/api/firetv",{ action:key })}} className="px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30">{key}</button>
    ))}
  </div>
  <div className="flex gap-2">
    <input id="app" placeholder="com.netflix.ninja" className="bg-black/40 border border-gray-700 rounded px-3 py-2 w-full" />
    <button onClick={async()=>{
      const app = (document.getElementById("app") as HTMLInputElement).value;
      await axios.post("/api/firetv",{ action:"launch", app });
    }} className="px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30">Launch App</button>
  </div>
</div>)

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">TV</h1>
            <Link href="/" className="underline">Home</Link>
          </div>
          <div className="grid gap-4">
            {content}
          </div>
        </div>
      );
    }
