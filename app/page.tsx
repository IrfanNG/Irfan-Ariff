import { Hero } from "@/components/hero";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/components/experience";
import { CommandPalette } from "@/components/command-palette";
import { MobileShowcase } from "@/components/mobile-showcase";
import { BrowserMockup } from "@/components/browser-mockup";
import { ProjectsSection } from "@/components/projects-section";
import {
  Code2,
  Cpu
} from "lucide-react";
import Image from "next/image";
import { ContactSection } from "@/components/contact-section";
import { FreelanceServices } from "@/components/freelance-services";
import { getProjects, getExperience, getTechStack, getProfile } from "@/lib/supabase/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const projects = await getProjects();
  const experience = await getExperience();
  const techStack = await getTechStack();
  const profile = await getProfile();

  return (
    <div className="flex flex-col gap-20 w-full relative">
      <Hero />

      {/* Projects Section - Bento Grid */}
      <ProjectsSection projects={projects} />



      <div className="grid md:grid-cols-3 gap-10">
        {/* Tech Stack */}
        <section id="skills" className="col-span-1 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500">~/tech_stack</span>
          </h2>
          <div className="flex flex-wrap gap-2 p-6 rounded-2xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm">
            {techStack.map((tech) => (
              <Badge key={tech.id} variant="secondary" className="bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 transition-colors">
                {tech.name}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="col-span-2 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500">~/experience</span>
          </h2>
          <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm">
            <Experience experiences={experience} />
          </div>
        </section>
      </div>

      <FreelanceServices profile={profile} />

      <ContactSection profile={profile} />

      <div className="h-20" /> {/* Spacer for scrolling */}
      <CommandPalette />
    </div>
  );
}
