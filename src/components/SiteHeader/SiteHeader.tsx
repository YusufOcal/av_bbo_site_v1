import { useState, useEffect } from "react";
import { BrandMark } from "@/components/BrandMark/BrandMark";
import { Container } from "@/components/Container/Container";
import { navItems } from "@/content/firm";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
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

  return (
    <header className={styles.header}>
      <Container className={styles.inner} width="wide">
        <BrandMark />

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.contact} href="mailto:contact@bbolegal.com">
          contact@bbolegal.com
        </a>

        {/* Menu Toggle Button (Mobile & Tablet) */}
        <button
          className={[styles.burger, isMenuOpen ? styles.burgerActive : ""].join(" ")}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
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
              <BrandMark tone="dark" />
            </div>
            <nav className={styles.drawerNav} aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a href={item.href} key={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className={styles.drawerFooter}>
              <span className={styles.drawerLabel}>Confidential Inquiries</span>
              <a className={styles.drawerContact} href="mailto:contact@bbolegal.com">
                contact@bbolegal.com
              </a>
              <div className={styles.drawerLocations}>
                <span>Istanbul</span>
                <span>London aligned</span>
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </header>
  );
}
