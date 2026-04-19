"use client";

import { ServiceData } from "@/lib/types";

interface AlchemistServicesProps {
  services: ServiceData[];
}

export function AlchemistServices({ services }: AlchemistServicesProps) {
  const icons = ["code", "architecture", "strategy"];

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-[#0e0e0e]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3 mb-12 md:mb-0">
          <h2 className="font-sans text-[1.75rem] text-white tracking-tight">Capabilities</h2>
        </div>
        
        <div className="col-span-12 md:col-span-9 flex flex-col space-y-16">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group border-b border-[#474747]/30 pb-16 flex flex-col md:flex-row items-start justify-between"
            >
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <span className="material-symbols-outlined text-[2rem] text-[#C6C6C6] group-hover:text-white transition-colors duration-300" style={{ fontVariationSettings: "'wght' 200" }}>
                  {icons[index % icons.length]}
                </span>
                <h3 className="font-sans text-[1.25rem] text-white uppercase tracking-tight">{service.title}</h3>
              </div>
              <p className="font-sans text-[0.875rem] text-[#C6C6C6] max-w-md font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}