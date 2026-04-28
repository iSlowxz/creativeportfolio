"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

type Variant = "default" | "hover";

/**
 * Cursor — minimal, modern, lag-free.
 *
 * Single small dot that follows the pointer with no spring (instant).
 * Uses blend inversion so it reacts to underlying colors in both light/dark.
 *
 * Keeps performance stable by avoiding lagging rings and per-pixel React
 * state updates:
 *   1. Writing pointer position straight to MotionValues (no React re-render)
 *   2. Only updating variant on `mouseover` / `mouseout` (i.e. element changes)
 *   3. Using `var(--foreground)` so the dot auto-flips with paper/ink mode
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const [variant, setVariant] = useState<Variant>("default");
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-cursor");
      return;
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const findCursorEl = (el: EventTarget | null) =>
      (el as HTMLElement | null)?.closest?.<HTMLElement>("[data-cursor]") ?? null;

    const onOver = (e: MouseEvent) => {
      const node = findCursorEl(e.target);
      if (!node) return;
      setVariant("hover");
    };

    const onOut = (e: MouseEvent) => {
      // If we're moving to another interactive element, let `over` set it.
      if (findCursorEl(e.relatedTarget)) return;
      setVariant("default");
    };

    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = 8;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
        willChange: "transform, width, height, background-color, opacity",
      }}
      animate={{
        width: size,
        height: size,
        scale: variant === "hover" ? 1.15 : 1,
        opacity: variant === "hover" ? 0.95 : 0.85,
        backgroundColor: "#ffffff",
      }}
      transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
