"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Toolbar } from "@/components/toolbar";

/**
 * Nav — fixed top, ultra-minimal.
 */
export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links: Array<[string, string]> = [
    ["Works", "/#works"],
    ["About", "/about"],
    ["Contact", "mailto:hello@markcornejo.design"],
  ];

  const isActive = (href: string) => {
    if (href.startsWith("mailto:")) return false;
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 80) setHidden(true);
    else setHidden(false);
    setScrolled(latest > 8);
  });

  const LogoName = () => {
    const full = "MARK ANGELO CORNEJO";
    const compact = "M";
    const [chars, setChars] = useState(full.split(""));
    const rafMapRef = useRef<Map<number, number>>(new Map());
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const stop = (index: number) => {
      const id = rafMapRef.current.get(index);
      if (id !== undefined) {
        cancelAnimationFrame(id);
        rafMapRef.current.delete(index);
      }
    };

    const run = (index: number) => {
      const original = full[index];
      if (original === " ") return;
      stop(index);

      const start = performance.now();
      const duration = 220;

      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const nextChar =
          p > 0.65
            ? original
            : CHARS[Math.floor(Math.random() * CHARS.length)];
        setChars((prev) => {
          const copy = [...prev];
          copy[index] = nextChar;
          return copy;
        });
        if (p < 1) {
          const id = requestAnimationFrame(tick);
          rafMapRef.current.set(index, id);
        } else {
          setChars((prev) => {
            const copy = [...prev];
            copy[index] = original;
            return copy;
          });
          rafMapRef.current.delete(index);
        }
      };

      const id = requestAnimationFrame(tick);
      rafMapRef.current.set(index, id);
    };

    return (
      <span data-no-scramble="true" className="font-sans font-semibold tracking-[0.08em]">
        <span className="inline-block md:hidden">{hidden ? compact : full}</span>
        <span className="hidden md:inline">
          {chars.map((ch, i) => (
            <span
              key={`${i}-${full[i]}`}
              onMouseEnter={() => run(i)}
              className="inline-block"
            >
              {ch}
            </span>
          ))}
        </span>
      </span>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-115%" : "0%" }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-40 px-4 pt-3 md:px-10 md:pt-5"
      >
        <nav
          className={`mx-auto grid max-w-[1400px] grid-cols-[auto_1fr] items-center rounded-md border px-2.5 py-2 md:grid-cols-3 md:px-3 md:py-2.5 transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled
              ? "hairline border-[color-mix(in_srgb,var(--rule)_70%,transparent)] bg-[color-mix(in_srgb,var(--background)_72%,transparent)] backdrop-blur-md"
              : "border-transparent bg-transparent backdrop-blur-none"
          }`}
        >
          <Link
            href="/"
            data-cursor="link"
            data-no-scramble="true"
            className="inline-flex min-w-0 items-baseline font-mono text-[10px] uppercase tracking-[0.1em] md:text-[11px] md:tracking-[0.12em]"
          >
            <LogoName />
          </Link>

          <ul className="hidden justify-center gap-8 font-mono text-[11px] uppercase tracking-[0.12em] md:flex">
            {links.map(([label, href]) => (
              <li key={label}>
                {href.startsWith("mailto:") ? (
                  <a
                    href={href}
                    data-cursor="send"
                    data-no-scramble="true"
                    className="link-standard text-[var(--ash)]"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    data-cursor="link"
                    className={`link-standard ${
                      isActive(href)
                        ? "text-[var(--foreground)]"
                        : "text-[var(--ash)]"
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

        <div className="hidden items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.16em] md:flex md:gap-4 md:text-[11px] md:tracking-[0.2em]">
            <span className="hidden items-center gap-2 md:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--foreground)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--foreground)]" />
              </span>
              Open
            </span>
          </div>

          {/* mobile links */}
          <ul className="flex min-w-0 items-center justify-end gap-4 font-mono text-[10px] uppercase tracking-[0.12em] md:hidden">
            {links.map(([label, href]) => (
              <li key={label}>
                {href.startsWith("mailto:") ? (
                  <a
                    href={href}
                    data-cursor="send"
                    data-no-scramble="true"
                    className="link-standard text-[var(--ash)]"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    data-cursor="link"
                    className={`link-standard ${
                      isActive(href)
                        ? "text-[var(--foreground)]"
                        : "text-[var(--ash)]"
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>
      <Toolbar className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-10" />
    </>
  );
}
