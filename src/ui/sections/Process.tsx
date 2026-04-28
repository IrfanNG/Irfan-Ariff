"use client";

import { motion } from "framer-motion";

export function Process() {
  const steps = [
    {
      number: "01",
      title: "Reconnaissance",
      subtitle: "The Discovery Strike",
      description: "We audit your business model, identifying bottlenecks and technical friction that hinder your growth."
    },
    {
      number: "02",
      title: "Blueprint",
      subtitle: "Neural Architecture",
      description: "We design a high-fidelity architecture and UI spec tailored to your brand authority and user flow."
    },
    {
      number: "03",
      title: "Surgical Strike",
      subtitle: "Rapid Engineering",
      description: "High-speed development with daily updates. We build with surgical precision and clean-code integrity."
    },
    {
      number: "04",
      title: "Handover",
      subtitle: "Asset Sovereignty",
      description: "Full code transfer, deployment, and ownership. You own the system; we just provide the strike force."
    }
  ];

  return (
    <section id="process" className="py-32 px-6 md:px-12 bg-zinc-50 border-y border-zinc-200">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="mb-24 text-left">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-blue-800" />
            <span className="font-sans text-[10px] tracking-[0.4em] text-blue-800 uppercase font-black">Execution Protocol</span>
          </div>
          <h2 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            STRATEGIC <br/> <span className="text-zinc-200">PATH.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="text-8xl font-black text-zinc-200/50 absolute -top-8 -left-4 group-hover:text-blue-500/10 transition-colors duration-500">
                {step.number}
              </div>
              <div className="relative pt-12 space-y-4">
                <div>
                   <p className="font-sans text-[10px] tracking-[0.3em] text-blue-800 uppercase font-bold mb-2">{step.subtitle}</p>
                   <h3 className="font-sans text-2xl font-black text-zinc-900 uppercase tracking-tight">{step.title}</h3>
                </div>
                <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}