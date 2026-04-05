import { NoirHero } from "@/src/ui/sections/NoirHero";
import { NoirProjects } from "@/src/ui/sections/NoirProjects";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import { createClient } from "@/lib/supabase/server";
import { 
  getProjects, 
  getExperience, 
  getProfile, 
  getServices, 
  getSiteConfig, 
  getEducation, 
  getCertificates 
} from "@/lib/supabase/queries";

import { Experience } from "@/components/experience";
import { ContactSection } from "@/components/contact-section";
import { CommandPalette } from "@/components/command-palette";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [
    projects,
    experience,
    profile,
    services,
    config,
    education,
    certificates
  ] = await Promise.all([
    getProjects(supabase),
    getExperience(supabase),
    getProfile(supabase),
    getServices(supabase),
    getSiteConfig(supabase),
    getEducation(supabase),
    getCertificates(supabase)
  ]);

  return (
    <div className="flex flex-col w-full relative">
      <VisitTracker />
      
      {/* PHASE 3 STRIKE: NOIR HERO */}
      <NoirHero />

      {/* PHASE 3 STRIKE: CINEMATIC PROJECTS */}
      <NoirProjects projects={projects} />

      <div className="space-y-32 flex flex-col w-full px-6 md:px-12 lg:px-24">
        <section id="experience" className="space-y-8">
          <h2 className="text-sm font-mono tracking-[0.5em] text-elite-teal flex items-center gap-4 uppercase opacity-60">
            <span className="w-12 h-[1px] bg-elite-teal/30" />
            Experience_Archives
          </h2>
          <div className="p-8 rounded-sm border border-white/5 bg-black/20 backdrop-blur-3xl">
            <Experience experiences={experience} />
          </div>
        </section>

        <ContactSection profile={profile} config={config} />
      </div>

      <CommandPalette />
    </div>
  );
}
