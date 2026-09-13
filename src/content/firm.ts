export const navItems = [
  { label: "Faaliyet Alanlarımız", href: "/#expertise" },
  { label: "Makaleler", href: "/makaleler" },
  { label: "Hakkımızda & İlkelerimiz", href: "/#principles" },
  { label: "Faydalı Bağlantılar", href: "/#useful-links" }
] as const;

export const practiceAreas = [
  {
    eyebrow: "01",
    title: "Şirketler Hukuku & M&A",
    copy: "Şirket birleşme ve devralmaları, ortaklık yapılandırmaları, hissedar ilişkileri, yatırım turları ve yönetim kurulu seviyesinde ticari danışmanlık.",
    capabilities: [
      "İşlem Yapılandırması",
      "Sınır Ötesi Birleşme & Devralmalar",
      "Hissedar Yönetişimi",
      "Girişim & Yatırım Turları"
    ]
  },
  {
    eyebrow: "02",
    title: "Teknoloji & Veri Koruma",
    copy: "Dijital platform sözleşmeleri, KVKK/GDPR uyum programları, veri transferleri, düzenleyici risk yönetimi ve operasyonel politikalar.",
    capabilities: [
      "KVKK & GDPR Uyum Yönetimi",
      "SaaS & Kurumsal Sözleşmeler",
      "Düzenleyici Kurum Uyum Süreçleri",
      "Tedarikçi Risk Çerçeveleri"
    ]
  },
  {
    eyebrow: "03",
    title: "İş Hukuku & Üst Düzey Mobilite",
    copy: "Üst düzey yönetici sözleşmeleri, organizasyonel yapılandırma, teşvik paketleri, kurum içi soruşturmalar ve uluslararası çalışma izinleri.",
    capabilities: [
      "Yönetici Sözleşmeleri & Fesih Yönetimi",
      "Hisse Opsiyonu & Teşvik Paketleri",
      "Kurum İçi İnceleme & Soruşturma",
      "Uluslararası Mobilite Stratejisi"
    ]
  }
] as const;

export const methodSteps = [
  "Hukuki teoriden önce ticari hedefi ve iş modelini haritalandırıyoruz.",
  "Karmaşık hukuki riskleri net ve uygulanabilir karar yollarına dönüştürüyoruz.",
  "Kritik kararlarda ve yüksek riskli süreçlerde doğrudan avukat ilgisiyle hareket ediyoruz."
] as const;

export const selectedMatters = [
  {
    type: "Birleşme & Devralma Danışmanlığı",
    title: "Özel bir yatırım grubunun çok aşamalı satın alma sürecinde hukuki danışmanlık sağlandı.",
    detail: "Paydaşlar arasında işlem yapılandırması, hukuki inceleme (due diligence), müzakere stratejisi ve kapanış koordinasyonu."
  },
  {
    type: "Uyuşmazlık & Dava Stratejisi",
    title: "Şirket ortakları arasındaki ticari uyuşmazlıkta sulh ve ihtiyati tedbir stratejisi tasarlandı.",
    detail: "Delil tespiti, risk senaryoları, yönetim raporlaması ve müzakere sıralaması yürütüldü."
  },
  {
    type: "Teknoloji & Sözleşmeler",
    title: "Dijital platform operasyonu için veri koruma ve kurumsal sözleşme çerçevesi oluşturuldu.",
    detail: "KVKK denetimleri, veri işleyen şartları, sözleşme risk analizi ve uygulama rehberleri."
  }
] as const;

export const principles = [
  {
    id: "I",
    title: "Ölçülü ve Net İletişim",
    desc: "Tam bir hassasiyetle hareket ediyoruz. Yoğun hukuk jargonundan uzak, karar vericiler ve şirket yönetimleri için net ve hesaplanmış hukuki seçenekler sunuyoruz."
  },
  {
    id: "II",
    title: "Ticari Gerçeklere Uygun Taslaklar",
    desc: "İşlemlerin ticari dinamiğine göre tasarlanan sözleşmeler. Ticareti kolaylaştıran, kurumsal varlıkları koruyan ve pürüzleri gideren metinler kaleme alıyoruz."
  },
  {
    id: "III",
    title: "Bizzat Avukat Liderliğinde Kararlar",
    desc: "Danışmanlık aldığınız avukat, işi bizzat tasarlayan ve yöneten kişidir. Risk yüksek olduğunda süreç daima bizzat yürütülür."
  },
  {
    id: "IV",
    title: "Mutlak Gizlilikle Uygulama",
    desc: "Hassas kurumsal ve bireysel süreçlerde tavizsiz gizlilik. Tüm bilgi ve ticari sırlar en sıkı mesleki gizlilik protokolleri çerçevesinde korunur."
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

export const usefulLinks = [
  {
    category: "Resmi Yayın",
    title: "T.C. Resmî Gazete",
    url: "https://www.resmigazete.gov.tr",
    desc: "Günlük kanun, yönetmelik, tebliğ ve yüksek yargı içtihatlarının resmi yayını."
  },
  {
    category: "Mevzuat Portalı",
    title: "Mevzuat Bilgi Sistemi",
    url: "https://www.mevzuat.gov.tr",
    desc: "Yürürlükteki tüm kanun, kanun hükmünde kararname ve yönetmelik metinleri."
  },
  {
    category: "Yüksek Yargı",
    title: "Yargıtay Başkanlığı",
    url: "https://www.yargitay.gov.tr",
    desc: "Emsal karar arama motoru, daire kararları ve içtihat paylaşım sistemi."
  }
] as const;
