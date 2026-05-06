"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="pt-40 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto relative overflow-hidden bg-zinc-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full"
      >
        <div className="space-y-8">
          <p
            className="font-sans text-[12px] tracking-[0.22em] uppercase font-bold text-blue-950"
          >
            Digital Sovereignty for Modern Enterprises
          </p>
          <h1 className="font-sans text-5xl md:text-7xl leading-[1.1] tracking-[-0.04em] text-zinc-900 font-black uppercase">
            Institutional <br/> Systems. Built <br/> to Scale.
          </h1>
          <h2 className="font-sans text-xl md:text-2xl text-zinc-800 font-normal leading-relaxed max-w-2xl">
            Stop building on borrowed land. We engineer high-performance digital infrastructure with 100% code ownership and zero platform commission.
          </h2>

          <div className="pt-4">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-blue-950 text-white px-10 py-5 font-bold uppercase tracking-[0.18em] text-[12px] hover:bg-blue-900 transition-all duration-300 cursor-pointer flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-4"
            >
              <span>DEPLOY YOUR SYSTEM</span>
              <Rocket className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="pt-12">
            <h3 className="font-sans text-xl font-black text-zinc-950 mb-4 uppercase tracking-tighter">Beyond the Website</h3>
            <p className="font-sans text-base text-zinc-700 leading-relaxed max-w-md font-normal">
              We don&apos;t just build pages; we architect the operational engines that drive your business growth with surgical precision.
            </p>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-[4/3] bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden group shadow-2xl shadow-zinc-200/50 rounded-2xl">
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
           >
             <source src="/Video Project 1.mp4" type="video/mp4" />
             Your browser does not support the video tag.
           </video>
           
           {/* Glassmorphism Overlay */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/20 to-transparent pointer-events-none" />
           <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
