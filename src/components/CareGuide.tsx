"use client";

import React from "react";
import { Sun, Droplets, Thermometer, Scissors, Sparkles, CheckCircle2 } from "lucide-react";

export function CareGuide() {
  return (
    <section id="care-guide" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-stone-800">
      <div className="bg-gradient-to-br from-[#121812] to-[#0c100c] border-2 border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAILY BROADCAST SCHEDULE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Effortless Care & Maintenance Routine
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            TV Terrariums are engineered to thrive with virtually zero effort. Follow this simple broadcast schedule to keep your miniature living world lush for years.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Light */}
          <div className="bg-[#172017] border border-stone-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Lighting Schedule</h3>
            <span className="text-xs font-mono text-amber-400 font-semibold block mb-2">
              6 - 8 Hours Daily
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Use the built-in full-spectrum LED light bar or place in bright indirect room light. Avoid direct harsh sunlight through windows.
            </p>
          </div>

          {/* Water */}
          <div className="bg-[#172017] border border-stone-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Water Frequency</h3>
            <span className="text-xs font-mono text-blue-400 font-semibold block mb-2">
              Once Every 3-6 Months
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              If the screen looks completely dry and moss feels crisp, open the top maintenance port and apply 4-5 spritzes of distilled water.
            </p>
          </div>

          {/* Temperature */}
          <div className="bg-[#172017] border border-stone-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Ideal Climate</h3>
            <span className="text-xs font-mono text-emerald-400 font-semibold block mb-2">
              65°F - 78°F (18°C - 25°C)
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Normal comfortable indoor temperatures. Keep away from direct heating radiator blasts or cold air conditioning drafts.
            </p>
          </div>

          {/* Trimming */}
          <div className="bg-[#172017] border border-stone-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Occasional Prune</h3>
            <span className="text-xs font-mono text-purple-400 font-semibold block mb-2">
              Twice A Year
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Ferns love the high humidity and will grow slowly. Simply snip overgrown fronds with the included miniature curved precision shears.
            </p>
          </div>
        </div>

        {/* Plant Health Assurance Callout */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Includes printed retro 1970s TV Owner&#39;s Care Manual with every shipment.</span>
          </div>
          <span className="text-emerald-400 font-bold">
            Live Support: broadcast@tvterrarium.com
          </span>
        </div>
      </div>
    </section>
  );
}
