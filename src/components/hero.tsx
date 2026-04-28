"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { LocalTime } from "@/components/local-time";

/**
 * Hero — Swiss/minimal intro.
 * Adapted to a works-first portfolio rhythm.
 */
export function Hero() {
  type HeroChunk = { text: string; accent?: boolean };
  type SlideDirection = -1 | 1;

  const audienceCards = [
    {
      label: "For anyone",
      lines: [
        [{ text: "Hello there, I'm a" }],
        [{ text: "designer who cares" }],
        [{ text: "about making " }, { text: "beautiful", accent: true }],
        [{ text: "things that help people." }],
      ],
    },
    {
      label: "Recruiters",
      lines: [
        [{ text: "I'm a " }, { text: "multidisciplinary", accent: true }],
        [{ text: "designer focused on" }],
        [{ text: "clear systems, visual" }],
        [{ text: "rhythm, and real outcomes." }],
      ],
    },
    {
      label: "Engineers",
      lines: [
        [{ text: "I’m " }, { text: "{highly_technical}", accent: true }],
        [{ text: "and while (I'm ≠ engineer)" }],
        [{ text: "I build with " }, { text: "(dev_flow)", accent: true }, { text: " in mind;" }],
        [{ text: "my UI/UX is " }, { text: "[structured]", accent: true }, { text: " && " }, { text: "[handoff_ready]", accent: true }],
        [{ text: "I built (this.site) from scratch + (this.one) && (this.too)" }],
      ],
    },
  ] satisfies Array<{ label: string; lines: HeroChunk[][] }>;

  const [activeAudience, setActiveAudience] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.93, 0.82]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const metaOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.82]);

  const onAudienceChange = (nextIndex: number) => {
    if (nextIndex === activeAudience) return;
    setSlideDirection(nextIndex > activeAudience ? 1 : -1);
    setActiveAudience(nextIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[84svh] items-center px-4 pb-4 pt-24 md:min-h-[86svh] md:px-10 md:pb-6 md:pt-28"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
        <ul className="col-span-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em]">
          {audienceCards.map((item, idx) => (
            <li
              key={item.label}
            >
              <button
                type="button"
                aria-pressed={idx === activeAudience}
                onClick={() => onAudienceChange(idx)}
                className={`transition-colors duration-200 ${
                  idx === activeAudience ? "text-[var(--foreground)]" : "text-[var(--ash)] hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <AnimatePresence mode="wait">
          <motion.h1
            key={audienceCards[activeAudience].label}
            initial={{
              opacity: 0,
              x: slideDirection * 40,
              filter: "blur(0px)",
            }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              x: slideDirection * -40,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
            className="col-span-12 max-w-[18ch] text-[clamp(2rem,8.9vw,7.9rem)] leading-[0.95] tracking-[-0.02em] md:max-w-[22ch]"
          >
            {audienceCards[activeAudience].lines.map((line, lineIndex) => (
              <span key={`${audienceCards[activeAudience].label}-${lineIndex}`} className="block">
                {line.map((chunk) =>
                  chunk.accent ? (
                    <span key={chunk.text} className="font-serif italic serif-accent-hover">
                      {chunk.text}
                    </span>
                  ) : (
                    <span key={chunk.text}>{chunk.text}</span>
                  ),
                )}
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ y: metaY, opacity: metaOpacity }}
          className="col-span-12 grid grid-cols-12 gap-y-4 border-t hairline pt-5 md:gap-y-3 md:pt-6"
        >
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ash)] md:col-span-9 md:pr-6">
            Mark Angelo Cornejo — UI/UX, social media, layout, graphic design,
            and branding.
          </p>
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)] md:col-span-3 md:text-right">
            Scroll to enter works ↓
          </p>
          <div className="col-span-12 grid grid-cols-2 gap-y-1.5 border-t hairline pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ash)]/90 md:grid-cols-4 md:gap-x-4 md:gap-y-0">
            <p>Open for freelance</p>
            <p className="md:text-center">Manila / Remote</p>
            <p className="md:text-center">Replies within 24-48h</p>
            <p className="text-right">
              Manila time <LocalTime />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
