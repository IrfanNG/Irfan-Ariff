import type { Metadata } from "next";
import "@fontsource-variable/inter-tight/wght.css";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/src/ui/components/Navbar";

export const metadata: Metadata = {
  title: "CBG | Copper Boston Group",
  description: "Copper Boston Group is a premium digital studio turning complex business ideas into high-performance web and mobile solutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <body className="min-h-screen bg-white font-sans antialiased text-zinc-900 relative selection:bg-zinc-900/5 selection:text-zinc-900">
        <div className="velvet-grain" />
        <Navbar />
        <main className="relative flex flex-col w-full min-h-screen">
          {children}
        </main>
        <Toaster theme="light" position="top-center" />
      </body>
    </html>
  );
}
