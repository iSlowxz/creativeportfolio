"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { PortfolioType } from "@/lib/image-plan";
import { getImagePlan } from "@/lib/image-plan";

type ProjectImagePlanProps = {
  projectType: PortfolioType;
  compact?: boolean;
};

export function ProjectImagePlan({
  projectType,
  compact = false,
}: ProjectImagePlanProps) {
  const slots = getImagePlan(projectType);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeSlot = slots[activeIndex] ?? slots[0];
  const socialSamples =
    projectType === "Pubmat"
      ? [
          "/social-samples/social-01.png",
          "/social-samples/social-02.png",
          "/social-samples/social-03.png",
          "/social-samples/social-04.png",
          "/social-samples/social-05.png",
        ]
      : [];

  const trackCount = compact ? Math.min(4, slots.length) : Math.min(5, slots.length);
  const startIndex = useMemo(() => {
    if (slots.length <= trackCount) return 0;
    const centeredStart = activeIndex - Math.floor(trackCount / 2);
    return Math.max(0, Math.min(centeredStart, slots.length - trackCount));
  }, [activeIndex, slots.length, trackCount]);
  const visibleSlots = slots.slice(startIndex, startIndex + trackCount);

  const getAspectRatio = (ratio: string) => {
    const [w, h] = ratio.split(":").map(Number);
    if (!w || !h) return "1 / 1";
    return `${w} / ${h}`;
  };

  return (
    <section className="border-t hairline pt-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev === 0 ? slots.length - 1 : prev - 1))}
          className="grid h-8 w-8 shrink-0 place-items-center text-[var(--ash)] transition-colors hover:text-[var(--foreground)]"
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className="flex flex-1 gap-2 overflow-hidden">
          {visibleSlots.map((slot) => {
            const realIndex = slots.findIndex((item) => item.id === slot.id);
            const isActive = realIndex === activeIndex;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => {
                  setActiveIndex(realIndex);
                  setIsLightboxOpen(true);
                }}
                className={`relative shrink-0 overflow-hidden transition-all duration-200 ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"} ${compact ? "h-24" : "h-28"} w-[calc((100%-0.5rem)/2)] md:w-[calc((100%-1rem)/3)] lg:w-[calc((100%-2rem)/5)]`}
              >
                <div
                  className="relative h-full w-full bg-[color-mix(in_srgb,var(--ash)_12%,var(--paper))]"
                  style={{ aspectRatio: getAspectRatio(slot.ratio) }}
                >
                  {socialSamples[realIndex] ? (
                    <Image
                      src={socialSamples[realIndex]}
                      alt={`Social sample ${realIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 45vw, 16vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--ash)_8%,var(--paper)),var(--paper))]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev + 1) % slots.length)}
          className="grid h-8 w-8 shrink-0 place-items-center text-[var(--ash)] transition-colors hover:text-[var(--foreground)]"
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {isLightboxOpen && activeSlot ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-[2px]"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-[940px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center text-white/80 transition-colors hover:text-white"
              aria-label="Close preview"
            >
              ×
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev === 0 ? slots.length - 1 : prev - 1))
                }
                className="grid h-10 w-10 shrink-0 place-items-center text-white/70 transition-colors hover:text-white"
                aria-label="Previous preview"
              >
                ‹
              </button>

              <div className="flex-1">
                <div
                  className="relative mx-auto w-full max-w-[620px] overflow-hidden bg-[#111]"
                  style={{ aspectRatio: getAspectRatio(activeSlot.ratio) }}
                >
                  {socialSamples[activeIndex] ? (
                    <Image
                      src={socialSamples[activeIndex]}
                      alt={`Social sample ${activeIndex + 1}`}
                      fill
                      sizes="(max-width: 940px) 86vw, 620px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#303030,#151515)]" />
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % slots.length)}
                className="grid h-10 w-10 shrink-0 place-items-center text-white/70 transition-colors hover:text-white"
                aria-label="Next preview"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
