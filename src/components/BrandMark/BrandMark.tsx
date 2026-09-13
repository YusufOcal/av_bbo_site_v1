import styles from "./BrandMark.module.css";

type BrandMarkProps = {
  tone?: "dark" | "light";
};

export function BrandMark({ tone = "dark" }: BrandMarkProps) {
  return (
    <a
      className={[styles.brand, styles[tone]].join(" ")}
      href="/"
      aria-label="Özkan Hukuk & Danışmanlık"
    >
      <span className={styles.symbol} aria-hidden="true">
        <svg
          className={styles.scaleIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Vertical Pillar and Base */}
          <line x1="12" y1="3" x2="12" y2="20" />
          <line x1="8" y1="20" x2="16" y2="20" strokeWidth="1.8" />
          {/* Top Pivot */}
          <circle cx="12" cy="3.5" r="1.2" fill="currentColor" />
          {/* Beam */}
          <line x1="4.5" y1="6.5" x2="19.5" y2="6.5" strokeWidth="1.8" />
          {/* Left Pan */}
          <polyline points="2.5,13.5 4.5,6.5 6.5,13.5" strokeWidth="1.3" />
          <path d="M2 13.5c0 1.8 1.8 2.5 2.5 2.5s2.5-.7 2.5-2.5" fill="currentColor" fillOpacity="0.18" />
          {/* Right Pan */}
          <polyline points="17.5,13.5 19.5,6.5 21.5,13.5" strokeWidth="1.3" />
          <path d="M17 13.5c0 1.8 1.8 2.5 2.5 2.5s2.5-.7 2.5-2.5" fill="currentColor" fillOpacity="0.18" />
        </svg>
      </span>
      <span className={styles.copy}>
        <span>Özkan</span>
        <span>Hukuk & Danışmanlık</span>
      </span>
    </a>
  );
}
