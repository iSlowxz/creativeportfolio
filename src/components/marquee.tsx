"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Marquee — a single horizontal band with two duplicated tracks for
 * seamless infinite scrolling. Pauses on hover (see globals.css).
 */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className={cn("marquee relative overflow-hidden", className)}>
      <div className="marquee-track flex w-max items-center gap-12 will-change-transform">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MarqueeDot() {
  return (
    <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-current opacity-60" />
  );
}
