import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { methodSteps } from "@/content/firm";
import styles from "./CounselModel.module.css";

export function CounselModel() {
  return (
    <section className={styles.section} id="method" data-reveal>
      <Container className={styles.inner} width="wide">
        <div className={styles.intro}>
          <Eyebrow tone="light">Counsel model</Eyebrow>
          <h2>Legal advice built around judgment, timing, and consequence.</h2>
          <div className={styles.introCopy}>
            <p>
              Complex matters rarely fail because the law is unknown. They fail when legal options are
              separated from negotiation posture, operational capacity, or board appetite.
            </p>
            <p>
              BBO Legal works as a compact senior team, translating legal analysis into decisions that
              can be explained, executed, and defended.
            </p>
            <div className={styles.action}>
              <Button href="#contact" variant="secondary">
                Discuss a mandate
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.stepsContainer}>
          <div className={styles.stepsHeader}>
            <span className={styles.stepsLabel}>Operational Method</span>
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
