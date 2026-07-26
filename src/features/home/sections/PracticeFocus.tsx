import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { practiceAreas } from "@/content/firm";
import styles from "./PracticeFocus.module.css";

export function PracticeFocus() {
  return (
    <section className={styles.section} id="expertise" aria-labelledby="expertise-title" data-reveal>
      <Container className={styles.inner} width="wide">
        {/* Left Column: Editorial Header */}
        <header className={styles.header}>
          <Eyebrow>Expertise</Eyebrow>
          <h2 id="expertise-title" className={styles.title}>
            A focused practice for business-critical legal work.
          </h2>
          <div className={styles.headerCopy}>
            <p>
              The firm stays intentionally selective so senior attention remains close to every
              mandate, combining strategic legal insight with commercial clarity.
            </p>
          </div>
        </header>

        {/* Right Column: Architectural Practice Index */}
        <div className={styles.index}>
          {practiceAreas.map((area) => (
            <article className={styles.areaItem} key={area.title}>
              <div className={styles.areaHeader}>
                <span className={styles.areaNumber}>{area.eyebrow}</span>
                <h3 className={styles.areaTitle}>{area.title}</h3>
              </div>
              <p className={styles.areaCopy}>{area.copy}</p>
              {"capabilities" in area && area.capabilities && (
                <ul className={styles.capabilities} aria-label={`${area.title} key capabilities`}>
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
