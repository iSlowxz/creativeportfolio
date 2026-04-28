import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RevealHeading, RevealSubheading } from "@/components/reveal-title";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HoverPerspective } from "@/components/hover-perspective";

export default function AboutPage() {
  return (
    <main className="relative">
      <Nav />
      <section id="about" className="px-4 pb-20 pt-30 md:px-10 md:pt-36">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-10">
          <ScrollReveal className="col-span-12">
            <header className="grid grid-cols-12 border-t hairline pt-7">
              <div className="col-span-12 md:col-span-2">
                <RevealSubheading>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                    Profile
                  </p>
                </RevealSubheading>
              </div>
              <div className="col-span-12 mt-5 md:col-span-10 md:mt-0">
                <RevealHeading delay={0.02}>
                  <h1 className="whitespace-nowrap text-[clamp(1.45rem,5.1vw,5.2rem)] leading-[0.94] tracking-[-0.02em]">
                    <span className="font-medium">About </span>
                    <span className="font-medium font-serif italic serif-accent-hover">
                      Mark Angelo Cornejo
                    </span>
                  </h1>
                </RevealHeading>
              </div>
            </header>
          </ScrollReveal>

          <ScrollReveal className="col-span-12" delay={0.03}>
            <section className="grid grid-cols-12 gap-6">
            {/* Left dossier card */}
            <aside className="col-span-12 border hairline bg-[var(--paper)] p-4 md:col-span-4 md:p-5">
              <HoverPerspective
                className="relative aspect-[4/5] overflow-hidden border hairline"
                tilt={6}
                lift={3}
              >
                <img
                  src="/about/about-me.jpg?v=2"
                  alt="Mark Angelo Cornejo portrait"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ash)]">
                  Hover for perspective effect
                </span>
              </HoverPerspective>

              <div className="mt-4 border-t hairline pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
                <p>Based in Manila, Philippines</p>
                <p className="mt-1">BSCS · Class of 2026</p>
                <p className="mt-1">Open for freelance + collaboration</p>
              </div>
            </aside>

            {/* Right narrative block */}
            <article className="col-span-12 space-y-8 md:col-span-8">
              <div className="border-t hairline pt-6">
                <RevealSubheading>
                  <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                    Infos
                  </h2>
                </RevealSubheading>
                <p
                  data-no-scramble="true"
                  className="max-w-4xl text-[clamp(1.05rem,2vw,1.65rem)] leading-[1.34] tracking-[-0.01em]"
                >
                  I design at the intersection of screen and page where 
                  interface clarity meets typographic rhythm. My practice 
                  moves through brand identity, social systems,
                  and editorial layout, building visual worlds
                  that feel both precise and alive. I treat design
                  as sequencing: what the eye sees first, 
                  what it feels next, and what stays after. 
                  Based in Manila, I help brands translate 
                  complex ideas into structure and direction.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 border-t hairline pt-6 md:grid-cols-2">
                <div>
                  <RevealSubheading>
                    <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                      Focus
                    </h3>
                  </RevealSubheading>
                  <ul className="space-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                    <li>UI / UX Design</li>
                    <li>Brand Identity</li>
                    <li>Social Media Systems</li>
                    <li>Editorial Layout</li>
                    <li>Graphic Design</li>
                  </ul>
                </div>
                <div>
                  <RevealSubheading>
                    <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                      Toolkit
                    </h3>
                  </RevealSubheading>
                  <ul className="space-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                    <li>Adobe Suite</li>
                    <li>Figma</li>
                    <li>Framer</li>
                    <li>Canva</li>
                  </ul>
                </div>
              </div>

              <div className="border-t hairline pt-6">
                <RevealSubheading>
                  <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                    Vision
                  </h2>
                </RevealSubheading>
                <p
                  data-no-scramble="true"
                  className="max-w-4xl text-[clamp(1.05rem,2vw,1.65rem)] leading-[1.34] tracking-[-0.01em]"
                >
                  I treat design as sequencing: what the eye sees first, what it
                  feels next, and what stays after. The goal is not decoration
                  but direction — using structure, contrast, and motion to guide
                  attention and give every project a distinct editorial voice.
                </p>
              </div>
            </article>
            </section>
          </ScrollReveal>

          <ScrollReveal className="col-span-12" delay={0.05}>
            <section className="grid grid-cols-12 gap-y-6 border-t hairline pt-8">
              <div className="col-span-12 md:col-span-2">
                <RevealSubheading>
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ash)]">
                    Elsewhere
                  </h2>
                </RevealSubheading>
              </div>
            <div className="col-span-12 grid grid-cols-2 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] md:col-span-5">
              <a href="https://instagram.com" className="link-standard">
                Instagram
              </a>
              <a href="https://dribbble.com" className="link-standard">
                Dribbble
              </a>
              <a href="https://behance.net" className="link-standard">
                Behance
              </a>
              <a href="https://linkedin.com" className="link-standard">
                LinkedIn
              </a>
            </div>
            <div className="col-span-12 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ash)] md:col-span-5 md:text-right">
              <a
                href="mailto:hello@markcornejo.design"
                data-cursor="link"
                data-no-scramble="true"
                className="link-primary"
              >
                hello@markcornejo.design
              </a>
            </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="col-span-12" delay={0.06}>
            <footer className="border-t hairline pt-8">
            <p className="text-[clamp(1.35rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em]">
              Let&apos;s build something clear, useful, and memorable.
            </p>
            </footer>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}

