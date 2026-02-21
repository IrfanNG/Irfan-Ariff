"use client";

import { useTransition, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Terminal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                toast.error(`Authentication Failed: ${error.message}`);
            } else {
                toast.success("Authentication Success");
                router.push("/admin");
            }
        });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 absolute inset-0 z-50">
            <div className="max-w-md w-full space-y-8 bg-neutral-900/40 p-8 rounded-xl border border-white/10 backdrop-blur-sm shadow-2xl">
                <div className="text-center">
                    <Terminal className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-white tracking-widest font-mono">[ SYSTEM_LOGIN ]</h2>
                    <p className="mt-2 text-sm text-neutral-500 font-mono">
                        Requires authorized credentials.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs tracking-wider text-neutral-400 uppercase font-mono">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-black border-white/10 text-white font-mono placeholder:text-neutral-700"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs tracking-wider text-neutral-400 uppercase font-mono">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-black border-white/10 text-white font-mono placeholder:text-neutral-700"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-green-500 text-black hover:bg-green-400 transition-colors font-mono font-bold tracking-wider"
                    >
                        {isPending ? "> AUTHENTICATING..." : "> INITIALIZE_SESSION"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
