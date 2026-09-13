import { useEffect, useState } from "react";
import styles from "./SectionNav.module.css";

const sections = [
  { id: "hero", label: "Giriş", theme: "dark" },
  { id: "expertise", label: "Faaliyet Alanlarımız", theme: "light" },
  { id: "articles", label: "Makaleler", theme: "light" },
  { id: "principles", label: "İlkelerimiz", theme: "dark" },
  { id: "useful-links", label: "Faydalı Bağlantılar", theme: "light" }
];

export function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // When scrolled to the very bottom, set to the last section
      if (window.scrollY + winHeight >= docHeight - 80) {
        setActiveIndex(sections.length - 1);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;
    const el = document.getElementById(sections[index].id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentTheme = sections[activeIndex]?.theme || "dark";

  return (
    <aside
      className={`${styles.container} ${styles[currentTheme]}`}
      aria-label="Sayfa bölüm navigasyonu"
    >
      <div className={styles.lineTop} aria-hidden="true" />

      <div className={styles.dots} role="tablist">
        {sections.map((section, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${section.label} bölümüne git (${idx + 1}/${sections.length})`}
              className={`${styles.dot} ${isActive ? styles.activeDot : ""}`}
              onClick={() => scrollToSection(idx)}
            />
          );
        })}
      </div>

      <div className={styles.lineBottom} aria-hidden="true" />
    </aside>
  );
}
