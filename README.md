# LiveCare AR - Karaciğer Nakli Hasta Eğitim ve Destek Portalı

**LiveCare AR**, karaciğer nakli olmuş hastaların operasyon sonrası kritik iyileşme süreçlerini kolaylaştırmak, sağlıklı alışkanlıklar edinmelerini sağlamak ve onları eğlenceli/interaktif yöntemlerle eğitmek amacıyla geliştirilmiş **Web tabanlı bir Progressive Web App (PWA)** uygulamasıdır.

Bu proje, geleneksel hasta bilgilendirme broşürlerinin ötesine geçerek **Artırılmış Gerçeklik (AR)** ve **Yapay Zeka (AI)** destekli modern teknolojileri hastanın hizmetine sunar.

---

## 🚀 Temel Özellikler

1. **Artırılmış Gerçeklik (AR) Modülü:** 
   * A-Frame ve AR.js kütüphaneleri kullanılarak geliştirilmiştir.
   * Fiziksel veya dijital **Hiro Markörü** kameraya gösterildiğinde, ilaç kullanımı, beslenme kuralları, organ reddi belirtileri gibi hayati bilgileri içeren interaktif 3D kartlar havada canlanır.
2. **Yapay Zeka (AI) Yemek Tanıma ve Analiz:**
   * Cihaz kamerasını kullanarak kahvaltılıkların fotoğrafını çeker.
   * Çekilen fotoğrafı **Groq Cloud API** aracılığıyla güncel bir LLM modeline göndererek, karaciğer nakli hastalarına özel hazırlanmış beslenme veri seti doğrultusunda uygunluğunu analiz eder (**UYGUN**, **DIKKATLI TUKETIN**, **ZARARLI**).
3. **Eğitici Yiyecek Oyunu:**
   * Hastaların beslenme kurallarını eğlenerek öğrenmesi için tasarlanmış 15 soruluk etkileşimli kart oyunudur.
   * Doğru/yanlış cevaplarda ses, titreşim ve konfeti gibi mikro-etkileşimler sunar.
4. **İlaç Saatleri Takibi:**
   * Kullanıcıların günlük kullanması gereken immünsupresif vb. ilaçları saatleriyle birlikte eklemesini sağlar.
   * En yakın ilaç saatini ana ekrandaki akıllı widget üzerinde dinamik olarak görüntüler.
5. **Hatırlatıcı Görev Kartları:**
   * Günlük su tüketimi, yürüyüş, ateş ölçümü ve haftalık kontroller gibi görevlerin takibini kolaylaştıran interaktif kontrol listesidir.
6. **Acil Durum Belirtileri:**
   * 38°C üstü ateş, sarılık gibi nakil sonrası hayati risk taşıyan belirtileri listeler.
   * Acil durumlarda 112 veya Nakil Merkezi Hattı'nın doğrudan aranmasını sağlayan hızlı butonlar içerir.
7. **PWA & Çevrimdışı Çalışma Desteği:**
   * Service Worker altyapısı sayesinde çevrimdışı (offline) çalışabilir ve mobil cihazlara yerel bir uygulama gibi kurulabilir.

---

## 🛠️ Kullanılan Teknolojiler

* **Frontend:** HTML5, Vanilla CSS3 (CSS Variables, Grid & Flexbox, Custom Animations), Vanilla JavaScript (ES6+).
* **AR Teknolojisi:** A-Frame (`v1.3.0`), AR.js (`v3.4.5`).
* **Yapay Zeka (AI):** Groq API (`meta-llama/llama-4-scout-17b-16e-instruct` veya benzeri vizyon modelleri).
* **Veri Saklama:** Tarayıcı tabanlı `localStorage`.
* **Mobil Uyumluluk:** PWA (Progressive Web App) Manifest ve Service Worker.

---

## 📂 Dosya Yapısı

```bash
├── index.html          # Ana uygulama arayüzü ve tüm modüllerin panelleri
├── ar.html             # Artırılmış Gerçeklik (AR.js / A-Frame) ekranı
├── style.css           # Modern, dinamik ve karanlık mod destekli CSS tasarımları
├── script.js           # Uygulama mantığı, oyun mekanikleri, ilaç takibi ve AI entegrasyonu
├── sw.js               # Çevrimdışı çalışma ve önbellekleme için Service Worker
├── manifest.json       # PWA yükleme bilgileri ve tema ayarları
├── SWOT_Analizi.md     # Projenin güçlü, zayıf yönlerini ve risklerini içeren analiz belgesi
└── README.md           # Proje genel tanıtım ve kurulum belgesi (Bu dosya)
```

---

## ⚙️ Kurulum ve Çalıştırma

Uygulama statik dosyalardan oluştuğu için herhangi bir derleme (build) sürecine ihtiyaç duymaz. Ancak kamera erişimi, AR ve AI özelliklerinin sorunsuz çalışabilmesi için dosyaların bir yerel web sunucusu (Local Web Server) üzerinden sunulması gerekmektedir.

### Python ile Çalıştırma (Önerilen)
Terminali açıp proje dizinine gidin ve şu komutu çalıştırın:
```bash
python3 -m http.server 8000
```
Ardından tarayıcınızdan şu adrese gidin:
[http://localhost:8000](http://localhost:8000)

### Node.js (http-server) ile Çalıştırma
Eğer bilgisayarınızda Node.js kuruluysa:
```bash
npx http-server -p 8000
```
Ardından tarayıcınızdan şu adrese gidin:
[http://localhost:8000](http://localhost:8000)

---

## ⚠️ Önemli Güvenlik ve Tıbbi Uyarılar

1. **API Anahtarı Güvenliği:** Mevcut sürümde Groq API anahtarı `script.js` dosyasında istemci tarafında tutulmaktadır. Üretim (production) ortamına geçilirken bu anahtarın güvenli bir backend proxy sunucusuna taşınması gerekmektedir.
2. **Tıbbi Sorumluluk Reddi:** Yapay zeka ile yemek tanıma özelliği tamamen bilgilendirme amaçlıdır. AI modellerinin hata payı olabileceği için hastaların diyet listeleri konusunda her zaman doktor veya uzman diyetisyenlerinin tavsiyelerini esas alması gerekmektedir.
