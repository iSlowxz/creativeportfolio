"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactElement } from "react";
import {
  CoverAtlas,
  CoverDailyHum,
  CoverKape,
  CoverPulse,
  CoverRolio,
  CoverTypeForum,
} from "@/components/covers";
import { HoverPerspective } from "@/components/hover-perspective";
import { getWorkBySlug, worksData } from "@/lib/works-data";
import { RevealSubheading } from "@/components/reveal-title";

const coverBySlug: Record<string, ReactElement> = {
  "pulse-ui-kit": <CoverPulse />,
  "kape-brand-system": <CoverKape />,
  "daily-hum-social": <CoverDailyHum />,
  "atlas-editorial-report": <CoverAtlas />,
  "type-forum-poster": <CoverTypeForum />,
  "rolio-studio-site": <CoverRolio />,
};

const dailyHumGallery = [
  "/social-samples/social-01.png",
  "/social-samples/social-02.png",
  "/social-samples/social-03.png",
  "/social-samples/social-04.png",
  "/social-samples/social-05.png",
];

export function Works() {
  const [layout, setLayout] = useState<"list" | "grid">("grid");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid] = useState(() => {
    if (typeof window === "undefined") return false;
    return /android/i.test(window.navigator.userAgent);
  });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [listHoverSlug, setListHoverSlug] = useState<string | null>(null);
  const [listPreviewPos, setListPreviewPos] = useState({ x: 0, y: 0 });
  const [listPreviewTilt, setListPreviewTilt] = useState({ rotateX: 0, rotateY: 0 });
  const showViewerHint = false;
  const [showViewerControls, setShowViewerControls] = useState(true);
  const visible = useMemo(() => worksData, []);
  const activeWork = useMemo(
    () => (activeSlug ? getWorkBySlug(activeSlug) : null),
    [activeSlug],
  );
  const activeMediaSet = useMemo(
    () => (activeWork?.slug === "daily-hum-social" ? dailyHumGallery : []),
    [activeWork],
  );

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      const mobile = query.matches;
      setIsMobile(mobile);
      setLayout(mobile ? "list" : "grid");
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (activeImageIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      setShowViewerControls(true);
      if (event.key === "Escape") {
        setActiveImageIndex(null);
        return;
      }
      if (!activeMediaSet.length) return;
      if (event.key === "ArrowRight") {
        setActiveImageIndex((prev) =>
          prev === null ? 0 : (prev + 1) % activeMediaSet.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveImageIndex((prev) =>
          prev === null ? 0 : (prev - 1 + activeMediaSet.length) % activeMediaSet.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImageIndex, activeMediaSet]);

  useEffect(() => {
    if (activeImageIndex === null || !showViewerControls) return;
    if (isMobile) return;
    const id = window.setTimeout(() => setShowViewerControls(false), 1200);
    return () => window.clearTimeout(id);
  }, [activeImageIndex, isMobile, showViewerControls]);

  useEffect(() => {
    const shouldLockScroll = activeSlug !== null || activeImageIndex !== null;
    if (!shouldLockScroll) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarGap = isMobile
      ? 0
      : window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [activeSlug, activeImageIndex, isMobile]);

  const updateListPreviewPointer = (
    target: EventTarget & HTMLButtonElement,
    clientX: number,
    clientY: number,
  ) => {
    const rect = target.getBoundingClientRect();
    const x = Math.max(132, Math.min(rect.width - 132, clientX - rect.left + 22));
    const y = Math.max(72, Math.min(rect.height - 72, clientY - rect.top));
    const normalizedX = (clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (clientY - rect.top) / rect.height - 0.5;

    setListPreviewPos({ x, y });
    setListPreviewTilt({
      rotateX: normalizedY * -3.2,
      rotateY: normalizedX * 3.8,
    });
  };

  const showPreviousImage = () => {
    setActiveImageIndex((prev) =>
      prev === null ? 0 : (prev - 1 + activeMediaSet.length) % activeMediaSet.length,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === null ? 0 : (prev + 1) % activeMediaSet.length,
    );
  };

  return (
    <section id="works" className="relative px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-col gap-5 border-t hairline pt-6 md:flex-row md:items-end md:justify-between">
          <RevealSubheading>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ash)]">
              Works ({String(visible.length).padStart(2, "0")})
            </h2>
          </RevealSubheading>

          <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:px-0">
            <div className="inline-flex shrink-0 border hairline">
              <button
                type="button"
                onClick={() => setLayout("grid")}
                data-cursor="link"
                className={`btn-accent-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] md:text-[11px] ${
                  layout === "grid" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--ash)]"
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setLayout("list")}
                data-cursor="link"
                className={`btn-accent-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] md:text-[11px] ${
                  layout === "list" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--ash)]"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {layout === "list" ? (
          <ul className="flex flex-col">
            {visible.map((p, i) =>
              isMobile ? (
                <li
                  key={p.index}
                  className="border-b hairline"
                >
                  <button
                    type="button"
                    onClick={() => setActiveSlug(p.slug)}
                    data-cursor="view"
                    className="grid w-full grid-cols-12 items-center gap-x-4 gap-y-3 py-5 text-left"
                  >
                    <span className="col-span-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                      {p.index}
                    </span>
                    <span className="col-span-12 text-[clamp(1.6rem,8vw,2.8rem)] leading-none tracking-[-0.02em]">
                      {p.title}
                    </span>
                    <span className="col-span-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                      {p.category}
                    </span>
                    <span className="col-span-6 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                      {p.year}
                    </span>
                  </button>
                </li>
              ) : (
                <motion.li
                  key={p.index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.28 }}
                  transition={{ duration: 0.34, delay: i * 0.02 }}
                  className="group relative border-b hairline transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--tone-a)_10%,transparent)]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveSlug(p.slug)}
                    onMouseEnter={(event) => {
                      setListHoverSlug(p.slug);
                      const rect = event.currentTarget.getBoundingClientRect();
                      updateListPreviewPointer(
                        event.currentTarget,
                        rect.left + rect.width * 0.66,
                        rect.top + rect.height * 0.5,
                      );
                    }}
                    onMouseLeave={() => {
                      setListHoverSlug((prev) => (prev === p.slug ? null : prev));
                      setListPreviewTilt({ rotateX: 0, rotateY: 0 });
                    }}
                    onMouseMove={(event) => {
                      updateListPreviewPointer(event.currentTarget, event.clientX, event.clientY);
                    }}
                    data-cursor="view"
                    className="grid w-full grid-cols-12 items-center gap-x-4 gap-y-4 py-6 text-left md:gap-y-0"
                  >
                    <span className="col-span-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)] md:col-span-1">
                      {p.index}
                    </span>
                    <span className="col-span-12 text-[clamp(1.35rem,8vw,2.8rem)] leading-none tracking-[-0.02em] md:col-span-7 md:text-[clamp(1.35rem,3vw,2.8rem)]">
                      {p.title}
                    </span>
                    <span className="col-span-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)] md:col-span-2">
                      {p.category}
                    </span>
                    <span className="col-span-6 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)] md:col-span-2">
                      {p.year}
                    </span>
                  </button>
                  <AnimatePresence>
                    {listHoverSlug === p.slug ? (
                      <motion.div
                        className="pointer-events-none absolute left-0 top-0 z-10 hidden w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden border hairline bg-[var(--paper)] [transform-style:preserve-3d] md:block"
                        initial={{ opacity: 0, scale: 0.96, y: 4, filter: "blur(2px)" }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: listPreviewPos.x,
                          y: listPreviewPos.y,
                          rotateX: listPreviewTilt.rotateX,
                          rotateY: listPreviewTilt.rotateY,
                          filter: "blur(0px)",
                          boxShadow: "0 14px 34px rgba(0, 0, 0, 0.16)",
                        }}
                        exit={{ opacity: 0, scale: 0.97, y: 3, filter: "blur(2px)" }}
                        transition={{
                          opacity: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                          scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          filter: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                          boxShadow: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                          x: { type: "spring", stiffness: 175, damping: 28, mass: 0.8 },
                          y: { type: "spring", stiffness: 175, damping: 28, mass: 0.8 },
                          rotateX: { type: "spring", stiffness: 145, damping: 23, mass: 0.8 },
                          rotateY: { type: "spring", stiffness: 145, damping: 23, mass: 0.8 },
                        }}
                      >
                        <div className="aspect-[4/5]">
                          {coverBySlug[p.slug]}
                        </div>
                        <div className="flex items-center justify-between border-t hairline px-2 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--ash)]">
                          <span>{p.index}</span>
                          <span>{p.year}</span>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.li>
              ),
            )}
          </ul>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <motion.div
                key={p.index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.28 }}
                transition={{ duration: 0.36, delay: i * 0.02 }}
                className="group transition-colors duration-300"
              >
                <HoverPerspective
                  className="border hairline bg-[var(--paper)] transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--tone-a)_10%,var(--paper))]"
                  tilt={7}
                  lift={3}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSlug(p.slug)}
                    data-cursor="view"
                    className="block w-full text-left"
                  >
                    <div className="group/image relative aspect-[4/5] overflow-hidden">
                      {coverBySlug[p.slug]}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/62 via-black/12 to-transparent opacity-0 transition-opacity duration-300 group-hover/image:opacity-100" />
                      <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/88 lg:text-[11px]">
                          {p.client}
                        </p>
                        <p className="mt-1 text-[clamp(1.05rem,1.7vw,1.35rem)] leading-none tracking-[-0.01em] text-white">
                          {p.discipline}
                        </p>
                        <div className="mt-3 flex items-center text-white/90">
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] lg:text-[11px]">
                            Open project
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t hairline px-4 py-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)] lg:text-[11px]">
                        {p.index}
                      </span>
                      <span className="text-lg tracking-[-0.02em] lg:text-xl">{p.title}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)] lg:text-[11px]">
                        {p.category}
                      </span>
                    </div>
                  </button>
                </HoverPerspective>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeSlug ? (
          <motion.div
            className={`fixed inset-0 z-[70] flex items-end justify-center bg-black/45 px-0 py-0 md:items-center md:px-4 md:py-8 ${
              isMobile || isAndroid ? "" : "backdrop-blur-[1px]"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={isAndroid ? { duration: 0.12, ease: "linear" } : undefined}
            onClick={() => setActiveSlug(null)}
          >
            <motion.article
              initial={
                isAndroid
                  ? { opacity: 0 }
                  : isMobile
                    ? { opacity: 0, y: 10 }
                    : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={
                isAndroid
                  ? { opacity: 1 }
                  : isMobile
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                isAndroid
                  ? { opacity: 0 }
                  : isMobile
                    ? { opacity: 0, y: 8 }
                    : { opacity: 0, y: 12, scale: 0.98 }
              }
              transition={
                isAndroid
                  ? { duration: 0.12, ease: "linear" }
                  : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
              }
              className={`popup-outline flex h-[100svh] w-full max-w-[1180px] flex-col overflow-hidden border-0 bg-[var(--paper)] md:max-h-[92vh] md:h-auto md:border md:rounded-none ${
                isAndroid ? "shadow-none" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const work = activeWork;
                if (!work) return null;
                const mediaSet = activeMediaSet;
                return (
                  <>
                    <div className="scrollbar-subtle min-h-0 flex-1 overflow-y-auto">
                      <div className="grid grid-cols-12">
                        <div
                          className="col-span-12 border-b hairline p-5 pt-18 md:col-span-5 md:border-b-0 md:border-r md:p-7"
                          data-no-scramble="true"
                        >
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                            {work.index} · {work.category}
                          </p>
                          <h3 className="mt-2 text-2xl tracking-[-0.02em]">
                            {work.title}
                          </h3>
                          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ash)]">
                            {work.discipline} · {work.year}
                          </p>

                          <section className="mt-6 grid grid-cols-12 gap-6 border-t hairline pt-5">
                            <div className="col-span-12 md:col-span-4">
                              <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                                Snapshot
                              </h4>
                              <ul className="mt-3 space-y-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                                <li>Index · {work.index}</li>
                                <li>Category · {work.category}</li>
                                <li>Year · {work.year}</li>
                              </ul>
                            </div>
                            <article className="col-span-12 space-y-5 md:col-span-8">
                              <div>
                                <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                                  Overview
                                </h4>
                                <p className="text-[clamp(1rem,1.45vw,1.2rem)] leading-[1.35]">
                                  {work.overview}
                                </p>
                              </div>
                              <div>
                                <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                                  Challenge
                                </h4>
                                <p className="text-[0.98rem] leading-[1.38]">
                                  {work.challenge}
                                </p>
                              </div>
                              <div>
                                <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                                  Approach
                                </h4>
                                <p className="text-[0.98rem] leading-[1.38]">
                                  {work.approach}
                                </p>
                              </div>
                              <div>
                                <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                                  Result
                                </h4>
                                <p className="text-[0.98rem] leading-[1.38]">
                                  {work.result}
                                </p>
                              </div>
                              <div>
                                <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                                  Tools
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {work.tools.map((tool) => (
                                    <span
                                      key={tool}
                                      className="border hairline px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </article>
                          </section>
                        </div>
                        <div className="col-span-12 p-3 pb-5 md:col-span-7 md:flex md:items-center md:p-4">
                          <div className="grid w-full grid-cols-3 gap-0">
                            {Array.from({ length: 9 }).map((_, index) => {
                              const src = mediaSet[index % (mediaSet.length || 1)];
                              return (
                                <button
                                  key={`${work.slug}-${index}`}
                                  type="button"
                                  onClick={() => {
                                    if (mediaSet.length) setActiveImageIndex(index % mediaSet.length);
                                  }}
                                  className="relative aspect-square overflow-hidden border popup-outline rounded-none bg-[color-mix(in_srgb,var(--ash)_10%,var(--paper))]"
                                >
                                  {src ? (
                                    <Image
                                      src={src}
                                      alt={`${work.title} gallery ${index + 1}`}
                                      fill
                                      sizes="(max-width: 768px) 30vw, 220px"
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ash)]">
                                      1000 x 1000
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sticky bottom-0 flex items-center justify-end border-t hairline bg-[var(--paper)]/96 p-3 backdrop-blur-sm">
                      <button
                        type="button"
                        onClick={() => setActiveSlug(null)}
                        className="popup-outline btn-accent-soft border rounded-none px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]"
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeImageIndex !== null && activeMediaSet.length ? (
          <motion.div
            className={`fixed inset-0 z-[95] flex items-center justify-center bg-black/68 p-4 ${
              isMobile || isAndroid ? "" : "backdrop-blur-[1px]"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={isAndroid ? { duration: 0.12, ease: "linear" } : undefined}
            onClick={() => setActiveImageIndex(null)}
          >
            <motion.div
              className={`popup-outline relative h-[88svh] w-full max-w-[88vh] overflow-hidden border rounded-none bg-[var(--background)]/95 ${
                isAndroid ? "shadow-none" : ""
              }`}
              initial={isMobile || isAndroid ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={isMobile || isAndroid ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={isMobile || isAndroid ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={isAndroid ? { duration: 0.12, ease: "linear" } : { duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              onMouseMove={isMobile ? undefined : () => {
                setShowViewerControls(true);
              }}
              onTouchStart={(event) => {
                setShowViewerControls(true);
                setTouchStartX(event.touches[0]?.clientX ?? null);
              }}
              onTouchEnd={(event) => {
                const endX = event.changedTouches[0]?.clientX;
                if (touchStartX === null || endX === undefined) {
                  setTouchStartX(null);
                  return;
                }
                const deltaX = endX - touchStartX;
                if (Math.abs(deltaX) >= 40) {
                  if (deltaX < 0) showNextImage();
                  else showPreviousImage();
                }
                setTouchStartX(null);
              }}
            >
              <Image
                src={activeMediaSet[activeImageIndex]}
                alt="Gallery preview"
                fill
                sizes="88vh"
                className="object-contain"
              />
              <AnimatePresence>
                {showViewerControls ? (
                  <>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      type="button"
                      onClick={showPreviousImage}
                      data-cursor="link"
                      className="popup-outline absolute left-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center border rounded-none bg-[var(--background)]/78 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--foreground)] backdrop-blur-sm transition-colors duration-300 hover:text-[var(--vermilion)]"
                      aria-label="Previous image"
                    >
                      ‹
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      type="button"
                      onClick={showNextImage}
                      data-cursor="link"
                      className="popup-outline absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center border rounded-none bg-[var(--background)]/78 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--foreground)] backdrop-blur-sm transition-colors duration-300 hover:text-[var(--vermilion)]"
                      aria-label="Next image"
                    >
                      ›
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      type="button"
                      onClick={() => setActiveImageIndex(null)}
                      data-cursor="link"
                      className="popup-outline absolute right-2 top-2 grid h-7 w-7 place-items-center border rounded-none bg-[var(--background)]/78 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--foreground)] backdrop-blur-sm transition-colors duration-300 hover:text-[var(--vermilion)]"
                    >
                      ×
                    </motion.button>
                  </>
                ) : null}
              </AnimatePresence>

              <AnimatePresence>
                {showViewerHint && showViewerControls ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="popup-outline pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 border rounded-none bg-[var(--background)]/82 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--foreground)] backdrop-blur-sm"
                  >
                    {isMobile ? "Swipe left or right" : "Use Arrow Keys • ESC"}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
