"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { createPortal } from "react-dom";

/**
 * GridOverlay — 12-column reference grid for layout work.
 * Each column slides down (scaleY 0 → 1) with a stagger,
 * collapses upward on exit. Rendered through a portal so it
 * always covers the viewport, even when its parent is transformed.
 */
export function GridOverlay({ visible }: { visible: boolean }) {
  const columns = useMemo(() => Array.from({ length: 12 }), []);
  if (typeof document === "undefined") return null;

  const overlay = (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 px-6 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto h-full max-w-[1400px]">
        <div className="grid h-full grid-cols-12 gap-x-6">
          {columns.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
              transition={{
                duration: 0.55,
                delay: visible ? i * 0.025 : (columns.length - 1 - i) * 0.02,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: "top",
                background: "var(--grid-fill)",
                borderLeft: "1px solid var(--grid-line)",
                borderRight: "1px solid var(--grid-line)",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );

  return createPortal(overlay, document.body);
}
