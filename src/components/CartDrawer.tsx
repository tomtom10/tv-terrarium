"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ADD_ONS } from "@/data/products";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Truck,
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeItem,
    subtotal,
    discountAmount,
    shipping,
    total,
    promoCode,
    applyPromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101410] border-l border-stone-800 text-white flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold uppercase tracking-wider font-mono">
                Broadcast Cart
              </h2>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#141914] px-5 py-3 border-b border-stone-800">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                {amountToFreeShipping === 0
                  ? "You unlocked FREE Climate-Safe Shipping!"
                  : `Add $${amountToFreeShipping} more for Free Shipping`}
              </span>
              <span className="font-bold text-emerald-400">{freeShippingPercent}%</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-stone-400 font-mono">
                <p className="text-4xl mb-3">📺</p>
                <p className="text-base font-bold text-stone-200">Your cart is currently off the air</p>
                <p className="text-xs text-stone-500 mt-1">Select a TV model to start your broadcast!</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-4 py-2 bg-emerald-500 text-black text-xs font-bold rounded-xl"
                >
                  Explore The Lineup
                </button>
              </div>
            ) : (
              items.map((item) => {
                // Calculate item base + add-ons
                let unitPrice = item.product.price;
                const addOnObjects = item.selectedAddOns.map((id) => {
                  const found = ADD_ONS.find((a) => a.id === id);
                  if (found) unitPrice += found.price;
                  return found;
                });

                return (
                  <div
                    key={item.cartId}
                    className="bg-[#151b15] border border-stone-800/80 rounded-xl p-3.5 flex gap-3 text-xs"
                  >
                    {/* TV Preview Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-stone-900 border border-emerald-950 flex flex-col items-center justify-center shrink-0 text-emerald-400 font-mono">
                      <span className="text-[10px]">{item.product.channel}</span>
                      <span className="text-lg">📺</span>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-white text-sm truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.cartId)}
                          className="text-stone-500 hover:text-red-400 transition-colors cursor-pointer p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Add-ons list */}
                      {addOnObjects.length > 0 && (
                        <div className="mt-1 space-y-0.5 text-[11px] text-stone-400 font-mono">
                          {addOnObjects.map((addon) =>
                            addon ? (
                              <div key={addon.id} className="flex justify-between">
                                <span className="truncate">+ {addon.name}</span>
                                <span className="text-amber-400">+${addon.price}</span>
                              </div>
                            ) : null
                          )}
                        </div>
                      )}

                      {/* Custom Plaque inscription */}
                      {item.customPlaqueText && (
                        <p className="mt-1 text-[10px] font-mono text-amber-300 italic truncate">
                          Plaque: &ldquo;{item.customPlaqueText}&rdquo;
                        </p>
                      )}

                      {/* Quantity & Unit Total */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-700 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono font-bold text-white text-sm">
                          ${unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer with Totals & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-[#0c100c] space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo Code (try BROADCAST10)"
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase font-mono placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p
                  className={`text-[11px] font-mono ${
                    promoMessage.isError ? "text-red-400" : "text-emerald-400 font-bold"
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs font-mono text-stone-300 pt-2 border-t border-stone-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Broadcast Discount ({promoCode})</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insulated Climate Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-stone-800">
                  <span>Total</span>
                  <span className="text-emerald-400 font-mono">${total} USD</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Live On Arrival Plant Guarantee Included</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
