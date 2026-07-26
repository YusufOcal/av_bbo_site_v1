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
          <Eyebrow>Faaliyet Alanlarımız</Eyebrow>
          <h2 id="expertise-title" className={styles.title}>
            İş dünyası için kritik hukuki süreçlerde odaklanmış danışmanlık.
          </h2>
          <div className={styles.headerCopy}>
            <p>
              Kıdemli ortaklarımızın her dosyaya bizzat odaklanabilmesi için danışmanlık kapasitemizi bilinçli
              olarak seçici tutuyoruz.
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
