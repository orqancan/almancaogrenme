# Almanca Öğrenme Sistemi — Ana Plan (A1 → A2)

> Bu belge 6 alt kolun analizini tek bir karar setine bağlar. Detaylar için `docs/analiz/` altındaki dosyalara bakın.
> Kollar arasında çelişen noktalar burada **bağlayıcı karar** olarak çözülmüştür (§3).

| # | Kol | Dosya | Ana çıktı |
|---|-----|-------|-----------|
| 01 | Pedagoji & öğrenme bilimi | [analiz/01-pedagoji.md](analiz/01-pedagoji.md) | FSRS, ilke→özellik tablosu, Türkçe transfer, oturum yapısı |
| 02 | A1–A2 müfredat | [analiz/02-mufredat.md](analiz/02-mufredat.md) | 28+1 ünite, 67 gramer konusu, 70 kalıp, 24 ses birimi, ünite JSON örneği |
| 03 | Dört beceri & ses | [analiz/03-beceriler-ses.md](analiz/03-beceriler-ses.md) | TTS/STT stratejisi, telaffuz, dikte, yazma geri bildirimi |
| 04 | Teknik mimari | [analiz/04-mimari.md](analiz/04-mimari.md) | Yığın, dizin yapısı, IndexedDB, FSRS motoru, registry, MVP |
| 05 | Alıştırma, ölçme, içerik | [analiz/05-alistirma-degerlendirme-icerik.md](analiz/05-alistirma-degerlendirme-icerik.md) | 34 alıştırma tipi, hata taksonomisi, mock sınav, içerik hattı, dolu örnek ders |
| 06 | UX, motivasyon, plan | [analiz/06-ux-motivasyon-plan.md](analiz/06-ux-motivasyon-plan.md) | Rakip analizi, 13 ekran, alışkanlık tasarımı, ilk 7 gün |

---

## 1. Sistemin tek cümlelik tanımı

Telefonda ve bilgisayarda çevrimdışı çalışan, build gerektirmeyen bir HTML/JS PWA: her gün **"Devam"** butonuna basınca sistem sana *önce tekrar → sonra zayıf nokta → sonra yeni ders* sırasıyla, Türkçe köprülerle açıklanmış, sesli, otomatik puanlanan bir oturum hazırlar; ilerlemen cihazında saklanır ve Goethe A1/A2 formatında sınavlarla ölçülür.

## 2. "Öğretmensiz öğretme" için çözülmesi gereken 8 problem

Öğretmenin yaptığı her işin sistemdeki karşılığı:

| Öğretmenin işi | Sistemdeki karşılığı | Kol |
|---|---|---|
| Ne öğreneceğine karar vermek | Bağımlılık sıralı müfredat + "Bugün" planlayıcısı | 02, 04 |
| Açıklamak | Her derste kısa Türkçe gramer kartı, Türkçe köprüler (‑i ↔ Akk., parka/parkta ↔ wohin/wo, SOV ↔ Nebensatz), "Neden?" butonu | 01, 06 |
| Örnek göstermek | Sesli diyalog/hikâye ile başlayan ders (önce bağlam, sonra kural) | 01, 06 |
| Hatayı düzeltmek | Normalize → karşılaştır → teşhis motoru; hata etiketine göre Türkçe açıklama; kademeli ipucu | 04, 05 |
| Unutmamayı sağlamak | FSRS aralıklı tekrar, üretim ağırlıklı kartlar | 01, 04 |
| Konuşturmak | Kayıt + model sesle A/B karşılaştırma, shadowing, (destekleyen tarayıcıda) konuşma tanıma ile anlaşılırlık skoru | 03 |
| Yazıyı okumak | Yerel kural motoru + öz-kontrol listesi + model cevap; isteğe bağlı LanguageTool / kendi Claude API anahtarınla düzeltme | 03 |
| Seviyeni ölçmek | Ders sonu quiz, ünite testi (mastery), 4 kontrol noktası, Goethe formatında mock sınav, can-do kalibrasyonu | 02, 05 |

## 3. Bağlayıcı kararlar (kollar arası uzlaştırma)

| Konu | Karar | Gerekçe / not |
|---|---|---|
| Yığın | Saf HTML + CSS + vanilla JS (ES modules), build yok, JSDoc `@ts-check` | Tek kişilik, yıllarca bakımı kolay (04) |
| Barındırma | GitHub Pages, PWA (manifest + service worker) | Ücretsiz, telefona kurulabilir |
| Kalıcılık | IndexedDB (öğrenme verisi) + localStorage (ayarlar); **JSON yedekleme MVP'de zorunlu** | iOS'ta ana ekrana eklenmeyen siteler 7 gün sonra veri kaybedebilir |
| SRS | FSRS‑5 (ts-fsrs vendor'lı ya da ~150 satır kendi implementasyon), hedef hatırlama 0.90 | 01 + 04 |
| Yeni kart limiti | 30 dk/gün: 8–10, 60 dk/gün: 15–20; tekrar borcu birikince otomatik azalır | 01 |
| Ünite yapısı | **Ünite 0 (telaffuz) + 28 ünite**, her ünite 6 ders + 1 tekrar + 1 ünite testi (≈5 saat) | 02'nin yapısı esas alındı (05'in "96 ders" tahmini geçersiz → ≈170 ders) |
| Mastery eşiği | Ünite testi: toplam **≥ %80** ve her gramer konusunda ≥ %70. Kilit **yumuşak** (uyarıyla geçilebilir) | 01 (%85), 04 (%80), 05 (%80/%70) uzlaştırıldı |
| Ders sonu quiz | 6–8 madde, ipucu yok, eski derslerden karışık, kilitlemez | 05 |
| Artikel renkleri | der = mavi, die = kırmızı, das = yeşil, Plural = ayrı renk + renk körlüğü için şekil | 01, 05, 06 |
| Kelime birimi | Kelime her zaman artikel + çoğul ile tek birim | 01 |
| Ses | Tüm sabit içerik **önceden üretilmiş MP3** (Piper `de_DE-thorsten-high`, CC0; ikinci ses için Azure ücretsiz katman). Tarayıcı TTS yalnızca yedek | Açık lisans, repo herkese açık olabilir; edge-tts kullanılmaz |
| Ses depolama | MP3 mono 32–48 kbps, içerik hash'i ile adlandırılmış, ünite ünite indirilip cache'lenir (~70–100 MB toplam) | Başta repoda; sınır yaklaşırsa GitHub Releases |
| Konuşma skoru | Anlaşılırlık ölçer, telaffuz değil. **Asla kilit koşulu değil.** Düşük skor güvenilir sinyal, yüksek skor değil | 03 |
| Dışarı veri | Varsayılan: hiçbir ses/metin cihazdan çıkmaz. Konuşma tanıma, LanguageTool, Claude API her biri ayrı onayla açılır | 03 |
| Cevap toleransı | ae/oe/ue/ss uyarıyla kabul; anlam değiştiren umlaut (schon/schön) yanlış; artikel/çekim farkı **asla** yazım hatası sayılmaz; `toLocaleLowerCase('tr')` yasak | 03, 04 |
| Oyunlaştırma | Esnek seri (dondurma hakkı, tatil modu), haftalık gün hedefi, can-do rozetleri. **Liderlik tablosu, can/kalp, suçlayıcı bildirim yok** | 01, 06 |
| İçerik kaynağı | Goethe Wortliste yalnız kapsam referansı (kopyalanmaz); içerik Claude ile kısıtlı istemlerle üretilir + otomatik doğrulayıcılar + örneklem kontrol; Tatoeba (CC BY) seçici; her nesnede `provenance` | 05 |
| Süre beklentisi | A1 ≈ 120–150 saat, A2 kümülatif ≈ 270–300 saat | 01, 06 uzlaştırıldı |

## 4. Müfredat iskeleti (özet)

- **Ünite 0 — Laute & Buchstaben:** alfabe, Umlaut, ch [ç/x], r, z=[ts], ei/ie, eu/äu, sch/sp/st, uzun/kısa ünlü, vurgu, Auslautverhärtung (6 ders).
- **A1.1 (1–7):** Hallo! Ich bin … · Zahlen & Kontakte · Familie · Essen & Trinken · Einkaufen · Mein Tag · Freizeit → *Kontrol Noktası 1*
- **A1.2 (8–14):** Wohnen · In der Stadt · Arbeit · Termine · Gesundheit · Kleidung & Wetter · Unterwegs → *Start Deutsch 1 simülasyonu*
- **A2.1 (15–21):** Erinnerungen · Urlaub · Nachbarn · Restaurant & Einladung · Arzt · Geschenke & Mode · Medien → *Kontrol Noktası 3*
- **A2.2 (22–28):** Bewerbung · Ämter · Feste · Beziehungen · Natur & Umwelt · Lernen & Zukunft · Leben in D‑A‑CH → *Goethe A2 simülasyonu*

Hedefler: A1 sonunda ~700, A2 sonunda ~1350 aktif kelime (+~430 pasif), 70 yüksek frekanslı kalıp, 67 gramer konusu (sıralama ve bağımlılık grafiği: 02 §4).

## 5. Bir günlük oturum (60 dk şablonu)

| Blok | Süre | İçerik |
|---|---|---|
| Tekrar | 10 dk | FSRS kuyruğu (her zaman önce) |
| Yeni ders | 25 dk | Bağlam (sesli diyalog) → kural (Türkçe köprü) → kontrollü pratik → serbest üretim |
| Girdi | 10 dk | Dinleme/okuma (metindeki kelimelerin ≥ %95'i bilinen) |
| Konuşma | 10 dk | Shadowing, kayıt + karşılaştırma |
| Yazma | 5 dk | "Günün 3 cümlesi" |

Hafta: Cumartesi Hata Defteri + ünite testi, Pazar hafif gün (dış kaynak + haftalık rapor), her 4 ünitede bir tekrar haftası. İlk hafta 30 dk'dan başlanıp 60 dk'ya çıkılır.

**Takvim projeksiyonu:**

| Günlük süre | A1 | A2 (toplam) |
|---|---|---|
| 30 dk | ~8–10 ay | ~18–20 ay |
| 60 dk | ~4–5 ay | ~9–10 ay |
| 90 dk | ~3 ay | ~6–7 ay |

Sistem dışı tamamlayıcılar (sistem bunları "Dış Görev" olarak önerir, içerik kopyalanmaz): DW *Nicos Weg* (ünitelerle eşleştirilecek), Easy German, A2'de Slow German, DW *Langsam gesprochene Nachrichten*, tandem/italki.

## 6. Mimari özeti

```
index.html  manifest.webmanifest  sw.js
css/        base, components, exercises
js/main.js
js/core/    db, store, router, content, planner, progression, weakness, audio, backup
js/core/srs/      fsrs, cards, queue
js/core/answer/   normalize, compare, diagnose
js/exercises/     registry + her tip ayrı dosya (validate/render/check/feedback/toRating)
js/views/         today, path, lesson, review, grammar, stats, settings
content/    manifest.json, lexicon/a1.json, a1/unit-01.json, tags.json
audio/      w/, s/, audio-manifest.json
tools/      validate-content.mjs, ses üretim scriptleri
tests/      node --test
```

İlkeler: içerik ↔ motor ayrımı; `check()` saf fonksiyon (Node'da test edilir); olay günlükleri asıl kaynak, kart durumları yeniden hesaplanabilir; GitHub Actions → doğrula + test → Pages.

## 7. Yol haritası

### Faz 0 — Hazırlık (1–2 gün)
- [ ] Açık sorular (§8) cevaplanır
- [ ] Repo iskeleti, `index.html`, router, IndexedDB şema v1
- [ ] İçerik şeması + `tools/validate-content.mjs`

### Faz 1 — MVP (1–2 hafta): uçtan uca döngü
- [ ] Ünite 0 + Ünite 1–3 içeriği (sesli)
- [ ] 5 alıştırma tipi: flashcard, mcq, type-answer, article, word-order
- [ ] Cevap kontrol motoru (normalize/compare/basit teşhis)
- [ ] FSRS + 3 kart yönü (DE→TR, TR→DE, artikel) + kardeş gömme + günlük kuyruk
- [ ] Ders oynatıcı (yanlış soru 3 adım sonra tekrar, kaldığı yerden devam)
- [ ] "Bugün" ekranı (tekrar → yeni ders), basit kilit
- [ ] JSON export/import + yedek hatırlatma
- [ ] PWA + iOS kurulum rehberi, Pages deploy, temel testler

**MVP kabul kriteri:** Bir ders bitir → kartlar oluşsun → ertesi gün tekrar gelsin → telefonda çevrimdışı çalışsın → yedekten geri yüklenebilsin.

### Faz 2 — v1: A1'in tamamı
- [ ] Kalan alıştırma tipleri (cloze, conj_table, transform, dictation, listen_number, dialog, shadowing, short_write…)
- [ ] Tam teşhis + hata etiketleri + Hata Defteri + zayıf nokta tatbikatı
- [ ] Mastery gating, ünite testi, kontrol noktaları, Start Deutsch 1 mock sınavı
- [ ] Gramer referansı (aranabilir tablolar), kelime defteri, ilerleme paneli
- [ ] Motivasyon katmanı (esnek seri, haftalık hedef, tahmini varış tarihi)
- [ ] Ünite 4–14 içeriği
- [ ] Telaffuz laboratuvarı (kayıt + A/B, minimal çiftler)

### Faz 3 — v2: A2
- [ ] Ünite 15–28 içeriği, Goethe A2 mock sınavı
- [ ] Okuma kütüphanesi (tıklanabilir kelime, bilinen kelime %'si)
- [ ] Opsiyonel: konuşma tanıma skoru, LanguageTool, kendi Claude API anahtarınla yazma düzeltme
- [ ] Kişisel FSRS parametre optimizasyonu (~1000 tekrardan sonra), Gist senkronu
- [ ] Deneysel: tarayıcıda Whisper (Firefox için tek STT seçeneği)

## 8. Başlamadan önce senin cevaplaman gereken sorular

1. **İngilizce biliyor musun?** (Biliyorsan İngilizce köprüler ve sahte arkadaş listesi eklenir.)
2. **Günde gerçekçi olarak kaç dakika?** (30 / 60 / 90 — yeni kart limitleri ve takvim buna göre ayarlanır.)
3. **Hedef sınav ve tarih var mı?** (Goethe Start Deutsch 1 / A2, ya da sadece günlük iletişim.)
4. **Repo herkese açık mı kalacak?** (Ses motoru ve içerik lisansı seçimini etkiler.)
5. **Kendi Claude API anahtarınla opsiyonel yazma/konuşma geri bildirimi istiyor musun?**
6. **Ana cihaz?** (iPhone ise PWA'yı ana ekrana eklemek veri güvenliği için şart.)

## 9. Riskler

| Risk | Önlem |
|---|---|
| İçerik üretimi en büyük iş yükü (~1350 lemma, ~6000 alıştırma, ~6000 ses klibi) | Ünite ünite üretim, Claude ile kısıtlı istem + otomatik doğrulayıcılar; motor ilk günden içerikten bağımsız |
| LLM üretimi Almanca hataları | Kelime kapsama + seviye dedektörü + LanguageTool + ikinci model "Korrektor" + %10 insan örneklemi + uygulama içi "bu madde hatalı" butonu |
| Tarayıcı verisinin silinmesi | IndexedDB `persist()`, zorunlu periyodik JSON yedek, iOS kurulum rehberi |
| Konuşma skorunun yanıltıcı olması | Arayüzde açıkça "anlaşılırlık" diye adlandırılır, kilit koşulu olmaz |
| Motivasyon düşüşü | Tek buton, kısa oturum seçeneği, esnek seri, gerçekçi varış tarihi |
| Goethe formatı detaylarının doğrulanmamış olması | Resmi Modellsatz PDF'leriyle karşılaştırma Faz 2'de açık görev (05 §10) |
