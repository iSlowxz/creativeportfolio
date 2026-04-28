"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none) and (pointer: coarse)");
    const apply = () => setIsTouchDevice(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <motion.div
      initial={isTouchDevice ? false : { opacity: 0, y: 12 }}
      whileInView={isTouchDevice ? undefined : { opacity: 1, y: 0 }}
      viewport={isTouchDevice ? undefined : { once: false, amount: 0.24 }}
      transition={{ duration: 0.36, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
