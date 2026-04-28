import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RevealHeading } from "@/components/reveal-title";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ContactPage() {
  return (
    <main className="relative">
      <Nav />
      <section id="contact" className="px-6 pb-20 pt-32 md:px-10 md:pt-36">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-10">
          <ScrollReveal className="col-span-12">
            <RevealHeading>
              <h1 className="text-[clamp(2rem,7vw,6rem)] leading-[0.94] tracking-[-0.02em]">
                Contact
              </h1>
            </RevealHeading>
          </ScrollReveal>

          <ScrollReveal className="col-span-12" delay={0.04}>
            <div className="border-t hairline pt-8">
              <p className="max-w-2xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[var(--ash)]">
                Prefer email. Send your project brief directly and I will get back to you within
                24 to 48 hours.
              </p>
              <a
                href="mailto:hello@markcornejo.design"
                data-cursor="send"
                data-no-scramble="true"
                className="btn-accent-soft mt-7 inline-flex items-center justify-center border hairline px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
              >
                hello@markcornejo.design
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}

