"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type HoverPerspectiveProps = {
  children: ReactNode;
  className?: string;
  tilt?: number;
  lift?: number;
};

export function HoverPerspective({
  children,
  className = "",
  tilt = 8,
  lift = 4,
}: HoverPerspectiveProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * tilt);
    rotateX.set((0.5 - py) * tilt);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        whileHover={{ y: -lift }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
