"use client";

import { ProfileData } from "@/lib/types";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/lib/actions/send-email";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

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

interface ContactProps {
  profile: ProfileData | null;
}

export function Contact({ profile }: ContactProps) {
  const [state, formAction] = useActionState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  void profile;

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <>
      <section id="contact" className="py-24 px-6 md:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[1440px] mx-auto"
        >
          <div className="mb-24 text-left">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-blue-800" />
              <span className="font-sans text-[12px] tracking-[0.22em] text-blue-950 uppercase font-bold">Global Command</span>
            </div>
            <h2 className="font-sans text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              INITIATE <br/> <span className="text-zinc-800">DEPLOYMENT.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <p className="font-sans text-base md:text-lg text-zinc-700 font-normal leading-relaxed mb-12">
                Ready to take your business to the next level? Contact us now to discuss your project requirements and discover how Copper Boston Group can help you achieve your goals. Let&apos;s collaborate to turn your ideas into success stories! Enquire now!
              </p>

              <div className="bg-zinc-50 p-10 border border-zinc-100 shadow-2xl shadow-zinc-100/50">
                <form ref={formRef} action={formAction} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Field label="Your Name" name="name" type="text" />
                    <Field label="Your Email" name="email" type="email" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Field label="Phone Number" name="phone" type="tel" />
                    <Field label="Subject" name="subject" type="text" />
                  </div>

                  <div className="relative group">
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder=" "
                      className="peer w-full bg-transparent border-0 border-b border-zinc-300 px-0 py-3 text-zinc-950 font-sans text-base focus:ring-0 focus:border-blue-950 transition-colors resize-none"
                    />
                    <label className="absolute left-0 top-3 text-zinc-700 font-sans text-[12px] tracking-[0.14em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-blue-950 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px]">
                      Message
                    </label>
                  </div>

                  <div className="pt-2">
                    <SubmitButton />
                  </div>

                  {state?.success && (
                    <p className="text-blue-950 text-[12px] font-sans mt-4 uppercase font-bold animate-reveal">
                      Submission Successful. Your inquiry has been transmitted to our team.
                    </p>
                  )}

                  {state?.error && (
                    <p className="text-red-700 text-[12px] font-sans mt-4 uppercase font-bold animate-reveal">
                      {state.error}
                    </p>
                  )}
                </form>
              </div>
            </div>

            <div className="space-y-16">
              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 rounded-full bg-blue-950/10 flex items-center justify-center shrink-0">
                  <MapPin className="size-7 text-blue-950" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-sans text-2xl font-black text-zinc-950 mb-3 tracking-tighter uppercase">Our Address</h3>
                  <p className="font-sans text-base md:text-lg text-zinc-700 font-normal leading-relaxed">
                    Setapak, 53300 Kuala Lumpur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="bg-zinc-50 py-24 px-6 md:px-12 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2 space-y-8">
              <div className="text-3xl font-black text-zinc-950 tracking-tighter uppercase">CBG</div>
              <p className="font-sans text-sm md:text-base text-zinc-700 font-normal leading-relaxed max-w-sm">
                Copper Boston Group is an engineering-first agency specializing in proprietary digital infrastructure and sovereign software ecosystems. We bridge the gap between complex architecture and business success.
              </p>
            </div>

            <div>
              <h4 className="font-sans text-[12px] tracking-[0.22em] text-zinc-950 uppercase font-black mb-8">Navigation</h4>
              <nav className="flex flex-col gap-4">
                {["About", "Portfolio", "Pricing", "Contact"].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      const el = document.getElementById(link.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-sans text-[12px] text-zinc-700 uppercase tracking-[0.18em] hover:text-blue-950 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-4"
                  >
                    {link}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="font-sans text-[12px] tracking-[0.22em] text-zinc-950 uppercase font-black mb-8">Location</h4>
              <p className="font-sans text-[12px] text-zinc-700 uppercase tracking-[0.18em] leading-relaxed">
                Setapak, 53300 <br/> Kuala Lumpur, <br/> Malaysia.
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-sans text-[12px] tracking-[0.18em] uppercase font-bold text-zinc-700">
              &copy; 2026 Copper Boston Group. ALL RIGHTS RESERVED.
            </p>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase font-black text-zinc-800">
              Sovereign Infrastructure. Built to Scale.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
}) {
  return (
    <div className="relative group">
      <input
        name={name}
        required
        type={type}
        placeholder=" "
        className="peer w-full bg-transparent border-0 border-b border-zinc-300 px-0 py-3 text-zinc-950 font-sans text-base focus:ring-0 focus:border-blue-950 transition-colors"
      />
      <label className="absolute left-0 top-3 text-zinc-700 font-sans text-[12px] tracking-[0.14em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-blue-950 peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px]">
        {label}
      </label>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-blue-950 text-white font-sans font-bold text-[12px] tracking-[0.18em] uppercase px-10 py-5 hover:bg-blue-900 transition-all flex items-center space-x-3 disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-4"
    >
      <span>{pending ? "SENDING..." : "SUBMIT INQUIRY"}</span>
      <ArrowRight className="size-4" aria-hidden="true" />
    </button>
  );
}
