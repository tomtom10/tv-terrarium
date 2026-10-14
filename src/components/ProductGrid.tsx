"use client";

import React, { useState } from "react";
import { PRODUCTS, TerrariumProduct } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { Tv, Sparkles, Filter, PackageCheck, Zap } from "lucide-react";

export function ProductGrid() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeModalProduct, setActiveModalProduct] = useState<TerrariumProduct | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "console") return p.id.includes("console");
    if (selectedFilter === "portable") return p.id.includes("portable") || p.id.includes("micro");
    if (selectedFilter === "diy") return p.id.includes("diy");
    return true;
  });

  return (
    <section id="lineup" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-stone-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Tv className="w-3.5 h-3.5" />
            <span>TV GUIDE • PROGRAM SCHEDULE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            The Broadcast Lineup
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
            Choose your television enclosure. Each unit is restored from vintage electronics, planted with live moss biospheres, and shipped in climate-guaranteed packaging.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedFilter === "all"
                ? "bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                : "bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800"
            }`}
          >
            All Channels ({PRODUCTS.length})
          </button>
          <button
            onClick={() => setSelectedFilter("console")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedFilter === "console"
                ? "bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                : "bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800"
            }`}
          >
            Console (70s Woodgrain)
          </button>
          <button
            onClick={() => setSelectedFilter("portable")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedFilter === "portable"
                ? "bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                : "bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800"
            }`}
          >
            Portables & Monitors
          </button>
          <button
            onClick={() => setSelectedFilter("diy")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedFilter === "diy"
                ? "bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                : "bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800"
            }`}
          >
            DIY Broadcast Kits
          </button>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetails={(p) => setActiveModalProduct(p)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}
