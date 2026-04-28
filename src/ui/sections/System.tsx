"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Database, Zap } from "lucide-react";

export function System() {
  const specs = [
    {
      id: "SYS-01",
      title: "Custom Dashboards",
      description: "Control centers built for your specific business logic. Manage sales and operations without the clutter of generic tools."
    },
    {
      id: "SYS-02",
      title: "Stable Infrastructure",
      description: "We use modern tech to ensure your system stays up even during high traffic. Built for long-term scalability."
    },
    {
      id: "SYS-03",
      title: "Maximum Speed",
      description: "Fast websites are loved by search engines and keep your customers engaged without waiting."
    }
  ];

  return (
    <section id="system" className="py-32 px-6 md:px-12 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-blue-800" />
              <span className="font-sans text-[10px] tracking-[0.4em] text-blue-800 uppercase font-black">Architecture Spec</span>
            </div>
            <h2 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              BEYOND THE <br/> <span className="text-zinc-300">INTERFACE.</span>
            </h2>
            <p className="font-sans text-lg text-zinc-500 font-light leading-relaxed max-w-xl">
              We don't just build websites; we architect the operational engines behind them. From custom CRMs to automated workflows, we provide full control over your digital infrastructure.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-zinc-50 rounded-3xl -rotate-2 border border-zinc-100" />
            <div className="relative bg-zinc-900 aspect-video rounded-2xl shadow-2xl overflow-hidden border border-zinc-800">
               {/* Engineering Dashboard Preview */}
               <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <p className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase">System Status: Active</p>
                  </div>
               </div>
               <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-800/50">
                      <p className="font-sans text-[7px] text-zinc-500 uppercase tracking-widest mb-1">Gross Revenue</p>
                      <p className="font-sans text-lg font-black text-white">$42,850</p>
                    </div>
                    <div className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-800/50">
                      <p className="font-sans text-[7px] text-zinc-500 uppercase tracking-widest mb-1">Active Leads</p>
                      <p className="font-sans text-lg font-black text-white">1,240</p>
                    </div>
                    <div className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-800/50">
                      <p className="font-sans text-[7px] text-zinc-500 uppercase tracking-widest mb-1">Conv. Rate</p>
                      <p className="font-sans text-lg font-black text-white">4.8%</p>
                    </div>
                  </div>

                  <div className="bg-zinc-800/20 p-4 rounded-lg border border-zinc-800/50">
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-sans text-[7px] text-zinc-500 uppercase tracking-widest">Real-time Activity</p>
                      <div className="w-1 h-1 rounded-full bg-blue-500" />
                    </div>
                    <div className="space-y-2">
                      {[
                        { t: "Lead Captured", d: "Inquiry from Project Alpha", time: "2m" },
                        { t: "Payment Sync", d: "Stripe transaction verified", time: "15m" },
                        { t: "System Health", d: "All nodes operational", time: "1h" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-l border-zinc-800 pl-3 py-0.5">
                          <div>
                            <p className="font-sans text-[9px] text-white font-bold uppercase tracking-tight">{item.t}</p>
                            <p className="font-sans text-[8px] text-zinc-500">{item.d}</p>
                          </div>
                          <span className="font-sans text-[7px] text-zinc-700 uppercase">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {specs.map((spec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-12 border border-zinc-100 bg-zinc-50 group hover:border-blue-800 transition-all duration-500"
            >
              <p className="font-mono text-[10px] text-zinc-300 mb-8 group-hover:text-blue-800 transition-colors">{spec.id}</p>
              <h3 className="font-sans text-2xl font-black uppercase tracking-tighter mb-4">{spec.title}</h3>
              <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">
                {spec.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
