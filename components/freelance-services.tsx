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

    const message = "Hi Irfan, I'm interested in your freelance services for a project.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const handleScrollToProject = (slug: string) => {
        window.dispatchEvent(new CustomEvent("scrollToProject", { detail: { slug } }));
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const clientProjects = [
        {
            name: "Qalam Irma",
            image: "/Qalam Irma.png",
            slug: "qalam irma",
        },
        {
            name: "Habibah Kamal",
            image: "/HabibahKamal.png",
            slug: "habibahkamal",
        },
        {
            name: "Raia Studio",
            image: "/raia-studio.png",
            slug: "raia studio",
        }
    ];

    return (
        <motion.section
            id="services"
            className="space-y-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="space-y-2">
                <motion.h2 variants={item} className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-amber-500" />
                    <span className="text-amber-500">~/commercial_uplinks</span>
                    <span className="text-gray-600">ls -la</span>
                </motion.h2>
                <motion.p variants={item} className="text-neutral-400 font-mono text-sm border-l-2 border-amber-500/30 pl-4 py-1">
                    Expert in building Landing Pages, E-commerce, and Management Systems for SMEs & Startups
                </motion.p>
            </div>

            {/* Client Showcase Grid */}
            <div className="space-y-4">
                <motion.h3 variants={item} className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                    // live_deployments.sh
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {clientProjects.map((proj) => (
                        <motion.div
                            key={proj.name}
                            variants={item}
                            whileHover={{ y: -5 }}
                            onClick={() => handleScrollToProject(proj.slug)}
                            className="group relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-neutral-900/50 cursor-pointer"
                        >
                            <img
                                src={proj.image}
                                alt={proj.name}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                <p className="text-white font-bold text-sm">{proj.name}</p>
                                <p className="text-amber-500 font-mono text-[10px]">{proj.type}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {/* E-commerce & Landing Pages */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm space-y-4 flex flex-col justify-between"
                >
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                            <Globe className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">E-commerce & Landing Pages</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                High-end landing pages and e-commerce stores designed for maximum conversion and professional impact.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Custom Management Systems */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm space-y-4 flex flex-col justify-between"
                >
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <Database className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Custom Management Systems</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Tailored admin dashboards and booking systems (like Raia Studio) to streamline your daily operations.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Performance & SEO */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm space-y-4 flex flex-col justify-between"
                >
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                            <ArrowRight className="w-5 h-5 text-green-400 -rotate-45" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Performance & SEO</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Optimizing your web presence for lightning-fast speeds and top Google search rankings (SEO).
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                variants={item}
                className="p-8 rounded-xl border border-white/10 bg-black flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-[0_0_50px_-12px_rgba(245,158,11,0.2)]"
            >
                <div className="flex-1 space-y-3 z-10">
                    <div className="flex items-center gap-2 text-amber-500 font-mono text-sm mb-2">
                        <span className="animate-pulse">_</span>
                        # value_proposition.md
                    </div>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
                        Helping local business owners own fast, manageable, and professional web systems.
                        <span className="text-white font-medium"> As a Software Engineering student</span>, I offer modern digital solutions at competitive rates to fuel your business growth.
                    </p>
                </div>

                <div className="w-full md:w-auto z-10 shrink-0">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full md:w-auto inline-flex items-center justify-center px-8 py-5 bg-white text-black hover:bg-neutral-100 font-mono text-xs uppercase tracking-widest transition-all duration-300 font-bold group overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center">
                            [ REQUEST_QUOTATION ]
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                    </a>
                </div>

                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />
            </motion.div>
        </motion.section>
    );
}
