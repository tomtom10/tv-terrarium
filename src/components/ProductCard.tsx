"use client";

import React, { useState } from "react";
import { TerrariumProduct, ADD_ONS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { TerrariumScene, sceneVariantFor } from "./TerrariumScene";
import {
  ShoppingBag,
  Check,
  Plus,
  Tv,
  Droplets,
  Ruler,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";

interface ProductCardProps {
  product: TerrariumProduct;
  onOpenDetails: (product: TerrariumProduct) => void;
}

export function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    addItem(product, 1, selectedAddOns);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  // Calculate total price with selected addons
  const currentTotal =
    product.price +
    selectedAddOns.reduce((sum, id) => {
      const a = ADD_ONS.find((addon) => addon.id === id);
      return sum + (a ? a.price : 0);
    }, 0);

  return (
    <div className="relative bg-[#121612] rounded-2xl border border-stone-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(34,197,94,0.15)]">
      {/* Top Banner / Channel Badge */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <Tv className="w-3 h-3" />
              <span>{product.channel}</span>
            </span>
            <span className="text-xs font-mono text-stone-400">{product.era}</span>
          </div>
          {product.badge && (
            <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>
      </div>

      {/* Visual CRT Monitor Preview Box */}
      <div className="px-5 py-2">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#070e08] border-2 border-[#1c271e] crt-screen-curvature flex flex-col justify-start p-3">
          {/* Subtle Scanlines */}
          <div className="absolute inset-0 crt-scanlines opacity-50 pointer-events-none" />

          {/* Per-model terrarium preview (compact: fewer elements, no ambient effects) */}
          <div className="absolute inset-0">
            <TerrariumScene variant={sceneVariantFor(product.id)} compact />
          </div>

          {/* Overlay Dimensions badge */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-stone-300 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-md border border-stone-800">
            <span className="flex items-center gap-1">
              <Ruler className="w-3 h-3 text-emerald-400" />
              {product.dimensions.width} × {product.dimensions.height}
            </span>
            <span className="text-amber-400 font-bold">{product.dimensions.weight}</span>
          </div>
        </div>
      </div>

      {/* Quick Specs & Included Plants */}
      <div className="px-5 py-3 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 text-stone-300">
          <Droplets className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-stone-400">Care:</span>
          <span className="font-semibold text-emerald-300">{product.careDifficulty}</span>
        </div>

        <div className="flex items-start gap-1.5 text-stone-300">
          <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-stone-400 line-clamp-1">
            <strong className="text-stone-200">Flora:</strong> {product.floraIncluded.slice(0, 2).join(", ")} + more
          </p>
        </div>

        {/* Optional Add-Ons Accordion / Checkboxes */}
        <div className="pt-2 border-t border-stone-800/80">
          <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">
            Customize with Broadcast Add-ons:
          </p>
          <div className="space-y-1.5">
            {ADD_ONS.map((addon) => {
              const isChecked = selectedAddOns.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  type="button"
                  className={`w-full flex items-center justify-between p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    isChecked
                      ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                      : "bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                        isChecked
                          ? "bg-emerald-500 text-black font-bold"
                          : "border border-stone-600"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3" />}
                    </div>
                    <span className="truncate max-w-[170px]">{addon.name}</span>
                  </div>
                  <span className="font-mono text-amber-300 font-semibold">+${addon.price}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pricing & Actions Footer */}
      <div className="p-5 pt-3 bg-stone-950/60 border-t border-stone-800/80">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-stone-400 block">Total Model Price</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-white">${currentTotal}</span>
              {product.originalPrice && selectedAddOns.length === 0 && (
                <span className="text-xs font-mono text-stone-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-500/30">
            {product.stockLeft} left in batch
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenDetails(product)}
            className="w-full bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Full Specs</span>
          </button>

          <button
            onClick={handleAddToCart}
            className={`w-full font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
              isAddedRecently
                ? "bg-emerald-600 text-white"
                : "bg-emerald-500 hover:bg-emerald-400 text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
