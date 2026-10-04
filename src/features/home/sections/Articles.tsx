import { Container } from "@/components/Container/Container";
import { useSiteContent } from "@/context/ContentContext";
import styles from "./Articles.module.css";

export function Articles() {
  const { content } = useSiteContent();
  const { homeTitle, viewAllLabel, articles } = content.articlesSection;

  // Show up to the first 3 articles on the home section
  const displayArticles = articles.slice(0, 3);

  return (
    <section className={styles.section} id="articles" aria-labelledby="articles-title" data-reveal>
      <Container width="wide">
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h2 id="articles-title" className={styles.title}>
              {homeTitle}
            </h2>
            <a href="/makaleler" className={styles.viewAllLink}>
              <span>{viewAllLabel}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </header>

        <div className={styles.list}>
          {displayArticles.map((article) => (
            <a
              key={article.id || article.title}
              href={`/makale/${article.slug}`}
              className={styles.row}
            >
              <div className={styles.meta}>
                <span className={styles.category}>{article.category}</span>
                <span className={styles.date}>{article.date}</span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.summary}>{article.summary}</p>
                <div className={styles.footer}>
                  <span className={styles.arrowLink} aria-hidden="true">
                    Bilgi Notunu Okuyun &rarr;
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
