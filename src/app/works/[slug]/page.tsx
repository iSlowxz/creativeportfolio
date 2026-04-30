import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CoverAtlas,
  CoverDailyHum,
  CoverKape,
  CoverPulse,
  CoverRolio,
  CoverTypeForum,
} from "@/components/covers";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { ProjectImagePlan } from "@/components/project-image-plan";
import { getWorkBySlug, worksData } from "@/lib/works-data";

const coverBySlug = {
  "pulse-ui-kit": <CoverPulse />,
  "kape-brand-system": <CoverKape />,
  "daily-hum-social": <CoverDailyHum />,
  "atlas-editorial-report": <CoverAtlas />,
  "type-forum-poster": <CoverTypeForum />,
  "rolio-studio-site": <CoverRolio />,
};

export async function generateStaticParams() {
  return worksData.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return { title: "Work Not Found — Mark Angelo Cornejo" };
  }

  return {
    title: `${work.title} — Mark Angelo Cornejo`,
    description: work.overview,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const cover = coverBySlug[work.slug as keyof typeof coverBySlug];

  return (
    <main className="relative">
      <Nav />
      <section className="px-4 pb-20 pt-30 md:px-10 md:pt-36">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-10">
          <header className="col-span-12 grid grid-cols-12 border-t hairline pt-7">
            <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)] md:col-span-2">
              Case Study
            </p>
            <div className="col-span-12 mt-5 md:col-span-10 md:mt-0">
              <Link
                href="/#works"
                data-cursor="link"
                className="mb-4 inline-flex w-fit border hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)] transition-colors hover:text-[var(--foreground)]"
              >
                ← Back to Works
              </Link>
              <h1 className="text-[clamp(2rem,7vw,6rem)] leading-[0.94] tracking-[-0.02em]">
                {work.title}
              </h1>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                {work.discipline} · {work.client} · {work.year}
              </p>
            </div>
          </header>

          <section className="col-span-12 border hairline bg-[var(--paper)]">
            <div className="aspect-[16/10] overflow-hidden">{cover}</div>
          </section>

          <section className="col-span-12 grid grid-cols-12 gap-6 border-t hairline pt-8">
            <div className="col-span-12 md:col-span-3">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                Snapshot
              </h2>
              <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                <li>Index · {work.index}</li>
                <li>Category · {work.category}</li>
                <li>Duration · {work.duration}</li>
                <li>Year · {work.year}</li>
              </ul>
            </div>

            <article className="col-span-12 space-y-6 md:col-span-9">
              <div>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                  Overview
                </h3>
                <p className="max-w-4xl text-[clamp(1rem,1.8vw,1.45rem)] leading-[1.34] tracking-[-0.01em]">
                  {work.overview}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                  Challenge
                </h3>
                <p className="max-w-4xl text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.38]">
                  {work.challenge}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                  Approach
                </h3>
                <p className="max-w-4xl text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.38]">
                  {work.approach}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                  Result
                </h3>
                <p className="max-w-4xl text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.38]">
                  {work.result}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                  Tools
                </h3>
                <ul className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                  {work.tools.map((tool) => (
                    <li key={tool} className="border hairline px-2 py-1">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <ProjectImagePlan projectType={work.projectType} />
            </article>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
