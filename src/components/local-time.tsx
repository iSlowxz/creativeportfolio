"use client";

import { useEffect, useState } from "react";

/**
 * LocalTime — live clock for the studio, in the studio's TZ.
 * Manila = Asia/Manila. Updates every second client-side.
 */
export function LocalTime({ tz = "Asia/Manila" }: { tz?: string }) {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [tz]);

  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] tabular-nums">
      {now || "—"}
    </span>
  );
}
