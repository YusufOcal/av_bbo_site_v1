import { useState, useEffect } from "react";
import { BrandMark } from "@/components/BrandMark/BrandMark";
import { Container } from "@/components/Container/Container";
import { navItems } from "@/content/firm";
import styles from "./SiteHeader.module.css";

interface SiteHeaderProps {
  theme?: "light" | "navy";
}

export function SiteHeader({ theme = "light" }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Lock body scroll when mobile navigation is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu on pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const isNavy = theme === "navy";

  return (
    <header className={[styles.header, isNavy ? styles.headerNavy : ""].join(" ")}>
      <Container className={styles.inner} width="wide">
        <BrandMark tone={isNavy ? "light" : "dark"} />

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Ana navigasyon">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Contact: Phone + Email */}
        <div className={styles.contactGroup}>
          <a
            className={styles.contactPhone}
            href="tel:+905054387549"
            aria-label="Telefon: +90 505 438 75 49"
          >
            <svg
              className={styles.contactIcon}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+90 505 438 75 49</span>
          </a>
          <span className={styles.contactDivider} aria-hidden="true" />
          <a
            className={styles.contactEmail}
            href="mailto:avburakberkayozkan@gmail.com"
            aria-label="E-posta: avburakberkayozkan@gmail.com"
          >
            <svg
              className={styles.contactIcon}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>avburakberkayozkan@gmail.com</span>
          </a>
        </div>

        {/* Single Menu Toggle / Close Button (Mobile & Tablet) */}
        <button
          className={[styles.burger, isMenuOpen ? styles.burgerActive : ""].join(" ")}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-menu"
          className={[styles.drawer, isMenuOpen ? styles.drawerOpen : ""].join(" ")}
          aria-hidden={!isMenuOpen}
        >
          <Container className={styles.drawerInner} width="wide">
            <div className={styles.drawerHeader}>
              <BrandMark tone="light" />
            </div>
            <nav className={styles.drawerNav} aria-label="Mobil navigasyon">
              {navItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={closeMenu}
                  className={styles.drawerNavLink}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className={styles.drawerFooter}>
              <span className={styles.drawerLabel}>İletişim & Danışma</span>
              <a
                className={styles.drawerContact}
                href="tel:+905054387549"
                onClick={closeMenu}
              >
                +90 505 438 75 49
              </a>
              <a
                className={styles.drawerContact}
                href="mailto:avburakberkayozkan@gmail.com"
                onClick={closeMenu}
              >
                avburakberkayozkan@gmail.com
              </a>
            </div>
          </Container>
        </div>
      </Container>
    </header>
  );
}
