import grandThemisStatue from "@/assets/visuals/grand-themis-statue.png";
import { Container } from "@/components/Container/Container";
import { principles } from "@/content/firm";
import styles from "./AboutPrinciples.module.css";

export function AboutPrinciples() {
  return (
    <section
      className={styles.section}
      id="principles"
      aria-labelledby="principles-title"
      data-reveal
    >
      <div className={styles.watermark} aria-hidden="true">
        <img src={grandThemisStatue} alt="" />
      </div>

      <Container className={styles.inner} width="wide">
        {/* Left Column: Firm Story & Direct Ethos */}
        <div className={styles.intro}>
          <h2 id="principles-title" className={styles.title}>
            Stratejik vizyon, doğrudan avukat takibi ve tavizsiz meslek etiği.
          </h2>

          <div className={styles.story}>
            <p>
              <strong>Özkan Hukuk & Danışmanlık</strong>; geleneksel hiyerarşik
              ve çok katmanlı büro yapılarının aksine, her sürecin doğrudan ve
              şeffaf yürütüldüğü bir danışmanlık anlayışıyla hareket eder.
            </p>
            <p>
              En etkili hukuki sonucun; dosyanın başlangıcından neticelenmesine
              kadar bizzat yürütülen titiz hazırlık, proaktif iletişim ve ticari
              dinamiklere uygun stratejik yaklaşımla elde edildiğine inanıyoruz.
            </p>
            <p>
              Müvekkillerimizin kurumsal hedeflerini korumak ve hukuki riskleri
              öngörülebilir kılmak için 4 temel mesleki ilke çerçevesinde
              hizmet sunuyoruz.
            </p>
          </div>
        </div>

        {/* Right Column: 4 Pillars of Principles */}
        <div className={styles.principlesContainer}>
          <div className={styles.principlesHeader}>
            <span className={styles.principlesLabel}>Temel Çalışma İlkelerimiz</span>
          </div>

          <div className={styles.grid}>
            {principles.map((item) => (
              <article key={item.title} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.number}>{item.id}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p className={styles.cardDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
