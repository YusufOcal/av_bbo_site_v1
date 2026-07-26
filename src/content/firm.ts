export const navItems = [
  { label: "Hakkımızda", href: "/about" },
  { label: "Uzmanlıklarımız", href: "#expertise" },
  { label: "Yöntemimiz", href: "#method" },
  { label: "Seçkin Davalar", href: "#matters" },
  { label: "Yayınlar", href: "#insights" },
  { label: "İletişim", href: "#contact" }
] as const;

export const heroStats = [
  { value: "18+", label: "Yıllık Kıdemli Danışmanlık Tecrübesi" },
  { value: "32", label: "Uluslararası Hukuk Ağı ve Yargı Alanı" },
  { value: "4", label: "Temel Uzmanlık Disiplini" }
] as const;

export const practiceAreas = [
  {
    eyebrow: "01",
    title: "Şirketler Hukuku & M&A",
    copy: "Şirket birleşme ve devralmaları, ortaklık yapılandırmaları, hissedar ilişkileri, yatırım turları ve yönetim kurulu seviyesinde ticari danışmanlık.",
    capabilities: ["İşlem Yapılandırması", "Sınır Ötesi Birleşme & Devralmalar", "Hissedar Yönetişimi", "Girişim & Yatırım Turları"]
  },
  {
    eyebrow: "02",
    title: "Uyuşmazlık Çözümü & Tahkim",
    copy: "Yüksek ölçekli ticari uyuşmazlıklar, ihtiyati tedbir süreçleri, sulh stratejileri ve ticari sonuçlara odaklı dava yönetimi.",
    capabilities: ["Ticari Davalar", "İhtiyati Tedbir & İhtiyati Haciz", "Hissedar & Yönetim Uyuşmazlıkları", "Sulh & Müzakere Yönetimi"]
  },
  {
    eyebrow: "03",
    title: "Teknoloji & Veri Koruma",
    copy: "Dijital platform sözleşmeleri, KVKK/GDPR uyum programları, veri transferleri, düzenleyici risk yönetimi ve operasyonel politikalar.",
    capabilities: ["KVKK & GDPR Uyum Yönetimi", "SaaS & Kurumsal Sözleşmeler", "Düzenleyici Kurum Uyum Süreçleri", "Tedarikçi Risk Çerçeveleri"]
  },
  {
    eyebrow: "04",
    title: "İş Hukuku & Üst Düzey Mobilite",
    copy: "Üst düzey yönetici sözleşmeleri, organizasyonel yapılandırma, teşvik paketleri, kurum içi soruşturmalar ve uluslararası çalışma izinleri.",
    capabilities: ["Yönetici Sözleşmeleri & Fesih Yönetimi", "Hisse Opsiyonu & Teşvik Paketleri", "Kurum İçi İnceleme & Soruşturma", "Uluslararası Mobilite Stratejisi"]
  }
] as const;

export const methodSteps = [
  "Hukuki teoriden önce ticari hedefi ve iş modelini haritalandırıyoruz.",
  "Karmaşık hukuki riskleri net ve uygulanabilir karar yollarına dönüştürüyoruz.",
  "Kritik kararlarda ve yüksek riskli süreçlerde kıdemli ortakları doğrudan çalışmaya dahil ediyoruz."
] as const;

export const selectedMatters = [
  {
    type: "Birleşme & Devralma Danışmanlığı",
    title: "Özel bir yatırım grubunun çok aşamalı uluslararası satın alma sürecinde danışmanlık sağlandı.",
    detail: "Yerel ve uluslararası paydaşlar arasında yapılandırma, hukuki inceleme (due diligence), müzakere stratejisi ve kapanış koordinasyonu."
  },
  {
    type: "Uyuşmazlık & Dava Stratejisi",
    title: "Yönetim kurulu seviyesindeki ticari uyuşmazlıkta sulh ve ihtiyati tedbir stratejisi tasarlandı.",
    detail: "Delil tespiti, risk senaryoları, üst düzey yönetim raporlaması ve müzakere sıralaması yürütüldü."
  },
  {
    type: "Teknoloji Operasyonları",
    title: "Düzenlemeye tabi bir dijital hizmet için veri ve tedarikçi sözleşme çerçevesi oluşturuldu.",
    detail: "Veri koruma denetimleri, veri işleyen şartları, olay müdahale yükümlülükleri ve kurum içi uygulama rehberleri."
  }
] as const;

export const principles = [
  {
    id: "I",
    title: "Ölçülü ve Net İletişim",
    desc: "Tam bir hassasiyetle konuşuyoruz. Yoğun hukuk terimlerinden uzak, karar vericiler için net ve hesaplanmış yollar sunuyoruz."
  },
  {
    id: "II",
    title: "Ticari Gerçeklere Uygun Taslaklar",
    desc: "İşlemlerin dinamiğine göre tasarlanan sözleşmeler. Ticareti kolaylaştıran, varlıkları koruyan ve pürüzleri gideren metinler kaleme alıyoruz."
  },
  {
    id: "III",
    title: "Kıdemli Ortak Liderliğinde Kararlar",
    desc: "Size danışmanlık yapan ortaklar, işi bizzat yürüten kişilerdir. Risk yüksek olduğunda kıdemli avukatlarımız daima işin başındadır."
  },
  {
    id: "IV",
    title: "Mutlak Gizlilikle Uygulama",
    desc: "Hassas süreçlerde tam bir gizlilik. Tüm uluslararası yargı alanlarında sıkı gizlilik protokolleri çerçevesinde hareket ediyoruz."
  }
] as const;

export const articles = [
  {
    date: "Ekim 2024",
    category: "Şirketler Hukuku & M&A",
    title: "Sınır Ötesi Ortak Girişimlerde (Joint Venture) Risk Yönetimi ve Yönetişim Kontrolleri",
    readTime: "6 dk okuma",
    summary: "Uluslararası yatırımlarda kilitlenme (deadlock) çözümleri, birlikte sürükleme (drag-along) mekanizmaları ve yargı alanı seçimi üzerine operasyonel bilgi notu."
  },
  {
    date: "Ağustos 2024",
    category: "Teknoloji & Veri Koruma",
    title: "Kurumsal Platformlar İçin Yapay Zeka Yasası (EU AI Act) Uyum Rehberi",
    readTime: "8 dk okuma",
    summary: "Platform sağlayıcıları için temel uyum kontrol noktaları, veri işleme sorumlulukları ve model risk kategorizasyonu."
  },
  {
    date: "Mayıs 2024",
    category: "Uyuşmazlık Stratejisi",
    title: "Ticari Uyuşmazlıklarda İhtiyati Tedbir ve İhtiyati Haciz Stratejisi",
    readTime: "5 dk okuma",
    summary: "Dava açılmadan önce delil tespiti, varlık dondurma kararları ve yönetim kurulu raporlama protokollerinin değerlendirilmesi."
  }
] as const;
