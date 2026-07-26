import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { AboutPage } from "@/features/about/AboutPage";
import { HomePage } from "@/features/home/HomePage";

export function App() {
  const [route, setRoute] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === "/about" || hash === "#about" || hash.startsWith("#about")) {
        return "about";
      }
    }
    return "home";
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === "/about" || hash === "#about" || hash.startsWith("#about")) {
        setRoute("about");
      } else {
        setRoute("home");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      {route === "about" ? <AboutPage /> : <HomePage />}
      <SiteFooter />
    </div>
  );
}
