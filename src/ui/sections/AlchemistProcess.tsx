"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Discovery & Strategy",
    subtitle: "THE ARCHETYPE",
    description: "Deep-diving into your business logic, market competitive landscape, and user requirements to define a precise roadmap.",
    icon: Search,
    tags: ["Market Research", "User Personas", "Feature Mapping"]
  },
  {
    id: "02",
    title: "Architecture & Design",
    subtitle: "THE BLUEPRINT",
    description: "Crafting institutional-grade UI/UX with a focus on scalable design systems and high-fidelity interactive prototypes.",
    icon: PenTool,
    tags: ["UI/UX Design", "System Architecture", "Prototyping"]
  },
  {
    id: "03",
    title: "Engineered Development",
    subtitle: "THE SYNTHESIS",
    description: "Translating blueprints into high-performance codebases using modern stacks, clean architecture, and rigorous testing.",
    icon: Code2,
    tags: ["Fullstack Dev", "API Integration", "Clean Code"]
  },
  {
    id: "04",
    title: "Validation & Launch",
    subtitle: "THE ALCHIMISTRA",
    description: "Meticulous optimization and deployment. We ensure your product hits the orbit with 99.9% technical integrity.",
    icon: Rocket,
    tags: ["Beta Testing", "Cloud Deployment", "LIFETIME Support"]
  }
];

export function AlchemistProcess() {
  return (
    <section id="process" className="relative py-32 md:py-48 bg-black overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.06] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-mono text-xs md:text-sm tracking-[0.4em] text-cyan-500 uppercase block mb-6"
            >
              OP_WORKFLOW (v4.0)
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-sans font-black text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-white leading-[0.85]"
            >
              How we <br />
              <span className="text-zinc-800 italic">Synthesize</span> Value.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-sans text-zinc-400 max-w-sm text-sm md:text-base leading-relaxed"
          >
            A meticulous, systematic approach to engineering high-performance software architectures from initial archetype to global-scale deployment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, index }: { step: typeof PROCESS_STEPS[0], index: number }) {
  const Icon = step.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      className="group relative bg-zinc-950/30 border border-white/5 p-10 flex flex-col items-start min-h-[480px] hover:border-cyan-500/30 transition-all duration-700 overflow-hidden"
    >
      {/* Step Number Background */}
      <span className="absolute -top-6 -right-4 font-sans font-black text-[12rem] text-white/[0.03] group-hover:text-cyan-500/[0.07] transition-colors duration-1000 leading-none pointer-events-none">
        {step.id}
      </span>

      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="w-14 h-14 rounded-xl bg-zinc-900 flex items-center justify-center mb-10 border border-white/10 group-hover:border-cyan-500/40 transition-all duration-500 shadow-xl group-hover:shadow-cyan-500/10">
          <Icon className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
        </div>

        <div className="space-y-6 mb-10">
          <div>
            <span className="font-mono text-[10px] md:text-xs text-cyan-500 tracking-[0.4em] uppercase block mb-2 font-bold">
              PhASE_{step.id}
            </span>
            <h3 className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tighter text-white group-hover:text-cyan-50 transition-colors leading-[0.9]">
              {step.title}
            </h3>
          </div>
          <p className="font-sans text-sm md:text-base text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">
            {step.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {step.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-white/[0.03] border border-white/5 font-mono text-[9px] md:text-[10px] text-zinc-600 uppercase tracking-widest whitespace-nowrap group-hover:border-cyan-500/20 group-hover:text-zinc-400 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Line Animation */}
      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-cyan-500 group-hover:w-full transition-all duration-700" />
      
      {/* Technical Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/0 group-hover:bg-cyan-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 transition-all duration-700" />
    </motion.div>
  );
}
