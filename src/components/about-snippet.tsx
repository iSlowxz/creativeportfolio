"use client";

import { motion } from "motion/react";

/**
 * AboutSnippet — compact profile card for the hero section.
 * Includes a photo slot + short bio summary.
 *
 * To use your real photo, place an image at:
 *   /public/mark-profile.jpg
 * then replace the placeholder block with an <img>.
 */
export function AboutSnippet() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="border hairline bg-[var(--paper)] p-4 md:p-5"
    >
      <div className="grid grid-cols-[86px_1fr] gap-4 md:grid-cols-[98px_1fr]">
        {/* Photo placeholder */}
        <div className="relative aspect-[4/5] overflow-hidden border hairline bg-[var(--background)]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 20% 15%, color-mix(in srgb, var(--vermilion) 22%, transparent), transparent 52%), radial-gradient(110% 110% at 85% 90%, color-mix(in srgb, var(--tone-a) 25%, transparent), transparent 56%)",
            }}
          />
          <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
            MAC
          </span>
        </div>

        {/* Bio */}
        <div className="flex flex-col justify-between gap-3">
          <p className="font-serif text-[clamp(1rem,1.5vw,1.2rem)] leading-snug">
            Mark Angelo Cornejo — a multidisciplinary designer working across
            brand identity, UI/UX, social, and editorial layout.{" "}
            <span className="text-[var(--ash)]">
              BS Computer Science, Class of 2026 — open for collaborations from
              the Philippines.
            </span>
          </p>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
            Manila · Available for freelance
          </div>
        </div>
      </div>
    </motion.article>
  );
}

