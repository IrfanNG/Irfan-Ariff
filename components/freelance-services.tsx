"use client";

import { motion } from "framer-motion";
import { Briefcase, Globe, Database, ArrowRight } from "lucide-react";
import { ProfileData } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FreelanceServices({ profile }: { profile: ProfileData | null }) {
    if (!profile) return null;

    const whatsappNumber = profile.whatsapp_number
        ? profile.whatsapp_number.replace(/\D/g, '') // remove non-digits
        : "";

    const message = "Hi Irfan, I saw your student portfolio and I'm interested in your freelance services for a project.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const handleScrollToProject = (slug: string) => {
        window.dispatchEvent(new CustomEvent("scrollToProject", { detail: { slug } }));
    };

    return (
        <section id="services" className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-500" />
                <span className="text-amber-500">~/commercial_uplinks</span>
                <span className="text-gray-600">ls -la</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
                {/* Business Landing Pages Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 rounded-xl group hover:shadow-xl transition duration-200 border border-white/5 bg-neutral-900/30 backdrop-blur-sm justify-between flex flex-col space-y-4 glow-border overflow-hidden"
                >
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                            <Globe className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Business Landing Pages</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Professional web presence and portfolio sites for businesses and individuals. Fast, SEO-optimized, and beautiful.
                            </p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-xs font-mono text-neutral-500">
                            &gt; REF:{" "}
                            <span
                                onClick={() => handleScrollToProject("qalam irma")}
                                className="text-green-400 hover:text-green-300 hover:underline underline-offset-2 cursor-pointer transition-colors"
                            >
                                Qalam Irma
                            </span>
                            ,{" "}
                            <span
                                onClick={() => handleScrollToProject("habibahkamal")}
                                className="text-green-400 hover:text-green-300 hover:underline underline-offset-2 cursor-pointer transition-colors"
                            >
                                Habibah Kamal
                            </span>
                        </p>
                    </div>
                </motion.div>

                {/* Custom Management Systems Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 rounded-xl group hover:shadow-xl transition duration-200 border border-white/5 bg-neutral-900/30 backdrop-blur-sm justify-between flex flex-col space-y-4 glow-border overflow-hidden"
                >
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <Database className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Custom Management Systems</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Small-scale CMS algorithms, internal tools, and specialized booking systems tailored to your agency's operations.
                            </p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-xs font-mono text-neutral-500">
                            &gt; REF:{" "}
                            <span
                                onClick={() => handleScrollToProject("raia studio")}
                                className="text-green-400 hover:text-green-300 hover:underline underline-offset-2 cursor-pointer transition-colors"
                            >
                                Raia Studio
                            </span>
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl border border-white/10 bg-black flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
            >
                <div className="flex-1 space-y-2 z-10">
                    <div className="flex items-center gap-2 text-amber-500 font-mono text-sm mb-2">
                        <span className="animate-pulse">_</span>
                        # value_proposition.md
                    </div>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                        <span className="text-white font-medium">As a final-year Software Engineering student</span>, I offer high-quality, modern development at competitive rates to build my professional portfolio. Professional-grade deliverables with student pricing.
                    </p>
                </div>

                <div className="w-full md:w-auto z-10 shrink-0">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto inline-flex items-center justify-center px-6 py-4 bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-widest border border-white/20 transition-all duration-300 font-bold group"
                    >
                        [ INQUIRE_FOR_QUOTATION ]
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />
            </motion.div>
        </section>
    );
}
