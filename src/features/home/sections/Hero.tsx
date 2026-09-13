import officeVisual from "@/assets/visuals/private-office.svg";
import grandThemisStatue from "@/assets/visuals/grand-themis-statue.png";
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true">
        <img src={officeVisual} alt="" />
      </div>
      <div className={styles.watermark} aria-hidden="true">
        <img src={grandThemisStatue} alt="" />
      </div>
      <Container className={styles.inner} width="wide">
        <div className={styles.copy}>
          <h1 id="hero-title">Stratejik ve sonuç odaklı avukatlık danışmanlığı.</h1>
          <p>
            Özkan Hukuk & Danışmanlık; ticari uyuşmazlıklar, sözleşmeler ve kurumsal süreçlerde doğrudan ve titiz bir avukatlık hizmeti sunar.
          </p>
          <div className={styles.actions}>
            <Button href="#expertise">Faaliyet Alanlarını İnceleyin</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
