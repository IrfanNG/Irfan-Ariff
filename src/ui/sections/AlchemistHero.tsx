"use client";

export function AlchemistHero() {
  return (
    <section id="about" className="min-h-[870px] flex flex-col justify-center px-6 md:px-12 max-w-[1440px] mx-auto relative overflow-hidden">
      <div className="grid grid-cols-12 gap-6 w-full animate-reveal">
        <div className="col-span-12 md:col-start-4 md:col-span-9">
          <p className="font-sans text-[11px] tracking-[0.1em] uppercase text-[#C6C6C6] mb-6">
            The Blueprint
          </p>
          <h1 className="font-sans text-[3.5rem] md:text-[5rem] leading-[1.1] tracking-[-0.04em] text-white mb-12">
            Alchimistra: Elevating<br className="hidden md:block"/>Digital Presence.
          </h1>
          <p className="font-sans text-[0.875rem] text-[#C6C6C6] max-w-xl font-light leading-relaxed">
            We strip away the extraneous to reveal the essential architecture of your brand. Through rigorous design systems and unyielding technical precision, we construct digital spaces that command authority.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-12 right-12 animate-bounce hidden md:block">
        <span className="material-symbols-outlined text-[#C6C6C6] opacity-50" style={{ fontVariationSettings: "'wght' 100" }}>
          arrow_downward
        </span>
      </div>
    </section>
  );
}