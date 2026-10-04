import grandThemisStatue from "@/assets/visuals/grand-themis-statue.png";
import { Container } from "@/components/Container/Container";
import { useSiteContent } from "@/context/ContentContext";
import styles from "./AboutPrinciples.module.css";

export function AboutPrinciples() {
  const { content } = useSiteContent();
  const { sectionTitle, paragraphs, principlesLabel, principles } = content.aboutPrinciples;

  return (
    <section
      className={styles.section}
      id="principles"
      aria-labelledby="principles-title"
      data-reveal
    >
      <div className={styles.watermark} aria-hidden="true">
        <img src={grandThemisStatue} alt="" />
      </div>

      <Container className={styles.inner} width="wide">
        {/* Left Column: Firm Story & Direct Ethos */}
        <div className={styles.intro}>
          <h2 id="principles-title" className={styles.title}>
            {sectionTitle}
          </h2>

          <div className={styles.story}>
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right Column: 4 Pillars of Principles */}
        <div className={styles.principlesContainer}>
          <div className={styles.principlesHeader}>
            <span className={styles.principlesLabel}>{principlesLabel}</span>
          </div>

          <div className={styles.grid}>
            {principles.map((item) => (
              <article key={item.title} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.number}>{item.id}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p className={styles.cardDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
