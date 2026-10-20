# 05 — Alıştırma Tipleri, Değerlendirme/Ölçme ve İçerik Üretim Hattı

> Kapsam: Türkçe ana dilli, sıfırdan başlayan tek bir öğrenici; backend'siz, tarayıcıda çalışan statik HTML/JS sistem; hedef A1 → A2 (Goethe Start Deutsch 1 / Goethe-Zertifikat A2).
> Bu belge 6 paralel analiz kolundan biridir. Diğer kollarla (müfredat, SRS/tekrar, telaffuz/ses, UI/UX, teknik mimari) kesişen yerlerde **arayüz sözleşmesi** (JSON alanları, hata etiketleri, metrikler) önerilir; nihai kararı entegrasyon aşaması verir.

---

## İçindekiler

1. Tasarım ilkeleri
2. Alıştırma tipi kataloğu (32 tip)
3. Cevap kontrol motoru (backend'siz)
4. Geri bildirim tasarımı: hata taksonomisi, mesajlar, ipucu kademeleri, kısmi puan
5. Değerlendirme ve ölçme sistemi
6. İçerik üretim hattı ve lisans analizi
7. Kalite güvencesi (QA) kontrol listesi
8. Örnek ders — A1 · Ünite 1 · Ders 1 "Hallo! Ich bin …" (JSON'a dökülebilir)
9. Önerilen JSON şemaları (özet)
10. Açık sorular ve riskler

---

## 1. Tasarım ilkeleri

1. **Öğretmensiz çalışabilirlik:** Her alıştırma cevabı otomatik kontrol edilebilir olmalı. Otomatik kontrol edilemeyen (serbest yazma, konuşma) tipler için ya (a) kısıtlı cevap uzayı + çoklu kabul listesi, ya (b) öz-değerlendirme rubriği + model cevap karşılaştırması, ya da (c) opsiyonel olarak kullanıcının kendi API anahtarıyla LLM değerlendirmesi kullanılır.
2. **Alma → Üretme sıralaması (receptive → productive):** Bir kelime/yapı önce tanıma (seç, eşleştir), sonra kontrollü üretim (boşluk, sıralama), en son serbest üretim (çeviri, yazma, konuşma) ile çalışılır. Her ders bu merdiveni izler.
3. **Hatanın sınıflandırılması:** "Yanlış" demek yetmez. Her yanlış cevap bir **hata etiketi** alır (ART, KAS, KON, WST…). Etiketler hem anlık açıklayıcı geri bildirimi hem de uzun vadeli zayıflık analizini besler.
4. **Türkçe kaynaklı hatalara özel destek:** Türkçe konuşan için tipik tuzaklar: artikel/cinsiyet yokluğu, fiil-sonda alışkanlığı (SOV) → V2 hatası, "-i hâli" ile Akkusativ'in karıştırılması, ünlü uyumu refleksiyle yanlış çoğul, ü/ö sesleri (Türkçede var — avantaj!), "z" (ts) ve "w" (v) okuması, "ei/ie" karışıklığı, büyük harfle yazılan isimler, "sen/siz" ile "du/Sie" kısmen örtüşmesi. Geri bildirim mesajları bunları Türkçe karşılaştırmayla açıklar.
5. **Seviye disiplini:** A1 içeriğinde A2 gramer yok; metindeki kelimelerin ≥%95'i öğrenilmiş olmalı (bkz. §7).
6. **Kısa döngü:** Bir alıştırma maddesi 5–40 saniye; bir ders 15–25 dakika; ders sonu mini quiz 3–5 dakika.

---

## 2. Alıştırma tipi kataloğu

### 2.1 Özet tablo

Bilişsel yük: 1 (çok düşük) – 5 (çok yüksek). Seviye: ilk kullanılabileceği seviye. Kontrol: `exact` = normalize edilmiş tam eşleşme, `set` = kabul listesi, `fuzzy` = yazım toleranslı, `order` = sıra karşılaştırma, `self` = öz-değerlendirme, `asr` = tarayıcı konuşma tanıma, `rubric` = rubrik.

| # | Tip (id) | Beceri | Seviye | Yük | Kontrol |
|---|---|---|---|---|---|
| 1 | Çoktan seçmeli (`mcq`) | Okuma/Kelime/Gramer | A1.1 | 1 | exact |
| 2 | Eşleştirme (`match`) | Kelime | A1.1 | 1 | exact (çift) |
| 3 | Artikel seçme (`article`) | Gramer (genus) | A1.1 | 2 | exact |
| 4 | Çoğul yapma (`plural`) | Morfoloji | A1.1 | 3 | set + fuzzy |
| 5 | Fiil çekim tablosu (`conj_table`) | Morfoloji | A1.1 | 3 | exact (hücre) |
| 6 | Boşluk doldurma — banka ile (`cloze_bank`) | Gramer/Kelime | A1.1 | 2 | exact |
| 7 | Boşluk doldurma — serbest (`cloze_free`) | Gramer/Yazım | A1.1 | 3 | set + fuzzy |
| 8 | Kelime sıralama (`word_order`) | Sözdizimi (V2, Nebensatz) | A1.1 | 3 | order + set |
| 9 | Çeviri TR→DE (`tr_de`) | Üretim | A1.1 | 4 | set + fuzzy + token |
| 10 | Çeviri DE→TR (`de_tr`) | Anlama | A1.1 | 2 | set (anahtar kelime) / self |
| 11 | Dikte (`dictation`) | Dinleme + Yazım | A1.1 | 4 | fuzzy + diff |
| 12 | Dinle-seç (`listen_mcq`) | Dinleme | A1.1 | 2 | exact |
| 13 | Minimal pair (`minimal_pair`) | Ses ayırt etme | A1.1 | 2 | exact |
| 14 | Resim-kelime (`picture`) | Kelime | A1.1 | 1 | exact |
| 15 | Diyalog tamamlama / rol yapma (`dialog`) | Etkileşim | A1.1 | 3 | set / mcq |
| 16 | Hata bulma (`find_error`) | Gramer farkındalığı | A1.2 | 3 | exact (konum) + set |
| 17 | Dönüştürme (`transform`) | Gramer | A1.2 | 4 | set + fuzzy |
| 18 | Soru üretme (`make_question`) | Sözdizimi | A1.1 | 3 | set + order |
| 19 | Kısa yazma (`short_write`) | Yazma | A1.2 | 5 | rubric + checklist + (ops. LLM) |
| 20 | Sesli tekrar (`repeat`) | Telaffuz | A1.1 | 2 | asr + self |
| 21 | Shadowing (`shadowing`) | Akıcılık/Prozodi | A1.2 | 4 | self (+asr) |
| 22 | Okuma anlama (`reading`) | Okuma | A1.1 | 3 | exact (alt sorular) |
| 23 | Doğru/Yanlış (`true_false`) | Okuma/Dinleme | A1.1 | 1 | exact |
| 24 | Sayı/saat/tarih dinleme (`listen_number`) | Dinleme | A1.1 | 3 | exact (normalize) |
| 25 | Form doldurma (`form`) | Yazma (Goethe Schreiben 1) | A1.1 | 3 | set (alan bazlı) |
| 26 | Hecele / harf dikte (`spell`) | Alfabe | A1.1 | 2 | exact |
| 27 | Kategoriye ayırma (`sort`) | Kelime/Gramer | A1.1 | 2 | exact (kova) |
| 28 | Cümle eşleştirme — soru/cevap (`qa_match`) | Etkileşim | A1.1 | 2 | exact |
| 29 | Cümle tamamlama — iki parça (`half_sentence`) | Sözdizimi | A1.2 | 2 | exact |
| 30 | Bilgi boşluğu / tablo doldurma (`info_gap`) | Okuma/Dinleme | A1.2 | 3 | exact |
| 31 | Kelime kartı aktif hatırlama (`recall`) | Kelime (SRS) | A1.1 | 2 | fuzzy + self |
| 32 | Konuşma görevi — tetikleyici kartlar (`speak_prompt`) | Konuşma (Goethe Sprechen) | A1.1 | 4 | self rubric (+asr) |
| 33 | Yazım düzeltme — büyük/küçük harf (`capitalize`) | Yazım | A1.1 | 2 | exact |
| 34 | Hızlı dinleme — kaç kelime/ne duydun (`listen_count`) | Ses segmentasyonu | A1.1 | 2 | exact |

### 2.2 Tip detayları

Her tip için: **amaç · kontrol · geri bildirim örneği · Almanca örnek madde**. (Örnek maddeler gerektiğinde ileri seviyeyi gösterir.)

#### 1. Çoktan seçmeli (`mcq`)
- **Amaç:** Tanıma; yeni maddeyi düşük stresle tanıtma; gramer kuralının seçimi.
- **Kontrol:** Tek doğru seçenek indeksi. Çeldiriciler **hata etiketli** üretilir (her yanlış şık bir hatayı temsil eder → hangi şık seçildiyse o etiket kaydedilir).
- **Geri bildirim:** "✗ *bist* 'du' içindir. 'ich' ile *bin* kullanılır: Ich **bin** Anna."
- **Örnek:** `Ich ___ Anna.` → (a) bin ✓ (b) bist [KON] (c) ist [KON] (d) sind [KON]

#### 2. Eşleştirme (`match`)
- **Amaç:** Kelime–anlam, soru–cevap, selam–zaman eşleştirme.
- **Kontrol:** Çift listesi; kısmi puan = doğru çift / toplam çift.
- **Geri bildirim:** "3/4 doğru. *Guten Abend* akşam (≈18:00 sonrası) söylenir."
- **Örnek:** Guten Morgen ↔ Günaydın · Guten Abend ↔ İyi akşamlar · Tschüs ↔ Hoşça kal (samimi) · Auf Wiedersehen ↔ Hoşça kalın (resmi)

#### 3. Artikel seçme (`article`)
- **Amaç:** Genus'u isimle birlikte, renk koduyla kodlamak. **Renk sözleşmesi (tüm sistemde sabit):** der = mavi, die = kırmızı/pembe, das = yeşil, çoğul die = turuncu/gri (çoğulun kendi rengi olması önemli: "die" iki ayrı işlev).
- **Kontrol:** exact. Hata etiketi: ART.
- **Geri bildirim:** "✗ *das Frau* değil, **die Frau**. İpucu: kadın bildiren isimlerin çoğu *die*." (kural varsa kural; yoksa "bunu ezberlemek gerekir — kartına eklendi").
- **Örnek:** `___ Name` → der ✓ / die / das. Varyant: A2'de Akkusativ/Dativ ile birleşik: `Ich sehe ___ Mann.` → den.

#### 4. Çoğul yapma (`plural`)
- **Amaç:** Çoğul ekleri (-e, -¨e, -er, -¨er, -n/-en, -s, -∅, -¨).
- **Kontrol:** Kabul listesi (varyant çoğullar örn. *die Kommas/Kommata*); umlaut eksikse UML etiketi; ek yanlışsa PL.
- **Geri bildirim:** "Neredeyse! *Buchen* değil **Bücher**: -er çoğulu, kök ünlüsü umlaut alır (u→ü)."
- **Örnek:** `das Buch → die ___` → Bücher. Ünite seviyesinde tip: ilk etapta 2 şıktan seçim, sonra serbest yazım.

#### 5. Fiil çekim tablosu (`conj_table`)
- **Amaç:** Präsens çekimi (ich/du/er-sie-es/wir/ihr/sie-Sie); A1.2'de modal fiiller, A2'de Perfekt yardımcı fiili, Präteritum (war/hatte).
- **Kontrol:** Hücre bazında exact (normalize); kısmi puan hücre başına. Düzensiz kök değişimi (e→i, a→ä) hatası KON-STAMM alt etiketi.
- **Geri bildirim:** "du-hücresi: *fahrst* → **fährst**. *fahren* güçlü fiil: du/er formunda a→ä olur."
- **Örnek:** `heißen` → ich heiße · du heißt · er/sie/es heißt · wir heißen · ihr heißt · sie/Sie heißen (not: *heißst* değil — s-sesiyle biten kökte du-eki sadece -t).

#### 6. Boşluk doldurma, kelime bankalı (`cloze_bank`)
- **Amaç:** Bağlamda seçim; yazım yükü yok.
- **Kontrol:** Her boşluk için exact; banka fazladan 1–2 çeldirici içerir.
- **Örnek:** `Hallo, ich ___ Tom. Wie ___ du?` banka: [bin, heißt, bist, heiße] → bin, heißt.

#### 7. Boşluk doldurma, serbest (`cloze_free`)
- **Amaç:** Kontrollü üretim (çekim eki, artikel, edat).
- **Kontrol:** Kabul listesi + Levenshtein ≤1 ise "yazım uyarısı ile doğru" (puan 0.8), büyük/küçük harf farkı GK etiketi.
- **Örnek:** `Ich wohn__ in Berlin.` → e. `Ich fahre mit ___ Bus.` (A1.2) → dem.

#### 8. Kelime sıralama (`word_order`)
- **Amaç:** Almanca sözdiziminin temel taşları: **V2** (fiil ikinci pozisyonda), **inversiyon** (Heute **gehe** ich…), **Satzklammer** (modal/Perfekt: Ich **kann** heute nicht **kommen**), **Nebensatz fiil sonda** (…, weil ich müde **bin**).
- **Kontrol:** Kabul edilen sıralamaların listesi (Almancada birden fazla doğru sıra olabilir: *Ich gehe heute ins Kino* / *Heute gehe ich ins Kino*). Puan: tam eşleşme 1; değilse en yakın kabul cevabına göre **fiil pozisyonu doğruysa** 0.5, değilse 0. Fiil yanlış yerdeyse WST-V2 veya WST-VEND.
- **Geri bildirim:** "Fiil ikinci sırada olmalı. Türkçede fiil sonda gelir (Bugün sinemaya **gidiyorum**), Almancada ana cümlede **2. sırada**: Heute **gehe** ich ins Kino."
- **Örnek (A1):** [heiße / ich / Mehmet] → Ich heiße Mehmet. **(A2):** [weil / ich / habe / Hunger / keine Zeit] → kurgu: `Ich esse jetzt, weil ich Hunger habe.`

#### 9. Çeviri TR→DE (`tr_de`)
- **Amaç:** Serbest üretim, transfer hatalarının ortaya çıkması.
- **Kontrol:** (1) normalize, (2) kabul listesinde exact → 1.0, (3) en yakın kabul cevabına **token düzeyinde hizalama** (LCS) → farklı tokenlara hata etiketi; puan = 1 − ağırlıklı hata. (4) Hiçbir şey eşleşmezse "Cevabın listede yok — model cevapla karşılaştır: aynı anlamda mı?" → öz-değerlendirme ("Benimki de doğru" butonu; işaretlenen cevap yerel *kişisel kabul listesine* eklenir ve rapor edilir).
- **Örnek:** "Benim adım Ali." → *Ich heiße Ali.* / *Mein Name ist Ali.* / *Ich bin Ali.* (üçü de kabul).

#### 10. Çeviri DE→TR (`de_tr`)
- **Amaç:** Anlama kontrolü. Türkçe çeviriyi otomatik kontrol zordur (çok varyant) → tercihen **çoktan seçmeli çeviri** veya **anahtar kelime** kontrolü (cevap "ad" veya "isim" içeriyor mu?). Serbest çeviride öz-değerlendirme.
- **Örnek:** "Wie heißen Sie?" → (a) Adınız ne? ✓ (b) Nasılsınız? (c) Nerelisiniz?

#### 11. Dikte (`dictation`)
- **Amaç:** Ses–yazı eşlemesi (ei/ie, ch, sch, z, w, v, ß, umlaut), kısa süreli bellek.
- **Kontrol:** Kelime düzeyinde diff; her kelime için doğru/yazım hatası/eksik/fazla. Puan = doğru kelime oranı; noktalama yok sayılır, büyük harf hataları ayrı sayılır (yarım ceza).
- **Geri bildirim:** Renkli diff: ~~Wi~~ **Wie** heißt du? · "ie uzun i okunur; *Wi* yazımı yoktur."
- **Örnek:** 🔊 "Wie heißt du?" (normal hız + 0.75× yavaş tekrar butonu; en fazla 3 dinleme, her ekstra dinleme −0.1).

#### 12. Dinle-seç (`listen_mcq`)
- **Amaç:** Duyduğunu tanıma; metin gösterilmeden.
- **Örnek:** 🔊 "Guten Abend!" → hangi resim? 🌅 sabah / ☀️ öğle / 🌙 akşam ✓

#### 13. Minimal pair (`minimal_pair`)
- **Amaç:** Türkçede olmayan veya karışan ses zıtlıkları: uzun/kısa ünlü, *ie/ei*, *ch/sch*, *z/s*, *w/f*, umlaut. A1 için önerilen gerçek çiftler: *Mitte – Miete*, *Stadt – Staat*, *Hölle – Höhle*, *Bett – Bad*, *Kirche – Kirsche* (ch/sch), *zahlen – Saal* (z/s), *wir – vier* (w/f), *Ofen – offen*, *schon – schön*, *Tür – Tier*.
- **Kontrol:** exact (hangi kelimeyi duydun?). Etiket: AUS.
- **Örnek:** 🔊 "schön" → [schon] [schön ✓]

#### 14. Resim-kelime (`picture`)
- **Amaç:** Çeviriden bağımsız anlam bağlama. Görseller: emoji (Noto Emoji, Apache-2.0) veya OpenMoji (CC BY-SA 4.0) SVG; artikel renkli çerçeve.
- **Örnek:** 🍎 → der Apfel / die Banane / das Brot → **der Apfel**.

#### 15. Diyalog tamamlama / rol yapma (`dialog`)
- **Amaç:** Etkileşimsel kalıplar (chunk). Kullanıcı bir rolü üstlenir; sıra kendisine gelince (a) seçenekten seçer, (b) yazar, (c) söyler (ASR). Bağlama uygunluk (du/Sie, register) kontrolü ANR etiketi.
- **Örnek:** Frau Weber: "Guten Tag! Wie heißen Sie?" → Sen: ___ → kabul: "Guten Tag! Ich heiße …" / "Mein Name ist …". "Hallo! Wie heißt du?" seçilirse: "Resmi bir durumdasın — *Sie* kullanılmalı."

#### 16. Hata bulma (`find_error`)
- **Amaç:** Kural farkındalığı (noticing). İki aşama: (1) hatalı kelimeye dokun, (2) düzeltmesini yaz/seç.
- **Kontrol:** Konum exact (0.5) + düzeltme set (0.5).
- **Örnek:** "Ich **bist** Maria." → bin. A2: "Gestern ich **habe** Fußball gespielt." → Gestern **habe ich** Fußball gespielt (WST-V2).

#### 17. Dönüştürme (`transform`)
- **Amaç:** Yapı manipülasyonu: tekil→çoğul, Präsens→Perfekt, Nominativ→Akkusativ, Akkusativ→Dativ (edat değişimi), olumlu→olumsuz (nicht/kein), du→Sie, düz cümle→soru, iki ana cümle→weil-Nebensatz.
- **Kontrol:** set + fuzzy + token hizalama.
- **Örnek:** "Ich spiele Fußball." (Perfekt) → *Ich habe Fußball gespielt.* · "Das ist **ein** Hund." (Ich habe …) → *Ich habe **einen** Hund.* · "Ich gehe in **den** Park." (Wo bin ich?) → *Ich bin in **dem/im** Park.*

#### 18. Soru üretme (`make_question`)
- **Amaç:** W-Fragen (fiil 2.) ve Ja/Nein-Fragen (fiil 1.). Verilen cevaba uygun soru.
- **Örnek:** Cevap: "Ich heiße Lena." → Soru: *Wie heißt du?* / *Wie heißen Sie?* (ikisi kabul).

#### 19. Kısa yazma (`short_write`)
- **Amaç:** Goethe Schreiben Teil 2 tipi: 30 kelimelik mesaj (A1), 20–30 kelime e-posta/SMS (A2 Teil 1), ~40 kelime (A2 Teil 2). 3 içerik noktası verilir.
- **Kontrol (backend'siz):** (1) **Otomatik kontrol listesi**: kelime sayısı, selamlama/kapanış var mı, her içerik noktası için anahtar kelime/kalıp regex'i (örn. "Zeit" sorusu → saat ifadesi var mı), istenmeyen yapılar; (2) yazım denetimi: yerel sözlük (ders kelimeleri + Hunspell de_DE sözlüğü, LGPL/GPL — veri dosyası olarak yüklenebilir) ile bilinmeyen kelimeleri işaretleme; (3) **öz-değerlendirme rubriği** + model cevap; (4) **opsiyonel:** kullanıcı kendi Anthropic API anahtarını girerse tarayıcıdan doğrudan Claude'a gönderip rubrik bazlı JSON değerlendirme (Anthropic API tarayıcı çağrısı için `anthropic-dangerous-direct-browser-access: true` başlığı gerekir; anahtar sadece localStorage'da tutulur; kişisel kullanım için kabul edilebilir risk).
- **Rubrik (Goethe'ye yakın, her biri 0–3):** Görev yerine getirme (3 içerik noktası) · İletişimsel uygunluk (selam/kapanış/register) · Dil doğruluğu.
- **Örnek görev:** "Arkadaşın Jonas'a yaz: Cumartesi doğum günü partin var. Saat? Nerede? Ne getirsin?"

#### 20. Sesli tekrar (`repeat`)
- **Amaç:** Telaffuz, ses-yazı bağlantısı.
- **Kontrol:** (a) Web Speech API `SpeechRecognition` (`lang='de-DE'`) — **Chrome/Edge'de çalışır, sesi sunucuya (Google/Microsoft) gönderir, Firefox'ta yok, çevrimdışı değil**; transkript hedefle karşılaştırılır (kelime eşleşme oranı). (b) Her durumda **kaydet → dinle → model ile karşılaştır → öz puan (😕/🙂/😃)** akışı MediaRecorder ile. ASR sonucu "kesin yargı" değil, ipucu olarak sunulur ("tanıyıcı *Mich* anladı — *ich*'teki 'ch' sesini daha yumuşak dene").
- **Örnek:** 🔊 "Ich heiße Mehmet." → 🎙️

#### 21. Shadowing (`shadowing`)
- **Amaç:** Ritim/vurgu/akıcılık. Ses çalarken kullanıcı eşzamanlı (0.5 sn gecikmeli) tekrar eder. Kademeler: metinli+yavaş → metinli+normal → metinsiz+normal.
- **Kontrol:** Öz-değerlendirme; opsiyonel kayıt üst üste dinleme (model ve kullanıcı kaydını art arda çalma).
- **Örnek:** Diyalog 1'in tamamı, cümle cümle.

#### 22. Okuma anlama (`reading`)
- **Amaç:** Goethe Lesen formatları: kısa notlar, ilanlar, tabelalar, e-postalar.
- **Kontrol:** Alt sorular (R/F, mcq, a/b ilan seçimi).
- **Örnek:** Tabela: "Praxis Dr. Ott — Mo–Fr 8–12 Uhr" → "Arzt muayenehanesi çarşamba 14:00'te açık." Richtig/Falsch → Falsch.

#### 23. Doğru/Yanlış (`true_false`)
- **Amaç:** Hızlı anlama kontrolü (okuma veya dinleme). Tahmin şansı %50 olduğundan tek başına mastery ölçütü olarak kullanılmaz; ağırlığı 0.5.
- **Örnek:** Diyalogdan: "Die Frau heißt Anna." → Richtig.

#### 24. Sayı/saat/tarih dinleme (`listen_number`)
- **Amaç:** Goethe Hören'in çok sık test ettiği alan: telefon numarası, fiyat, saat (resmi 14:30 / gündelik *halb drei*), tarih (*am dritten Mai*), oda/hat/peron numarası. Türk öğrenci için tuzak: *einundzwanzig* (birler önce), *halb drei* = 2:30.
- **Kontrol:** Rakamla girilir, normalize edilir (`2:30` = `14:30` bağlama göre; `3,50 €` = `3.50`).
- **Örnek:** 🔊 "Der Zug fährt um halb drei." → `2:30` / `14:30` kabul.

#### 25. Form doldurma (`form`)
- **Amaç:** Goethe A1 Schreiben Teil 1: bir metinden bilgi alıp formu (Name, Vorname, Geburtsdatum, Adresse, Anzahl Personen…) doldurma.
- **Kontrol:** Alan bazlı set (tarih formatları normalize).
- **Örnek:** Metin: "Mehmet Yılmaz kommt aus der Türkei und wohnt in Köln…" → Form: Herkunftsland: *Türkei*.

#### 26. Hecele / harf dikte (`spell`)
- **Amaç:** Alfabe (A1 Ders 2): isim heceleme (*Wie schreibt man das?*). Ses: harf harf okunan isim → yaz.
- **Örnek:** 🔊 "M – E – H – M – E – T" → Mehmet.

#### 27. Kategoriye ayırma (`sort`)
- **Amaç:** der/die/das kovaları, ayrılabilen/ayrılamayan fiiller, haben/sein ile Perfekt, Akkusativ/Dativ edatları.
- **Örnek:** [Name, Frau, Herr, Kind] → der: Name, Herr · die: Frau · das: Kind.

#### 28. Soru–cevap eşleştirme (`qa_match`)
- **Örnek:** "Wie heißt du?" ↔ "Ich heiße Ben." · "Wer ist das?" ↔ "Das ist Frau Weber."

#### 29. Cümle yarısı tamamlama (`half_sentence`)
- **Örnek:** "Ich lerne Deutsch, …" → "… weil ich in Berlin arbeite." ✓ / "… weil ich arbeite in Berlin." ✗ (WST-VEND).

#### 30. Bilgi boşluğu / tablo doldurma (`info_gap`)
- **Amaç:** Dinle/oku ve tabloyu doldur (kim, nereden, ne iş yapıyor).
- **Örnek:** Tablo: Name | Land | Wohnort — ses dinlenir, hücreler seçilir.

#### 31. Aktif hatırlama kartı (`recall`)
- **Amaç:** SRS'nin üretim yönü (TR → DE, artikel dahil). Pasif yön (DE → TR) ayrıca.
- **Kontrol:** Yazılırsa fuzzy; "biliyorum/bilmiyorum" modunda self (Again/Hard/Good/Easy) — SRS kolu ile arayüz.
- **Örnek:** "isim, ad" → *der Name*. Artikel yanlış, kelime doğruysa: 0.5 puan + ART.

#### 32. Konuşma görevi — tetikleyici kartlar (`speak_prompt`)
- **Amaç:** Goethe Sprechen formatı: (A1 Teil 1) kendini tanıtma kartı: *Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby?*; (Teil 2) konu kartı ile soru sorma–cevaplama (*Thema: Essen — Frühstück?*); (Teil 3) resim kartı ile rica (*Fenster öffnen → Können Sie bitte das Fenster öffnen?*).
- **Kontrol:** Kayıt + model cevap + rubrik öz-değerlendirme; ASR ile anahtar kelime kontrolü (cevap *heiße/Name* içeriyor mu?).

#### 33. Büyük/küçük harf düzeltme (`capitalize`)
- **Amaç:** Almancada tüm isimler büyük harfle; *Sie* (resmi) büyük, *sie* küçük.
- **Örnek:** "ich heiße anna. wie heißen sie, frau weber?" → "Ich heiße Anna. Wie heißen Sie, Frau Weber?"

#### 34. Kaç kelime duydun (`listen_count`)
- **Amaç:** Sıfırdan başlayan biri için akan konuşmayı kelimelere ayırma (segmentasyon). Çok erken derslerde.
- **Örnek:** 🔊 "Wie heißt du?" → 3.

### 2.3 Derste tip sıralaması (şablon)

```
1. Giriş: dinle + resim-kelime/eşleştirme (tanıma)        [yük 1]
2. Kelime: artikel seçme, recall (pasif)                  [yük 1-2]
3. Diyalog: dinle-seç, doğru/yanlış                       [yük 1-2]
4. Gramer açıklaması → mcq, cloze_bank, conj_table        [yük 2-3]
5. Kontrollü üretim: cloze_free, word_order, make_question [yük 3]
6. Ses: minimal_pair, repeat, dikte                       [yük 2-4]
7. Serbest üretim: tr_de, dialog (yazılı/sözlü)           [yük 4]
8. Mini quiz (karışık, ipuçsuz)                           [yük 2-3]
```

Uyarlamalı kural: art arda 3 hata → bir alt yük seviyesine dön (örn. `cloze_free` yerine `cloze_bank`); art arda 5 doğru ve ort. cevap süresi < 8 sn → bir üst tipe atla.

---

## 3. Cevap kontrol motoru (backend'siz)

### 3.1 Normalizasyon boru hattı
1. `trim`, çoklu boşluk → tek boşluk, Unicode NFC.
2. Tipografik işaretler: `’ ‘ ´` → `'`; `„ “ ”` → `"`.
3. Cümle sonu noktalama (`. ! ?`) varsayılan olarak **yok sayılır** (gramer odaklı tiplerde); virgül Nebensatz alıştırmalarında **opsiyonel uyarı** (A1–A2'de puan kırmaz).
4. **Büyük/küçük harf:** karşılaştırma iki kez yapılır — case-insensitive eşleşirse ama case-sensitive eşleşmezse → doğru sayılır, **GK uyarısı** ve 0.9 puan (isimlerin büyük yazılması öğretilecek bir hedef olduğu için tamamen yok sayılmaz).
5. **Umlaut alternatifleri:** `ae/oe/ue` → `ä/ö/ü` ve `ss` ↔ `ß` eşdeğer kabul edilir ama **UML/SZ uyarısı** gösterilir (klavyede umlaut yoksa ceza yok; ekranda ä ö ü ß Ä Ö Ü sanal tuşları her giriş alanının altında bulunur). Uyarı ayarı: "Umlaut toleransı: kapalı / uyar / tam kabul".
6. Türkçe klavye tuzakları: `ı`→`i`, `İ`→`I`, `ş`→`sch`? (hayır, otomatik dönüştürme yok — sadece `ı/İ` normalize edilir ve uyarı verilir).

### 3.2 Eşleşme stratejisi (sırayla)
1. Kabul listesinde normalize exact → 1.0
2. Kabul listesindeki bir cevapla Damerau-Levenshtein mesafesi ≤ 1 (kelime uzunluğu ≥ 4 ise) → "yazım hatası" RS, 0.8 (ancak hata **anlamlı morfem** ise — örn. *bin*↔*bis*… veya çekim eki *-e/-t* — yazım değil gramer hatası sayılır: aşağıdaki sözlük kontrolü)
3. **Token hizalama** (cevap ve en yakın kabul cevabı kelimelere bölünür, LCS/Needleman-Wunsch ile hizalanır). Her uyuşmazlık için hata sınıflandırıcı çalışır (§4.2).
4. Sıralama tiplerinde: token kümesi aynı, sıra farklı → WST; fiil pozisyonu kontrolü ayrıca.
5. Hiçbiri → yanlış; en yakın model cevap ve fark gösterilir; "Bence doğru" itirazı (öz-kabul) → kişisel kabul listesi + içerik hata raporu kuyruğu (`localStorage` → dışa aktarılabilir JSON, geliştirme döngüsünde içerik düzeltmesine girdi).

### 3.3 Konuşma kontrolü
- `SpeechRecognition` mevcutsa `maxAlternatives = 5`, `interimResults=false`; tüm alternatifler hedefle normalize karşılaştırılır; en iyi kelime eşleşme oranı:
  - ≥ 0.9 → "😃 Anlaşıldı"
  - 0.6–0.9 → "🙂 Büyük oranda anlaşıldı; şu kelimeler farklı duyuldu: …"
  - < 0.6 → "😕 Tekrar dene; modeli yavaş dinle"
- ASR yoksa: kayıt + öz-değerlendirme. Konuşma skoru (bkz. §5.6) bu iki kaynağın birleşimidir; ASR'nin akraba sesleri karıştırabildiği (Türk aksanı) not edilir, bu nedenle konuşma skoru **asla kilit (gate) koşulu değildir**, sadece metrik.

---

## 4. Geri bildirim tasarımı

### 4.1 Hata etiketleme taksonomisi

İki seviyeli: `ANA-ALT`. Her hata kaydı: `{itemId, type, tag, expected, given, ts, lessonId, grammarTopicId?, lemma?}`.

| Kod | Ad | Alt etiketler | Örnek (yanlış → doğru) |
|---|---|---|---|
| ART | Artikel / Genus | ART-GEN (yanlış cinsiyet), ART-DEF/INDEF (belirli↔belirsiz), ART-MISS (eksik) | *das Frau* → die Frau |
| KAS | Kasus | KAS-AKK, KAS-DAT, KAS-NOM, KAS-PREP (edatın istediği hâl) | *Ich sehe der Mann* → den Mann |
| KON | Konjugation | KON-PERS (kişi eki), KON-STAMM (kök değişimi), KON-SEIN/HABEN (düzensiz), KON-MOD (modal), KON-TRENN (ayrılabilen ön ek) | *du heißst* → du heißt |
| WST | Wortstellung | WST-V2, WST-VEND (Nebensatz fiil sonda), WST-INV (inversiyon), WST-KLAM (Satzklammer: modal/Perfekt ikinci fiil sonda), WST-FRAGE, WST-NICHT (nicht konumu) | *Heute ich gehe* → Heute gehe ich |
| TMP | Tempus | TMP-AUX (haben/sein), TMP-PART (Partizip II formu), TMP-PRÄT | *Ich habe gegangen* → bin gegangen |
| PL | Plural | PL-SUF, PL-UML | *die Buchen* → Bücher |
| NEG | Negation | NEG-KEIN/NICHT | *Ich habe nicht Auto* → kein Auto |
| PREP | Präposition | PREP-WAHL | *Ich komme von Türkei* → aus der Türkei |
| PRON | Pronomen | PRON-PERS, PRON-POSS, PRON-REFL | *mein Name ist* vs *meine Name* |
| ADJ | Adjektivendung (A2) | — | *ein gute Freund* → ein guter Freund |
| ANR | Register (du/Sie) | — | Resmi bağlamda *Wie heißt du?* |
| WS | Wortschatz | WS-FALSCH (yanlış kelime), WS-FALSE-FRIEND | *bekommen* ≠ olmak |
| RS | Rechtschreibung | RS-TIPP (1 karakter), RS-EI-IE, RS-SCH, RS-DOPPEL (çift ünsüz) | *Wi* → Wie |
| GK | Groß-/Kleinschreibung | GK-NOMEN, GK-SIE | *der name* → der Name |
| UML | Umlaut | UML-MISS, UML-EXTRA | *schon* yerine *schön* |
| SZ | ß / ss | — | *heisse* → heiße |
| LÜCKE | Eksik/fazla öğe | MISS, EXTRA | *Ich Anna* → Ich bin Anna |
| AUS | Aussprache (ses tipleri) | AUS-LANG/KURZ, AUS-CH, AUS-Z, AUS-W, AUS-UML | minimal pair hataları |
| HÖR | Dinleme ayrıştırma | HÖR-ZAHL, HÖR-UHR | *halb drei* → 3:30 sanıldı |
| TR | Türkçe interferansı (meta-etiket, ek olarak) | TR-SOV, TR-KASUS(-i hâli), TR-KOPULA (sein'ı atlama: "Ben Ali" → *Ich Ali*) | |

> **TR meta-etiketi**, sınıflandırıcı bir hatayı tipik bir Türkçe transfer kalıbına bağladığında eklenir; geri bildirimde Türkçe karşılaştırma açıklaması gösterilir.

### 4.2 Otomatik hata sınıflandırma kuralları (token hizalamadan sonra)

Her uyuşmayan (beklenen `e`, verilen `g`) çift için sırayla:
1. `lower(e) == lower(g)` → GK.
2. Umlaut kaldırılmış hâlleri eşit → UML. `ß↔ss` eşit → SZ.
3. İkisi de artikel paradigmasında (`der die das den dem des ein eine einen einem einer eines kein…`):
   - aynı hâl, farklı cins → ART-GEN; aynı cins, farklı hâl → KAS-*; belirli↔belirsiz → ART-DEF.
   - (Hangi hâl/cins olduğu, maddenin `expectedAnalysis` alanından gelir: içerik üretiminde her hedef cümle için tokenların morfolojik analizi saklanır.)
4. Aynı lemma, farklı çekim (ders sözlüğündeki fiil paradigma tablosundan) → KON-PERS veya KON-STAMM.
5. Aynı lemma, farklı sayı → PL.
6. Token kümesi aynı ama sıra farklı → WST; çekimli fiilin indeksi hedefte 2 ve cevapta ≠ 2 → WST-V2; Nebensatz'ta son değil → WST-VEND.
7. Eksik token `sein` formu ise → LÜCKE-MISS + TR-KOPULA.
8. Levenshtein ≤ 2 ve aynı lemma değil → RS.
9. Diğer → WS.

### 4.3 Geri bildirim mesaj şablonları

Mesaj yapısı (3 katman, kullanıcı genişletebilir):
1. **Sonuç satırı** (her zaman): ✓ / ≈ (kısmen) / ✗ + doğru cevap, farklar vurgulu.
2. **Kural (1 cümle, Türkçe):** etikete özel şablon.
3. **Daha fazla (açılır):** ilgili gramer kartına bağlantı, 2 benzer örnek, "bunu tekrar listeme ekle".

Şablon örnekleri (değişkenler `{}` içinde):

| Etiket | Şablon | Doldurulmuş örnek |
|---|---|---|
| ART-GEN | "*{noun}* kelimesi **{gender}** (→ **{art} {noun}**). Artikel'i kelimeyle birlikte ezberle." | "*Frau* kelimesi **dişil** (→ **die Frau**)." |
| KAS-AKK | "*{verb}* fiili Akkusativ ister. Akkusativ'de sadece **maskulin** değişir: der → **den**, ein → **einen**." | "Ich sehe **den** Mann." |
| KAS-DAT | "*{prep}* edatından sonra Dativ gelir: der→dem, die→der, das→dem, çoğul→den (+n)." | "mit **dem** Bus" |
| KON-PERS | "*{pron}* ile *{verb}* → **{form}**. ({pron}-eki: -{suffix})" | "du ile heißen → **heißt**." |
| KON-SEIN | "*sein* düzensiz: ich **bin**, du **bist**, er/sie **ist**, wir **sind**, ihr **seid**, sie/Sie **sind**." | |
| WST-V2 | "Ana cümlede çekimli fiil **2. sırada**. Cümle '{first}' ile başlıyorsa özne fiilden **sonra** gelir." | "Heute **gehe ich**…" |
| WST-VEND | "*{conj}* yan cümle başlatır → çekimli fiil **en sona** gider (Türkçedeki gibi!)." | "…, weil ich müde **bin**." |
| TR-KOPULA | "Türkçede 'Ben Ali'**yim**' ekle olur; Almancada ayrı bir fiil gerekir: Ich **bin** Ali." | |
| GK-NOMEN | "Almancada **tüm isimler büyük harfle** başlar: *{word}*." | "**N**ame" |
| GK-SIE | "Resmi 'siz' = **Sie** (büyük S). Küçük *sie* = 'o (kadın)' veya 'onlar'." | |
| ANR | "Bu kişiyle **resmi** konuşuyorsun (Frau/Herr + soyadı) → *Sie* kullan." | |
| UML | "*{word}* umlaut'lu yazılır: **{correct}**. ({a}/{b} anlam farkı olabilir: schon=zaten, schön=güzel)" | |
| HÖR-UHR | "*halb drei* = '**üçe** yarım var' → 2:30. Almanca bir sonraki saate göre söyler." | |

Ton kuralları: suçlayıcı değil, kısa; ilk 3 derste her doğruda kısa övgü, sonra sadece seri/rekor anlarında; aynı hata 3. kez → "Bu hatayı sık yapıyorsun — 2 dakikalık mini tekrar ister misin?" (hedefli mikro-alıştırma üretimi: aynı etiketli 5 madde havuzdan).

### 4.4 İpucu kademeleri ve puan etkisi

| Kademe | İçerik | Örnek ("Wie ___ du?") | Puan çarpanı |
|---|---|---|---|
| 0 | İpucusuz | — | 1.0 |
| 1 | **Meta ipucu** — neye dikkat? | "Boşluğa bir fiil gelecek; özne *du*." | 0.8 |
| 2 | **Kural ipucu** | "*heißen* fiili, *du* ile -t eki alır." | 0.6 |
| 3 | **Kısmi açma** | "h _ _ _ _" (ilk harf + uzunluk) / sıralamada fiili yerleştirme | 0.4 |
| 4 | **Cevabı göster** + açıklama; madde ders sonunda tekrar sorulur | "heißt" | 0.0 (ama tekrar sorulduğunda doğru ise 0.5 telafi) |

- Yanlış cevaptan sonra otomatik olarak bir sonraki ipucu kademesi açılır ("Tekrar dene" hakkı: tip başına 1–2).
- Sınav/test modunda ipucu kapalı.

### 4.5 Kısmi puan kuralları (özet)

| Tip | Kural |
|---|---|
| match / sort / conj_table / cloze (çok boşluk) | doğru birim / toplam birim |
| word_order | 1 tam doğru · 0.5 fiil pozisyonu doğru ama diğerleri farklı · 0.25 ilk bileşen doğru · 0 |
| tr_de / transform | 1 − Σ(hata ağırlığı); ağırlıklar: RS/GK/UML/SZ = 0.1, ART/KAS/KON/PL = 0.25, WST = 0.3, WS/LÜCKE = 0.35; alt sınır 0 |
| dictation | doğru kelime oranı; GK yarım ceza |
| recall | kelime doğru + artikel doğru 1; kelime doğru artikel yanlış 0.5 |
| find_error | konum 0.5 + düzeltme 0.5 |
| true_false | 0.5 ağırlıklı (tahmin düzeltmesi) |

Bir maddenin **doğru sayılması** (mastery hesabı için) eşiği: puan ≥ 0.8.

---

## 5. Değerlendirme ve ölçme

### 5.1 Giriş / tanılama (placement)
Kullanıcı sıfırdan başladığı için **seviye belirleme değil tanılama** yapılır (3–5 dk):
1. **Kısa anket:** Daha önce Almanca/İngilizce gördün mü? (İngilizce bilgisi → kognat ve Latin alfabe ses farkındalığı avantajı; içerikte İngilizce karşılaştırma notlarını açıp kapatma tercihi.) Günlük hedef süre (10/20/30 dk). Hedef (Goethe A1 sınavı mı, gündelik mi, Almanya'ya taşınma mı?) → mock sınav vurgusu ayarlanır.
2. **Ses kontrolü:** mikrofon/hoparlör testi, ASR destekleniyor mu (tarayıcı tespiti).
3. **Opsiyonel 10 soruluk "sıfır mı?" testi:** sayılar 1–10, selamlaşma, *ich bin*. ≥ 8/10 ise Ünite 1'i **hızlı geçiş** (ünite testi ile atlama) teklif edilir.
4. **Ünite atlama testi (her zaman):** Her ünitenin başında "Bu üniteyi biliyorum → teste gir" — ünite testinden ≥ %90 alınırsa ünite tamamlanmış sayılır, kelimeler SRS'ye "bilinen" (uzun aralıklı) eklenir.

### 5.2 Ders içi ve ders sonu mini quiz
- **Ders içi:** her madde anlık geri bildirimli, ipucu açık. Ders puanı = ortalama madde puanı.
- **Ders sonu mini quiz:** 6–8 madde, karışık tip, ipuçsuz, o dersin hedeflerinden **+ önceki 2 dersten 2 madde (interleaving)**. Eşik yok (kilitlemez); < %70 ise "Bu dersi yarın tekrar önerilen listeye koydum" + zayıf etiketli maddeler SRS'ye öncelikli.

### 5.3 Ünite testi (mastery kapısı)
- 20–30 madde, ünitedeki tüm gramer hedefleri × en az 3 madde, 4 beceri (dinleme, okuma, yazma kontrollü üretim, konuşma — konuşma puanı gate'e girmez).
- **Mastery eşiği: %80** genel ve **her gramer hedefinde ≥ %70** (bir konuda çöküş başka konuda yüksek puanla telafi edilmesin).
- Geçemezse: zayıf hedeflere göre otomatik "onarım dersi" (o etiketli maddeler + açıklama kartları) → 24 saat sonra **paralel form** (aynı spesifikasyonla farklı maddeler; madde havuzu ünite başına ≥ 2× test boyutu olmalı).
- Sonraki ünite yine de açılabilir (öğrenici özerkliği), ama ilerleme haritasında "kırmızı bayrak" kalır ve seviye sonu sınavı öncesi kapatılması istenir.

### 5.4 Seviye sonu mock sınavlar

> Not: Aşağıdaki yapı Goethe-Institut'un yayımladığı sınav formatını izler (Start Deutsch 1 yazılı bölüm ≈65 dk: Hören ≈20, Lesen 25, Schreiben 20; Sprechen grup sınavı ≈15 dk). Resmi puan dönüşüm katsayıları bu oturumda Goethe sunucusuna erişilemediği için doğrulanamadı; uygulamada **kendi normalize puanımızı (toplam 100, geçme 60)** kullanıyoruz ve resmi *Durchführungsbestimmungen / Prüfungsordnung* belgesiyle karşılaştırılıp ince ayar yapılmalı (açık görev, §10).

#### A1 — "Start Deutsch 1" formatında mock

| Bölüm | Teil | Format | Madde | Süre | Puan (bizim normalizasyon) |
|---|---|---|---|---|---|
| **Hören** | 1 | Kısa günlük diyaloglar, 3 seçenekli (resim/metin), 2 kez dinlenir | 6 | ≈20 dk toplam | |
| | 2 | Anonslar (istasyon, mağaza), Richtig/Falsch, 1 kez | 4 | | |
| | 3 | Telesekreter mesajları, 3 seçenekli, 2 kez | 5 | | **25** |
| **Lesen** | 1 | İki kısa mektup/not, R/F | 5 | 25 dk | |
| | 2 | İnternet/ilan seçme (a/b), durum açıklamasına göre | 5 | | |
| | 3 | Tabelalar/duyurular, R/F | 5 | | **25** |
| **Schreiben** | 1 | Form doldurma (metinden 5 bilgi) | 5 | 20 dk | 5 |
| | 2 | Kısa mesaj/mektup (≈30 kelime, 3 içerik noktası) | 1 | | 10 (rubrik) |
| **Sprechen** | 1 | Kendini tanıtma (Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby) + heceleme + sayı | — | ≈15 dk | 10 |
| | 2 | Konu kartları ile bilgi sorma/verme (2 tur) | — | | 12.5 |
| | 3 | Resim kartları ile rica etme ve cevap (2 tur) | — | | 12.5 |
| **Toplam** | | | | | **100 · geçme 60** |

- Sprechen'de grup yok → uygulamada "sanal partner" (önceden kaydedilmiş TTS sorular) + kullanıcı kaydı + rubrik öz-değerlendirme; ASR anahtar kelime kontrolü yardımcı.
- Not tabanı (Goethe'nin kullandığı Prädikat skalası ile uyumlu): 90–100 sehr gut · 80–89 gut · 70–79 befriedigend · 60–69 ausreichend · <60 nicht bestanden.
- Zamanlayıcı **zorunlu** (gerçek koşul); dinleme tekrar sayısı kilitli.
- En az **2 paralel mock** (A ve B formu) — biri seviye sonu, biri sınav öncesi.

#### A2 — "Goethe-Zertifikat A2" formatında mock (4 modül, her biri 25 puan)

| Modül | Teil | Format | Madde | Süre |
|---|---|---|---|---|
| **Lesen** | 1 | Gazete kısa haberi, 3 seçenekli | 5 | ≈30 dk |
| | 2 | Bilgi panosu/kat planı, 3 seçenekli | 5 | |
| | 3 | E-posta, 3 seçenekli | 5 | |
| | 4 | Durum ↔ ilan eşleştirme (bir durumda ilan yok "0") | 5 | |
| **Hören** | 1 | Radyo/telefon kısa metinleri, 3 seçenekli | 5 | ≈30 dk |
| | 2 | Uzun konuşma, kişi ↔ resim/etkinlik eşleştirme | 5 | |
| | 3 | Kısa diyaloglar, resimli 3 seçenek | 5 | |
| | 4 | Röportaj, Ja/Nein | 5 | |
| **Schreiben** | 1 | SMS/kısa mesaj (20–30 kelime, 3 nokta) | 1 | 30 dk |
| | 2 | Yarı resmi e-posta (≈30–40 kelime, 3 nokta) | 1 | |
| **Sprechen** | 1 | Kartlarla soru sorma–cevaplama (kişisel) | — | ≈15 dk |
| | 2 | Kendi hayatından anlatma (konu kartı) | — | |
| | 3 | Birlikte bir şey planlama (randevu takvimi) | — | |

- Puanlama: her modül 25 → toplam 100; **geçme 60**. (Resmi sınav modüler ve modül bazında ayrı ayrı geçme eşiği uygulayabilir; mock'ta hem toplam ≥ 60 hem her modül ≥ 15/25 hedeflenir — daha güvenli hazırlık.)
- Planlama görevi (Teil 3) için "sanal partner" senaryosu: dallanmalı diyalog ağacı (partnerin takvimi önceden yazılmış; kullanıcının önerisine göre cevap: *Am Samstag kann ich leider nicht…*), ASR anahtar kelime eşleşmesiyle dallanma, yoksa seçenekli mod.

### 5.5 Can-do öz-değerlendirme
- Her ünite başında ve sonunda 4–6 madde, Avrupa Dil Portfolyosu tarzı, Türkçe: "Kendimi tanıtabilirim (isim, nereli, nerede yaşıyorum)" — ölçek: 😕 Henüz değil / 🙂 Yardımla / 😃 Rahatça.
- Öz-değerlendirme ile ölçülen performans karşılaştırılır; büyük fark (örn. 😃 ama test < %60) → "Kendini fazla/az mı değerlendiriyorsun?" kalibrasyon notu. (Bu, öğretmensiz öğrenmede metabilişi güçlendirir.)
- Seviye sonunda tüm A1 can-do listesi (Goethe/GER A1 tanımlayıcılarından türetilmiş, kendi ifademizle yazılmış) bir "portfolyo" sayfasında.

### 5.6 İlerleme metrikleri (tanımlar)

| Metrik | Tanım | Kaynak |
|---|---|---|
| **Pasif kelime** | DE→TR veya tanıma tipinde son 2 denemede doğru VE SRS aralığı ≥ 3 gün olan lemma sayısı | SRS + alıştırma logları |
| **Aktif kelime** | TR→DE üretimde (recall/tr_de/cloze_free) son 2 denemede **artikel dahil** doğru VE SRS aralığı ≥ 7 gün | |
| **Artikel doğruluğu** | Son 30 gündeki artikel içeren maddelerde ART hatası olmayan oran | hata logu |
| **Gramer konu ustalığı** | Her gramer hedefi için son 20 maddenin üstel ağırlıklı ortalaması (yarı ömür 7 gün); ≥ 0.8 = usta, 0.6–0.8 = gelişiyor, < 0.6 = zayıf | |
| **Dinleme doğruluğu** | listen_* ve dictation tiplerinin son 50 maddesinin ortalaması; ayrıca hız katmanı (0.75×/1.0×) | |
| **Okuma doğruluğu** | reading/true_false (tahmin düzeltmeli) | |
| **Yazma skoru** | short_write rubrik ortalaması + tr_de ortalaması | |
| **Konuşma skoru** | 0.5 × ASR eşleşme oranı (varsa) + 0.5 × öz-değerlendirme (normalize); ASR yoksa sadece öz | |
| **Hata profili** | Etiket bazında 7 günlük hata sayısı / ilgili madde sayısı; en yüksek 3 etiket panoda | |
| **Çalışma** | günlük dakika, seri (streak), tamamlanan ders | |
| **Sınav hazırlık tahmini** | Son mock ve ünite testlerinden beceri başına puan × Goethe bölüm ağırlıkları → tahmini toplam (güven aralığı: madde sayısı az ise geniş) | |

Panoda: "A1 kelime hedefi: 412/650 aktif" gibi Goethe Wortliste kapsamına göre hedef çubuğu.

---

## 6. İçerik üretim hattı ve lisans analizi

### 6.1 Hacim tahmini

| Varlık | A1 | A2 (ek) | Toplam |
|---|---|---|---|
| Lemma (kelime) | ≈650 | ≈650 | ≈1300 |
| Kelime başına örnek cümle | 2 | 2 | ≈2600 |
| Ders (≈ 3–4 ders/ünite) | 12 ünite × 4 = 48 | 12 × 4 = 48 | ≈96 |
| Diyalog | 48 | 48 | ≈96 (her biri 6–12 replik) |
| Okuma metni | 24 | 36 | ≈60 |
| Alıştırma maddesi | ders başına ≈40 + test havuzu | | ≈6000 |
| Ses dosyası | kelime 1300 + cümle ≈4000 + diyalog replik ≈1000 | | ≈6300 klip, ≈3–4 saat |
| Mock sınav | 2 | 2 | 4 tam form |

Ses boyutu: Opus 32 kbps mono ≈ 14 MB/saat → ≈ 50–60 MB (MP3 64 kbps ise ≈ 110 MB). Statik site için uygun; ünite bazlı tembel yükleme + Service Worker önbelleği önerilir.

### 6.2 Kaynaklar ve lisans değerlendirmesi

| Kaynak | Ne için | Lisans | Değerlendirme |
|---|---|---|---|
| **Goethe A1/A2 Wortliste** (Prüfungsziele/Testbeschreibung PDF'leri) | Kapsam/müfredat referansı | Telif hakkı Goethe-Institut | Belgeyi **kopyalayıp yeniden yayınlamak yok**; içerdiği örnek cümleleri **kullanmak yok**. Hangi kelimelerin A1 olduğu bilgisi (olgusal liste) referans alınarak **kendi lemma listemizi** oluşturmak kişisel kullanımda sorunsuz; repo herkese açıksa liste kendi yapımımız olarak (farklı sıralama, kendi anlam/örnekleriyle) tutulmalı ve "Goethe listesiyle kapsam kontrolü yapıldı" notu düşülmeli. |
| **Wiktionary (de/en)** — artikel, çoğul, çekim, IPA | Sözlük doğrulama | CC BY-SA 4.0 (+GFDL) | Toplu veri (ör. kaikki.org/wiktextract JSON dökümleri) kullanılırsa türetilmiş veri dosyası **CC BY-SA 4.0** olmalı ve atıf gerekir. Kişisel kullanım: sorun yok. Öneri: Wiktionary'yi **doğrulama oracle'ı** olarak kullan (LLM'in ürettiği artikel/çoğulu kontrol et); tek tek olgular (cins, çoğul) telif konusu değildir, ama veri tabanı bütünü olarak kopyalanırsa SA geçerli. Repo herkese açık olacaksa `data/lexicon.json` için LICENSE: CC BY-SA 4.0 + atıf dosyası. |
| **Tatoeba** cümleleri | Örnek cümle, DE–TR çiftleri | Metin: CC BY 2.0 FR (bir kısmı CC0) | Kullanılabilir; **atıf** (cümle ID + katkıcı) gerekir. Kalite değişken (doğal olmayan/hatalı cümleler, TR çevirileri az) → mutlaka QA süzgecinden geçmeli; seviye filtresi (kapsama kontrolü) ile A1 uygun olanlar seçilmeli. |
| **Tatoeba ses** | Gerçek insan sesi | **Kayıt bazında farklı**: CC BY, CC BY-NC, CC BY-NC-ND, bazıları "yeniden kullanım izni yok" | `sentences_with_audio` dökümündeki **lisans alanına göre filtrele**; sadece CC BY / CC BY-SA / CC0 olanları al. Kişisel kullanımda NC de olur, ama repo paylaşılacaksa NC/ND'yi hariç tut. |
| **Lingua Libre / Wikimedia Commons** | Kelime telaffuzu (insan sesi) | Çoğunlukla CC BY-SA 4.0 (dosya bazında kontrol) | Almanca kelime kayıtları bol; kelime kartları için iyi tamamlayıcı. Atıf + SA. |
| **Forvo** | Kelime telaffuzu | Siteye yüklenen sesler CC BY-NC-SA 3.0 olarak işaretli, ancak **toplu indirme/API kullanım şartları** kısıtlayıcı (ücretli API, yeniden dağıtım sınırlı) | **Önerilmez.** Kişisel kullanımda bile toplu çekme ToS ihlali riski. |
| **Piper TTS** + **Thorsten-Voice** modelleri | Toplu ses üretimi, çevrimdışı | Thorsten veri/modelleri **CC0**; Piper motoru açık kaynak (orijinal MIT, yeni sürüm GPL) — motor lisansı, ürettiğimiz ses dosyalarını etkilemez | **Birincil öneri** (lisans en temiz). Diğer Almanca Piper sesleri (ör. kerstin, eva_k, ramona, karlsson) model kartında lisans tek tek kontrol edilmeli. Kalite: iyi, biraz robotik prozodi. |
| **edge-tts** (Microsoft Edge "Read Aloud" uç noktası) | Yüksek kalite nöral ses, çok ses (de-DE-KatjaNeural, ConradNeural, AmalaNeural, KillianNeural, de-AT/de-CH sesler) | Resmî bir API değil; Microsoft hizmet şartları açısından **gri alan** | Kişisel, ticari olmayan, yeniden dağıtılmayan kullanımda pratikte yaygın; **herkese açık repo/yayın için riskli**. Diyaloglarda çoklu ses gerektiği için cazip. Öneri: kişisel derlemede kullanılabilir, ama ses dosyalarını **public repoya koyma**; alternatif ücretli resmî Azure TTS (ücretsiz katman aylık kota içerir). |
| **Tarayıcı `speechSynthesis`** | Çalışma anı yedek TTS | Cihaz sesi | Dosyası olmayan içerik (kullanıcının kendi cümlesi) için yedek; kalite cihaza bağlı. |
| **Görseller**: Noto Emoji (Apache-2.0), OpenMoji (CC BY-SA 4.0), Twemoji grafikleri (CC BY 4.0) | Resim-kelime | belirtilen | Hepsi uygun; atıf dosyası. |
| **LLM (Claude) üretimi** | Örnek cümle, diyalog, okuma metni, alıştırma, açıklama | Çıktı kullanıcıya ait (Anthropic tüketici/ API şartları çerçevesinde) | **Ana üretim motoru.** Telif sorunu en düşük; kalite riski (ince gramer hataları, doğal olmayan ifade) → çok katmanlı QA. |
| **LanguageTool** (yerel sunucu, LGPL) | Gramer/yazım denetimi (build aşaması) | LGPL 2.1 | Build boru hattında araç olarak kullanım sorunsuz. |
| **spaCy `de_core_news_*`** | Lemmatizasyon, POS, morfoloji (kapsama ve gramer dedektörü) | MIT (modeller de MIT/CC BY-SA kaynaklı — model kartı) | Build aşamasında araç; çıktı dosyalarını etkilemez. |
| **Hunspell de_DE sözlüğü** | Tarayıcıda yazım denetimi (short_write) | GPL/LGPL (igerman98) | İstemciye veri olarak dağıtılırsa lisans metni eklenmeli; kişisel kullanımda sorunsuz. |

**Özet lisans stratejisi:** Metin içerikleri **kendi üretimimiz (LLM + QA)** → serbestçe lisanslanabilir; sözlük verisi Wiktionary ile **doğrulanır** (kopyalanmaz) veya kopyalanırsa CC BY-SA olarak işaretlenir; ses **Piper/Thorsten (CC0)** birincil, edge-tts sadece kişisel; Tatoeba/Lingua Libre içerikleri `provenance` alanıyla izlenir ve `ATTRIBUTION.md`'de listelenir. Her içerik nesnesinde: `"provenance": {"source": "llm|tatoeba|wiktionary|manual", "sourceId": "...", "license": "...", "generator": "claude-…", "reviewed": ["auto","llm2","human"]}`.

### 6.3 Hat (pipeline) — aşamalar

```
[0] Müfredat iskeleti (insan + LLM)
     └─ ünite → ders → can-do, gramer hedefleri (whitelist), kelime hedefleri
[1] Leksikon oluşturma
     ├─ A1/A2 lemma listesi (Goethe kapsamı referans, kendi listemiz)
     ├─ LLM: artikel, çoğul, TR anlam(lar), kelime türü, fiil çekim/Partizip II, örnek etiketler
     ├─ Doğrulama: Wiktionary (wiktextract dökümü) ile artikel/çoğul/Partizip oto-karşılaştırma
     └─ Uyuşmazlık → manuel kontrol kuyruğu
[2] Ders içerik üretimi (LLM, yapılandırılmış JSON çıktısı)
     Girdi: ders spesifikasyonu + İZİNLİ KELİMELER (o derse kadar öğrenilen + yeni) + İZİNLİ GRAMER
     Çıktı: diyalog, gramer açıklaması (TR), örnek cümleler, alıştırma maddeleri (kabul listeleri,
            çeldirici + hata etiketi, ipucu kademeleri, expectedAnalysis)
[3] Otomatik doğrulayıcılar (Python/Node build betikleri)
     ├─ JSON şema doğrulama
     ├─ Kapsama kontrolü (spaCy lemmatizasyon; ≥%95 bilinen, yeni kelimeler sadece ders listesindekiler)
     ├─ Gramer seviye dedektörü (kural tabanlı: Perfekt, Präteritum, Nebensatz, Dativ, Komparativ, modal… )
     ├─ LanguageTool (de-DE) — sıfır hata hedefi
     ├─ Cevap anahtarı tutarlılığı: her kabul cevabı da LanguageTool'dan geçer; çeldiriciler GERÇEKTEN yanlış mı?
     ├─ Cümle uzunluğu sınırları (A1: ≤ 8–10 kelime; A2: ≤ 15)
     └─ Tekrar/çakışma kontrolü (aynı madde başka derste var mı?)
[4] İkinci LLM incelemesi ("Korrektor" rolü, farklı istem/temperature, mümkünse farklı model)
     Kontrol listesi §7 → her madde için PASS/FIX + gerekçe; FIX → [2]'ye geri
[5] İnsan kontrolü (öğrenici sıfırdan olduğu için yerli konuşucu/öğretmen örneklemi)
     Her üniteden rastgele %10 madde + tüm diyaloglar + mock sınavlar; mümkün değilse bu adım
     "kullanıcı itiraz kuyruğu" (§3.2) ile sürekli iyileştirmeye dönüşür
[6] Ses üretimi
     ├─ Metin → SSML benzeri hazırlık (sayılar/saat yazıya: "14:30" → "vierzehn Uhr dreißig")
     ├─ Piper (Thorsten) toplu; diyaloglarda iki farklı ses (Piper çok konuşmacılı model veya edge-tts kişisel)
     ├─ Normal hız + yavaş (0.75×) sürümü (yavaşlatma TTS hız parametresiyle, time-stretch değil)
     ├─ Loudness normalizasyonu (ffmpeg loudnorm, −16 LUFS), sessizlik kırpma, Opus/MP3
     └─ ASR geri-kontrolü: Whisper (yerel) ile sesi metne çevir → metinle eşleşme < %95 ise işaretle
        (TTS'in yanlış okuduğu kısaltma/sayı/özel isim hatalarını yakalar)
[7] Paketleme
     ├─ ders başına JSON (content/a1/u01/l01.json), ses dosyaları (audio/a1/u01/…)
     ├─ içerik manifest + hash (önbellek/Service Worker için)
     └─ ATTRIBUTION.md otomatik üretimi (provenance alanlarından)
[8] Geri besleme
     └─ kullanıcı itirazları + yüksek hata oranlı maddeler (madde analizi: p-değeri < 0.3 veya > 0.98)
        → içerik revizyon kuyruğu
```

### 6.4 LLM üretim istemi — çekirdek kısıtlar (şablon)

```
Rol: A1 Almanca ders yazarı; öğrenici Türkçe ana dilli, sıfırdan.
Ders: {unitId}/{lessonId} — Konu: {topic}; Can-do: {cando}
İZİNLİ KELİMELER (lemma): {known_lemmas} + YENİ: {new_lemmas}
İZİNLİ GRAMER: {grammar_whitelist}   YASAK: {grammar_blacklist}  (ör. Perfekt, Dativ, Nebensatz)
Kurallar:
- Her Almanca cümle ≤ 10 kelime; sadece izinli lemmalar + özel isimler (Anna, Mehmet, Berlin…).
- Standart Hochdeutsch, Almanya varyantı; doğal gündelik dil; ß/umlaut doğru.
- Türkçe açıklamalar kısa, sade; dil bilgisi terimi ilk kullanımda Türkçe karşılığıyla.
- Her alıştırma maddesinde: prompt, answers[] (TÜM kabul edilebilir varyantlar), distractors[] + her biri için errorTag,
  hints[0..3], feedback{tag: mesaj}, expectedAnalysis (token: lemma, pos, case, gender, number, person).
- Çıktı yalnızca verilen JSON şemasına uygun.
```
Üretim ayarları: yapılandırılmış çıktı (JSON schema/tool use), düşük sıcaklık (0.3–0.5) cevap anahtarı için; diyalog çeşitliliği için ayrı çağrı (0.8). Toplu üretimde Message Batches API maliyeti düşürür. Tahmini maliyet: ~96 ders × (üretim + inceleme) ≈ birkaç milyon token → düşük-orta maliyet (kesin fiyat için güncel fiyat tablosuna bakılmalı).

### 6.5 Gramer seviye dedektörü — örnek kurallar (A1'de yasak olanlar)

| Yapı | Tespit (spaCy morfolojisi + regex) | İzin |
|---|---|---|
| Perfekt | `haben/sein` çekimli + cümle sonunda `VerbForm=Part` | A1.2 son ünitelerden itibaren (müfredat koluna göre) |
| Präteritum (war/hatte hariç) | `Tense=Past`, lemma ∉ {sein, haben} | A2 |
| Nebensatz (weil, dass, wenn, ob) | `SCONJ` + çekimli fiil sonda | weil/dass/wenn A2 |
| Dativ | `Case=Dat` | A1.2 (mit, bei, aus, zu — sınırlı) |
| Komparativ/Superlativ | `Degree=Cmp/Sup` | A2 |
| Reflexiv | `PRF` | A2 |
| Konjunktiv II (möchte hariç; würde/könnte) | `Mood=Sub` | möchte A1 chunk; diğerleri A2 |
| Genitiv | `Case=Gen` (Eigennamen-s hariç) | Kapsam dışı (pasif tanıma A2) |
| Relativsatz | `PronType=Rel` | A2 sonu / B1 |

---

## 7. Kalite güvencesi kontrol listesi

**A. Dil doğruluğu**
- [ ] Gramer hatası yok (LanguageTool 0 hata + LLM Korrektor PASS)
- [ ] Artikel ve çoğul Wiktionary ile uyumlu
- [ ] Yazım: ß/ss (2006 reformu sonrası kurallar), umlaut, büyük harf (isimler, *Sie*)
- [ ] Doğal ifade (yerli konuşucunun gerçekten söyleyeceği); "çeviri kokan" cümle yok
- [ ] Register tutarlı (du/Sie bağlama uygun; Frau/Herr + soyad → Sie)
- [ ] Almanya standart varyantı (Avusturya/İsviçre kelimeleri işaretli)

**B. Seviye uygunluğu**
- [ ] Gramer whitelist dışı yapı yok (dedektör)
- [ ] Kelime kapsama: metin/diyalogda token'ların **≥ %95'i bilinen lemma**, kalan ≤ %5 sadece o dersin yeni kelimeleri, özel isimler veya görsel/çeviri desteği olan kelimeler (glossed)
- [ ] Cümle uzunluğu sınırları; ses hızı A1'de ≈ 0.9× doğal
- [ ] Yeni kelime sayısı ders başına 10–15

**C. Alıştırma geçerliliği**
- [ ] Tek doğru cevap (mcq) — ya da tüm doğru varyantlar kabul listesinde (üretim tipleri)
- [ ] Çeldiriciler kesin yanlış ve **bir hata türünü temsil ediyor** (etiketli)
- [ ] Madde, sadece hedef beceriyi ölçüyor (örn. artikel maddesinde bilinmeyen kelime yok)
- [ ] Cevap ipucu soru metninde sızmıyor
- [ ] Sıralama maddelerinde tüm geçerli sıralar listelenmiş
- [ ] Geri bildirim mesajı doğru kuralı açıklıyor, Türkçesi anlaşılır
- [ ] İpucu kademeleri artan bilgi veriyor, kademe 3 cevabı tamamen vermiyor

**D. Ses**
- [ ] Whisper geri-transkripsiyon eşleşmesi ≥ %95
- [ ] Sayılar/saatler/kısaltmalar doğru okunmuş
- [ ] Diyalogda konuşmacı sesleri farklı ve cinsiyete uygun
- [ ] Ses seviyesi normalize, baş/son sessizlik ≤ 300 ms

**E. Kültürel ve pedagojik**
- [ ] Gerçekçi Almanya bağlamı (DB, Bäckerei, Anmeldung), stereotip yok
- [ ] Türkçe konuşana özel tuzak notları ilgili yerlerde
- [ ] Ders hedefi (can-do) ile içerik eşleşiyor

**F. Teknik ve lisans**
- [ ] JSON şema geçerli; ID'ler benzersiz; ses dosyası yolları mevcut
- [ ] `provenance` ve `license` alanları dolu; NC/ND içerik public pakete girmiyor

---

## 8. Örnek ders — A1 · Ünite 1 · Ders 1: "Hallo! Ich bin …"

**Kimlik:** `a1-u01-l01` · Süre: ≈20 dk · Önkoşul: yok (alfabe Ders 2'de; bu derste ses-yazı sadece dinleyerek)

**Can-do hedefleri**
1. Birini selamlayabilir ve vedalaşabilirim (gün saatine ve resmiyete uygun).
2. Kendimi isimle tanıtabilir, karşımdakinin adını sorabilirim (*du* ve *Sie* ile).

**Gramer hedefleri:** `sein` (ich bin, du bist, Sie sind, er/sie ist) · `heißen` (ich heiße, du heißt, Sie heißen) · W-soru *Wie …?* (fiil 2. sırada) · *du* / *Sie* ayrımı · isimlerin büyük harfle yazılması.
**Kalıp (chunk) olarak, analiz edilmeden:** *Mein Name ist …*, *Freut mich.*, *Und du? / Und Sie?*

### 8.1 Kelimeler (15)

| # | id | Almanca | Artikel/Tür | Çoğul | Türkçe | Not |
|---|---|---|---|---|---|---|
| 1 | `hallo` | Hallo! | ünlem | — | Merhaba! | samimi + yarı resmi |
| 2 | `guten_morgen` | Guten Morgen! | kalıp | — | Günaydın! | ≈ 10:00'a kadar |
| 3 | `guten_tag` | Guten Tag! | kalıp | — | İyi günler! / Merhaba (resmi) | gündüz, resmi |
| 4 | `guten_abend` | Guten Abend! | kalıp | — | İyi akşamlar! | ≈ 18:00'den sonra (selam olarak) |
| 5 | `tschuess` | Tschüs! | ünlem | — | Hoşça kal! / Görüşürüz! | samimi; *Tschüss* yazımı da doğru |
| 6 | `auf_wiedersehen` | Auf Wiedersehen! | kalıp | — | Hoşça kalın! | resmi |
| 7 | `ich` | ich | zamir | — | ben | cümle başı dışında küçük harf |
| 8 | `du` | du | zamir | — | sen | arkadaş, aile, çocuk |
| 9 | `sie_formal` | Sie | zamir | — | siz (resmi) | **her zaman büyük S** |
| 10 | `sein` | sein | fiil (düzensiz) | — | olmak | ich bin, du bist, Sie sind, er/sie ist |
| 11 | `heissen` | heißen | fiil | — | adı … olmak | ich heiße, du heißt, Sie heißen |
| 12 | `wie` | wie | soru kelimesi | — | nasıl; (ad sorarken) ne | *Wie heißt du?* = Adın ne? |
| 13 | `name` | **der** Name | isim, maskulin | die Namen | isim, ad | 🔵 |
| 14 | `frau` | **die** Frau | isim, feminin | die Frauen | kadın; Bayan (unvan) | 🔴 *Frau Weber* |
| 15 | `herr` | **der** Herr | isim, maskulin | die Herren | bay, beyefendi; Bay (unvan) | 🔵 *Herr Yılmaz* |
| + | `und` | und | bağlaç | — | ve | *Und du?* = Ya sen? |
| + | `ja` / `nein` | ja / nein | — | — | evet / hayır | |

(13–15 isim, artikel rengiyle; `und`, `ja/nein` destek kelimesi — ders kelime sayısına dahil değil, pasif.)

### 8.2 Diyaloglar

**Diyalog 1 — Kursta (samimi, *du*)** · `dlg-a1-u01-l01-1` · Ses: A = kadın (Anna), B = erkek (Mehmet)

| # | Kişi | Almanca | Türkçe |
|---|---|---|---|
| 1 | Anna | Hallo! Ich bin Anna. | Merhaba! Ben Anna. |
| 2 | Mehmet | Hallo, Anna! Ich heiße Mehmet. | Merhaba Anna! Benim adım Mehmet. |
| 3 | Anna | Wie bitte? Wie heißt du? | Efendim? Adın ne? |
| 4 | Mehmet | Mehmet. | Mehmet. |
| 5 | Anna | Freut mich, Mehmet! | Memnun oldum, Mehmet! |
| 6 | Mehmet | Freut mich auch. Tschüs, Anna! | Ben de memnun oldum. Görüşürüz Anna! |
| 7 | Anna | Tschüs! | Hoşça kal! |

**Diyalog 2 — Ofiste (resmi, *Sie*)** · `dlg-a1-u01-l01-2` · Ses: A = kadın (Frau Weber), B = erkek (Herr Yılmaz)

| # | Kişi | Almanca | Türkçe |
|---|---|---|---|
| 1 | Frau Weber | Guten Morgen! Mein Name ist Weber. | Günaydın! Benim adım Weber. |
| 2 | Herr Yılmaz | Guten Morgen, Frau Weber! Ich bin Ali Yılmaz. | Günaydın Bayan Weber! Ben Ali Yılmaz. |
| 3 | Frau Weber | Freut mich, Herr Yılmaz. | Memnun oldum, Bay Yılmaz. |
| 4 | Herr Yılmaz | Freut mich auch. Auf Wiedersehen! | Ben de memnun oldum. Hoşça kalın! |
| 5 | Frau Weber | Auf Wiedersehen! | Hoşça kalın! |

Kelime kapsama kontrolü: Yeni olmayan/yeni listede olmayan tokenlar: *bitte* (Wie bitte? kalıp → chunk glossed), *freut, mich, auch* (Freut mich (auch) → chunk glossed), *mein* (Mein Name ist → chunk), özel isimler. Tüm chunk'lar ders kartında Türkçe karşılığıyla verildiği için kapsama ✓.

### 8.3 Gramer açıklaması (Türkçe, kısa)

**1) "Ben … ım/im" = *Ich bin …*** Türkçede "Ben Anna'yım" derken "-yım" ekini kullanırız. Almancada bunun için ayrı bir fiil var: **sein** (olmak). Kişiye göre değişir:

| Kişi | sein | heißen |
|---|---|---|
| ich (ben) | **bin** | heiß**e** |
| du (sen) | **bist** | heiß**t** |
| er / sie (o) | **ist** | heiß**t** |
| Sie (siz, resmi) | **sind** | heiß**en** |

> ⚠️ *du heißst* değil **du heißt**: kök zaten *ß* sesiyle bittiği için sadece **-t** eklenir.

**2) Ad sorma — fiil 2. sırada.** *Wie heißt du?* = "Adın ne?" (kelimesi kelimesine: "Nasıl adlandırılıyorsun?"). Soru kelimesi **1.**, fiil **2.**, özne **3.** sırada: **Wie** | **heißt** | **du**? Türkçede fiil sonda gelir; Almancada (ana cümlede) **hep 2. sırada**.

**3) du mı Sie mi?** *du* = sen (arkadaş, aile, çocuk, genç yaşıtlar). *Sie* = siz (iş, resmi ortam, tanımadığın yetişkin, *Frau/Herr + soyadı* ile hitap). *Sie* **hep büyük harfle** yazılır. Emin değilsen **Sie** kullan.

**4) İsimler büyük harfle.** Almancada tüm isimler büyük harfle başlar: *der **N**ame, die **F**rau*. Her ismi **artikeliyle** öğren: 🔵 der · 🔴 die · 🟢 das.

### 8.4 Alıştırmalar (12 madde, 11 farklı tip, cevaplı)

> Format: her madde doğrudan JSON nesnesine çevrilebilecek alanlarla verilmiştir.

**Ex1 — `listen_mcq` (dinle-seç)** · id `a1-u01-l01-ex01`
- Ses: 🔊 `audio/a1/u01/l01/ex01.opus` → "Guten Abend!"
- Soru (TR): "Hangi saatte söylenir?"
- Seçenekler: (a) 🌅 08:00 [errorTag: WS] (b) ☀️ 13:00 [WS] (c) 🌙 20:00 ✓
- Cevap: c
- Geri bildirim (yanlış): "*Guten Abend* = İyi akşamlar → akşam. Sabah: *Guten Morgen*, gündüz: *Guten Tag*."

**Ex2 — `match` (eşleştirme)** · `a1-u01-l01-ex02`
- Sol: Hallo! · Guten Tag! · Tschüs! · Auf Wiedersehen!
- Sağ (karışık): Hoşça kalın! (resmi) · Merhaba! (samimi) · Hoşça kal! (samimi) · İyi günler! (resmi)
- Cevap: Hallo!→Merhaba! (samimi) · Guten Tag!→İyi günler! (resmi) · Tschüs!→Hoşça kal! (samimi) · Auf Wiedersehen!→Hoşça kalın! (resmi)
- Puan: çift başına 0.25.

**Ex3 — `article` (artikel seçme, renkli)** · `a1-u01-l01-ex03` (3 alt madde)
- a) ___ Name → **der** · b) ___ Frau → **die** · c) ___ Herr → **der**
- Geri bildirim (b'de *der* seçilirse): "**die Frau** — kadın bildiren isimler genelde *die*. 🔴"
- Etiket: ART-GEN.

**Ex4 — `conj_table` (çekim tablosu)** · `a1-u01-l01-ex04`

| | sein | heißen |
|---|---|---|
| ich | [bin] | [heiße] |
| du | [bist] | [heißt] |
| Sie | [sind] | [heißen] |

- Kabul: `heisse`, `heisst`, `heissen` → doğru + SZ uyarısı ("ß yazamıyorsan ss kabul, ama doğrusu ß") puan 0.9.
- Özel tuzak: `heißst` → KON-PERS: "Kök *ß* ile bitiyor → sadece **-t**: du heißt."

**Ex5 — `cloze_bank` (bankalı boşluk)** · `a1-u01-l01-ex05`
- Metin: "Hallo! Ich (1)___ Lena. Wie (2)___ du?" — "Ich (3)___ Mehmet."
- Banka: [bin, heißt, heiße, bist, sind]
- Cevap: (1) bin (heiße da kabul — iki cevap da doğru: *Ich heiße Lena*) · (2) heißt · (3) heiße (bin da kabul)
- Not: Banka, her kelime bir kez kullanılır kuralıyla değil, **tekrar kullanılabilir** modda (çünkü 1 ve 3 için iki doğru seçenek var).

**Ex6 — `word_order` (kelime sıralama)** · `a1-u01-l01-ex06` (2 alt madde)
- a) [du / heißt / Wie / ?] → **Wie heißt du?**
- b) [Sie / heißen / Wie / ?] → **Wie heißen Sie?**
- Yanlış örnek: "Wie du heißt?" → WST-FRAGE (+TR-SOV): "Soruda fiil **2. sırada**: Wie **heißt** du?"; puan 0.25 (ilk bileşen doğru).

**Ex7 — `tr_de` (çeviri TR→DE)** · `a1-u01-l01-ex07` (3 alt madde)
- a) "Merhaba! Ben Ali." → kabul: `Hallo! Ich bin Ali.` · `Hallo, ich bin Ali.` · `Hallo! Ich heiße Ali.` · `Hallo! Mein Name ist Ali.`
  - Yaygın hata: "Hallo! Ich Ali." → LÜCKE-MISS + TR-KOPULA: "Türkçede '-yım' ek; Almancada fiil gerekir: Ich **bin** Ali." (puan 0.65)
- b) "Adınız ne?" (resmi) → kabul: `Wie heißen Sie?` · `Wie ist Ihr Name?` (pasif kalıp, kabul ama "henüz öğrenmedik, ama doğru!" notu)
  - Hata: "Wie heißt du?" → ANR: "'Adınız' resmi → *Sie*." (puan 0.5) · "Wie heißen sie?" → GK-SIE (0.9)
- c) "Memnun oldum." → kabul: `Freut mich.` · `Freut mich!`

**Ex8 — `dialog` (diyalog tamamlama / rol yapma)** · `a1-u01-l01-ex08`
- Bağlam (TR): "Yeni işindesin. Bir meslektaş seni selamlıyor. Saat 9:00."
- Herr Krause: 🔊 "Guten Morgen! Mein Name ist Krause."
- Sen (seç): (a) "Hallo! Ich bin Ali. Wie heißt du?" [ANR] (b) "Guten Morgen, Herr Krause! Ich bin Ali Yılmaz." ✓ (c) "Guten Abend, Herr Krause! Ich bin Ali." [WS: saat]
- Herr Krause: 🔊 "Freut mich, Herr Yılmaz."
- Sen (yaz): ___ → kabul: `Freut mich auch.` · `Freut mich auch!` · `Freut mich.`
- Sesli mod: aynı repliği söyle (ASR anahtar: "freut", "mich").

**Ex9 — `minimal_pair` (ses ayırt etme, ders kelimeleriyle)** · `a1-u01-l01-ex09`
- 🔊 "**bist**" — hangisini duydun? [bin] [bist ✓] [ist]
- 🔊 "**heißt**" — [heiße] [heißt ✓]
- Amaç: kişi eklerini kulakla ayırt etme (-e / -t, bin/bist/ist). Etiket: AUS / HÖR.

**Ex10 — `dictation` (dikte)** · `a1-u01-l01-ex10`
- 🔊 "Wie heißen Sie?" (en fazla 3 dinleme; 0.75× butonu)
- Cevap: `Wie heißen Sie?` — kabul varyantı: `Wie heissen Sie?` (SZ uyarı)
- Diff örneği: "Wi heisen sie" → *Wi*→**Wie** (RS-EI-IE: "uzun i sesi *ie* yazılır"), *heisen*→**heißen** (SZ/RS: "uzun ünlüden sonra s sesi *ß*"), *sie*→**Sie** (GK-SIE). Puan: 0/3 tam doğru kelime + GK yarım → 0.17; ama motor "3 yazım konusu" özetini verir.

**Ex11 — `find_error` (hata bulma)** · `a1-u01-l01-ex11` (2 alt madde)
- a) "Hallo! Ich **bist** Anna." → hatalı kelime: *bist* → düzeltme: **bin** (KON-SEIN)
- b) "Guten Tag, Frau Weber! Wie heißt **du**?" → hatalı: *du* (ve *heißt*) → düzeltme: **Wie heißen Sie?** (ANR) — kabul: kullanıcı *du*'ya dokunursa konum doğru; düzeltme alanı tam cümle ister.

**Ex12 — `repeat` + `speak_prompt` (sesli tekrar → kendini tanıt)** · `a1-u01-l01-ex12`
- Adım 1 (repeat): 🔊 "Hallo! Ich heiße Mehmet." → 🎙️ tekrar et (ASR hedef eşleşme ≥ 0.8 → 😃)
- Adım 2 (speak_prompt): "Kendini tanıt: selam + isim + karşındakinin adını sor (samimi)."
  - Model cevap: "Hallo! Ich heiße [Adın]. Wie heißt du?"
  - Kontrol listesi (öz + ASR anahtar kelime): ☐ selam (*hallo/guten…*) ☐ *ich bin/heiße* ☐ *wie heißt du*
  - Rubrik: 3/3 madde → 😃.

**Ders sonu mini quiz (6 madde, ipuçsuz)** · `a1-u01-l01-quiz`
1. `mcq`: "Resmi vedalaşma?" → *Auf Wiedersehen!* (çeldirici: Tschüs! [ANR], Hallo! [WS], Guten Tag! [WS])
2. `article`: ___ Herr → der
3. `cloze_free`: "Du ___ Tom." → bist
4. `word_order`: [Sie / Wie / heißen] → Wie heißen Sie?
5. `listen_mcq`: 🔊 "Mein Name ist Schulz." — "Adı ne?" (a) Schulz ✓ (b) Schuster (c) Schmidt
6. `tr_de`: "Ya sen?" → `Und du?`
- Geçme gerekmez; < %70 → ders yarın tekrar listesinde.

**Can-do öz-değerlendirme (ders sonu):**
- "Günün saatine uygun selam verebilirim." 😕/🙂/😃
- "Adımı söyleyip karşımdakinin adını *du* ve *Sie* ile sorabilirim." 😕/🙂/😃

### 8.5 Örnek dersin JSON taslağı (kısaltılmış)

```json
{
  "id": "a1-u01-l01",
  "level": "A1",
  "unit": 1,
  "lesson": 1,
  "title": {"de": "Hallo! Ich bin …", "tr": "Merhaba! Ben …"},
  "canDo": [
    "Birini günün saatine ve resmiyete uygun selamlayıp vedalaşabilirim.",
    "Kendimi tanıtıp karşımdakinin adını du ve Sie ile sorabilirim."
  ],
  "grammar": ["sein-praesens-sg", "heissen-praesens-sg", "w-frage-v2", "du-sie", "nomen-gross"],
  "chunks": [
    {"de": "Mein Name ist …", "tr": "Benim adım …"},
    {"de": "Freut mich.", "tr": "Memnun oldum."},
    {"de": "Wie bitte?", "tr": "Efendim? / Pardon?"},
    {"de": "Und du? / Und Sie?", "tr": "Ya sen? / Ya siz?"}
  ],
  "vocab": [
    {"id": "name", "lemma": "Name", "pos": "NOUN", "gender": "m", "article": "der", "plural": "Namen",
     "tr": ["isim", "ad"], "audio": "audio/lex/name.opus",
     "example": {"de": "Mein Name ist Weber.", "tr": "Benim adım Weber."}},
    {"id": "frau", "lemma": "Frau", "pos": "NOUN", "gender": "f", "article": "die", "plural": "Frauen",
     "tr": ["kadın", "Bayan (unvan)"], "audio": "audio/lex/frau.opus"},
    {"id": "heissen", "lemma": "heißen", "pos": "VERB",
     "conj": {"praesens": {"ich": "heiße", "du": "heißt", "er": "heißt", "wir": "heißen", "ihr": "heißt", "sie": "heißen"}},
     "tr": ["adı … olmak"]}
  ],
  "dialogs": [
    {"id": "dlg-a1-u01-l01-1", "register": "du",
     "speakers": {"A": {"name": "Anna", "voice": "f1"}, "B": {"name": "Mehmet", "voice": "m1"}},
     "lines": [
       {"s": "A", "de": "Hallo! Ich bin Anna.", "tr": "Merhaba! Ben Anna.", "audio": "audio/a1/u01/l01/d1-01.opus"},
       {"s": "B", "de": "Hallo, Anna! Ich heiße Mehmet.", "tr": "Merhaba Anna! Benim adım Mehmet."}
     ]}
  ],
  "exercises": [
    {"id": "a1-u01-l01-ex06a", "type": "word_order", "skill": "syntax", "load": 3,
     "tokens": ["du", "heißt", "Wie", "?"],
     "answers": ["Wie heißt du?"],
     "verbIndexTarget": 1,
     "hints": ["Soru kelimesiyle başla.", "Fiil 2. sırada olmalı.", "Wie heißt …"],
     "feedback": {"WST-FRAGE": "Soruda fiil 2. sırada: Wie heißt du?"},
     "grammar": ["w-frage-v2"]},
    {"id": "a1-u01-l01-ex07a", "type": "tr_de", "skill": "production", "load": 4,
     "prompt": {"tr": "Merhaba! Ben Ali."},
     "answers": ["Hallo! Ich bin Ali.", "Hallo, ich bin Ali.", "Hallo! Ich heiße Ali.", "Hallo! Mein Name ist Ali."],
     "commonErrors": [
       {"pattern": "^hallo[!,]? ich ali\\.?$", "tags": ["LÜCKE-MISS", "TR-KOPULA"], "score": 0.65,
        "msg": "Türkçede '-yım' bir ek; Almancada fiil gerekir: Ich bin Ali."}
     ],
     "expectedAnalysis": [
       {"t": "Ich", "lemma": "ich", "pos": "PRON", "person": 1, "case": "Nom"},
       {"t": "bin", "lemma": "sein", "pos": "AUX", "person": 1, "num": "Sg", "finite": true}
     ],
     "grammar": ["sein-praesens-sg"]},
    {"id": "a1-u01-l01-ex03b", "type": "article", "noun": "frau", "answer": "die",
     "options": ["der", "die", "das"],
     "feedback": {"ART-GEN": "die Frau — kadın bildiren isimler genelde die."}}
  ],
  "provenance": {"source": "llm", "generator": "claude", "reviewed": ["auto", "llm2"], "license": "own"}
}
```

---

## 9. Önerilen JSON şemaları (özet — diğer kollarla sözleşme)

**Exercise (ortak alanlar):** `id, type, skill, level, load(1-5), grammar[], vocab[], prompt{de?,tr?,audio?,image?}, answers[] | answer, options[]? (her biri {text, correct, errorTag?}), hints[0..3], feedback{tag: msg}, commonErrors[]{pattern, tags[], score, msg}, expectedAnalysis[]?, scoring{mode, partial}, provenance`.

**Attempt log (localStorage/IndexedDB):** `{exId, ts, given, score, tags[], hintLevel, durationMs, mode: "lesson|quiz|test|mock"}` → metrik motoru ve SRS kolu bu logu okur.

**ErrorTag sözlüğü:** `{code, parent, tr_name, explanationTemplate, grammarCardId}` — tek dosya (`data/error-tags.json`), hem geri bildirim hem pano bunu kullanır.

**Test spec:** `{id, kind: "unit|mockA1|mockA2", sections[]{skill, teil, itemPool[], count, timeLimitSec, replayLimit, points}, passRule{total: 60, perSkillMin?: 15, perGrammarMin?: 0.7}}`.

---

## 10. Açık sorular ve riskler

1. **Resmi Goethe puanlama katsayıları** (Start Deutsch 1 yazılı/sözlü ağırlık, A2 modül eşikleri) bu oturumda goethe.de'ye ağ erişimi olmadığı için doğrulanamadı → uygulama öncesi resmi *Durchführungsbestimmungen* ve *Übungssatz* ile karşılaştır. Format (bölümler, süreler, madde sayıları) yayımlanmış bilgilerle uyumlu.
2. **Yerli konuşucu doğrulaması** yoksa LLM + LanguageTool + Wiktionary üçlüsü ince doğallık hatalarını kaçırabilir → itiraz kuyruğu ve öncelikle diyalog/mock sınavlar için bir defalık insan kontrolü önerilir.
3. **ASR** tarayıcı bağımlı ve bulut tabanlı (gizlilik notu kullanıcıya gösterilmeli); konuşma skoru gate olarak kullanılmamalı.
4. **edge-tts** lisans gri alanı → public repo ise Piper/Thorsten'e (CC0) sınırlı kal.
5. **Serbest yazma** değerlendirmesi backend'siz sınırlı → opsiyonel "kendi API anahtarın" modu; anahtar tarayıcıda tutulur, kişisel kullanım dışında önerilmez.
6. **Madde havuzu boyutu:** paralel form ve tekrar için ünite başına ≥ 2× test boyutu madde gerekir; üretim maliyeti buna göre planlanmalı.
7. **Hata sınıflandırıcı** `expectedAnalysis` verisine bağlı → içerik üretiminde bu alan zorunlu ve spaCy ile otomatik doldurulup LLM ile düzeltilmeli.
