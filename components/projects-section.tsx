"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Smartphone, Globe, Database, Layers } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { MobileShowcase } from "@/components/mobile-showcase";
import { BrowserMockup } from "@/components/browser-mockup";
import { ProjectHeader } from "@/components/project-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    // Projects data array to map through or render conditionally
    // We can render them directly to keep the structure simple and explicit as in the original file

    return (
        <section id="projects" className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-500" />
                <span className="text-green-500">~/projects</span>
                <span className="text-gray-600">ls -la</span>
            </h2>

            <div className="relative">
                <BentoGrid className="md:auto-rows-[22rem]">
                    {/* 1. CutiMate - Mobile App */}
                    <BentoGridItem
                        className="md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md"
                        header={<MobileShowcase primaryColor="bg-orange-500" image1="/Cutimate1.png" image2="/Cutimate2.png" alt="CutiMate App" />}
                        title={<ProjectHeader title="CutiMate" extension=".dart" />}
                        description={<span className="text-neutral-400 text-sm">Holiday Planner With Group Voting.</span>}
                        icon={<Globe className="h-4 w-4 text-orange-500" />}
                    >
                        <div className="flex flex-wrap gap-1 mt-2">
                            <Badge variant="outline" className="text-[10px] border-blue-900/50 text-blue-500">Flutter</Badge>
                            <Badge variant="outline" className="text-[10px] border-yellow-900/50 text-yellow-500">Firebase</Badge>
                            <Badge variant="outline" className="text-[10px] border-green-900/50 text-green-500">Places API</Badge>
                        </div>
                    </BentoGridItem>

                    {/* 2. JomSujud - Large Feature Card (2x2) */}
                    <BentoGridItem
                        className="md:col-span-2 md:row-span-2 border-white/10 bg-neutral-900/50 backdrop-blur-md"
                        header={<MobileShowcase primaryColor="bg-emerald-500" image1="/JomSujud1.png" image2="/JomSujud2.png" alt="JomSujud App" scale={1.5} />}
                        title={<ProjectHeader title="JomSujud" extension=".dart" />}
                        description={
                            <div className="space-y-4 pt-2">
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    Iconic Mosque Locator & Prayer Times App.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/30">Flutter</Badge>
                                    <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 hover:bg-blue-900/30">Places API</Badge>
                                </div>
                            </div>
                        }
                        icon={<Smartphone className="h-4 w-4 text-emerald-500" />}
                    />

                    {/* 3. BinaPintar - Web App */}
                    <BentoGridItem
                        className="md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md"
                        header={<BrowserMockup appName="BinaPintar" url="cms.binapintar.com" imageSrc="/BinaPintar.png" />}
                        title={<ProjectHeader title="BinaPintar" extension=".sql" />}
                        description={<span className="text-neutral-400 text-sm">Smart Construction CMS.</span>}
                        icon={<Database className="h-4 w-4 text-orange-500" />}
                    >
                        <div className="flex flex-wrap gap-1 mt-2">
                            <Badge variant="outline" className="text-[10px] border-orange-900/50 text-orange-500">Supabase</Badge>
                            <Badge variant="outline" className="text-[10px] border-yellow-900/50 text-yellow-500">CMS</Badge>
                        </div>
                    </BentoGridItem>

                    <AnimatePresence mode="popLayout">
                        {isExpanded && (
                            <>
                                {/* 4. Qalam Irma - Web App */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: 0 }}
                                    className="md:col-span-1 row-span-1"
                                >
                                    <BentoGridItem
                                        className="h-full border-white/10 bg-neutral-900/50 backdrop-blur-md"
                                        header={<BrowserMockup appName="Qalam Irma" url="qalamirma.com" imageSrc="/Qalam Irma.png" />}
                                        title={<ProjectHeader title="Qalam Irma" extension=".tsx" />}
                                        description={<span className="text-neutral-400 text-sm">Business landing page.</span>}
                                        icon={<Layers className="h-4 w-4 text-indigo-500" />}
                                    >
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            <Badge variant="outline" className="text-[10px] border-indigo-900/50 text-indigo-500">Next.js</Badge>
                                            <Badge variant="outline" className="text-[10px] border-pink-900/50 text-pink-500">SEO</Badge>
                                        </div>
                                    </BentoGridItem>
                                </motion.div>

                                {/* 5. HabibahKamal - Web App */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                    className="md:col-span-1 row-span-1"
                                >
                                    <BentoGridItem
                                        className="h-full border-white/10 bg-neutral-900/50 backdrop-blur-md"
                                        header={<BrowserMockup appName="HabibahKamal" url="habibahkamal.com" imageSrc="/HabibahKamal.png" />}
                                        title={<ProjectHeader title="HabibahKamal" extension=".tsx" />}
                                        description={<span className="text-neutral-400 text-sm">Personal Brand Landing Page.</span>}
                                        icon={<Globe className="h-4 w-4 text-pink-500" />}
                                    >
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            <Badge variant="outline" className="text-[10px] border-pink-900/50 text-pink-500">Next.js</Badge>
                                            <Badge variant="outline" className="text-[10px] border-purple-900/50 text-purple-500">Framer Motion</Badge>
                                        </div>
                                    </BentoGridItem>
                                </motion.div>

                                {/* 6. BenAwangHub - Mobile App */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                    className="md:col-span-1 row-span-1"
                                >
                                    <BentoGridItem
                                        className="h-full border-white/10 bg-neutral-900/50 backdrop-blur-md"
                                        header={<MobileShowcase primaryColor="bg-blue-500" image1="/BenAwangHub1.png" image2="/BenAwangHub2.png" alt="BenAwangHub App" />}
                                        title={<ProjectHeader title="BenAwangHub" extension=".tsx" />}
                                        description={<span className="text-neutral-400 text-sm">Community Hub/Family Event Management.</span>}
                                        icon={<Globe className="h-4 w-4 text-neutral-500" />}
                                    >
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            <Badge variant="outline" className="text-[10px] border-blue-900/50 text-blue-500">Flutter</Badge>
                                            <Badge variant="outline" className="text-[10px] border-green-900/50 text-green-500">Firebase</Badge>
                                        </div>
                                    </BentoGridItem>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </BentoGrid>

                {/* Gradient Mask */}
                <AnimatePresence>
                    {!isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10"
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center pt-4 relative z-20">
                <Button
                    variant="outline"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="border-green-900/30 text-green-500 hover:text-green-400 hover:bg-green-950/30 hover:border-green-500/50 transition-all font-mono text-xs tracking-wider"
                >
                    {isExpanded ? (
                        <>
                            [ SHOW_LESS ]
                        </>
                    ) : (
                        <>
                            [ LS_ALL_FILES ]
                        </>
                    )}
                </Button>
            </div>
        </section>
    );
}
