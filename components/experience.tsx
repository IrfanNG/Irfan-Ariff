"use client";

import { motion } from "framer-motion";
import { ExperienceData } from "@/lib/types";

export function Experience({ experiences }: { experiences: ExperienceData[] }) {
    if (!experiences || experiences.length === 0) {
        return (
            <div className="text-neutral-500 text-sm font-mono text-center py-10">
                [ No experience data found ]
            </div>
        );
    }

    return (
        <div className="relative border-l border-zinc-800 ml-3 space-y-12">
            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-8"
                >
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border border-black ${exp.is_active ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]" : "bg-zinc-600"}`} />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h3 className="text-lg font-semibold text-zinc-100">{exp.title}</h3>
                        <span className="text-xs font-mono text-zinc-500">{exp.date_range}</span>
                    </div>
                    {exp.organization && <div className="text-sm text-zinc-400 mb-2 font-medium">{exp.organization}</div>}
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-lg whitespace-pre-line">
                        {exp.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
