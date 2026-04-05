"use client";

import { motion } from "framer-motion";
import { RevealImage } from "./canvas/RevealImage";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  index: number;
}

export function ProjectCard({ title, category, description, image, link, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="group relative w-full flex flex-col gap-6"
    >
      <div className="aspect-[16/10] w-full overflow-hidden border border-white/5">
        <RevealImage src={image} alt={title} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <span className="font-mono text-[10px] tracking-[0.4em] text-elite-teal uppercase">
            {category}
          </span>
          <h3 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-none">
            {title}
          </h3>
        </div>
        
        <p className="max-w-md font-sans text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">
          {description}
        </p>

        {link && (
          <a 
            href={link} 
            target="_blank" 
            className="p-4 rounded-full border border-white/5 text-white hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center"
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
        )}
      </div>
      
      <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mt-12 opacity-50" />
    </motion.div>
  );
}
