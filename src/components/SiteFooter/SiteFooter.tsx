import { BrandMark } from "@/components/BrandMark/BrandMark";
import { Container } from "@/components/Container/Container";
import { navItems, practiceAreas } from "@/content/firm";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner} width="wide">
        {/* Main 4-Column Grid */}
        <div className={styles.mainGrid}>
          {/* Column 1: Identity & Premise */}
          <div className={styles.identity}>
            <BrandMark tone="light" />
            <p className={styles.premise}>
              Independent legal counsel advising decision makers through corporate transactions,
              commercial disputes, and governance mandates.
            </p>
          </div>

          {/* Column 2: Core Navigation */}
          <div className={styles.column}>
            <span className={styles.columnHeader}>Navigation</span>
            <nav className={styles.links} aria-label="Footer navigation">
              {navItems.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Practices */}
          <div className={styles.column}>
            <span className={styles.columnHeader}>Practices</span>
            <nav className={styles.links} aria-label="Practice areas menu">
              {practiceAreas.map((area) => (
                <a href="#expertise" key={area.title}>
                  {area.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Desks & Locations */}
          <div className={styles.column}>
            <span className={styles.columnHeader}>Desks & Networks</span>
            <div className={styles.metaList}>
              <span>Istanbul Office</span>
              <span>London Aligned</span>
              <span>Cross-border Mandates</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Regulatory Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.regulatory}>
            BBO Legal is an independent law practice registered in Istanbul. Mandatory client
            confidentiality and conflict clearance protocols apply to all inquiries.
          </p>
          <div className={styles.legalMeta}>
            <span>&copy; {new Date().getFullYear()} BBO Legal. All rights reserved.</span>
            <div className={styles.legalLinks}>
              <a href="#main-content">Privacy Notice</a>
              <span aria-hidden="true">&bull;</span>
              <a href="#main-content">Terms of Engagement</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
