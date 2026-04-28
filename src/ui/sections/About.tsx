"use client";

import { motion } from "framer-motion";
import { Globe, Github, Linkedin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-4 uppercase">About</h2>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] tracking-[0.4em] text-primary uppercase font-bold">About Us</span>
            <div className="w-12 h-[1px] bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/3] bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden group shadow-2xl shadow-zinc-200/50">
             <img 
               src="/about-image-new.jpeg" 
               alt="About Us" 
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-blue-800/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <div className="space-y-10">
            <h3 className="font-sans text-5xl md:text-6xl font-black text-zinc-900 leading-[0.9] tracking-tighter uppercase">
              Architecting <br/> <span className="text-zinc-300">Sovereignty.</span>
            </h3>
            <p className="font-sans text-base text-zinc-500 font-light leading-relaxed max-w-xl">
              Copper Boston Group (CBG) engineers proprietary digital infrastructure that gives businesses absolute control over their revenue and data. We bridge the gap between complex software architecture and operational success.
            </p>
            
            <div className="flex flex-col gap-8 pt-6">
              <div className="flex gap-6 items-start">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-800 shrink-0" />
                <div>
                  <h4 className="font-sans font-black text-zinc-900 uppercase tracking-tight text-sm mb-1">Ownership First</h4>
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">You own 100% of the code and database. We eliminate vendor lock-in so you control your own future.</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-800 shrink-0" />
                <div>
                  <h4 className="font-sans font-black text-zinc-900 uppercase tracking-tight text-sm mb-1">Proprietary Engines</h4>
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">We build custom systems designed to eliminate platform fees and middlemen dependencies.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-800 shrink-0" />
                <div>
                  <h4 className="font-sans font-black text-zinc-900 uppercase tracking-tight text-sm mb-1">Institutional Grade</h4>
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">Engineering standards that scale from small startups to established high-traffic enterprises.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}