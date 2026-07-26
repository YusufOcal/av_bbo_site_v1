import { Container } from "@/components/Container/Container";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { articles } from "@/content/firm";
import styles from "./Articles.module.css";

export function Articles() {
  return (
    <section className={styles.section} id="insights" aria-labelledby="insights-title" data-reveal>
      <Container width="wide">
        <header className={styles.header}>
          <Eyebrow>Publications & Insights</Eyebrow>
          <h2 id="insights-title" className={styles.title}>
            Legal analysis written for executive decision making.
          </h2>
        </header>

        <div className={styles.list}>
          {articles.map((article) => (
            <article key={article.title} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.category}>{article.category}</span>
                <span className={styles.date}>{article.date}</span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.summary}>{article.summary}</p>
                <div className={styles.footer}>
                  <span className={styles.readTime}>{article.readTime}</span>
                  <span className={styles.arrowLink} aria-hidden="true">
                    Read briefing &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
