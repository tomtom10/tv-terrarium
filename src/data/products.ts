export interface TerrariumProduct {
  id: string;
  name: string;
  channel: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  era: string;
  rating: number;
  reviewCount: number;
  stockLeft: number;
  badge?: string;
  dimensions: {
    width: string;
    height: string;
    depth: string;
    weight: string;
  };
  chassis: string;
  lighting: string;
  floraIncluded: string[];
  substrateLayers: string[];
  careDifficulty: "Beginner (Self-Sustaining)" | "Easy" | "Hands-On DIY";
  description: string;
  accentColor: string;
  themeStyle: "woodgrain" | "retro-plastic" | "minimal-silver" | "vintage-chassis";
  features: string[];
}

export const PRODUCTS: TerrariumProduct[] = [
  {
    id: "the-console-1974",
    name: "The 1974 Console Terrarium",
    channel: "CH 02",
    tagline: "Walnut wood cabinet holding an ancient tropical rain forest canopy.",
    price: 289,
    originalPrice: 320,
    era: "1974 Vintage Zenith/RCA Style",
    rating: 4.9,
    reviewCount: 142,
    stockLeft: 6,
    badge: "Most Popular",
    dimensions: {
      width: '18.5"',
      height: '15.2"',
      depth: '14.0"',
      weight: "9.2 lbs",
    },
    chassis: "Hand-finished reclaimed walnut woodgrain enclosure with dual brass rotary dials",
    lighting: "Integrated 4500K full-spectrum ambient LED bar with automatic 8-hour sunrise timer",
    floraIncluded: [
      "Ficus Pumila (Creeping Fig)",
      "Leucobryum Glaucum (Cushion Moss)",
      "Nephrolepis Cordifolia (Lemon Button Fern)",
      "Java Moss on bogwood branches",
    ],
    substrateLayers: [
      "Volcanic lava rock drainage layer",
      "Activated coconut charcoal filtration",
      "Sphagnum moss moisture barrier",
      "Bioactive organic tropical peat & worm casting mix",
    ],
    careDifficulty: "Beginner (Self-Sustaining)",
    description:
      "Our flagship centerpiece. Salvaged from 1970s wood-paneled living room sets, each TV enclosure is meticulously restored, waterproofed with marine-grade silicone, and planted with hardy tropical mosses that circulate their own rainfall inside the curved display glass.",
    accentColor: "#22c55e",
    themeStyle: "woodgrain",
    features: [
      "Fully planted & sealed closed-loop ecosystem",
      "Only requires misting once every 3 to 6 months",
      "Brass antenna grow light compatible",
      "Custom engraved brass dedication placard included",
    ],
  },
  {
    id: "the-80s-portable",
    name: "The 1984 Space Portable",
    channel: "CH 03",
    tagline: "Space-age cream portable CRT with vivid fittonia and neon moss accents.",
    price: 189,
    originalPrice: 215,
    era: "1984 Sony/Panasonic Style",
    rating: 4.8,
    reviewCount: 98,
    stockLeft: 11,
    badge: "Retro Classic",
    dimensions: {
      width: '13.0"',
      height: '11.8"',
      depth: '12.2"',
      weight: "5.4 lbs",
    },
    chassis: "Original retro off-white polymer body with integrated molded top handle",
    lighting: "Dual-mode LED (Daylight Grow & Nighttime Cyber-Phosphor Amber/Green)",
    floraIncluded: [
      "Fittonia Albivenis (Pink Vein Nerve Plant)",
      "Dicranum Scoparium (Mood Moss)",
      "Pilea Glauca (Aquamarine Silver Sprinkles)",
      "Miniature Petrified Slate Stones",
    ],
    substrateLayers: [
      "Pumice pebble drainage foundation",
      "Horticultural charcoal barrier",
      "Nutrient-enriched bioactive terrarium blend",
    ],
    careDifficulty: "Beginner (Self-Sustaining)",
    description:
      "The icon of 80s bedroom pop culture, now living on as a tabletop jungle. Perfect for study desks, nightstands, and creative studios. Features a built-in top carrying handle and easy USB-C power input.",
    accentColor: "#ec4899",
    themeStyle: "retro-plastic",
    features: [
      "Convenient USB-C powered lighting (works with standard phone chargers/power banks)",
      "Phosphor night-light mode with ambient dial",
      "Anti-condensation airflow vent ring",
      "100% shatter-resistant reinforced curved acrylic face",
    ],
  },
  {
    id: "the-micro-monitor",
    name: "The Micro-Channel 9\"",
    channel: "CH 04",
    tagline: "Ultra-compact bedside broadcast with miniature Japanese ball moss & white quartz.",
    price: 129,
    originalPrice: 149,
    era: "Late 80s Studio CCTV Monitor",
    rating: 5.0,
    reviewCount: 67,
    stockLeft: 4,
    badge: "Limited Edition",
    dimensions: {
      width: '9.5"',
      height: '8.8"',
      depth: '9.0"',
      weight: "3.1 lbs",
    },
    chassis: "Industrial matte charcoal chassis with vintage red record LED and push buttons",
    lighting: "Ultra-efficient 3W micro LED with touch dimmer on rear volume dial",
    floraIncluded: [
      "Taxiphyllum Barbieri (Flame Moss)",
      "Selaginella Kraussiana (Golden Club Moss)",
      "Miniature White Quartz Crystals",
    ],
    substrateLayers: [
      "Micro-expanded clay pebbles",
      "Active carbon granules",
      "Nano-biome mineral soil mix",
    ],
    careDifficulty: "Beginner (Self-Sustaining)",
    description:
      "A tribute to vintage television broadcast control rooms. This 9-inch monitor packs a serene Japanese moss garden into a space small enough for any bookshelf, home office, or bedside table.",
    accentColor: "#38bdf8",
    themeStyle: "minimal-silver",
    features: [
      "Compact footprint fits anywhere",
      "Touch-sensitive rotary on/off switch",
      "Ultra-low power draw (< 3 Watts)",
      "Includes miniature watering pipette & maintenance tweezers",
    ],
  },
  {
    id: "the-diy-broadcast-kit",
    name: "The DIY Broadcast Kit",
    channel: "CH 05",
    tagline: "Build your own TV terrarium! Everything you need, from cured chassis to live spores.",
    price: 139,
    originalPrice: 160,
    era: "Universal Vintage Shell",
    rating: 4.9,
    reviewCount: 114,
    stockLeft: 18,
    badge: "Maker Favorite",
    dimensions: {
      width: '14.0"',
      height: '12.0"',
      depth: '12.0"',
      weight: "6.0 lbs (Full Kit)",
    },
    chassis: "Pre-gutted, safe non-hazardous vintage television case with waterproof internal basin",
    lighting: "Self-adhesive magnetic USB grow LED bar with 3 brightness modes",
    floraIncluded: [
      "Living Live Sheet Moss roll (8x8 inches)",
      "Potted Pteris Fern starter",
      "Fittonia Red Vein cutting",
      "Living Spore blend inoculant jar",
    ],
    substrateLayers: [
      "Drainage volcanic rocks (labeled Bag A)",
      "Activated bamboo charcoal (labeled Bag B)",
      "Sphagnum moss separator (labeled Bag C)",
      "Custom Terrarium Tropical Soil (labeled Bag D)",
    ],
    careDifficulty: "Hands-On DIY",
    description:
      "For plant lovers and tinkers who want the joy of landscaping their own retro television. We safely gut and de-charge the high voltage electronics, line the basin with an impervious watertight shell, and ship it with all pre-portioned substrates, live plants, and an illustrated 24-page vintage 'TV Owner Guide' manual.",
    accentColor: "#f59e0b",
    themeStyle: "vintage-chassis",
    features: [
      "Completely de-energized & 100% safe to build with family",
      "Step-by-step retro illustrated field manual",
      "Includes planting tools, misting bottle & miniature vintage figures",
      "Live plant guarantee — if any flora fails within 30 days, we replace it free",
    ],
  },
];

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string;
}

export const ADD_ONS: AddOnOption[] = [
  {
    id: "antenna-lamp",
    name: "Telescoping Rabbit-Ear Grow Lamp",
    price: 35,
    description: "Vintage brass rabbit-ear antenna that extends and features dimmable warm grow LEDs.",
    iconName: "Radio",
  },
  {
    id: "engraved-plaque",
    name: "Custom Engraved Brass Channel Plaque",
    price: 20,
    description: "A personalized brass placard riveted to the faceplate (e.g. 'CH 04 • The Smith Biosphere').",
    iconName: "Sparkles",
  },
  {
    id: "micro-mister",
    name: "Internal Ultrasonic Rain Module",
    price: 45,
    description: "Built-in hidden ultrasonic mister with magnetic refill cap for periodic automated mist.",
    iconName: "Droplets",
  },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    author: "Elena R.",
    location: "Portland, OR",
    rating: 5,
    model: "The 1974 Console",
    quote: "My TV Terrarium arrived during a cold snap and the insulated heat pack kept the moss completely vibrant and humid. It’s now the most talked-about piece in our living room. Truly mesmerizing to watch the tiny droplets condense and rain back down!",
    date: "Verified Broadcast Viewer • 2 weeks ago",
  },
  {
    id: "t2",
    author: "Marcus K.",
    location: "Austin, TX",
    rating: 5,
    model: "The 1984 Space Portable",
    quote: "I keep the 80s portable on my home office desk. The amber night-light mode creates such an incredible ambiance when I'm working late. Zero maintenance—I haven't watered it in two months and it's flourishing.",
    date: "Verified Broadcast Viewer • 1 month ago",
  },
  {
    id: "t3",
    author: "Sarah & David L.",
    location: "Brooklyn, NY",
    rating: 5,
    model: "The DIY Broadcast Kit",
    quote: "Building the terrarium using the vintage-style instruction manual was the most fun weekend project we've done in years. The plants were fresh, healthy, and the restored TV casing is top tier.",
    date: "Verified Broadcast Viewer • 3 weeks ago",
  },
];

export const FAQS = [
  {
    question: "How do live plants survive shipping directly to my doorstep?",
    answer:
      "We take live transit extremely seriously. Every TV Terrarium is custom-suspended in custom-molded high-density biodegradable foam inside a heavy-duty reinforced box. Depending on your local forecast, we include 72-hour thermal heat packs or cool packs at no extra charge. We back every order with our 100% Live Plant Arrival Guarantee: if your terrarium arrives with any distress, we replace it or fix it free of charge, immediately.",
  },
  {
    question: "Do I actually need to water it? How does it survive?",
    answer:
      "TV Terrariums are sealed closed-loop ecosystems! The moisture inside evaporates from the soil and transpires from the plant leaves, condenses onto the cool curved glass of the TV screen, and drips back down into the moss layer like natural rainfall. You only need to lightly mist with distilled water once every 3 to 6 months.",
  },
  {
    question: "How does the lighting work?",
    answer:
      "Each model is equipped with a concealed, energy-efficient full-spectrum LED grow light specifically calibrated for moss and fern photosynthesis (4500K - 5000K). Most models connect via a discreet USB-C cord or standard plug. You can also leave it on an automatic 8-hour day/night cycle or plug it into your smart home plug.",
  },
  {
    question: "Where do you source the vintage televisions?",
    answer:
      "We partner with electronics recyclers, vintage collectors, and estate restorers across the country to rescue forgotten non-functional televisions from landfills. Every tube is professionally and safely discharged, hazardous materials are responsibly recycled, and the outer chassis is cleaned, waterproofed, and reborn as art.",
  },
  {
    question: "Can I customize the channel plate or casing?",
    answer:
      "Yes! You can choose custom wood finishes or add our Custom Engraved Brass Channel Plaque at checkout to personalize the channel number and name (popular for anniversary gifts, housewarmings, or birthdays).",
  },
];
