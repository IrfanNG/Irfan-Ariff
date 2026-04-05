"use client";

import { ProjectCard } from "../components/ProjectCard";
import { ProjectData } from "@/lib/types";

interface NoirProjectsProps {
  projects: ProjectData[];
}

export function NoirProjects({ projects }: NoirProjectsProps) {
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="w-full py-32 flex flex-col gap-32 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
        <h2 className="font-serif text-6xl md:text-[7vw] text-white leading-[0.8] tracking-tighter">
          Selected <br />
          <span className="italic text-zinc-500 font-light ml-8 md:ml-20">Strikes.</span>
        </h2>
        
        <div className="max-w-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-elite-teal" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-elite-teal uppercase">Archives_Node</span>
          </div>
          <p className="font-sans text-xs text-zinc-600 leading-relaxed uppercase tracking-wider">
            A curation of high-fidelity systems orchestrated with clean logic and visual precision.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-40">
        {displayProjects.map((project, index) => (
          <ProjectCard 
            key={project.id}
            title={project.title}
            category={project.category || "ENGINEERING"}
            description={project.description}
            image={project.image_primary || ""}
            link={project.github_url || project.live_url || undefined}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
