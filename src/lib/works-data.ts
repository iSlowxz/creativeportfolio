export type WorkItem = {
  slug: string;
  index: string;
  title: string;
  client: string;
  projectType: "Branding" | "Pubmat" | "Poster" | "Web" | "General";
  discipline: string;
  year: string;
  duration: string;
  category: string;
  overview: string;
  challenge: string;
  approach: string;
  result: string;
  tools: string[];
};

export const worksData: WorkItem[] = [
  {
    slug: "pulse-ui-kit",
    index: "01",
    title: "Pulse",
    client: "Wellness app concept",
    projectType: "Web",
    discipline: "UI / UX",
    year: "2025",
    duration: "00:02:05",
    category: "Digital",
    overview:
      "A mobile wellness interface focused on daily rhythm tracking and calmer visual pacing.",
    challenge:
      "The app needed to show dense progress data without feeling clinical or overwhelming.",
    approach:
      "Built a modular screen system with strong typographic hierarchy, compact components, and motion cues for state transitions.",
    result:
      "Delivered a coherent UI kit and prototype flow with a clearer interaction model ready for handoff.",
    tools: ["Figma", "Framer", "Adobe Suite"],
  },
  {
    slug: "kape-brand-system",
    index: "02",
    title: "Kape & Co.",
    client: "Roastery, Manila",
    projectType: "Branding",
    discipline: "Brand Identity",
    year: "2025",
    duration: "00:01:18",
    category: "Branding",
    overview:
      "A boutique coffee identity balancing tactile warmth with clean editorial direction.",
    challenge:
      "The brand needed to stand out in a crowded local market while staying versatile across packaging and social.",
    approach:
      "Developed a wordmark-led identity, restrained color palette, and a repeatable layout language for daily content.",
    result:
      "Created a launch-ready brand toolkit for print, digital, and in-store touchpoints.",
    tools: ["Adobe Suite", "Figma", "Canva"],
  },
  {
    slug: "daily-hum-social",
    index: "03",
    title: "Daily Hum",
    client: "Editorial newsletter",
    projectType: "Pubmat",
    discipline: "Social Media",
    year: "2024",
    duration: "00:00:45",
    category: "Social",
    overview:
      "A social content system translating long-form editorial themes into compact weekly posts.",
    challenge:
      "The team needed a high-frequency output format without losing coherence and quality.",
    approach:
      "Built a template family with strict spacing rules, typography scale, and topic-based visual modules.",
    result:
      "Enabled faster publishing with stronger consistency across campaigns and channels.",
    tools: ["Figma", "Canva", "Adobe Suite"],
  },
  {
    slug: "atlas-editorial-report",
    index: "04",
    title: "Atlas '26",
    client: "Bairro Foundation",
    projectType: "General",
    discipline: "Editorial",
    year: "2026",
    duration: "00:03:12",
    category: "Editorial",
    overview:
      "An annual report concept with a bold typographic voice and strict information flow.",
    challenge:
      "The publication had complex financial and program data that needed a clearer reading sequence.",
    approach:
      "Structured content using a modular grid, recurring spread templates, and controlled contrast rhythm.",
    result:
      "Produced an editorial framework that improved readability while maintaining visual character.",
    tools: ["Adobe InDesign", "Adobe Illustrator", "Figma"],
  },
  {
    slug: "type-forum-poster",
    index: "05",
    title: "Type Forum",
    client: "Festival, Manila",
    projectType: "Poster",
    discipline: "Graphic Design",
    year: "2024",
    duration: "00:00:58",
    category: "Print",
    overview:
      "A poster series proposal for a typography-led design festival with high-contrast visual impact.",
    challenge:
      "Needed to attract attention from distance while preserving hierarchy for schedule details.",
    approach:
      "Combined oversized serif headlines with mono metadata bands and a constrained two-ink palette.",
    result:
      "Delivered a recognizable poster direction adaptable to multiple event formats.",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "InDesign"],
  },
  {
    slug: "rolio-studio-site",
    index: "06",
    title: "Rolio Studio",
    client: "Studio site",
    projectType: "Web",
    discipline: "Web · Framer",
    year: "2025",
    duration: "00:01:40",
    category: "Digital",
    overview:
      "A studio website concept focused on narrative pacing, soft motion, and project discoverability.",
    challenge:
      "The site had to showcase multi-disciplinary work without feeling fragmented.",
    approach:
      "Designed a modular homepage structure, interaction states, and responsive behavior across breakpoints.",
    result:
      "Built a clear browsing flow with stronger project hierarchy and improved visual continuity.",
    tools: ["Framer", "Figma", "Adobe Suite"],
  },
];

export function getWorkBySlug(slug: string) {
  return worksData.find((item) => item.slug === slug);
}
