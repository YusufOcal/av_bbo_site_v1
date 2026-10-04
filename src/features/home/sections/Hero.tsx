import officeVisual from "@/assets/visuals/private-office.svg";
import grandThemisStatue from "@/assets/visuals/grand-themis-statue.png";
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { useSiteContent } from "@/context/ContentContext";
import styles from "./Hero.module.css";

export function Hero() {
  const { content } = useSiteContent();
  const { title, description, buttonLabel, buttonHref } = content.hero;

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
          <h1 id="hero-title">{title}</h1>
          <p>{description}</p>
          <div className={styles.actions}>
            <Button href={buttonHref}>{buttonLabel}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
