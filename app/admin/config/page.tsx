"use client";

import { useTransition, useState, useEffect } from "react";
import { toast } from "sonner";
import { updateConfig } from "@/lib/actions/config";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Terminal } from "lucide-react";

export default function ConfigAdmin() {
    const [config, setConfig] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    const loadConfig = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await supabase.from('site_config').select('key, value');
        if (data) {
            const mapped = data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
            setConfig(mapped);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadConfig();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await updateConfig(formData);
            if (result?.error) toast.error(`Error: ${result.error}`);
            else {
                toast.success("System configuration updated!");
                loadConfig();
            }
        });
    }

    if (isLoading) return <div className="h-48 flex items-center justify-center font-mono"><Loader2 className="animate-spin mr-2" /> LOADING_SYS_CONFIG...</div>;

    return (
        <div className="space-y-8 font-mono">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Terminal className="text-amber-500 w-6 h-6" />
                    System Configuration
                </h2>
                <p className="text-sm text-neutral-500">Global variables used across the portfolio.</p>
            </div>

            <form action={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Settings */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 border-b border-white/5 pb-2">Uplink_Protocols</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp_number" className="text-xs uppercase text-amber-500/80">COMM_WhatsApp_Number</Label>
                                <Input
                                    id="whatsapp_number"
                                    name="whatsapp_number"
                                    defaultValue={config.whatsapp_number}
                                    className="bg-neutral-900 border-white/10 font-mono text-xs h-12"
                                    placeholder="e.g., 60123456789"
                                />
                                <p className="text-[10px] text-neutral-600">Primary uplink for high-conversion contact buttons.</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Settings */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 border-b border-white/5 pb-2">Narrative_Injection</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="value_proposition" className="text-xs uppercase text-amber-500/80">Freelance_VPROP</Label>
                                <Textarea
                                    id="value_proposition"
                                    name="value_proposition"
                                    defaultValue={config.value_proposition}
                                    className="bg-neutral-900 border-white/10 font-mono text-xs min-h-32 resize-none"
                                    placeholder="Enter your primary value proposition for freelance services..."
                                />
                                <p className="text-[10px] text-neutral-600">Main header text for the ~/commercial_uplinks section.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-white text-black hover:bg-neutral-200 font-bold px-8"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                SYNCING...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                [ COMMIT_CHANGES ]
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
