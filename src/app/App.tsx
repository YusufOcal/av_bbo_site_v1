import { useState, useEffect, useCallback } from "react";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton/WhatsAppButton";
import { HomePage } from "@/features/home/HomePage";
import { ArticlesPage } from "@/features/articles/ArticlesPage";
import { ArticleDetailPage } from "@/features/articles/ArticleDetailPage";

type RouteState =
  | { type: "home" }
  | { type: "articles" }
  | { type: "article-detail"; slug: string };

function getRouteFromLocation(): RouteState {
  const path = window.location.pathname.toLowerCase();

  // Check for single article detail: /makale/:slug
  if (path.startsWith("/makale/")) {
    const slug = path.replace("/makale/", "").replace(/\/$/, "");
    if (slug) {
      return { type: "article-detail", slug };
    }
  }

  if (path.includes("makale") || path.includes("articles")) {
    return { type: "articles" };
  }

  return { type: "home" };
}

export function App() {
  const [route, setRoute] = useState<RouteState>(getRouteFromLocation);

  const handleNavigation = useCallback(() => {
    const nextRoute = getRouteFromLocation();
    setRoute(nextRoute);
  }, []);

  // Listen to popstate (back/forward) and hashchange
  useEffect(() => {
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("hashchange", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("hashchange", handleNavigation);
    };
  }, [handleNavigation]);

  // Global link click interceptor for smooth SPA experience without page reload
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      // Don't intercept if modified click (cmd, ctrl, shift, etc.) or right click
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return;
      }

      // Find closest <a> tag
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Handle internal paths
      if (href.startsWith("/")) {
        event.preventDefault();

        // Check if it's an anchor on home page like /#expertise, /#principles or /#useful-links
        if (href.startsWith("/#")) {
          const targetId = href.substring(2);
          if (route.type === "home") {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          } else {
            window.history.pushState({}, "", "/");
            setRoute({ type: "home" });
            setTimeout(() => {
              const el = document.getElementById(targetId);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
          return;
        }

        // Standard path navigation (e.g. /makaleler, /makale/..., or /)
        window.history.pushState({}, "", href);
        const nextRoute = getRouteFromLocation();
        setRoute(nextRoute);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        return;
      }

      // Handle simple hash links like #expertise, #principles, #useful-links
      if (href.startsWith("#")) {
        const targetId = href.substring(1);
        if (targetId === "main-content") {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          return;
        }

        if (route.type !== "home") {
          // If not on home, go home then scroll to anchor
          event.preventDefault();
          window.history.pushState({}, "", "/");
          setRoute({ type: "home" });
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [route]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Ana içeriğe atla
      </a>
      <SiteHeader theme={route.type === "home" ? "light" : "navy"} />
      {route.type === "home" && <HomePage />}
      {route.type === "articles" && <ArticlesPage />}
      {route.type === "article-detail" && <ArticleDetailPage slug={route.slug} />}
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
