"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/products";
import { Star, Tv, MessageSquare, CheckCircle2 } from "lucide-react";

export function Testimonials() {
  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-stone-800">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>VIEWER SUBMISSIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          What Our Viewers Are Saying
        </h2>
        <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
          Over 450+ TV Terrariums broadcasting across living rooms, creative studios, and offices nationwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-[#121612] border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-lg"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Model Tag */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-emerald-400 font-mono text-xs mb-3">
                <Tv className="w-3 h-3" />
                <span>{t.model}</span>
              </div>

              {/* Quote */}
              <p className="text-stone-300 text-sm leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="font-bold text-white block">{t.author}</span>
                <span className="text-stone-500">{t.location}</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
