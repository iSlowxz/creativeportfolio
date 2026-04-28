"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const HOLD_MS = 1500;
const EXIT_MS = 950;

/**
 * IntroOverlay
 *
 * Page-load preloader. A palette-aware panel with the wordmark settles in,
 * holds briefly, then lifts to reveal the page underneath while the
 * name slides up & fades. Plays on refresh/navigation load and bows
 * out for users who prefer reduced motion.
 *
 * Notes:
 * - SSR-safe: renders the overlay on the first paint so first-time
 *   visitors never see a flash of the page beneath. On revisits, it
 *   instantly hides on mount.
 * - Locks scroll while playing.
 */
export function IntroOverlay() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (reduceMotion) {
      setVisible(false);
      return;
    }

    document.documentElement.classList.add("intro-locked");

    const t = window.setTimeout(() => setVisible(false), HOLD_MS);
    return () => {
      window.clearTimeout(t);
    };
  }, [reduceMotion]);

  // Release the scroll lock once the exit transition is done.
  useEffect(() => {
    if (visible) return;
    const t = window.setTimeout(() => {
      document.documentElement.classList.remove("intro-locked");
    }, EXIT_MS + 40);
    return () => window.clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-overlay"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[80] flex items-end bg-[var(--foreground)]"
          aria-hidden="true"
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.12,
            }}
            className="relative w-full px-4 pb-10 text-[var(--background)] md:px-10 md:pb-12"
          >
            <p className="text-[clamp(1.6rem,5.6vw,3.4rem)] leading-[1.04] tracking-[-0.012em]">
              Mark Angelo Cornejo
            </p>
            <p className="text-[clamp(1.6rem,5.6vw,3.4rem)] leading-[1.04] tracking-[-0.012em]">
              <span aria-hidden>—</span>Designer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="pointer-events-none absolute right-4 bottom-10 font-mono text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--background)_56%,transparent)] md:right-10 md:bottom-12"
          >
            Portfolio · 2026
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.05,
            }}
            style={{ transformOrigin: "left center" }}
            className="pointer-events-none absolute inset-x-4 top-6 h-px bg-[color-mix(in_srgb,var(--background)_32%,transparent)] md:inset-x-10 md:top-8"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
