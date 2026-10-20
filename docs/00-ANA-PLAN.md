# Almanca Öğrenme Sistemi — Ana Plan (A1 → A2)

> Bu belge 6 alt kolun analizini tek bir karar setine bağlar. Detaylar için `docs/analiz/` altındaki dosyalara bakın.
> Kollar arasında çelişen noktalar ve kullanıcı cevaplarıyla değişen kararlar burada **bağlayıcıdır**; analiz dosyalarıyla çelişirse bu belge geçerlidir.

| # | Kol | Dosya | Ana çıktı |
|---|-----|-------|-----------|
| 01 | Pedagoji & öğrenme bilimi | [analiz/01-pedagoji.md](analiz/01-pedagoji.md) | FSRS, ilke→özellik tablosu, Türkçe transfer, oturum yapısı |
| 02 | A1–A2 müfredat | [analiz/02-mufredat.md](analiz/02-mufredat.md) | 28+1 ünite, 67 gramer konusu, 70 kalıp, 24 ses birimi, ünite JSON örneği |
| 03 | Dört beceri & ses | [analiz/03-beceriler-ses.md](analiz/03-beceriler-ses.md) | TTS/STT stratejisi, telaffuz, dikte, yazma geri bildirimi |
| 04 | Teknik mimari | [analiz/04-mimari.md](analiz/04-mimari.md) | Veri modeli, FSRS motoru, alıştırma registry'si, cevap kontrolü |
| 05 | Alıştırma, ölçme, içerik | [analiz/05-alistirma-degerlendirme-icerik.md](analiz/05-alistirma-degerlendirme-icerik.md) | 34 alıştırma tipi, hata taksonomisi, içerik hattı, dolu örnek ders |
| 06 | UX, motivasyon, plan | [analiz/06-ux-motivasyon-plan.md](analiz/06-ux-motivasyon-plan.md) | Rakip analizi, ekranlar, alışkanlık tasarımı, ilk 7 gün |

---

## 0. Kullanıcı profili (Revizyon 1 — cevaplar alındı)

| Soru | Cevap | Sisteme etkisi |
|---|---|---|
| İngilizce? | **Biliyor** | İngilizce köprüler + sahte arkadaş uyarıları eklenir (§3.2) |
| Günlük süre | **En az 30 dk, günün yoğunluğuna göre değişken** | "Bugün ne kadar vaktin var?" seçimi; planlayıcı süreye göre oturum kurar (§5) |
| Hedef | **Sınav değil, Almanya'da yaşayabilmek** | Pratik/iletişim ağırlıklı müfredat, "Almanya'da Hayat" senaryo hattı, sınav simülasyonu opsiyonel (§4) |
| Repo | Herkese açık olabilir | Açık lisanslı içerik/ses şart (Piper CC0, edge-tts yok) |
| Çalışma şekli | **Bilgisayarda çift tıklayarak açılan yerel HTML** | `file://` uyumlu mimari: build yok, sunucu yok, ES module/fetch yok (§3.1) |
| Yazı düzeltme | **İsteğe bağlı, belirli bir servise bağlı olmadan** (ChatGPT/Claude linki) | API anahtarı yok; "istemi kopyala + sohbet aç" butonları (§3.3) |

---

## 1. Sistemin tek cümlelik tanımı

Bilgisayarda `index.html`'e çift tıklayınca internet olmadan açılan bir öğrenme uygulaması: her gün "bugün kaç dakikan var?" sorusuna göre sistem sana *önce tekrar → sonra zayıf nokta → sonra yeni ders* sırasıyla, Türkçe (ve İngilizce) köprülerle açıklanmış, sesli, otomatik puanlanan bir oturum hazırlar; dersler Almanya'daki gerçek hayat durumlarına göre kurgulanır.

## 2. "Öğretmensiz öğretme" için çözülmesi gereken 8 problem

| Öğretmenin işi | Sistemdeki karşılığı | Kol |
|---|---|---|
| Ne öğreneceğine karar vermek | Bağımlılık sıralı müfredat + "Bugün" planlayıcısı | 02, 04 |
| Açıklamak | Her derste kısa Türkçe gramer kartı, Türkçe ve İngilizce köprüler, "Neden?" butonu | 01, 06 |
| Örnek göstermek | Sesli diyalog/sahne ile başlayan ders (önce bağlam, sonra kural) | 01, 06 |
| Hatayı düzeltmek | Normalize → karşılaştır → teşhis motoru; hata etiketine göre Türkçe açıklama; kademeli ipucu | 04, 05 |
| Unutmamayı sağlamak | FSRS aralıklı tekrar, üretim ağırlıklı kartlar | 01, 04 |
| Konuşturmak | Kayıt + model sesle A/B karşılaştırma, shadowing, rol yapma (doktor, Bürgeramt…), Chrome/Edge'de konuşma tanıma ile anlaşılırlık skoru | 03 |
| Yazıyı okumak | Yerel kural motoru + öz-kontrol listesi + model cevap + isteğe bağlı "ChatGPT/Claude'a sor" butonu | 03 |
| Seviyeni ölçmek | Ders sonu quiz, ünite testi, **gerçek hayat görevleri** (form doldur, randevu al), can-do öz-değerlendirme; Goethe formatı opsiyonel | 02, 05 |

## 3. Bağlayıcı kararlar

### 3.1 Teknik: yerel `file://` mimarisi

Chromium'da `file://` ile yapılan test sonucu (bu oturumda doğrulandı):

| Özellik | `file://` | Sonuç |
|---|---|---|
| `<script type="module">` | ❌ engelleniyor | ES modules **kullanılmaz** |
| `fetch('x.json')` | ❌ "Failed to fetch" | İçerik JSON değil **JS dosyası** olarak yüklenir |
| Klasik `<script src>` | ✅ | Tüm kod ve içerik bu yolla |
| localStorage / IndexedDB | ✅ | Kalıcılık mümkün |
| `isSecureContext` | ✅ true | Mikrofon, pano erişimi çalışır |
| SpeechSynthesis / webkitSpeechRecognition | ✅ mevcut | TTS yedeği ve STT (Chrome/Edge) |
| `<audio src="audio/…mp3">` | ✅ (yerel dosya) | Önceden üretilmiş sesler doğrudan çalar |
| Service worker | gereksiz | Dosyalar zaten yerelde; PWA katmanı kaldırıldı |

Buna göre:

| Konu | Karar |
|---|---|
| Yığın | Saf HTML + CSS + vanilla JS, **klasik script'ler**, tek global ad alanı (`window.DE`), build yok, JSDoc `@ts-check` |
| Kod düzeni | `js/` altında dosyalar, `index.html` bunları sırayla `<script src>` ile yükler (IIFE desenli, her dosya `DE.xxx = …` kaydeder) |
| İçerik formatı | `content/a1/unit-01.js` → `DE.content.registerUnit({...})`. Veri yapısı 02/04/05'teki JSON şemalarının aynısı, sadece JS ile sarılı |
| İçerik yükleme | Tüm ünite dosyaları `index.html`'de listelenir (ya da `content/index.js` manifesti); `tools/` altındaki Node scripti listeyi ve şemayı doğrular |
| Tarayıcı | **Chrome veya Edge önerilir** (STT, `file://` davranışı en tutarlı). Firefox'ta temel işlevler çalışır, STT yok |
| Kalıcılık | MVP'de tek JSON durum nesnesi localStorage'da (`almanca.state.v1`; günlük bir önceki sürüm ayrı anahtarda). Veri küçük (kartlar + son 20.000 tekrar kaydı) olduğu için IndexedDB'ye gerek görülmedi; büyürse geçilir. Chrome'da tüm `file://` sayfaları tek origin paylaşır → klasör taşınsa da ilerleme kaybolmaz |
| Yedek | **MVP'de zorunlu**: "İlerlemeyi indir" (`ilerleme-YYYY-MM-DD.json`) + "Yükle"; 7 günde bir hatırlatma. v1'de Chrome/Edge için File System Access API ile repo klasöründeki bir dosyaya otomatik kaydetme (tarayıcı verisi silinse de ilerleme dosyada kalır) |
| Telefon | Kapsam dışı. Aynı dosyalar değişiklik gerekmeden GitHub Pages'te de çalışır; ileride istenirse açılır (ilerleme bu durumda yedek dosyasıyla taşınır) |
| SRS | FSRS‑5, hedef hatırlama 0.90 (ts-fsrs `js/vendor/`'a UMD olarak ya da ~150 satır kendi implementasyon) |
| Test | `node --test`; saf fonksiyonlar (normalize, compare, diagnose, fsrs, planner) DOM'suz test edilir. Klasik script'ler Node'da `vm` ile yüklenir |
| Ses | Önceden üretilmiş MP3 (Piper `de_DE-thorsten-high`, CC0 + ikinci ses), mono 32–48 kbps, `audio/` klasöründe, repoya dahil. Tarayıcı TTS yalnızca yedek |

### 3.2 Pedagojik

| Konu | Karar |
|---|---|
| Ünite yapısı | **Ünite 0 (telaffuz) + 28 ünite**, her ünite 6 ders + 1 tekrar + 1 ünite testi (≈5 saat) |
| Mastery | Ünite testi: toplam ≥ %80 ve her gramer konusunda ≥ %70. Kilit **yumuşak** (uyarıyla geçilebilir) |
| Kelime birimi | Kelime her zaman artikel + çoğul ile; der = mavi, die = kırmızı, das = yeşil, Plural ayrı renk + şekil |
| Türkçe köprüler | ‑(y)ı ↔ Akkusativ, ‑(y)e ↔ Dativ (alıcı), parka/parkta ↔ wohin/wo, Türkçe fiil sonda ↔ Nebensatz, siz/sen ↔ Sie/du |
| **İngilizce köprüler (yeni)** | Kelime kartında isteğe bağlı `en` alanı; ortak kökler (Haus/house, Wasser/water, trinken/drink), yapı benzerlikleri (habe gemacht ↔ have made, Komparativ -er ↔ -er/than=als), **sahte arkadaşlar** ayrı deste: *bekommen ≠ become, Gift = zehir, also = yani, wer = kim, will = istiyor, Handy = cep telefonu, Chef = patron, Rente = emeklilik, eventuell = belki, aktuell = güncel, sensibel = hassas, Mist ≠ mist* |
| Konuşma skoru | Anlaşılırlık ölçer, telaffuz değil; **asla kilit koşulu değil** |
| Cevap toleransı | ae/oe/ue/ss uyarıyla kabul; anlam değiştiren umlaut (schon/schön) yanlış; artikel/çekim farkı asla yazım hatası sayılmaz; `toLocaleLowerCase('tr')` yasak |
| Oyunlaştırma | Esnek seri (dondurma hakkı), haftalık gün hedefi, can-do rozetleri. Liderlik tablosu, can/kalp, suçlayıcı bildirim yok |
| Konuşma dili | Standart Hochdeutsch esas; A2'de pasif olarak gündelik konuşma (*nö, ne?, Tschüss, Moin, gell, 'n bisschen*) ve hızlı konuşmaya alışma |

### 3.3 Yazma düzeltme: servise bağlı olmayan "Yapay zekâya sor" butonu

API anahtarı, hesap, ücret yok. Akış:

1. Sistem yazma görevinde önce **yerel kontrolleri** yapar (büyük harfli isimler, fiil 2. pozisyon, weil/dass sonrası fiil sonda, içerik maddeleri, kelime sayısı) ve öz-kontrol listesini gösterir.
2. "Yapay zekâya kontrol ettir" butonu, görevi + seviyeyi + metni içeren hazır bir **istemi panoya kopyalar**:
   ```
   Ben Almanca öğrenen bir Türk'üm, seviyem A1 (Ünite 5).
   Görev: "Arkadaşına alışveriş listesi hakkında kısa bir mesaj yaz (3 madde)."
   Metnim:
   <<<kullanıcının metni>>>
   Lütfen: 1) Hataları satır satır göster ve Türkçe kısaca açıkla,
   2) Düzeltilmiş hâlini ver, 3) A1 seviyesinde daha doğal bir alternatif öner.
   Benim seviyemin üstündeki gramer yapılarını kullanma.
   ```
3. Yanında linkler: **ChatGPT**, **Claude**, **Gemini**. Kısa istemlerde URL'ye önceden doldurulur (`chatgpt.com/?q=…`, `claude.ai/new?q=…`); uzunsa sadece sekme açılır ve kullanıcı yapıştırır. Link listesi ayarlardan düzenlenebilir (yeni bir servis eklemek = bir satır).
4. Kullanıcı düzeltilmiş metni geri yapıştırabilir → sistem farkı gösterir ve isterse yeni cümleleri karta çevirir.

Aynı buton konuşma pratiği için de kullanılır: "Bu senaryoda (ör. *Arzttermin am Telefon*) benimle A1 seviyesinde rol yap" istemi.

## 4. Müfredat: Almanya'da yaşamak için

02'deki 28 ünitelik iskelet korunur; ağırlık **sınavdan gerçek hayata** kayar.

- **Ünite 0 — Laute & Buchstaben:** alfabe, Umlaut, ch [ç/x], r, z=[ts], ei/ie, eu/äu, sch/sp/st, uzun/kısa ünlü, vurgu, Auslautverhärtung. **Ek: harf harf kodlama** (*Wie schreibt man das? — B wie Berta…*): Almanya'da adını telefonda söylemek için ilk gün gerekli.
- **A1.1 (1–7):** Hallo! Ich bin … · Zahlen & Kontakte · Familie · Essen & Trinken · Einkaufen · Mein Tag · Freizeit
- **A1.2 (8–14):** Wohnen · In der Stadt · Arbeit · Termine · Gesundheit · Kleidung & Wetter · Unterwegs
- **A2.1 (15–21):** Erinnerungen · Urlaub · Nachbarn · Restaurant & Einladung · Arzt · Geschenke & Mode · Medien
- **A2.2 (22–28):** Bewerbung · Ämter · Feste · Beziehungen · Natur & Umwelt · Lernen & Zukunft · Leben in D‑A‑CH

### 4.1 "Almanya'da Hayat" senaryo hattı

Her ünitenin son dersi, o ünitenin diliyle yapılan bir **gerçek hayat görevi**dir. Görevlerin ilk kısmı A1'e çekilir:

| Senaryo | Ünite | Görev (sistemde) | Ekstra kelime/kalıp |
|---|---|---|---|
| Kendini tanıtma, adını harfleme | 0–1 | Telefonda adını ve doğum tarihini söyle (kayıt) | *Wie bitte? Können Sie das wiederholen? Langsamer, bitte.* |
| Supermarkt, Bäckerei, **Pfand** | 4–5 | Kasada konuşma (rol), fiyat dinleme | *Brauchen Sie eine Tüte? Mit Karte, bitte. Kassenbon* |
| **Anmeldung / Bürgeramt** | 8 (öne çekildi) | Anmeldeformular doldur (özgün replika form) | *Wohnungsgeberbestätigung, Meldebescheinigung, Termin* |
| Wohnungssuche, WG, Mietvertrag | 8 | İlan oku (Kaltmiete/Warmmiete/NK/Kaution), e-posta yaz | *WG-Zimmer, Besichtigung, Hausordnung, Mülltrennung* |
| ÖPNV / Deutsche Bahn | 9, 14 | Bilet makinesi ekranı, anons dinleme, gecikme | *Gleis, umsteigen, Verspätung, Deutschlandticket* |
| Bank, Handyvertrag | 10–11 | Konto açma diyaloğu, sözleşme kelimeleri | *Girokonto, IBAN, kündigen, Vertrag* |
| **Arzttermin + Krankenkasse** | 11–12 | Telefonla randevu al (rol), semptom anlat | *Versichertenkarte, Hausarzt, Überweisung, krankschreiben* |
| Apotheke, Notfall | 12, 19 | 112/110, eczanede ilaç iste | *Rezept, rezeptfrei, Notaufnahme* |
| Post, Paket, Nachbarn | 17 | Benachrichtigungskarte oku, komşudan paket iste | *Abholschein, Packstation, Ruhezeit* |
| İş arama, Jobcenter/Agentur für Arbeit | 22 | Kısa Lebenslauf, iş ilanı okuma | *Vollzeit/Teilzeit, Minijob, Probezeit* |
| **Resmi mektuplar** | 23 | Behörde mektubunda önemli bilgiyi bul (pasif okuma) | *Frist, Bescheid, Unterlagen, Rundfunkbeitrag* |
| Kültür kodları | 24–28 | Sonntagsruhe, Pünktlichkeit, du/Sie, Feiertage | *Feierabend, Brückentag* |

İçerikte kullanılan formlar, mektuplar, tabelalar **özgün replika** olarak üretilir (gerçek belgeler kopyalanmaz).

### 4.2 Ölçme

- Ana ölçü: ünite testleri + gerçek hayat görevleri + can-do listesi (*"Doktordan telefonla randevu alabiliyorum"*).
- Goethe Start Deutsch 1 / A2 formatındaki deneme sınavları **opsiyonel** kalır (objektif bir ölçü olarak ve ileride vize için A1, vatandaşlık için B1 sertifikası gerekirse diye).

## 5. Günlük oturum: değişken süre

Ana ekranda tek soru: **"Bugün ne kadar vaktin var?"** → `15 · 30 · 45 · 60+ dk`. (Varsayılan 30; 15 dk sadece "tekrar borcunu ödeme" günüdür, seriyi bozmaz.)

| Blok | 15 dk | 30 dk (temel) | 45 dk | 60+ dk |
|---|---|---|---|---|
| Tekrar (FSRS) | 12 | 10 | 12 | 15 |
| Yeni ders | — | 12 | 18 | 25 |
| Dinleme/okuma | — | 3 | 6 | 8 |
| Konuşma (shadowing/rol) | 3 | 3 | 5 | 7 |
| Yazma ("günün 3 cümlesi") | — | 2 | 4 | 5 |

- Yeni kart limiti seçilen süreye göre: 15 dk → 0, 30 dk → 8, 45 dk → 12, 60 dk → 15–18. Tekrar borcu birikince yeni kart otomatik azalır.
- Seri **haftalık gün hedefiyle** ölçülür (ör. haftada 5 gün), günlük zorunluluk yok.
- Hafta: Cumartesi Hata Defteri + ünite testi, Pazar hafif gün (dış kaynak). Her 4 ünitede bir tekrar haftası.

**Takvim projeksiyonu** (ortalama 35–40 dk/gün, haftada 5–6 gün varsayımıyla): **A1 ≈ 6–8 ay, A2 ≈ 14–16 ay.** Sistem gerçek tempona göre "tahmini varış" tarihini günceller.

Sistem dışı tamamlayıcılar ("Dış Görev" olarak önerilir, içerik kopyalanmaz): DW *Nicos Weg* (ünitelerle eşleştirilir), Easy German, *Deutsch – warum nicht?*, A2'de *Slow German*, DW *Langsam gesprochene Nachrichten*, tandem partner.

## 6. Mimari özeti

```
index.html              ← çift tıkla, açılır
css/                    base.css, components.css, exercises.css
js/
  app.js                ← DE ad alanı, başlangıç
  core/                 db.js, store.js, router.js, content.js, planner.js,
                        progression.js, weakness.js, audio.js, backup.js
  core/srs/             fsrs.js, cards.js, queue.js
  core/answer/          normalize.js, compare.js, diagnose.js
  exercises/            registry.js + her tip ayrı dosya (validate/render/check/feedback/toRating)
  views/                today.js, path.js, lesson.js, review.js, grammar.js, stats.js, settings.js
  ai/                   prompt.js ("Yapay zekâya sor" istem şablonları + link listesi)
  vendor/               (varsa) ts-fsrs UMD
content/
  index.js              ← ünite listesi
  lexicon/a1.js         ← DE.content.registerLexicon({...})
  a1/unit-00.js …       ← DE.content.registerUnit({...})
audio/                  w/ (kelime), s/ (cümle), manifest.js
tools/                  validate-content.mjs, gen-audio (Piper)
tests/                  node --test
```

İlkeler: içerik ↔ motor ayrımı; `check()` saf fonksiyon; olay günlükleri asıl kaynak, kart durumları yeniden hesaplanabilir; `index.html`'deki script sırası `tools/validate-content.mjs` tarafından kontrol edilir.

## 7. Yol haritası

### Faz 0 — İskelet (1–2 gün) ✅
- [x] `index.html` + klasik script iskeleti + hash router, `file://`'de açıldığını doğrula
- [x] Kalıcı durum (localStorage) + JSON yedek indir/yükle
- [x] İçerik şeması (JS sarmalı) + `tools/validate-content.mjs`

### Faz 1 — MVP (1–2 hafta): uçtan uca döngü ✅

Uygulandı. Ses şimdilik tarayıcı TTS ile (Piper MP3 üretimi Faz 2'ye kaldı). Plandan fazlası: 9 alıştırma tipi (match, cloze, listen, speak, write dahil), ünite testi, Hata Defteri, kelime/gramer ekranları.
- [x] Ünite 0 + Ünite 1–3 içeriği (TR + EN anlamlı; ses tarayıcı TTS)
- [x] 5 alıştırma tipi: flashcard, mcq, type-answer, article, word-order
- [x] Cevap kontrol motoru (normalize/compare/basit teşhis)
- [x] FSRS + 3 kart yönü (DE→TR, TR→DE, artikel) + kardeş gömme + günlük kuyruk
- [x] Ders oynatıcı (yanlış soru 3 adım sonra tekrar, kaldığı yerden devam)
- [x] "Bugün" ekranı: süre seçimi → tekrar → yeni ders
- [x] "Yapay zekâya sor" butonu (kopyala + ChatGPT/Claude/Gemini linkleri)
- [x] Temel testler

**MVP kabul kriteri:** `index.html`'e çift tıkla → bir ders bitir → kartlar oluşsun → ertesi gün tekrar gelsin → internet kapalıyken de çalışsın → yedekten geri yüklenebilsin.

### Faz 2 — v1: A1'in tamamı
- [ ] Piper (`de_DE-thorsten-high`, CC0) ile önceden üretilmiş MP3 sesler (`DE.audio.files` kancası hazır)
- [ ] Kalan alıştırma tipleri (cloze, conj_table, transform, dictation, listen_number, dialog/rol, shadowing, short_write, form)
- [ ] Tam teşhis + hata etiketleri + Hata Defteri + zayıf nokta tatbikatı
- [ ] Mastery gating, ünite testi, gerçek hayat görevleri (Anmeldung, Arzttermin…)
- [ ] Gramer referansı, kelime defteri (EN sahte arkadaş destesi dahil), ilerleme paneli
- [ ] Telaffuz laboratuvarı (kayıt + A/B, minimal çiftler), Chrome/Edge'de STT anlaşılırlık skoru
- [ ] File System Access ile otomatik ilerleme dosyası
- [ ] Ünite 4–14 içeriği

### Faz 3 — v2: A2
- [ ] Ünite 15–28 içeriği, resmi mektup okuma, iş/Behörde senaryoları
- [ ] Okuma kütüphanesi (tıklanabilir kelime, bilinen kelime %'si)
- [ ] Opsiyonel Goethe formatı deneme sınavları
- [ ] Kişisel FSRS parametre optimizasyonu (~1000 tekrardan sonra)
- [ ] (İstenirse) GitHub Pages ile telefondan erişim

## 8. Riskler

| Risk | Önlem |
|---|---|
| İçerik üretimi en büyük iş yükü (~1350 lemma, ~6000 alıştırma, ~6000 ses klibi) | Ünite ünite üretim, Claude ile kısıtlı istem + otomatik doğrulayıcılar; motor ilk günden içerikten bağımsız |
| LLM üretimi Almanca hataları | Kelime kapsama + seviye dedektörü + LanguageTool + ikinci model kontrolü + örneklem kontrol + uygulama içi "bu madde hatalı" butonu |
| Tarayıcı verisinin silinmesi ("geçmişi temizle") | Zorunlu periyodik JSON yedek; v1'de klasördeki dosyaya otomatik kayıt |
| Farklı tarayıcıda açınca ilerlemenin görünmemesi | Her tarayıcının deposu ayrıdır → tek tarayıcı (Chrome/Edge) kullan; geçişte yedek dosyasıyla taşı |
| Konuşma skorunun yanıltıcı olması | Arayüzde "anlaşılırlık" diye adlandırılır, kilit koşulu olmaz |
| Değişken süre → düzensizlik | 15 dk "minimum gün" seçeneği, haftalık hedef, tekrar borcu koruması |
| Kaynak doğrulama eksikliği | Analizde Goethe kelime sayıları, sınav puanlaması ve bazı FSRS verim rakamları web'den doğrulanamadı; içerik üretimine başlamadan Goethe Wortliste ile karşılaştırma yapılacak |
