"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Tv, ShoppingBag, Volume2, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d0c]/90 backdrop-blur-md border-b border-stone-800/80">
      {/* Top Ticker Broadcast Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#182a1b] to-emerald-950 py-1.5 px-4 text-center border-b border-emerald-900/30">
        <p className="text-[11px] sm:text-xs font-mono text-emerald-300 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>FREE INSULATED CLIMATE SHIPPING ON ORDERS OVER $150</span>
          <span className="hidden md:inline">• USE CODE <strong className="text-white">BROADCAST10</strong> FOR 10% OFF</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-stone-900 to-amber-950 p-0.5 border border-amber-700/60 shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Tv className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white font-sans uppercase">
                  TV Terrarium
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold">
                  .COM
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/80 font-serif italic hidden sm:block -mt-0.5">
                Tune in and watch the grass grow
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300 font-mono">
            <a
              href="#lineup"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <span>The Lineup</span>
            </a>
            <a
              href="#how-it-works"
              className="hover:text-emerald-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#care-guide"
              className="hover:text-emerald-400 transition-colors"
            >
              Care Guide
            </a>
            <a
              href="#reviews"
              className="hover:text-emerald-400 transition-colors"
            >
              Viewer Reviews
            </a>
            <a
              href="#faq"
              className="hover:text-emerald-400 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.35)] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-stone-950 text-white text-[11px] font-mono font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-800 flex flex-col gap-3 font-mono text-sm">
            <a
              href="#lineup"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-900"
            >
              The Lineup (All Models)
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-900"
            >
              How It Works & Transit
            </a>
            <a
              href="#care-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-900"
            >
              Care Schedule
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-900"
            >
              Viewer Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-900"
            >
              FAQ
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
