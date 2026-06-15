Samet Yasıt 225542017
Zeki Erdem Sincer 225541005
Ahmet Hakan Pusa  225541023
Burak Dansık  225542001
# 🫀 LiveCare AR
## Karaciğer Nakli Sonrası Hasta Eğitim ve Destek Uygulaması

<div align="center">

![LiveCare AR Banner](https://img.shields.io/badge/LiveCare_AR-v1.0-6c63ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIj48cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgcng9IjQwIiBmaWxsPSIjNmM2M2ZmIi8+PHRleHQgeT0iMTMwIiBmb250LXNpemU9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgeD0iOTYiPkxDPC90ZXh0Pjwvc3ZnPg==)
![PWA](https://img.shields.io/badge/PWA-Destekli-4CAF50?style=for-the-badge&logo=pwa)
![AR](https://img.shields.io/badge/AR-A--Frame_v1.3-orange?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Groq_LLaMA_4-blueviolet?style=for-the-badge)
![Lisans](https://img.shields.io/badge/Lisans-Akademik-blue?style=for-the-badge)
![Dil](https://img.shields.io/badge/Dil-Türkçe-red?style=for-the-badge)

</div>

---

> **LiveCare AR**, karaciğer nakli geçirmiş hastaların post-transplant iyileşme sürecini kolaylaştırmak, kritik tıbbi bilgileri etkileşimli yöntemlerle öğretmek ve günlük sağlık takibini dijitalleştirmek amacıyla geliştirilmiş, **Artırılmış Gerçeklik (AR)** ve **Yapay Zeka (AI)** destekli bir **Progressive Web App (PWA)**'dır.

---

## 📑 İçindekiler

1. [Proje Hakkında](#-proje-hakkında)
2. [Temel Özellikler](#-temel-özellikler)
3. [Ekran Görüntüleri ve Akış](#-uygulama-akışı)
4. [Kullanılan Teknolojiler](#-kullanılan-teknolojiler)
5. [Mimari Yapı](#-mimari-yapı)
6. [Dosya Yapısı](#-dosya-yapısı)
7. [Kurulum ve Çalıştırma](#️-kurulum-ve-çalıştırma)
8. [AR Modülü Kullanımı](#-ar-modülü-kullanımı)
9. [AI Yemek Analizi](#-ai-yemek-analizi)
10. [Konfigürasyon](#️-konfigürasyon)
11. [Güvenlik Uyarıları](#-güvenlik-uyarıları)
12. [Tıbbi Sorumluluk Reddi](#️-tıbbi-sorumluluk-reddi)
13. [Katkı ve Geliştirme](#-katkı-ve-geliştirme)

---

## 🔬 Proje Hakkında

### Neden Bu Proje?

Karaciğer nakli, dünyada gerçekleştirilen en karmaşık cerrahi prosedürlerden biridir. Nakil sonrası hastalar;
- **Ömür boyu immünsupresif ilaç kullanımı** (Takrolimus, Siklosporin, Mikofenolat)
- **Katı diyet kısıtlamaları** (greyfurt yasağı, çiğ gıda yasağı, alkol yasağı)
- **Organ reddi belirtilerini tanıma** sorumluluğu
- **Düzenli kontrol takvimleri ve görev yönetimi**

gibi hayati öneme sahip protokollere uymak zorundadır. Geleneksel hasta eğitim yöntemleri (broşürler, sözlü açıklama) bu karmaşıklığı yönetmede yetersiz kalmaktadır.

**LiveCare AR**, bu boşluğu doldurmak için:
- 🏥 Hastayı **doktor yokken** bilgilendirir,
- 🎮 **Oyunlaştırılmış öğrenme** (gamification) ile uyumu artırır,
- 🥗 **Yapay zeka** ile anlık yemek güvenliği analizi yapar,
- 🔮 **Artırılmış gerçeklik** ile görsel-mekânsal hafıza oluşturur.

### Hedef Kitle

- Karaciğer nakli operasyonu geçirmiş hastalar
- Hastaların bakıcıları ve aile üyeleri
- Transplant koordinatörleri ve hemşireler (eğitim materyali olarak)

---

## ✨ Temel Özellikler

### 1. 🔮 Artırılmış Gerçeklik (AR) Modülü

**Teknoloji:** A-Frame v1.3.0 + AR.js v3.4.5

Uygulamanın en öne çıkan modülü olan AR deneyimi, hastanın cihaz kamerasını **Hiro markerına** yöneltmesiyle aktive olur ve havada beliren 3D bilgi kartları aracılığıyla hayati tıbbi bilgileri sunar.

**Mevcut AR Kartları (6 kategori):**

| # | Kart Başlığı | Önem Rengi | İçerik Özeti |
|---|---|---|---|
| 1 | 💊 İlaç Kullanımı | 🔴 KRİTİK | İmmünsupresif ilaçların günlük düzenli alımı |
| 2 | 🥗 Beslenme Kuralları | 🟡 ÖNEMLI | Greyfurt yasağı, diyet protokolü |
| 3 | ⚠️ Red Belirtileri | 🔴 ACİL | Ateş, sarılık, karın ağrısı - acil numaralar |
| 4 | 🚫 Kaçınılacaklar | 🔴 KRİTİK | Alkol, sigara, risk faktörleri |
| 5 | 🏃 Egzersiz ve Yaşam | 🟢 NORMAL | Günlük 20-30 dk yürüyüş rehberi |
| 6 | 🚨 Acil Durumlar | 🔴 ACİL | 112 ve Nakil Merkezi iletişim |

**Teknik Özellikler:**
- Marker algılandığında titreşim geri bildirimi (`navigator.vibrate`)
- Anlık marker kaybı/bulma bildirim sistemi
- Kart kategorileri arası tek tıkla geçiş
- Görseldeki koordinat sistemi: Z negatif = üst, Z pozitif = alt

---

### 2. 🤖 Yapay Zeka (AI) Yemek Analizi

**Teknoloji:** Groq Cloud API + meta-llama/llama-4-scout-17b (Vizyon Modeli)

Cihaz kamerasından fotoğraf çekilerek Groq API'ye gönderilir; model, karaciğer nakli hastası diyeti perspektifinden gıdayı üç seviyeli skala ile değerlendirir:

```
✅ UYGUN          → Tüketilebilir, karaciğer nakli diyetiyle uyumlu
⚠️ DİKKATLİ TÜKETİN → Kontrollü miktarda, doktor onayıyla
❌ ZARARLI        → Kesinlikle kaçınılmalı (örn. greyfurt, alkol, çiğ et)
```

**Analiz Akışı:**
```
Kamera Açılır → Fotoğraf Çekilir → Base64 Encode → Groq API POST →
LLaMA 4 Vizyon Analizi → JSON Yanıt Parse → Kullanıcıya Sonuç Gösterimi
```

**API Yanıt Formatı (beklenen):**
```json
{
  "food_name": "Greyfurt",
  "status": "ZARARLI",
  "reason": "Greyfurt, Takrolimus ve Siklosporin ile ciddi ilaç etkileşimine girer...",
  "details": "CYP3A4 enzimini inhibe ederek ilaç kan seviyesini kritik derecede yükseltir."
}
```

---

### 3. 📚 Bilgilendirme Kartları Modülü

10 adet eğitici içerik kartı, swipe/buton navigasyonuyla sunulur. Her kart:
- Konuya özel emoji ikon
- Kategori etiketi
- Tamamlanma takibi (progres barı)
- Kartlar arası geçiş animasyonu

---

### 4. 🎮 Yiyecek / İçecek Oyunu (Gamification)

15 soruluk interaktif bir kart oyunu ile hastalar beslenme kurallarını öğrenir.

**Oyun Mekanikleri:**
- Her soru için iki seçenek: **Uygun** / **Uygun Değil**
- Doğru cevapta: konfeti animasyonu + pozitif ses geri bildirimi
- Yanlış cevapta: titreşim + neden açıklaması
- Oyun sonu skoru ve özet ekranı

**Oyun Metrikleri:**
```
Doğru Sayısı | Yanlış Sayısı | Kalan Soru
     0       |      0        |     15
```

---

### 5. ✅ Hatırlatıcı Görev Kartları

Günlük ve haftalık görevlerin takibi için interaktif kontrol listesi sistemi.

**Günlük Görevler (Örnekler):**
- 💧 2 litre su içme
- 🌡️ Sabah ateş ölçümü
- 💊 Sabah ilacı alma
- 🚶 20 dakika yürüyüş
- ⚖️ Kilo ölçümü

**Haftalık Görevler (Örnekler):**
- 🏥 Kontrol randevusu takibi
- 🩸 Kan tahlili kontrolü
- 📋 İlaç stoğu kontrolü

**Özellikler:**
- Sekme bazlı görünüm (Günlük / Haftalık)
- Tümünü tamamla / Sıfırla butonları
- Ana ekranda bildirim dot göstergesi
- LocalStorage tabanlı kalıcılık

---

### 6. 🚨 Acil Durum Rehberi

Organ reddi ve kritik durumlar için hızlı erişilebilir acil durum modülü.

**İçerik:**
- Organ reddi belirtileri listesi (38°C+ ateş, sarılık, vb.)
- Acil arama butonları (pulse animasyonlu):
  - 📞 `112 Acil` (hızlı ara)
  - 🏥 Nakil Merkezi Hattı: `0850 255 9999`

---

### 7. 💊 İlaç Saatleri Takibi

Kişiselleştirilebilir ilaç hatırlatıcı sistemi.

**Özellikler:**
- İlaç adı ve saati ekleme (örn. "Prograf — 08:00")
- En yakın ilaç saatini ana ekranda dinamik widget olarak gösterme
- Birden fazla ilaç desteği
- Saat bazlı sıralama

**Widget Görünümü (Ana Ekran):**
```
💊 Sonraki İlaç Saati
   Prograf — 08:00 (2 saat sonra)  ›
```

---

### 8. 🌙 Koyu/Açık Tema Desteği

- Tek tıkla tema geçişi (Dark / Light Mode)
- `data-theme` attribute tabanlı CSS değişkeni sistemi
- Tercih `localStorage`'da saklanır
- Tüm modüllerde tutarlı tema uygulaması

---

### 9. 📱 PWA & Çevrimdışı Destek

- Ana ekrana kısayol ekleme (Add to Home Screen)
- `sw.js` Service Worker ile statik asset önbellekleme
- Çevrimdışı (offline) temel işlevsellik
- `manifest.json` ile yerel uygulama deneyimi

---

## 🗺️ Uygulama Akışı

```
┌─────────────────────────────────────────┐
│            SPLASH EKRANI                │
│    (Logo + Yükleme Animasyonu)          │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│              ANA EKRAN                  │
│  ┌─────────┐  ┌─────────┐              │
│  │Bilgi-   │  │Yiyecek  │              │
│  │lendirme │  │ Oyunu   │              │
│  └─────────┘  └─────────┘              │
│  ┌─────────┐  ┌─────────┐              │
│  │Hatırlat.│  │  Acil   │              │
│  │ Kartlar │  │  Durum  │              │
│  └─────────┘  └─────────┘              │
│  ┌─────────────────────────┐           │
│  │   AI Yemek Tanıma       │           │
│  └─────────────────────────┘           │
│  ┌─────────────────────────┐           │
│  │ Artırılmış Gerçeklik AR │ → ar.html │
│  └─────────────────────────┘           │
│  ┌─────────────────────────┐           │
│  │  İlaç Saatleri Widgeti  │           │
│  └─────────────────────────┘           │
└─────────────────────────────────────────┘
```

---

## 🛠️ Kullanılan Teknolojiler

### Frontend Core

| Teknoloji | Versiyon | Kullanım Amacı |
|---|---|---|
| HTML5 | — | Uygulama yapısı ve semantik markup |
| CSS3 (Vanilla) | — | CSS Variables, Grid, Flexbox, Keyframe Animasyonlar |
| JavaScript | ES6+ | Uygulama mantığı, API entegrasyonu, UI kontrolü |
| Google Fonts (Nunito) | — | Tipografi |

### Artırılmış Gerçeklik

| Kütüphane | Versiyon | Kullanım Amacı |
|---|---|---|
| A-Frame | 1.3.0 | WebVR/WebXR 3D sahne yönetimi |
| AR.js | 3.4.5 | Marker tabanlı AR işleme motoru |

### Yapay Zeka / API

| Servis | Model | Kullanım Amacı |
|---|---|---|
| Groq Cloud API | meta-llama/llama-4-scout-17b-16e-instruct | Vizyon tabanlı yemek analizi |

### PWA Altyapısı

| Bileşen | Dosya | Kullanım Amacı |
|---|---|---|
| Service Worker | `sw.js` | Çevrimdışı önbellekleme |
| Web App Manifest | `manifest.json` | Yerel uygulama kurulumu |
| Canvas API | `confettiCanvas` | Konfeti animasyonu |
| LocalStorage | — | Kullanıcı verisi kalıcılığı |
| Camera API | `getUserMedia` | AR ve AI için kamera erişimi |
| Vibration API | `navigator.vibrate` | Dokunsal geri bildirim |

---

## 🏗️ Mimari Yapı

```
┌─────────────────────────────────────────────────────────────┐
│                    KULLANICI CİHAZI                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  TARAYICI ORTAMI                     │   │
│  │                                                      │   │
│  │  ┌─────────────┐    ┌─────────────┐                 │   │
│  │  │  index.html │    │   ar.html   │                 │   │
│  │  │  (Ana App)  │    │  (AR Sahne) │                 │   │
│  │  └──────┬──────┘    └──────┬──────┘                 │   │
│  │         │                  │                         │   │
│  │  ┌──────▼──────────────────▼──────┐                 │   │
│  │  │           script.js            │                 │   │
│  │  │  • Modül yönetimi              │                 │   │
│  │  │  • Oyun mantığı                │                 │   │
│  │  │  • İlaç takibi                 │                 │   │
│  │  │  • AI API çağrısı              │                 │   │
│  │  │  • LocalStorage CRUD           │                 │   │
│  │  └──────┬─────────────────────────┘                 │   │
│  │         │                                            │   │
│  │  ┌──────▼──────┐    ┌──────────────┐               │   │
│  │  │  style.css  │    │  localStorage│               │   │
│  │  │  (Tasarım)  │    │  (Veri)      │               │   │
│  │  └─────────────┘    └──────────────┘               │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │              sw.js (Service Worker)           │  │   │
│  │  │  • Statik asset önbellekleme                  │  │   │
│  │  │  • Offline fallback                           │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   GROQ CLOUD API  │
                    │  (LLaMA 4 Vizyon) │
                    └───────────────────┘
```

---

## 📂 Dosya Yapısı

```
yazilimMuhGuncelKonularProject/
│
├── 📄 index.html          # Ana uygulama — tüm modüllerin panel yapısı
│                          # Splash, AnaEkran, Bilgilendirme, Oyun,
│                          # Hatırlatıcı, Acil, İlaç, AI modülleri
│
├── 🔮 ar.html             # Artırılmış Gerçeklik sahnesi
│                          # A-Frame + AR.js entegrasyonu
│                          # 6 kategori AR kart sistemi
│
├── 🎨 style.css           # Kapsamlı CSS sistemi
│                          # CSS Variables (Dark/Light tema)
│                          # Grid/Flexbox layout
│                          # Keyframe animasyonlar
│                          # Mobil-first responsive tasarım
│
├── ⚙️ script.js           # Tüm uygulama mantığı (~25KB)
│                          # Modül yönetimi (openInfo, openGame vb.)
│                          # Oyun mekanikleri (15 soruluk soru bankası)
│                          # İlaç takibi CRUD işlemleri
│                          # AI kamera entegrasyonu
│                          # LocalStorage veri yönetimi
│                          # Tema ve konfeti animasyonları
│
├── 🔧 sw.js               # Service Worker
│                          # Fetch event handler
│                          # Cache-first stratejisi
│
├── 📋 manifest.json       # PWA Web App Manifest
│                          # Uygulama metadata
│                          # SVG tabanlı uygulama ikonları
│                          # display: standalone modu
│
├── 📊 SWOT_Analizi.md     # Kapsamlı SWOT analizi belgesi
│                          # Güçlü/Zayıf yönler, Fırsatlar, Tehditler
│                          # Stratejik aksiyon planı
│
└── 📖 README.md           # Bu dosya — proje dokümantasyonu
```

---

## ⚙️ Kurulum ve Çalıştırma

### Ön Gereksinimler

- Modern tarayıcı (Chrome 90+, Safari 14+, Firefox 88+, Edge 90+)
- Çalışan kamera (AR ve AI özellikleri için)
- HTTPS veya localhost ortamı (kamera API'si için zorunlu)
- İnternet bağlantısı (AI analizi için; diğer özellikler offline çalışır)
- Groq API anahtarı (AI yemek analizi için)

### Yöntem 1: Python HTTP Server (Önerilen — Kurulum Gerektirmez)

```bash
# Proje dizinine girin
cd "yazilimMuhGuncelKonularProject"

# Python 3 ile yerel sunucu başlatın
python3 -m http.server 8000

# Tarayıcıda açın
# → http://localhost:8000
```

### Yöntem 2: Node.js http-server

```bash
# http-server'ı global olarak yükleyin (bir kez)
npm install -g http-server

# Proje dizininde başlatın
http-server -p 8000 --cors

# Tarayıcıda açın
# → http://localhost:8000
```

### Yöntem 3: npx ile (Kurulum Gerektirmez)

```bash
cd "yazilimMuhGuncelKonularProject"
npx http-server -p 8000
# → http://localhost:8000
```

### Yöntem 4: VS Code Live Server

1. VS Code'da **Live Server** eklentisini yükleyin
2. `index.html` dosyasına sağ tıklayın
3. **"Open with Live Server"** seçeneğine tıklayın
4. Tarayıcı otomatik açılır

---

## 🔮 AR Modülü Kullanımı

### Adım 1: AR Sayfasına Geçiş
Ana ekranda **"Artırılmış Gerçeklik (AR)"** butonuna tıklayın.

### Adım 2: Kamera İzni
Tarayıcının kamera erişim isteğini **İzin Ver** ile onaylayın.

### Adım 3: Hiro Marker Hazırlama
Aşağıdaki marker görselini kullanın. Ekranda görüntüleyebilir veya yazdırabilirsiniz:

```
Marker URL:
https://ar-js-org.github.io/AR.js/data/images/hiro.png
```

> 💡 **İpucu:** Uygulamanın sağ alt köşesinde referans marker görseli de mevcuttur.

### Adım 4: Kamerayı Markere Yöneltin
- Kamerayı markerdan yaklaşık **20-50 cm** uzakta tutun,
- Marker tam çerçeveye girdiğinde **"Marker Algılandı!"** bildirimi çıkar,
- 3D kart markerın üzerinde belirir.

### Adım 5: Kart Değiştirme
Ekranın alt kısmındaki kategori butonlarından istediğiniz AR kartına geçin.

---

## 🤖 AI Yemek Analizi

### Kullanım Adımları

1. Ana ekranda **"Yapay Zeka ile Yemek Tanı"** butonuna tıklayın
2. Kamera iznini onaylayın
3. Analiz etmek istediğiniz yiyeceği kameraya gösterin
4. **"Fotoğraf Çek"** butonuna basın
5. Yapay zeka analiz sonucunu birkaç saniye içinde gösterir

### Analiz Sonuç Formatı

```
┌─────────────────────────────────┐
│  🟢 UYGUN                       │
│  Haşlanmış Tavuk Göğsü          │
│                                  │
│  Karaciğer nakli sonrası düşük  │
│  yağlı protein kaynağı olarak   │
│  tüketilebilir.                  │
│                                  │
│  Detay: B vitamini, demir...     │
└─────────────────────────────────┘
```

---

## 🗝️ Konfigürasyon

### Groq API Anahtarı Ayarlama

> ⚠️ **Güvenlik Uyarısı:** Mevcut yapıda API anahtarı `script.js` içindedir. Bu yalnızca geliştirme ve demo amaçlıdır. Üretim ortamına geçmeden önce aşağıdaki güvenli yaklaşımı uygulayın.

**Mevcut konum (script.js):**
```javascript
const GROQ_API_KEY = "gsk_xxxxxxxxxxxxxxxxxxxx"; // ← Buraya API anahtarınızı girin
```

**Güvenli yaklaşım (önerilen):**
```
Kullanıcı Tarayıcısı → Vercel Serverless Function → Groq API
                          (API anahtarı burada saklanır)
```

### Groq API Anahtarı Almak İçin

1. [console.groq.com](https://console.groq.com) adresine gidin
2. Hesap oluşturun veya giriş yapın
3. **API Keys** → **Create API Key**
4. Oluşturulan anahtarı `script.js` içindeki `GROQ_API_KEY` değişkenine atayın

### Uygulama İçerik Konfigürasyonu

**Yiyecek Oyunu Sorularını Güncelleme (`script.js`):**
```javascript
const foodItems = [
  { name: "Greyfurt", emoji: "🍊", safe: false,
    reason: "Takrolimus ile ciddi ilaç etkileşimine girer." },
  { name: "Haşlanmış Tavuk", emoji: "🍗", safe: true,
    reason: "Düşük yağlı protein kaynağı, nakil diyetiyle uyumlu." },
  // ... daha fazla öğe eklenebilir
];
```

**AR Kartları Güncelleme (`ar.html`):**
```javascript
const cards = [
  {
    title: 'ILAC KULLANIMI',
    l1: 'Satır 1 metni',
    l2: 'Satır 2 metni (vurgulanan)',
    l3: 'Satır 3 metni',
    l4: 'Satır 4 metni',
    status: 'ALT DURUM MESAJI',
    sc: '#ef4444',   // status banner rengi
    hc: '#6c63ff',   // header rengi
    l2c: '#fbbf24'   // 2. satır metin rengi
  },
  // ... diğer kartlar
];
```

---

## 🔒 Güvenlik Uyarıları

### 🚨 Kritik: API Anahtarı Güvenliği

| Risk | Açıklama | Çözüm |
|---|---|---|
| API Key Exposure | `script.js`'teki Groq API anahtarı tarayıcı DevTools ile görülebilir | Backend proxy / Serverless Function kullanın |
| Kota Aşımı | Anahtarın çalınması halinde ücretli kullanım limiti aşılabilir | Groq konsolundan IP kısıtlaması ve kullanım limiti belirleyin |
| Veri Gizliliği | Kamera görüntüsü Groq API'ye gönderilmektedir | KVKK kapsamında kullanıcı onayı alınmalıdır |

### Güvenli Dağıtım için Önerilen Mimari

```
Frontend (GitHub Pages / Netlify)
         │
         ▼
Backend Proxy (Vercel Serverless Function)
  ├── API anahtarını ortam değişkeninden okur (process.env)
  ├── Rate limiting uygular
  ├── İstek doğrulaması yapar
         │
         ▼
Groq Cloud API
```

**Örnek Vercel Serverless Function (`/api/analyze.js`):**
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // .env'den
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });
  
  const data = await response.json();
  res.status(200).json(data);
}
```

---

## ⚕️ Tıbbi Sorumluluk Reddi

> [!CAUTION]
> **Bu uygulama yalnızca bilgilendirme ve eğitim amaçlıdır.**
>
> - Yapay zeka analizi sonuçları kesin tıbbi tavsiye değildir.
> - Her türlü diyet kararı için transplant doktorunuza danışın.
> - Acil durumlarda **112**'yi veya nakil merkezini arayın.
> - AI modelleri hata yapabilir; yüksek riskli kararlar (ilaç dozu, diyet kısıtlaması) için her zaman uzman görüşü alın.

---

## 🧩 Bilinen Sınırlılıklar ve Gelecek Geliştirmeler

### Mevcut Sınırlılıklar

- [ ] Veriler yalnızca yerel tarayıcıda saklanır (cihaz değişiminde kaybolur)
- [ ] Push bildirimleri yalnızca uygulama açıkken çalışır
- [ ] AR modülü yalnızca Hiro marker ile çalışır
- [ ] Yalnızca Türkçe dil desteği mevcuttur
- [ ] Klinik validasyon henüz yapılmamıştır

### Planlanan Geliştirmeler

- [ ] **Firebase Auth + Firestore** — Bulut tabanlı veri yönetimi
- [ ] **Web Push API (VAPID)** — Gerçek zamanlı ilaç bildirimleri
- [ ] **MindAR / WebXR** — Markörsüz artırılmış gerçeklik
- [ ] **HL7 FHIR** — Hastane bilgi sistemi entegrasyonu
- [ ] **TTS (Text-to-Speech)** — Sesli erişilebilirlik
- [ ] **Çok Dil Desteği** — EN / AR / KU
- [ ] **WCAG 2.1 AA Uyumu** — Erişilebilirlik standardı
- [ ] **KVKK Uyum Akışı** — Açık rıza ekranı

---

## 📊 Performans Metrikleri (Tahmini)

| Metrik | Değer |
|---|---|
| İlk Yükleme Boyutu | ~35KB (JS + CSS birlikte) |
| Service Worker Cache | Statik dosyalar (offline) |
| Zaman İçin Etkileşime Hazır (TTI) | <1 saniye (offline) |
| AI Analiz Süresi | 2-5 saniye (ağ hızına bağlı) |
| AR Marker Algılama | <500ms (uygun aydınlatmada) |
| Desteklenen Ekran Boyutu | 320px – 1920px |

---

## 🔁 Sürüm Geçmişi

| Sürüm | Tarih | Değişiklikler |
|---|---|---|
| v1.0 | Haziran 2026 | İlk yayın — AR, AI, Oyun, İlaç, Acil modülleri |

---

## 📚 Referanslar ve Kaynaklar

- [A-Frame Dokümantasyonu](https://aframe.io/docs/1.3.0/introduction/)
- [AR.js Dokümantasyonu](https://ar-js-org.github.io/AR.js-Docs/)
- [Groq API Dokümantasyonu](https://console.groq.com/docs)
- [PWA Web App Manifest Spec](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [HL7 FHIR Standardı](https://hl7.org/fhir/)
- [KVKK Kişisel Veri Yönergeleri](https://www.kvkk.gov.tr/)
- [WCAG 2.1 Erişilebilirlik Standartları](https://www.w3.org/TR/WCAG21/)

---

## 👥 Katkı ve Geliştirme

### Geliştirme Ortamı Kurulumu

```bash
# Repo'yu klonlayın
git clone <repository-url>
cd yazilimMuhGuncelKonularProject

# Yerel sunucu başlatın
python3 -m http.server 8000
```

### Kod Standartları

- **JavaScript:** ES6+ syntax, camelCase değişken isimlendirme
- **CSS:** BEM benzeri class isimlendirme, CSS Variables kullanımı
- **HTML:** Semantic HTML5 elementleri, ARIA attribute'ları

### Pull Request Süreci

1. `feature/yeni-ozellik` adında branch oluşturun
2. Değişikliklerinizi commit edin
3. Pull Request açın ve değişiklikleri açıklayın

---

## 📄 Lisans

Bu proje akademik amaçlarla geliştirilmiştir. Ticari kullanım için proje sahiplerinden yazılı izin alınması gerekmektedir.

---

<div align="center">

**LiveCare AR** — Karaciğer Nakli Hastalarının Yanında Her An 🫀

*Yazılım Mühendisliği Güncel Konular Projesi — 2026*

</div>
