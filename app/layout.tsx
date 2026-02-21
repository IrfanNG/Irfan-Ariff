import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/navbar";
import { getProfile } from "@/lib/supabase/queries";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Irfan Ariff | Developer",
  description: "Minimalist, high-tech personal portfolio.",
};

export const revalidate = 60; // Ensure Vercel invalidates the cache every 60 seconds

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();

  return (
    <html lang="en" className="dark">
      <body className={cn(
        "min-h-screen bg-black font-sans antialiased text-white relative overflow-x-hidden selection:bg-white selection:text-black",
        inter.variable,
        jetbrainsMono.variable
      )}>
        <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-5" />
        <Navbar profile={profile} />
        <main className="relative flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 md:pt-32">
          {children}
        </main>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
