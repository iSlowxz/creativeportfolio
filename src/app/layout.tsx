import type { Metadata } from "next";
import {
  Fraunces,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Cursor } from "@/components/cursor";
import { IntroOverlay } from "@/components/intro-overlay";
import { ScrambleProvider } from "@/components/scramble-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Variable font for the marquee bands.
// Axes loaded: weight (default), optical-size, SOFT.
// Lets the marquee phrases smoothly interpolate weight + sharpness on hover.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mark Angelo Cornejo — Multidisciplinary Designer",
  description:
    "Selected works across brand identity, UI/UX, social, and editorial layout. BS Computer Science, Class of 2026 — based in the Philippines, working everywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`has-cursor ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">
        <Script
          id="theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "try{var m=localStorage.getItem('mode');if(m==='dark'){document.documentElement.classList.add('invert-mode')}else if(m==='light'){document.documentElement.classList.remove('invert-mode')}}catch(e){}",
          }}
        />
        <ScrambleProvider />
        <Cursor />
        <IntroOverlay />
        {children}
      </body>
    </html>
  );
}
