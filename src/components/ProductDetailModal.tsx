"use client";

import React, { useState } from "react";
import { TerrariumProduct, ADD_ONS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  X,
  ShoppingBag,
  Check,
  Tv,
  Droplets,
  Ruler,
  Layers,
  Sparkles,
  ShieldCheck,
  Sun,
  Truck,
} from "lucide-react";

interface ProductDetailModalProps {
  product: TerrariumProduct | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customPlaque, setCustomPlaque] = useState("");

  if (!product) return null;

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    addItem(product, 1, selectedAddOns, customPlaque);
    onClose();
  };

  const totalPrice =
    product.price +
    selectedAddOns.reduce((sum, id) => {
      const a = ADD_ONS.find((addon) => addon.id === id);
      return sum + (a ? a.price : 0);
    }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#101410] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(34,197,94,0.2)] text-left my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer border border-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold px-2.5 py-1 rounded-md">
            {product.channel}
          </span>
          <span className="text-xs font-mono text-stone-400">{product.era}</span>
          <span className="text-xs font-mono text-amber-400 font-semibold ml-auto mr-10">
            ★ {product.rating} ({product.reviewCount} verified reviews)
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h2>
        <p className="text-sm text-stone-300 mt-2 leading-relaxed">{product.description}</p>

        {/* Two-Column Details Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Left Column: Flora & Substrates */}
          <div className="space-y-4">
            <div className="bg-[#161c16] rounded-xl p-4 border border-stone-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Living Flora Included</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {product.floraIncluded.map((plant, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{plant}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#161c16] rounded-xl p-4 border border-stone-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4" />
                <span>Substrate Strata Layers</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {product.substrateLayers.map((layer, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{layer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Hardware & Specs */}
          <div className="space-y-4">
            <div className="bg-[#161c16] rounded-xl p-4 border border-stone-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2 mb-2">
                <Tv className="w-4 h-4" />
                <span>Chassis & Lighting Specs</span>
              </h4>
              <div className="space-y-2 text-xs text-stone-300">
                <p>
                  <strong className="text-white">Cabinet:</strong> {product.chassis}
                </p>
                <p>
                  <strong className="text-white">Lighting:</strong> {product.lighting}
                </p>
                <p>
                  <strong className="text-white">Dimensions:</strong> {product.dimensions.width} W × {product.dimensions.height} H × {product.dimensions.depth} D
                </p>
                <p>
                  <strong className="text-white">Weight:</strong> {product.dimensions.weight}
                </p>
              </div>
            </div>

            <div className="bg-[#161c16] rounded-xl p-4 border border-stone-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Transit & Plant Guarantee</span>
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Shipped in custom shock-absorbing foam with weather-activated climate thermal packs. Guaranteed 100% healthy arrival or instant replacement.
              </p>
            </div>
          </div>
        </div>

        {/* Add-Ons in Modal */}
        <div className="mt-6 pt-5 border-t border-stone-800">
          <h4 className="text-xs font-mono uppercase tracking-wider text-stone-300 font-bold mb-3">
            Add Broadcast Accessories to Your Order:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ADD_ONS.map((addon) => {
              const isChecked = selectedAddOns.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isChecked
                      ? "bg-emerald-950/70 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                      : "bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="truncate pr-1">{addon.name}</span>
                    <span className="text-amber-400 font-mono">+\${addon.price}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-2 leading-tight">
                    {addon.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Optional Plaque text field if engraved plaque is selected */}
          {selectedAddOns.includes("engraved-plaque") && (
            <div className="mt-3 bg-stone-900/80 p-3 rounded-xl border border-amber-500/30">
              <label className="block text-xs font-mono text-amber-300 font-bold mb-1">
                Personalized Brass Plaque Text:
              </label>
              <input
                type="text"
                value={customPlaque}
                onChange={(e) => setCustomPlaque(e.target.value)}
                placeholder="e.g. CH 04 • The Miller Biosphere • Est. 2026"
                className="w-full bg-black/80 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          )}
        </div>

        {/* Modal Footer / Purchase Action */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-stone-400 block">TOTAL PRICE</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-white">\${totalPrice}</span>
              <span className="text-xs text-emerald-400 font-mono">
                {product.stockLeft} units ready for climate dispatch
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-mono cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleAddToCart}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
