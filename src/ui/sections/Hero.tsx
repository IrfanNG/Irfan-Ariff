"use client";

import { motion } from "framer-motion";

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
            style={{ color: '#1e3a8a' }}
            className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold"
          >
            Digital Sovereignty for Modern Enterprises
          </p>
          <h1 className="font-sans text-5xl md:text-7xl leading-[1.1] tracking-[-0.04em] text-zinc-900 font-black uppercase">
            Institutional <br/> Systems. Built <br/> to Scale.
          </h1>
          <h2 className="font-sans text-2xl text-zinc-500 font-light leading-relaxed">
            Stop building on borrowed land. We engineer high-performance digital infrastructure with 100% code ownership and zero platform commission.
          </h2>

          <div className="pt-4">
            <button
              onClick={() => scrollTo("contact")}
              style={{ backgroundColor: '#1e3a8a' }}
              className="text-white px-10 py-5 font-bold uppercase tracking-widest text-[13px] hover:opacity-90 transition-all duration-300 cursor-pointer flex items-center gap-3"
            >
              <span>DEPLOY YOUR SYSTEM</span>
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            </button>
          </div>

          <div className="pt-12">
            <h3 className="font-sans text-xl font-black text-zinc-900 mb-4 uppercase tracking-tighter">Beyond the Website</h3>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-md font-light">
              We don't just build pages; we architect the operational engines that drive your business growth with surgical precision.
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
