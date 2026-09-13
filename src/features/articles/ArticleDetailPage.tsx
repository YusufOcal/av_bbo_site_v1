import { fullArticles } from "@/content/articles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./ArticleDetailPage.module.css";

interface ArticleDetailPageProps {
  slug: string;
}

export function ArticleDetailPage({ slug }: ArticleDetailPageProps) {
  useScrollReveal();

  const article = fullArticles.find(
    (a) => a.slug === slug || a.id === slug
  );

  if (!article) {
    return (
      <main id="main-content" className={styles.section}>
        <div className={styles.container}>
          <a href="/makaleler" className={styles.backLink}>
            &larr; Tüm Makalelere Dön
          </a>
          <div className={styles.notFound}>
            <h2>Makale Bulunamadı</h2>
            <p>Aradığınız makale mevcut değil veya kaldırılmış olabilir.</p>
            <a href="/makaleler" className={styles.backLink}>
              Makaleler Listesine Git &rarr;
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className={styles.section}>
      <div className={styles.container} data-reveal>
        <a href="/makaleler" className={styles.backLink}>
          &larr; Tüm Makalelere Dön
        </a>

        <article className={styles.articleWrapper}>
          {/* Header Metadata */}
          <div className={styles.metaTop}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.bullet} aria-hidden="true">&bull;</span>
            <span className={styles.date}>{article.date}</span>
          </div>

          <h1 className={styles.title}>{article.title}</h1>

          <div className={styles.authorBar}>
            <span className={styles.authorLabel}>Hazırlayan:</span>
            <span className={styles.authorName}>{article.author}</span>
          </div>

          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className={styles.takeawaysBox}>
              <h2 className={styles.takeawaysTitle}>Yönetici Özeti & Anahtar Çıkarımlar</h2>
              <ul className={styles.takeawaysList}>
                {article.keyTakeaways.map((item, idx) => (
                  <li key={idx} className={styles.takeawaysItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Content */}
          <div className={styles.content}>
            {article.contentParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Footer & Tags */}
          <footer className={styles.footer}>
            <div className={styles.tagsList}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>

            <p className={styles.disclaimer}>
              * Bu bilgi notu genel bilgilendirme mahiyetindedir; somut olayın özelliklerine göre hukuki mütalaa yerine geçmez.
            </p>
          </footer>
        </article>

        <div className={styles.bottomNav}>
          <a href="/makaleler" className={styles.backLink}>
            &larr; Tüm Makalelere Dön
          </a>
        </div>
      </div>
    </main>
  );
}
