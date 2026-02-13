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

export default function Home() {
  return (
    <div className="flex flex-col gap-20 w-full relative">
      <Hero />

      {/* Projects Section - Bento Grid */}
      <ProjectsSection />



      <div className="grid md:grid-cols-3 gap-10">
        {/* Tech Stack */}
        <section id="skills" className="col-span-1 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500">~/tech_stack</span>
          </h2>
          <div className="flex flex-wrap gap-2 p-6 rounded-2xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm">
            {[
              "Next.js (App Router)",
              "Tailwind CSS",
              "shadcn/ui",
              "Framer Motion",
              "PWA",
              "Flutter",
              "Dart",
              "Supabase",
              "Firebase (Firestore, Auth)",
              "SQL Scripts"
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 transition-colors">
                {tech}
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
            <Experience />
          </div>
        </section>
      </div>

      <ContactSection />

      <div className="h-20" /> {/* Spacer for scrolling */}
      <CommandPalette />
    </div>
  );
}
