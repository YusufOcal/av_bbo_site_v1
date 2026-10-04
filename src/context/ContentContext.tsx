import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { SiteContent } from "@/types/content";
import { defaultSiteContent } from "@/content/defaultContent";
import {
  fetchCloudContent,
  saveCloudContent,
  getCloudConfig
} from "@/services/cloudContent";

const STORAGE_KEY = "bbo_site_content_v1";

interface ContentContextType {
  content: SiteContent;
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
  updateEntireContent: (newContent: SiteContent) => void;
  resetToDefaults: () => void;
  exportContentAsJson: () => void;
  importContentFromJson: (jsonString: string) => boolean;
  hasCustomContent: boolean;
  isCloudConfigured: boolean;
  refreshFromCloud: () => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | null>(null);

function loadInitialContent(): SiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        general: { ...defaultSiteContent.general, ...parsed.general },
        whatsapp: { ...defaultSiteContent.whatsapp, ...parsed.whatsapp },
        navigation: {
          items: Array.isArray(parsed.navigation?.items)
            ? parsed.navigation.items
            : defaultSiteContent.navigation.items
        },
        hero: { ...defaultSiteContent.hero, ...parsed.hero },
        practiceFocus: {
          sectionTitle: parsed.practiceFocus?.sectionTitle ?? defaultSiteContent.practiceFocus.sectionTitle,
          sectionDescription: parsed.practiceFocus?.sectionDescription ?? defaultSiteContent.practiceFocus.sectionDescription,
          areas: Array.isArray(parsed.practiceFocus?.areas)
            ? parsed.practiceFocus.areas
            : defaultSiteContent.practiceFocus.areas
        },
        aboutPrinciples: {
          sectionTitle: parsed.aboutPrinciples?.sectionTitle ?? defaultSiteContent.aboutPrinciples.sectionTitle,
          paragraphs: Array.isArray(parsed.aboutPrinciples?.paragraphs)
            ? parsed.aboutPrinciples.paragraphs
            : defaultSiteContent.aboutPrinciples.paragraphs,
          principlesLabel: parsed.aboutPrinciples?.principlesLabel ?? defaultSiteContent.aboutPrinciples.principlesLabel,
          principles: Array.isArray(parsed.aboutPrinciples?.principles)
            ? parsed.aboutPrinciples.principles
            : defaultSiteContent.aboutPrinciples.principles
        },
        usefulLinks: {
          sectionTitle: parsed.usefulLinks?.sectionTitle ?? defaultSiteContent.usefulLinks.sectionTitle,
          sectionDescription: parsed.usefulLinks?.sectionDescription ?? defaultSiteContent.usefulLinks.sectionDescription,
          links: Array.isArray(parsed.usefulLinks?.links)
            ? parsed.usefulLinks.links
            : defaultSiteContent.usefulLinks.links
        },
        articlesSection: {
          homeTitle: parsed.articlesSection?.homeTitle ?? defaultSiteContent.articlesSection.homeTitle,
          viewAllLabel: parsed.articlesSection?.viewAllLabel ?? defaultSiteContent.articlesSection.viewAllLabel,
          pageTitle: parsed.articlesSection?.pageTitle ?? defaultSiteContent.articlesSection.pageTitle,
          pageDescription: parsed.articlesSection?.pageDescription ?? defaultSiteContent.articlesSection.pageDescription,
          categories: Array.isArray(parsed.articlesSection?.categories)
            ? parsed.articlesSection.categories
            : defaultSiteContent.articlesSection.categories,
          articles: Array.isArray(parsed.articlesSection?.articles)
            ? parsed.articlesSection.articles
            : defaultSiteContent.articlesSection.articles
        }
      };
    }
  } catch (e) {
    console.warn("Could not load stored content from localStorage, using defaults", e);
  }
  return defaultSiteContent;
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadInitialContent);
  const [hasCustomContent, setHasCustomContent] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  });
  const [isCloudConfigured, setIsCloudConfigured] = useState<boolean>(() => {
    return getCloudConfig().isConfigured;
  });

  // Background fetch from Supabase cloud on startup (non-blocking)
  useEffect(() => {
    fetchCloudContent().then((cloudData) => {
      if (cloudData) {
        setContent(cloudData);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          setHasCustomContent(true);
        } catch (e) {
          console.error("Failed to cache cloud content", e);
        }
      }
      setIsCloudConfigured(getCloudConfig().isConfigured);
    });
  }, []);

  // Cross-tab live synchronization: when another tab updates localStorage, update immediately
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            setContent(loadInitialContent());
            setHasCustomContent(true);
          } catch (err) {
            console.error("Storage sync failed", err);
          }
        } else {
          setContent(defaultSiteContent);
          setHasCustomContent(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sync to localStorage and cloud whenever content changes
  const saveToStorage = (newContent: SiteContent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
      setHasCustomContent(true);
    } catch (e) {
      console.error("Failed to save content to localStorage", e);
    }

    // Async cloud push
    saveCloudContent(newContent).catch((err) => {
      console.warn("Could not push update to cloud:", err);
    });
  };

  const updateSection = useCallback(
    <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
      setContent((prev) => {
        const next = { ...prev, [section]: data };
        saveToStorage(next);
        return next;
      });
    },
    []
  );

  const updateEntireContent = useCallback((newContent: SiteContent) => {
    setContent(newContent);
    saveToStorage(newContent);
  }, []);

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(defaultSiteContent);
    setHasCustomContent(false);
    saveCloudContent(defaultSiteContent).catch(() => {});
  }, []);

  const exportContentAsJson = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bbo_site_icerik_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [content]);

  const importContentFromJson = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === "object") {
        updateEntireContent({
          ...defaultSiteContent,
          ...parsed
        });
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON content", e);
    }
    return false;
  }, [updateEntireContent]);

  const refreshFromCloud = useCallback(async (): Promise<boolean> => {
    const cloudData = await fetchCloudContent();
    if (cloudData) {
      setContent(cloudData);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        setHasCustomContent(true);
      } catch (e) {
        console.error("Failed to cache cloud content", e);
      }
      setIsCloudConfigured(getCloudConfig().isConfigured);
      return true;
    }
    setIsCloudConfigured(getCloudConfig().isConfigured);
    return false;
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        updateSection,
        updateEntireContent,
        resetToDefaults,
        exportContentAsJson,
        importContentFromJson,
        hasCustomContent,
        isCloudConfigured,
        refreshFromCloud
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within a ContentProvider");
  }
  return ctx;
}
