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
              Kuruculara, yönetim kurullarına ve yatırımcılara ticari uyuşmazlık ve birleşmelerde stratejik danışmanlık.
            </p>
          </div>

          {/* Column 2: Core Navigation */}
          <div className={styles.column}>
            <span className={styles.columnHeader}>Gezinti</span>
            <nav className={styles.links} aria-label="Footer navigasyonu">
              {navItems.map((item) => (
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
              {practiceAreas.map((area) => (
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
              <span>Av. Burak Berkay Özkan</span>
              <span>İstanbul Barosu</span>
              <span>+90 505 438 75 49</span>
              <span>avburakberkayozkan@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Regulatory Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.regulatory}>
            Özkan Hukuk & Danışmanlık — Av. Burak Berkay Özkan, İstanbul Barosu'na kayıtlı bağımsız bir avukattır.
            Bu internet sitesi Türkiye Barolar Birliği Avukatlık Reklam Yasağı Yönetmeliği'ne uygun olarak yalnızca bilgilendirme amacıyla hazırlanmıştır.
          </p>
          <div className={styles.legalMeta}>
            <span>&copy; {new Date().getFullYear()} Özkan Hukuk & Danışmanlık. Tüm hakları saklıdır.</span>
            <div className={styles.legalLinks}>
              <a href="#main-content">Gizlilik Bildirimi</a>
              <span aria-hidden="true">&bull;</span>
              <a href="#main-content">Danışmanlık Şartları</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
