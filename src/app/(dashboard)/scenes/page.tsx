"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";

const scenes = [
  { id: "movie", label: "Movie Night", actions: ["lights.dim(20)","sonos.volume(20)","firetv.launch(Netflix)"]},
  { id: "away", label: "Away", actions: ["lock.lock","lights.off","resideo.set(68,heat)"]}
]

export default function ScenesPage(){
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Scenes</h1>
        <Link href="/" className="underline">Home</Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {scenes.map(s => (
          <button key={s.id} className="tile text-left" onClick={()=>axios.post("/api/scenes",{ id: s.id })}>
            <div className="text-lg font-semibold">{s.label}</div>
            <div className="text-sm opacity-70">{s.actions.join(" • ")}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
