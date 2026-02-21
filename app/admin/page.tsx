import { Terminal } from "lucide-react";
import { getProjects, getExperience, getTechStack } from "@/lib/supabase/queries";

export const revalidate = 0; // Always fetch fresh on admin pages

export default async function AdminOverview() {
    const projects = await getProjects();
    const experience = await getExperience();
    const techStack = await getTechStack();

    return (
        <div className="space-y-8 text-neutral-300">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Terminal className="text-green-500 w-6 h-6" />
                    System Overview
                </h2>
                <p className="text-sm text-neutral-500">
                    Database metrics and system status.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Projects Stat */}
                <div className="bg-neutral-900/40 p-6 rounded-xl border border-white/5 flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">TOTAL_PROJECTS</span>
                    <span className="text-5xl text-white font-mono">{projects.length}</span>
                </div>

                {/* Experience Stat */}
                <div className="bg-neutral-900/40 p-6 rounded-xl border border-white/5 flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">EXP_TIMELINE_NODES</span>
                    <span className="text-5xl text-white font-mono">{experience.length}</span>
                </div>

                {/* Tech Stack Stat */}
                <div className="bg-neutral-900/40 p-6 rounded-xl border border-white/5 flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">TECH_STACK_ITEMS</span>
                    <span className="text-5xl text-white font-mono">{techStack.length}</span>
                </div>
            </div>
        </div>
    );
}
