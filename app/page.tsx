import { Hero } from "@/src/ui/sections/Hero";
import { About } from "@/src/ui/sections/About";
import { Projects } from "@/src/ui/sections/Projects";
import { Problem } from "@/src/ui/sections/Problem";
import { Comparison } from "@/src/ui/sections/Comparison";
import { System } from "@/src/ui/sections/System";
import { Process } from "@/src/ui/sections/Process";
import { Pricing } from "@/src/ui/sections/Pricing";
import { Contact } from "@/src/ui/sections/Contact";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import { createClient } from "@/lib/supabase/server";
import { 
  getProjects, 
  getProfile
} from "@/lib/supabase/queries";

import { Layout } from "@/src/ui/layout/Layout";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [
    projects,
    profile
  ] = await Promise.all([
    getProjects(supabase),
    getProfile(supabase)
  ]);

  return (
    <Layout>
      <div className="block w-full max-w-[100vw] relative bg-white">
        <VisitTracker />
        
        <Hero />
        
        <Projects projects={projects} />

        <Problem />

        <Comparison />

        <System />

        <About />

        <Pricing />

        <Process />

        <Contact profile={profile} />
      </div>
    </Layout>
  );
}