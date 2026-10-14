"use client";

import React, { useState } from "react";
import { PRODUCTS, TerrariumProduct } from "@/data/products";
import { sound } from "@/utils/audio";
import { useCart } from "@/context/CartContext";
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
      <div className="relative max-w-5xl mx-auto">
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
            <div className="lg:col-span-8 relative">
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

                  {/* Realistic Simulated Terrarium Inside the TV */}
                  <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-end">
                    {/* Lighting Gradient depending on Mode */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-10 ${
                        lightMode === "day"
                          ? "bg-gradient-to-b from-amber-200/20 via-emerald-400/10 to-transparent mix-blend-screen"
                          : lightMode === "grow"
                          ? "bg-gradient-to-b from-purple-500/25 via-pink-400/15 to-transparent mix-blend-screen"
                          : "bg-gradient-to-b from-cyan-950/40 via-blue-900/20 to-transparent"
                      }`}
                    />

                    {/* Terrarium Foreground & Plants Vector Graphics */}
                    <div className="relative w-full h-full flex flex-col justify-end">
                      {/* Distant background mist & dew drops */}
                      <div className="absolute inset-0 bg-radial-at-c from-emerald-900/40 via-emerald-950/80 to-[#030904]" />

                      {/* Plant Visual Layer: Rich Organic Terrarium Landscape */}
                      <svg
                        className="w-full h-full object-cover transition-transform duration-500"
                        viewBox="0 0 800 600"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Internal LED Grow Light Bar at top of TV Tube */}
                        <rect x="250" y="20" width="300" height="12" rx="6" fill={lightMode === 'grow' ? '#f472b6' : lightMode === 'night' ? '#38bdf8' : '#fef08a'} filter="drop-shadow(0px 0px 18px currentColor)" />
                        <circle cx="280" cy="26" r="3" fill="#fff" />
                        <circle cx="340" cy="26" r="3" fill="#fff" />
                        <circle cx="400" cy="26" r="3" fill="#fff" />
                        <circle cx="460" cy="26" r="3" fill="#fff" />
                        <circle cx="520" cy="26" r="3" fill="#fff" />

                        {/* Back Wall Moss Growth */}
                        <path d="M120 180 Q200 150 280 200 T420 190 T560 210 T700 170 L720 450 L100 450 Z" fill="#13361b" opacity="0.6" />
                        <path d="M150 230 Q220 210 320 250 T480 220 T620 260 L680 480 L130 480 Z" fill="#194824" opacity="0.8" />

                        {/* Driftwood & Branch Architecture */}
                        <path d="M220 480 C260 380 340 320 480 310 C520 305 570 320 620 340 L600 370 C560 350 510 340 470 345 C370 360 300 420 270 490 Z" fill="#3b2314" />
                        <path d="M380 340 C420 280 480 240 540 220 L550 235 C500 255 440 290 405 348 Z" fill="#4a2e1c" />

                        {/* Cascading Tropical Fern Leaves */}
                        <g opacity="0.95">
                          {/* Left Lemon Button Fern */}
                          <path d="M250 420 Q180 360 140 280 Q200 310 260 410" fill="#22c55e" />
                          <circle cx="150" cy="290" r="14" fill="#16a34a" />
                          <circle cx="170" cy="315" r="16" fill="#22c55e" />
                          <circle cx="195" cy="345" r="18" fill="#15803d" />
                          <circle cx="225" cy="380" r="20" fill="#16a34a" />

                          {/* Center Lush Canopy Ferns */}
                          <path d="M380 360 Q340 240 320 160 Q365 210 395 350" fill="#4ade80" />
                          <ellipse cx="325" cy="175" rx="15" ry="30" transform="rotate(-25 325 175)" fill="#22c55e" />
                          <ellipse cx="340" cy="210" rx="18" ry="35" transform="rotate(-20 340 210)" fill="#4ade80" />
                          <ellipse cx="360" cy="255" rx="20" ry="40" transform="rotate(-15 360 255)" fill="#16a34a" />
                          <ellipse cx="375" cy="305" rx="22" ry="45" transform="rotate(-10 375 305)" fill="#15803d" />

                          {/* Right Weeping Delicate Fern fronds */}
                          <path d="M480 330 Q540 240 620 190 Q580 260 495 340" fill="#86efac" />
                          <ellipse cx="610" cy="200" rx="14" ry="26" transform="rotate(40 610 200)" fill="#4ade80" />
                          <ellipse cx="580" cy="230" rx="16" ry="32" transform="rotate(35 580 230)" fill="#22c55e" />
                          <ellipse cx="545" cy="270" rx="18" ry="38" transform="rotate(30 545 270)" fill="#16a34a" />
                        </g>

                        {/* Pink Vein Fittonia or Accent Plants for CH 03 */}
                        {currentProduct.id === "the-80s-portable" && (
                          <g opacity="0.95">
                            <ellipse cx="440" cy="400" rx="25" ry="18" fill="#14532d" />
                            <ellipse cx="440" cy="400" rx="21" ry="14" fill="#166534" />
                            <path d="M420 400 Q440 390 460 400" stroke="#f472b6" strokeWidth="2" />
                            <path d="M430 395 L445 405" stroke="#f472b6" strokeWidth="1.5" />
                            <path d="M450 395 L435 405" stroke="#f472b6" strokeWidth="1.5" />

                            <ellipse cx="485" cy="415" rx="28" ry="20" fill="#14532d" />
                            <path d="M465 415 Q485 405 505 415" stroke="#f472b6" strokeWidth="2" />
                            <path d="M475 410 L490 420" stroke="#f472b6" strokeWidth="1.5" />
                          </g>
                        )}

                        {/* Miniature Bonsai / Quartz for CH 04 */}
                        {currentProduct.id === "the-micro-monitor" && (
                          <g>
                            <polygon points="460,420 475,370 490,420" fill="#f8fafc" opacity="0.9" />
                            <polygon points="485,430 495,385 510,430" fill="#e2e8f0" opacity="0.85" />
                          </g>
                        )}

                        {/* Cushion Moss Hills (Mounds in foreground) */}
                        <ellipse cx="200" cy="470" rx="90" ry="40" fill="#15803d" />
                        <ellipse cx="200" cy="460" rx="75" ry="32" fill="#22c55e" />
                        <ellipse cx="360" cy="465" rx="110" ry="45" fill="#166534" />
                        <ellipse cx="360" cy="455" rx="95" ry="35" fill="#16a34a" />
                        <ellipse cx="540" cy="470" rx="120" ry="45" fill="#15803d" />
                        <ellipse cx="540" cy="458" rx="105" ry="35" fill="#22c55e" />
                        <ellipse cx="680" cy="480" rx="90" ry="40" fill="#14532d" />

                        {/* Substrate Soil Strata Layers (Bottom visible through glass) */}
                        <rect x="0" y="490" width="800" height="35" fill="#261b15" /> {/* Peat moss / organic layer */}
                        <rect x="0" y="525" width="800" height="20" fill="#171717" /> {/* Activated Charcoal */}
                        <rect x="0" y="545" width="800" height="55" fill="#382d24" /> {/* Volcanic lava rock drainage */}

                        {/* Little drainage pebbles */}
                        <circle cx="50" cy="565" r="10" fill="#574838" />
                        <circle cx="120" cy="570" r="12" fill="#4d3f32" />
                        <circle cx="210" cy="562" r="9" fill="#5a4d3f" />
                        <circle cx="340" cy="568" r="11" fill="#4a3e31" />
                        <circle cx="490" cy="564" r="10" fill="#5c4e3f" />
                        <circle cx="630" cy="572" r="12" fill="#473b2e" />
                        <circle cx="720" cy="565" r="9" fill="#58493a" />

                        {/* Realistic Dew & Condensation Drops on the Glass */}
                        <g opacity="0.6">
                          <ellipse cx="180" cy="220" rx="3" ry="5" fill="#fff" />
                          <circle cx="180" cy="232" r="2" fill="#fff" opacity="0.8" />
                          <ellipse cx="440" cy="180" rx="4" ry="7" fill="#fff" />
                          <circle cx="440" cy="195" r="2" fill="#fff" opacity="0.7" />
                          <ellipse cx="620" cy="280" rx="3" ry="5" fill="#fff" />
                          <circle cx="622" cy="292" r="1.5" fill="#fff" />
                          <circle cx="310" cy="300" r="2" fill="#fff" />
                          <circle cx="510" cy="240" r="2.5" fill="#fff" />
                        </g>
                      </svg>
                    </div>
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

                  {/* Bottom OSD Bar: Tagline & Closed Circuit Guarantee */}
                  <div className="absolute bottom-3 inset-x-3 z-20 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                      <p className="text-xs text-stone-300 font-mono">
                        <strong className="text-emerald-400">100% Closed Loop:</strong> Natural rainfall cycle inside the glass.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-amber-300 font-semibold">\${currentProduct.price} USD</span>
                      <button
                        onClick={() => addItem(currentProduct)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(34,197,94,0.4)] cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Right TV Control Panel (Rotary Knobs, Channel Selector, Speakers) */}
            <div className="lg:col-span-4 flex flex-col gap-5 bg-gradient-to-b from-[#2a170f] to-[#1c0f0a] p-5 rounded-2xl border-2 border-amber-950/80 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)]">
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
                    <span className="text-lg font-bold text-white font-mono">\${currentProduct.price}</span>
                    {currentProduct.originalPrice && (
                      <span className="text-xs text-stone-500 line-through ml-2 font-mono">
                        \${currentProduct.originalPrice}
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
