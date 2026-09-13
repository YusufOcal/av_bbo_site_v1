import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { AboutPrinciples } from "./sections/AboutPrinciples";
import { Articles } from "./sections/Articles";
import { Hero } from "./sections/Hero";
import { PracticeFocus } from "./sections/PracticeFocus";
import { UsefulLinks } from "./sections/UsefulLinks";

export function HomePage() {
  useScrollReveal();

  return (
    <main id="main-content">
      <SectionNav />
      <Hero />
      <PracticeFocus />
      <Articles />
      <AboutPrinciples />
      <UsefulLinks />
    </main>
  );
}
