"use client";

import { motion } from "framer-motion";
import { TrendingDown, CheckCircle2, XCircle } from "lucide-react";

export function Comparison() {
  const assets = [
    { label: "ASSET PORTABILITY", value: "100%", desc: "Full code ownership. No vendor lock-in." },
    { label: "COMMISSION LEAKAGE", value: "0%", desc: "Zero platform tax on your transactions." },
    { label: "DATA SOVEREIGNTY", value: "DIRECT", desc: "Your data stays in your infrastructure." }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-blue-800" />
              <span className="font-sans text-[10px] tracking-[0.4em] text-blue-800 uppercase font-black">Strategic Audit</span>
            </div>
            <h2 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              REVENUE <br/> <span className="text-zinc-300">INTEGRITY.</span>
            </h2>
            <p className="font-sans text-lg text-zinc-500 font-light leading-relaxed max-w-xl">
              Platform dependency is a silent tax on your growth. We engineer independent digital assets that eliminate commission leakage and restore absolute control over your business intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
             {assets.map((asset, i) => (
               <div key={i} className="p-8 border border-zinc-100 bg-zinc-50 flex justify-between items-center group hover:border-blue-800 transition-all duration-500">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] text-zinc-400 font-bold mb-1 uppercase">{asset.label}</p>
                    <p className="font-sans text-sm text-zinc-600 font-light">{asset.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-3xl font-black text-zinc-900 tracking-tighter uppercase group-hover:text-blue-800 transition-colors">{asset.value}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="border border-zinc-100 rounded-2xl overflow-hidden shadow-2xl shadow-zinc-100/50">
          <div className="grid grid-cols-1 md:grid-cols-2">
             {/* The Attrition Side */}
             <div className="p-12 md:p-16 bg-zinc-50 border-r border-zinc-100">
                <div className="flex items-center gap-3 mb-12">
                   <XCircle className="text-zinc-300 w-5 h-5" />
                   <h3 className="font-sans text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Platform Attrition</h3>
                </div>
                <div className="space-y-8">
                   {[
                     { t: "PLATFORM FEES", d: "Pay 8% - 30% to external platforms." },
                     { t: "NO CUSTOMER DATA", d: "Database held by third parties." },
                     { t: "ACCOUNT BAN RISK", d: "Your business can be halted at any time." },
                     { t: "GENERIC DESIGN", d: "Look like thousands of other sellers." }
                   ].map((item, i) => (
                     <div key={i} className="group">
                        <h4 className="font-sans text-sm font-black text-zinc-400 uppercase mb-1">{item.t}</h4>
                        <p className="font-sans text-sm text-zinc-300 font-light italic">{item.d}</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* The Sovereignty Side */}
             <div className="p-12 md:p-16 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <div className="w-12 h-12 rounded-full border border-blue-50 flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-blue-800" />
                   </div>
                </div>
                <div className="flex items-center gap-3 mb-12">
                   <CheckCircle2 className="text-blue-800 w-5 h-5" />
                   <h3 className="font-sans text-xs font-black uppercase tracking-[0.2em] text-blue-800">Direct System</h3>
                </div>
                <div className="space-y-8">
                   {[
                     { t: "KEEP 100% REVENUE", d: "Zero sales commission fees." },
                     { t: "FULL OWNERSHIP", d: "Code & Database are yours forever." },
                     { t: "DIRECT LEADS", d: "Customer data delivered directly to you." },
                     { t: "AUTHORITATIVE BRAND", d: "Professional custom design that builds trust." }
                   ].map((item, i) => (
                     <div key={i} className="group">
                        <h4 className="font-sans text-sm font-black text-zinc-900 uppercase mb-1">{item.t}</h4>
                        <p className="font-sans text-sm text-zinc-500 font-light">{item.d}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
