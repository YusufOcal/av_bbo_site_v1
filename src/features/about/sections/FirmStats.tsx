import grandThemisStatue from "@/assets/visuals/grand-themis-statue.png";
import { Container } from "@/components/Container/Container";
import { Stat } from "@/components/Stat/Stat";
import { aboutContent } from "@/content/about";
import styles from "./FirmStats.module.css";

export function FirmStats() {
  return (
    <section className={styles.section} data-reveal>
      <div className={styles.watermark} aria-hidden="true">
        <img src={grandThemisStatue} alt="" />
      </div>
      <Container className={styles.inner} width="wide">
        {aboutContent.stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </Container>
    </section>
  );
}
