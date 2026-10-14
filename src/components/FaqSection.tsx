"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/products";
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20 border-t border-stone-800">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>HELP & TRANSMISSION FREQUENCIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Frequently Broadcast Questions
        </h2>
        <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
          Everything you need to know about our upcycled television biospheres and safe shipping guarantees.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-[#141a14] border-emerald-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                  : "bg-[#101410] border-stone-800 hover:border-stone-700"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-4 px-6 flex items-center justify-between text-left font-bold text-sm sm:text-base text-white cursor-pointer"
              >
                <span className="pr-4">{faq.question}</span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "bg-emerald-500 text-black" : "bg-stone-800 text-stone-400"
                  }`}
                >
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 font-sans">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct contact note */}
      <div className="mt-10 p-5 rounded-2xl bg-stone-900/60 border border-stone-800 text-center font-mono text-xs text-stone-400">
        Have a question about a custom vintage chassis or custom size?{" "}
        <a href="mailto:support@tvterrarium.com" className="text-emerald-400 hover:underline font-bold">
          Contact our Restoration Workshop &rarr;
        </a>
      </div>
    </section>
  );
}
