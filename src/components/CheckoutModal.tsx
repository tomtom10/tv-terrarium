"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Truck,
  Sparkles,
  Tv,
} from "lucide-react";

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, items, total, shipping, discountAmount, clearCart } =
    useCart();

  const [formData, setFormData] = useState({
    name: "Alex Vance",
    email: "alex@example.com",
    address: "742 Evergreen Terrace",
    city: "Portland",
    state: "OR",
    zip: "97201",
    cardNumber: "•••• •••• •••• 4242",
    exp: "12/28",
    cvc: "842",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      const generatedOrder = `TVT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);

      // Trigger celebratory retro confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#22c55e", "#4ade80", "#fef08a", "#38bdf8", "#f472b6"],
      });

      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f140f] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_40px_rgba(34,197,94,0.25)] text-left my-6 text-white">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer border border-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {isCompleted ? (
          /* Order Confirmation / TV Test Pattern Receipt */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>BROADCAST ORDER DISPATCHED</span>
            </div>

            <h3 className="text-3xl font-black text-white font-sans">
              Welcome to the TV Terrarium Family!
            </h3>
            <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
              Your living biosphere has been reserved in our cleanroom workshop. We will carefully pack your vintage television in custom thermal foam and ship it with climate packs.
            </p>

            <div className="bg-[#151c15] p-5 rounded-2xl border border-stone-800 font-mono text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Order Number:</span>
                <span className="text-emerald-400 font-bold">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Destination:</span>
                <span className="text-white">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Transit Protection:</span>
                <span className="text-emerald-300">72-Hour Weather-Shield Vault</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Confirmation Sent:</span>
                <span className="text-white">{formData.email}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono transition-all shadow-md cursor-pointer"
              >
                Return to Broadcast
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Tv className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold font-mono uppercase tracking-wider">
                Direct Climate Shipping Checkout
              </h3>
            </div>
            <p className="text-xs text-stone-400 mb-6 font-mono">
              Live Plant Arrival Guarantee • 256-bit SSL Encrypted
            </p>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Shipping Address */}
              <div>
                <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>1. Delivery Address</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-stone-400 mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">City</label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1">State</label>
                      <input
                        required
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-400 uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1">ZIP</label>
                      <input
                        required
                        type="text"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-400 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-3 border-t border-stone-800">
                <h4 className="text-xs font-mono uppercase text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>2. Payment Details</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Card Number</label>
                    <input
                      required
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1">Expiration</label>
                      <input
                        required
                        type="text"
                        value={formData.exp}
                        onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                        className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1">CVC Code</label>
                      <input
                        required
                        type="text"
                        value={formData.cvc}
                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        className="w-full bg-[#182018] border border-stone-700 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Climate Transit Notice */}
              <div className="bg-[#141b14] border border-emerald-500/30 rounded-xl p-3 flex items-start gap-2.5 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-emerald-300">Live Weather-Shield Packaging:</strong> We automatically check forecast temperatures between our studio and your doorstep to include custom 72-hour thermal packs.
                </p>
              </div>

              {/* Order Final Action */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-stone-400 block">TOTAL DUE</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">\${total} USD</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? "Broadcasting Order..." : `Complete Order • \$${total}`}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
