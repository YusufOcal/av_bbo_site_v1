import type { SiteContent } from "@/types/content";
import { fullArticles } from "./articles";

export const defaultSiteContent: SiteContent = {
  general: {
    brandName: "Özkan",
    brandSubtitle: "Hukuk & Danışmanlık",
    lawyerName: "Av. Burak Berkay Özkan",
    barAssociation: "İstanbul Barosu",
    phone: "+90 505 438 75 49",
    email: "avburakberkayozkan@gmail.com",
    addressPremise:
      "Kuruculara, yönetim kurullarına ve yatırımcılara ticari uyuşmazlık ve birleşmelerde stratejik danışmanlık.",
    regulatoryNotice:
      "Özkan Hukuk & Danışmanlık — Av. Burak Berkay Özkan, İstanbul Barosu'na kayıtlı bağımsız bir avukattır. Bu internet sitesi Türkiye Barolar Birliği Avukatlık Reklam Yasağı Yönetmeliği'ne uygun olarak yalnızca bilgilendirme amacıyla hazırlanmıştır."
  },
  whatsapp: {
    phoneNumber: "905054387549",
    defaultMessage: "Merhaba, hukuki danışmanlık almak istiyorum.",
    tooltipText: "WhatsApp İletişim"
  },
  navigation: {
    items: [
      { label: "Faaliyet Alanlarımız", href: "/#expertise" },
      { label: "Makaleler", href: "/makaleler" },
      { label: "Hakkımızda & İlkelerimiz", href: "/#principles" },
      { label: "Faydalı Bağlantılar", href: "/#useful-links" }
    ]
  },
  hero: {
    title: "Stratejik ve sonuç odaklı avukatlık danışmanlığı.",
    description:
      "Özkan Hukuk & Danışmanlık; ticari uyuşmazlıklar, sözleşmeler ve kurumsal süreçlerde doğrudan ve titiz bir avukatlık hizmeti sunar.",
    buttonLabel: "Faaliyet Alanlarını İnceleyin",
    buttonHref: "#expertise"
  },
  practiceFocus: {
    sectionTitle: "İş dünyası için kritik hukuki süreçlerde odaklanmış danışmanlık.",
    sectionDescription:
      "Dosyaların her aşamasına bizzat ve doğrudan odaklanabilmek adına danışmanlık kapasitemizi bilinçli olarak seçici tutuyoruz.",
    areas: [
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
    ]
  },
  aboutPrinciples: {
    sectionTitle: "Stratejik vizyon, doğrudan avukat takibi ve tavizsiz meslek etiği.",
    paragraphs: [
      "Özkan Hukuk & Danışmanlık; geleneksel hiyerarşik ve çok katmanlı büro yapılarının aksine, her sürecin doğrudan ve şeffaf yürütüldüğü bir danışmanlık anlayışıyla hareket eder.",
      "En etkili hukuki sonucun; dosyanın başlangıcından neticelenmesine kadar bizzat yürütülen titiz hazırlık, proaktif iletişim ve ticari dinamiklere uygun stratejik yaklaşımla elde edildiğine inanıyoruz.",
      "Müvekkillerimizin kurumsal hedeflerini korumak ve hukuki riskleri öngörülebilir kılmak için 4 temel mesleki ilke çerçevesinde hizmet sunuyoruz."
    ],
    principlesLabel: "Temel Çalışma İlkelerimiz",
    principles: [
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
    ]
  },
  usefulLinks: {
    sectionTitle: "Müvekkillerimiz ve ilgililer için faydalı kurumsal bağlantılar.",
    sectionDescription:
      "Yargı organları, resmi mevzuat platformları ve mesleki kuruluşlara ait resmi erişim adresleri derlenmiştir.",
    links: [
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
    ]
  },
  articlesSection: {
    homeTitle: "Makaleler & Hukuki İncelemeler",
    viewAllLabel: "Tüm İncelemeleri Gör",
    pageTitle: "Hukuki Makaleler & İncelemeler",
    pageDescription:
      "Şirketler hukuku, birleşme ve devralmalar, teknoloji regülasyonları, veri koruma ve uyuşmazlık çözümü üzerine operasyonel bilgi notları.",
    categories: [
      "Tümü",
      "Şirketler Hukuku",
      "Teknoloji & KVKK",
      "Uyuşmazlık Çözümü",
      "İş Hukuku"
    ],
    articles: fullArticles
  }
};
