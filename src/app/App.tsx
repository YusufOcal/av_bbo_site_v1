import { useState, useEffect, useCallback } from "react";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton/WhatsAppButton";
import { HomePage } from "@/features/home/HomePage";
import { ArticlesPage } from "@/features/articles/ArticlesPage";
import { ArticleDetailPage } from "@/features/articles/ArticleDetailPage";
import { AdminPage } from "@/features/admin/AdminPage";
import { ContentProvider } from "@/context/ContentContext";

type RouteState =
  | { type: "home" }
  | { type: "articles" }
  | { type: "article-detail"; slug: string }
  | { type: "admin" };

function getRouteFromLocation(): RouteState {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // 1. Secret Admin route: /bbolegal-adminpanel or #bbolegal-adminpanel
  if (
    path === "/bbolegal-adminpanel" ||
    path.startsWith("/bbolegal-adminpanel/") ||
    hash === "#bbolegal-adminpanel"
  ) {
    return { type: "admin" };
  }

  // 2. Articles list: /makaleler or /articles
  if (
    path === "/makaleler" ||
    path === "/makaleler/" ||
    path === "/articles" ||
    path === "/articles/" ||
    hash === "#makaleler"
  ) {
    return { type: "articles" };
  }

  // 3. Single article detail: MUST start with /makale/ and have a slug
  if (path.startsWith("/makale/")) {
    const raw = path.slice(8).replace(/\/$/, "").trim(); // removes "/makale/"
    if (raw) {
      try {
        const slug = decodeURIComponent(raw);
        return { type: "article-detail", slug };
      } catch {
        return { type: "article-detail", slug: raw };
      }
    }
    return { type: "articles" };
  }

  return { type: "home" };
}

function MainAppShell() {
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

        // Standard path navigation (e.g. /admin, /makaleler, /makale/..., or /)
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

        if (targetId === "bbolegal-adminpanel") {
          setRoute({ type: "admin" });
          return;
        }

        if (route.type !== "home") {
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

  if (route.type === "admin") {
    return <AdminPage />;
  }

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

export function App() {
  return (
    <ContentProvider>
      <MainAppShell />
    </ContentProvider>
  );
}
