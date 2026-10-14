"use client";

import React, { useState } from "react";
import { PRODUCTS, TerrariumProduct } from "@/data/products";
import { sound } from "@/utils/audio";
import { useCart } from "@/context/CartContext";
import { TerrariumScene, sceneVariantFor } from "./TerrariumScene";
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Tv,
  CheckCircle2,
  Droplets,
} from "lucide-react";

export function HeroCrt() {
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(0);
  const [lightMode, setLightMode] = useState<"day" | "grow" | "night">("day");
  const [isStaticActive, setIsStaticActive] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [knobRotation, setKnobRotation] = useState(0);
  const { addItem } = useCart();

  const currentProduct: TerrariumProduct = PRODUCTS[selectedChannelIndex];

  const handleChannelSwitch = (index: number) => {
    if (index === selectedChannelIndex) return;
    sound.playDialClick();
    sound.playStaticBurst(0.18);
    setKnobRotation((prev) => prev + 45);
    setIsStaticActive(true);
    setSelectedChannelIndex(index);
    setTimeout(() => {
      setIsStaticActive(false);
    }, 180);
  };

  const handleNextChannel = () => {
    const nextIdx = (selectedChannelIndex + 1) % PRODUCTS.length;
    handleChannelSwitch(nextIdx);
  };

  const toggleSound = () => {
    const newState = !isAudioPlaying;
    sound.playDialClick();
    sound.toggleAmbient(newState);
    setIsAudioPlaying(newState);
  };

  const toggleLighting = () => {
    sound.playDialClick();
    if (lightMode === "day") setLightMode("grow");
    else if (lightMode === "grow") setLightMode("night");
    else setLightMode("day");
  };

  return (
    <section className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Tagline & Announcement Bar */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span>Closed-Loop Biosphere Broadcast • Live On Air</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans drop-shadow-md">
          Tune into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-lime-400 underline decoration-emerald-500/40 decoration-wavy">TV Terrarium</span>
        </h1>
        <p className="mt-4 text-2xl sm:text-3xl font-serif italic text-emerald-300/90 font-medium tracking-wide">
          &ldquo;And watch the grass grow!&rdquo;
        </p>

        <p className="mt-4 text-base sm:text-lg text-stone-300/90 leading-relaxed max-w-2xl mx-auto">
          Upcycled vintage television sets transformed into living, self-sustaining
          rainforest biospheres. Handcrafted, climate-packed, and shipped directly to your door.
        </p>
      </div>

      {/* THE BIG TV HERO DISPLAY */}
      <div className="relative max-w-6xl mx-auto">
        {/* Vintage Rabbit-Ear Telescoping Antenna on top */}
        <div className="relative flex justify-center -mb-3 z-10">
          <div className="flex items-end gap-16">
            <div className="w-1.5 h-24 bg-gradient-to-t from-stone-400 to-amber-200/90 -rotate-25 origin-bottom rounded-t shadow-lg relative">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-300 absolute -top-2 -left-1 shadow-[0_0_10px_#fde047]" />
            </div>
            <div className="w-1.5 h-24 bg-gradient-to-t from-stone-400 to-amber-200/90 rotate-25 origin-bottom rounded-t shadow-lg relative">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-300 absolute -top-2 -left-1 shadow-[0_0_10px_#fde047]" />
            </div>
          </div>
        </div>

        {/* Outer TV Chassis Cabinet */}
        <div className="relative rounded-3xl p-4 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(34,197,94,0.15)] border-4 border-amber-950/60 woodgrain-cabinet">
          {/* Top Brass Inlay Badge */}
          <div className="flex items-center justify-between pb-3 px-2 border-b border-amber-900/40 text-[11px] font-mono text-amber-200/70 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <Tv className="w-3.5 h-3.5 text-amber-400" />
              <span>SOLID STATE RETRO-CHASSIS • MODEL NO. TVT-74</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55e]" />
              <span className="text-emerald-400">CLOSED BIOSPHERE: ACTIVE</span>
            </div>
          </div>

          {/* Main TV Panel Grid (Screen on left, Controls on right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-center">
            {/* The CRT Screen (8 cols on large) */}
            <div className="lg:col-span-8 relative min-w-0">
              {/* Outer Screen Bezel with curved depth */}
              <div className="relative bg-[#0d120e] rounded-3xl p-3 sm:p-5 shadow-[inset_0_10px_30px_rgba(0,0,0,0.95)] border-4 border-[#1f2820]">
                {/* Curved Glass CRT Screen */}
                <div
                  className={`relative aspect-[4/3] w-full rounded-2xl overflow-hidden crt-screen-curvature transition-all duration-300 ${
                    lightMode === "night"
                      ? "bg-[#05110a]"
                      : lightMode === "grow"
                      ? "bg-[#0b1710]"
                      : "bg-[#09180c]"
                  }`}
                >
                  {/* CRT Scanline Overlay */}
                  <div className="absolute inset-0 crt-scanlines pointer-events-none z-20 opacity-70" />

                  {/* Channel Switch Static Burst */}
                  {isStaticActive && (
                    <div className="absolute inset-0 tv-static bg-emerald-950/80 z-30 flex items-center justify-center">
                      <div className="text-emerald-400 font-mono text-xl tracking-widest bg-black/80 px-4 py-2 rounded border border-emerald-500/50">
                        TUNING {currentProduct.channel}...
                      </div>
                    </div>
                  )}

                  {/* Animated terrarium scene (plays a CRT power-on once on load) */}
                  <div className="absolute inset-0 z-0 overflow-hidden crt-power-on">
                    {/* Keyed so the grass re-grows every time you change the channel */}
                    <div key={currentProduct.id} className="absolute inset-0">
                      <TerrariumScene
                        variant={sceneVariantFor(currentProduct.id)}
                        lightMode={lightMode}
                      />
                    </div>

                    {/* Light-mode colour wash */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-10 ${
                        lightMode === "day"
                          ? "bg-gradient-to-b from-amber-200/15 via-transparent to-transparent mix-blend-screen"
                          : lightMode === "grow"
                          ? "bg-gradient-to-b from-fuchsia-500/20 via-pink-400/10 to-transparent mix-blend-screen"
                          : "bg-gradient-to-b from-cyan-950/35 via-blue-900/15 to-transparent"
                      }`}
                    />

                    {/* Tube vignette */}
                    <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
                  </div>

                  {/* Channel On-Screen Display (OSD) in Top Left */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-400 font-mono text-sm tracking-wider shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold">{currentProduct.channel}</span>
                    <span className="text-emerald-500/80">|</span>
                    <span className="text-white text-xs truncate max-w-[170px] sm:max-w-none">{currentProduct.name}</span>
                  </div>

                  {/* Lighting Mode Badge in Top Right */}
                  <div className="absolute top-4 right-4 z-20">
                    <button
                      onClick={toggleLighting}
                      className="flex items-center gap-1.5 bg-black/75 hover:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono text-stone-200 transition-all cursor-pointer hover:border-amber-400 shadow-lg"
                      title="Click to toggle lighting mode"
                    >
                      {lightMode === "day" && <Sun className="w-3.5 h-3.5 text-amber-400" />}
                      {lightMode === "grow" && <Sparkles className="w-3.5 h-3.5 text-pink-400" />}
                      {lightMode === "night" && <Moon className="w-3.5 h-3.5 text-cyan-400" />}
                      <span className="capitalize">{lightMode} Light</span>
                    </button>
                  </div>

                  {/* Glass Reflection Highlight sweep */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />

                </div>

                {/* Caption strip under the glass (keeps the soil layers visible) */}
                <div className="mt-3 flex items-center justify-between gap-3 px-1 text-[11px] sm:text-xs font-mono text-stone-300">
                  <span className="flex items-center gap-2 min-w-0">
                    <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      <strong className="text-emerald-400">Closed loop:</strong> it rains inside the glass.
                    </span>
                  </span>
                  <span className="text-amber-300 font-semibold shrink-0">${currentProduct.price} USD</span>
                </div>
              </div>
            </div>

            {/* The Right TV Control Panel (Rotary Knobs, Channel Selector, Speakers) */}
            <div className="lg:col-span-4 min-w-0 flex flex-col gap-5 bg-gradient-to-b from-[#2a170f] to-[#1c0f0a] p-5 rounded-2xl border-2 border-amber-950/80 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)]">
              {/* Channel Selector Rotary Dial */}
              <div className="bg-black/60 rounded-xl p-4 border border-amber-900/40 text-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                    VHF CHANNEL DIAL
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {currentProduct.channel}
                  </span>
                </div>

                {/* Big Tactile Rotating Knob */}
                <div className="my-3 flex justify-center">
                  <button
                    onClick={handleNextChannel}
                    className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-700 p-1.5 shadow-[0_6px_15px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] border-2 border-stone-600 transition-transform active:scale-95 cursor-pointer group"
                    title="Click to change channel"
                  >
                    {/* Outer Notch Ring */}
                    <div
                      className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center relative transition-transform duration-300"
                      style={{ transform: `rotate(${knobRotation}deg)` }}
                    >
                      {/* Brass Center Cap */}
                      <div className="w-12 h-12 rounded-full brass-metal shadow-inner flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-950" />
                      </div>
                      {/* Pointer Marker */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-emerald-400 rounded shadow-[0_0_8px_#34d399]" />
                    </div>
                  </button>
                </div>
                <p className="text-[10px] font-mono text-stone-400">
                  CLICK KNOB TO CYCLE CHANNELS
                </p>

                {/* Quick Channel Buttons */}
                <div className="grid grid-cols-4 gap-1.5 mt-3">
                  {PRODUCTS.map((prod, idx) => (
                    <button
                      key={prod.id}
                      onClick={() => handleChannelSwitch(idx)}
                      className={`py-1.5 text-xs font-mono font-bold rounded transition-all cursor-pointer ${
                        selectedChannelIndex === idx
                          ? "bg-emerald-500 text-black shadow-[0_0_10px_#22c55e]"
                          : "bg-stone-900/90 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700"
                      }`}
                    >
                      {prod.channel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info Card in TV Console */}
              <div className="bg-black/50 rounded-xl p-3.5 border border-stone-800 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    {currentProduct.era}
                  </span>
                  <span className="text-xs text-amber-400 flex items-center gap-1 font-bold">
                    ★ {currentProduct.rating} ({currentProduct.reviewCount})
                  </span>
                </div>
                <h3 className="text-white font-bold text-base mt-1">{currentProduct.name}</h3>
                <p className="text-stone-300 text-xs mt-1 line-clamp-2 leading-relaxed">
                  {currentProduct.tagline}
                </p>

                <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-stone-400 block">PRICE</span>
                    <span className="text-lg font-bold text-white font-mono">${currentProduct.price}</span>
                    {currentProduct.originalPrice && (
                      <span className="text-xs text-stone-500 line-through ml-2 font-mono">
                        ${currentProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addItem(currentProduct)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* TV Speaker Grill & Audio Ambience Toggle */}
              <div className="flex items-center justify-between pt-2 px-1">
                {/* Vintage Speaker Slits */}
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-6 bg-black/70 rounded-full" />
                  <div className="w-1.5 h-8 bg-black/70 rounded-full" />
                  <div className="w-1.5 h-10 bg-black/70 rounded-full" />
                  <div className="w-1.5 h-8 bg-black/70 rounded-full" />
                  <div className="w-1.5 h-6 bg-black/70 rounded-full" />
                </div>

                {/* Sound On/Off Button */}
                <button
                  onClick={toggleSound}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                    isAudioPlaying
                      ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                      : "bg-stone-900/80 text-stone-400 border-stone-700 hover:text-stone-200"
                  }`}
                  title="Toggle 60Hz vintage hum & terrarium rain sound"
                >
                  {isAudioPlaying ? (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span>Audio: ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Sound: MUTE</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom TV Legs & Stand */}
          <div className="flex justify-between px-16 -mb-9 mt-4 pointer-events-none">
            <div className="w-6 h-8 bg-amber-950 rounded-b-md shadow-2xl rotate-6 border border-black/80" />
            <div className="w-6 h-8 bg-amber-950 rounded-b-md shadow-2xl -rotate-6 border border-black/80" />
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto">
        <div className="bg-[#141814] border border-stone-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Live On Arrival Guarantee</h4>
            <p className="text-xs text-stone-400 mt-0.5">Free replacement if your flora is stressed in transit.</p>
          </div>
        </div>

        <div className="bg-[#141814] border border-stone-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Closed-Loop Self Watering</h4>
            <p className="text-xs text-stone-400 mt-0.5">Condenses and rains on itself. Water 1-2 times a year.</p>
          </div>
        </div>

        <div className="bg-[#141814] border border-stone-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Safe Insulated Transit</h4>
            <p className="text-xs text-stone-400 mt-0.5">Suspended foam casing with 72hr climate heat/cool packs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
