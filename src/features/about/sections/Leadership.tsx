import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { aboutContent } from "@/content/about";
import styles from "./Leadership.module.css";

export function Leadership() {
  return (
    <section className={styles.section} id="leadership" data-reveal>
      <Container width="wide">
        <header className={styles.header}>
          <Eyebrow>Leadership & Partners</Eyebrow>
          <h2 className={styles.title}>Senior counsel guiding complex mandates.</h2>
        </header>

        <div className={styles.grid}>
          {aboutContent.partners.map((partner) => (
            <article key={partner.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.name}>{partner.name}</h3>
                <span className={styles.role}>{partner.role}</span>
              </div>
              <span className={styles.qualifications}>{partner.qualifications}</span>
              <p className={styles.bio}>{partner.bio}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
