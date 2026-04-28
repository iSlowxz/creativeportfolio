import { Marquee, MarqueeDot } from "@/components/marquee";

const phrases = [
  "Brand identity",
  "UI / UX design",
  "Social media",
  "Editorial layout",
  "Graphic design",
  "Type-led",
  "Manila — everywhere",
  "BSCS '26",
];

/**
 * Band — marquee strip set in Fraunces (variable).
 * Hovering a phrase smoothly interpolates its weight 300 → 900
 * and SOFT axis 100 → 0 (soft → sharp). Marquee pauses on hover
 * so phrases sit still long enough to be hovered.
 */
export function Band() {
  return (
    <div className="relative border-y hairline py-5">
      <Marquee className="font-display text-3xl italic md:text-5xl">
        {phrases.map((p) => (
          <span key={p} className="flex items-center gap-12">
            <span data-cursor="link" className="phrase-weight">
              {p}
            </span>
            <MarqueeDot />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
