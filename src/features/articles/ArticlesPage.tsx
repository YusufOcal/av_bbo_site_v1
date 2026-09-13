import { useState, useMemo } from "react";
import { Container } from "@/components/Container/Container";
import { fullArticles, articleCategories, type Article } from "@/content/articles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./ArticlesPage.module.css";

export function ArticlesPage() {
  useScrollReveal();

  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredArticles = useMemo(() => {
    return fullArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === "Tümü" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main id="main-content">
      <section className={styles.section} aria-labelledby="articles-page-title" data-reveal>
        <Container width="wide">
          {/* Controls Bar: Category Pills & Search */}
          <div className={styles.controlsBar}>
            <div className={styles.categories} role="tablist" aria-label="Kategoriler">
              {articleCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={[
                    styles.catPill,
                    selectedCategory === cat ? styles.catPillActive : ""
                  ].join(" ")}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.searchBox}>
              <svg
                className={styles.searchIcon}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                placeholder="Makale ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Makalelerde ara"
              />
            </div>
          </div>

          {/* Modern Card Grid */}
          <div className={styles.grid}>
            {filteredArticles.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Aradığınız kriterlere uygun makale bulunamadı.</p>
              </div>
            ) : (
              filteredArticles.map((article: Article) => (
                <a
                  key={article.id}
                  href={`/makale/${article.slug}`}
                  className={styles.card}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardCategory}>{article.category}</span>
                  </div>

                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardSummary}>{article.summary}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>{article.date}</span>
                    <span className={styles.cardAction}>
                      <span>İncele</span>
                      <span className={styles.arrow} aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
