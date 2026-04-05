import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/navbar";
import { getProfile } from "@/lib/supabase/queries";
import { Toaster } from "@/components/ui/sonner";
import { FluidBackground } from "@/src/ui/components/canvas/FluidBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.irfanariff.com"),
  title: {
    default: "Irfan Ariff | Elite Full-Stack Orchestrator",
    template: "%s | Irfan Ariff",
  },
  description:
    "Engineering Excellence. Orchestrated. High-fidelity digital ecosystems for premium brands and startups.",
  keywords: [
    "Irfan Ariff", "software engineer", "freelance developer",
    "web development", "mobile app development", "UniKL MIIT",
    "2026 internship", "Next.js", "Flutter",
    "Freelance Developer Malaysia", "Software Engineering Intern 2026",
    "UniKL MIIT Portfolio", "Supabase", "System Architecture"
  ],
  authors: [{ name: "Irfan Ariff" }],
  creator: "Irfan Ariff",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.irfanariff.com",
    siteName: "Irfan Ariff Portfolio",
    title: "Irfan Ariff | Software Developer",
    description:
      "Exploring 2026 internships & building freelance web and mobile solutions. View my work and get in touch.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Irfan Ariff Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irfan Ariff | Developer Portfolio",
    description:
      "Software Engineering student seeking 2026 internships. Freelance web & mobile dev.",
    images: ["/api/og"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(
        "min-h-screen bg-[#030303] font-sans antialiased text-white relative overflow-x-hidden selection:bg-white selection:text-black",
        inter.variable,
        interTight.variable,
        jetbrainsMono.variable,
        cormorant.variable
      )}>
        <div className="grain-overlay" />
        <FluidBackground />
        <Navbar profile={profile} />
        <main className="relative flex flex-col w-full min-h-screen pt-0 md:pt-0 lg:pt-0">
          {children}
        </main>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
