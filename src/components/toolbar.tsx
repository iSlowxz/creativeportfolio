"use client";

import { motion } from "motion/react";
import { CircleHelp, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { GridOverlay } from "@/components/grid-overlay";

/**
 * Toolbar — paired controls (Grid / Mode) sitting at the top of the page.
 * Each toggle is the same micro-pill so they read as a system.
 *
 *   • Grid  — toggles a 12-column reference grid (also bound to the `G` key)
 *   • Mode  — flips paper / ink palette globally
 */
function ToggleButton({
  label,
  active,
  onClick,
  hint,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="link"
      aria-pressed={active}
      className="inline-flex items-center gap-2 px-1 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--vermilion)]"
    >
      <span
        aria-hidden
        className="relative inline-block h-3 w-6 overflow-hidden border hairline"
      >
        <motion.span
          aria-hidden
          className="absolute top-0 left-0 h-full w-1/2 bg-[var(--foreground)]"
          animate={{ x: active ? "100%" : "0%" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
      <span>{label}</span>
      {hint ? (
        <span className="hidden text-[var(--ash)] md:inline">[{hint}]</span>
      ) : null}
    </button>
  );
}

export function Toolbar({ className = "" }: { className?: string }) {
  const [grid, setGrid] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [prefsReady, setPrefsReady] = useState(false);

  // Restore persisted toolbar prefs on mount.
  useEffect(() => {
    const savedMode = window.localStorage.getItem("mode");
    const savedGrid = window.localStorage.getItem("grid");

    if (savedMode === "dark") setInverted(true);
    if (savedMode === "light") setInverted(false);
    if (savedGrid === "on") setGrid(true);
    if (savedGrid === "off") setGrid(false);

    setPrefsReady(true);
  }, []);

  // apply paper/ink palette to <html>
  useEffect(() => {
    if (!prefsReady) return;
    document.documentElement.classList.toggle("invert-mode", inverted);
    document.documentElement.classList.remove("mode-flicker");
    // Re-trigger each time mode flips so paper/ink has a slight analog pulse.
    requestAnimationFrame(() => {
      document.documentElement.classList.add("mode-flicker");
      window.setTimeout(() => {
        document.documentElement.classList.remove("mode-flicker");
      }, 420);
    });
    window.localStorage.setItem("mode", inverted ? "dark" : "light");
  }, [inverted, prefsReady]);

  // persist grid preference
  useEffect(() => {
    if (!prefsReady) return;
    window.localStorage.setItem("grid", grid ? "on" : "off");
  }, [grid, prefsReady]);

  // keyboard shortcuts (skip inputs/textareas):
  //   G => grid, D => dark/light mode, ? => help
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        setGrid((v) => !v);
        return;
      }
      if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        setInverted((v) => !v);
        return;
      }
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setHelpOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-hide help after 3 seconds when opened.
  useEffect(() => {
    if (!helpOpen) return;
    const id = window.setTimeout(() => setHelpOpen(false), 3000);
    return () => window.clearTimeout(id);
  }, [helpOpen]);

  // Responsive toolbar width for mobile/tablet/desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      setIsMd(mq.matches);
      setCollapsed(true);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Hide toolbar while scrolling down; reveal it when scrolling up.
  useEffect(() => {
    let previousY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > previousY;

      if (currentY !== previousY) {
        setCollapsed(true);
      }

      if (currentY < 40) {
        setHidden(false);
      } else if (scrollingDown && currentY > 80) {
        setHidden(true);
        setHelpOpen(false);
      } else {
        setHidden(false);
      }

      previousY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <GridOverlay visible={grid} />
      <div className={className}>
        <motion.div
          initial={false}
          animate={{
            opacity: hidden ? 0 : 1,
            y: hidden ? 24 : 0,
            width: collapsed ? 40 : isMd ? 286 : 252,
          }}
          transition={{
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`relative flex items-center border hairline bg-[var(--background)]/78 backdrop-blur-sm rounded-md ${
            collapsed
              ? "h-10 w-10 justify-center p-0"
              : "h-10 gap-2.5 px-2.5 py-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          <motion.div
            className="flex items-center gap-2.5 overflow-hidden"
            initial={false}
            animate={{
              width: collapsed ? 0 : isMd ? 236 : 170,
              opacity: collapsed ? 0 : 1,
              x: collapsed ? -8 : 0,
              marginRight: collapsed ? 0 : 2,
            }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <>
              <ToggleButton
                label="Grid"
                active={grid}
                onClick={() => setGrid((v) => !v)}
                hint="G"
              />
              <span aria-hidden className="h-2.5 w-px bg-[var(--rule)]" />
              <ToggleButton
                label={inverted ? "Ink" : "Paper"}
                active={inverted}
                onClick={() => setInverted((v) => !v)}
                hint="D"
              />
              {isMd ? (
                <>
                  <span aria-hidden className="h-2.5 w-px bg-[var(--rule)]" />
                  <button
                    type="button"
                    data-cursor="link"
                    aria-expanded={helpOpen}
                    onClick={() => setHelpOpen((v) => !v)}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border hairline font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--vermilion)]"
                  >
                    <CircleHelp size={11} strokeWidth={1.75} />
                  </button>
                  <span aria-hidden className="h-2.5 w-px bg-[var(--rule)]" />
                </>
              ) : null}
            </>
          </motion.div>
          <button
            type="button"
            data-cursor="link"
            aria-label={collapsed ? "Expand toolbar" : "Collapse toolbar"}
            onClick={() => {
              if (!collapsed) setHelpOpen(false);
              setCollapsed((v) => !v);
            }}
            className="inline-flex h-6 w-6 items-center justify-center font-mono text-[10px] text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--vermilion)]"
          >
            <motion.span
              initial={false}
              animate={{ rotate: collapsed ? 0 : 180, scale: collapsed ? 1 : 1.04 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {collapsed ? (
                <Plus size={12} strokeWidth={1.75} />
              ) : (
                <Minus size={12} strokeWidth={1.75} />
              )}
            </motion.span>
          </button>

          <motion.div
            data-no-scramble="true"
            initial={false}
            animate={{
              opacity: helpOpen ? 1 : 0,
              y: helpOpen ? 0 : 10,
              scale: helpOpen ? 1 : 0.96,
              filter: helpOpen ? "blur(0px)" : "blur(2px)",
              pointerEvents: helpOpen ? "auto" : "none",
            }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute bottom-[calc(100%+10px)] right-0 min-w-[240px] border hairline bg-[color-mix(in_srgb,var(--background)_92%,transparent)] p-3 backdrop-blur-md ${
              isMd ? "" : "hidden"
            }`}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--foreground)]">
              Shortcuts
            </p>
            <ul className="space-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--foreground)]">
              <li>G — Toggle Grid</li>
              <li>D — Toggle Ink/Paper</li>
              <li>? — Toggle Help</li>
              <li>− — Collapse Toolbar</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
