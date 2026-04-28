"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export function HydrationFade({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{
        opacity: hydrated ? 1 : 0,
        transition: "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: hydrated ? "auto" : "none",
      }}
      aria-busy={!hydrated}
    >
      {children}
    </div>
  );
}
