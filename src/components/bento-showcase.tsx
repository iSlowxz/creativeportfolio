"use client";

import { motion } from "motion/react";

interface Tile {
  title: string;
  type: string;
  meta: string;
  className: string;
}

const tiles: Tile[] = [
  {
    title: "Pulse UI Kit",
    type: "UI / UX",
    meta: "44 Screens · iOS",
    className: "col-span-12 md:col-span-7 md:row-span-2",
  },
  {
    title: "Kape Brand Deck",
    type: "Branding",
    meta: "Logo · Color · Voice",
    className: "col-span-12 md:col-span-5",
  },
  {
    title: "Daily Hum Campaign",
    type: "Social Media",
    meta: "24 Assets · 2 Weeks",
    className: "col-span-12 md:col-span-5",
  },
  {
    title: "Atlas Report Spread",
    type: "Layout",
    meta: "96 Pages · Print",
    className: "col-span-12 md:col-span-4",
  },
  {
    title: "Type Forum Poster",
    type: "Graphic Design",
    meta: "A1 · Two Ink",
    className: "col-span-12 md:col-span-4",
  },
  {
    title: "Rolio Framer Build",
    type: "Web / Framer",
    meta: "Responsive · Motion",
    className: "col-span-12 md:col-span-4",
  },
];

export function BentoShowcase() {
  return (
    <section className="relative px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-end justify-between border-t hairline pt-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)]">
            §&nbsp;Bento Showcase
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)]">
            Snapshot grid
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 md:auto-rows-[170px] md:gap-6">
          {tiles.map((tile, i) => (
            <motion.article
              key={tile.title}
              data-cursor="view"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`${tile.className} group relative overflow-hidden border hairline bg-[var(--paper)] p-5 md:p-6`}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(120% 120% at 0% 0%, color-mix(in srgb, var(--vermilion) 14%, transparent), transparent 55%)",
                }}
              />
              <div className="relative flex h-full flex-col justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-serif text-[clamp(1.4rem,3.2vw,2.8rem)] italic leading-[0.95]">
                    {tile.title}
                  </h3>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                    {tile.type} · {tile.meta}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
