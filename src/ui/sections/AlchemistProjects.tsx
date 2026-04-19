"use client";

import Image from "next/image";
import { ProjectData } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AlchemistProjects({ projects }: { projects: ProjectData[] }) {
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-sans text-[1.75rem] text-white tracking-tight">Selected Works</h2>
          <a href="#" className="font-sans text-[11px] tracking-[0.1em] uppercase text-[#C6C6C6] hover:text-white transition-colors flex items-center space-x-2">
            <span>View Archive</span>
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'wght' 300" }}>arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => (
            <a 
              key={project.id}
              href={project.live_url || "#"}
              target="_blank"
              className={cn(
                "group block relative overflow-hidden bg-[#1c1b1b] aspect-[4/3]",
                index % 2 !== 0 ? "mt-0 md:mt-16" : ""
              )}
            >
              {project.image_primary && (
                <Image
                  src={project.image_primary}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-[#C6C6C6] mb-2">
                  {index === 0 ? "Fintech / App Design" : index === 1 ? "E-Commerce / Strategy" : index === 2 ? "Web / Systems" : "Identity / Web"}
                </p>
                <h3 className="font-sans text-[1.25rem] text-white">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}