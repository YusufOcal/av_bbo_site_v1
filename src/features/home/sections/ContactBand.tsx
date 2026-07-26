import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import styles from "./ContactBand.module.css";

export function ContactBand() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title" data-reveal>
      <Container className={styles.inner} width="wide">
        <div className={styles.copy}>
          <Eyebrow tone="light">Confidential Mandate Desk</Eyebrow>
          <h2 id="contact-title">Bring the matter early, while options remain open.</h2>
        </div>
        <div className={styles.protocolBox}>
          <p className={styles.protocolLead}>
            For sensitive corporate transactions, high-stakes disputes, or strategic board counsel,
            our partners provide immediate, confidential review.
          </p>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Protocol</span>
              <span className={styles.featureValue}>Direct Partner Review</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Conflict Check</span>
              <span className={styles.featureValue}>Strict Clearance Within 24h</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Discretion</span>
              <span className={styles.featureValue}>Confidential Communication</span>
            </div>
          </div>

          <div className={styles.actionRow}>
            <Button href="mailto:contact@bbolegal.com" variant="secondary">
              Initiate Inquiry (contact@bbolegal.com)
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
