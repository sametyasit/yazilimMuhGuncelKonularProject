# 📊 LiveCare AR — Kapsamlı SWOT Analizi
### Karaciğer Nakli Sonrası Hasta Eğitim ve Destek Uygulaması
> **Hazırlanma Tarihi:** Haziran 2026 | **Versiyon:** 2.0 | **Proje:** LiveCare AR (PWA + AR + AI)

---

## 🗺️ Yönetici Özeti

**LiveCare AR**, karaciğer nakli hastalarına yönelik geliştirilmiş, **Artırılmış Gerçeklik (AR)**, **Yapay Zeka (AI) tabanlı yemek analizi**, **ilaç takibi**, **eğitici oyun mekanikleri** ve **acil durum rehberi** gibi birden fazla modülü tek bir Progressive Web App çatısı altında birleştiren yenilikçi bir sağlık teknolojisi projesidir.

Bu SWOT analizi; projenin mevcut teknik altyapısını, sağlık sektöründeki konumunu, rekabet ortamını ve gelecek potansiyelini **2026 yılı güncel teknoloji ekosistemi** perspektifinden değerlendirmektedir.

---

## 📋 SWOT Matrisi — Özet Tablo

| | **Olumlu** | **Olumsuz** |
|---|---|---|
| **İç Etkenler** | 💪 **Güçlü Yönler** (Strengths) | ⚠️ **Zayıf Yönler** (Weaknesses) |
| | ✅ Kurulum gerektirmeyen PWA yapısı | ❌ API anahtarının frontend'de açık tutulması |
| | ✅ AR ile gerçek 3D eğitim deneyimi | ❌ LocalStorage'a bağımlı veri mimarisi |
| | ✅ AI destekli gerçek zamanlı yemek analizi | ❌ Yalnızca Hiro marker'a bağlı AR sistemi |
| | ✅ Sıfır framework bağımlılığı (Vanilla JS) | ❌ Gerçek push bildirimi (VAPID) eksikliği |
| | ✅ Çoklu modül: oyun, ilaç, acil, AR, AI | ❌ Çok dilli destek ve erişilebilirlik eksikliği |
| | ✅ Offline-first Service Worker altyapısı | ❌ Klinik doğruluğun bağımsız validasyonu yok |
| **Dış Etkenler** | 🚀 **Fırsatlar** (Opportunities) | ⚡ **Tehditler** (Threats) |
| | 🌱 Dijital sağlık pazarının hızlı büyümesi | 🔴 AI yanlış teşhisinden doğan tıbbi sorumluluk |
| | 🌱 HBYS/HIS sistemleriyle entegrasyon | 🔴 KVKK, GDPR ve MDR mevzuat yükümlülükleri |
| | 🌱 WebXR ve markörsüz AR'a geçiş imkânı | 🔴 Groq API kesintisi ve maliyet artışı riski |
| | 🌱 Türkiye organ nakli hastane ağı ortaklığı | 🔴 iOS kamera güvenlik kısıtlamaları |
| | 🌱 Multimodal AI ile tam öğün analizi | 🔴 Rakip büyük ölçekli sağlık uygulamaları |
| | 🌱 Sosyal ilaç hatırlatıcı ağı | 🔴 Tarayıcı WebXR desteğinin parçalanması |

---

## 💪 1. Güçlü Yönler — Ayrıntılı Değerlendirme

### 1.1 Progressive Web App (PWA) Mimarisi
Uygulama, Google Play veya App Store süreçlerine gerek duymadan kullanıcıların doğrudan tarayıcı üzerinden erişebildiği ve cihazlarına `manifest.json` aracılığıyla yerel uygulama gibi yükleyebildiği bir PWA yapısına sahiptir. `sw.js` tabanlı Service Worker sayesinde temel işlevler **çevrimdışı (offline)** da çalışmaya devam eder. Bu mimari;
- Uygulama mağazası inceleme ve onay süreçlerini ortadan kaldırır,
- Düşük donanımlı veya depolama alanı kısıtlı cihazlarda da çalışır,
- Güncellemeler kullanıcı işlemi gerektirmeden otomatik dağıtılabilir.

### 1.2 Artırılmış Gerçeklik (AR) Modülü
`ar.html` içinde **A-Frame v1.3.0** ve **AR.js v3.4.5** kullanılarak hayata geçirilen AR modülü; hastaların kamera aracılığıyla Hiro markerını okutarak havada beliren **3D bilgi kartlarını** görmesini sağlar. Altı farklı tematik kart kategorisi mevcuttur:
- **İlaç Kullanımı** (kritik önem düzeyi rengi: kırmızı)
- **Beslenme Kuralları** (greyfurt yasağı vurgulaması)
- **Red Belirtileri** (acil iletişim numarası)
- **Kesinlikle Kaçınılacaklar** (alkol, sigara)
- **Egzersiz ve Yaşam** (yürüyüş rutini)
- **Acil Durumlar** (112 hattı)

Bu yaklaşım, hastanın soyut tıbbi bilgileri görsel-mekânsal hafıza yoluyla çok daha güçlü biçimde öğrenmesini sağlar.

### 1.3 Yapay Zeka Destekli Yemek Analizi
`script.js` içindeki AI modülü; cihaz kamerasından alınan görüntüyü **Groq Cloud API** üzerinden `meta-llama/llama-4-scout-17b` (veya eşdeğeri vizyon modeli) ile analiz ederek üç düzeyli karaciğer nakli diyetine uygunluk değerlendirmesi döndürür:
- ✅ **UYGUN** — Tüketilebilir
- ⚠️ **DİKKATLİ TÜKETİN** — Kontrollü miktarda
- ❌ **ZARARLI** — Kesinlikle kaçınılmalı

Bu özellik, hastanın her öğün için uzman onayı gerektirmeksizin ilk seviye karar desteği almasına imkân tanır.

### 1.4 Hafif ve Yüksek Performanslı Teknik Altyapı
Proje, herhangi bir JavaScript framework'ü (React, Vue, Angular vb.) kullanmaksızın saf **Vanilla JS (ES6+)**, **HTML5** ve **Vanilla CSS3** ile yazılmıştır. Bu mimari kararın faydaları:
- Tarayıcı yükleme süresi minimaldır (~10KB JS + CSS çekirdek),
- Üçüncü taraf bağımlılık güvenlik açıklarına karşı dirençlidir,
- Herhangi bir derleme aracı veya Node.js build pipeline'ı gerekmez.

### 1.5 Hasta Merkezli Çok Modüllü Tasarım
Uygulamanın tek çatı altında sunduğu beş kritik modül, hastanın post-transplant uyum sürecinin (medication adherence, dietary compliance, emergency awareness) bütününü kapsar:

| Modül | Klinik Faydası |
|---|---|
| Bilgilendirme Kartları (10 kart) | Eğitim/farkındalık |
| Yiyecek Oyunu (15 soru) | Gamification ile beslenme öğrenimi |
| Hatırlatıcı Kartlar (Günlük/Haftalık) | İlaç ve görev uyumu |
| Acil Durum Rehberi | Organ reddi belirtisi tanıma |
| İlaç Saatleri Takibi | Cronolojik ilaç uyumu |

### 1.6 Kullanıcı Deneyimi ve Mikro-Etkileşimler
- Konfeti animasyonu (doğru cevap ödüllendirmesi),
- Titreşim geri bildirimi (AR marker algılandığında),
- Karanlık/aydınlık tema geçişi,
- Motivasyon slogon şeridi,
- Günlük tamamlama yüzdesi progres barı.

---

## ⚠️ 2. Zayıf Yönler — Ayrıntılı Değerlendirme

### 2.1 Kritik Güvenlik Açığı: API Anahtarı Maruziyeti
`script.js` dosyasında Groq API anahtarı **istemci tarafında açık metin** olarak bulunmaktadır. Herhangi biri tarayıcı geliştirici araçlarından bu anahtara erişebilir. Potansiyel riskler:
- Anahtarın kötüye kullanımı (API kotasının tükenmesi, ücretli kullanım),
- Groq API hesabının askıya alınması,
- OWASP A02:2021 (Cryptographic Failures) kapsamında bir güvenlik ihlali.

**Gerekli çözüm:** Node.js/Vercel serverless function veya backend proxy katmanı.

### 2.2 Veri Mimarisi Kırılganlığı: LocalStorage Bağımlılığı
Kullanıcıya ait tüm veriler (ilaç kayıtları, görev durumları, tamamlama yüzdeleri) yalnızca `localStorage`'da tutulmaktadır. Bu durum şu sorunlara yol açar:
- Tarayıcı temizlendiğinde **tüm kişisel veriler kaybolur**,
- Kullanıcı farklı bir cihaza geçtiğinde veriye erişemez,
- Uygulama yüklü iken farklı tarayıcıdan açılırsa veriler görünmez.

### 2.3 AR Sisteminin Fiziksel Marker Bağımlılığı
Mevcut AR modülü, kameranın mutlaka siyah-beyaz **Hiro marker**'ı görmesini gerektirmektedir. Bu durum:
- Hasta markeri yazdırmak veya dijital olarak yanında bulundurmak zorunda kalır,
- Hiro marker dışındaki yüzeylerde AR deneyimi çalışmaz,
- Düşük ışıkta veya düşük kamera kalitesinde marker tanıma başarısız olur.

### 2.4 Gerçek Zamanlı Push Bildirimi Eksikliği
İlaç takibi modülü yalnızca uygulama açıkken görüntülenir. **VAPID (Web Push API)** entegrasyonu bulunmadığından:
- Uygulama kapalıyken ilaç saatinde kullanıcıya bildirim gönderilemiyor,
- Bu eksiklik post-transplant hastaların ilaç uyumu açısından ciddi bir işlevsel boşluk bırakmaktadır.

### 2.5 Erişilebilirlik ve Çok Dilli Destek Eksikliği
- **WCAG 2.1 AA** standartları tam karşılanmamaktadır (ekran okuyucu uyumluluğu, yeterli renk kontrastı denetimi).
- Uygulama yalnızca Türkçe'dir; yaşlı hastaların farklı etnik geçmişleri ve çok uluslu hastane ortamları için çok dilli destek (İngilizce, Arapça, Kürtçe) yoktur.

### 2.6 Klinik Doğrulama ve Tıbbi Onay Eksikliği
- Uygulama içeriği herhangi bir hastane, doktor kurulu veya sağlık otoritesi tarafından **resmi olarak doğrulanmamıştır**.
- AI analiz çıktılarının **klinik doğruluk oranı** ölçülmemiş ve raporlanmamıştır.
- Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK) kapsamında **tıbbi yazılım sınıflandırması** yapılmamıştır.

---

## 🚀 3. Fırsatlar — Ayrıntılı Değerlendirme

### 3.1 Türkiye ve Global Dijital Sağlık Pazarı Büyümesi
Dünya genelinde dijital sağlık pazarı 2026 itibarıyla **~550 milyar USD** büyüklüğe ulaşmaktadır. Türkiye'de sağlık dijitalleşmesi kapsamında:
- Sağlık Bakanlığı'nın **e-Nabız** ve **MHRS** altyapıları genişlemektedir,
- Hastane bilgi yönetim sistemleri (HBYS/HIS) entegrasyon API'leri açılmaktadır,
- Organ nakli merkezleri (İstanbul, Ankara, İzmir) dijital hasta takibi sistemlerine geçiş yapıyor.

LiveCare AR, bu büyüme dalgasına erken konumlanmış bir projedir.

### 3.2 HBYS / HIS Entegrasyonu ve HL7 FHIR
Uygulama, HL7 FHIR (Fast Healthcare Interoperability Resources) standart API'leri aracılığıyla hastane sistemlerine entegre edilebilir:
- Hastanın ilaç saatleri ve tamamlama oranları **doğrudan transplant koordinatörüne** iletilebilir,
- Acil durum bildirimleri **hemşire paneline** push notification olarak gönderilebilir,
- Postoperatif kontrol takvimleri sistemden otomatik çekilebilir.

### 3.3 WebXR ve Markörsüz AR'a Geçiş
2025-2026 itibarıyla **WebXR Device API** büyük tarayıcılar tarafından desteklenmekte, **MindAR.js** ve **8th Wall** gibi kütüphaneler herhangi bir marker gerektirmeksizin:
- Masa yüzeyi üzerinde 3D organ modeli render edebilmekte,
- Kullanıcının elini veya ilaç kutusunu arka plan olarak kullanabilmekte,
- Apple Vision Pro ve Meta Quest gibi XR cihazları için native deneyim sunabilmektedir.

### 3.4 Multimodal AI ile Tam Öğün ve İlaç Analizi
Mevcut AI modülü yalnızca kahvaltı analizi yapmaktadır. LLM vizyon modellerinin evrimleşmesiyle şunlar mümkün hale gelmektedir:
- Tüm öğünlerin (öğle, akşam, ara öğün) eş zamanlı analizi,
- **İlaç kutusu ve reçete tarama** — ilaç-besin etkileşimlerini uyarma (örn. Takrolimus + greyfurt),
- Karaciğer enzim değerlerinin fotoğraflanmış laboratuvar sonuçlarından otomatik çekilmesi.

### 3.5 Sesli Erişilebilirlik ve TTS Entegrasyonu
Web Speech API veya ElevenLabs benzeri TTS (Text-to-Speech) hizmetleriyle:
- Görme engelli veya okuma güçlüğü çeken hastalar için tüm kartlar seslendirilir,
- Yaşlı kullanıcılar için büyük font + yüksek kontrast mod + sesli yönlendirme kombinasyonu sunulur.

### 3.6 Akademik ve Araştırma İşbirliği Potansiyeli
- Hastane transplant klinikleriyle **klinik etkinlik araştırmaları** yürütülebilir,
- **App Store/Google Play** üzerinden SaMD (Software as a Medical Device) statüsüne başvurulabilir,
- Ulusal ve uluslararası sağlık teknolojisi hibelerine (TÜBİTAK, EUREKA, Horizon Europe) konu edilebilir.

---

## ⚡ 4. Tehditler — Ayrıntılı Değerlendirme

### 4.1 Tıbbi Sorumluluk ve AI Yanlış Teşhis Riski
Yapay zekanın yüksek riskli bir karar desteği sunduğu bu uygulamada olası bir **yanlış sınıflandırma** (örneğin greyfurtun portakal olarak tanınması veya çiğ et ürününün UYGUN çıkması) doğrudan hayati tehlike yaratabilir. Bu risk:
- Türk Borçlar Kanunu kapsamında üretici/geliştirici sorumluluğu doğurabilir,
- Klinik testten geçmemiş AI çıktılarına dayalı tedavi kararlarını içerdiğinden **malpractice** kapsamına girebilir.

**Zorunlu önlem:** Her AI çıktısının altına "Bu analiz bilgilendirme amaçlıdır; doktor tavsiyesi yerine geçmez" sorumluluk reddi eklenmeli ve bu uyarı kullanıcı tarafından onaylanmalıdır.

### 4.2 Yasal Mevzuat Çerçevesi: KVKK, MDR ve TİTCK
- **KVKK (Kişisel Verilerin Korunması Kanunu):** Kamera görüntüleri (biyometrik/hassas veri) API'ye gönderilmeden önce açık kullanıcı rızası alınmalı, veri saklama politikası şeffaf şekilde belirtilmelidir.
- **MDR (EU Medical Device Regulation 2017/745):** Uygulama avrupa pazarına açılmak istediğinde Sınıf I veya Sınıf IIa tıbbi cihaz sertifikasyonu gerektirebilir.
- **TİTCK Yönetmeliği:** Türkiye'de dijital terapi veya tıbbi yazılım kapsamına girip girmediği netleştirilmelidir.

### 4.3 API Tedarikçi Bağımlılığı ve Maliyet Artışı
- **Groq API** (inference altyapısı) herhangi bir fiyat değişikliğinde veya hizmet kesintisinde AI modülü tamamen işlevsiz hale gelir.
- Ücretsiz kullanım kotasının aşılması durumunda maliyet projeksiyonu yapılmamıştır.
- LLM vizyon modelleri rakip sağlayıcılar (OpenAI GPT-4o, Google Gemini) tarafından daha düşük maliyetle sunulmaya başlarsa entegrasyon değişikliği gerekir.

### 4.4 Tarayıcı ve Platform Kısıtlamaları
- **Apple Safari (iOS):** Kamera API'lerinde güvenlik güncellemelerinin getirdiği kısıtlamalar AR ve AI özelliklerini bozabilir. PWA web push bildirimleri iOS 16.4+ gerektirmekte olup eski iOS sürümleri desteksiz kalmaktadır.
- **AR.js'in sürdürülme riski:** AR.js açık kaynak projesi aktif geliştirmeden uzaklaşabilir; WebXR standardına geçiş gecikirse AR modülü tarayıcı güncellemeleriyle uyumsuz hale gelebilir.

### 4.5 Rekabet Ortamı
| Rakip/Tehdit | Risk Seviyesi |
|---|---|
| Büyük hastane zincirlerinin kendi hasta uygulama yatırımları | 🔴 Yüksek |
| Epic MyChart, Healthwise gibi uluslararası platformların TR genişlemesi | 🟡 Orta |
| Apple Health + AI entegrasyonunun güçlenmesi | 🟡 Orta |
| Sağlık Bakanlığı'nın merkezi e-Nabız uygulamasına ek modül eklemesi | 🟡 Orta |

---

## 🛠️ 5. Stratejik Aksiyon Planı (SO / ST / WO / WT)

### SO Stratejileri — Güçlü Yönleri Fırsatlarla Büyütme
| # | Strateji | Öncelik |
|---|---|---|
| SO-1 | PWA altyapısını koruyarak hastane iç Wi-Fi ağlarına entegreli pilot dağıtım yapılması | 🔴 Yüksek |
| SO-2 | Mevcut AR modülünü WebXR'a taşıyarak markörsüz sürüm geliştirme | 🟡 Orta |
| SO-3 | AI yemek modülünü tam öğün analizine genişletme ve Groq'a ek olarak OpenAI yedek entegrasyonu ekleme | 🟡 Orta |

### ST Stratejileri — Güçlü Yönlerle Tehditleri Azaltma
| # | Strateji | Öncelik |
|---|---|---|
| ST-1 | API anahtarını sunucu tarafına taşıyarak (Vercel Function) güvenlik açığını kapatma | 🔴 Kritik |
| ST-2 | Her AI çıktısına zorunlu tıbbi sorumluluk reddi eklenmesi | 🔴 Kritik |
| ST-3 | KVKK kapsamında kamera kullanımı için açık rıza akışı (consent flow) oluşturma | 🔴 Kritik |

### WO Stratejileri — Zayıf Yönleri Fırsatlarla Giderme
| # | Strateji | Öncelik |
|---|---|---|
| WO-1 | Firebase Auth + Firestore ile kullanıcı verilerini buluta taşıma (LocalStorage bağımlılığını kırma) | 🟡 Orta |
| WO-2 | Web Push API (VAPID) ile gerçek zamanlı ilaç hatırlatıcısı ekleme | 🟡 Orta |
| WO-3 | WCAG 2.1 AA uyumluluğu ve çok dilli destek (EN/AR/KU) ekleme | 🟢 Düşük |

### WT Stratejileri — Zayıf Yönleri ve Tehditleri Birlikte Yönetme
| # | Strateji | Öncelik |
|---|---|---|
| WT-1 | Hastane transplant ekibiyle içerik doğrulama protokolü imzalama | 🟡 Orta |
| WT-2 | TİTCK ile ön görüşme yaparak sınıflandırma belirsizliğini giderme | 🟡 Orta |
| WT-3 | Çoklu AI provider stratejisi (fallback mechanism) ile Groq bağımlılığını azaltma | 🟡 Orta |

---

## 📈 6. Özet Puanlama

| Kategori | Ağırlık | Puan (1-10) | Ağırlıklı Puan |
|---|---|---|---|
| **Güçlü Yönler** | %30 | 7.8 | 2.34 |
| **Zayıf Yönler** (negatif) | %20 | -6.0 | -1.20 |
| **Fırsatlar** | %30 | 8.5 | 2.55 |
| **Tehditler** (negatif) | %20 | -5.5 | -1.10 |
| **SWOT Net Skoru** | | | **2.59 / 10** |

> **Yorum:** Net skor pozitif olup proje önemli bir fırsat alanında konumlanmaktadır. Ancak güvenlik açığı ve mevzuat uyumsuzluklarının kritik öncelikle giderilmesi gerekmektedir.

---

## 🔍 7. Kıyaslama — Benzer Uygulamalarla Karşılaştırma

| Özellik | LiveCare AR | MyTransplant (ABD) | OrganCare (AB) | e-Nabız (TR) |
|---|---|---|---|---|
| AR Modülü | ✅ Var | ❌ Yok | ❌ Yok | ❌ Yok |
| AI Yemek Analizi | ✅ Var | ❌ Yok | ❌ Yok | ❌ Yok |
| PWA / Offline | ✅ Var | ✅ Var | ✅ Var | ❌ Yok |
| HBYS Entegrasyonu | ❌ Yok | ✅ Var | ✅ Var | ✅ Var |
| Klinik Validasyon | ❌ Yok | ✅ Var | ✅ Var | ✅ Var |
| KVKK/GDPR Uyumu | ⚠️ Eksik | ✅ Tam | ✅ Tam | ✅ Tam |
| Maliyet | Ücretsiz | Kurumsal | Kurumsal | Ücretsiz |

---

## 📝 8. Sonuç

**LiveCare AR**, özgün AR + AI kombinasyonu ve hasta odaklı çok modüllü yapısıyla Türkiye'de bir ilk olma özelliği taşıyan gerçek anlamda yenilikçi bir sağlık teknolojisi ürünüdür. Güçlü yönleri ve fırsatları, mevcut zayıflıklarını ve tehditleri sayısal olarak geçmektedir; ancak özellikle **API güvenliği**, **KVKK uyumu** ve **klinik doğrulama** konularındaki eksikliklerin kısa vadede giderilmesi, projenin hem ticari hem de etik sürdürülebilirliği açısından zorunludur.

---
*Bu analiz; proje kodları, kullanılan teknolojilerin güncel dokümantasyonları ve 2026 yılı sağlık teknolojisi ekosistemi verileri esas alınarak hazırlanmıştır.*
