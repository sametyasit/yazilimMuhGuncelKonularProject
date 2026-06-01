# LiveCare AR - SWOT Analizi

Bu belge, **LiveCare AR** (Karaciğer Nakli Sonrası Hasta Eğitim ve Destek Uygulaması) projesinin mevcut durumunu analiz etmek, güçlü/zayıf yönlerini belirlemek, gelecek potansiyellerini (fırsatlarını) ve karşılaşabileceği riskleri (tehditleri) değerlendirmek amacıyla hazırlanmıştır.

---

## 📊 SWOT Matrisi Özet Tablosu

| Güçlü Yönler (Strengths) | Zayıf Yönler (Weaknesses) |
| :--- | :--- |
| • Web tabanlı ve PWA uyumlu olması (Kurulumsuz erişim)<br>• AR (Artırılmış Gerçeklik) entegrasyonu ile interaktif eğitim<br>• Yapay Zeka (AI) ile gerçek zamanlı kahvaltı analizi<br>• Sıfır harici kütüphane bağımlılığı (Hafif ve hızlı)<br>• Kullanıcı dostu ve mikro-etkileşimli tasarım | • API anahtarının istemci tarafında (Client-side) bulunması<br>• Kalıcı bir veritabanının olmaması (LocalStorage kaybı)<br>• AR.js için fiziksel "Hiro" markörüne bağımlılık<br>• Arka planda gerçek anlık bildirim (Push Notification) eksikliği |
| **Fırsatlar (Opportunities)** | **Tehditler (Threats)** |
| • Hastane ve Hekim Bilgi Sistemleri (HBYS) entegrasyonu<br>• Markörsüz AR teknolojilerine geçiş (MindAR vb.)<br>• Sesli asistan ve erişilebilirlik entegrasyonları<br>• Yapay zekanın ilaç kutusu/reçete okuma alanına genişletilmesi | • AI'ın yanlış teşhis yapmasından doğacak tıbbi riskler<br>• Groq/AI API bağımlılığı ve ek maliyetler<br>• Tarayıcı kamera izin kısıtlamaları<br>• Sağlık uygulamalarına yönelik yasal regülasyonlar (KVKK, CE/MDR) |

---

## 🔍 Detaylı SWOT Analizi

### 1. 💪 Güçlü Yönler (Strengths)

*   **PWA ve Kolay Erişim:** Uygulama Progressive Web App (PWA) altyapısına sahiptir. Kullanıcılar Google Play veya App Store indirmesine gerek duymadan tarayıcıdan uygulamaya ulaşabilir ve cihazlarına kısayol olarak ekleyebilir.
*   **İnteraktif AR Deneyimi:** A-Frame ve AR.js kullanılarak entegre edilen Artırılmış Gerçeklik (AR) teknolojisi, hastaların sıkıcı broşürler yerine 3D kartlar üzerinden kritik bilgileri öğrenmesini sağlar.
*   **Yapay Zeka (AI) Yemek Analizi:** Kamera görüntüsünü alarak Groq API üzerinden LLM modeline gönderen ve yiyeceğin nakil hastası için uygun olup olmadığını belirleyen bir sisteme sahiptir.
*   **Bağımsızlık ve Performans:** Proje saf HTML, CSS ve JavaScript (Vanilla JS) ile yazıldığı için çok hızlı yüklenir, gereksiz framework yükü taşımaz.
*   **Hasta Odaklı Kritik Özellikler:** İlaç takibi, acil durum rehberi, eğitici yiyecek oyunu ve motivasyon strip'i gibi hastaların günlük yaşam kalitesini artıracak temel fonksiyonlar bir arada sunulmuştur.

### 2. ⚠️ Zayıf Yönler (Weaknesses)

*   **Güvenlik Açığı (API Key Exposure):** Yapay zeka analizi için kullanılan Groq API anahtarı doğrudan frontend kodunda (`script.js` içinde) yer almaktadır. Bu durum anahtarın kötü niyetli kişiler tarafından çalınmasına yol açabilir. Bir backend/proxy servisi gereklidir.
*   **Veri Kaybı Riski (Veritabanı Yokluğu):** Kullanıcının kaydettiği ilaçlar ve tamamlanan görevler sadece tarayıcının `localStorage` alanında tutulmaktadır. Tarayıcı önbelleği silindiğinde veya cihaz değiştirildiğinde tüm veriler kaybolur.
*   **Hiro Markörü Zorunluluğu:** AR modülünün çalışması için kameranın mutlaka siyah çerçeveli bir "Hiro" markörünü görmesi gerekir. Bu da kullanım kolaylığını kısıtlar.
*   **Kısıtlı Bildirim Sistemi:** Gerçek zamanlı push bildirimleri olmadığından, ilaç saati geldiğinde uygulama kapalıysa kullanıcıya bildirim gönderilemez. Sadece uygulama içi widget üzerinden bilgilendirme yapılmaktadır.

### 3. 🚀 Fırsatlar (Opportunities)

*   **HBYS Entegrasyonu:** Uygulama hastanelerin veri sistemleriyle entegre edilerek, hastanın ilaç içme sıklığı ve acil durum bildirimleri doğrudan hekimin paneline aktarılabilir.
*   **Markörsüz (Markerless) AR Geçişi:** MindAR veya WebXR standartlarına geçilerek, herhangi bir kağıda/resme ihtiyaç duymadan doğrudan masa veya duvar üzerinde 3D nesneler yansıtılabilir.
*   **Gelişmiş AI İşlevleri:** Yapay zeka modeli sadece kahvaltı değil, tüm öğünleri ve hatta ilaç kutularını tarayıp prospektüs etkileşimlerini denetleyecek şekilde genişletilebilir.
*   **Erişilebilirlik (Seslendirme):** Görme engelli veya yaşlı hastalar için bilgilendirme kartlarının ve AI analiz sonuçlarının sesli okunması (Text-to-Speech) eklenebilir.

### 4. ⚡ Tehditler (Threats)

*   **Tıbbi Sorumluluk ve Hatalı Teşhis:** Yapay zekanın zararlı bir yiyeceği (örneğin greyfurtu portakal sanıp) "UYGUN" olarak sınıflandırması hasta sağlığı için doğrudan hayati tehlike oluşturur. Yasal sorumluluk sınırları çok nettir.
*   **API Kesintileri ve Maliyetler:** Groq API'sinde yaşanacak yavaşlama veya kesintiler AI yemek tanıma özelliğini tamamen devre dışı bırakır. Ayrıca yüksek trafik altında API kullanım maliyetleri artacaktır.
*   **Kamera ve İzin Kısıtlamaları:** Tarayıcı güvenliği ve iOS/Android güncellemeleri kamera erişimini engelleyebilir veya kullanıcıyı zorlayan izin pencereleri çıkarabilir.
*   **Mevzuat Engelleri:** Kişisel sağlık verilerinin korunması (KVKK/GDPR) ve tıbbi cihaz/yazılım sertifikasyonu (MDR) süreçleri uygulamanın yaygınlaşmasını zorlaştırabilir.

---

## 🛠️ İyileştirme Önerileri (Action Plan)

1.  **Güvenlik:** API isteklerini güvenli hale getirmek için sunucu tarafında çalışan basit bir Serverless Function (Vercel, Firebase vb.) veya Node.js proxy servisi kurulmalı, API anahtarı frontend'den kaldırılmalıdır.
2.  **Veritabanı:** Firebase Auth ve Firestore gibi hafif bulut veritabanları eklenerek kullanıcı verilerinin güvenli şekilde yedeklenmesi sağlanmalıdır.
3.  **AR Modernizasyonu:** Hiro markörü yerine zemin algılamalı güncel WebXR kütüphanelerine geçiş araştırılmalıdır.
4.  **Sorumluluk Reddi (Disclaimer):** AI ekranına "Bu analiz bilgilendirme amaçlıdır, doktor tavsiyesi yerine geçmez" uyarısı eklenmeli ve yasal sorumluluk sınırlandırılmalıdır.
