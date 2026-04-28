"use client";

import { useEffect, useRef, useState } from "react";

type MosaicHoverImageProps = {
  src?: string;
  alt: string;
  pixelSize?: number;
  radius?: number;
  className?: string;
};

export function MosaicHoverImage({
  src,
  alt,
  pixelSize = 14,
  radius = 86,
  className = "",
}: MosaicHoverImageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const lowResCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, inside: false });
  const radiusRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageRef.current = img;
      setFailed(false);
      setImageReady(true);
    };
    img.onerror = () => {
      imageRef.current = null;
      setImageReady(false);
      setFailed(true);
    };
  }, [src]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lowRes = document.createElement("canvas");
    lowResCanvasRef.current = lowRes;
    const lowCtx = lowRes.getContext("2d");
    if (!lowCtx) return;

    const syncSize = () => {
      const rect = root.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lowRes.width = Math.max(1, Math.round(rect.width / pixelSize));
      lowRes.height = Math.max(1, Math.round(rect.height / pixelSize));
    };

    const render = () => {
      const rect = root.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const target = pointerRef.current.inside ? radius : 0;
      radiusRef.current += (target - radiusRef.current) * 0.2;
      const animatedRadius = radiusRef.current;

      const img = imageRef.current;
      if (img && animatedRadius > 0.8) {
        lowCtx.clearRect(0, 0, lowRes.width, lowRes.height);
        lowCtx.drawImage(img, 0, 0, lowRes.width, lowRes.height);

        ctx.save();
        ctx.beginPath();
        ctx.arc(pointerRef.current.x, pointerRef.current.y, animatedRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(lowRes, 0, 0, lowRes.width, lowRes.height, 0, 0, rect.width, rect.height);
        ctx.restore();
      }

      if (pointerRef.current.inside || animatedRadius > 0.4) {
        frameRef.current = requestAnimationFrame(render);
      } else {
        frameRef.current = null;
      }
    };

    const ensureLoop = () => {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(render);
      }
    };

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
      pointerRef.current.inside = true;
      ensureLoop();
    };

    const onEnter = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
      pointerRef.current.inside = true;
      ensureLoop();
    };

    const onLeave = () => {
      pointerRef.current.inside = false;
      ensureLoop();
    };

    syncSize();
    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", syncSize);

    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", syncSize);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [pixelSize, radius, imageReady]);

  return (
    <div ref={rootRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 130% at 12% 18%, color-mix(in srgb, var(--tone-a) 24%, transparent), transparent 52%), radial-gradient(120% 120% at 88% 82%, color-mix(in srgb, var(--tone-c) 26%, transparent), transparent 56%)",
          }}
        />
      )}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />
    </div>
  );
}
