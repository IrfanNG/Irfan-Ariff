"use client";

import { motion } from "framer-motion";
import { Check, Rocket, Shield, Crown } from "lucide-react";

export function Pricing() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const plans = [
    {
      id: "SOL-01",
      name: "Strategic Landing",
      description: "High-performance landing page. Designed to capture leads and convert visitors into customers.",
      features: [
        "100% Code Ownership",
        "Lead Capture System",
        "Premium Custom Design",
        "Fast & SEO Ready",
        "7-Day Delivery"
      ]
    },
    {
      id: "SOL-02",
      name: "Business Engine",
      description: "Complete digital system for growing SMEs. Establish your brand authority on a global scale.",
      features: [
        "Full 5-Page Website",
        "Lead Management (CRM)",
        "Business Analytics Dashboard",
        "Installable Web App (PWA)",
        "Priority Technical Support"
      ],
      popular: true
    },
    {
      id: "SOL-03",
      name: "Enterprise Custom",
      description: "Tailored systems built for your unique business needs. Ideal for large-scale projects.",
      features: [
        "Custom Business Logic",
        "Large-Scale Database",
        "Third-Party API Integration",
        "Dedicated Project Manager",
        "Monthly Strategy Consultation"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 md:px-12 bg-zinc-50">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-blue-800" />
            <span className="font-sans text-[10px] tracking-[0.4em] text-blue-800 uppercase font-black">Investment Brief</span>
          </div>
          <h2 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            STRATEGIC <br/> <span className="text-zinc-300">INVESTMENT.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`p-12 border border-zinc-200 bg-white group hover:z-20 hover:border-blue-800 transition-all duration-500 relative ${
                plan.popular ? "lg:scale-[1.02] shadow-2xl shadow-zinc-200/50 z-10" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-12">
                 <p className="font-mono text-[10px] text-zinc-300 group-hover:text-blue-800 transition-colors">{plan.id}</p>
                 {plan.popular && <span className="font-sans text-[9px] font-black uppercase tracking-widest text-blue-800 bg-blue-50 px-3 py-1">Recommended</span>}
              </div>

              <div className="mb-12">
                <h3 className="font-sans text-3xl font-black uppercase tracking-tighter mb-4">{plan.name}</h3>
                <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-16">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 border-b border-zinc-50 pb-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-blue-800" />
                    <span className="font-sans text-[11px] text-zinc-600 font-bold uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => scrollTo("contact")}
                className="w-full py-5 border border-zinc-900 font-sans font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-900 hover:text-white transition-all duration-300"
              >
                INITIATE PROJECT
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
