export interface Article {
  id: string;
  slug: string;
  category: "Şirketler Hukuku" | "Teknoloji & KVKK" | "Uyuşmazlık Çözümü" | "İş Hukuku";
  date: string;
  title: string;
  readTime: string;
  summary: string;
  author: string;
  tags: string[];
  keyTakeaways: string[];
  contentParagraphs: string[];
}

export const articleCategories = [
  "Tümü",
  "Şirketler Hukuku",
  "Teknoloji & KVKK",
  "Uyuşmazlık Çözümü",
  "İş Hukuku"
] as const;

export const fullArticles: Article[] = [
  {
    id: "art-1",
    slug: "joint-venture-risk-yonetimi",
    category: "Şirketler Hukuku",
    date: "Ekim 2024",
    title: "Sınır Ötesi Ortak Girişimlerde (Joint Venture) Risk Yönetimi ve Yönetişim Kontrolleri",
    readTime: "6 dk okuma",
    summary: "Uluslararası yatırımlarda kilitlenme (deadlock) çözümleri, birlikte sürükleme (drag-along) mekanizmaları ve yargı alanı seçimi üzerine operasyonel bilgi notu.",
    author: "Av. Burak Berkay Özkan",
    tags: ["Ortak Girişim", "M&A", "Hissedar Sözleşmesi", "Uluslararası Tahkim"],
    keyTakeaways: [
      "Kilitlenme (Deadlock) maddelerinde Rus Ruleti ve Teksas Ateşi gibi mekanizmalar tarafların sermaye gücü dikkate alınarak dengelenmelidir.",
      "Azınlık pay sahiplerinin veto hakları şirketin olağan ticari akışını felç etmeyecek şekilde sınırlandırılmalıdır.",
      "Uyuşmazlık çözümünde yerel mahkemeler yerine İSTAC veya ICC tahkimi tercih edilmelidir."
    ],
    contentParagraphs: [
      "Farklı ülkelerden veya kurumsal kültürlerden gelen şirketlerin ortak bir ticari hedef doğrultusunda kurdukları ortak girişimler (Joint Venture), yüksek getiri potansiyelinin yanı sıra karmaşık hukuki riskler barındırır. Bu ortaklıklarda başarının anahtarı, ortaklık sözleşmesinin (Shareholders' Agreement - SHA) sadece iyi zamanları değil, olası kriz ve ayrılık senaryolarını da eksiksiz öngörmesidir.",
      "Yönetim kurulu kararlarında oybirliği veya nitelikli çoğunluk aranan konularda tarafların anlaşamaması durumunda ortaya çıkan kilitlenme (Deadlock) hali, şirketin ticari faaliyetini durma noktasına getirebilir. Bu krizlerin çözümü için kademeli müzakere, bağımsız hakem değerlendirmesi, çağrı (Call Option) veya satma (Put Option) hakları net takvimlere bağlanmalıdır.",
      "Ayrıca, çoğunluk pay sahibinin şirketi satmak istemesi halinde azınlığı da satışa dahil edebilmesini sağlayan Birlikte Satışa Zorlama (Drag-Along) ve azınlığın haklarını koruyan Birlikte Satma (Tag-Along) hükümleri, değerleme metodolojisiyle desteklenerek kaleme alınmalıdır."
    ]
  },
  {
    id: "art-2",
    slug: "eu-ai-act-kurumsal-uyum",
    category: "Teknoloji & KVKK",
    date: "Ağustos 2024",
    title: "Kurumsal Platformlar İçin Yapay Zeka Yasası (EU AI Act) Uyum Rehberi",
    readTime: "8 dk okuma",
    summary: "Avrupa Birliği Yapay Zeka Yasası'nın Türk teknoloji şirketleri ve dijital platformlar üzerindeki sınır ötesi etkileri ve zorunlu uyum adımları.",
    author: "Av. Burak Berkay Özkan",
    tags: ["Yapay Zeka", "EU AI Act", "KVKK", "SaaS", "Regülasyon"],
    keyTakeaways: [
      "AB pazarında doğrudan hizmet vermeyen ancak çıktısı AB'de kullanılan AI sistemleri de yasa kapsamındadır.",
      "Yüksek riskli kabul edilen yapay zeka sistemlerinde insan gözetimi ve teknik kütük kaydı tutulması zorunludur.",
      "Genel amaçlı yapay zeka modelleri için telif hakkı mevzuatına uyum politikası oluşturulmalıdır."
    ],
    contentParagraphs: [
      "Avrupa Parlamentosu tarafından onaylanan ve yürürlüğe giren AB Yapay Zeka Yasası (EU AI Act), sadece AB sınırları içerisindeki kuruluşları değil, AB'ye hizmet sağlayan veya sistem çıktısı AB'de kullanılan tüm küresel teknoloji şirketlerini doğrudan ilgilendirmektedir. Tıpkı GDPR gibi ekstrateritoryal (sınır ötesi) etkiye sahiptir.",
      "Yasa; yapay zeka sistemlerini 'Kabul Edilemez Risk', 'Yüksek Risk', 'Sınırlı Risk' ve 'Minimum Risk' olmak üzere dört kategoriye ayırmaktadır. İnsan kaynakları değerlendirme araçları, kredi skorlama sistemleri, biyometrik tanımlama ve kritik altyapı yönetimleri yüksek risk sınıfına dahil edilmiştir.",
      "Yüksek riskli yapay zeka sistemleri için veri yönetişimi, teknik dokümantasyon, kayıt tutma (logging), şeffaflık, insan gözetimi ve siber güvenlik yükümlülükleri getirilmiştir. İhlal halinde 35 milyon Euro'ya veya küresel cironun %7'sine varan idari para cezaları öngörülmektedir."
    ]
  },
  {
    id: "art-3",
    slug: "ticari-uyusmazliklarda-ihtiyati-tedbir",
    category: "Uyuşmazlık Çözümü",
    date: "Mayıs 2024",
    title: "Ticari Uyuşmazlıklarda İhtiyati Tedbir ve İhtiyati Haciz Stratejisi",
    readTime: "5 dk okuma",
    summary: "Dava açılmadan önce delil tespiti, mal kaçırmayı önleme, banka bloke süreçleri ve yönetim kurulu raporlama protokollerinin hukuki değerlendirilmesi.",
    author: "Av. Burak Berkay Özkan",
    tags: ["Dava Stratejisi", "İhtiyati Tedbir", "İhtiyati Haciz", "Ticaret Mahkemesi"],
    keyTakeaways: [
      "Dava açılmadan önce alınacak hızlı bir tedbir kararı, karşı tarafı doğrudan sulh masasına oturtabilir.",
      "Yaklaşık ispat kuralı gereğince sunulan belgelerin inandırıcı ve somut olması esastır.",
      "Teminat gösterme yükümlülüğü ve teminatsız tedbir alma istisnaları stratejik olarak değerlendirilmelidir."
    ],
    contentParagraphs: [
      "Ticari uyuşmazlıklarda yıllar sürebilecek bir davanın sonunda haklı bulunmak, şayet borçlunun veya karşı tarafın malvarlığı bu süreçte tüketilmişse maalesef 'pirus zaferi' olmaktan öteye geçemez. Bu nedenle ticari dava stratejisinde en kritik aşama, henüz davanın başında veya dava öncesinde geçici hukuki koruma tedbirlerinin alınmasıdır.",
      "6100 sayılı HMK uyarınca talep edilen ihtiyati tedbir ile 2004 sayılı İİK uyarınca rehinle temin edilmemiş para borçları için talep edilen ihtiyati haciz arasındaki fark doğru tahlil edilmelidir. Haksız fiilden veya sözleşme feshinden kaynaklanan tazminat taleplerinde ihtiyati haciz şartlarının oluşup oluşmadığı titizlikle incelenmelidir.",
      "Özellikle şirket yönetim kurullarının sorumluluğu açısından, şirketin alacaklarının tahsil kabiliyetini yitirmemesi için zamanında ihtiyati tedbir ve haciz yollarına başvurulması yöneticilerin özen borcunun bir gereğidir."
    ]
  },
  {
    id: "art-4",
    slug: "yonetici-rekabet-yasagi-ve-fesih",
    category: "İş Hukuku",
    date: "Nisan 2024",
    title: "Üst Düzey Yöneticilerde Rekabet Etmeme Sözleşmelerinin Geçerlilik Sınırları",
    readTime: "7 dk okuma",
    summary: "Türk Borçlar Kanunu kapsamında rekabet yasağının coğrafi sınırları, süre kriterleri, cezai şart uygulamaları ve Yargıtay'ın güncel içtihatları.",
    author: "Av. Burak Berkay Özkan",
    tags: ["İş Hukuku", "Rekabet Yasağı", "Yönetici Sözleşmesi", "Cezai Şart"],
    keyTakeaways: [
      "Rekabet yasağı süresi haklı sebepler olmadıkça kural olarak 2 yılı aşamaz.",
      "Yasağın geçerli olabilmesi için coğrafi alan, konu ve süre açısından makul sınırlandırmalar yapılması şarttır.",
      "İş sözleşmesinin işveren tarafından haklı bir neden olmaksızın feshi halinde rekabet yasağı hükümsüz kalır."
    ],
    contentParagraphs: [
      "Şirketlerin en değerli ticari varlıkları arasında müşteri portföyleri, fiyatlandırma stratejileri ve know-how yer almaktadır. Üst düzey yöneticiler bu bilgilere doğrudan erişim sağladığından, şirketten ayrıldıktan sonra rakip bir firmada görev almaları veya bizzat rakip şirket kurmaları ciddi zararlara yol açabilir.",
      "Türk Borçlar Kanunu'nun 444 ve devamı maddeleri uyarınca rekabet etmeme sözleşmesi düzenlenebilmektedir. Ancak uygulamada en sık yapılan hata, yasağın tüm Türkiye'yi veya sınırsız bir sektörü kapsayacak şekilde aşırı geniş düzenlenmesidir. Yargıtay, işçinin ekonomik geleceğini tehlikeye sokacak ölçüde aşırı geniş rekabet yasaklarını geçersiz saymakta veya hâkimin takdir yetkisiyle daraltmaktadır.",
      "Ayrıca cezai şart miktarının yöneticinin elde ettiği son gelirle orantılı olması ve karşılık (tazminat) ödenmesi hususları sözleşmenin icra kabiliyetini doğrudan etkilemektedir."
    ]
  },
  {
    id: "art-5",
    slug: "yurtdisi-veri-aktarimi-kvkk-degisiklik",
    category: "Teknoloji & KVKK",
    date: "Mart 2024",
    title: "KVKK'da Yurtdışına Veri Aktarımı: Standart Sözleşmeler ve Yeni Dönem",
    readTime: "6 dk okuma",
    summary: "6698 sayılı Kanun'un 9. maddesinde yapılan köklü değişiklikler, Kişisel Verileri Koruma Kurulu'nun standart sözleşme şartları ve şirketlerin bildirim yükümlülükleri.",
    author: "Av. Burak Berkay Özkan",
    tags: ["KVKK", "Veri Aktarımı", "Standart Sözleşme", "Uyum"],
    keyTakeaways: [
      "Açık rıza artık yurtdışına sürekli veri aktarımında tek ve ana hukuki sebep olmaktan çıkarılmıştır.",
      "Standart Sözleşmelerin imzalanmasından itibaren 5 iş günü içerisinde Kurul'a fiziki veya KEP ile bildirilmesi zorunludur.",
      "Bildirim yükümlülüğünün yerine getirilmemesi halinde 1.000.000 TL'ye varan idari para cezası öngörülmüştür."
    ],
    contentParagraphs: [
      "Kişisel Verilerin Korunması Kanunu'nda yapılan reform ile Türkiye, Avrupa Birliği'nin GDPR standardı ile büyük ölçüde uyumlu bir yurtdışı veri aktarım rejimine geçiş yapmıştır. Öncesinde açık rızaya veya Kurul onaylı taahhütnameye sıkışmış olan sistem, artık çok daha esnek ve ticari hayata uygun mekanizmalarla yönetilmektedir.",
      "Yeni sistemde uygun güvenceler arasında Kurul tarafından ilan edilen Standart Sözleşmeler (SCC) öne çıkmaktadır. Şirketler, yurtdışında yerleşik bulut sunucu sağlayıcıları (AWS, Google Cloud, Microsoft Azure) veya grup şirketleri ile bu sözleşmeleri imzalayarak veri aktarımını hukuka uygun hale getirebilmektedir.",
      "Buradaki en kritik operasyonel risk, sözleşmenin imzalanmasından itibaren 5 iş günü içinde Kişisel Verileri Koruma Kurumu'na bildirim yapılmamasıdır. Şirketlerin mevcut tedarikçi ve hizmet sağlayıcı sözleşmelerini acilen gözden geçirmesi gerekmektedir."
    ]
  },
  {
    id: "art-6",
    slug: "hissedar-sozlesmelerinde-on-alim-ve-oncelik",
    category: "Şirketler Hukuku",
    date: "Şubat 2024",
    title: "Anonim ve Limited Şirketlerde Pay Sahipleri Sözleşmesi (SHA) ve Esas Sözleşme Dengesi",
    readTime: "7 dk okuma",
    summary: "Şirketler hukukunda borçlar hukuku niteliğindeki ortaklar sözleşmeleri ile ayni etkili şirket ana sözleşmesinin çatışması ve çözüm yolları.",
    author: "Av. Burak Berkay Özkan",
    tags: ["Ticaret Hukuku", "SHA", "Esas Sözleşme", "Hissedar Hakları"],
    keyTakeaways: [
      "Pay Sahipleri Sözleşmesi sadece imzalayan tarafları bağlar; üçüncü kişilere ve şirkete karşı ileri sürülebilmesi için esas sözleşmeyle uyumlaştırılması gerekir.",
      "Ön alım (Right of First Refusal) ve ilk teklif hakları (Right of First Offer) net prosedür kurallarına tabi tutulmalıdır.",
      "Esas sözleşmeye yansıtılamayan hükümler için yüksek tutarlı cezai şart ve hisse rehin mekanizmaları kurulmalıdır."
    ],
    contentParagraphs: [
      "Türk Ticaret Kanunu sisteminde anonim şirket esas sözleşmesi tescil ve ilan ile aleniyet kazanır ve ayni etkili bir hak doğurur. Buna karşılık pay sahipleri arasında akdedilen Pay Sahipleri Sözleşmesi (SHA) ise sadece taraflar arasında nisbi (borçlandırıcı) etkiye sahiptir.",
      "Bir ortağın SHA'daki ön alım hakkına aykırı olarak paylarını üçüncü bir şahsa devretmesi halinde, devir işlemi kural olarak geçerliliğini korur; hakları ihlal edilen diğer ortak yalnızca sözleşmeye aykırılıktan doğan tazminat ve cezai şart talep edebilir. Bu riski bertaraf etmek için şirket esas sözleşmesine bağlam (pay devrinin sınırlandırılması) hükümlerinin doğru entegre edilmesi elzemdir.",
      "Özellikle girişim sermayesi yatırımlarında ve aile şirketlerinde SHA ile esas sözleşme arasındaki uyumun periyodik olarak denetlenmesi, olası ortaklık kavgalarında telafisi imkansız zararları engeller."
    ]
  }
];
