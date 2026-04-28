"use client";

import { useRef, useState } from "react";

export function ScrambleText({
  text,
  durationMs = 420,
}: {
  text: string;
  durationMs?: number;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const stop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const run = () => {
    stop();
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const reveal = Math.floor(t * text.length);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (!/[A-Za-z0-9]/.test(ch)) return ch;
          if (i < reveal) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplay(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else {
        setDisplay(text);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <span onMouseEnter={run} onFocus={run}>
      {display}
    </span>
  );
}

