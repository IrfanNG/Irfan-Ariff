"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface RevealImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
}

export function RevealImage({ src, alt, className }: RevealImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!src) {
    return (
      <div className="w-full h-full bg-zinc-900 flex items-center justify-center border border-white/5">
        <span className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
          IMAGE_NOT_FOUND
        </span>
      </div>
    );
  }

  return (
    <div 
      className="relative overflow-hidden group w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 1.1, filter: "grayscale(100%) brightness(0.5)" }}
        animate={{ 
          scale: isHovered ? 1 : 1.05, 
          filter: isHovered ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.5)" 
        }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="w-full h-full"
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover transition-transform duration-700" 
        />
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 border border-white/10 group-hover:border-elite-teal/30 transition-colors duration-500"
      />
      
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 font-mono text-[8px] tracking-[0.3em] text-white uppercase">
          RANK_S_FIDELITY
        </span>
      </div>
    </div>
  );
}
