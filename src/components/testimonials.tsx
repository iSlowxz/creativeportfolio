"use client";

import { motion } from "motion/react";
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
  const itemsA = [...testimonials, ...testimonials];
  const rotated = [...testimonials.slice(1), testimonials[0]];
  const itemsB = [...rotated, ...rotated];

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
          {[itemsA, itemsB].map((columnItems, columnIdx) => (
            <div
              key={columnIdx}
              className={`h-[320px] overflow-hidden md:h-[340px] ${
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
                  className={`flex h-max flex-col items-stretch hover:[animation-play-state:paused] ${
                    columnIdx === 0
                      ? "animate-[testimonial-marquee-vertical_26s_linear_infinite]"
                      : "animate-[testimonial-marquee-vertical_30s_linear_infinite_reverse]"
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
                        "{item.quote}"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
