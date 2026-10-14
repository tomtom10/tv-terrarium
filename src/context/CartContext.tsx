"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TerrariumProduct, ADD_ONS } from "@/data/products";

export interface CartItem {
  cartId: string;
  product: TerrariumProduct;
  quantity: number;
  selectedAddOns: string[]; // array of add-on IDs
  customPlaqueText?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: TerrariumProduct, quantity?: number, selectedAddOns?: string[], customPlaqueText?: string) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  discountAmount: number;
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tv_terrarium_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("tv_terrarium_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (
    product: TerrariumProduct,
    quantity = 1,
    selectedAddOns: string[] = [],
    customPlaqueText = ""
  ) => {
    const sortedAddOns = [...selectedAddOns].sort().join(",");
    const cartId = `${product.id}-${sortedAddOns}-${customPlaqueText}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          product,
          quantity,
          selectedAddOns,
          customPlaqueText,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "BROADCAST10" || clean === "GROW10") {
      setPromoCode(clean);
      setDiscountPercent(0.1);
      return { success: true, message: "10% Broadcast Discount Applied!" };
    }
    if (clean === "FIRSTEPISODE") {
      setPromoCode(clean);
      setDiscountPercent(0.15);
      return { success: true, message: "15% Welcome Discount Applied!" };
    }
    return { success: false, message: "Invalid code. Try BROADCAST10 for 10% off." };
  };

  // Calculate pricing
  const subtotal = items.reduce((sum, item) => {
    let itemPrice = item.product.price;
    item.selectedAddOns.forEach((addonId) => {
      const addOn = ADD_ONS.find((a) => a.id === addonId);
      if (addOn) itemPrice += addOn.price;
    });
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round(subtotal * discountPercent);
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        promoCode,
        applyPromoCode,
        discountAmount,
        subtotal,
        shipping,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
