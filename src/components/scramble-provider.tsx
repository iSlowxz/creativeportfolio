"use client";

import { useEffect } from "react";

/**
 * ScrambleProvider
 * Site-wide Framer-like scramble for text elements.
 *
 * Targets common readable elements and only scrambles leaf text nodes
 * (elements that don't contain child elements) to keep behavior stable.
 *
 * Behavior tuned per user request:
 * - only the currently hovered character scrambles
 * - short/clean timing
 * - no animation when not hovered
 */
export function ScrambleProvider() {
  useEffect(() => {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const activeRafs = new WeakMap<HTMLElement, number>();
    const lastHoveredIndex = new WeakMap<HTMLElement, number>();
    let activeEl: HTMLElement | null = null;
    let activeIndex = -1;

    const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const shouldScramble = (el: HTMLElement) => {
      if (el.closest("[data-no-scramble='true']")) return false;
      if (el.dataset.scramble === "off") return false;
      if (el.children.length > 0) return false; // leaf-only
      const fontSize = Number.parseFloat(getComputedStyle(el).fontSize || "0");
      if (fontSize >= 28) return false; // skip big display text/headlines
      const text = el.textContent?.trim() ?? "";
      return text.length > 0;
    };

    const stop = (el: HTMLElement, restore = false) => {
      const id = activeRafs.get(el);
      if (id !== undefined) {
        cancelAnimationFrame(id);
        activeRafs.delete(el);
      }
      if (restore) {
        const original = el.dataset.scrambleOriginal;
        if (original !== undefined) el.textContent = original;
      }
    };

    const charIndexFromPointer = (
      el: HTMLElement,
      clientX: number,
      clientY: number,
    ) => {
      const text = el.textContent ?? "";
      if (!text.length) return -1;

      // Pixel-accurate caret lookup (better than width-ratio approximation).
      let node: Node | null = null;
      let offset = 0;

      if ("caretPositionFromPoint" in document) {
        const pos = (
          document as Document & {
            caretPositionFromPoint?: (x: number, y: number) => {
              offsetNode: Node;
              offset: number;
            } | null;
          }
        ).caretPositionFromPoint?.(clientX, clientY);
        if (pos) {
          node = pos.offsetNode;
          offset = pos.offset;
        }
      } else if ("caretRangeFromPoint" in document) {
        const range = (
          document as Document & {
            caretRangeFromPoint?: (x: number, y: number) => Range | null;
          }
        ).caretRangeFromPoint?.(clientX, clientY);
        if (range) {
          node = range.startContainer;
          offset = range.startOffset;
        }
      }

      if (!node || !el.contains(node)) return -1;
      if (node.nodeType !== Node.TEXT_NODE) return -1;
      const nodeText = node.textContent ?? "";
      if (!nodeText.length) return -1;

      const i = Math.max(0, Math.min(nodeText.length - 1, offset));
      return i;
    };

    const run = (el: HTMLElement, hoveredIndex: number) => {
      if (!shouldScramble(el)) return;

      const original = el.dataset.scrambleOriginal ?? el.textContent ?? "";
      if (!original || hoveredIndex < 0 || hoveredIndex >= original.length) return;
      if (!/[A-Za-z0-9]/.test(original[hoveredIndex])) return;

      const now = performance.now();
      const last = Number(el.dataset.scrambleLast || 0);
      const lastIndex = Number(el.dataset.scrambleIndex || -1);
      if (now - last < 150 && lastIndex === hoveredIndex) return; // tiny cooldown
      el.dataset.scrambleLast = String(now);
      el.dataset.scrambleIndex = String(hoveredIndex);

      // Ensure only one character scramble runs at a time globally.
      if (activeEl && (activeEl !== el || activeIndex !== hoveredIndex)) {
        stop(activeEl, true);
      }
      stop(el);
      el.dataset.scrambleOriginal = original;
      const duration = 220;
      const start = performance.now();
      activeEl = el;
      activeIndex = hoveredIndex;

      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const next = original
          .split("")
          .map((ch, i) => {
            if (i !== hoveredIndex) return ch;
            if (p > 0.68) return original[i];
            return pick();
          })
          .join("");
        el.textContent = next;
        if (p < 1) {
          const id = requestAnimationFrame(tick);
          activeRafs.set(el, id);
        } else {
          el.textContent = original;
          activeRafs.delete(el);
          if (activeEl === el && activeIndex === hoveredIndex) {
            activeEl = null;
            activeIndex = -1;
          }
        }
      };

      const id = requestAnimationFrame(tick);
      activeRafs.set(el, id);
    };

    const resolveTarget = (start: EventTarget | null) => {
      const node = start as HTMLElement | null;
      if (!node) return null;
      return node.closest<HTMLElement>(
        "h1, h2, h3, h4, h5, h6, p, a, button, li, span, label, strong, em",
      );
    };

    const handlePointer = (e: MouseEvent) => {
      const el = resolveTarget(e.target);
      if (!el) {
        if (activeEl) {
          stop(activeEl, true);
          activeEl = null;
          activeIndex = -1;
        }
        return;
      }
      const i = charIndexFromPointer(el, e.clientX, e.clientY);
      const prev = lastHoveredIndex.get(el);
      if (prev === i) return;
      lastHoveredIndex.set(el, i);
      run(el, i);
    };

    const onLeaveWindow = () => {
      if (activeEl) {
        stop(activeEl, true);
        activeEl = null;
        activeIndex = -1;
      }
    };

    const onDocumentMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related) onLeaveWindow();
    };

    document.addEventListener("mousemove", handlePointer, { passive: true });
    document.addEventListener("mouseover", handlePointer);
    document.addEventListener("mouseout", onDocumentMouseOut);
    window.addEventListener("blur", onLeaveWindow);
    return () => {
      if (activeEl) stop(activeEl, true);
      document.removeEventListener("mousemove", handlePointer);
      document.removeEventListener("mouseover", handlePointer);
      document.removeEventListener("mouseout", onDocumentMouseOut);
      window.removeEventListener("blur", onLeaveWindow);
    };
  }, []);

  return null;
}

