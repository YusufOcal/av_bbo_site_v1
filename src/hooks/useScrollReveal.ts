import { useEffect } from "react";

/**
 * A lightweight, performance-focused hook for scroll-triggered section reveals.
 * Attaches a `data-reveal="true"` attribute when elements scroll into view.
 * Unobserves elements immediately upon entry to optimize memory & GPU usage.
 * Automatically respects `prefers-reduced-motion`.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Skip observer if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "true");
            // Unobserve after initial reveal for maximum performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    const revealElements = document.querySelectorAll("[data-reveal]");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}
