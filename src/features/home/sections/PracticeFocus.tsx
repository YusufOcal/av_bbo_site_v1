import { Container } from "@/components/Container/Container";
import { useSiteContent } from "@/context/ContentContext";
import styles from "./PracticeFocus.module.css";

export function PracticeFocus() {
  const { content } = useSiteContent();
  const { sectionTitle, sectionDescription, areas } = content.practiceFocus;

  return (
    <section className={styles.section} id="expertise" aria-labelledby="expertise-title" data-reveal>
      <Container className={styles.inner} width="wide">
        {/* Left Column: Editorial Header */}
        <header className={styles.header}>
          <h2 id="expertise-title" className={styles.title}>
            {sectionTitle}
          </h2>
          <div className={styles.headerCopy}>
            <p>{sectionDescription}</p>
          </div>
        </header>

        {/* Right Column: Architectural Practice Index */}
        <div className={styles.index}>
          {areas.map((area) => (
            <article className={styles.areaItem} key={area.title}>
              <div className={styles.areaHeader}>
                <span className={styles.areaNumber}>{area.eyebrow}</span>
                <h3 className={styles.areaTitle}>{area.title}</h3>
              </div>
              <p className={styles.areaCopy}>{area.copy}</p>
              {area.capabilities && area.capabilities.length > 0 && (
                <ul className={styles.capabilities} aria-label={`${area.title} temel yetkinlikler`}>
                  {area.capabilities.map((cap) => (
                    <li key={cap} className={styles.capability}>
                      {cap}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
