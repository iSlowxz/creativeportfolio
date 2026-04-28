"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/split-text";

interface Stat {
  display: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 5, label: "Disciplines", display: "count" },
  { value: 4, label: "Core tools", display: "count" },
  { display: "static", label: "BSCS — Class of '26" },
];

function Counter({
  to,
  prefix,
  suffix,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix ? (
        <span className="text-[0.5em] align-super ml-0.5">{suffix}</span>
      ) : null}
    </span>
  );
}

export function Studio() {
  const milestones = [
    ["2022", "Began BS Computer Science studies in the Philippines."],
    ["2023", "First independent design work — posters, social, layout."],
    ["2024", "Expanded into brand identity systems and full social kits."],
    ["2025", "Cross-discipline projects across UI/UX, brand, and editorial."],
    ["2026", "Graduating BSCS — currently open for collaborations."],
  ];

  return (
    <section id="studio" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-12">
        <h2 className="col-span-12 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)] border-t hairline pt-6">
          §&nbsp;Studio
        </h2>

        {/* big editorial paragraph */}
        <div className="col-span-12 md:col-span-8">
          <SplitText
            as="p"
            text="A multidisciplinary practice working across brand systems, UI/UX, social, and editorial layout. I'm a Computer Science student who designs — interested in the seam between a brand and the screen it lives on, and the page that holds them both."
            className="font-serif text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.15] tracking-[-0.005em]"
            stagger={0.008}
            by="char"
          />
        </div>

        {/* sidebar — counters / facts */}
        <div className="col-span-12 grid grid-cols-3 gap-6 md:col-span-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t hairline pt-4">
              <div className="font-serif text-5xl leading-none md:text-6xl">
                {s.display === "count" && s.value !== undefined ? (
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                ) : (
                  <span className="italic">'26</span>
                )}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* milestones */}
        <div className="col-span-12 mt-10">
          <div className="grid grid-cols-12 border-t hairline pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
            <span className="col-span-2 md:col-span-1">Year</span>
            <span className="col-span-10 md:col-span-11">Index</span>
          </div>
          <ul>
            {milestones.map(([year, copy], i) => (
              <motion.li
                key={year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-12 border-b hairline py-5"
              >
                <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)] md:col-span-1">
                  {year}
                </span>
                <span className="col-span-10 font-serif text-xl md:col-span-11 md:text-2xl">
                  {copy}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
