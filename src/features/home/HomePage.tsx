import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Articles } from "./sections/Articles";
import { ContactBand } from "./sections/ContactBand";
import { CounselModel } from "./sections/CounselModel";
import { Hero } from "./sections/Hero";
import { PracticeFocus } from "./sections/PracticeFocus";
import { Principles } from "./sections/Principles";
import { SelectedMatters } from "./sections/SelectedMatters";

export function HomePage() {
  useScrollReveal();

  return (
    <main id="main-content">
      <Hero />
      <PracticeFocus />
      <CounselModel />
      <SelectedMatters />
      <Principles />
      <Articles />
      <ContactBand />
    </main>
  );
}
