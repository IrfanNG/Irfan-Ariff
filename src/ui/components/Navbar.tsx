"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const sections = ["hero", "about", "portfolio", "pricing", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-white border-b border-zinc-100">
        <div className="flex justify-between items-center w-full px-6 py-0 max-w-[1440px] mx-auto">
          <button
            type="button"
            className="cursor-pointer transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-4"
            onClick={() => scrollTo("hero")}
            aria-label="Go to top"
          >
            <Image
              src="/primary-logo.png"
              alt="Copper Boston Group"
              width={220}
              height={64}
              priority
              className="h-32 w-auto mix-blend-multiply"
            />
          </button>

          <div className="hidden md:flex space-x-12">
            {["About", "Portfolio", "Pricing"].map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;

              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className={cn(
                    "relative font-sans tracking-[0.08em] uppercase text-[12px] transition-all duration-300 pb-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-4",
                    isActive 
                      ? "text-zinc-950 font-semibold border-b-2 border-blue-950" 
                      : "text-zinc-700 font-medium hover:text-zinc-950"
                  )}
                >
                  {link}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-950 transition-all duration-300 group-hover:w-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => scrollTo("contact")}
              className={cn(
                "font-sans tracking-[0.08em] uppercase font-bold text-[12px] border px-5 py-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-4",
                activeSection === "contact"
                  ? "bg-blue-950 text-white border-blue-950"
                  : "text-zinc-950 border-zinc-300 hover:bg-zinc-50"
              )}
            >
              LET&apos;S TALK
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-4"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[95] bg-white pt-32 px-6 md:hidden">
          <nav className="flex flex-col gap-10">
            {["About", "Portfolio", "Pricing", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="font-sans font-bold text-4xl tracking-tighter text-zinc-950 uppercase text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-4"
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
