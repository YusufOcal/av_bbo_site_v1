import { Container } from "@/components/Container/Container";
import { Stat } from "@/components/Stat/Stat";
import { aboutContent } from "@/content/about";
import styles from "./FirmStats.module.css";

export function FirmStats() {
  return (
    <section className={styles.section} data-reveal>
      <Container className={styles.inner} width="wide">
        {aboutContent.stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </Container>
    </section>
  );
}
