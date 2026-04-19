"use client";

import { ProfileData } from "@/lib/types";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/lib/actions/send-email";

type ContactFormState = {
    success: boolean;
    message?: string;
    error?: string;
};

const initialState: ContactFormState = {
    success: false,
    message: "",
    error: ""
};

interface AlchemistContactProps {
  profile: ProfileData | null;
}

export function AlchemistContact({ profile }: AlchemistContactProps) {
  const [state, formAction] = useActionState(sendEmail, initialState);

  return (
    <>
      <section id="contact" className="py-32 px-6 md:px-12 bg-[#0e0e0e]">
        <div className="max-w-[800px] mx-auto text-center mb-16">
          <h2 className="font-sans text-[3.5rem] leading-[1.1] tracking-[-0.04em] text-white mb-6 animate-reveal">Let&apos;s Talk.</h2>
          <p className="font-sans text-[0.875rem] text-[#C6C6C6] font-light">Initiate a dialogue. Detail your requirements below.</p>
        </div>
        
        <div className="max-w-[600px] mx-auto bg-[#1c1b1b] p-8 md:p-12 border border-[#474747]/30">
          <form action={formAction} className="space-y-12">
            <div className="relative group">
              <input 
                name="name" 
                required 
                type="text" 
                placeholder=" " 
                className="peer w-full bg-transparent border-0 border-b border-[#474747] px-0 py-3 text-white font-sans text-[0.875rem] focus:ring-0 focus:border-white transition-colors"
              />
              <label className="absolute left-0 top-3 text-[#C6C6C6] font-sans text-[11px] tracking-[0.1em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">
                Name
              </label>
            </div>

            <div className="relative group">
              <input 
                name="email" 
                required 
                type="email" 
                placeholder=" " 
                className="peer w-full bg-transparent border-0 border-b border-[#474747] px-0 py-3 text-white font-sans text-[0.875rem] focus:ring-0 focus:border-white transition-colors"
              />
              <label className="absolute left-0 top-3 text-[#C6C6C6] font-sans text-[11px] tracking-[0.1em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">
                Email Address
              </label>
            </div>

            <div className="relative group">
              <textarea 
                name="message" 
                required 
                rows={4} 
                placeholder=" " 
                className="peer w-full bg-transparent border-0 border-b border-[#474747] px-0 py-3 text-white font-sans text-[0.875rem] focus:ring-0 focus:border-white transition-colors resize-none"
              />
              <label className="absolute left-0 top-3 text-[#C6C6C6] font-sans text-[11px] tracking-[0.1em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">
                Project Details
              </label>
            </div>

            <div className="pt-4 flex justify-end">
              <SubmitButton />
            </div>

            {state?.success && <p className="text-white text-[10px] font-mono mt-4 uppercase">Transmitted.</p>}
          </form>
        </div>
      </section>
      
      <footer className="bg-[#0E0E0E] flex flex-col md:flex-row justify-between items-center w-full px-12 py-16 border-t border-[#474747]/20 mt-auto">
        <div className="text-lg font-bold text-white mb-6 md:mb-0 tracking-tighter uppercase">
          ALCHIMISTRA
        </div>
        
        <div className="flex space-x-8 mb-6 md:mb-0">
          <a href="#" className="font-sans text-[10px] tracking-[0.1em] uppercase font-light text-[#C6C6C6] hover:text-white transition-colors">INSTAGRAM</a>
          <a href="https://github.com/irfanng" target="_blank" className="font-sans text-[10px] tracking-[0.1em] uppercase font-light text-[#C6C6C6] hover:text-white transition-colors">GITHUB</a>
          <a href="#" className="font-sans text-[10px] tracking-[0.1em] uppercase font-light text-[#C6C6C6] hover:text-white transition-colors">LINKEDIN</a>
        </div>

        <div className="font-sans text-[10px] tracking-[0.1em] uppercase font-light text-[#C6C6C6]">
          © 2026 ALCHIMISTRA. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      disabled={pending}
      type="submit"
      className="bg-white text-black font-sans font-bold text-[11px] tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#ababab] transition-colors flex items-center space-x-3 disabled:opacity-50"
    >
      <span>{pending ? "SENDING..." : "SUBMIT INQUIRY"}</span>
      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>arrow_forward</span>
    </button>
  );
}