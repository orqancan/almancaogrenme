# 02 — Müfredat ve İçerik Kapsamı (A1 → A2)

> **Kol:** Müfredat ve içerik kapsamı
> **Hedef kitle:** Ana dili Türkçe olan, Almancaya sıfırdan başlayan, öğretmensiz kendi kendine çalışan yetişkin
> **Hedef:** CEFR A2 sonu (Goethe-Zertifikat A2 sınavını geçebilecek düzey)
> **Referanslar:** Goethe-Institut *Start Deutsch 1* (A1) ve *Goethe-Zertifikat A2* Prüfungsziele/Testbeschreibung ve Wortliste dokümanları, CEFR (GER) 2001 + Companion Volume 2020 can-do tanımları, *Profile Deutsch* (Glaboniat ve ark.), Rahmencurriculum für Integrationskurse (BAMF) tema listesi.
> **Not:** Kelime sayıları ve sınav formatları bu kaynaklardaki yaygın bilinen değerlere dayanır; içerik üretimi aşamasında Goethe Wortliste PDF'leriyle kelime kelime karşılaştırma (bkz. §5.4) yapılmalıdır.

---

## İçindekiler

1. [Genel tasarım ilkeleri](#1-genel-tasarım-ilkeleri)
2. [Seviye yapısı ve süre tahmini](#2-seviye-yapısı-ve-süre-tahmini)
3. [CEFR alt seviye can-do hedefleri (A1.1, A1.2, A2.1, A2.2)](#3-cefr-alt-seviye-can-do-hedefleri)
4. [Gramer sıralaması (bağımlılık grafiği)](#4-gramer-sıralaması)
5. [Kelime hedefleri ve dağılımı](#5-kelime-hedefleri)
6. [Yüksek frekanslı kalıplar (chunk) listesi](#6-yüksek-frekanslı-kalıplar-chunks)
7. [Telaffuz modülü (Ünite 0 + sürekli modül)](#7-telaffuz-modülü)
8. [Tematik ünite listesi (28 + 1 ünite)](#8-tematik-üniteler)
9. [Ünite içi ders yapısı](#9-ünite-içi-ders-yapısı)
10. [İlerleme kontrol noktaları ve sınav simülasyonu](#10-ilerleme-kontrol-noktaları-ve-sınav-simülasyonu)
11. [JSON veri modeli — tam ünite örneği](#11-json-veri-modeli)
12. [Türkçe konuşanlara özgü zorluklar — özet tablo](#12-türkçe-konuşanlara-özgü-zorluklar)
13. [Açık sorular / diğer kollara devredilenler](#13-açık-sorular)

---

## 1. Genel tasarım ilkeleri

| İlke | Açıklama | Sistemdeki karşılığı |
|---|---|---|
| **İletişim önce, kural sonra** | Her gramer konusu önce bir diyalog/metin içinde "kalıp" olarak görülür, sonra açıklanır (*noticing*). | Ders 2 (Diyalog) her zaman Ders 3 (Gramer) öncesinde. |
| **Spiral müfredat** | Aynı konu 2–3 kez, her seferinde derinleşerek döner (ör. Akkusativ: Ünite 4 tanıtım → Ünite 5 kein/einen → Ünite 12 Possessiv Akk → Ünite 13 Pronomen Akk). | Gramer ID'lerinde `introduced` / `expanded` / `reviewed` alanları. |
| **Bağımlılık sırası** | Hiçbir alıştırma, henüz açılmamış bir gramer veya kelimeyi zorunlu kılmaz. | JSON'da `prerequisites` + içerik doğrulama scripti (bkz. §11.4). |
| **Artikel kelimenin parçasıdır** | İsim asla artikelsiz öğretilmez; renk kodu (der=mavi, die=kırmızı, das=yeşil, Plural=sarı/gri). | `vocab.artikel`, `vocab.plural` zorunlu alan. |
| **Chunk ağırlıklı başlangıç** | İlk 3 ünitede gramer analizinden çok hazır kalıp (Wie heißen Sie? / Ich komme aus …). | §6 chunk listesi ünitelere bağlı. |
| **Türkçeyi köprü olarak kullan** | Benzerlikler (Nebensatz'ta fiil sonda, sen/siz ↔ du/Sie, ü/ö sesleri, kitap/kitab ↔ Auslautverhärtung) avantaj olarak vurgulanır; tuzaklar (cinsiyet, V2, artikel) açıkça uyarılır. | Her gramer kartında `trNote` alanı. |
| **Dört beceri dengesi** | Her ünitede Hören / Lesen / Schreiben / Sprechen görevleri; sınav formatlarına (Goethe) erken alışma. | Ünite sonu "Bitiş görevi" + Goethe tipi mini görev. |
| **Statik, backend'siz** | Tüm içerik JSON dosyalarında; ses dosyaları önceden üretilmiş (TTS/kayıt) veya Web Speech API. | §11 veri modeli. |

---

## 2. Seviye yapısı ve süre tahmini

| Alt seviye | Üniteler | Kümülatif kelime (aktif hedef) | Tahmini çalışma süresi* | Kapanış |
|---|---|---|---|---|
| **Ön modül** | Ünite 0 — Laute & Buchstaben | ~40 (selamlaşma + sayılar 0–10) | 4–6 saat | Telaffuz mini testi |
| **A1.1** | Ünite 1–7 | ~350 | 60–80 saat | Kontrol Noktası 1 (A1.1 Zwischentest) |
| **A1.2** | Ünite 8–14 | ~700 | 60–80 saat | Kontrol Noktası 2 + **Start Deutsch 1 simülasyonu** |
| **A2.1** | Ünite 15–21 | ~1050 | 70–90 saat | Kontrol Noktası 3 (A2.1 Zwischentest) |
| **A2.2** | Ünite 22–28 | ~1350 (+~300 pasif) | 70–90 saat | Kontrol Noktası 4 + **Goethe-Zertifikat A2 simülasyonu** |

\* Süreler; günde 45–60 dk, haftada 5–6 gün düzenli çalışma + SRS tekrarları içindir. Toplam ≈ 260–340 saat (yaklaşık 10–14 ay). Goethe/ALTE tahminleri kurs ortamı için A1 ≈ 80–200, A2 ≈ 200–350 ders saati (kümülatif) aralığındadır; öğretmensiz öğrenmede üst sınır daha gerçekçidir.

---

## 3. CEFR alt seviye can-do hedefleri

> CEFR resmi olarak A1/A2 düzeyinde tanımlanır; A1.1–A2.2 bölünmesi Almanca ders kitaplarında (Menschen, Netzwerk, Schritte, Begegnungen) ve Integrationskurs yapısında yaygın olan pratik bir alt bölümlemedir. Aşağıdaki tanımlar CEFR + Profile Deutsch "Kann-Beschreibungen" esas alınarak, sistemde ölçülebilir hale getirilmiştir.

### 3.1 A1.1 — "Hayatta kalma" düzeyi (Ünite 0–7)

| Beceri | Kann-Beschreibung (Almanca) | Türkçe hedef | Sistemde ölçüm |
|---|---|---|---|
| **Hören** | Kann einfache Begrüßungen, Namen, Zahlen und Preise verstehen, wenn langsam und deutlich gesprochen wird. | Yavaş ve net konuşulduğunda selamlaşma, isim, sayı ve fiyatları anlar. | Sayı dikte (0–1000), isim harf dikte, fiyat eşleştirme. |
| | Kann einfache Fragen zur Person (Name, Herkunft, Wohnort, Alter) verstehen. | Kişisel sorulara ait soruları anlar. | Soru → doğru cevap seçme (sesli). |
| | Kann Uhrzeiten und Wochentage in kurzen Ansagen erkennen. | Kısa anonslarda saat ve gün tanır. | Anons → saat seçme. |
| **Lesen** | Kann vertraute Namen, Wörter und ganz einfache Sätze verstehen, z. B. auf Schildern, Speisekarten, Formularen. | Tabela, menü, formdaki tanıdık kelime ve çok basit cümleleri anlar. | Menü/tabela okuma, form alanı eşleştirme. |
| | Kann kurze persönliche Vorstellungen (3–5 Sätze) verstehen. | 3–5 cümlelik tanıtım metnini anlar. | Richtig/Falsch. |
| **Sprechen** | Kann sich und andere vorstellen (Name, Land, Wohnort, Sprachen, Beruf, Hobby). | Kendini ve başkasını tanıtır. | Kayıt + kontrol listesi; Goethe A1 Sprechen Teil 1 formatı. |
| | Kann einfache Fragen stellen und beantworten (Wie heißt du? Woher kommst du?). | Basit soru sorar/cevaplar. | Rol kartı (Web Speech ile cevap tanıma — opsiyonel). |
| | Kann Zahlen, Preise, Uhrzeiten nennen und buchstabieren. | Sayı, fiyat, saat söyler; harf harf kodlar. | Sesli sayı okuma. |
| | Kann im Café/Supermarkt etwas bestellen/kaufen (Ich möchte …, Was kostet …?). | Kafede sipariş verir, fiyat sorar. | Diyalog boşluk doldurma (sözlü). |
| **Schreiben** | Kann ein einfaches Formular mit persönlichen Daten ausfüllen. | Kişisel bilgilerle form doldurur. | Goethe A1 Schreiben Teil 1 tipi form. |
| | Kann kurze Sätze über sich schreiben (Ich heiße … Ich wohne in …). | Kendisi hakkında kısa cümleler yazar. | Serbest yazım + otomatik anahtar kelime kontrolü + örnek cevap. |

### 3.2 A1.2 — "Günlük rutin" düzeyi (Ünite 8–14)

| Beceri | Kann-Beschreibung | Türkçe hedef | Ölçüm |
|---|---|---|---|
| **Hören** | Kann kurze, einfache Durchsagen (Bahnhof, Kaufhaus) und Anrufbeantworter-Nachrichten in Hauptpunkten verstehen. | İstasyon/mağaza anonsları ve telesekreter mesajlarının ana noktalarını anlar. | Goethe A1 Hören Teil 2–3 tipi. |
| | Kann einfache Wegbeschreibungen verstehen. | Basit yol tarifini anlar. | Harita üzerinde rota seçimi. |
| | Kann kurze Gespräche über Tagesablauf, Arbeit, Termine verstehen. | Günlük rutin/iş/randevu konuşmalarını anlar. | Çoktan seçmeli. |
| **Lesen** | Kann kurze Nachrichten (SMS, E-Mail, Notizen), Anzeigen und Informationstafeln verstehen. | Kısa mesaj, ilan, bilgi panolarını anlar. | Goethe A1 Lesen Teil 1–3. |
| | Kann Wohnungsanzeigen, Öffnungszeiten, Fahrpläne lesen. | Ev ilanı, açılış saati, tarifeleri okur. | Bilgi bulma (scanning). |
| **Sprechen** | Kann über Tagesablauf, Wohnung, Arbeit und Freizeit in einfachen Sätzen sprechen. | Günlük rutin, ev, iş, boş zaman hakkında basit cümlelerle konuşur. | 60 sn monolog kaydı. |
| | Kann einen Termin vereinbaren/absagen, nach dem Weg fragen, Bitten formulieren. | Randevu alır/iptal eder, yol sorar, rica eder. | Goethe A1 Sprechen Teil 3 (Bitten). |
| | Kann über Vergangenes in einfachster Form berichten (Ich habe … gemacht). | Geçmişi en basit şekilde anlatır. | Perfekt cümleleri. |
| | Kann beim Arzt Beschwerden nennen. | Doktorda şikâyetini söyler. | Rol oyunu. |
| **Schreiben** | Kann eine kurze Nachricht/E-Mail (ca. 30 Wörter) schreiben: Einladung, Absage, Bitte, Information. | ~30 kelimelik davet, iptal, rica mesajı yazar. | Goethe A1 Schreiben Teil 2 (3 içerik noktası). |

### 3.3 A2.1 — "Anlatma ve karşılaştırma" düzeyi (Ünite 15–21)

| Beceri | Kann-Beschreibung | Türkçe hedef | Ölçüm |
|---|---|---|---|
| **Hören** | Kann das Wesentliche von kurzen, klaren Mitteilungen und Durchsagen verstehen (Radio-Wetter, Verkehr). | Kısa net bildirimlerin özünü anlar. | Goethe A2 Hören Teil 1. |
| | Kann Alltagsgesprächen über vertraute Themen folgen (Urlaub, Familie, Essen). | Tanıdık konulardaki günlük konuşmaları takip eder. | Goethe A2 Hören Teil 2–3. |
| **Lesen** | Kann kurze Zeitungsmeldungen, Blogeinträge und persönliche Briefe verstehen. | Kısa haber, blog, kişisel mektupları anlar. | Goethe A2 Lesen Teil 1, 3. |
| | Kann Speisekarten, Prospekte, Wegweiser in Gebäuden (Kaufhaus) nutzen. | Menü, broşür, bina yönlendirmelerini kullanır. | Goethe A2 Lesen Teil 2. |
| **Sprechen** | Kann über Erlebnisse, Kindheit, Urlaub in einfachen zusammenhängenden Sätzen berichten. | Deneyim, çocukluk, tatil hakkında bağlantılı anlatır. | 90 sn anlatım; Perfekt + Präteritum (war/hatte). |
| | Kann Gründe nennen (weil …), Meinungen äußern (Ich finde, dass …), vergleichen (besser als …). | Gerekçe, fikir, karşılaştırma ifade eder. | Kayıt + kontrol listesi. |
| | Kann im Restaurant bestellen, reklamieren, beim Arzt Symptome beschreiben und Fragen stellen. | Restoranda sipariş/şikâyet, doktorda belirti anlatma. | Rol kartları. |
| **Schreiben** | Kann persönliche Nachrichten über Erlebnisse schreiben (Postkarte, E-Mail, ca. 40 Wörter). | Deneyim anlatan kartpostal/e-posta yazar. | Goethe A2 Schreiben Teil 1. |

### 3.4 A2.2 — "Bağımsız günlük yaşam" düzeyi (Ünite 22–28)

| Beceri | Kann-Beschreibung | Türkçe hedef | Ölçüm |
|---|---|---|---|
| **Hören** | Kann Hauptinformationen aus Radiointerviews, Telefonansagen und Gesprächen im Amt/beim Arzt verstehen. | Radyo röportajı, telefon anonsu, resmi daire konuşmalarının ana bilgilerini anlar. | Goethe A2 Hören Teil 4 (Interview). |
| | Kann einfachen Anweisungen (Formulare, Abläufe) folgen. | Basit talimatları izler. | Sıralama görevi. |
| **Lesen** | Kann Formulare, Behördenschreiben (einfach), Stellenanzeigen und Kleinanzeigen verstehen. | Form, basit resmi yazı, iş/küçük ilanları anlar. | Goethe A2 Lesen Teil 4 (Anzeigen zuordnen). |
| **Sprechen** | Kann gemeinsam etwas planen/aushandeln (Termin, Geschenk, Ausflug), Vorschläge machen und reagieren. | Ortak plan yapar, öneri sunar/tepki verir. | Goethe A2 Sprechen Teil 3 (zwei Terminkalender). |
| | Kann über Arbeit, Ausbildung, Pläne und Wünsche sprechen (Ich würde gern …). | İş, eğitim, plan ve dilek hakkında konuşur. | Goethe A2 Sprechen Teil 2. |
| | Kann sich am Telefon und am Schalter verständigen (Bürgeramt, Bank, Post). | Telefonda ve gişede iletişim kurar. | Rol kartları. |
| **Schreiben** | Kann halbformelle E-Mails schreiben (an Vermieter, Lehrer, Chef: Bitte, Entschuldigung, Absage, ca. 40–50 Wörter). | Ev sahibi/öğretmen/şef'e yarı resmi e-posta yazar. | Goethe A2 Schreiben Teil 2. |
| | Kann einen einfachen tabellarischen Lebenslauf und eine sehr kurze Bewerbung verfassen. | Basit tablo CV ve çok kısa başvuru yazar. | Şablonlu yazım. |

---

## 4. Gramer sıralaması

### 4.1 Okuma kılavuzu

- **ID**: `G01`…`G58` — JSON'da `grammar.id` olarak kullanılır.
- **Ünite**: İlk tanıtıldığı ünite (parantez içinde genişletildiği üniteler).
- **Önkoşul**: Bu konudan önce açılmış olması gereken gramer ID'leri.
- **Zorluk (TR)**: Türkçe konuşan için 1 (kolay) – 5 (çok zor).
- **Mod**: `P` = üretken (aktif kullanılmalı), `R` = alımlayıcı (tanımak yeterli, A2 sınavında pasif).

### 4.2 A1.1 (Ünite 0–7)

| ID | Konu | Ünite | Önkoşul | Zorluk | Mod | Türkçe konuşan için not |
|---|---|---|---|---|---|---|
| G01 | Alfabe, harf-ses eşleşmesi, buchstabieren | 0 | — | 2 | P | Türkçe fonetik yazılır; Almancada `ei, ie, sch, ch, eu` gibi çoklu harfler tek ses verir. `v`=[f], `w`=[v], `z`=[ts], `j`=[y] en sık hata. |
| G02 | Kişi zamirleri (ich, du, er, sie, es, wir, ihr, sie, Sie) | 1 | — | 2 | P | Türkçe "o" tek; Almancada er/sie/es ayrımı var. `sie` (o-kadın) / `sie` (onlar) / `Sie` (siz-resmi) karışıklığı → fiil çekimi ve büyük harf ile ayırt etmeyi öğret. du/Sie ↔ sen/siz benzerliği avantaj. |
| G03 | `sein` fiilinin Präsens çekimi | 1 | G02 | 2 | P | Türkçede "olmak" çoğunlukla ek (-im, -sin) ile ifade edilir; Almancada ayrı fiil zorunlu: *Ich bin müde* (Yorgunum). "Ich müde" hatası tipiktir. |
| G04 | Cümle yapısı: fiil 2. pozisyonda (Aussagesatz, V2) | 1 | G03 | 4 | P | **Kritik.** Türkçe SOV, fiil sonda. Almanca ana cümlede fiil hep 2. sırada: *Heute **komme** ich.* (Bugün geliyorum.) Zaman ifadesi başa gelince özne fiilden sonra gelir (Inversion) — Türkçede yok. |
| G05 | W-Fragen (wer, was, wo, woher, wohin, wie, wann, wie viel, warum) | 1 (2, 6) | G04 | 2 | P | Türkçedeki soru kelimesi yerinde kalır (*Nerelisin?*); Almancada W-kelimesi başa, fiil 2. sıraya. `wo`/`woher`/`wohin` ↔ nerede/nereden/nereye birebir eşleşir (avantaj). |
| G06 | Präsens — düzenli fiiller (wohnen, heißen, kommen, lernen, spielen) | 1–2 | G02 | 2 | P | Kişi eki mantığı Türkçeye benzer (geliyor-um / komm-e). `-t/-d` ile biten kökte e eklenmesi (arbeit**e**st), `s/ß/z` ile biten kökte du-formu (*du heißt*) dikkat. |
| G07 | Ja/Nein-Fragen (Verb-1) ve cevap ja/nein/doch | 2 (5) | G04 | 2 | P | Türkçede `mi` eki; Almancada fiil başa geçer: *Wohnst du in Berlin?* `doch` (olumsuz soruya olumlu cevap) Türkçede "yoo, var" gibi; ayrıca öğretilmeli. |
| G08 | Sayılar 0–100, sonra 100–1 Mio. | 0, 2, 5 | G01 | 3 | P | 21–99 ters okunur: *einundzwanzig* = bir-ve-yirmi. Türkçeden tamamen farklı, dinlemede çok hata. Saat ve fiyatta yoğun tekrar gerekli. |
| G09 | `haben` fiilinin çekimi | 3 | G03 | 2 | P | Türkçe "var" yapısı (*Bir kardeşim var*) yerine *Ich habe einen Bruder*: sahip olan özne olur. Akkusativ'i önceden sezdirir. |
| G10 | İsmin cinsiyeti ve belirli artikel (der/die/das) | 3–4 | G01 | 5 | P | **Türkçede gramer cinsiyeti ve artikel yoktur — en büyük kalıcı zorluk.** Kural setleri (‑ung/‑heit/‑keit → die, ‑chen/‑lein → das, ‑er (kişi) → der) + renk kodlu ezber + SRS. |
| G11 | Belirsiz artikel (ein/eine) ve Nominativ | 4 | G10 | 3 | P | `ein` ≈ "bir" (avantaj), ama ein/eine çekimli. Türkçede "bir" sık düşer; Almancada sayılabilir tekil isimde artikel zorunlu: *Das ist **ein** Tisch*. |
| G12 | Possessivartikel mein/dein/Ihr (Nominativ) | 3 | G10 | 3 | P | Türkçede iyelik eki (*annem*); Almancada önde ayrı kelime + cinsiyete göre ek: *mein Vater / meine Mutter*. |
| G13 | Çoğul (Plural) — 5 temel tip (‑e, ‑(e)n, ‑er, ‑s, ‑/Umlaut) | 3–5 | G10 | 4 | P | Türkçe tek kural (‑ler/‑lar). Almancada çoğul ezberlenir; çoğul artikeli hep `die`. Türkçe sayıdan sonra tekil kullanır (*iki kitap*) → Almancada *zwei Bücher* olmalı; tipik hata. |
| G14 | `möchte` (istek) ve `ich hätte gern` kalıbı | 4 | G06 | 2 | P | Kalıp olarak öğret; Modalverb mantığı Ünite 7/10'da açılır. Fiil sonda (*Ich möchte einen Kaffee **trinken***) — Türkçe sıralamaya benzer (avantaj). |
| G15 | Akkusativ — belirli/belirsiz artikel (den/einen) | 4–5 | G11 | 4 | P | Türkçe belirtme hâli (‑i) ile köprü kur: *Ich sehe **den** Mann* = Adam**ı** görüyorum. Ama sadece maskulin değişir; Türkçede belirsiz nesne eksizdir (*bir kahve istiyorum*) oysa Almancada *einen Kaffee* çekimlidir. |
| G16 | Olumsuzluk: `nicht` ve `kein` | 5 | G15 | 3 | P | `kein` = artikelli isim olumsuzu (*kein Auto* = araba yok/değil), `nicht` = fiil/sıfat/belirli öğe. Türkçede "yok/değil/‑me" üç farklı yapı; eşleştirme tablosu verilmeli. `nicht`in yeri değişken → çok örnekle. |
| G17 | Fiil: kök ünlü değişimi (e→i/ie, a→ä): essen, sprechen, sehen, lesen, fahren, schlafen | 7 | G06 | 3 | P | Sadece du/er-sie-es formunda değişir. Ezber listesi + çekim tablosu. |
| G18 | Trennbare Verben (aufstehen, einkaufen, anrufen, fernsehen) ve Satzklammer | 6 | G04 | 4 | P | Türkçede analogu yok. Ön ek cümle sonuna gider: *Ich **stehe** um 7 Uhr **auf**.* Avantaj: Türkçe fiil-sonu sezgisi, "ek sonda" mantığını kolaylaştırır. Vurgu ön ekte (AUFstehen). |
| G19 | Zaman edatları: um, am, im, von … bis (saat/gün/ay) | 6 (11) | G08 | 3 | P | *um 8 Uhr, am Montag, im Mai* — Türkçede hepsi "‑de/saat 8'de". Tablo halinde ezber. |
| G20 | Saat (offiziell + inoffiziell: halb, Viertel nach/vor) | 6 | G08 | 4 | P | `halb drei` = 2:30 (Türkçede "iki buçuk") — **çok sık hata.** Görsel saat alıştırması şart. |
| G21 | Modalverb `können` (yetenek, olasılık) | 7 | G18 | 3 | P | Türkçe ‑ebil eki; Almancada ayrı fiil + mastar sonda: *Ich **kann** gut **schwimmen**.* Satzklammer'ın 2. örneği. |
| G22 | `gern / lieber / am liebsten` (sevme, tercih) | 7 (20) | G06 | 2 | P | *Ich spiele **gern** Fußball* = Futbol oynamayı severim; Türkçedeki "sevmek" fiili yerine zarf. |
| G23 | Konnektoren `und, aber, oder` (Hauptsatz + Hauptsatz) | 2–7 | G04 | 1 | P | Kelime sırasını değiştirmez (Position 0) — kolay. |

### 4.3 A1.2 (Ünite 8–14)

| ID | Konu | Ünite | Önkoşul | Zorluk | Mod | Türkçe konuşan için not |
|---|---|---|---|---|---|---|
| G24 | Possessivartikel tümü (sein, ihr, unser, euer, Ihr) — Nom + Akk | 8 (12) | G12, G15 | 4 | P | `ihr` = onun (kadın) / onların / sizin (ihr-Plural değil!) karışıklığı. Sahibin cinsiyetine göre kök (sein/ihr), sahip olunanın cinsiyet/hâline göre ek. Türkçede tek ek: *‑ı/‑i*. |
| G25 | `es gibt` + Akkusativ | 8 | G15 | 2 | P | "var" karşılığı: *Es gibt **einen** Park.* Türkçe "var" ile doğrudan eşleşir (avantaj), ama Akk unutulur. |
| G26 | Lokale Angaben: hier/dort, links/rechts, oben/unten; Adjektiv prädikativ (Die Wohnung ist groß.) | 8 | G03 | 1 | P | Kolay; Adjektiv yüklem konumda çekimsiz. |
| G27 | Imperativ (Sie-Form) | 9 | G18 | 2 | P | *Gehen Sie geradeaus!* — Türkçe emir kipine benzer; fiil başa. |
| G28 | Dativ — giriş: mit, zu, bei, aus, von, nach + Dativ (dem/der/dem/den+n) | 9 (14) | G15 | 5 | P | Türkçe yönelme (‑e) / ayrılma (‑den) / bulunma (‑de) hâlleriyle kısmen köprü ama **birebir değil**: *mit dem Bus* (otobüs‑le), *zum Bahnhof* (istasyon‑a), *aus der Türkei* (Türkiye'‑den). Kısaltmalar zum/zur/beim/vom. Edat → hâl ezberi. |
| G29 | Ordnungszahlen (der erste, zweite …) ve Datum | 9 (11) | G08 | 3 | P | *am ersten Mai*, *der 3. Oktober* — ‑te/‑ste ekleri. |
| G30 | Modalverben `müssen, wollen, dürfen, sollen` (Präsens) | 10 (12) | G21 | 3 | P | `müssen nicht` = gerek yok (yasak değil!), yasak = `nicht dürfen`. Türkçede "‑memeli" ↔ hata kaynağı. |
| G31 | Präteritum `sein` ve `haben` (war, hatte) | 10 | G03, G09 | 2 | P | Konuşmada da Präteritum kullanılır (Perfekt değil). Türkçe ‑di ile köprü. |
| G32 | Berufe: maskulin/feminin (‑in), Nationalitäten | 10 | G10 | 2 | P | *Lehrer / Lehrerin*. Türkçede cinsiyetsiz; kendini tanıtırken *Ich bin Lehrer* (artikelsiz!). |
| G33 | Perfekt — `haben` + Partizip II (düzenli: ge‑…‑t) | 11 | G18, G21 | 4 | P | Türkçe ‑di tek ek; Almancada yardımcı fiil + Partizip sonda (Satzklammer). Trennbare: *ein**ge**kauft*, ‑ieren fiilleri ge‑ almaz (*telefoniert*). |
| G34 | Perfekt — `sein` ile (hareket/durum değişimi) + düzensiz Partizip (‑en) | 13 | G33 | 4 | P | haben/sein seçimi kuralı: A'dan B'ye hareket + bleiben/sein/werden. Düzensiz Partizip listesi (~60 fiil A1–A2) SRS ile. |
| G35 | Imperativ (du / ihr) | 12 | G27, G17 | 3 | P | du-formunda ‑st düşer, özne yok: *Komm!, Nimm!, Sei ruhig!* Kök ünlü değişimi (e→i) korunur, a→ä korunmaz (*Fahr!*). |
| G36 | Personalpronomen Akkusativ (mich, dich, ihn, sie, es, uns, euch) | 13 | G15, G02 | 3 | P | Nesneyi cinsiyetiyle anmak (*Der Rock? Ich nehme **ihn**.*) — Türkçede eşyalar için "onu" tek; cinsiyet hafızası gerekir. |
| G37 | Fragewort/Demonstrativ `welch‑ / dies‑` (Nom, Akk) | 13 | G15 | 3 | P | *Welchen Pullover? — Diesen hier.* Artikel ekleri ile aynı mantık. |
| G38 | Personalpronomen Dativ (mir, dir, ihm, ihr, uns, euch, ihnen, Ihnen) + Wie geht es dir? / Das gefällt mir. | 14 (12) | G28 | 4 | P | `gefallen, gehören, passen, schmecken, helfen` + Dativ: Türkçede *Bu bana uyuyor* (‑e) ile **iyi eşleşir** — avantaj olarak sun. `fragen` + Akk ama Türkçede "‑e sormak" — uyarı. Kalıplar Ünite 1'den chunk olarak (Wie geht es **dir**?). |
| G39 | Wechselpräpositionen — giriş: wo? + Dativ (in, an, auf, unter, über, vor, hinter, neben, zwischen) | 14 (16) | G28 | 4 | P | Önce sadece "nerede?" (Dativ) — ev/şehir bağlamında. Türkçe ‑de ile güçlü köprü. |
| G40 | Konnektor `denn` (çünkü — ana cümle sırası) | 14 | G23 | 2 | P | `weil`den önce: fiil yeri değişmez, kolay. |

### 4.4 A2.1 (Ünite 15–21)

| ID | Konu | Ünite | Önkoşul | Zorluk | Mod | Türkçe konuşan için not |
|---|---|---|---|---|---|---|
| G41 | Präteritum Modalverben (konnte, musste, wollte, durfte, sollte) + Perfekt tekrarı | 15 | G30, G31, G34 | 3 | P | Anlatıda yaygın. *Als Kind **musste** ich früh aufstehen.* |
| G42 | Nebensatz `weil` (fiil sonda) | 15 (17) | G40, G04 | 3 | P | **Türkçe sezgisi avantaj:** yan cümlede çekimli fiil sonda, Türkçe sırasına benzer. Zorluk: virgül + ana cümle ile Nebensatz başta gelince *Weil ich krank bin, **bleibe** ich zu Hause* (fiil‑fiil). |
| G43 | Wechselpräpositionen tam: wohin? + Akk / wo? + Dat; stellen/stehen, legen/liegen, hängen, setzen/sitzen | 16 | G39, G15 | 5 | P | Türkçe ‑e/‑de ayrımıyla iyi köprü (*masaya koy* = auf den Tisch, *masada* = auf dem Tisch). Zor kısım: fiil çiftleri ve artikel çekimi. |
| G44 | Lokale Präpositionen (Ziel/Ort): nach/in/zu, in/bei/an + Ländernamen, Inseln, Meer | 16 | G43 | 4 | P | *nach Berlin, in die Türkei, ans Meer, zum Arzt* — tablo + bol örnek. |
| G45 | Nebensatz `dass` + Meinung (Ich finde/glaube/denke, dass …) | 17 | G42 | 3 | P | Türkçede ‑dığını nominalleştirme; Almancada bağlaç + fiil sonda. Yine kelime sırası Türkçeye yakın. |
| G46 | Konnektor `deshalb` (Inversion) ve `trotzdem` | 17 (27) | G04, G42 | 4 | P | `deshalb` Position 1 alır → fiil hemen sonra: *Ich bin müde, deshalb **gehe** ich ins Bett.* `weil` ile karıştırma alıştırması. |
| G47 | Adjektivdeklination — unbestimmter Artikel + Nullartikel (Nom/Akk) | 18 | G15, G26 | 5 | P | **A2'nin en zor konusu.** Türkçede sıfat hiç çekilmez. Önce sadece Nom+Akk ve en sık kalıplar (*einen schwarzen Kaffee, ein kleines Bier*). "Sinyal" yöntemi: artikel sinyal veremezse sıfat verir. |
| G48 | Konjunktiv II nezaket: hätte gern, würde gern, könnte, möchte (tekrar) | 18 (22) | G30 | 3 | P | Türkçe ‑sa/‑ar mıydı ile köprü (*Yardım edebilir miydiniz?* = *Könnten Sie helfen?*). Önce chunk, sonra yapı. |
| G49 | Reflexive Verben (sich waschen, sich fühlen, sich freuen, sich erkälten) — Akk reflexif | 19 | G36 | 3 | P | Türkçe ‑n‑ / "kendini" ile köprü; ama Almancada çok daha fazla fiil refleksif (*sich beeilen* = acele etmek). Sözlükte `sich` ile birlikte ezber. |
| G50 | Nebensatz `wenn` (koşul/zaman) | 19 | G42 | 3 | P | Türkçe ‑se/‑ince. `wenn` vs `ob` vs `als` ayrımı A2.2'de. |
| G51 | Dativverben + Dat+Akk sırası (geben, schenken, zeigen, empfehlen: *Ich schenke **meiner Mutter einen Schal***) | 20 | G38 | 4 | P | Türkçede *Anneme bir şal hediye ediyorum* — ‑e/‑i ile **çok iyi eşleşir**; bunu vurgula. Zamirlerde sıra değişir (*Ich schenke **ihn ihr***) — R düzeyinde. |
| G52 | Komparativ ve Superlativ (+ als / wie, am …sten) | 20 | G26 | 2 | P | *größer **als*** = ‑den daha büyük; *so groß **wie*** = kadar. Düzensizler: gut‑besser‑am besten, viel‑mehr, gern‑lieber. Türkçe "daha/en" ile kolay. |
| G53 | Adjektivdeklination — bestimmter Artikel (Nom/Akk/Dat) | 20 (24) | G47 | 4 | P | ‑e/‑en iki ek yeterli (zayıf çekim). Önce bu kolay tabloyu ver, sonra G47 ile karşılaştır. |
| G54 | Indirekte Fragen (ob / W‑Wort + Nebensatz): *Können Sie mir sagen, wann der Zug fährt?* | 21 | G42 | 3 | P | Nezaket için kritik. Türkçe ‑ip ‑mediğini yapısı; Almancada yine fiil sonda (avantaj). |
| G55 | Verben mit Präpositionen (warten auf, sich freuen auf/über, sich interessieren für, denken an) + wo(r)‑/da(r)‑ | 21 (25) | G49, G43 | 4 | P/R | Edat kelimeyle ezberlenir (Türkçede hâl eki: *‑i beklemek* vs *warten **auf** + Akk*). wo(r)/da(r) A2'de çoğunlukla R. |

### 4.5 A2.2 (Ünite 22–28)

| ID | Konu | Ünite | Önkoşul | Zorluk | Mod | Türkçe konuşan için not |
|---|---|---|---|---|---|---|
| G56 | Konjunktiv II: Wünsche & Ratschläge (Ich würde gern…, Du solltest…, Ich hätte gern…, An deiner Stelle würde ich…) | 22 | G48 | 3 | P | Dilek/tavsiye; Türkçe ‑meli/‑sen iyi olur ile köprü. |
| G57 | Infinitiv mit `zu` (Ich habe keine Lust/Zeit, … zu …; Es ist wichtig, … zu …; vergessen, versuchen, anfangen) | 22 | G33 | 3 | P | Türkçe ‑mek/‑meyi. Trennbare'da zu araya girer: *an**zu**rufen*. |
| G58 | Temporale Präpositionen: seit, vor, nach, in, für, ab, bis (+ Dativ) | 23 | G28, G19 | 3 | P | *seit drei Jahren* = üç yıl**dır** — Türkçe ‑dir ile köprü; **Präsens** kullanılır (*Ich wohne seit 2 Jahren hier*), Perfekt değil. *vor einem Jahr* = bir yıl önce. |
| G59 | Passiv Präsens (werden + Partizip II) — tanıma düzeyi | 23 | G33 | 3 | R | Resmi tabelalar/talimatlarda: *Das Formular **wird** online **ausgefüllt**.* Türkçe edilgen ‑il/‑in ile köprü. Üretim beklenmez. |
| G60 | Genitiv‑s (Annas Auto) ve `von` + Dativ ile sahiplik | 24 | G28 | 1 | P | Genitiv artikel çekimi B1; A2'de sadece özel isim ‑s + *von*. |
| G61 | Nebensatz `als` (geçmişte tek olay) vs `wenn` (tekrar/şimdiki) | 24 | G50, G41 | 4 | P/R | Türkçe ‑dığında tek yapı; ayrım ezberle değil zaman çizelgesi görseliyle. |
| G62 | Verben mit Präpositionen + Reflexiv genişletme (sich ärgern über, sich verlieben in, sich streiten mit) | 25 | G55 | 4 | P | Duygu fiilleri; ilişki ünitesi bağlamında. |
| G63 | Indefinitpronomen (man, jemand, niemand, etwas, nichts, alle, viele) | 26 | G02 | 2 | P | `man` = genel özne (Türkçe edilgen/‑ılır): *Hier **darf man** nicht rauchen.* |
| G64 | Futur I (werden + Infinitiv) ve Präsens + Zeitangabe ile gelecek | 26–27 | G30 | 2 | P | Almancada gelecek çoğu zaman Präsens ile: *Morgen **fahre** ich nach Köln.* Türkçe ‑ecek'e her zaman Futur deme. Hava tahmini bağlamında: *Es wird regnen.* |
| G65 | `werden` ana fiil (Ich werde Arzt / Es wird kalt) | 27 | G06 | 2 | P | "olmak/haline gelmek" — sein ile karıştırma. |
| G66 | Konnektoren tekrar + `sondern`, `entweder … oder`, `nicht nur … sondern auch` (R) | 27 | G23 | 2 | P/R | `aber` vs `sondern` (Türkçe ikisi de "ama/aksine"). |
| G67 | Relativsatz (Nominativ/Akkusativ) — **sadece tanıma** | 28 | G42, G15 | 4 | R | Goethe A2 metinlerinde görülebilir; üretimi B1. *Das ist der Mann, **der** neben mir wohnt.* Türkçe ‑an/‑dığı sıfat fiil yapısı ters sırada. |

> **Not:** Tablo 67 ID içeriyor; G59 ve G67 tamamen alımlayıcıdır. Görev metnindeki örnek sıralama (Aussprache → sein/haben → Präsens → W‑Fragen → Artikel → Nominativ → Akkusativ → Negation → Modalverben → trennbare Verben → Perfekt → Dativ → Wechselpräpositionen → Possessiv → Imperativ → Präteritum → Nebensätze → Komparativ → reflexiv → Adjektivdeklination → Konjunktiv II) korunmuş; iki bilinçli sapma var: (1) **trennbare Verben, können'den önce** (Ünite 6 "Tagesablauf" doğal bağlamı; Satzklammer mantığı bir kez oturunca Modalverb kolaylaşır), (2) **Possessiv Nom erken (Ünite 3, aile)**, tam tablo A1.2'de.

### 4.6 Bağımlılık grafiği (özet)

```
G01 Alfabe ─┬─> G08 Sayılar ──> G19/G20 Saat-Zaman ──> G58 Temporal Präp.
            └─> G10 Artikel ──> G11 ein/eine ──> G15 Akkusativ ─┬─> G16 nicht/kein
                     │                                          ├─> G25 es gibt
                     ├─> G12 Possessiv Nom ──> G24 Possessiv tüm ├─> G36 Pron. Akk ──> G49 Reflexiv ──> G55/G62 Verb+Präp
                     └─> G13 Plural                              ├─> G28 Dativ ─┬─> G38 Pron. Dat ──> G51 Dat+Akk
                                                                 │              └─> G39 Wechselpräp(wo) ──> G43 (wohin) ──> G44
                                                                 └─> G47 Adj.dekl. unbestimmt ──> G53 bestimmt
G02 Pronomen ─> G03 sein ─> G04 V2 ─┬─> G05 W-Fragen / G07 Ja-Nein
                                     ├─> G18 trennbar ─> G21 können ─> G30 Modal ─> G41 Prät. Modal
                                     │                     └──────────> G33 Perfekt haben ─> G34 Perfekt sein ─> G57 zu-Inf
                                     └─> G23 und/aber ─> G40 denn ─> G42 weil ─┬─> G45 dass ─> G54 ob/W
                                                                              ├─> G46 deshalb
                                                                              └─> G50 wenn ─> G61 als/wenn
G03 + G09 ─> G31 war/hatte ─> G41
G30 ─> G48 Konj. II höflich ─> G56 Konj. II Rat/Wunsch
```

---

## 5. Kelime hedefleri

### 5.1 Hedef sayılar

| Seviye | Goethe Wortliste (yaklaşık) | Sistem hedefi — **aktif** (üretebilmeli) | Sistem hedefi — **pasif** (tanımalı) | Açıklama |
|---|---|---|---|---|
| A1 (Start Deutsch 1) | ~650 madde | **700** | +100 (tabela/menü/form kelimeleri) | Goethe listesi sözcük ailesi içerir (ör. *fahren, die Fahrt, die Fahrkarte* ayrı madde); sayılar/günler/aylar gruplanır. Sisteme 700 kart olarak dökülür. |
| A2 (Goethe-Zertifikat A2) | ~1300 madde (A1 dahil, kümülatif) | **1350** | +300 | A1'in üzerine ~650 yeni madde. Pasif liste: sınav metinlerinde çıkan, üretim beklenmeyen kelimeler (*die Anmeldung, das Formular ausfüllen* vb. aktif; *die Gebühr, der Antrag* pasif başlar). |

**Doğrulama notu:** Goethe-Institut'un yayımladığı Wortliste'ler "ca. 650" (A1) ve "ca. 1300" (A2) madde olarak bilinir; ayrıca ek listeler (sayılar, ülkeler, tarihler, kısaltmalar) içerir. İçerik ekibi (veya script) Goethe PDF'lerini düz metne çevirip `vocab.json` ile **lemma bazında** karşılaştırmalı; eksik kalan Goethe kelimeleri "Ergänzung" ünitesi kartları olarak eklenmelidir (bkz. §5.4).

### 5.2 Kelime dağılımı (üniteye göre)

| Ünite | Başlık (kısa) | Yeni aktif | Yeni pasif | Kümülatif aktif |
|---|---|---|---|---|
| 0 | Laute & Buchstaben | 40 | 0 | 40 |
| 1 | Hallo! | 40 | 10 | 80 |
| 2 | Zahlen & Kontakte | 40 | 10 | 120 |
| 3 | Familie | 45 | 10 | 165 |
| 4 | Essen & Trinken | 55 | 15 | 220 |
| 5 | Einkaufen | 50 | 15 | 270 |
| 6 | Mein Tag | 45 | 10 | 315 |
| 7 | Freizeit | 45 | 10 | 360 |
| 8 | Wohnen | 55 | 15 | 415 |
| 9 | In der Stadt | 50 | 15 | 465 |
| 10 | Arbeit & Beruf | 50 | 15 | 515 |
| 11 | Termine | 45 | 10 | 560 |
| 12 | Gesundheit | 50 | 15 | 610 |
| 13 | Kleidung & Wetter | 50 | 10 | 660 |
| 14 | Unterwegs (A1-Abschluss) | 40 | 10 | **700** |
| 15 | Erinnerungen | 45 | 15 | 745 |
| 16 | Urlaub & Reisen | 55 | 20 | 800 |
| 17 | Nachbarn & Zusammenleben | 45 | 15 | 845 |
| 18 | Restaurant & Einladung | 50 | 15 | 895 |
| 19 | Arzt & Apotheke | 55 | 20 | 950 |
| 20 | Geschenke & Mode | 50 | 15 | 1000 |
| 21 | Medien & Kommunikation | 50 | 20 | 1050 |
| 22 | Arbeitswelt & Bewerbung | 55 | 25 | 1105 |
| 23 | Ämter & Dienstleistungen | 55 | 30 | 1160 |
| 24 | Feste & Feiern | 45 | 15 | 1205 |
| 25 | Beziehungen & Gefühle | 45 | 15 | 1250 |
| 26 | Natur, Wetter & Umwelt | 45 | 20 | 1295 |
| 27 | Lernen & Zukunft | 40 | 20 | 1335 |
| 28 | Mein Leben in D-A-CH (A2-Abschluss) | 15 | 10 | **~1350** |
| | **Toplam** | **~1350** | **~430** | |

### 5.3 Kelime kartı kuralları

- **İsim**: `artikel` + `de` + `plural` zorunlu (*der Tisch, ‑e*). Sadece çoğul kullanılanlar (*die Eltern*) `pluralOnly: true`.
- **Fiil**: mastar + düzensizse 3. tekil + Partizip II + yardımcı fiil (*fahren, fährt, ist gefahren*); `separable: true/false`; `reflexive`; `case`/`prep` (*helfen + D*, *warten auf + A*).
- **Sıfat**: düzensiz Komparativ (*gut – besser – am besten*).
- **Her kartta**: 1 örnek cümle (sadece o ünitede açık olan gramer ile!), TR çeviri, ses dosyası, frekans bandı (`freq: 1–5`), `goethe: "A1"|"A2"|null`.
- **D‑A‑CH varyantları**: Gerektiğinde `variants` (*Brötchen / Semmel (A) / Weggli (CH)*, *Samstag / Sonnabend*, *Tschüs / Servus*). Pasif.

### 5.4 Goethe listesiyle doğrulama süreci (öneri)

1. Goethe A1/A2 Wortliste PDF → metin; lemma listesi çıkar (`goethe_a1.txt`, `goethe_a2.txt`).
2. `scripts/check-vocab.js`: ünitelerdeki tüm `vocab.de` lemmalarını topla → Goethe listesiyle küme farkı.
3. Rapor: (a) Goethe'de olup sistemde olmayan → ilgili temaya ata; (b) sistemde olup Goethe'de olmayan → `goethe: null` işaretle (tema için gerekliyse kalabilir, ör. *das Döner*).
4. Hedef: Goethe A1 listesinin **≥%95**'i A1 ünitelerinde, A2 listesinin **≥%95**'i A2 sonunda aktif ya da pasif olarak yer almalı.

---

## 6. Yüksek frekanslı kalıplar (chunks)

> Kalıplar, analiz edilmeden **bütün olarak** öğretilir; ilgili gramer daha sonra açıldığında "Bu kalıbı hatırlıyor musun?" bağlantısı kurulur. SRS'te ayrı kart tipi (`type: "chunk"`).

| # | Almanca kalıp | Türkçe | Kullanım / not | Ünite |
|---|---|---|---|---|
| 1 | Guten Morgen / Guten Tag / Guten Abend / Gute Nacht | Günaydın / İyi günler / İyi akşamlar / İyi geceler | Saate göre | 0 |
| 2 | Hallo! / Tschüs! / Auf Wiedersehen! | Merhaba / Hoşça kal / Görüşmek üzere (resmi) | | 0 |
| 3 | Wie geht's? — Gut, danke. Und dir/Ihnen? | Nasılsın? — İyiyim, teşekkürler. Ya sen/siz? | Dativ chunk (G38 öncesi) | 1 |
| 4 | Wie heißt du? / Wie heißen Sie? — Ich heiße … | Adın ne? / Adınız ne? — Adım … | | 1 |
| 5 | Woher kommst du? — Ich komme aus der Türkei. | Nerelisin? — Türkiye'denim. | *aus der Türkei* (artikelli ülke!) | 1 |
| 6 | Wo wohnst du? — Ich wohne in … | Nerede oturuyorsun? — …'de oturuyorum. | | 1 |
| 7 | Freut mich! / Schön, dich kennenzulernen. | Memnun oldum. | | 1 |
| 8 | Entschuldigung! | Affedersiniz! (dikkat çekme + özür) | | 1 |
| 9 | Wie bitte? | Efendim? Anlamadım. | Hayati! | 1 |
| 10 | Können Sie das bitte wiederholen? | Tekrar edebilir misiniz? | | 1 |
| 11 | Sprechen Sie bitte langsam(er). | Lütfen (daha) yavaş konuşun. | | 1 |
| 12 | Ich verstehe (das) nicht. | Anlamıyorum. | | 1 |
| 13 | Wie schreibt man das? — Können Sie das buchstabieren? | Bu nasıl yazılır? — Harf harf söyler misiniz? | | 2 |
| 14 | Wie ist Ihre Telefonnummer / Adresse? | Telefon numaranız / adresiniz nedir? | | 2 |
| 15 | Wie alt bist du? — Ich bin … Jahre alt. | Kaç yaşındasın? — … yaşındayım. | | 2 |
| 16 | Was heißt … auf Deutsch? | … Almancada ne demek? | Öğrenme stratejisi | 2 |
| 17 | Ich hätte gern … | … alabilir miyim / … istiyorum (kibar) | Konj. II chunk | 4 |
| 18 | Ich möchte … / Ich nehme … | … istiyorum / … alıyorum | | 4 |
| 19 | Was kostet das? / Wie viel kostet …? | Bu ne kadar? | | 4 |
| 20 | Zahlen, bitte! / Die Rechnung, bitte! | Hesap lütfen! | | 4 |
| 21 | Zusammen oder getrennt? | Birlikte mi, ayrı mı (ödeme)? | Almanya'ya özgü | 4 |
| 22 | Stimmt so. | Üstü kalsın. | | 4 |
| 23 | Guten Appetit! / Prost! | Afiyet olsun! / Şerefe! | | 4 |
| 24 | Haben Sie …? / Gibt es …? | … var mı? | | 5 |
| 25 | Ich suche … | … arıyorum | | 5 |
| 26 | Kann ich mit Karte zahlen? | Kartla ödeyebilir miyim? | | 5 |
| 27 | Sonst noch etwas? — Nein, danke, das ist alles. | Başka bir şey? — Hayır, hepsi bu. | | 5 |
| 28 | Wie spät ist es? / Wie viel Uhr ist es? | Saat kaç? | | 6 |
| 29 | Um wie viel Uhr …? | Saat kaçta …? | | 6 |
| 30 | Hast du Zeit? / Hast du Lust, … zu …? | Vaktin var mı? / … ister misin? | *zu*-chunk (G57 öncesi) | 7 |
| 31 | Gute Idee! / Das klingt gut. / Leider kann ich nicht. | İyi fikir! / Kulağa hoş geliyor. / Maalesef olmaz. | | 7 |
| 32 | Wie findest du …? — Ich finde … super/langweilig. | …'i nasıl buluyorsun? | | 7 |
| 33 | Wie komme ich zum/zur …? | …'e nasıl giderim? | Dativ chunk | 9 |
| 34 | Gehen Sie geradeaus / links / rechts. | Düz / sola / sağa gidin. | | 9 |
| 35 | Ist das weit? — Nein, nur fünf Minuten zu Fuß. | Uzak mı? — Yürüyerek 5 dk. | | 9 |
| 36 | Was sind Sie von Beruf? — Ich bin … / Ich arbeite als … | Mesleğiniz ne? | | 10 |
| 37 | Ich möchte einen Termin machen/vereinbaren. | Randevu almak istiyorum. | | 11 |
| 38 | Geht es am Montag? — Ja, das passt. / Nein, da kann ich leider nicht. | Pazartesi olur mu? — Uyar. / Maalesef olmaz. | | 11 |
| 39 | Was fehlt Ihnen? / Was tut Ihnen weh? | Neyiniz var? / Neresi ağrıyor? | | 12 |
| 40 | Ich habe Kopfschmerzen / Fieber. Mir ist schlecht. | Başım ağrıyor / Ateşim var. Midem bulanıyor. | *Mir ist* Dativ-chunk | 12 |
| 41 | Gute Besserung! | Geçmiş olsun! | | 12 |
| 42 | Das steht dir gut! / Kann ich das anprobieren? | Sana yakışmış! / Deneyebilir miyim? | | 13 |
| 43 | Wie ist das Wetter? — Es regnet / Es ist sonnig. | Hava nasıl? — Yağmur yağıyor / Güneşli. | | 13 |
| 44 | Eine Fahrkarte nach …, bitte. Einfach oder hin und zurück? | …'e bir bilet lütfen. Tek yön mü gidiş-dönüş mü? | | 14 |
| 45 | Von welchem Gleis fährt der Zug? | Tren hangi perondan kalkıyor? | | 14 |
| 46 | Es tut mir leid. / Das macht nichts. | Üzgünüm. / Önemli değil. | | 11 |
| 47 | Können Sie mir helfen? / Könnten Sie bitte …? | Bana yardım edebilir misiniz? / … rica etsem? | | 9 → 18 |
| 48 | Kein Problem! / Gern geschehen! / Bitte schön! | Sorun değil! / Rica ederim! | | 4 |
| 49 | Viel Glück! / Viel Spaß! / Alles Gute! | Bol şans! / İyi eğlenceler! / Her şey gönlünce! | | 7, 24 |
| 50 | Herzlichen Glückwunsch zum Geburtstag! | Doğum günün kutlu olsun! | | 24 |
| 51 | Ich habe eine Frage. / Ich habe da ein Problem. | Bir sorum var. / Bir sorunum var. | | 17 |
| 52 | Ich bin der Meinung, dass … / Ich glaube, dass … | Bence … / Sanırım … | G45 | 17 |
| 53 | Das stimmt. / Da hast du recht. / Das sehe ich anders. | Doğru. / Haklısın. / Ben farklı düşünüyorum. | | 17 |
| 54 | Wie wäre es mit …? / Was hältst du von …? | … nasıl olur? / … hakkında ne düşünüyorsun? | Plan yapma (A2 Sprechen T3) | 18, 24 |
| 55 | Ich würde gern … / Am liebsten würde ich … | … yapmak isterdim. | | 18, 22 |
| 56 | Ich hätte gern einen Tisch für zwei Personen. | İki kişilik bir masa istiyorum. | | 18 |
| 57 | Ich fühle mich nicht wohl. | Kendimi iyi hissetmiyorum. | Reflexiv chunk | 19 |
| 58 | Wie oft soll ich die Tabletten nehmen? | İlaçları ne sıklıkla almalıyım? | | 19 |
| 59 | Können Sie mir sagen, wo/wann/ob …? | Bana … söyleyebilir misiniz? | G54 | 21 |
| 60 | Ich interessiere mich für … | … ile ilgileniyorum. | | 21, 22 |
| 61 | Ich bewerbe mich um die Stelle als … | … pozisyonuna başvuruyorum. | | 22 |
| 62 | Mit freundlichen Grüßen / Viele Grüße / Liebe Grüße | Saygılarımla / Selamlar / Sevgiler | E-posta kapanışı (Schreiben!) | 11, 22 |
| 63 | Sehr geehrte Damen und Herren, … / Liebe Anna, … | Sayın yetkili / Sevgili Anna | E-posta açılışı | 11, 22 |
| 64 | Ich möchte mich anmelden / ein Konto eröffnen. | Kayıt olmak / hesap açmak istiyorum. | | 23 |
| 65 | Welche Unterlagen brauche ich? | Hangi belgelere ihtiyacım var? | | 23 |
| 66 | Ich freue mich auf … / Ich freue mich über … | …'i dört gözle bekliyorum / …'e seviniyorum | G55 | 24 |
| 67 | Schade! / Toll! / Echt? / Wirklich? / Na ja … | Yazık! / Harika! / Cidden mi? / Eh … | Tepki verme | 7–25 |
| 68 | Ich weiß (es) nicht. / Keine Ahnung. | Bilmiyorum. / Hiçbir fikrim yok. | | 2 |
| 69 | Moment, bitte. / Einen Augenblick, bitte. | Bir dakika lütfen. | Telefonda | 11 |
| 70 | Ich rufe wegen … an. | … nedeniyle arıyorum. | Telefon görüşmesi | 23 |

---

## 7. Telaffuz modülü

Telaffuz iki katmanlıdır: **(a) Ünite 0 — "Laute & Buchstaben"** başlangıç modülü (4–6 saat), **(b) her ünitenin 6. dersinde 10 dakikalık "Aussprache-Ecke"** (o ünitenin kelimelerinden seçilmiş, spiral).

### 7.1 Ses tablosu ve Türkçe karşılık

| # | Konu | Yazım → ses (IPA) | Türkçe yaklaşık | Örnek kelimeler | Minimal çift / alıştırma | TR zorluk notu |
|---|---|---|---|---|---|---|
| P01 | Alfabe | A [aː] B [beː] C [tseː] … J [jɔt] … V [faʊ] W [veː] Y [ˈʏpsilɔn] Z [tsɛt] | — | ABC, VW, BMW, USA | Harf dikte; isim kodlama | V/W/J/Y/Z adları Türkçe sezgiye ters. |
| P02 | Umlaut ä, ö, ü | ä [ɛ/ɛː], ö [ø/øː], ü [y/yː] | e, ö, ü | Käse, schön, Tür, müde, Mädchen | *schon–schön, Mutter–Mütter, Bruder–Brüder* | **Avantaj:** ö/ü Türkçede var. ä ≈ açık "e". |
| P03 | Uzun / kısa ünlü | Uzun: çift ünlü (Tee), ünlü+h (Sohn), ie, tek ünsüz önce (Weg); Kısa: çift ünsüz önce (Bett, Mutter), ck, tz | Türkçede ayırt edici değil | Staat–Stadt, Miete–Mitte, Ofen–offen, Höhle–Hölle, bieten–bitten | Minimal çift dinle-seç (20+ çift) | **Zor:** Türkçe konuşan uzunluğu duymaz/yapmaz; anlam değişir (*Stadt/Staat*). Görsel: uzun ünlüyü çizgiyle göster. |
| P04 | e‑Schwa ve ‑er | Vurgusuz e [ə] (bitte, haben), ‑er [ɐ] (Vater, Lehrer) | ı'ya yakın / "a"ya yakın | bitte, Name, Lehrer, Mutter, besser | Lehrer ≠ "lehrer" (r okunmaz) | "Vater"ı "fater" diye r ile okuma hatası. |
| P05 | ch [ç] (Ich-Laut) | i, e, ä, ö, ü, ei, eu, l, n, r'den sonra ve ‑chen | Türkçe yok; "hiç" deki h'ye yakın, dil ileride | ich, nicht, Milch, Mädchen, Küche, Brötchen | ich – isch (Fehler) | "iş/ik" deme eğilimi. Egzersiz: "j" (yük) sesini sessizce fısılda. |
| P06 | ch [x] (Ach-Laut) | a, o, u, au'dan sonra | Türkçe "ağ, Ahmet" sert h'ye benzer, gırtlaktan | Buch, acht, Nacht, auch, kochen | Buch–Bücher (x→ç), Nacht–Nächte | Kural görsel: arka ünlü → [x], ön ünlü → [ç]. |
| P07 | chs, ‑ig | chs [ks] (sechs, wachsen); ‑ig sonda [ɪç] (zwanzig, billig) | ks; ‑iç | sechs, Fuchs, zwanzig, König, ruhig | dreißig, vierzig | ‑ig'yi "‑ig" okuma hatası; sayılarda kritik. |
| P08 | r | Ünlü önce uvular [ʁ] (rot, Brot, Reise); ünlüden sonra / ‑er sonunda vokalize [ɐ] (der, hier, Wort, Lehrer) | Türkçe dil ucu r'den farklı; gargara benzeri | rot, Regen, Frau, drei, hier, Uhr, Bier | Bier [biːɐ] | Türkçe dil ucu r'si anlaşılır (Bavyera'da var) → **ana hedef sonda r'yi okumamak.** Uvular r opsiyonel ileri hedef. |
| P09 | z, tz, ‑tion | [ts] | "ts" | Zeit, zehn, Zug, Katze, Platz, Information [‑tsioːn] | Zoo [tsoː] | **Çok sık hata:** z'yi Türkçe z okumak. |
| P10 | s | Ünlü önce [z] (Sonne, Sie, lesen); sonda/ünsüz önce [s]; ß/ss [s] | s/z | sieben, Saft, Haus, Straße, essen | reisen [z] – reißen [s] | Sözcük başı s'yi "s" okuma hatası (Sonne = "zone"). |
| P11 | v, w, j, qu | v [f] (Vater, viel) – yabancı kökenli [v] (Vase, Video); w [v]; j [j]; qu [kv] | f; v; y; kv | Vogel, Wasser, ja, Juli, Quark, bequem | wir–vier [viːɐ̯]–[fiːɐ̯] | "wir/vier" minimal çifti; "ja" = "ya". |
| P12 | ei / ai | [aɪ] | "ay" | mein, Ei, Zeit, Mai, drei, Wein | Wein – Wien | **En sık okuma hatası:** ei'yi "e‑i" okumak; ie ile karıştırmak. |
| P13 | ie | [iː] | uzun "i" | Bier, Liebe, sieben, vier, spielen | Bier–Bein, Miete–Meite? (ei/ie ayrım tablosu) | Kural: **ikinci harfi oku** → ei = "ay" (i'nin adı gibi), ie = "i" (e'nin… değil). Popüler hafıza: "ie → i uzun". |
| P14 | eu / äu | [ɔʏ] | "oy" | neu, heute, Deutsch, Häuser, Fräulein | Leute – Laute | "e‑u" diye okuma. |
| P15 | au | [aʊ] | "av/au" | Haus, Frau, kaufen, auch | Haus – Hose | Kolay. |
| P16 | sch | [ʃ] | ş | Schule, schön, Tisch, Mensch | | **Avantaj:** ş Türkçede var. |
| P17 | sp / st (hece başında) | [ʃp] / [ʃt] | şp / şt | Sport, spielen, Straße, Stadt, verstehen | Fenster [st] – Stern [ʃt] | Hece içi/sonu st = [st] (Fenster, ist). **Türkçe konuşan "ıs‑port", "is‑tadt" diye ünlü ekler** (epentez) → ayrıca uyarılmalı: ünsüz kümeleri (Strumpf, Schrank, Pflanze). |
| P18 | pf, ng, nk | [pf], [ŋ], [ŋk] | | Apfel, Pferd, lang, singen, danke, Bank | singen ≠ "sin‑gen" | ng'yi n+g okuma; pf'yi f okuma. |
| P19 | h | Hece başında [h] (Haus); ünlüden sonra **sessiz**, ünlüyü uzatır (gehen, Uhr, Sohn) | | Hund, haben – fahren, Kuh | | "Uhr"daki h'yi okumak. |
| P20 | Auslautverhärtung | Hece/sözcük sonunda b→[p], d→[t], g→[k] (‑ig hariç) | Türkçede de var (kitab → kitap) | Tag [taːk], Hund [hʊnt], gelb [gɛlp], Kind, und, ab | Tag – Tage [g], Hund – Hunde [d] | **Avantaj:** Türkçe kitap/kitabı ile aynı mantık → doğrudan köprü kur. |
| P21 | Glottal stop (Knacklaut) | Ünlü ile başlayan hecelerden önce [ʔ] | Türkçede de var ("saat") | be‑ʔarbeiten, ʔich ʔarbeite | Bağlama (liaison) yapma | Fransızca gibi birleştirme yapma uyarısı. |
| P22 | Sözcük vurgusu | Germanik kelimelerde **kök hecede** (ilk hece): ARbeit, Ende; ayrılabilir ön ek vurgulu: AUFstehen, ANrufen; ayrılmaz ön ek vurgusuz: verSTEHen, beZAHlen; ‑ieren vurgulu: teleFOnieren; yabancı kelimeler sonda: UniversiTÄT, InformaTION | Türkçe vurgu çoğunlukla sonda | Familie [faˈmiːli̯ə], Kaffee (DE: KAffee), Hotel | trennbar: UMfahren vs. umFAHren (R) | Türkçe son-hece vurgusunu Almancaya taşıma eğilimi (araBEIT). |
| P23 | Cümle vurgusu ve tonlama | Bilgi taşıyan kelime vurgulanır; W-Frage ↘, Ja/Nein-Frage ↗, Aussage ↘ | | Ich KOMme aus der TÜRkei. Kommst du MORgen? ↗ | Ses grafiği (pitch contour) | Türkçe `mi` eki soru işlevi taşır; Almancada tonlama + fiil başta. |
| P24 | Kısaltmalar ve harf okunuşu | ICE, DB, LKW, z. B., usw., ca. | | | | Sınav metinlerinde. |

### 7.2 Ünite 0 ders planı (Telaffuz başlangıç modülü)

| Ders | İçerik | Kelime (chunk) | Alıştırma tipleri |
|---|---|---|---|
| 0.1 | Selamlaşma (P01 öncesi kulak alıştırma), alfabe | Hallo, Guten Tag, Tschüs, danke, bitte, ja, nein | Dinle‑tekrar et, harf dikte |
| 0.2 | Ünlüler: a e i o u + ä ö ü, uzun/kısa | Zahlen 0–10 | Minimal çift dinle-seç, uzun/kısa işaretle |
| 0.3 | Diftonglar: ei, ie, eu/äu, au | drei, vier, neun, Frau, heute | ei/ie sınıflandırma oyunu |
| 0.4 | Ünsüzler 1: z, s, v, w, j, sch, sp/st | Zeit, Sie, Vater, Wasser, ja, Schule, Sport | Yazılışa bak → doğru sesi seç |
| 0.5 | Ünsüzler 2: ch [ç/x], ‑ig, chs, r, h, ng, pf | ich, acht, zwanzig, sechs, Uhr, danke | Kural ağacı (arka/ön ünlü) |
| 0.6 | Auslautverhärtung + vurgu + tonlama; ünite testi | Tag, und, Hund; Name? Name! | Kayıt + karşılaştırma (dalga formu), test |

### 7.3 Teknik not (diğer kollara)

- Her ses için: model ses (native kayıt veya kaliteli TTS `de-DE`), yavaş versiyon, minimal çift kartları.
- Kullanıcı kaydı: `MediaRecorder` + yan yana dinleme; opsiyonel `SpeechRecognition (de-DE)` ile kelime düzeyi doğrulama (Chrome).
- Telaffuz kartları SRS'e girer (`type: "sound"`).

---
