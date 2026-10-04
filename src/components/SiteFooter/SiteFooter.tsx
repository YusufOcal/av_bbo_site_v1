import { BrandMark } from "@/components/BrandMark/BrandMark";
import { Container } from "@/components/Container/Container";
import { useSiteContent } from "@/context/ContentContext";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const { content } = useSiteContent();
  const { general, navigation, practiceFocus } = content;

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner} width="wide">
        {/* Main 4-Column Grid */}
        <div className={styles.mainGrid}>
          {/* Column 1: Identity & Premise */}
          <div className={styles.identity}>
            <BrandMark tone="light" />
            <p className={styles.premise}>
              {general.addressPremise}
            </p>
          </div>

          {/* Column 2: Core Navigation */}
          <div className={styles.column}>
            <span className={styles.columnHeader}>Gezinti</span>
            <nav className={styles.links} aria-label="Footer navigasyonu">
              {navigation.items.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Practices */}
          <div className={styles.column}>
            <span className={styles.columnHeader}>Uzmanlık Alanlarımız</span>
            <nav className={styles.links} aria-label="Uzmanlık alanları menüsü">
              {practiceFocus.areas.map((area) => (
                <a href="/#expertise" key={area.title}>
                  {area.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Baro Kaydı & İletişim */}
          <div className={styles.column}>
            <span className={styles.columnHeader}>Avukat & İletişim</span>
            <div className={styles.metaList}>
              <span>{general.lawyerName}</span>
              <span>{general.barAssociation}</span>
              <span>{general.phone}</span>
              <span>{general.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Regulatory Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.regulatory}>
            {general.regulatoryNotice}
          </p>
          <div className={styles.copyNotice}>
            <span>
              &copy; {new Date().getFullYear()} {general.brandName} {general.brandSubtitle}. Tüm hakları saklıdır.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
