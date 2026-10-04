import type { SiteContent } from "@/types/content";

const STORAGE_SUPABASE_URL = "bbo_cloud_supabase_url";
const STORAGE_SUPABASE_KEY = "bbo_cloud_supabase_key";

export interface CloudConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  source: "env" | "storage" | "none";
}

/**
 * Returns current Supabase cloud configuration (env vars take precedence, falls back to localStorage)
 */
export function getCloudConfig(): CloudConfig {
  const envUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (envUrl && envKey) {
    return {
      url: envUrl.replace(/\/$/, ""),
      anonKey: envKey,
      isConfigured: true,
      source: "env"
    };
  }

  const storedUrl = localStorage.getItem(STORAGE_SUPABASE_URL)?.trim();
  const storedKey = localStorage.getItem(STORAGE_SUPABASE_KEY)?.trim();

  if (storedUrl && storedKey) {
    return {
      url: storedUrl.replace(/\/$/, ""),
      anonKey: storedKey,
      isConfigured: true,
      source: "storage"
    };
  }

  return {
    url: "",
    anonKey: "",
    isConfigured: false,
    source: "none"
  };
}

export function saveStoredCloudConfig(url: string, anonKey: string): void {
  const cleanUrl = url.trim().replace(/\/$/, "");
  const cleanKey = anonKey.trim();

  if (cleanUrl && cleanKey) {
    localStorage.setItem(STORAGE_SUPABASE_URL, cleanUrl);
    localStorage.setItem(STORAGE_SUPABASE_KEY, cleanKey);
  } else {
    localStorage.removeItem(STORAGE_SUPABASE_URL);
    localStorage.removeItem(STORAGE_SUPABASE_KEY);
  }
}

/**
 * Tests connection to Supabase PostgREST table 'site_content'
 */
export async function testCloudConnection(
  urlInput?: string,
  keyInput?: string
): Promise<{ success: boolean; message: string }> {
  const config = urlInput && keyInput
    ? { url: urlInput.trim().replace(/\/$/, ""), anonKey: keyInput.trim() }
    : getCloudConfig();

  if (!config.url || !config.anonKey) {
    return { success: false, message: "Supabase URL ve Anon Key tanımlanmamış." };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${config.url}/rest/v1/site_content?id=eq.main&select=id`, {
      method: "GET",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json"
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      return { success: true, message: "Bağlantı başarılı! Supabase veritabanı aktif." };
    }

    if (res.status === 404 || res.status === 400) {
      return {
        success: false,
        message: `Bağlantı kuruldu ancak 'site_content' tablosu bulunamadı (HTTP ${res.status}). Lütfen SQL tablosunu oluşturun.`
      };
    }

    if (res.status === 401 || res.status === 403) {
      return {
        success: false,
        message: "Yetkilendirme hatası (HTTP 401/403). Lütfen Anon Key bilginizi kontrol edin."
      };
    }

    return { success: false, message: `Sunucu yanıtı: HTTP ${res.status} ${res.statusText}` };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Bağlantı hatası: ${msg}` };
  }
}

/**
 * Loads latest content from Supabase cloud database
 */
export async function fetchCloudContent(): Promise<SiteContent | null> {
  const config = getCloudConfig();
  if (!config.isConfigured) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${config.url}/rest/v1/site_content?id=eq.main&select=data`, {
      method: "GET",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json"
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const rows = await res.json();
    if (Array.isArray(rows) && rows.length > 0 && rows[0]?.data) {
      return rows[0].data as SiteContent;
    }
  } catch (err) {
    console.warn("Could not fetch content from Supabase cloud:", err);
  }

  return null;
}

/**
 * Saves content to Supabase cloud database using upsert
 */
export async function saveCloudContent(content: SiteContent): Promise<boolean> {
  const config = getCloudConfig();
  if (!config.isConfigured) return false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${config.url}/rest/v1/site_content`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates"
      },
      body: JSON.stringify({
        id: "main",
        data: content,
        updated_at: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.error("Failed to save content to Supabase cloud:", err);
    return false;
  }
}
