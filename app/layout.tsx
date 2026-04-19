import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import { AlchemistNavbar } from "@/src/ui/components/AlchemistNavbar";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "ALCHIMISTRA | Digital Presence",
  description: "Alchimistra is a premium digital studio turning complex business ideas into high-performance web and mobile solutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className={cn(
        "min-h-screen bg-[#131313] font-sans antialiased text-white relative selection:bg-white/10 selection:text-white",
        manrope.className,
        jetbrainsMono.variable
      )}>
        <div className="velvet-grain" />
        <AlchemistNavbar />
        <main className="relative flex flex-col w-full min-h-screen">
          {children}
        </main>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}