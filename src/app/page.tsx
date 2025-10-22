"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const Tile = ({ href, label, emoji }:{href:string,label:string,emoji:string}) => (
  <Link href={href} className="tile block">
    <div className="flex items-center gap-3">
      <span className="text-2xl">{emoji}</span>
      <span className="text-xl font-semibold">{label}</span>
    </div>
  </Link>
)

export default function Page() {
  return (
    <main className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
        <Tile href="/tv" label="Fire TV" emoji="🔥" />
      </motion.div>
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.05}}>
        <Tile href="/sonos" label="Sonos" emoji="🎵" />
      </motion.div>
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
        <Tile href="/lights" label="Lights" emoji="💡" />
      </motion.div>
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.15}}>
        <Tile href="/climate" label="Climate" emoji="🌡️" />
      </motion.div>
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
        <Tile href="/lock" label="Lock" emoji="🔐" />
      </motion.div>
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.25}}>
        <Tile href="/scenes" label="Scenes" emoji="🎬" />
      </motion.div>
    </main>
  );
}
