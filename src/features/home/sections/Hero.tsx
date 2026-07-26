import officeVisual from "@/assets/visuals/private-office.svg";
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Stat } from "@/components/Stat/Stat";
import { heroStats } from "@/content/firm";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true">
        <img src={officeVisual} alt="" />
      </div>
      <Container className={styles.inner} width="wide">
        <div className={styles.copy}>
          <Eyebrow tone="light">Independent legal strategy</Eyebrow>
          <h1 id="hero-title">Counsel for matters that shape the business.</h1>
          <p>
            BBO Legal advises founders, boards, investors, and operators through sensitive
            transactions, disputes, and governance decisions where precision and discretion matter.
          </p>
          <div className={styles.actions}>
            <Button href="#contact">Start a conversation</Button>
            <Button href="#expertise" variant="secondary">
              View expertise
            </Button>
          </div>
        </div>
        <aside className={styles.panel} aria-label="Firm highlights">
          {heroStats.map((stat) => (
            <Stat key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </aside>
      </Container>
    </section>
  );
}
