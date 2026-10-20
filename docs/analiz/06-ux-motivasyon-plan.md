# 06 — Kullanıcı Deneyimi, Motivasyon, Ekranlar ve Kişisel Çalışma Planı

> Kapsam: Türkçe ana dilli, Almancaya sıfırdan başlayan **tek bir kullanıcı** için, backend'siz (statik HTML/JS, tarayıcıda çalışan, telefon + masaüstü) ve öğretmensiz A1 → A2 öğretim sistemi.
> Bu belge: (1) rakip/ilham analizi, (2) "tek başına öğretme" için kapatılması gereken açıklar, (3) ekran envanteri + bilgi mimarisi + ASCII wireframe'ler, (4) görsel/etkileşim ilkeleri, (5) motivasyon ve alışkanlık tasarımı, (6) kişisel çalışma planı ve süre projeksiyonu, (7) ilk 7 gün senaryosu.

---

## 0. Özet (TL;DR)

- **Rakiplerden en önemli 5 fikir:**
  1. **Nicos Weg tarzı hikâye omurgası** — her ünite kısa bir video/diyalog sahnesiyle başlar; kelime ve gramer o sahneden "çıkarılır" (bağlam önce, kural sonra).
  2. **Babbel/Busuu tarzı açık gramer + Türkçe karşılaştırma** — Duolingo'nun en zayıf yeri olan "neden?" sorusunu her hatada cevaplayan kısa açıklama kartları ("Türkçede belirtme hali -(y)ı → Almancada Akkusativ").
  3. **Anki tarzı gerçek SRS (FSRS)**, ama **Clozemaster tarzı cümle içinde** — kelime kartı tek başına değil, artikel + çoğul + örnek cümle + ses ile.
  4. **LingQ tarzı okuma kütüphanesi** — dokunulan kelime sözlüğe/SRS'e tek dokunuşla eklenir; "bilinen kelime yüzdesi" ile metin seçilir.
  5. **Duolingo'nun alışkanlık motoru, ama yumuşatılmış** — esnek streak (dondurma hakkı + haftalık hedef), günlük dakika hedefi, "Bugün" ekranında tek büyük "Başla" butonu; liderlik tablosu/elmas/kalp **yok**.
- **Ekranlar (11):** Bugün · Ders (Kurs haritası + Ders oynatıcı) · Tekrar (SRS) · Gramer Referansı · Sözlük/Kelime Defteri · Okuma & Dinleme Kütüphanesi · Telaffuz Laboratuvarı · Sınav Simülasyonu · İlerleme Paneli · Dış Görevler (Haftalık görevler/kaynaklar) · Ayarlar & Yedekleme. (+ Onboarding akışı, + Hata Defteri alt ekranı.)
- **Önerilen günlük plan (60 dk standart):** 10 dk SRS tekrar → 25 dk yeni ders (bağlam → kural → alıştırma) → 10 dk dinleme/okuma (sistem içi veya Nicos Weg) → 10 dk konuşma/telaffuz (shadowing) → 5 dk yazma ("günün 3 cümlesi"). Hafta sonu: Cumartesi tekrar + mini sınav, Pazar hafif gün (dış kaynak/film + haftalık rapor).
- **Projeksiyon (öz-çalışma, Goethe/CEFR saat aralıklarına göre muhafazakâr):** A1 ≈ 120–150 saat, A2 ≈ +150 saat (kümülatif ≈ 270–300 saat). 30 dk/gün → A1 ~9 ay, A2 ~19 ay; **60 dk/gün → A1 ~4,5 ay, A2 ~9,5 ay**; 90 dk/gün → A1 ~3 ay, A2 ~6,5 ay.

---

## 1. Rakip ve İlham Analizi

### 1.1 Karşılaştırma tablosu

| Ürün | Güçlü yanları | Zayıf yanları (tek başına öğrenme açısından) | Bizim sisteme alınacak fikir |
|---|---|---|---|
| **Duolingo** | Kusursuz alışkanlık motoru (streak, bildirim, kısa ders); düşük başlama eşiği; sesli/yazılı karışık alıştırma; hata sonrası anında tekrar | Gramer açıklaması neredeyse yok ("Tips" gizli/kısa); çeviri cümleleri yapay ("Der Bär trinkt Bier"); artikel/kasus mantığını öğretmiyor; üretim (serbest konuşma/yazma) zayıf; gamification (lig, kalp) öğrenmenin önüne geçiyor; A2 sonrası düzlük; **Türkçeden Almanca kursu yok** (İngilizce üzerinden) | 3–5 dk'lık mikro birimler; tek büyük "Devam" butonu; esnek streak + dondurma; hatalı soruyu ders sonunda tekrar sorma; sesli dinleme-yazma (dictation) alıştırması |
| **Babbel** | Açık, kısa gramer açıklamaları; gerçekçi diyaloglar; konu temelli üniteler; "Review" (SRS benzeri) | Paralı; tekrar algoritması basit; görsel olarak monoton; konuşma tanıma yüzeysel; Türkçe arayüzlü Almanca kursu sınırlı | Her derste "kural kutusu" (tablo + 2 örnek); gerçek hayat diyalogu ile başlama; ders sonunda "Bu derste ne öğrendin" özet kartı |
| **Busuu** | CEFR'e bağlı yapı (A1/A2/B1 hedefleri net); gramer + kelime + diyalog dengesi; yazma/konuşma alıştırması ve topluluk düzeltmesi; "Study plan" (hedef tarih + gün sayısı) | Topluluk düzeltmesi bizde yok (backend yok, kişisel kullanım); premium duvarı | **Hedef tarihli çalışma planı** ("X tarihine kadar A1"); CEFR "can-do" ifadeleriyle ilerleme; yazma görevleri için kontrol listesiyle **öz-değerlendirme** (topluluk yerine) |
| **Anki** | En güçlü SRS (FSRS desteği); tamamen özelleştirilebilir; çevrimdışı; veri sahibi kullanıcı | Hiç öğretmez, sadece hatırlatır; bağlam yok (kart yalnız kelime); kart hazırlamak zahmetli; arayüzü korkutucu; "kart yığını" stresi (tekrar borcu) | **FSRS algoritması**; 4 düğmeli değerlendirme (Tekrar/Zor/İyi/Kolay) ama sade arayüz; günlük yeni kart limiti; tekrar borcu kontrolü ("bugün en fazla 150 tekrar"); dışa/içe aktarma (JSON, Anki uyumlu CSV) |
| **Memrise** | Gerçek anadil konuşanların kısa videoları ("Learn with locals"); hafıza ipuçları (mem) | Gramer zayıf; içerik giderek AI sohbetine kaydı; SRS sığ | Kelime kartında **anımsatıcı (mnemonic) alanı**, Türkçe çağrışımla ("das Kind — 'kind' gibi değil, çocuk") ; gerçek ses kaydı önceliği |
| **Clozemaster** | Bağlamda kelime (cloze/boşluk doldurma); frekans listesine göre ilerleme; dinleme modu | Açıklama yok; A1 için çok zor başlangıç (Tatoeba cümleleri gelişigüzel); cümle kalitesi değişken | **Boşluk doldurma kartları** (özellikle artikel/çekim boşluğu: "Ich sehe ___ Hund" → den); frekans sıralı kelime listesi; "çoktan seçmeli → yazarak" zorluk geçişi |
| **LingQ** | Anlamlı girdi (comprehensible input) odaklı; okuma metninde bilinmeyen kelimeyi tıkla-öğren; bilinen kelime sayacı; ses + metin birlikte | A1 başlangıcı için çok zor ve dağınık; gramer yok; arayüz kalabalık | **Okuma kütüphanesi**: metindeki her kelime dokunulabilir (anlam + artikel + "deftere ekle"); metin başına "bilinen kelime %" göstergesi; okunan kelime sayısı istatistiği |
| **DW "Nicos Weg"** (ücretsiz, A1–B1) | Gerçek hikâye (Nico'nun Almanya'da yeni hayatı) – duygusal bağ; her bölüm video + alıştırma + gramer + kelime listesi; ücretsiz ve yüksek kalite; Almanca altyazı; Türkçe dahil çok dilli arayüz | Tekrar sistemi yok (öğrendiğin unutulur); ilerleme takibi zayıf; alıştırmalar çoğu zaman kolay ve tekdüze; günlük alışkanlık mekaniği yok | **Ana dış kaynak** olarak entegre: sistem ünitelerini Nicos Weg A1/A2 bölümleriyle hizala; her bölüm sonrası o bölümün kelimelerini SRS'e aktaran "bölüm paketi"; hikâye omurgası fikrini kendi derslerimizde de kullan (sabit karakterler) |
| **Goethe "Deutsch für dich"** | Goethe kalitesi, ücretsiz; gramer alıştırmaları, oyunlar, topluluk | Dağınık yapı; yol haritası yok; kayıt gerektirir | Goethe sınav formatına uygun alıştırma tipleri; Goethe A1/A2 resmi model sınavlarına (Start Deutsch 1, Goethe-Zertifikat A2) bağlantı → Sınav Simülasyonu |
| **Easy German (YouTube/podcast)** | Gerçek sokak Almancası; çift altyazı (Almanca + İngilizce); kültür; "Super Easy German" serisi A1–A2 için uygun | Yapılandırılmış değil; Türkçe altyazı yok; A1 başında hızlı | "Haftalık dış görev" listesinde Super Easy German bölümleri; izledikten sonra 5 kelime çıkarıp deftere ekleme görevi |
| **Seedlang** (Easy German ekibi) | Video tabanlı kartlar, gerçek konuşmacılar, gramer egzersizleri, sesli tekrar | Ücretli, İngilizce arayüz | Telaffuz laboratuvarında "dinle → kendi sesini kaydet → karşılaştır" akışı |

### 1.2 "Tek başına öğretme" için kapatmamız gereken açıklar

Bir öğretmenin yaptığı şeyleri sistem nasıl üstlenecek?

| Öğretmenin işlevi | Rakiplerdeki açık | Bizim çözüm |
|---|---|---|
| **Neden?** sorusunu açıklamak | Duolingo, Clozemaster, Anki açıklamaz | Her alıştırma yanlışında **"Neden?" butonu** → ilgili gramer kartına (Türkçe, Türkçe ile karşılaştırmalı) derin bağlantı. Her ders 1 "kural kutusu" içerir. |
| Ana dili bilerek öğretmek | Hiçbiri Türkçeden Almanca'yı Türkçe mantığıyla anlatmıyor | **Türkçe köprüleri**: hal ekleri ↔ Kasus, "-(y)ı / -e / -de / -den" ↔ Akk/Dat; SOV (Türkçe) ↔ fiil-ikinci (V2) + yan cümlede fiil sonda (Türkçeye benzer!) ; "artikel Türkçede yok" uyarısı. Tipik Türk hataları listesi (ü/ö kolay ama "ch", "r", uzun/kısa ünlü; artikel atlama; "ist" fazlalığı). |
| Hatayı düzeltmek ve örüntüsünü görmek | Rakipler hatayı tek tek düzeltir, örüntü göstermez | **Hata Defteri**: hatalar etiketlenir (artikel, kasus, fiil çekimi, kelime sırası, yazım). İlerleme panelinde "En sık hata türün: Akkusativ artikeli (%38)" + hedefli mini-alıştırma. |
| Üretimi (konuşma/yazma) kontrol etmek | Backend olmadan AI düzeltme yok | (a) **Kontrollü üretim**: cümle kurma, kelime sıralama, dikte, yönlendirmeli çeviri — otomatik puanlanabilir. (b) **Serbest üretim için öz-değerlendirme kontrol listesi** (fiil 2. sırada mı? artikel doğru mu? fiil çekimi özneyle uyuşuyor mu?) + model cevap karşılaştırması. (c) İsteğe bağlı: kullanıcı kendi yazdığını tek tuşla panoya kopyalayıp bir AI sohbetine/tandem partnere göndermek için hazır istem ("Bu A1 metnimi düzelt, hataları Türkçe açıkla"). |
| Telaffuzu düzeltmek | Çoğu ürün yüzeysel | Web Speech API (SpeechRecognition, Chrome/Edge/Android'de çalışır) ile **"anlaşıldı mı?" testi** + kendi sesini kaydet/dinle/karşılaştır (MediaRecorder) + minimal çiftler (Hölle/Höhle, Bett/Beet). Desteklenmeyen tarayıcıda zarif geri düşüş (sadece kaydet-dinle). |
| Müfredatı sıralamak / ne zaman ilerleyeceğini söylemek | Anki, LingQ: yok | **Kilitli değil, önerilen sıra**: Kurs haritası CEFR sırasına göre; ünite sonu "kontrol noktası" (%80 → sonraki ünite önerilir, altında → hedefli tekrar önerilir). |
| Seviyeyi ölçmek | Duolingo seviyeleri CEFR ile örtüşmez | Ünite sonu testleri + A1/A2 **sınav simülasyonu** (Goethe formatında: Hören, Lesen, Schreiben, Sprechen öz-puanlı). |
| Motive etmek, hesap sormak | Duolingo aşırı (suçluluk bildirimleri) | Yumuşak, kişisel ton; haftalık rapor; hedef tarih projeksiyonu; "geri dönüş" modu (ara verdikten sonra suçlamadan yeniden başlama). |
| Gerçek dünyaya köprü kurmak | Uygulamalar kendi içinde kapalı | **Dış Görevler** modülü: Nicos Weg, Easy German, podcast, tandem — sistem görevi önerir, kullanıcı tamamlandı işaretler, çıkardığı kelimeleri deftere ekler. |

---

## 2. Bilgi Mimarisi ve Navigasyon

### 2.1 Üst düzey yapı

```
Almanca (uygulama)
├── Bugün (ana sayfa)                     ← varsayılan açılış
├── Öğren
│   ├── Kurs Haritası (A1 → A2, ünite/ders)
│   └── Ders Oynatıcı (tam ekran akış)
├── Tekrar (SRS oturumu)
├── Kütüphane
│   ├── Gramer Referansı (cheat-sheet, arama)
│   ├── Sözlük / Kelime Defteri
│   ├── Okuma & Dinleme
│   └── Hata Defteri
├── Pratik
│   ├── Telaffuz Laboratuvarı
│   └── Sınav Simülasyonu
├── İlerleme (panel + haftalık rapor + rozetler)
├── Dış Görevler (haftalık kaynak listesi)
└── Ayarlar & Yedekleme
```

### 2.2 Navigasyon modeli

- **Mobil:** Alt sekme çubuğu (başparmak bölgesi), 5 sekme: **Bugün · Öğren · Tekrar · Kütüphane · Ben** (Ben = İlerleme + Dış Görevler + Ayarlar). Tekrar sekmesinde bekleyen kart sayısı rozeti (ör. "24").
- **Masaüstü (≥ 900 px):** Sol kenar çubuğu (aynı öğeler, açık hâli), içerik ortada max ~720 px, gramer referansı gibi ekranlarda sağda ikinci panel (ör. ders sırasında gramer kartı yan panelde açılır).
- **Ders/Tekrar oynatıcıları tam ekran**: alt sekme çubuğu gizlenir; üstte ilerleme çubuğu + "X" (çık, ilerleme kaydedilir).
- **Rota (hash router):** `#/bugun`, `#/kurs`, `#/ders/a1-03-02`, `#/tekrar`, `#/gramer/akkusativ`, `#/sozluk?q=hund`, `#/oku/metin-12`, `#/telaffuz`, `#/sinav/a1-1`, `#/ilerleme`, `#/gorevler`, `#/ayarlar`. Derin bağlantı → "Neden?" butonları doğrudan `#/gramer/<id>`'e gider; geri tuşu doğru çalışır.
- **Global arama** (masaüstünde `/` veya `Ctrl+K`, mobilde Kütüphane'nin üstünde): kelime, gramer konusu, ders başlığı tek kutuda.

---

## 3. Ekran Envanteri (içerik + ASCII taslak)

Taslaklar mobil (≈ 360–400 px genişlik) içindir; masaüstü notları altta.

### 3.0 Onboarding (ilk açılış, ~3 dk)

Adımlar (her biri tek ekran, atlanabilir):
1. **Karşılama**: "Merhaba! Sıfırdan A2'ye birlikte gideceğiz. Öğretmen yok ama yalnız değilsin." 
2. **Hedef seviye + tarih**: A1 / A2; isteğe bağlı hedef tarih (ör. Goethe A1 sınavı).
3. **Günlük süre**: 15 / 30 / 60 / 90 dk (değiştirilebilir). Sistem anında projeksiyon gösterir: "60 dk/gün ile A1 ≈ 4,5 ay → Mart 2027".
4. **Neden Almanca?** (çoklu seçim: iş, göç/aile birleşimi, okul, seyahat, merak) → içerik vurgusu (aile birleşimi → Goethe A1 sınavı modülü öne çıkar).
5. **Hatırlatma saati**: Bildirim izni (PWA + Notification API; desteklenmezse takvime .ics ekleme seçeneği).
6. **Ses testi**: "Mikrofonu dene" (telaffuz için; reddedilirse kaydet-dinle olmadan devam).
7. **Artikel renk tercihi** (varsayılan mavi/kırmızı/yeşil + renk körü dostu desen seçeneği).
8. **Yedekleme bilgisi**: "İlerlemen sadece bu cihazda. Haftada bir yedek indirmeni hatırlatacağız."

```
┌──────────────────────────────┐
│  ● ● ● ○ ○ ○ ○ ○        Atla │
│                              │
│   Günde ne kadar vaktin var? │
│                              │
│  ┌────────────────────────┐  │
│  │ 15 dk   Hafif          │  │
│  ├────────────────────────┤  │
│  │ 30 dk   Düzenli        │  │
│  ├────────────────────────┤  │
│  │▶60 dk   Ciddi (önerilen)│ │
│  ├────────────────────────┤  │
│  │ 90 dk   Yoğun          │  │
│  └────────────────────────┘  │
│                              │
│  A1'e tahmini varış:         │
│  ≈ 19 hafta · Mart 2027      │
│                              │
│  ┌────────────────────────┐  │
│  │        Devam →         │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### 3.1 Bugün (Ana sayfa / günlük plan)

**Amaç:** Kullanıcı açtığında düşünmeden "ne yapacağım?" sorusunun cevabını görsün. Tek birincil eylem.

İçerik:
- Selamlama + streak (esnek) + bu haftanın hedef günü durumu (ör. 4/5 gün).
- **Günün planı** (sırayla, işaretlenebilir): Tekrar (N kart, ~dk) → Yeni ders → Dinleme/okuma → Konuşma → Yazma ("günün 3 cümlesi"). Toplam süre hedefle uyumlu.
- **Büyük "Başla" butonu** — planın sıradaki adımını başlatır (akış: bir adım bitince sıradakine geçme önerisi).
- Günün kelimesi / günün mini-kuralı (küçük kart).
- Bu haftanın dış görevi (ör. "Nicos Weg Bölüm 5'i izle").
- "Az vaktim var" modu: 5 dk acil plan (yalnızca en gecikmiş 20 kart).

```
┌──────────────────────────────┐
│ Guten Morgen, Ömer!   🔥 12  │  ← streak (ikon dışında emoji yok)
│ Bu hafta: ■■■■□  4/5 gün     │
├──────────────────────────────┤
│ BUGÜNÜN PLANI      ~58 dk    │
│ ☑ Tekrar        32 kart 9 dk │
│ ▶ Ders: A1·4.2  "Im Café"    │
│   Akkusativ: einen/eine/ein  │
│ ☐ Dinle: Nicos Weg #8  10 dk │
│ ☐ Konuş: Shadowing     8 dk  │
│ ☐ Yaz: Günün 3 cümlesi 5 dk  │
│ ┌──────────────────────────┐ │
│ │     ▶  Devam et (Ders)   │ │
│ └──────────────────────────┘ │
│  Az vaktim var (5 dk) ›      │
├──────────────────────────────┤
│ Günün kelimesi               │
│ [der] Kaffee — kahve         │
│ "Ich trinke einen Kaffee." 🔊│
├──────────────────────────────┤
│ Hedef: A1 · 2 Mart 2027      │
│ ████████░░░░░░░░  %41  ✓ yolda│
├──────────────────────────────┤
│ Bugün  Öğren  Tekrar  Kütüp. Ben│
└──────────────────────────────┘
```

Masaüstü: plan solda, sağda "Haftalık özet" ve "Hata Defteri'nden 3 öneri".

### 3.2 Öğren — Kurs Haritası

İçerik: A1 (≈ 12 ünite) ve A2 (≈ 12 ünite) dikey liste/yol. Her ünite: tema (ör. "Kendini tanıtma", "Yemek ve içmek"), can-do hedefi, ders sayısı, tamamlanma halkası, ünite testi. Kilit yok ama "önerilen sıradaki" vurgulanır; ileri atlamak için "Seviye testi ile atla" seçeneği.

```
┌──────────────────────────────┐
│ ← Kurs          A1 ▾  A2     │
├──────────────────────────────┤
│ Ünite 3 · Ailem        ◐ 60% │
│ "Ailemi tanıtabilirim"       │
│  ✓ 3.1 Possessiv: mein/dein  │
│  ✓ 3.2 Sayılar 20–100        │
│  ▶ 3.3 haben + Akkusativ     │
│  ○ 3.4 Hikâye: Nicos Familie │
│  ○ Ünite testi               │
├──────────────────────────────┤
│ Ünite 4 · Café & Markt  ○ 0% │
│ "Kafede sipariş verebilirim" │
├──────────────────────────────┤
│ Ünite 5 · Tagesablauf   ○    │
│ ...                          │
└──────────────────────────────┘
```

### 3.3 Ders Oynatıcı

Bir ders = 10–20 dk, 4 faz (pedagoji kolunun yapısıyla uyumlu olmalı):
1. **Bağlam (Hikâye/Diyalog):** Sesli diyalog, Almanca metin, satır satır Türkçe çeviri (gizle/göster). Sabit karakterler (ör. Ayşe Berlin'de, ev arkadaşı Jonas).
2. **Keşfet (Kural kutusu):** Diyalogdan örnekler vurgulu; kısa Türkçe açıklama + tablo + "Türkçede nasıl?" köprüsü.
3. **Alıştırma:** 8–15 madde, kolaydan zora: tanıma (çoktan seçmeli) → eşleştirme → boşluk doldurma → sıralama → dikte → yazarak çeviri → sesli söyleme.
4. **Üretim + Özet:** 1–2 serbest/yarı-serbest görev ("Kendi kafe siparişini yaz"), öz-kontrol listesi, ders özeti kartı, yeni kelimelerin SRS'e eklendiği bilgisi.

```
┌──────────────────────────────┐
│ ✕  ███████░░░░░░░  7/14      │
├──────────────────────────────┤
│ Boşluğu doldur               │
│                              │
│  Ich möchte ____ Kaffee.     │
│        (bir kahve)           │
│                              │
│  ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ ein  │ │einen │ │ eine │  │
│  └──────┘ └──────┘ └──────┘  │
│                              │
├──────────────────────────────┤
│ ✗ Neredeyse! Doğrusu: einen  │
│ der Kaffee → Akkusativ'te    │
│ "ein" → "einen" olur (sadece │
│ eril değişir).               │
│ [Neden? ›]   [🔊 Dinle]      │
│ ┌──────────────────────────┐ │
│ │        Devam  ⏎          │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

Kurallar:
- Geri bildirim paneli alttan kayar (başparmak bölgesi); "Devam" her zaman aynı yerde.
- Yanlış yapılan maddeler ders sonunda bir kez daha sorulur ("Tekrar turu").
- Her yanlış Hata Defteri'ne etiketle düşer.
- Yazarak cevaplarda **toleranslı kontrol**: büyük/küçük harf (isimlerde uyarı, ama yanlış sayılmaz → "Almancada isimler büyük harfle"), ß↔ss, ä↔ae kabul + uyarı; tek harflik yazım hatası "yazım hatası" olarak işaretlenir, doğru sayılır ama not edilir.
- Ekranda Almanca özel karakter çubuğu: `ä ö ü ß Ä Ö Ü` (mobil klavyede uzun basma gerekmesin).

### 3.4 Tekrar (SRS oturumu)

İçerik: Bugün vadesi gelen kartlar + yeni kart kotası. Kart tipleri: Kelime (TR→DE üretim, DE→TR tanıma), Artikel (renk tahmini), Çoğul, Cloze cümle, Fiil çekimi, Dinle-yaz.
Değerlendirme: Kendi değerlendirmesi gereken (açık uçlu) kartlarda 4 düğme **Tekrar / Zor / İyi / Kolay** (FSRS); otomatik kontrol edilebilen kartlarda (yazarak) sistem doğru/yanlış belirler, kullanıcı yalnızca "Kolaydı"yı işaretleyebilir.

```
┌──────────────────────────────┐
│ ✕  Tekrar     18 kaldı  ~5dk │
├──────────────────────────────┤
│                              │
│        çocuk                 │
│   (artikel + kelime yaz)     │
│                              │
│  ┌────────────────────────┐  │
│  │ das Kind_              │  │
│  └────────────────────────┘  │
│  ä ö ü ß                     │
├──────────────────────────────┤
│  ✓ das Kind · die Kinder 🔊  │
│  "Das Kind spielt."          │
│                              │
│ ┌──────┬──────┬──────┬─────┐ │
│ │Tekrar│ Zor  │ İyi  │Kolay│ │
│ │ 1dk  │ 2g   │ 4g   │ 9g  │ │
│ └──────┴──────┴──────┴─────┘ │
└──────────────────────────────┘
```

Ek özellikler: günlük maksimum tekrar sınırı (borç birikirse yeni kartları otomatik durdurma ve kullanıcıyı uyarma: "Bugün yeni kelime yok — önce birikmişleri eritelim"); "Sadece artikel" / "Sadece fiiller" filtreli oturum; oturum sonu özeti (doğruluk %, en zor 3 kart).

### 3.5 Gramer Referansı (aranabilir cheat-sheet)

İçerik:
- Arama kutusu (Türkçe veya Almanca terim: "belirtme hali", "Akkusativ", "einen").
- Kategoriler: Artikeller · Haller (Kasus) · Zamirler · Fiil çekimi (Präsens, Perfekt, Präteritum: sein/haben/Modalverben) · Modal fiiller · Ayrılabilen fiiller · Kelime sırası (V2, yan cümle, TeKaMoLo) · Edatlar (Akk/Dat/Wechsel) · Sıfat çekimi (A2) · Sayılar/saat/tarih · Soru kelimeleri.
- Her kart: 1 cümlelik özet, tablo, 3 örnek (sesli), "Türkçede…" köprüsü, sık hatalar, "Bu konuyu pratik et" butonu (5 maddelik hızlı alıştırma), ilgili dersler.
- **Kişisel durum rozeti**: "Bu konuda başarı oranın %62 — zayıf".
- Yazdırılabilir/PDF görünümü (print CSS) — tek sayfalık A1 özet.

```
┌──────────────────────────────┐
│ 🔍 akkusativ                 │
├──────────────────────────────┤
│ Artikel Tablosu (Belirli)    │
│ ┌──────┬─────┬─────┬─────┬──┐│
│ │      │ Erl.│Dişi │Nötr │Çğ││
│ ├──────┼─────┼─────┼─────┼──┤│
│ │ Nom. │ der │ die │ das │die│
│ │ Akk. │ DEN │ die │ das │die│
│ │ Dat. │ dem │ der │ dem │den│
│ └──────┴─────┴─────┴─────┴──┘│
│ ! Akk.'de sadece eril değişir│
│ TR köprüsü: "-(y)ı" eki →    │
│ "Köpeği görüyorum" =         │
│ "Ich sehe den Hund."         │
│ [▶ 5 soruluk pratik]  %62 ⚠  │
└──────────────────────────────┘
```

Masaüstünde iki sütun: solda konu ağacı, sağda kart. Tablolarda sütun renkleri artikel kodlamasıyla aynı.

### 3.6 Sözlük / Kelime Defteri

İçerik:
- Sistemdeki tüm kelimeler (A1 ≈ 650–800, A2 ≈ +1000–1300) + kullanıcının eklediği kelimeler.
- Her kayıt: artikel (renkli), kelime, çoğul, Türkçe anlam, tür, örnek cümle(ler), ses (TTS veya kayıt), CEFR seviyesi, ders kaynağı, SRS durumu (yeni/öğreniliyor/olgun), kullanıcının notu/anımsatıcısı.
- Filtreler: seviye, ünite, kelime türü, artikel, SRS durumu, "zor kelimeler" (çok yanılınan), "benim eklediklerim".
- "+ Kelime ekle" formu (dış kaynaklardan; artikel ve çoğul zorunlu alanı → doğru öğrenme alışkanlığı).
- Fiillerde çekim tablosu açılır; ayrılabilen fiiller işaretli (an|rufen).

```
┌──────────────────────────────┐
│ 🔍 Ara...            + Ekle  │
│ [A1][Ünite 4][İsim][Zor ▾]   │
├──────────────────────────────┤
│ ▌der Tisch  · Tische   masa  │
│ ▌die Tasse  · Tassen  fincan │
│ ▌das Brot   · Brote   ekmek  │
│   ●●●○ öğreniliyor           │
│ ▌trinken    fiil     içmek   │
│   trinkt · trank · getrunken │
└──────────────────────────────┘
 (▌ = artikel renk şeridi: mavi/kırmızı/yeşil)
```

### 3.7 Okuma & Dinleme Kütüphanesi

İçerik:
- Kademeli metinler (A1.1, A1.2, A2.1, A2.2): diyaloglar, kısa hikâyeler, e-posta, ilan, menü, tabela — Goethe sınavı türleri dahil.
- Her metin: seviye, süre, **bilinen kelime %** (SRS verisinden hesaplanır; %90+ = "rahat", %80–90 = "ideal", <%80 = "zorlayıcı").
- Okuyucu: sesli okuma (cümle vurgulu), kelimeye dokun → mini sözlük kartı + "Deftere ekle"; Türkçe çeviriyi cümle bazında aç/kapa; hız (0.75×/1×).
- Metin sonu: 3–5 anlama sorusu.
- Dinleme modu: önce metinsiz dinle → sorular → metinle tekrar.

```
┌──────────────────────────────┐
│ ← Ein Tag in Berlin   A1.2   │
│ 🔊 ▶ 0:42/1:30  1x  TR göster│
├──────────────────────────────┤
│ Ayşe wohnt in Berlin. Jeden  │
│ Morgen ┌─────────────────┐   │
│ trinkt │ der Morgen  ·-  │   │
│ sie ei │ sabah           │   │
│ Kaffee │ 🔊  + Deftere   │   │
│        └─────────────────┘   │
├──────────────────────────────┤
│ Bilinen kelime: %91 · 120 kl │
│ [Sorulara geç →]             │
└──────────────────────────────┘
```

### 3.8 Telaffuz Laboratuvarı

İçerik:
- **Ses envanteri**: Türkçede olmayan/zor sesler — ch (ich/ach), r (uvular), uzun/kısa ünlüler (Staat/Stadt), -er sonu, ei/ie, eu/äu, z [ts], v [f], w [v], sp/st başta [ʃp/ʃt], son ses sertleşmesi (Tag [k]), ö/ü (Türk için avantaj!).
- Her ses: açıklama (Türkçe ağız konumu tarifi), örnek kelimeler, minimal çiftler (dinle-ayırt et testi).
- **Shadowing**: cümle dinle → kaydet → arka arkaya dinle (orijinal / sen).
- **Konuşma tanıma testi** (destekleniyorsa): söyle → tanınan metin gösterilir → hedefle karşılaştırılır (kelime bazında yeşil/kırmızı). Not: "Tanıma mükemmel değil; %100 şart değil" uyarısı.
- Vurgu ve tonlama: soru cümlesi yükselen ton görseli.

```
┌──────────────────────────────┐
│ ← Telaffuz   Ses: "ch" (ich) │
├──────────────────────────────┤
│ Dilin ucu alt dişlerde,      │
│ "hı" ile "şi" arası, kedi    │
│ tıslaması gibi.              │
│                              │
│ ich · mich · Milch · Küche   │
│                              │
│ Hedef:  "Ich möchte Milch."  │
│ [🔊 Dinle] [● Kaydet] [▶ Sen]│
│                              │
│ Tanınan: "Ich möchte mich"   │
│          ✓    ✓      ✗       │
│ İpucu: "Milch" – l'den sonra │
│ ch'yi yumuşak tut.           │
└──────────────────────────────┘
```

### 3.9 Sınav Simülasyonu

İçerik:
- **Ünite testleri** (10–15 dk) ve **seviye sınavları**: Goethe Start Deutsch 1 (A1) ve Goethe-Zertifikat A2 formatına benzer 4 modül: Hören, Lesen, Schreiben, Sprechen.
- Zamanlayıcı, gerçek sınav süresi; Schreiben/Sprechen için model cevap + puanlama rubriği ile **öz-puanlama**.
- Sonuç: modül bazında puan, eşik (%60) göstergesi, zayıf konulara otomatik tekrar planı.
- Resmi Goethe model sınavlarına (Übungssatz) dış bağlantı.

```
┌──────────────────────────────┐
│ A1 Deneme Sınavı #2          │
│ Hören  ████████░░  78%  ✓    │
│ Lesen  █████████░  86%  ✓    │
│ Schreiben (öz) ██████░ 64% ✓ │
│ Sprechen  (öz) █████░░ 55% ✗ │
├──────────────────────────────┤
│ Toplam: 71% — Geçer seviye   │
│ Zayıf: Sprechen Teil 2       │
│ (soru sorma), Dativ edatları │
│ [Hedefli 3 günlük plan oluştur]│
└──────────────────────────────┘
```

### 3.10 İlerleme Paneli

İçerik:
- **Seviye göstergesi**: A1.1 / A1.2 / A2.1 / A2.2 ve hedef tarih projeksiyonu (son 14 günün gerçek temposundan hesaplanır: "Bu tempoyla A1: 18 Mart; hedefin 2 Mart → günde +10 dk yeter").
- Çalışma takvimi ısı haritası (GitHub tarzı, son 12 hafta).
- Haftalık dakika grafiği (hedef çizgisiyle).
- Kelime: bilinen (olgun) / öğreniliyor / yeni; SRS tutma oranı (retention).
- Beceri radarı: Dinleme, Okuma, Yazma, Konuşma, Gramer, Kelime (ünite test sonuçlarından).
- **Can-do listesi** (CEFR): "Kendimi tanıtabilirim ✓", "Kafede sipariş verebilirim ✓", "Doktordan randevu alabilirim ○".
- Hata Defteri özeti (en sık 3 hata türü).
- Haftalık rapor arşivi.

```
┌──────────────────────────────┐
│ İlerleme          A1.2  %41  │
│ Hedef A1: 2 Mar · Tahmin: 18 Mar│
│ → Günde +10 dk ile yetişirsin│
├──────────────────────────────┤
│ Son 12 hafta                 │
│ ░▒▓▓█▓▒▓██▓▒░▓██▓▓▒▓█...     │
├──────────────────────────────┤
│ Kelime: 412 olgun · 96 öğr.  │
│ Hatırlama oranı: %88         │
├──────────────────────────────┤
│ Yapabildiklerin (Can-do)     │
│ ✓ Kendimi tanıtabilirim      │
│ ✓ Sayıları/saati söylerim    │
│ ◐ Alışverişte soru sorarım   │
├──────────────────────────────┤
│ En sık hatan: Akk. artikel   │
│ [10 dk hedefli pratik ›]     │
└──────────────────────────────┘
```

### 3.11 Dış Görevler (Haftalık kaynaklar)

İçerik: Sistemin bu hafta önerdiği 2–4 dış görev (seviyeye ve üniteye göre), her biri: kaynak, bağlantı, süre, "sonra yapılacak" (ör. "5 yeni kelimeyi deftere ekle", "3 cümle özet yaz"). Tamamlandı işareti → ilerleme dakikalarına eklenir (kullanıcı süreyi onaylar). Kaynak kataloğu (aşağıda §6.5).

```
┌──────────────────────────────┐
│ Bu haftanın görevleri  2/4 ✓ │
├──────────────────────────────┤
│ ✓ DW Nicos Weg A1 · Bölüm 8  │
│   "Im Supermarkt" · 15 dk    │
│   → 5 kelime eklendi         │
│ ☐ Super Easy German #?? ↗    │
│   Kafe kültürü · 10 dk       │
│   Sonra: 3 kelime ekle       │
│ ☐ Kendini kaydet: 1 dk tanıt │
│ ☐ Tandem (opsiyonel) ↗       │
└──────────────────────────────┘
```

### 3.12 Ayarlar & Yedekleme

- Profil: ad, hedef seviye/tarih, günlük süre, hafta içi/hafta sonu farklı hedef.
- Hatırlatıcılar: saat, gün; .ics takvim dosyası indirme (bildirim desteklenmiyorsa).
- SRS: günlük yeni kart (varsayılan 10–15), maksimum tekrar, hedef tutma oranı (%90 varsayılan), "Tekrar sırasında TR→DE yönü" aç/kapa.
- Görünüm: tema (sistem/açık/koyu), yazı boyutu, artikel renkleri + desen modu, animasyonları azalt, çeviri varsayılanı (gizli/açık).
- Ses: TTS sesi/hızı, otomatik ses çalma.
- **Yedekleme**: JSON dışa aktar/içe aktar; otomatik hatırlatma (7 günde bir); isteğe bağlı File System Access API ile "yedek klasörü" (Chrome masaüstü); cihazlar arası taşıma = dosya ile (backend yok). Anki uyumlu CSV dışa aktarma (kelime defteri).
- Veri sıfırlama (çift onaylı), "Tatil modu" (streak'i X gün dondur).

### 3.13 Hata Defteri (Kütüphane alt ekranı)

Son hatalar listesi (soru, senin cevabın, doğru cevap, etiket), etiket bazında gruplama, "Bu hataları pratik et" (hatalı maddelerden üretilmiş özel oturum). Bir madde 3 kez üst üste doğru yapılınca defterden "çözüldü" olarak düşer — kullanıcıya küçük bir kazanım anı.

---

## 4. Görsel ve Etkileşim İlkeleri

### 4.1 Mobil öncelik ve tek elle kullanım
- Birincil eylemler ekranın **alt %40'ında** (Devam, cevap seçenekleri, SRS düğmeleri). Üst kısım sadece içerik ve çıkış.
- Dokunma hedefleri ≥ 48×48 px, düğmeler arası ≥ 8 px.
- Kaydırma/jest: SRS'te kartı sola kaydır = Tekrar, sağa = İyi (opsiyonel, ayardan açılır; erişilebilirlik için düğmeler her zaman var).
- PWA: ana ekrana ekle, çevrimdışı çalış (Service Worker + önbellek), tam ekran.
- Oturum her an kesilebilir: her cevap anında `localStorage`/IndexedDB'ye yazılır; geri dönünce "Kaldığın yerden devam".

### 4.2 Masaüstü klavye kısayolları

| Bağlam | Kısayol | İşlev |
|---|---|---|
| Global | `/` veya `Ctrl+K` | Arama |
| Global | `g b` / `g t` / `g k` / `g g` | Bugün / Tekrar / Kurs / Gramer'e git |
| Global | `?` | Kısayol listesi |
| Ders | `1`–`4` | Seçeneği seç |
| Ders | `Enter` | Kontrol et / Devam |
| Ders | `Ctrl+Space` veya `r` (yazı alanı dışında) | Sesi tekrar çal |
| Ders | `n` | "Neden?" açıklamasını aç |
| Tekrar | `Space` | Cevabı göster |
| Tekrar | `1` `2` `3` `4` | Tekrar / Zor / İyi / Kolay |
| Tekrar | `u` | Son değerlendirmeyi geri al |
| Yazma alanı | `Alt+a/o/u/s` (ayarlanabilir) | ä / ö / ü / ß |
| Okuyucu | `←` `→` | Önceki/sonraki cümle; `t` çeviri aç/kapa |

### 4.3 Artikel renk kodlaması
- **der = mavi**, **die = kırmızı**, **das = yeşil**, **çoğul (die, Pl.) = mor/turuncu** (ayırt etmek için; çoğulun "die"si dişil değildir — bu ayrımı görselleştirmek öğreticidir).
- Renk tek başına bilgi taşımaz (WCAG 1.4.1): artikel metni her zaman yazılı + **desen/şekil** eşlemesi (der = ▲ / kare kenarlık, die = ● yuvarlak, das = ■ köşeli) ayarla açılabilir; renk körü paleti (mavi/turuncu/gri tonları) seçeneği.
- Renk her yerde aynı: sözlük şeridi, kart arka plan kenarı, gramer tablosu sütunları, okuyucuda isim altı çizgisi (opsiyonel "artikel gözlüğü": metindeki isimleri renkli göster — A1 başında açık, ilerledikçe kapatma önerilir; "ipucunu kaldır" mantığı).

### 4.4 Karanlık mod ve tema
- `prefers-color-scheme` ile otomatik + manuel seçim; renkler CSS değişkenleri (`--der`, `--die`, `--das`, `--pl`, `--ok`, `--err`) ile tanımlanır, karanlık modda doygunluğu düşürülmüş, kontrastı ≥ 4.5:1 tonlar.
- Doğru/yanlış renkleri: yeşil/turuncu (kırmızı yerine turuncu → daha az "ceza" hissi; ayrıca kırmızı "die" ile karışmaz).

### 4.5 Erişilebilirlik
- Semantik HTML, tüm etkileşimler klavyeyle; odak halkası görünür.
- `aria-live="polite"` ile doğru/yanlış geri bildirimi ekran okuyucuya iletilir.
- Almanca içerik `lang="de"` ile işaretlenir (ekran okuyucu doğru telaffuz eder), arayüz `lang="tr"`.
- `prefers-reduced-motion` desteği; konfeti vb. animasyonlar kapatılabilir.
- Yazı boyutu ayarı (rem tabanlı), min 16 px gövde metni.
- Ses içeriklerinin metin karşılığı her zaman var; zamanlayıcılı sınavlarda "ek süre" seçeneği.

### 4.6 Geri bildirim tonu (moral bozmayan)
İlkeler: **Hata = bilgi**, ceza değil. Kısa, somut, bir sonraki adımı gösteren.

| Durum | Kaçınılacak | Kullanılacak |
|---|---|---|
| Yanlış cevap | "Yanlış!" + kırmızı X + titreşim | "Neredeyse! Doğrusu: **einen**. Eril isimler Akkusativ'te -en alır." |
| Aynı hatanın 3. kez yapılması | "Yine yanlış." | "Bu ikisi sık karışıyor — 1 dakikalık mini açıklamaya bakalım mı?" |
| Kötü oturum (%50 altı) | "Başarısız" | "Zor bir konuydu. Bunlar yarın tekrar gelecek — beyin uyurken de çalışıyor." |
| Uzun ara sonrası dönüş | "Streak'in sıfırlandı 😢" | "Tekrar hoş geldin! Kısa bir ısınma turuyla başlayalım (10 kart, 5 dk)." |
| Yazım hatası ama doğru kelime | Yanlış sayma | "Doğru! Küçük yazım: Kaffee (çift e)." |
| Başarı | Aşırı abartı her soruda | Sade ✓; ders sonunda tek özet kutlama, kilometre taşlarında daha büyük. |

Türkçe arayüz dili: samimi "sen" dili, kısa cümleler, Almanca terimler ilk geçişte Türkçe karşılıkla ("Akkusativ (belirtme hali)").

---

## 5. Motivasyon ve Alışkanlık Tasarımı

### 5.1 Temel çerçeve
Kişisel, yetişkin, tek kullanıcı → **içsel motivasyon** (yeterlilik hissi, özerklik, anlam) öncelikli; dışsal ödüller (XP, rozet) ölçülü ve **gerçek beceriye bağlı**. Alışkanlık döngüsü: **Tetikleyici** (sabit saat + bildirim/takvim) → **Kolay başlangıç** (Bugün ekranında tek buton, 2 dk'da ilk doğru cevap) → **Ödül** (ilerleme görünür, can-do işareti) → **Yatırım** (kelime defteri büyüyor, kendi cümleleri birikiyor).

### 5.2 Streak (esnek)
- **Günlük minimum**: "Gün sayılır" eşiği düşük: 5 dk veya vadesi gelen tekrarların bitmesi. (Hedef süre ayrı ölçülür; streak'i korumak için tam hedef gerekmez → "ya hep ya hiç" tuzağını önler.)
- **Streak dondurma**: Her 7 günlük seride 1 dondurma hakkı kazanılır (maks. 3 birikir); kaçırılan gün otomatik kullanılır.
- **Tatil modu**: Önceden bildirilen 1–14 gün streak'i durdurur.
- **Haftalık hedef (birincil metrik)**: "Haftada 5 gün" — streak'ten daha sağlıklı; günlük streak ikincil gösterilir. Kullanıcı ayardan streak'i tamamen gizleyebilir.
- **Kopma sonrası**: Sıfırlanan seri "En uzun seri: 34 gün" olarak kalır; yeni seri "dönüş serisi" diye başlar, suçlayıcı mesaj yok.

### 5.3 Günlük hedef: dakika mı XP mi?
- **Dakika** birincil (gerçek ve anlamlı; kişisel kullanımda XP enflasyonu anlamsız). Aktif süre ölçülür (etkileşimsiz 60 sn sonrası sayaç durur).
- XP yok, onun yerine **"öğrenme birimleri"** sade sayaçları: yeni kelime, olgunlaşan kelime, tamamlanan ders, okunan kelime sayısı, konuşma dakikası.

### 5.4 Hedef tarih ve projeksiyon
- Kullanıcı hedef tarih koyar (ör. A1 sınavı). Sistem: kalan ders sayısı × ortalama ders süresi + tekrar yükü → gereken dk/gün. Son 14 günün gerçek ortalamasıyla tahmini bitiş tarihi.
- Durum etiketi: **"Yolda" / "Biraz geride — günde +10 dk" / "Önde"**. Hedef gerçekçi değilse onboarding'de dürüstçe söylenir ("Bu tarih için günde 2 saat gerekir; tarihi 6 hafta ileri almak ister misin?").

### 5.5 Mikro-kazanımlar ve can-do rozetleri
- Rozetler **yalnızca beceri kilometre taşı** için: "İlk 100 kelime", "Kendimi tanıtabilirim" (ünite 1 testi ≥ %80 + konuşma görevi), "İlk metni çevirisiz okudum", "Perfekt'i çözdüm", "A1 deneme sınavını geçtim". Toplam ~25–30 rozet, hepsi CEFR can-do ile bağlantılı.
- Ders sonu mikro-kazanım: "Bugün öğrendiğin 8 kelimeyle artık şu cümleyi kurabilirsin: …" (somut, kullanılabilir yeterlilik).
- "Önce/sonra" anları: 30. günde 1. günde anlamadığın diyaloğu tekrar dinletmek ("Şimdi %85'ini anlıyorsun").

### 5.6 Haftalık rapor (Pazar)
İçerik: toplam dakika (hedefe karşı), gün sayısı, öğrenilen/olgunlaşan kelime, tamamlanan dersler, hatırlama oranı, en sık hata türü, gelecek haftanın odağı (ör. "Dativ edatları"), gelecek haftanın dış görevleri, 1 küçük "yansıtma" sorusu ("Bu hafta Almanca bir şeyi anlayıp şaşırdığın oldu mu?" — günlüğe kaydedilir). Rapor JSON yedeğine dahil.

### 5.7 Gamification'ın aşırısının zararları (bilinçli olarak yapılmayanlar)
- **Liderlik tablosu/lig yok** (tek kullanıcı; ayrıca hızlı-kolay ders tekrarına teşvik eder → "XP farming").
- **Kalp/can sistemi yok** (hata yapmayı cezalandırır → risk almamayı öğretir; dil öğreniminde hata gerekli).
- **Suçluluk bildirimleri yok** ("Nico üzgün…" tarzı manipülasyon yok). Bildirimler bilgilendirici ve günde en fazla 1.
- **Streak'i amaç haline getirmeme**: "5 dk ile streak kurtarma" mümkün ama haftalık raporda gerçek süre ön planda; sistem "son 7 günün 4'ü sadece minimum" ise nazikçe uyarır.
- **Hız ödülü yok**: Hızlı cevap ödüllendirilmez (sınav simülasyonu hariç).
- Aşırı-yük koruması: SRS borcu büyürse yeni ders önerisi geri çekilir; "yetiştirme" modu.

---

## 6. Kişisel Çalışma Planı

### 6.1 Süre varsayımları (projeksiyonun temeli)
- Goethe-Institut kurs önerisi kabaca: A1 ≈ 80–200 ders saati (45 dk), A2 ≈ +150–200. Sınıf ortamı + öğretmen + ev ödevi düşünüldüğünde, **öz-çalışan için gerçekçi toplam aktif süre**: **A1 ≈ 120–150 saat**, **A2 ≈ +150 saat** (kümülatif ≈ 270–300 saat). Türkçe ana dilli için avantaj: ö/ü sesleri, yan cümlede fiilin sonda olması, eklemeli düşünce (hal kavramı); dezavantaj: artikel/cinsiyet kavramının hiç olmaması, Latin harfli ama farklı yazım-ses eşlemesi, İngilizce bilmiyorsa daha az ortak kelime.
- Sistem içi süreye dış kaynak (video, podcast) süreleri de dahil edilir.

### 6.2 Projeksiyon tablosu

| Günlük süre | Haftalık (7 gün, Pazar hafif) | A1'e varış | A2'ye varış (kümülatif) | Not |
|---|---|---|---|---|
| **15 dk** | ~1,7 sa | ~17–20 ay | ~3+ yıl | Sadece SRS + mikro ders; tavsiye edilmez, "bakım modu" için |
| **30 dk** | ~3,5 sa | **~8–10 ay** (35–42 hafta) | **~18–20 ay** | Sürdürülebilir; ilerleme yavaş ama sağlam |
| **60 dk** (önerilen) | ~7 sa | **~4–5 ay** (17–21 hafta) | **~9–10 ay** (38–43 hafta) | Optimum: tekrar + yeni + beceri dengesi |
| **90 dk** | ~10,5 sa | **~3 ay** (12–14 hafta) | **~6–7 ay** (26–29 hafta) | Yoğun; 90 dk'yı 2 oturuma böl (sabah 45 + akşam 45) |

Sistem bu tabloyu statik göstermez; **gerçek tempo** ile günceller.

### 6.3 Günlük oturum yapısı (sabit ritim)

| Blok | 30 dk | 60 dk | 90 dk (2 oturum) |
|---|---|---|---|
| 1. SRS tekrar (önce!) | 8 dk | 10 dk | 15 dk (sabah) |
| 2. Yeni ders (bağlam→kural→alıştırma) | 15 dk | 25 dk | 30 dk (sabah) |
| 3. Dinleme/okuma (girdi) | 5 dk | 10 dk | 20 dk (akşam) |
| 4. Konuşma/telaffuz (shadowing, sesli tekrar) | – (dersin içinde) | 10 dk | 15 dk (akşam) |
| 5. Yazma ("günün 3 cümlesi" / günlük) | 2 dk (1 cümle) | 5 dk | 10 dk (akşam) |

Kural: **Tekrar her zaman önce**; yeni içerik ancak vadesi gelen tekrarlar bitince (veya sınır dolunca).

### 6.4 Haftalık şablonlar (Pzt–Paz)

Her gün blok 1 (SRS) sabittir; aşağıdaki tablo günün **odak becerisini** ve blok 2–5 dağılımını değiştirir.

**60 dk (önerilen)**

| Gün | Odak | İçerik |
|---|---|---|
| Pzt | Yeni ünite girişi | 10 SRS · 30 yeni ders (bağlam + kelime) · 10 dinleme (ünite diyaloğu) · 10 shadowing |
| Salı | Gramer | 10 SRS · 30 ders (kural + alıştırma) · 10 gramer referansı pratiği · 10 yazma |
| Çar | Dinleme | 10 SRS · 20 ders · 20 Nicos Weg bölümü (+ kelimeleri aktar) · 10 konuşma |
| Per | Gramer + üretim | 10 SRS · 25 ders · 15 yazma (yönlendirmeli metin) · 10 telaffuz lab |
| Cuma | Okuma | 10 SRS · 20 ders · 20 okuma kütüphanesi · 10 sesli okuma |
| Cmt | Pekiştirme | 15 SRS · 20 Hata Defteri pratiği · 15 ünite testi/mini sınav · 10 serbest konuşma (kendini kaydet) |
| Paz | Hafif gün / keşif | 10 SRS · 20–40 dk dış kaynak (Easy German, film/çizgi film, şarkı) · haftalık rapor (5 dk) |

**30 dk**

| Gün | İçerik |
|---|---|
| Pzt | 8 SRS · 17 yeni ders · 5 dinleme |
| Salı | 8 SRS · 17 ders (gramer) · 5 yazma |
| Çar | 8 SRS · 10 ders · 12 Nicos Weg (yarım bölüm) |
| Per | 8 SRS · 17 ders · 5 shadowing |
| Cuma | 8 SRS · 12 ders · 10 okuma |
| Cmt | 10 SRS · 10 Hata Defteri · 10 mini test |
| Paz | 10 SRS (+ isteğe bağlı dış kaynak) · haftalık rapor |

**90 dk** (Sabah 45 / Akşam 45)

| Gün | Sabah (45) | Akşam (45) |
|---|---|---|
| Pzt | 15 SRS · 30 yeni ünite | 15 ünite diyaloğu dinleme · 15 shadowing · 15 yazma |
| Salı | 15 SRS · 30 gramer dersi | 20 gramer pratiği · 15 okuma · 10 yazma |
| Çar | 15 SRS · 30 ders | 30 Nicos Weg/Easy German · 15 konuşma (kendini kaydet) |
| Per | 15 SRS · 30 ders | 15 telaffuz lab · 20 okuma · 10 yazma |
| Cuma | 15 SRS · 30 ders | 20 dinleme (podcast) · 15 shadowing · 10 yazma |
| Cmt | 15 SRS · 30 ünite testi/deneme sınav modülü | 20 Hata Defteri · 25 tandem/italki veya serbest konuşma |
| Paz | 15 SRS · 30 dış kaynak (keyif) | haftalık rapor · plan gözden geçirme (hafif) |

### 6.5 Sistem dışı kaynaklarla entegrasyon

Kaynak kataloğu (Dış Görevler modülünde JSON olarak tutulur: `id, ad, url, seviye, tür, süre, ilgili_ünite, sonra_görevi`):

| Seviye | Kaynak | Tür | Nasıl görev olur? |
|---|---|---|---|
| A1 | **DW Nicos Weg A1** (ücretsiz, Türkçe arayüz seçeneği) | Video + alıştırma | Ünite ↔ bölüm eşlemesi; "Bölümü izle (altyazı DE) → bölüm kelime paketini SRS'e aktar → 2 cümle özet yaz" |
| A1 | **Super Easy German / Easy German** (YouTube) | Video | Haftada 1; "İzle → duyduğun 3 kelimeyi deftere ekle" |
| A1 | **Seedlang** (opsiyonel, ücretli) | Video kart | Telaffuz haftalarında öneri |
| A1 | **Goethe "Deutsch für dich"**, **Goethe A1 Übungssatz** | Alıştırma / model sınav | Sınav simülasyonu öncesi |
| A1 | **DW "Deutsch – warum nicht?"** / **DW Wort der Woche** (kısa) | Ses / mini video | Pazar keşif görevi |
| A1–A2 | Çocuk şarkıları, **"Die Sendung mit der Maus"** kısa klipleri | Video | Keyif görevi, Pazar |
| A2 | **DW Nicos Weg A2** | Video | A1'deki gibi |
| A2 | **Slow German** (Annik Rubens) podcast | Podcast | "Dinle (yazıyla) → 5 kelime ekle" |
| A2 | **DW "Langsam gesprochene Nachrichten"** | Haber (B1'e yakın, A2 sonu) | A2.2'de haftada 1, "başlıkları anla" düzeyinde |
| A2 | **Kinderbücher / Leichte Sprache** metinleri (ör. nachrichtenleicht.de, Lektüre A2 serileri) | Okuma | Okuma kütüphanesi tamamlayıcısı; "1 sayfa oku, bilinmeyen 5 kelimeyi ekle" |
| A2 | **Easy German podcast** (yavaş bölümler), **Coffee Break German** | Podcast | Yürüyüş/yol görevi (pasif dinleme dakikası ayrı sayılır) |
| A2 | **Tandem** (Tandem/HelloTalk uygulamaları) veya **italki** topluluk öğretmeni | Konuşma | Haftada 1 × 30 dk (A1 sonundan itibaren önerilir); sistem görüşme öncesi "konuşma kartı" üretir (bu haftanın 10 cümlesi + 5 soru), sonrası "öğrendiğim 3 şey" kaydı |
| A2 | Almanca altyazılı dizi (ör. çocuk/gençlik dizileri; Netflix "Extra Deutsch" gibi öğrenme dizileri) | Video | Keyif görevi |

Entegrasyon mekaniği:
1. **Önerme**: Haftalık plan oluşturulurken mevcut üniteye uyan 2–4 görev seçilir.
2. **Bağlantı**: Görev kartında harici bağlantı (yeni sekme); dönüşte "Tamamladım" + süre onayı.
3. **Hasat**: Görev sonrası mini form — "Bu kaynaktan kelime ekle" (artikel/çoğul alanlarıyla), "1–3 cümle özet". Eklenen kelimeler SRS'e "dış kaynak" etiketiyle girer.
4. **İçerik paketleri**: Nicos Weg bölümleri için önceden hazırlanmış kelime paketleri (bölüm başlığı + ana kelimeler; telif nedeniyle DW metinleri kopyalanmaz, sadece kelime listesi/bağlantı).
5. **Tandem hazırlık kartı**: O haftanın kelimeleri ve kalıplarıyla otomatik "konuşma kopya kâğıdı" (yazdırılabilir).

### 6.6 Seviye kilometre taşları (60 dk senaryosu)

| Hafta | Kilometre taşı |
|---|---|
| 1 | Alfabe/telaffuz temeli, selamlaşma, kendini tanıtma, sein; ~80 kelime |
| 4 | Präsens düzenli fiiller, sayılar, aile, haben + Akkusativ başlangıcı; ~250 kelime; ilk Nicos Weg bölümleri |
| 8 | Akkusativ, modal fiiller (können, möchten), saat/gün, alışveriş; ~450 kelime; ilk mini sınav |
| 12 | Ayrılabilen fiiller, Dativ girişi, yön tarifi, Perfekt girişi; ~600 kelime |
| 17–21 | **A1 tamam**: ~700–800 kelime, Perfekt (haben/sein), Wechselpräpositionen girişi; **A1 deneme sınavı ≥ %60 (hedef %75)**; tandem başlangıcı önerilir |
| 30 | A2.1: Dativ tam, sıfat çekimi giriş, weil/dass yan cümleleri, Präteritum (sein/haben/modal); ~1300 kelime |
| 38–43 | **A2 tamam**: ~1800–2000 kelime, Komparativ/Superlativ, reflexive fiiller, Konjunktiv II nezaket (würde/hätte/könnte); **A2 deneme sınavı ≥ %60** |

---

## 7. İlk 7 Gün — Gün Gün Kullanıcı Deneyimi

Varsayım: 60 dk/gün seçildi; ama ilk hafta **kademeli yükleme** ile başlar (gün 1 ≈ 30 dk, gün 7'de tam ritim) — ilk günlerde bıkmamak ve "başarabiliyorum" hissi için.

### Gün 1 (Pazartesi) — "Merhaba Almanca" (~30–35 dk)
1. **Onboarding (3 dk)**: hedef A2, 60 dk/gün, hatırlatma 20:00, mikrofon testi, artikel renkleri tanıtımı ("Almancada her ismin bir 'cinsiyeti' var; renkler yardım edecek — şimdilik sadece fark et").
2. **Ders 0.1 – Sesler ve alfabe (12 dk)**: Türkçeyle aynı olan sesler (rahatlatıcı: "ö, ü, ş gibi seslerin zaten var!") → farklı olanlar: ei [ay], ie [i:], z [ts], w [v], v [f], sch [ş], ch (2 tür). Dinle-seç alıştırmaları.
3. **Ders 1.1 – Hallo! (15 dk)**: Diyalog: "Hallo, ich bin Ayşe. Wie heißt du?" → "Ich heiße…/Ich komme aus der Türkei." Kural kutusu: ich bin / du bist (sein'in ilk iki çekimi). 10 alıştırma.
4. **İlk SRS tanışması (3 dk)**: Bugün öğrenilen 8 kelime kart olarak gösterilir; 4 düğme açıklanır ("Dürüst ol — 'Zor' demek bir sonraki tekrarı yaklaştırır, bu iyi bir şey").
5. **İlk konuşma (2 dk)**: "Kendini tanıt: Ich heiße ___. Ich komme aus ___." kaydet → dinle. 
6. **Kapanış**: "Bugün 12 kelime ve 2 cümle kalıbı öğrendin. Artık kendini Almanca tanıtabilirsin." İlk can-do yarı dolu. Yarının önizlemesi.

### Gün 2 (Salı) — İlk gerçek tekrar (~40 dk)
1. Bildirim 20:00: "Dünkü 12 kelime seni bekliyor (3 dk)."
2. **İlk tekrar oturumu (5 dk)**: Dünkü kartlar (kısa aralıkla planlanmış öğrenme adımları). Unutulanlar normal karşılanır: "Unutmak öğrenmenin parçası; bu kart 10 dk sonra tekrar gelecek."
3. **Ders 1.2 – Sayılar 0–20 + telefon numarası (15 dk)**.
4. **Ders 1.3 – Ülkeler/diller, "Woher kommst du?" (15 dk)**: Türkçe köprü: "aus der Türkei" — "Türkei" dişil, ülkelerin çoğu artikel almaz (ilk artikel istisnası, merak uyandırıcı).
5. **Günün 3 cümlesi (3 dk)**: Yönlendirmeli: "Adın, nereli olduğun, kaç numaralı telefonun."

### Gün 3 (Çarşamba) — İlk dış kaynak (~45 dk)
1. Tekrar (7 dk, ~25 kart).
2. **Ders 1.4 – Fiil çekimi: wohnen, kommen, heißen (Präsens düzenli) (15 dk)**: Tablo + Türkçe köprü ("geliyorum/geliyorsun" — Almancada da şahıs ekleri var: -e, -st, -t!). Bu köprü kritik "aha" anı.
3. **İlk dış görev (15 dk)**: DW Nicos Weg A1 – 1. bölüm. Sistem: "Altyazıyı Almanca aç, her şeyi anlamaya çalışma; 'Hallo', 'Ich bin' gibi bildiğin kelimeleri yakala." Dönüşte: bölüm kelime paketi SRS'e eklensin mi? (sınırlı: 5 kelime).
4. Shadowing (5 dk): diyalog cümleleri.
5. Kapanış: Streak 3 → "Üç gün! Alışkanlık oluşmaya başladı." (sade).

### Gün 4 (Perşembe) — İlk artikel dersi ve ilk hata örüntüsü (~50 dk)
1. Tekrar (8 dk).
2. **Ders 2.1 – der/die/das ve ein/eine (20 dk)**: Neden önemli, renk sistemi, "artikelle birlikte öğren" kuralı; ipuçları (-ung/-heit/-keit → die; -chen → das; erkek kişiler → der). Artikel tahmin oyunu.
3. **Telaffuz lab (10 dk)**: ch (ich/ach) + ei/ie minimal çiftleri.
4. **Yazma (5 dk)**: 3 nesne + artikel: "Das ist ein Tisch."
5. Ders sonunda Hata Defteri ilk kez görünür: "Artikel hatalarını burada topluyoruz; cumartesi bunları birlikte çalışacağız."

### Gün 5 (Cuma) — Okuma ve ilk "anlıyorum!" (~55 dk)
1. Tekrar (10 dk; kart sayısı artıyor → SRS kartlarının gerçekten kısa sürdüğünü görür).
2. **Ders 2.2 – Aile, mein/meine (20 dk)**.
3. **İlk okuma metni (10 dk)**: "Das ist Ayşe" (60 kelime), bilinen kelime %92. Kelimeye dokun → mini kart. Metin sonu 3 soru. Mesaj: "İlk Almanca metnini okudun!" → rozet: **"İlk metin"**.
4. Konuşma (10 dk): Aileni tanıt (kayıt).
5. Yazma (5 dk).

### Gün 6 (Cumartesi) — Pekiştirme günü (~60 dk)
1. Tekrar (12 dk).
2. **Hata Defteri pratiği (15 dk)**: Bu haftanın hatalarından üretilmiş oturum; çözülen hatalar "✓ çözüldü".
3. **Ünite 1 testi (15 dk)**: Hören/Lesen/Schreiben mini format. Sonuç: modül bazında; ≥ %80 → "Kendimi tanıtabilirim" can-do tamam.
4. **Serbest konuşma (10 dk)**: 1 dakikalık kendini tanıtma; Gün 1 kaydıyla karşılaştırma ("önce/sonra" dinle).
5. Gramer referansına ilk turu: "sein, Präsens tablosu, artikeller" kartlarını gezdirir; "yer imi" ekleme.

### Gün 7 (Pazar) — Hafif gün + ilk haftalık rapor (~30–40 dk)
1. Tekrar (10 dk).
2. **Keyif görevi (15–20 dk)**: Super Easy German bir A1 bölümü veya Almanca çocuk şarkısı; 3 kelime hasadı.
3. **İlk haftalık rapor (5 dk)**: "Bu hafta: 6/7 gün, 5 sa 40 dk, 95 kelime (38'i sağlamlaşıyor), 9 ders, en sık hata: artikel (doğal!). Gelecek hafta: Akkusativ'e giriş + Nicos Weg 2–3. bölüm." Tempo projeksiyonu ilk kez gerçek veriyle: "Bu tempoyla A1: ~19 hafta."
4. Yansıtma sorusu + **ilk yedekleme hatırlatması** ("İlerlemeni indir — 2 saniye").
5. Hafta 2 planı oluşur (60 dk tam ritim başlar).

### İlk hafta tasarım ilkeleri (özet)
- Kademeli yük: 30 → 60 dk; yeni kart/gün 10–15 (ilk 3 gün 10).
- Her gün **en az bir "yapabiliyorum" anı** (cümle kurma, metin okuma, kayıt karşılaştırma).
- İlk hafta "Neden?" açıklamaları otomatik açık; 2. haftadan itibaren isteğe bağlı.
- İlk 3 gün bildirim yalnızca 1 kez ve sadece çalışılmadıysa; ton davetkâr.

---

## 8. Diğer Kollara Notlar / Açık Sorular

- **Pedagoji/müfredat koluna**: Ünite listesi Nicos Weg A1/A2 bölümleriyle hizalanmalı (eşleme tablosu); ders fazları (bağlam → kural → alıştırma → üretim) ders veri modelinde alan olarak bulunmalı.
- **SRS/veri koluna**: FSRS parametreleri, kart tipleri (artikel, çoğul, cloze, çekim, dinle-yaz), günlük yeni/maks. tekrar ayarları, Hata Defteri etiket şeması (`artikel`, `kasus-akk`, `kasus-dat`, `cekim`, `soz-dizimi-v2`, `yan-cumle`, `yazim`, `kelime`), aktif süre ölçümü.
- **Teknik mimari koluna**: PWA + Service Worker, IndexedDB, hash router, JSON yedek/geri yükleme, Web Speech API (tanıma + TTS) ve MediaRecorder geri düşüşleri, Notification API kısıtları (iOS'ta yalnızca ana ekrana eklenmiş PWA'da).
- **İçerik/ses koluna**: TTS kalitesi tarayıcıya göre değişir; kritik diyaloglar için önceden üretilmiş ses dosyaları (ör. açık lisanslı veya kendi ürettiğimiz) tercih edilmeli; dış kaynak (DW) içerikleri kopyalanmamalı, bağlantı + kelime listesi kullanılmalı.
- Açık soru: Kullanıcının İngilizce bilgisi var mı? Varsa Easy German (İngilizce altyazı) ve İngilizce-Almanca ortak kelime köprüleri ("Haus–house") ek bir kaldıraç olur; onboarding'de sorulmalı.
