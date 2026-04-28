"use client";

import { motion } from "motion/react";
import { createElement, type ReactElement } from "react";

type AllowedTag = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: AllowedTag;
  delay?: number;
  stagger?: number;
  by?: "word" | "char";
  once?: boolean;
}

/**
 * SplitText — reveals each word (or character) with a slight overshoot,
 * staggered. Triggers when in view.
 */
export function SplitText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.02,
  by = "char",
  once: _once = true,
}: SplitTextProps): ReactElement {
  void _once;
  const inView = true;

  const tokens =
    by === "word" ? text.split(/(\s+)/) : text.split("");

  const children = tokens.map((tok, i) =>
    tok.match(/^\s+$/) ? (
      <span key={i}>{tok}</span>
    ) : (
      <span
        key={i}
        aria-hidden
        className="inline-block overflow-hidden align-baseline"
        style={{
          paddingTop: "0.12em",
          paddingBottom: "0.18em",
          marginTop: "-0.12em",
          marginBottom: "-0.18em",
        }}
      >
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={inView ? { y: "0%" } : { y: "110%" }}
          transition={{
            duration: 1.05,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * stagger,
          }}
        >
          {tok}
        </motion.span>
      </span>
    ),
  );

  return createElement(
    as,
    { className, "aria-label": text },
    children,
  );
}
