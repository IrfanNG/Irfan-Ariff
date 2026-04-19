"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function AlchemistNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] nav-backdrop border-none">
        <div className="flex justify-between items-center w-full px-12 py-10 max-w-[1440px] mx-auto">
          <div className="text-2xl font-black tracking-tighter text-white uppercase cursor-pointer" onClick={() => scrollTo("about")}>
            ALCHIMISTRA
          </div>
          
          <div className="hidden md:flex space-x-12">
            {["About", "Services", "Portfolio"].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={cn(
                  "font-sans tracking-[-0.04em] uppercase font-light text-[11px] transition-colors duration-150",
                  link === "About" ? "text-white font-bold border-b border-white pb-1" : "text-[#C6C6C6] hover:text-white"
                )}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => scrollTo("contact")}
              className="font-sans tracking-[-0.04em] uppercase font-bold text-[11px] text-white border border-[#474747] px-6 py-3 hover:bg-[#2a2a2a] transition-colors duration-150"
            >
              LET&apos;S TALK
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 300" }}>
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[95] bg-[#131313] pt-32 px-6 md:hidden">
          <nav className="flex flex-col gap-10">
            {["About", "Services", "Portfolio", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="font-sans font-bold text-5xl tracking-tighter text-white uppercase text-left"
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