import { AlchemistHero } from "@/src/ui/sections/AlchemistHero";
import { AlchemistAbout } from "@/src/ui/sections/AlchemistAbout";
import { AlchemistServices } from "@/src/ui/sections/AlchemistServices";
import { AlchemistProjects } from "@/src/ui/sections/AlchemistProjects";
import { AlchemistContact } from "@/src/ui/sections/AlchemistContact";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import { createClient } from "@/lib/supabase/server";
import { 
  getProjects, 
  getProfile, 
  getServices
} from "@/lib/supabase/queries";

import { AlchemistLayout } from "@/src/ui/layout/AlchemistLayout";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [
    projects,
    profile,
    services
  ] = await Promise.all([
    getProjects(supabase),
    getProfile(supabase),
    getServices(supabase)
  ]);

  return (
    <AlchemistLayout>
      <div className="block w-full max-w-[100vw] relative bg-white">
        <VisitTracker />
        
        {/* OPERATION ALCHEMIST: THE COMPLETE STRIKE */}
        <AlchemistHero />
        
        <AlchemistProjects projects={projects} />

        <AlchemistAbout />

        <AlchemistServices services={services} />

        <AlchemistContact profile={profile} />
      </div>
    </AlchemistLayout>
  );
}