import { Container } from "@/components/Container/Container";
import { usefulLinks } from "@/content/firm";
import styles from "./UsefulLinks.module.css";

export function UsefulLinks() {
  return (
    <section
      className={styles.section}
      id="useful-links"
      aria-labelledby="useful-links-title"
      data-reveal
    >
      <Container width="wide">
        <header className={styles.header}>
          <h2 id="useful-links-title" className={styles.title}>
            Müvekkillerimiz ve ilgililer için faydalı kurumsal bağlantılar.
          </h2>
          <div className={styles.headerCopy}>
            <p>
              Yargı organları, resmi mevzuat platformları ve mesleki kuruluşlara ait
              resmi erişim adresleri derlenmiştir.
            </p>
          </div>
        </header>

        <div className={styles.grid}>
          {usefulLinks.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              aria-label={`${link.title} (Yeni sekmede açılır)`}
            >
              <div className={styles.cardTop}>
                <span className={styles.category}>{link.category}</span>
                <span className={styles.icon} aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </div>
              <h3 className={styles.cardTitle}>{link.title}</h3>
              <p className={styles.cardDesc}>{link.desc}</p>
              <span className={styles.domain}>
                {link.url.replace(/^https?:\/\//, "")}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
