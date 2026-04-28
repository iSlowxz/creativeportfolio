export type PortfolioType = "Branding" | "Pubmat" | "Poster" | "Web" | "General";

export type ImagePlanSlot = {
  id: string;
  label: string;
  ratio: string;
  size: string;
  note: string;
};

const squareSize = "2400 x 2400";
const igPortraitSize = "2048 x 2560";
const posterSize = "1707 x 2560";

export const imagePlanByType: Record<PortfolioType, ImagePlanSlot[]> = {
  Branding: [
    { id: "01", label: "Hero brand board", ratio: "4:5", size: igPortraitSize, note: "Best visual hook" },
    { id: "02", label: "Logo system", ratio: "1:1", size: squareSize, note: "Primary/secondary marks" },
    { id: "03", label: "Color + type system", ratio: "1:1", size: squareSize, note: "Core brand rules" },
    { id: "04", label: "Application mockup", ratio: "4:5", size: igPortraitSize, note: "Packaging or collateral" },
    { id: "05", label: "Social/pubmat sample", ratio: "4:5", size: igPortraitSize, note: "Campaign consistency" },
    { id: "06", label: "Real-world context", ratio: "2:3", size: posterSize, note: "Signage, shelf, or space" },
  ],
  Pubmat: [
    { id: "01", label: "Campaign hero", ratio: "4:5", size: igPortraitSize, note: "Strongest key visual" },
    { id: "02", label: "Grid overview", ratio: "1:1", size: squareSize, note: "Show series consistency" },
    { id: "03", label: "Best single post", ratio: "4:5", size: igPortraitSize, note: "Readable on mobile" },
    { id: "04", label: "Variant/adaptation", ratio: "4:5", size: igPortraitSize, note: "Story, reel, event cut" },
    { id: "05", label: "Context mockup", ratio: "2:3", size: posterSize, note: "Placed in real setting" },
  ],
  Poster: [
    { id: "01", label: "Hero poster", ratio: "2:3", size: posterSize, note: "Full frame showcase" },
    { id: "02", label: "Alternate poster", ratio: "2:3", size: posterSize, note: "Best variation only" },
    { id: "03", label: "Detail close-up", ratio: "1:1", size: squareSize, note: "Type and texture zoom" },
    { id: "04", label: "Context mockup", ratio: "2:3", size: posterSize, note: "Wall, street, event" },
  ],
  Web: [
    { id: "01", label: "Landing hero", ratio: "4:5", size: igPortraitSize, note: "First impression frame" },
    { id: "02", label: "UI system", ratio: "1:1", size: squareSize, note: "Components and style tokens" },
    { id: "03", label: "Feature screen", ratio: "4:5", size: igPortraitSize, note: "Key user flow" },
    { id: "04", label: "Responsive view", ratio: "1:1", size: squareSize, note: "Desktop + mobile pairing" },
  ],
  General: [
    { id: "01", label: "Project hero", ratio: "4:5", size: igPortraitSize, note: "Lead with strongest frame" },
    { id: "02", label: "System/detail", ratio: "1:1", size: squareSize, note: "Process or style logic" },
    { id: "03", label: "Application", ratio: "4:5", size: igPortraitSize, note: "Where it gets used" },
    { id: "04", label: "Context shot", ratio: "2:3", size: posterSize, note: "Real-world placement" },
  ],
};

export function getImagePlan(type: PortfolioType) {
  return imagePlanByType[type] ?? imagePlanByType.General;
}
