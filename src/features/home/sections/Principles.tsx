import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { principles } from "@/content/firm";
import styles from "./Principles.module.css";

export function Principles() {
  return (
    <section className={styles.section} data-reveal>
      <Container className={styles.inner} width="wide">
        <header className={styles.header}>
          <Eyebrow>Çalışma İlkelerimiz</Eyebrow>
          <h2 className={styles.title}>Hukuki süreçlerde 4 temel taahhüdümüz.</h2>
        </header>
        <div className={styles.grid}>
          {principles.map((principle) => (
            <article key={principle.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>{principle.id}</span>
                <h3 className={styles.cardTitle}>{principle.title}</h3>
              </div>
              <p className={styles.cardDesc}>{principle.desc}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
