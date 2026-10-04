import { useState, useMemo } from "react";
import { Container } from "@/components/Container/Container";
import { useSiteContent } from "@/context/ContentContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { ArticleItem } from "@/types/content";
import styles from "./ArticlesPage.module.css";

export function ArticlesPage() {
  useScrollReveal();
  const { content } = useSiteContent();
  const { articles, categories, pageTitle, pageDescription } = content.articlesSection;

  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const availableCategories = useMemo(() => {
    const list = ["Tümü"];
    const seen = new Set<string>(["Tümü"]);
    (categories || []).forEach((c) => {
      if (c && !seen.has(c)) {
        seen.add(c);
        list.push(c);
      }
    });
    articles.forEach((a) => {
      if (a.category && !seen.has(a.category.trim())) {
        seen.add(a.category.trim());
        list.push(a.category.trim());
      }
    });
    return list;
  }, [categories, articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchesCategory =
        selectedCategory === "Tümü" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <main id="main-content">
      <section className={styles.section} aria-labelledby="articles-page-title" data-reveal>
        <Container width="wide">
          <header style={{ marginBottom: "var(--space-32)" }}>
            <h1 id="articles-page-title" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(var(--text-32), 4vw, var(--text-48))", color: "var(--color-paper)", marginBottom: "var(--space-12)" }}>
              {pageTitle}
            </h1>
            <p style={{ color: "rgba(246, 242, 234, 0.7)", maxWidth: "720px", fontSize: "var(--text-16)", lineHeight: "1.6" }}>
              {pageDescription}
            </p>
          </header>

          {/* Controls Bar: Category Pills & Search */}
          <div className={styles.controlsBar}>
            <div className={styles.categories} role="tablist" aria-label="Kategoriler">
              {availableCategories.map((cat) => (
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
              filteredArticles.map((article: ArticleItem) => (
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
