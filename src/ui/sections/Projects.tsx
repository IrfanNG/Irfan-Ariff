"use client";

import { motion } from "framer-motion";
import { ProjectData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RevealImage } from "../components/canvas/RevealImage";
import { ArrowUpRight } from "lucide-react";

export function Projects({ projects: dbProjects }: { projects: ProjectData[] }) {
  const featuredProjects = [
    {
      title: "Qalam Irma",
      category: "Retail & Printing Hub",
      url: "https://qalamirma.netlify.app/",
      image: "/projects/espace.png",
      id: "SOL-01"
    },
    {
      title: "ESPACE",
      category: "Elite Venue Booking",
      url: "https://event-booking-system-sage.vercel.app/",
      image: "/projects/habibah.png",
      id: "SOL-02"
    },
    {
      title: "Habibah Kamal",
      category: "Umrah & Personal Brand",
      url: "https://habibahkamal.netlify.app/",
      image: "/projects/qalam.png",
      id: "SOL-03"
    }
  ];

  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 bg-white">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-blue-800" />
            <span className="font-sans text-[10px] tracking-[0.4em] text-blue-800 uppercase font-black">Strategic Deployments</span>
          </div>
          <h2 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            SELECTED <br/> <span className="text-zinc-300">PROJECTS.</span>
          </h2>
        </div>

        {/* Static 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-video bg-zinc-50 border border-zinc-100 overflow-hidden mb-8 shadow-sm group-hover:border-blue-800/30 transition-all duration-500">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-lg">
                   <ArrowUpRight className="w-4 h-4 text-zinc-900" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-sans text-[10px] text-blue-800 font-black uppercase tracking-[0.3em]">
                  {project.category}
                </p>
                <div className="flex justify-between items-start">
                  <h3 className="font-sans text-2xl font-black text-zinc-900 uppercase tracking-tighter leading-none group-hover:text-blue-800 transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-300">
                    {project.id}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-32 text-center border-t border-zinc-100 pt-24">
          <p className="font-sans text-xs text-zinc-400 uppercase tracking-widest mb-8">
            Ready to initiate your next digital strike?
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-12 py-5 bg-zinc-900 text-white font-sans font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-blue-800 transition-all duration-300"
          >
            Initiate Project Deployment
          </button>
        </div>
      </motion.div>
    </section>
  );
}