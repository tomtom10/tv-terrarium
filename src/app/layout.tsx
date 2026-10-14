import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TV Terrarium | Tune In & Watch The Grass Grow",
  description:
    "Upcycled vintage televisions reimagined as living miniature biospheres. Tune into TV Terrarium and watch the grass grow! Shipped safely directly to your door.",
  keywords: [
    "TV Terrarium",
    "vintage TV terrarium",
    "moss terrarium",
    "living art",
    "indoor plants",
    "retro decor",
  ],
  openGraph: {
    title: "TV Terrarium | Tune In & Watch The Grass Grow",
    description:
      "Handcrafted living biospheres inside vintage television sets. Shipped safely with our Live Plant Arrival Guarantee.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-[#0c0d0c] text-[#f2f4f2] selection:bg-[#4ade80] selection:text-black"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
