import grandThemisStatue from "@/assets/visuals/grand-themis-statue.png";
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { methodSteps } from "@/content/firm";
import styles from "./CounselModel.module.css";

export function CounselModel() {
  return (
    <section className={styles.section} id="method" data-reveal>
      <div className={styles.watermark} aria-hidden="true">
        <img src={grandThemisStatue} alt="" />
      </div>
      <Container className={styles.inner} width="wide">
        <div className={styles.intro}>
          <Eyebrow tone="light">Danışmanlık Modeli</Eyebrow>
          <h2>Karar, zamanlama ve ticari sonuçlar üzerine kurgulanmış danışmanlık.</h2>
          <div className={styles.introCopy}>
            <p>
              Karmaşık hukuki süreçler hukuk bilinmediği için değil; hukuki seçenekler müzakere pozisyonundan veya
              yönetim kurulunun ticari hedeflerinden koptuğu için başarısız olur.
            </p>
            <p>
              BBO Legal, hukuki analizleri savunulabilir, uygulanabilir ve net kararlara dönüştüren kıdemli bir ekiple çalışır.
            </p>
            <div className={styles.action}>
              <Button href="#contact" variant="secondary">
                Bir Süreç Değerlendirin
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.stepsContainer}>
          <div className={styles.stepsHeader}>
            <span className={styles.stepsLabel}>Operasyonel Yöntemimiz</span>
          </div>
          <ol className={styles.steps}>
            {methodSteps.map((step, index) => (
              <li key={step} className={styles.step}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                <span className={styles.stepText}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
