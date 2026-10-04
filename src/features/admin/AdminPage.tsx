import { useState, useEffect } from "react";
import { useSiteContent } from "@/context/ContentContext";
import type { SiteContent, PracticeArea, Principle, UsefulLink, ArticleItem } from "@/types/content";
import {
  getCloudConfig,
  saveStoredCloudConfig,
  testCloudConnection,
  saveCloudContent,
  type CloudConfig
} from "@/services/cloudContent";
import styles from "./AdminPage.module.css";

const ADMIN_STORAGE_KEY = "bbo_admin_auth";
const DEFAULT_PASSCODE_HASH =
  import.meta.env.VITE_ADMIN_HASH ||
  "786190187ca7cfd981279b3f4429133234560f405b81ea7a47b00aec83f1a742";
const CUSTOM_HASH_KEY = "bbo_admin_custom_passcode_hash";
const FAILED_ATTEMPTS_KEY = "bbo_admin_failed_attempts";
const LOCKOUT_UNTIL_KEY = "bbo_admin_lockout_until";
const LAST_ACTIVITY_KEY = "bbo_admin_last_activity";
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 dakika kilit
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 dakika hareketsizlik

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type ActiveTab =
  | "general"
  | "navigation"
  | "hero"
  | "practiceFocus"
  | "aboutPrinciples"
  | "articles"
  | "usefulLinks"
  | "backup";

function slugify(text: string): string {
  return text
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/ı/g, "i")
    .replace(/Ğ/g, "g")
    .replace(/ğ/g, "g")
    .replace(/Ü/g, "u")
    .replace(/ü/g, "u")
    .replace(/Ş/g, "s")
    .replace(/ş/g, "s")
    .replace(/Ö/g, "o")
    .replace(/ö/g, "o")
    .replace(/Ç/g, "c")
    .replace(/ç/g, "c")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminPage() {
  const {
    content,
    updateEntireContent,
    resetToDefaults,
    exportContentAsJson,
    importContentFromJson,
    refreshFromCloud
  } = useSiteContent();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const isAuth = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    if (!isAuth) return false;
    const lastActivity = Number(sessionStorage.getItem(LAST_ACTIVITY_KEY) || "0");
    if (lastActivity > 0 && Date.now() - lastActivity > INACTIVITY_TIMEOUT_MS) {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
      sessionStorage.removeItem(LAST_ACTIVITY_KEY);
      return false;
    }
    return true;
  });

  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("general");
  const [localState, setLocalState] = useState<SiteContent>(content);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean>(() => {
    return localStorage.getItem("bbo_admin_autosave") !== "false";
  });
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "article" | "area" | "link" | "reset";
    index: number;
    title: string;
  } | null>(null);

  // Lockout countdown state
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(() => {
    const until = Number(localStorage.getItem(LOCKOUT_UNTIL_KEY) || "0");
    return Math.max(0, Math.ceil((until - Date.now()) / 1000));
  });

  // Cloud Config State
  const [cloudConfig, setCloudConfig] = useState<CloudConfig>(getCloudConfig);
  const [cloudUrlInput, setCloudUrlInput] = useState(cloudConfig.url);
  const [cloudKeyInput, setCloudKeyInput] = useState(cloudConfig.anonKey);
  const [isTestingCloud, setIsTestingCloud] = useState(false);
  const [cloudTestResult, setCloudTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // New Passcode Form State
  const [newPasscode, setNewPasscode] = useState("");
  const [newPasscodeConfirm, setNewPasscodeConfirm] = useState("");

  const isDirty = JSON.stringify(localState) !== JSON.stringify(content);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(LOCKOUT_UNTIL_KEY);
          localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  // Inactivity tracking (30 minutes auto-logout)
  useEffect(() => {
    if (!isAuthenticated) return;

    let lastRecorded = Date.now();
    sessionStorage.setItem(LAST_ACTIVITY_KEY, String(lastRecorded));

    const updateActivity = () => {
      const now = Date.now();
      if (now - lastRecorded > 10000) {
        lastRecorded = now;
        sessionStorage.setItem(LAST_ACTIVITY_KEY, String(now));
      }
    };

    const interval = setInterval(() => {
      const storedLast = Number(sessionStorage.getItem(LAST_ACTIVITY_KEY) || "0");
      if (storedLast > 0 && Date.now() - storedLast > INACTIVITY_TIMEOUT_MS) {
        handleLogout("Oturumunuz 30 dakika hareketsizlik nedeniyle güvenlik gerekçesiyle sonlandırıldı.");
      }
    }, 15000);

    window.addEventListener("mousemove", updateActivity, { passive: true });
    window.addEventListener("keydown", updateActivity, { passive: true });
    window.addEventListener("click", updateActivity, { passive: true });
    window.addEventListener("scroll", updateActivity, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, [isAuthenticated]);

  // Sync with external updates if not dirty
  useEffect(() => {
    setLocalState((prev) => {
      const prevDirty = JSON.stringify(prev) !== JSON.stringify(content);
      return prevDirty ? prev : content;
    });
  }, [content]);

  // Debounced auto-save
  useEffect(() => {
    if (!autoSaveEnabled) {
      setSaveStatus(isDirty ? "unsaved" : "saved");
      return;
    }

    if (!isDirty) {
      setSaveStatus("saved");
      return;
    }

    setSaveStatus("saving");
    const timer = setTimeout(() => {
      updateEntireContent(localState);
      setSaveStatus("saved");
    }, 700);

    return () => clearTimeout(timer);
  }, [localState, isDirty, autoSaveEnabled, updateEntireContent]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const lockoutUntil = Number(localStorage.getItem(LOCKOUT_UNTIL_KEY) || "0");
    if (Date.now() < lockoutUntil) {
      const remSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setLockoutRemaining(remSec);
      setAuthError(`Çok fazla hatalı deneme yapıldı! Lütfen ${Math.floor(remSec / 60)} dk ${remSec % 60} sn bekleyiniz.`);
      return;
    }

    const trimmed = passcode.trim();
    if (!trimmed) {
      setAuthError("Lütfen yönetici şifrenizi giriniz.");
      return;
    }

    const hashedInput = await sha256(trimmed);
    const storedCustom = localStorage.getItem(CUSTOM_HASH_KEY);
    const isValid = hashedInput === DEFAULT_PASSCODE_HASH || (storedCustom ? hashedInput === storedCustom : false);

    if (isValid) {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      sessionStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
      localStorage.removeItem(LOCKOUT_UNTIL_KEY);
      setIsAuthenticated(true);
      setAuthError("");
      setPasscode("");
    } else {
      const currentFails = Number(localStorage.getItem(FAILED_ATTEMPTS_KEY) || "0") + 1;
      localStorage.setItem(FAILED_ATTEMPTS_KEY, String(currentFails));

      if (currentFails >= MAX_FAILED_ATTEMPTS) {
        const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem(LOCKOUT_UNTIL_KEY, String(lockUntil));
        setLockoutRemaining(Math.ceil(LOCKOUT_DURATION_MS / 1000));
        setAuthError("5 kez hatalı şifre girildi! Güvenlik nedeniyle giriş 15 dakika boyunca kilitlendi.");
      } else {
        const remainingTries = MAX_FAILED_ATTEMPTS - currentFails;
        setAuthError(`Hatalı şifre. Kalan deneme hakkınız: ${remainingTries}`);
      }
    }
  };

  const handleLogout = (customMsg?: string) => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    sessionStorage.removeItem(LAST_ACTIVITY_KEY);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    setIsAuthenticated(false);
    if (customMsg) {
      setAuthError(customMsg);
    }
  };

  const handleChangePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) {
      showToast("Lütfen yeni bir şifre giriniz.");
      return;
    }
    if (newPasscode.trim().length < 6) {
      showToast("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }
    if (newPasscode !== newPasscodeConfirm) {
      showToast("Girdiğiniz yeni şifreler eşleşmiyor!");
      return;
    }

    const newHash = await sha256(newPasscode.trim());
    localStorage.setItem(CUSTOM_HASH_KEY, newHash);
    setNewPasscode("");
    setNewPasscodeConfirm("");
    showToast("✓ Yönetici şifreniz başarıyla güncellendi! Yeni şifreniz kaydedildi.");
  };

  const handleSaveAll = () => {
    updateEntireContent(localState);
    setSaveStatus("saved");
    showToast("✓ Tüm değişiklikler başarıyla kaydedildi ve sitede yayına alındı!");
  };

  const handleRevert = () => {
    if (window.confirm("Kaydedilmemiş değişiklikleri geri almak istediğinize emin misiniz?")) {
      setLocalState(content);
      setSaveStatus("saved");
      showToast("Değişiklikler son kaydedilen haline geri alındı.");
    }
  };

  const handleToggleAutoSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setAutoSaveEnabled(val);
    localStorage.setItem("bbo_admin_autosave", String(val));
    if (val && isDirty) {
      updateEntireContent(localState);
      setSaveStatus("saved");
      showToast("✓ Otomatik kaydetme aktif edildi ve değişiklikler kaydedildi!");
    }
  };

  const handleSaveCloudConfig = () => {
    saveStoredCloudConfig(cloudUrlInput.trim(), cloudKeyInput.trim());
    setCloudConfig(getCloudConfig());
    showToast("✓ Bulut veritabanı ayarları başarıyla kaydedildi!");
  };

  const handleTestCloud = async () => {
    setIsTestingCloud(true);
    setCloudTestResult(null);
    try {
      const res = await testCloudConnection(cloudUrlInput.trim(), cloudKeyInput.trim());
      setCloudTestResult(res);
      if (res.success) {
        showToast("✓ Bulut veritabanı bağlantısı başarılı!");
      }
    } catch {
      setCloudTestResult({
        success: false,
        message: "Bağlantı sırasında beklenmeyen bir hata oluştu."
      });
    } finally {
      setIsTestingCloud(false);
    }
  };

  const handlePushToCloud = async () => {
    setIsTestingCloud(true);
    try {
      const ok = await saveCloudContent(localState);
      if (ok) {
        showToast("✓ Tüm site içerikleri başarıyla Supabase bulut veritabanına yüklendi!");
      } else {
        showToast("❌ Buluta yükleme başarısız. Lütfen URL ve Anon Key ayarlarınızı kontrol ediniz.");
      }
    } finally {
      setIsTestingCloud(false);
    }
  };

  const handlePullFromCloud = async () => {
    setIsTestingCloud(true);
    try {
      const ok = await refreshFromCloud();
      if (ok) {
        showToast("✓ En güncel içerikler bulut veritabanından çekildi ve uygulandı!");
      } else {
        showToast("⚠️ Buluttan veri çekilemedi. Veritabanının boş olmadığından emin olunuz.");
      }
    } finally {
      setIsTestingCloud(false);
    }
  };

  const handleAddArticle = () => {
    const timestamp = Date.now();
    const newArt: ArticleItem = {
      id: `art-${timestamp}`,
      slug: `yeni-makale-${timestamp}`,
      category: "Hukuk & Danışmanlık",
      date: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
      title: "Yeni Hukuki İnceleme Başlığı",
      readTime: "5 dk okuma",
      summary: "Makalenin kısa ve dikkat çekici özeti buraya yazılacaktır.",
      author: localState.general.lawyerName || "Av. Burak Berkay Özkan",
      tags: ["Hukuk", "Danışmanlık"],
      keyTakeaways: ["Önemli çıkarım maddesi 1", "Önemli çıkarım maddesi 2"],
      contentParagraphs: [
        "Makalenin ilk giriş paragrafı buraya yazılacaktır.",
        "Makalenin detay ve analiz içeren ikinci paragrafı buraya yazılacaktır."
      ]
    };
    const updated = [...localState.articlesSection.articles, newArt];
    const nextState = {
      ...localState,
      articlesSection: { ...localState.articlesSection, articles: updated }
    };
    setLocalState(nextState);
    updateEntireContent(nextState);
    setSaveStatus("saved");
    showToast("✓ Yeni makale eklendi ve yayına alındı!");
    setTimeout(() => {
      const el = document.getElementById(`art-card-${newArt.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = el.querySelector("input");
        if (input) input.focus();
      }
    }, 120);
  };

  const confirmDeleteArticle = (idx: number) => {
    const updated = localState.articlesSection.articles.filter((_, i) => i !== idx);
    const nextState = {
      ...localState,
      articlesSection: { ...localState.articlesSection, articles: updated }
    };
    setLocalState(nextState);
    updateEntireContent(nextState);
    setSaveStatus("saved");
    setDeleteConfirm(null);
    showToast("✓ Makale silindi ve siteden kaldırıldı!");
  };

  const confirmDeletePracticeArea = (idx: number) => {
    const updated = localState.practiceFocus.areas.filter((_, i) => i !== idx);
    const nextState = {
      ...localState,
      practiceFocus: { ...localState.practiceFocus, areas: updated }
    };
    setLocalState(nextState);
    updateEntireContent(nextState);
    setSaveStatus("saved");
    setDeleteConfirm(null);
    showToast("✓ Faaliyet alanı silindi ve kaydedildi!");
  };

  const confirmDeleteUsefulLink = (idx: number) => {
    const updated = localState.usefulLinks.links.filter((_, i) => i !== idx);
    const nextState = {
      ...localState,
      usefulLinks: { ...localState.usefulLinks, links: updated }
    };
    setLocalState(nextState);
    updateEntireContent(nextState);
    setSaveStatus("saved");
    setDeleteConfirm(null);
    showToast("✓ Bağlantı silindi ve kaydedildi!");
  };

  const confirmResetToDefaults = () => {
    resetToDefaults();
    setDeleteConfirm(null);
    showToast("✓ Tüm içerikler orijinal haline sıfırlandı!");
    setTimeout(() => window.location.reload(), 600);
  };

  const handleGenerateArticleSlug = (idx: number) => {
    const art = localState.articlesSection.articles[idx];
    if (!art.title.trim()) {
      showToast("Lütfen önce makale başlığını giriniz.");
      return;
    }
    const cleanSlug = slugify(art.title);
    const updated = [...localState.articlesSection.articles];
    updated[idx] = { ...updated[idx], slug: cleanSlug };
    const nextState = {
      ...localState,
      articlesSection: { ...localState.articlesSection, articles: updated }
    };
    setLocalState(nextState);
    updateEntireContent(nextState);
    setSaveStatus("saved");
    showToast(`✓ Slug güncellendi: ${cleanSlug}`);
  };

  const handleAddPracticeArea = () => {
    const newArea: PracticeArea = {
      eyebrow: `0${localState.practiceFocus.areas.length + 1}`,
      title: "Yeni Faaliyet Alanı",
      copy: "Faaliyet alanının genel açıklama metni buraya yazılacaktır.",
      capabilities: ["Uzmanlık Maddesi 1", "Uzmanlık Maddesi 2"]
    };
    const updated = [...localState.practiceFocus.areas, newArea];
    const nextState = {
      ...localState,
      practiceFocus: { ...localState.practiceFocus, areas: updated }
    };
    setLocalState(nextState);
    updateEntireContent(nextState);
    setSaveStatus("saved");
    showToast("✓ Yeni faaliyet alanı eklendi ve kaydedildi!");
    setTimeout(() => {
      const el = document.getElementById(`area-card-${updated.length - 1}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = el.querySelector("input");
        if (input) input.focus();
      }
    }, 120);
  };

  const handleAddUsefulLink = () => {
    const newLink: UsefulLink = {
      category: "Kurumsal",
      title: "Yeni Bağlantı Başlığı",
      url: "https://",
      desc: "Bağlantı hakkında kısa bilgilendirme metni."
    };
    const updated = [...localState.usefulLinks.links, newLink];
    const nextState = {
      ...localState,
      usefulLinks: { ...localState.usefulLinks, links: updated }
    };
    setLocalState(nextState);
    updateEntireContent(nextState);
    setSaveStatus("saved");
    showToast("✓ Yeni bağlantı eklendi ve kaydedildi!");
    setTimeout(() => {
      const el = document.getElementById(`link-card-${updated.length - 1}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = el.querySelector("input");
        if (input) input.focus();
      }
    }, 120);
  };

  // Auth gate
  if (!isAuthenticated) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1 className={styles.authTitle}>BBO Legal Yönetim Paneli</h1>
            <p className={styles.authSubtitle}>Site içeriklerini düzenlemek için giriş yapınız</p>
          </div>

          <form onSubmit={handleLogin} className={styles.authForm}>
            {authError && <div className={styles.errorBanner}>{authError}</div>}

            {lockoutRemaining > 0 && (
              <div
                style={{
                  padding: "12px 16px",
                  backgroundColor: "rgba(220, 38, 38, 0.15)",
                  border: "1px solid rgba(220, 38, 38, 0.4)",
                  color: "#fca5a5",
                  fontSize: "var(--text-13)",
                  lineHeight: "1.5"
                }}
              >
                🔒 <strong>Giriş Kilitlendi:</strong> Çok sayıda başarısız deneme nedeniyle sistem korumaya alındı.<br />
                Kalan Bekleme Süresi: <strong>{Math.floor(lockoutRemaining / 60)} dk {lockoutRemaining % 60} sn</strong>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>Yönetici Şifresi</label>
              <input
                type="password"
                className={styles.input}
                placeholder={lockoutRemaining > 0 ? "Kilit açılana kadar bekleniyor..." : "Şifrenizi giriniz"}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                disabled={lockoutRemaining > 0}
                autoFocus
              />
            </div>

            <button
              type="submit"
              className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
              disabled={lockoutRemaining > 0}
              style={lockoutRemaining > 0 ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            >
              {lockoutRemaining > 0 ? `Kilitli (${lockoutRemaining}s)` : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminWrapper}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <div className={styles.brandInfo}>
          <span className={styles.brandTitle}>BBO Legal Yönetim</span>
          <span className={styles.brandBadge}>Canlı Mod</span>
          <div className={styles.statusIndicator} style={{ marginLeft: "var(--space-12)" }}>
            {saveStatus === "saved" && (
              <>
                <span className={styles.statusDotSaved} aria-hidden="true" />
                <span style={{ color: "#10b981", fontSize: "var(--text-12)" }}>Canlıda Yayında</span>
              </>
            )}
            {saveStatus === "saving" && (
              <>
                <span className={styles.statusDotSaving} aria-hidden="true" />
                <span style={{ color: "#f59e0b", fontSize: "var(--text-12)" }}>Kaydediliyor...</span>
              </>
            )}
            {saveStatus === "unsaved" && (
              <>
                <span className={styles.statusDotUnsaved} aria-hidden="true" />
                <span style={{ color: "var(--color-brass-soft)", fontSize: "var(--text-12)" }}>Kaydedilmemiş Değişiklik</span>
              </>
            )}
          </div>
        </div>

        <div className={styles.topActions}>
          <label className={styles.toggleLabel} style={{ marginRight: "var(--space-8)" }}>
            <input
              type="checkbox"
              className={styles.toggleCheckbox}
              checked={autoSaveEnabled}
              onChange={handleToggleAutoSave}
            />
            <span>⚡ Otomatik Kaydet</span>
          </label>

          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
            Siteyi Yeni Sekmede Gör ↗
          </a>
          <button onClick={handleSaveAll} className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}>
            💾 Değişiklikleri Kaydet & Yayınla
          </button>
          <button onClick={() => handleLogout()} className={styles.actionBtn}>
            Çıkış Yap
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebarNav}>
          <button
            className={[styles.navTab, activeTab === "general" ? styles.navTabActive : ""].join(" ")}
            onClick={() => setActiveTab("general")}
          >
            🏛️ Genel & İletişim
          </button>
          <button
            className={[styles.navTab, activeTab === "navigation" ? styles.navTabActive : ""].join(" ")}
            onClick={() => setActiveTab("navigation")}
          >
            🧭 Menü Linkleri
          </button>
          <button
            className={[styles.navTab, activeTab === "hero" ? styles.navTabActive : ""].join(" ")}
            onClick={() => setActiveTab("hero")}
          >
            🎯 Giriş (Hero)
          </button>
          <button
            className={[styles.navTab, activeTab === "practiceFocus" ? styles.navTabActive : ""].join(" ")}
            onClick={() => setActiveTab("practiceFocus")}
          >
            ⚖️ Faaliyet Alanları
          </button>
          <button
            className={[styles.navTab, activeTab === "aboutPrinciples" ? styles.navTabActive : ""].join(" ")}
            onClick={() => setActiveTab("aboutPrinciples")}
          >
            📜 İlkelerimiz & Vizyon
          </button>
          <button
            className={[styles.navTab, activeTab === "articles" ? styles.navTabActive : ""].join(" ")}
            onClick={() => setActiveTab("articles")}
          >
            ✍️ Makaleler ({localState.articlesSection.articles.length})
          </button>
          <button
            className={[styles.navTab, activeTab === "usefulLinks" ? styles.navTabActive : ""].join(" ")}
            onClick={() => setActiveTab("usefulLinks")}
          >
            🔗 Faydalı Bağlantılar
          </button>
          <button
            className={[styles.navTab, activeTab === "backup" ? styles.navTabActive : ""].join(" ")}
            onClick={() => setActiveTab("backup")}
          >
            ☁️ Bulut & Güvenlik
          </button>
        </aside>

        {/* Content Area */}
        <main className={styles.contentArea}>
          {/* TAB 1: GENEL & İLETİŞİM */}
          {activeTab === "general" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <h2 className={styles.sectionTitle}>Genel Bilgiler & İletişim</h2>
                  <p className={styles.sectionDesc}>Logo isimleri, avukat bilgileri ve WhatsApp ayarları</p>
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Logo Ana Başlık</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.general.brandName}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        general: { ...localState.general, brandName: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Logo Alt Başlık</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.general.brandSubtitle}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        general: { ...localState.general, brandSubtitle: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Avukat Adı Soyadı</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.general.lawyerName}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        general: { ...localState.general, lawyerName: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Baro Kaydı</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.general.barAssociation}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        general: { ...localState.general, barAssociation: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Telefon Numarası (Görünen)</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.general.phone}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        general: { ...localState.general, phone: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>E-Posta Adresi</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={localState.general.email}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        general: { ...localState.general, email: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Altbilgi (Footer) Kısa Açıklaması</label>
                <textarea
                  className={styles.textarea}
                  value={localState.general.addressPremise}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      general: { ...localState.general, addressPremise: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Resmi Mevzuat & Barolar Birliği Uyarısı</label>
                <textarea
                  className={styles.textarea}
                  value={localState.general.regulatoryNotice}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      general: { ...localState.general, regulatoryNotice: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.sectionHeading} style={{ marginTop: "var(--space-20)" }}>
                <div>
                  <h3 className={styles.sectionTitle} style={{ fontSize: "var(--text-20)" }}>
                    WhatsApp Butonu Ayarları
                  </h3>
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>WhatsApp Numarası (Ülke kodlu, boşluksuz)</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.whatsapp.phoneNumber}
                    placeholder="905051234567"
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        whatsapp: { ...localState.whatsapp, phoneNumber: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>WhatsApp Buton İpucu Yazısı</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.whatsapp.tooltipText}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        whatsapp: { ...localState.whatsapp, tooltipText: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>WhatsApp Otomatik Başlangıç Mesajı</label>
                <input
                  type="text"
                  className={styles.input}
                  value={localState.whatsapp.defaultMessage}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      whatsapp: { ...localState.whatsapp, defaultMessage: e.target.value }
                    })
                  }
                />
              </div>
            </>
          )}

          {/* TAB 2: MENÜ LİNKLERİ */}
          {activeTab === "navigation" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <h2 className={styles.sectionTitle}>Menü Navigasyon Linkleri</h2>
                  <p className={styles.sectionDesc}>Sitenin en üstünde yer alan menü linklerinin isimleri ve hedefleri</p>
                </div>
              </div>

              {localState.navigation.items.map((item, idx) => (
                <div key={idx} className={styles.itemCard}>
                  <div className={styles.itemCardHeader}>
                    <span className={styles.itemBadge}>Menü #{idx + 1}</span>
                  </div>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Menü Yazısı</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={item.label}
                        onChange={(e) => {
                          const updated = [...localState.navigation.items];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setLocalState({
                            ...localState,
                            navigation: { items: updated }
                          });
                        }}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Hedef Link</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={item.href}
                        onChange={(e) => {
                          const updated = [...localState.navigation.items];
                          updated[idx] = { ...updated[idx], href: e.target.value };
                          setLocalState({
                            ...localState,
                            navigation: { items: updated }
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* TAB 3: HERO */}
          {activeTab === "hero" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <h2 className={styles.sectionTitle}>Karşılama Alanı (Hero)</h2>
                  <p className={styles.sectionDesc}>Site açıldığında ilk görünen büyük başlık ve spot metinleri</p>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Büyük Karşılama Başlığı (H1)</label>
                <textarea
                  className={styles.textarea}
                  value={localState.hero.title}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      hero: { ...localState.hero, title: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Alt Açıklama Spot Paragrafı</label>
                <textarea
                  className={styles.textarea}
                  value={localState.hero.description}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      hero: { ...localState.hero, description: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Buton Üzerindeki Yazı</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.hero.buttonLabel}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        hero: { ...localState.hero, buttonLabel: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Butonun Gideceği Link</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.hero.buttonHref}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        hero: { ...localState.hero, buttonHref: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* TAB 4: FAALİYET ALANLARI */}
          {activeTab === "practiceFocus" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <h2 className={styles.sectionTitle}>Faaliyet Alanlarımız</h2>
                  <p className={styles.sectionDesc}>Uzmanlık alanlarının başlıkları, özetleri ve yetkinlik maddeleri</p>
                </div>
                <button
                  type="button"
                  className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
                  onClick={handleAddPracticeArea}
                >
                  + Yeni Alan Ekle
                </button>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bölüm Sol Manşet Başlığı</label>
                <textarea
                  className={styles.textarea}
                  value={localState.practiceFocus.sectionTitle}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      practiceFocus: { ...localState.practiceFocus, sectionTitle: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bölüm Sol Açıklaması</label>
                <textarea
                  className={styles.textarea}
                  value={localState.practiceFocus.sectionDescription}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      practiceFocus: { ...localState.practiceFocus, sectionDescription: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.sectionHeading} style={{ marginTop: "var(--space-20)" }}>
                <h3 className={styles.sectionTitle} style={{ fontSize: "var(--text-20)" }}>
                  Alan Listesi ({localState.practiceFocus.areas.length})
                </h3>
              </div>

              {localState.practiceFocus.areas.map((area, idx) => (
                <div key={idx} id={`area-card-${idx}`} className={styles.itemCard}>
                  <div className={styles.itemCardHeader}>
                    <span className={styles.itemBadge}>Alan #{idx + 1} ({area.eyebrow})</span>
                    {deleteConfirm?.type === "area" && deleteConfirm.index === idx ? (
                      <div className={styles.confirmBox}>
                        <span className={styles.confirmText}>Bu alan silinsin mi?</span>
                        <button
                          type="button"
                          className={[styles.actionBtn, styles.deleteBtnConfirm].join(" ")}
                          onClick={() => confirmDeletePracticeArea(idx)}
                        >
                          ✓ Evet, Sil
                        </button>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          style={{ padding: "3px 8px", fontSize: "11px" }}
                          onClick={() => setDeleteConfirm(null)}
                        >
                          ✕ Vazgeç
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => setDeleteConfirm({ type: "area", index: idx, title: area.title })}
                      >
                        Sil
                      </button>
                    )}
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Numara / Etiket (örn: 01)</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={area.eyebrow}
                        onChange={(e) => {
                          const updated = [...localState.practiceFocus.areas];
                          updated[idx] = { ...updated[idx], eyebrow: e.target.value };
                          setLocalState({
                            ...localState,
                            practiceFocus: { ...localState.practiceFocus, areas: updated }
                          });
                        }}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Alan Başlığı</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={area.title}
                        onChange={(e) => {
                          const updated = [...localState.practiceFocus.areas];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setLocalState({
                            ...localState,
                            practiceFocus: { ...localState.practiceFocus, areas: updated }
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Açıklama Metni</label>
                    <textarea
                      className={styles.textarea}
                      value={area.copy}
                      onChange={(e) => {
                        const updated = [...localState.practiceFocus.areas];
                        updated[idx] = { ...updated[idx], copy: e.target.value };
                        setLocalState({
                          ...localState,
                          practiceFocus: { ...localState.practiceFocus, areas: updated }
                        });
                      }}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Yetkinlik Maddeleri (Her satıra bir madde yazınız)</label>
                    <textarea
                      className={styles.textarea}
                      value={area.capabilities.join("\n")}
                      onChange={(e) => {
                        const updated = [...localState.practiceFocus.areas];
                        updated[idx] = {
                          ...updated[idx],
                          capabilities: e.target.value.split("\n").filter((line) => line.trim().length > 0)
                        };
                        setLocalState({
                          ...localState,
                          practiceFocus: { ...localState.practiceFocus, areas: updated }
                        });
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className={styles.addBtn}
                onClick={handleAddPracticeArea}
              >
                + Yeni Faaliyet Alanı Ekle
              </button>
            </>
          )}

          {/* TAB 5: İLKELERİMİZ */}
          {activeTab === "aboutPrinciples" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <h2 className={styles.sectionTitle}>Hakkımızda & Çalışma İlkeleri</h2>
                  <p className={styles.sectionDesc}>Sol taraftaki anlatı paragrafları ve sağdaki 4 temel ilke</p>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bölüm Sol Ana Başlığı</label>
                <textarea
                  className={styles.textarea}
                  value={localState.aboutPrinciples.sectionTitle}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      aboutPrinciples: { ...localState.aboutPrinciples, sectionTitle: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Sol Kolon Anlatı Paragrafları (Her satıra veya boşlukla)</label>
                {localState.aboutPrinciples.paragraphs.map((p, pIdx) => (
                  <div key={pIdx} style={{ marginBottom: "8px" }}>
                    <span className={styles.hint}>Paragraf #{pIdx + 1}</span>
                    <textarea
                      className={styles.textarea}
                      value={p}
                      onChange={(e) => {
                        const updated = [...localState.aboutPrinciples.paragraphs];
                        updated[pIdx] = e.target.value;
                        setLocalState({
                          ...localState,
                          aboutPrinciples: { ...localState.aboutPrinciples, paragraphs: updated }
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.sectionHeading} style={{ marginTop: "var(--space-20)" }}>
                <h3 className={styles.sectionTitle} style={{ fontSize: "var(--text-20)" }}>
                  İlkeler (Romen Rakamlı Kolonlar)
                </h3>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Sağ Kolon Üst Etiketi</label>
                <input
                  type="text"
                  className={styles.input}
                  value={localState.aboutPrinciples.principlesLabel}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      aboutPrinciples: { ...localState.aboutPrinciples, principlesLabel: e.target.value }
                    })
                  }
                />
              </div>

              {localState.aboutPrinciples.principles.map((pr, idx) => (
                <div key={idx} className={styles.itemCard}>
                  <div className={styles.itemCardHeader}>
                    <span className={styles.itemBadge}>İlke #{idx + 1} ({pr.id})</span>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Rakam / İşaret (örn: I, II, III, IV)</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={pr.id}
                        onChange={(e) => {
                          const updated = [...localState.aboutPrinciples.principles];
                          updated[idx] = { ...updated[idx], id: e.target.value };
                          setLocalState({
                            ...localState,
                            aboutPrinciples: { ...localState.aboutPrinciples, principles: updated }
                          });
                        }}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>İlke Başlığı</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={pr.title}
                        onChange={(e) => {
                          const updated = [...localState.aboutPrinciples.principles];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setLocalState({
                            ...localState,
                            aboutPrinciples: { ...localState.aboutPrinciples, principles: updated }
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>İlke Açıklaması</label>
                    <textarea
                      className={styles.textarea}
                      value={pr.desc}
                      onChange={(e) => {
                        const updated = [...localState.aboutPrinciples.principles];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setLocalState({
                          ...localState,
                          aboutPrinciples: { ...localState.aboutPrinciples, principles: updated }
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          {/* TAB 6: MAKALELER */}
          {activeTab === "articles" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <h2 className={styles.sectionTitle}>Hukuki Makaleler & İncelemeler</h2>
                  <p className={styles.sectionDesc}>Mevcut makaleleri düzenleyin veya yeni makale ekleyin</p>
                </div>
                <button
                  type="button"
                  className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
                  onClick={handleAddArticle}
                >
                  + Yeni Makale Ekle
                </button>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ana Sayfa Bölüm Başlığı</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.articlesSection.homeTitle}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        articlesSection: { ...localState.articlesSection, homeTitle: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>"Tümünü Gör" Buton Yazısı</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.articlesSection.viewAllLabel}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        articlesSection: { ...localState.articlesSection, viewAllLabel: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Makaleler Sayfası Ana Başlığı</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.articlesSection.pageTitle}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        articlesSection: { ...localState.articlesSection, pageTitle: e.target.value }
                      })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Makaleler Sayfası Spot Açıklaması</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={localState.articlesSection.pageDescription}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        articlesSection: { ...localState.articlesSection, pageDescription: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              <div className={styles.sectionHeading} style={{ marginTop: "var(--space-20)" }}>
                <h3 className={styles.sectionTitle} style={{ fontSize: "var(--text-20)" }}>
                  Tüm Makaleler ({localState.articlesSection.articles.length})
                </h3>
              </div>

              {localState.articlesSection.articles.map((art, idx) => (
                <div key={art.id || idx} id={`art-card-${art.id}`} className={styles.itemCard}>
                  <div className={styles.itemCardHeader}>
                    <span className={styles.itemBadge}>Makale #{idx + 1}: {art.title}</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        style={{ padding: "4px 10px", fontSize: "12px" }}
                        onClick={() => handleGenerateArticleSlug(idx)}
                        title="Başlıktan SEO uyumlu slug üret"
                      >
                        🔗 Slug Üret
                      </button>
                      {deleteConfirm?.type === "article" && deleteConfirm.index === idx ? (
                        <div className={styles.confirmBox}>
                          <span className={styles.confirmText}>Makale silinsin mi?</span>
                          <button
                            type="button"
                            className={[styles.actionBtn, styles.deleteBtnConfirm].join(" ")}
                            onClick={() => confirmDeleteArticle(idx)}
                          >
                            ✓ Evet, Sil
                          </button>
                          <button
                            type="button"
                            className={styles.actionBtn}
                            style={{ padding: "3px 8px", fontSize: "11px" }}
                            onClick={() => setDeleteConfirm(null)}
                          >
                            ✕ Vazgeç
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => setDeleteConfirm({ type: "article", index: idx, title: art.title })}
                        >
                          Sil
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Makale Başlığı</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={art.title}
                        onChange={(e) => {
                          const updated = [...localState.articlesSection.articles];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setLocalState({
                            ...localState,
                            articlesSection: { ...localState.articlesSection, articles: updated }
                          });
                        }}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Bağlantı Yolu (Slug - örn: yapay-zeka-uyum)</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={art.slug}
                        onChange={(e) => {
                          const updated = [...localState.articlesSection.articles];
                          updated[idx] = { ...updated[idx], slug: e.target.value };
                          setLocalState({
                            ...localState,
                            articlesSection: { ...localState.articlesSection, articles: updated }
                          });
                        }}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Kategori</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={art.category}
                        onChange={(e) => {
                          const updated = [...localState.articlesSection.articles];
                          updated[idx] = { ...updated[idx], category: e.target.value };
                          setLocalState({
                            ...localState,
                            articlesSection: { ...localState.articlesSection, articles: updated }
                          });
                        }}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Tarih</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={art.date}
                        onChange={(e) => {
                          const updated = [...localState.articlesSection.articles];
                          updated[idx] = { ...updated[idx], date: e.target.value };
                          setLocalState({
                            ...localState,
                            articlesSection: { ...localState.articlesSection, articles: updated }
                          });
                        }}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Okuma Süresi (örn: 5 dk okuma)</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={art.readTime}
                        onChange={(e) => {
                          const updated = [...localState.articlesSection.articles];
                          updated[idx] = { ...updated[idx], readTime: e.target.value };
                          setLocalState({
                            ...localState,
                            articlesSection: { ...localState.articlesSection, articles: updated }
                          });
                        }}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Yazar</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={art.author}
                        onChange={(e) => {
                          const updated = [...localState.articlesSection.articles];
                          updated[idx] = { ...updated[idx], author: e.target.value };
                          setLocalState({
                            ...localState,
                            articlesSection: { ...localState.articlesSection, articles: updated }
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Özet Metin</label>
                    <textarea
                      className={styles.textarea}
                      value={art.summary}
                      onChange={(e) => {
                        const updated = [...localState.articlesSection.articles];
                        updated[idx] = { ...updated[idx], summary: e.target.value };
                        setLocalState({
                          ...localState,
                          articlesSection: { ...localState.articlesSection, articles: updated }
                        });
                      }}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Anahtar Çıkarımlar (Her satıra bir madde yazınız)</label>
                    <textarea
                      className={styles.textarea}
                      value={art.keyTakeaways.join("\n")}
                      onChange={(e) => {
                        const updated = [...localState.articlesSection.articles];
                        updated[idx] = {
                          ...updated[idx],
                          keyTakeaways: e.target.value.split("\n").filter((l) => l.trim().length > 0)
                        };
                        setLocalState({
                          ...localState,
                          articlesSection: { ...localState.articlesSection, articles: updated }
                        });
                      }}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Makale İçeriği (Paragraflar - İki boş satırla ayrılır)</label>
                    <textarea
                      className={styles.textarea}
                      style={{ minHeight: "180px" }}
                      value={art.contentParagraphs.join("\n\n")}
                      onChange={(e) => {
                        const updated = [...localState.articlesSection.articles];
                        updated[idx] = {
                          ...updated[idx],
                          contentParagraphs: e.target.value.split("\n\n").filter((p) => p.trim().length > 0)
                        };
                        setLocalState({
                          ...localState,
                          articlesSection: { ...localState.articlesSection, articles: updated }
                        });
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className={styles.addBtn}
                onClick={handleAddArticle}
              >
                + Yeni Makale Ekle
              </button>
            </>
          )}

          {/* TAB 7: FAYDALI BAĞLANTILAR */}
          {activeTab === "usefulLinks" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <h2 className={styles.sectionTitle}>Faydalı Kurumsal Bağlantılar</h2>
                  <p className={styles.sectionDesc}>Müvekkiller için resmi portal, mevzuat ve yargı linkleri</p>
                </div>
                <button
                  type="button"
                  className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
                  onClick={handleAddUsefulLink}
                >
                  + Yeni Bağlantı Ekle
                </button>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bölüm Başlığı</label>
                <input
                  type="text"
                  className={styles.input}
                  value={localState.usefulLinks.sectionTitle}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      usefulLinks: { ...localState.usefulLinks, sectionTitle: e.target.value }
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bölüm Alt Açıklaması</label>
                <textarea
                  className={styles.textarea}
                  value={localState.usefulLinks.sectionDescription}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      usefulLinks: { ...localState.usefulLinks, sectionDescription: e.target.value }
                    })
                  }
                />
              </div>

              {localState.usefulLinks.links.map((link, idx) => (
                <div key={idx} id={`link-card-${idx}`} className={styles.itemCard}>
                  <div className={styles.itemCardHeader}>
                    {deleteConfirm?.type === "link" && deleteConfirm.index === idx ? (
                      <div className={styles.confirmBox}>
                        <span className={styles.confirmText}>Bağlantı silinsin mi?</span>
                        <button
                          type="button"
                          className={[styles.actionBtn, styles.deleteBtnConfirm].join(" ")}
                          onClick={() => confirmDeleteUsefulLink(idx)}
                        >
                          ✓ Evet, Sil
                        </button>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          style={{ padding: "3px 8px", fontSize: "11px" }}
                          onClick={() => setDeleteConfirm(null)}
                        >
                          ✕ Vazgeç
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => setDeleteConfirm({ type: "link", index: idx, title: link.title })}
                      >
                        Sil
                      </button>
                    )}
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Kategori (örn: Resmi Yayın)</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={link.category}
                        onChange={(e) => {
                          const updated = [...localState.usefulLinks.links];
                          updated[idx] = { ...updated[idx], category: e.target.value };
                          setLocalState({
                            ...localState,
                            usefulLinks: { ...localState.usefulLinks, links: updated }
                          });
                        }}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Bağlantı Başlığı</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={link.title}
                        onChange={(e) => {
                          const updated = [...localState.usefulLinks.links];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setLocalState({
                            ...localState,
                            usefulLinks: { ...localState.usefulLinks, links: updated }
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>URL Adresi (https://...)</label>
                    <input
                      type="url"
                      className={styles.input}
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...localState.usefulLinks.links];
                        updated[idx] = { ...updated[idx], url: e.target.value };
                        setLocalState({
                          ...localState,
                          usefulLinks: { ...localState.usefulLinks, links: updated }
                        });
                      }}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Kısa Açıklama</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={link.desc}
                      onChange={(e) => {
                        const updated = [...localState.usefulLinks.links];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setLocalState({
                          ...localState,
                          usefulLinks: { ...localState.usefulLinks, links: updated }
                        });
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className={styles.addBtn}
                onClick={handleAddUsefulLink}
              >
                + Yeni Bağlantı Ekle
              </button>
            </>
          )}

          {/* TAB 8: BULUT, GÜVENLİK & YEDEK */}
          {activeTab === "backup" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <h2 className={styles.sectionTitle}>Bulut & Güvenlik</h2>
                  <p className={styles.sectionDesc}>Veritabanı bağlantısı, şifre ve yedekleme yönetimi</p>
                </div>
              </div>

              {/* BÖLÜM 1: BULUT VERİTABANI */}
              <div className={styles.itemCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <h3 className={styles.label} style={{ margin: 0, fontSize: "var(--text-15)" }}>
                    Supabase Bulut Veritabanı
                  </h3>
                  <span
                    style={{
                      fontSize: "var(--text-12)",
                      padding: "4px 10px",
                      borderRadius: "2px",
                      fontWeight: 600,
                      backgroundColor: cloudConfig.isConfigured ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                      color: cloudConfig.isConfigured ? "#34d399" : "#fbbf24",
                      border: `1px solid ${cloudConfig.isConfigured ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`
                    }}
                  >
                    {cloudConfig.isConfigured ? "✓ Bulut Bağlantısı Aktif" : "Yerel Mod"}
                  </span>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Project URL</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="https://xyz.supabase.co"
                      value={cloudUrlInput}
                      onChange={(e) => setCloudUrlInput(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Anon / Public Key</label>
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="sb_publishable_... veya eyJ..."
                      value={cloudKeyInput}
                      onChange={(e) => setCloudKeyInput(e.target.value)}
                    />
                  </div>
                </div>

                {cloudTestResult && (
                  <div
                    style={{
                      padding: "8px 12px",
                      fontSize: "var(--text-13)",
                      borderRadius: "2px",
                      backgroundColor: cloudTestResult.success ? "rgba(16, 185, 129, 0.12)" : "rgba(220, 38, 38, 0.15)",
                      border: `1px solid ${cloudTestResult.success ? "rgba(16, 185, 129, 0.3)" : "rgba(220, 38, 38, 0.3)"}`,
                      color: cloudTestResult.success ? "#a7f3d0" : "#fca5a5"
                    }}
                  >
                    {cloudTestResult.success ? "✓ " : "❌ "}
                    {cloudTestResult.message}
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "4px" }}>
                  <button
                    type="button"
                    onClick={handleSaveCloudConfig}
                    className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
                  >
                    Ayarları Kaydet
                  </button>

                  <button
                    type="button"
                    onClick={handleTestCloud}
                    disabled={isTestingCloud}
                    className={styles.actionBtn}
                  >
                    {isTestingCloud ? "Test Ediliyor..." : "Bağlantıyı Test Et"}
                  </button>

                  <button
                    type="button"
                    onClick={handlePushToCloud}
                    disabled={isTestingCloud}
                    className={styles.actionBtn}
                  >
                    Buluta Yükle
                  </button>

                  <button
                    type="button"
                    onClick={handlePullFromCloud}
                    disabled={isTestingCloud}
                    className={styles.actionBtn}
                  >
                    Buluttan Çek
                  </button>
                </div>
              </div>

              {/* BÖLÜM 2: YÖNETİCİ ŞİFRESİ */}
              <div className={styles.itemCard}>
                <h3 className={styles.label} style={{ fontSize: "var(--text-15)" }}>
                  Yönetici Şifresini Değiştir
                </h3>

                <form onSubmit={handleChangePasscode} style={{ maxWidth: "480px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Yeni Şifre</label>
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="Yeni şifrenizi giriniz"
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Yeni Şifre Tekrar</label>
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="Yeni şifrenizi tekrar giriniz"
                      value={newPasscodeConfirm}
                      onChange={(e) => setNewPasscodeConfirm(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
                    style={{ alignSelf: "flex-start", marginTop: "4px" }}
                  >
                    Şifreyi Güncelle
                  </button>
                </form>
              </div>

              {/* BÖLÜM 3: JSON YEDEKLEME */}
              <div className={styles.itemCard}>
                <h3 className={styles.label}>JSON Yedek İndir</h3>
                <button
                  type="button"
                  onClick={exportContentAsJson}
                  className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
                  style={{ alignSelf: "flex-start" }}
                >
                  Yedek Dosyasını İndir (.json)
                </button>
              </div>

              <div className={styles.itemCard}>
                <h3 className={styles.label}>JSON Yedek Geri Yükle</h3>
                <input
                  type="file"
                  accept=".json"
                  className={styles.input}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const content = event.target?.result as string;
                        if (content) {
                          const success = importContentFromJson(content);
                          if (success) {
                            showToast("✓ Yedek başarıyla yüklendi!");
                            setTimeout(() => window.location.reload(), 1000);
                          } else {
                            alert("Geçersiz yedek dosyası!");
                          }
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </div>

              {/* BÖLÜM 4: SIFIRLA */}
              <div className={styles.itemCard} style={{ borderColor: "rgba(239, 68, 68, 0.3)" }}>
                <h3 className={styles.label} style={{ color: "#f87171" }}>Fabrika Ayarlarına Sıfırla</h3>
                {deleteConfirm?.type === "reset" ? (
                  <div className={styles.confirmBox} style={{ padding: "8px 12px", alignSelf: "flex-start" }}>
                    <span className={styles.confirmText}>Tüm yazılar ilk haline dönecek. Emin misiniz?</span>
                    <button
                      type="button"
                      className={[styles.actionBtn, styles.deleteBtnConfirm].join(" ")}
                      onClick={confirmResetToDefaults}
                    >
                      ✓ Evet, Sıfırla
                    </button>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      style={{ padding: "4px 10px", fontSize: "12px" }}
                      onClick={() => setDeleteConfirm(null)}
                    >
                      ✕ Vazgeç
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    style={{ alignSelf: "flex-start", padding: "8px 16px" }}
                    onClick={() => setDeleteConfirm({ type: "reset", index: 0, title: "reset" })}
                  >
                    Orijinal İçeriklere Sıfırla
                  </button>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Floating Bottom Bar */}
      <aside className={styles.floatingBar} aria-label="Kaydetme ve durum çubuğu">
        <div className={styles.floatingLeft}>
          <div className={styles.statusIndicator}>
            {saveStatus === "saved" && (
              <>
                <span className={styles.statusDotSaved} aria-hidden="true" />
                <span style={{ color: "#10b981" }}>Tüm değişiklikler kaydedildi (Canlıda yayında)</span>
              </>
            )}
            {saveStatus === "saving" && (
              <>
                <span className={styles.statusDotSaving} aria-hidden="true" />
                <span style={{ color: "#f59e0b" }}>Değişiklikler kaydediliyor...</span>
              </>
            )}
            {saveStatus === "unsaved" && (
              <>
                <span className={styles.statusDotUnsaved} aria-hidden="true" />
                <span style={{ color: "var(--color-brass-soft)" }}>Kaydedilmemiş değişiklikler var</span>
              </>
            )}
          </div>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              className={styles.toggleCheckbox}
              checked={autoSaveEnabled}
              onChange={handleToggleAutoSave}
            />
            <span>⚡ Otomatik Kaydet {autoSaveEnabled ? "(Açık)" : "(Kapalı)"}</span>
          </label>
        </div>

        <div className={styles.floatingActions}>
          {isDirty && (
            <button
              type="button"
              onClick={handleRevert}
              className={styles.actionBtn}
              title="Son kaydedilen haline geri dön"
            >
              ↩️ Geri Al
            </button>
          )}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionBtn}
          >
            👁️ Siteyi Yeni Sekmede Gör ↗
          </a>

          <button
            type="button"
            onClick={handleSaveAll}
            className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
          >
            💾 Değişiklikleri Kaydet & Yayınla
          </button>
        </div>
      </aside>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toast}>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
