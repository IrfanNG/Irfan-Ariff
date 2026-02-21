"use client";

import { useTransition, useState, useEffect } from "react";
import { toast } from "sonner";
import { updateProfile } from "@/lib/actions/profile";
import { createClient } from "@/lib/supabase/client";
import { ProfileData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

export default function ProfileAdmin() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const loadProfile = async () => {
            setIsLoading(true);
            const supabase = createClient();
            const { data } = await supabase.from('profile').select('*').eq('id', 1).maybeSingle();
            if (data) setProfile(data as ProfileData);
            setIsLoading(false);
        };
        loadProfile();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await updateProfile(formData);
            if (result?.error) toast.error(`Error: ${result.error}`);
            else toast.success("Profile config updated!");
        });
    }

    if (isLoading) {
        return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-green-500 animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 font-mono max-w-2xl">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Global System Config</h2>
                <p className="text-sm text-neutral-500">Update your unified profile and contact links.</p>
            </div>

            <form action={handleSubmit} className="space-y-6 bg-neutral-900/40 p-6 rounded-xl border border-white/5">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="availability_status" className="text-xs uppercase tracking-wider text-green-500">Status String</Label>
                        <Input id="availability_status" name="availability_status" defaultValue={profile?.availability_status || ''} className="bg-black/80 border-green-500/20 text-green-400 font-mono focus-visible:ring-green-500" />
                        <p className="text-[10px] text-neutral-500">Rendered next to the pulsing green dot.</p>
                    </div>

                    <div className="pt-4 space-y-4 border-t border-white/5">
                        <h3 className="text-xs font-bold text-neutral-400">CONTACT UPLINKS</h3>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs uppercase text-neutral-500">Email Address</Label>
                            <Input id="email" name="email" type="email" defaultValue={profile?.email || ''} className="bg-black/50 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin_url" className="text-xs uppercase text-neutral-500">LinkedIn URL</Label>
                            <Input id="linkedin_url" name="linkedin_url" defaultValue={profile?.linkedin_url || ''} className="bg-black/50 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="github_url" className="text-xs uppercase text-neutral-500">GitHub URL</Label>
                            <Input id="github_url" name="github_url" defaultValue={profile?.github_url || ''} className="bg-black/50 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp_number" className="text-xs uppercase text-neutral-500">WhatsApp (wa.me/...)</Label>
                            <Input id="whatsapp_number" name="whatsapp_number" defaultValue={profile?.whatsapp_number || ''} className="bg-black/50 border-white/10 text-white placeholder:text-neutral-700" placeholder="60123456789" />
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <Button type="submit" disabled={isPending} className="w-full bg-white text-black hover:bg-neutral-200">
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        {isPending ? "FLASHING_FIRMWARE..." : "SAVE_CONFIG"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
