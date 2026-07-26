import officeVisual from "@/assets/visuals/private-office.svg";
import grandThemisStatue from "@/assets/visuals/grand-themis-statue.png";
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
      <div className={styles.watermark} aria-hidden="true">
        <img src={grandThemisStatue} alt="" />
      </div>
      <Container className={styles.inner} width="wide">
        <div className={styles.copy}>
          <Eyebrow tone="light">Bağımsız Hukuki Strateji</Eyebrow>
          <h1 id="hero-title">İş dünyasını şekillendiren kararlar için stratejik danışmanlık.</h1>
          <p>
            BBO Legal; hassas birleşme devralmalar, ticari uyuşmazlıklar ve yönetişim kararlarında kuruculara,
            yönetim kurullarına ve yatırımcılara hassasiyet ve gizlilikle danışmanlık sunar.
          </p>
          <div className={styles.actions}>
            <Button href="#contact">Görüşme Başlatın</Button>
            <Button href="#expertise" variant="secondary">
              Uzmanlıklarımızı İnceleyin
            </Button>
          </div>
        </div>
        <aside className={styles.panel} aria-label="Büro istatistikleri">
          {heroStats.map((stat) => (
            <Stat key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </aside>
      </Container>
    </section>
  );
}
