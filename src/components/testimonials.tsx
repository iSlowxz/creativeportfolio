"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { RevealSubheading } from "@/components/reveal-title";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Mark translated messy product ideas into screens that feel precise, calm, and clear from first glance.",
    name: "Arielle Santos",
    role: "Product Lead, Early-stage SaaS",
  },
  {
    quote:
      "The identity system he built gave our launch visual discipline without losing warmth or personality.",
    name: "Paolo Rivera",
    role: "Co-founder, Kape & Co.",
  },
  {
    quote:
      "From campaign layouts to social posts, everything felt cohesive, intentional, and easy for our team to scale.",
    name: "Mika Dela Cruz",
    role: "Marketing Manager, Lifestyle Brand",
  },
];

export function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const itemsA = [...testimonials, ...testimonials];
  const rotated = [...testimonials.slice(1), testimonials[0]];
  const itemsB = [...rotated, ...rotated];
  const columns = isMobile ? [testimonials] : [itemsA, itemsB];

  return (
    <section id="testimonials" className="relative px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 border-t hairline pt-6">
          <RevealSubheading>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)]">
              Client Notes
            </h2>
          </RevealSubheading>
        </div>

        <div className="grid grid-cols-1 border hairline bg-[color-mix(in_srgb,var(--background)_72%,transparent)] backdrop-blur-md md:grid-cols-2">
          {columns.map((columnItems, columnIdx) => (
            <div
              key={columnIdx}
              className={`relative h-[320px] overflow-y-auto overflow-x-hidden md:h-[340px] md:overflow-hidden ${
                columnIdx === 1 ? "md:border-l hairline" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-8% 0px" }}
                transition={{ duration: 0.34, delay: columnIdx * 0.05 }}
              >
                <ul
                  className={`flex h-max flex-col items-stretch ${
                    columnIdx === 0
                      ? "md:animate-[testimonial-marquee-vertical_26s_linear_infinite] md:hover:[animation-play-state:paused]"
                      : "md:animate-[testimonial-marquee-vertical_30s_linear_infinite_reverse] md:hover:[animation-play-state:paused]"
                  }`}
                >
                  {columnItems.map((item, index) => (
                    <li
                      key={`${columnIdx}-${item.name}-${index}`}
                      className="shrink-0 border-b hairline px-4 py-4 transition-[background-color,opacity] duration-300 hover:bg-[color-mix(in_srgb,var(--tone-a)_12%,transparent)] hover:opacity-100 md:px-5 md:py-5"
                    >
                      <p
                        data-no-scramble="true"
                        className="text-[clamp(0.98rem,1.2vw,1.2rem)] leading-[1.35] tracking-[-0.01em]"
                      >
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <div className="mt-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]">
                          {item.name}
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ash)]">
                          {item.role}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[var(--background)] to-transparent md:hidden" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[var(--background)] to-transparent md:hidden" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
