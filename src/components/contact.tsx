"use client";

import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/split-text";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6">
        <h2 className="col-span-12 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)] border-t hairline pt-6">
          §&nbsp;Get in touch
        </h2>

        <div className="col-span-12 mt-10">
          <SplitText
            as="p"
            text="Got a brief,"
            by="char"
            stagger={0.028}
            delay={0}
            className="block text-[clamp(2rem,11vw,9rem)] leading-[0.94] tracking-[-0.02em]"
          />
          <SplitText
            as="p"
            text="a brand, an app?"
            by="char"
            stagger={0.028}
            delay={0.18}
            className="block text-[clamp(2rem,11vw,9rem)] leading-[0.94] tracking-[-0.02em]"
          />
        </div>

        <div className="col-span-12 mt-10 flex flex-col items-start gap-6 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-8">
          <a
            href="mailto:hello@markcornejo.design"
            data-cursor="Send"
            data-no-scramble="true"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-[var(--foreground)] px-5 py-3.5 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] sm:w-auto sm:px-7 sm:py-4"
          >
            <span className="text-lg tracking-[-0.01em] sm:text-xl md:text-2xl">
              hello@markcornejo.design
            </span>
            <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
          </a>

          <ul className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)] md:items-end">
            <li>
              <a
                href="https://instagram.com"
                data-cursor="link"
                className="link-standard inline-flex items-center gap-1.5"
              >
                <span>Instagram</span>
                <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com"
                data-cursor="link"
                className="link-standard inline-flex items-center gap-1.5"
              >
                <span>Dribbble</span>
                <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
              </a>
            </li>
            <li>
              <a
                href="https://behance.net"
                data-cursor="link"
                className="link-standard inline-flex items-center gap-1.5"
              >
                <span>Behance</span>
                <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                data-cursor="link"
                className="link-standard inline-flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <ArrowUpRight aria-hidden size={12} strokeWidth={1.75} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
