import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Testimonials } from "@/components/testimonials";
import { Works } from "@/components/works";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <ScrollReveal>
        <Hero />
      </ScrollReveal>
      <Works />
      <ScrollReveal delay={0.06}>
        <Testimonials />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
