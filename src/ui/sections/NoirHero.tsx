"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function NoirHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-start justify-center py-20 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-elite-teal animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
            System.Status: Elite_Orchestration
          </span>
        </div>

        <h1 className="leading-[0.9] tracking-tighter mb-10">
          <span className="block font-serif text-7xl md:text-[9vw] font-light text-zinc-100 italic">
            Engineering
          </span>
          <span className="block font-sans text-7xl md:text-[10vw] font-bold uppercase text-white">
            Excellence.
          </span>
          <span className="block font-serif text-6xl md:text-[8vw] font-light text-elite-teal/80 text-right md:-mt-4">
            Orchestrated.
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl font-sans text-lg md:text-xl text-zinc-400 leading-relaxed mb-12"
        >
          Architecting high-fidelity digital ecosystems for the 1%. 
          We blend 0.5px precision with Clean Architecture to build products that 
          <span className="text-zinc-100 italic"> intimidate </span> and <span className="text-zinc-100 italic"> endure.</span>
        </motion.p>

        <div className="flex flex-wrap gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-elite-teal hover:text-white transition-all duration-300"
          >
            [ Initiate_Project ]
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            className="px-8 py-4 border border-white/5 font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all duration-300"
          >
            [ View_Archives ]
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute bottom-10 right-6 md:right-12 lg:right-24 hidden md:block text-right">
        <div className="font-mono text-[10px] text-zinc-700 tracking-widest flex flex-col items-end">
          <span>LAT: 3.1390 N</span>
          <span>LNG: 101.6869 E</span>
          <span className="text-elite-teal/40 mt-1 uppercase">Malaysia_Base_Node</span>
        </div>
      </div>
    </section>
  );
}
