"use client";

import React from "react";
import { Droplets, Sun, Recycle, ShieldCheck, ArrowRight, Layers, Wind, Sparkles } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-stone-800">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
          <Recycle className="w-3.5 h-3.5" />
          <span>SUSTAINABILITY & SCIENCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          How The Closed-Loop Broadcast Works
        </h2>
        <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
          We rescue discarded CRT televisions, safely decommission high-voltage tubes, and install a perfectly balanced living water cycle behind the glass.
        </p>
      </div>

      {/* 4 Interactive Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Step 1 */}
        <div className="bg-[#121612] border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-6 relative flex flex-col justify-between transition-all group">
          <div className="text-4xl font-black font-mono text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors mb-4">
            01
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Vintage TV Rescue</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Authentic 70s and 80s cabinets are safely de-energized, non-functional electronics responsibly recycled, and internal chassis sealed with marine silicone.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] font-mono text-emerald-400">
            • 100% De-charged & Safe
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#121612] border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-6 relative flex flex-col justify-between transition-all group">
          <div className="text-4xl font-black font-mono text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors mb-4">
            02
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">4-Layer Strata Base</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Volcanic lava gravel provides root drainage, activated carbon scrubs impurities, and bio-active peat feeds living moss and lemon button ferns for years.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] font-mono text-emerald-400">
            • Self-Cleaning Bio-Filter
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#121612] border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-6 relative flex flex-col justify-between transition-all group">
          <div className="text-4xl font-black font-mono text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors mb-4">
            03
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Continuous Rain Cycle</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Moisture evaporates from moss, condenses against the cool curved TV glass faceplate, and trickles back down as simulated rain. Rarely needs watering!
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] font-mono text-emerald-400">
            • Water Every 3-6 Months
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-[#121612] border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-6 relative flex flex-col justify-between transition-all group">
          <div className="text-4xl font-black font-mono text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors mb-4">
            04
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Direct Climate Transit</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Suspended in high-density foam cushioning with 72-hour thermal heat or ice packs. Protected by our 100% Live On Arrival Plant Guarantee.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] font-mono text-emerald-400">
            • Guaranteed Safe Arrival
          </div>
        </div>
      </div>
    </section>
  );
}
