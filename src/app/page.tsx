"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { HeroCrt } from "@/components/HeroCrt";
import { ProductGrid } from "@/components/ProductGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { CareGuide } from "@/components/CareGuide";
import { Testimonials } from "@/components/Testimonials";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0a0d0a] text-stone-100 flex flex-col selection:bg-emerald-500 selection:text-black">
        {/* Sticky Broadcast Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Big Hero Display of the TV Terrarium */}
          <HeroCrt />

          {/* 2. Product Lineup & Purchase Options ("The Broadcast Lineup") */}
          <ProductGrid />

          {/* 3. The Science of the Closed-Loop Water Cycle */}
          <HowItWorks />

          {/* 4. Effortless Care & Maintenance Schedule */}
          <CareGuide />

          {/* 5. Customer Reviews & Viewer Submissions */}
          <Testimonials />

          {/* 6. Frequently Broadcast Questions */}
          <FaqSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Direct Climate-Safe Shipping Checkout Modal */}
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
