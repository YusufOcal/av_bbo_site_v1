import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { aboutContent } from "@/content/about";
import styles from "./AboutHero.module.css";

export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-title">
      <Container className={styles.inner} width="wide">
        <div className={styles.copy}>
          <Eyebrow tone="light">{aboutContent.hero.eyebrow}</Eyebrow>
          <h1 id="about-hero-title">{aboutContent.hero.title}</h1>
          <p>{aboutContent.hero.lead}</p>
          <div className={styles.actions}>
            <Button href="#contact">Discuss a Mandate</Button>
            <Button href="#leadership" variant="secondary">
              Meet Senior Leadership
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
