"use client";

import React, { useState } from "react";
import { Tv, Sparkles, Send, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#080a08] border-t border-stone-800 text-stone-400 font-mono text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <Tv className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white uppercase font-sans tracking-tight">
                TV Terrarium
              </span>
            </div>

            <p className="text-stone-300 text-sm font-serif italic text-emerald-300/90">
              &ldquo;Tune into TV Terrarium and watch the grass grow!&rdquo;
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Handcrafting living biospheres inside upcycled analog televisions. Sustainable closed-loop ecosystems requiring almost no maintenance, shipped directly to your living room.
            </p>

            {/* Vintage Spec Plate */}
            <div className="bg-black/60 border border-stone-800 p-3 rounded-xl max-w-xs text-[10px] space-y-1 text-stone-400">
              <div className="flex justify-between">
                <span>CHASSIS STANDARD:</span>
                <span className="text-emerald-400">NTSC 525-LINE / RETRO</span>
              </div>
              <div className="flex justify-between">
                <span>INTERNAL LIGHTING:</span>
                <span className="text-amber-400">4500K PHOTOSYNTHETIC LED</span>
              </div>
              <div className="flex justify-between">
                <span>WATER CONSUMPTION:</span>
                <span className="text-cyan-400">&lt; 50ML / SEMESTER</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Broadcast</h4>
            <ul className="space-y-2">
              <li>
                <a href="#lineup" className="hover:text-emerald-400 transition-colors">
                  The TV Lineup
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  Water Cycle Science
                </a>
              </li>
              <li>
                <a href="#care-guide" className="hover:text-emerald-400 transition-colors">
                  Care Schedule
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-emerald-400 transition-colors">
                  Viewer Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQ & Guarantee
                </a>
              </li>
            </ul>
          </div>

          {/* Guarantee / Legal */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Customer Trust</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-emerald-400">Live Plant Guarantee</span>
              </li>
              <li>
                <span>Insulated Climate Packs</span>
              </li>
              <li>
                <span>30-Day Happiness Warranty</span>
              </li>
              <li>
                <span>Upcycling Certification</span>
              </li>
              <li>
                <span>Privacy & Terms</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Drops */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Channel Guide Alerts
            </h4>
            <p className="text-xs text-stone-400">
              Rare vintage television cases sell out fast. Subscribe for first access to new batch releases.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-xl text-emerald-300 text-xs">
                ✓ You&apos;re tuned in! We&apos;ll notify you when new vintage batches drop.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#121612] border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Subscribe to Drops</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© 2026 tvterrarium.com. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Handcrafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>and reclaimed electronics</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
