"use client";

import { Command, Check, FileText, Mail, MessageSquare, Github, Linkedin, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { trackClick } from "@/lib/actions/analytics";
import { copyToClipboard } from "@/lib/utils";

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const commands = [
        {
            id: 'email',
            label: 'Copy Email',
            value: 'mnifanmohdariff@gmail.com',
            icon: Mail,
            action: async () => {
                const success = await copyToClipboard("mnifanmohdariff@gmail.com");
                if (success) {
                    setCopied(true);
                    trackClick("copy_email");
                    setTimeout(() => setCopied(false), 2000);
                }
            }
        },
        {
            id: 'resume',
            label: 'View Resume',
            value: 'PDF',
            icon: FileText,
            action: () => {
                trackClick("view_resume");
                window.open("/my-cv.pdf", "_blank");
                setOpen(false);
            }
        },
        {
            id: 'github',
            label: 'GitHub Profile',
            value: 'github.com/irfanng',
            icon: Github,
            action: () => {
                trackClick("github_view");
                window.open("https://github.com/irfanng", "_blank");
                setOpen(false);
            }
        },
        {
            id: 'linkedin',
            label: 'LinkedIn Profile',
            value: 'LinkedIn',
            icon: Linkedin,
            action: () => {
                trackClick("linkedin_view");
                window.open("https://www.linkedin.com/in/irfan-ariff-20691a264", "_blank");
                setOpen(false);
            }
        },
        {
            id: 'whatsapp',
            label: 'Connect WhatsApp',
            value: 'Direct Uplink',
            icon: MessageSquare,
            action: () => {
                trackClick("whatsapp_connect");
                window.open("https://wa.me/60183823063", "_blank");
                setOpen(false);
            }
        }
    ];

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-black border border-white/20 hover:border-white transition-all group"
            >
                <Command className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                <span className="absolute right-14 px-2 py-1 bg-black border border-white/10 text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
                    (⌘K)
                </span>
            </button>
        );
    }

    return (
        <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90"
            onClick={() => setOpen(false)}
        >
            <div
                className="w-full max-w-lg bg-black border border-white/20 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center border-b border-white/10 px-4">
                    <Command className="mr-3 h-4 w-4 shrink-0 text-white" />
                    <input
                        className="flex h-14 w-full bg-transparent py-4 font-mono text-xs uppercase tracking-widest outline-none placeholder:text-gray-800 text-white"
                        placeholder="Search..."
                        autoFocus
                    />
                    <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white text-[10px] font-mono uppercase tracking-widest">ESC</button>
                </div>
                
                <div className="p-2 max-h-[400px] overflow-y-auto">
                    <div className="px-3 py-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Operational_Uplinks</div>
                    
                    <div className="space-y-px">
                        {commands.map((cmd) => (
                            <button
                                key={cmd.id}
                                onClick={cmd.action}
                                className="w-full flex items-center px-4 py-3 hover:bg-white/5 transition-colors text-left"
                            >
                                <cmd.icon className="mr-4 h-4 w-4 text-gray-500" />
                                <div className="flex flex-col">
                                    <span className="font-sans font-bold text-sm text-gray-300 uppercase tracking-tight">
                                        {cmd.id === 'email' && copied ? "TRANSFERRED_TO_CLIPBOARD" : cmd.label}
                                    </span>
                                    <span className="font-mono text-[9px] text-gray-600 uppercase">
                                        {cmd.value}
                                    </span>
                                </div>
                                {cmd.id === 'email' && copied ? (
                                    <Check className="ml-auto h-4 w-4 text-white" />
                                ) : (
                                    <ExternalLink className="ml-auto h-3 w-3 text-gray-800" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 bg-white/[0.02] px-4 py-3 flex justify-between items-center">
                    <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">ALCHIMISTRA_CORE</span>
                </div>
            </div>
        </div>
    );
}