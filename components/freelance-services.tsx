"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
    Briefcase,
    Globe,
    Database,
    MessageSquare,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Terminal as TerminalIcon
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ProfileData, ProjectData, ServiceData } from "@/lib/types";
import { cn } from "@/lib/utils";

const IconMap: Record<string, any> = {
    Globe,
    Briefcase,
    Database,
    MessageSquare,
    Terminal: TerminalIcon,
    ArrowRight
};

const SPRING_CONFIG = { stiffness: 300, damping: 30 };

function ProjectCard({ proj, onClick }: { proj: any, onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), SPRING_CONFIG);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), SPRING_CONFIG);

    const contentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), SPRING_CONFIG);
    const contentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), SPRING_CONFIG);

    const [codeLines, setCodeLines] = useState<string[]>([]);

    useEffect(() => {
        const fileStructure = [
            "src/app/page.tsx", "lib/supabase/client.ts", "components/ui/button.tsx",
            "api/route.ts", "styles/globals.css", "utils/helpers.js"
        ];
        const generated = Array.from({ length: 15 }).map(() =>
            `> ${fileStructure[Math.floor(Math.random() * fileStructure.length)]} ${Math.random().toString(16).slice(2, 8)}`
        );
        setCodeLines(generated);
    }, []);

    function handleMouseMove(e: React.MouseEvent) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ rotateX, rotateY, perspective: 1000 }}
            variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                show: { opacity: 1, scale: 1, y: 0 }
            }}
            whileHover={{ y: -12, scale: 1.02 }}
            transition={SPRING_CONFIG}
            className={cn(
                "w-full group relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-neutral-900/50 cursor-pointer transition-all duration-500",
                "hover:shadow-[0_0_40px_-5px_rgba(251,191,36,0.2)]",
                "hover:border-white/20 hover:bg-neutral-900 shadow-2xl"
            )}
        >
            {/* Micro-Terminal Reveal Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5 group-hover:opacity-40 transition-opacity duration-700 overflow-hidden px-4 py-8">
                <p className="font-mono text-[8px] leading-tight text-white/50 break-all select-none">
                    {codeLines.map((line, i) => (
                        <span key={i} className="block whitespace-nowrap">
                            {line}
                        </span>
                    ))}
                </p>
            </div>

            {/* Live Ping Indicator */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 group-hover:border-white/20 transition-colors">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                    <span className="text-[8px] font-mono text-neutral-400 group-hover:text-neutral-200 uppercase tracking-tighter transition-colors">
                        [ ACTIVE_DEPLOYMENT ]
                    </span>
                </div>
            </div>

            {/* Parallax Content Layer */}
            <motion.div
                style={{ x: contentX, y: contentY }}
                className="absolute inset-0 z-10"
            >
                <img
                    src={proj.image_primary || "/project-placeholder.png"}
                    alt={proj.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-90 transition-all duration-700 scale-105 group-hover:scale-110"
                />
            </motion.div>

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20">
                <div className="flex items-center gap-2 mb-1.5 transform group-hover:translate-x-1 transition-transform">
                    <TerminalIcon className="w-4 h-4 text-amber-500/70" />
                    <p className="text-white font-bold text-base tracking-tight">{proj.title}</p>
                </div>
                <p className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity ml-6">
                    {proj.category}
                </p>
            </div>

            {/* High Impact Inner Glow on Hover */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30",
                "shadow-[inset_0_0_60px_rgba(251,191,36,0.1)]"
            )} />
        </motion.div>
    );
}

export function FreelanceServices({
    profile,
    services,
    commercialProjects,
    config
}: {
    profile: ProfileData | null;
    services: ServiceData[];
    commercialProjects: ProjectData[];
    config?: Record<string, string>;
}) {
    if (!profile) return null;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);

    const whatsappNumber = config?.whatsapp_number || profile.whatsapp_number || "601111111111";

    const message = "Hi Irfan, I'm interested in your freelance services for a project.";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

    const nextProject = () => {
        if (commercialProjects.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % commercialProjects.length);
    };

    const prevProject = () => {
        if (commercialProjects.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + commercialProjects.length) % commercialProjects.length);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                ...SPRING_CONFIG
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: SPRING_CONFIG }
    };

    return (
        <motion.section
            id="services"
            className="space-y-8"
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

            {/* Client Showcase Carousel */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <motion.h3 variants={item} className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                        // live_deployments.sh
                    </motion.h3>
                    <div className="flex gap-2">
                        <button
                            onClick={prevProject}
                            className="p-2 rounded-full border border-white/10 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextProject}
                            className="p-2 rounded-full border border-white/10 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden -mx-4 px-4 md:mx-0 md:px-0">
                    <motion.div
                        animate={{ x: `-${currentIndex * (isMobile ? 100 : 33.33)}%` }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="flex gap-4 md:gap-6"
                        style={{ width: "100%" }}
                    >
                        {commercialProjects.length > 0 ? (
                            commercialProjects.map((proj) => (
                                <div key={proj.id} className="min-w-full md:min-w-[calc(33.33%-16px)] shrink-0">
                                    <ProjectCard proj={proj} onClick={() => { }} />
                                </div>
                            ))
                        ) : (
                            <div className="w-full p-12 border border-dashed border-white/5 rounded-xl text-center text-neutral-600 font-mono text-xs uppercase tracking-widest">
                                [ NO_COMMERCIAL_PROJECTS_STAGED ]
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => {
                    const Icon = IconMap[service.icon_name] || Globe;

                    // Category-based theme mapping
                    const theme = (() => {
                        const title = service.title.toLowerCase();
                        if (title.includes('landing') || title.includes('web')) return { color: 'cyan', glow: 'shadow-cyan-500/20', border: 'border-l-cyan-500/50' };
                        if (title.includes('cms') || title.includes('management') || title.includes('system')) return { color: 'purple', glow: 'shadow-purple-500/20', border: 'border-l-purple-500/50' };
                        if (title.includes('commerce') || title.includes('store') || title.includes('shop')) return { color: 'emerald', glow: 'shadow-emerald-500/20', border: 'border-l-emerald-500/50' };
                        return { color: 'amber', glow: 'shadow-amber-500/20', border: 'border-l-amber-500/50' };
                    })();

                    const colorMap: Record<string, string> = {
                        cyan: 'text-cyan-400 group-hover:text-cyan-300',
                        purple: 'text-purple-400 group-hover:text-purple-300',
                        emerald: 'text-emerald-400 group-hover:text-emerald-300',
                        amber: 'text-amber-400 group-hover:text-amber-300'
                    };

                    return (
                        <motion.div
                            key={service.id}
                            variants={item}
                            whileHover={{ scale: 1.01, x: 5 }}
                            className={cn(
                                "p-6 rounded-xl border border-white/5 bg-neutral-900/30 backdrop-blur-md flex gap-6 items-start group transition-all relative overflow-hidden",
                                theme.border,
                                "border-l-4",
                                "hover:border-white/10 hover:bg-neutral-900/50"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 shrink-0 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-300 group-hover:scale-110",
                                colorMap[theme.color]
                            )}>
                                <Icon className="w-6 h-6" />
                            </div>

                            <div className="space-y-1 relative z-10 flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-white tracking-tight">
                                        {service.title}
                                    </h3>
                                    <span className="text-[10px] font-mono text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        SVC_ID: {service.id.slice(0, 4)}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-400 leading-relaxed font-light group-hover:text-neutral-300 transition-colors duration-300">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
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
                        {config?.value_proposition || "Helping local business owners own fast, manageable, and professional web systems."}
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
