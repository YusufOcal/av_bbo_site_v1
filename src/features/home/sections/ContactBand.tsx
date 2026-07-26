import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import styles from "./ContactBand.module.css";

export function ContactBand() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title" data-reveal>
      <Container className={styles.inner} width="wide">
        <div className={styles.copy}>
          <Eyebrow tone="light">Gizli Randevu & Başvuru Masası</Eyebrow>
          <h2 id="contact-title">Seçenekleriniz henüz açıkken, sürecin başında iletişime geçin.</h2>
        </div>
        <div className={styles.protocolBox}>
          <p className={styles.protocolLead}>
            Hassas şirket satın almaları, ticari uyuşmazlıklar veya yönetim kurulu danışmanlıkları için
            kıdemli ortaklarımız doğrudan, gizlilik esasına dayalı inceleme sağlar.
          </p>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Protokol</span>
              <span className={styles.featureValue}>Doğrudan Ortak İncelemesi</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Çakışma Kontrolü</span>
              <span className={styles.featureValue}>24 Saat İçinde İnceleme</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Gizlilik</span>
              <span className={styles.featureValue}>Mutlak Gizli İletişim</span>
            </div>
          </div>

          <div className={styles.actionRow}>
            <Button href="mailto:contact@bbolegal.com" variant="secondary">
              Başvuru Başlatın (contact@bbolegal.com)
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
