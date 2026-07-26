import styles from "./BrandMark.module.css";

type BrandMarkProps = {
  tone?: "dark" | "light";
};

export function BrandMark({ tone = "dark" }: BrandMarkProps) {
  return (
    <a className={[styles.brand, styles[tone]].join(" ")} href="#main-content" aria-label="BBO Legal home">
      <span className={styles.symbol} aria-hidden="true">
        <span>B</span>
        <span>B</span>
        <span>O</span>
      </span>
      <span className={styles.copy}>
        <span>BBO</span>
        <span>Legal</span>
      </span>
    </a>
  );
}
