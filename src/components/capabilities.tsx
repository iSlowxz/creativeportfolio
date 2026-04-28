"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface Discipline {
  index: string;
  title: string;
  blurb: string;
}

const disciplines: Discipline[] = [
  {
    index: "D / 01",
    title: "UI / UX Design",
    blurb: "Mobile and web interfaces — wireframes, prototypes, design systems.",
  },
  {
    index: "D / 02",
    title: "Brand Identity",
    blurb: "Marks, logotypes, color, type, and the voice between.",
  },
  {
    index: "D / 03",
    title: "Social Media",
    blurb: "Templates, kits, and a brand on weekly rotation.",
  },
  {
    index: "D / 04",
    title: "Editorial Layout",
    blurb: "Spreads, decks, books — the slow architecture of long-form.",
  },
  {
    index: "D / 05",
    title: "Graphic Design",
    blurb: "Posters, prints, one-off pieces. Type-led, image-aware.",
  },
];

interface Tool {
  index: string;
  name: string;
  detail: string;
  short: string;
}

const tools: Tool[] = [
  {
    index: "T / 01",
    name: "Adobe Suite",
    short: "Ai · Ps · Id",
    detail: "Illustrator, Photoshop, InDesign — print, image, and layout.",
  },
  {
    index: "T / 02",
    name: "Figma",
    short: "UI · Systems",
    detail: "Interface design, prototyping, and component systems.",
  },
  {
    index: "T / 03",
    name: "Framer",
    short: "Web · Motion",
    detail: "Web design and shipping animated, responsive sites.",
  },
  {
    index: "T / 04",
    name: "Canva",
    short: "Quick · Decks",
    detail: "Fast turnarounds, decks, and template-driven socials.",
  },
];

export function Capabilities() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section
      id="capabilities"
      className="relative px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* header */}
        <div className="flex items-end justify-between border-t hairline pt-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)]">
            §&nbsp;Capabilities
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)]">
            {String(disciplines.length).padStart(2, "0")} disciplines · {tools.length} tools
          </span>
        </div>

        {/* expertise list */}
        <ul className="mt-12">
          {disciplines.map((d, i) => (
            <motion.li
              key={d.title}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                delay: i * 0.05,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group grid grid-cols-12 items-baseline gap-x-4 border-b hairline py-6 md:py-7"
              data-cursor="link"
            >
              <span className="col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)] md:col-span-2">
                {d.index}
              </span>
              <motion.span
                className="col-span-9 font-serif text-[clamp(1.6rem,4.5vw,3.5rem)] leading-none italic md:col-span-5"
                initial={false}
                animate={{
                  x: hover === i ? 14 : 0,
                  color:
                    hover === i ? "var(--vermilion)" : "var(--foreground)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                {d.title}
              </motion.span>
              <span className="col-span-12 mt-3 font-serif text-base leading-snug text-[var(--ash)] md:col-span-5 md:mt-0 md:text-lg">
                {d.blurb}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* toolkit subhead */}
        <div className="mt-20 flex items-end justify-between border-t hairline pt-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)]">
            §&nbsp;Toolkit
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)]">
            Daily drivers
          </span>
        </div>

        {/* toolkit grid — Pantone-style cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                delay: i * 0.06,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              data-cursor="link"
              className="relative flex aspect-[3/4] flex-col justify-between border hairline bg-[var(--paper)] p-4 md:p-5"
            >
              <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                <span>{t.index}</span>
                <span>{t.short}</span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[0.95] italic">
                  {t.name}
                </div>
                <span aria-hidden className="block h-px w-10 bg-[var(--foreground)]" />
                <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[var(--ash)]">
                  {t.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
