import { ContactBand } from "@/features/home/sections/ContactBand";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AboutHero } from "./sections/AboutHero";
import { FirmStats } from "./sections/FirmStats";
import { FirmStory } from "./sections/FirmStory";
import { Leadership } from "./sections/Leadership";

export function AboutPage() {
  useScrollReveal();

  return (
    <main id="main-content">
      <AboutHero />
      <FirmStory />
      <FirmStats />
      <Leadership />
      <ContactBand />
    </main>
  );
}
