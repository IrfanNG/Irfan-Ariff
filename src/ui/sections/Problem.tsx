"use client";

import { motion } from "framer-motion";
import { XCircle, TrendingDown, Lock } from "lucide-react";

export function Problem() {
  const frictions = [
    {
      id: "FRIC-01",
      title: "High Monthly Fees",
      description: "Stop wasting money on expensive monthly subscriptions. Start owning your digital assets instead."
    },
    {
      id: "FRIC-02",
      title: "Platform Dependency",
      description: "Relying on external platforms is a business risk. We build independent systems that you control 100%."
    },
    {
      id: "FRIC-03",
      title: "Slow & Buggy Performance",
      description: "Generic templates are heavy and prone to errors. We code from scratch for maximum speed and stability."
    }
  ];

  return (
    <section id="problem" className="py-32 px-6 md:px-12 bg-zinc-50 border-y border-zinc-100 relative overflow-hidden">
      {/* Structural Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto relative z-10"
      >
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-blue-800" />
            <span className="font-sans text-[10px] tracking-[0.4em] text-blue-800 uppercase font-black">Friction Audit</span>
          </div>
          <h2 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            THE GROWTH <br/> <span className="text-zinc-200">BARRIER.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {frictions.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-12 bg-white border border-zinc-100 group hover:border-blue-800 transition-all duration-500"
            >
              <p className="font-mono text-[10px] text-zinc-300 mb-8 group-hover:text-blue-800 transition-colors">{f.id}</p>
              <h3 className="font-sans text-2xl font-black mb-4 uppercase tracking-tighter">{f.title}</h3>
              <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-sans text-2xl font-black tracking-tighter uppercase italic text-zinc-300">
            "Your tech should be an asset, not an expense."
          </p>
          <div className="flex gap-12">
             <div className="text-center">
                <p className="text-4xl font-black text-zinc-900 tracking-tighter">100%</p>
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold mt-1">Ownership</p>
             </div>
             <div className="text-center">
                <p className="text-4xl font-black text-zinc-900 tracking-tighter">0%</p>
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold mt-1">Commission</p>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
