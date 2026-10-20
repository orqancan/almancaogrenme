# 02 — Müfredat ve İçerik Kapsamı (A1 → A2)

> **Revizyon notu:** Hedef sınav değil Almanya'da yaşamak. Ünite iskeleti korunur; "Almanya'da Hayat" senaryo hattı eklendi, Anmeldung öne çekildi, Goethe simülasyonları opsiyonel. Bkz. [00-ANA-PLAN.md §4](../00-ANA-PLAN.md).

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

- **ID**: `G01`…`G67` — JSON'da `grammar.id` olarak kullanılır.
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
| P13 | ie | [iː] | uzun "i" | Bier, Liebe, sieben, vier, spielen | Bier–Bein, Liebe–Leib, Miete–Meister (ei/ie ayrım tablosu) | Hafıza kuralı: **ikinci harfi İngilizce adıyla oku** → ei: "i" = [aɪ] "ay"; ie: "e" = [iː] "i". |
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

## 8. Tematik üniteler

### 8.1 Genel bakış

| # | Seviye | Başlık (DE) | Başlık (TR) | Gramer odağı (ID) | Yeni kelime | Bitiş görevi (kısa) |
|---|---|---|---|---|---|---|
| 0 | Ön | Laute & Buchstaben | Sesler ve harfler | G01, G08 (0–10) | 40 | Adını harf harf söyle, 10 kelimeyi doğru oku |
| 1 | A1.1 | Hallo! Ich bin … | Merhaba! Ben … | G02, G03, G04, G05, G06 | 40 | 30 sn kendini tanıtma kaydı |
| 2 | A1.1 | Zahlen & Kontakte | Sayılar ve iletişim bilgileri | G06, G07, G08 | 40 | Kayıt formu doldurma + telefon numarası dikte |
| 3 | A1.1 | Meine Familie | Ailem | G09, G10, G12, G13 | 45 | Aile ağacı + 5 cümlelik tanıtım |
| 4 | A1.1 | Essen & Trinken | Yiyecek ve içecek | G11, G14, G15 (giriş) | 55 | Kafede sipariş diyaloğu (sözlü) |
| 5 | A1.1 | Einkaufen | Alışveriş | G15, G16, G13, G08 (100+) | 50 | Alışveriş listesi + market diyaloğu |
| 6 | A1.1 | Mein Tag | Günüm | G18, G19, G20 | 45 | Günlük rutinini anlat (6 cümle) |
| 7 | A1.1 | Freizeit & Hobbys | Boş zaman ve hobiler | G17, G21, G22, G23 | 45 | Bir arkadaşa buluşma teklifi mesajı |
| 8 | A1.2 | Wohnen | Konut | G24, G25, G26 | 55 | Evini tarif et + ev ilanı anlama |
| 9 | A1.2 | In der Stadt | Şehirde | G27, G28, G29 | 50 | Haritada yol tarifi ver/al |
| 10 | A1.2 | Arbeit & Beruf | İş ve meslek | G30, G31, G32 | 50 | İşini/hayalindeki işi tanıt |
| 11 | A1.2 | Termine & Zeit | Randevular ve zaman | G33, G29 (Datum), G19 | 45 | Randevu alma/iptal e-postası (30 kelime) |
| 12 | A1.2 | Körper & Gesundheit | Vücut ve sağlık | G35, G30 (sollen), G24 (Akk) | 50 | Doktor rol oyunu |
| 13 | A1.2 | Kleidung & Wetter | Giyim ve hava | G34, G36, G37 | 50 | Hafta sonunu anlat (Perfekt) + mağazada kıyafet al |
| 14 | A1.2 | Unterwegs (A1-Abschluss) | Yolda (A1 kapanış) | G38, G39, G40 + tekrar | 40 | **Start Deutsch 1 simülasyonu** |
| 15 | A2.1 | Erinnerungen | Anılar / çocukluk | G41, G42 | 45 | Çocukluğunu anlat (90 sn) |
| 16 | A2.1 | Urlaub & Reisen | Tatil ve seyahat | G43, G44 | 55 | Tatil kartpostalı (40 kelime) |
| 17 | A2.1 | Nachbarn & Zusammenleben | Komşular ve birlikte yaşam | G45, G46 | 45 | Komşuya şikâyet/rica notu |
| 18 | A2.1 | Restaurant & Einladung | Restoran ve davet | G47, G48 | 50 | Restoranda masa ayırt, sipariş ver, şikâyet et |
| 19 | A2.1 | Beim Arzt & in der Apotheke | Doktorda ve eczanede | G49, G50 | 55 | Telefonla randevu + belirti anlatımı |
| 20 | A2.1 | Geschenke & Mode | Hediyeler ve moda | G51, G52, G53 | 50 | İki ürünü karşılaştırıp hediye seç |
| 21 | A2.1 | Medien & Kommunikation | Medya ve iletişim | G54, G55 | 50 | Medya alışkanlıklarını anlat + mini anket |
| 22 | A2.2 | Arbeitswelt & Bewerbung | İş hayatı ve başvuru | G56, G57 | 55 | Tablo CV + kısa başvuru e-postası |
| 23 | A2.2 | Ämter & Dienstleistungen | Resmi daireler ve hizmetler | G58, G59 (R) | 55 | Bürgeramt'ta adres kaydı rol oyunu + form |
| 24 | A2.2 | Feste & Feiern | Bayramlar ve kutlamalar | G60, G61, G53 (Dat) | 45 | Davet + cevap e-postası; parti planlama (Sprechen T3) |
| 25 | A2.2 | Beziehungen & Gefühle | İlişkiler ve duygular | G62, G55 | 45 | Bir arkadaşa tavsiye mektubu |
| 26 | A2.2 | Natur, Wetter & Umwelt | Doğa, hava ve çevre | G63, G64 | 45 | Hava raporu anlama + çevre alışkanlıkları sunumu |
| 27 | A2.2 | Lernen & Zukunft | Öğrenme ve gelecek planları | G65, G66, G46 (trotzdem) | 40 | Gelecek planlarını anlat (Sprechen T2) |
| 28 | A2.2 | Mein Leben in D-A-CH (A2-Abschluss) | Almanca konuşulan ülkelerde hayatım | G67 (R) + genel tekrar | 15 | **Goethe-Zertifikat A2 simülasyonu** |

### 8.2 Ünite detayları

> Format: **İletişimsel hedefler** · **Gramer** · **Kelime alanı (~sayı)** · **Örnek diyalog** · **Bitiş görevi**. Kültür notu (Landeskunde) her ünitede kısa bir kutu olarak verilir.

#### Ünite 0 — Laute & Buchstaben *(Sesler ve harfler)*
- **Hedefler:** Selamlaşma/vedalaşma; alfabeyi tanıma; adını harf harf söyleme; 0–10 sayıları.
- **Gramer:** G01, G08 (0–10). Bkz. §7.2.
- **Kelime (~40):** selamlar, *danke/bitte/ja/nein*, 0–10, sınıf dili (*Hören Sie! Lesen Sie! Sprechen Sie nach!*).
- **Diyalog:** Bir dil kursunda kayıt masası — "Wie ist Ihr Name? — Yilmaz. — Wie bitte? — Y‑I‑L‑M‑A‑Z."
- **Bitiş görevi:** Kendi adını ve şehrini harf harf kaydet; 10 kelimelik telaffuz testi (≥%80).
- **Landeskunde:** D‑A‑CH ülkeleri, Almancanın konuşulduğu yerler, Grüß Gott / Servus / Grüezi.

#### Ünite 1 — Hallo! Ich bin … *(Merhaba! Ben …)*
- **Hedefler:** Kendini tanıtma (isim, köken, ikamet, diller); başkasına soru sorma; du/Sie ayrımı; anlamadığını söyleme.
- **Gramer:** G02 kişi zamirleri, G03 *sein*, G04 V2, G05 W‑Fragen (wer/wie/woher/wo), G06 Präsens (heißen, kommen, wohnen, sprechen-ich/du).
- **Kelime (~40):** ülkeler/diller (*die Türkei, Deutschland, Türkisch, Deutsch, Englisch*), şehirler, *Name, Vorname, Land, Sprache*, kurs dili.
- **Diyalog:** Entegrasyon kursunda ilk gün — "Hallo, ich bin Elif. Und wer bist du? — Ich heiße Jonas. Woher kommst du? — Aus der Türkei, aus Izmir. Und du?"
- **Bitiş görevi:** 30 sn sesli tanıtım (Name, Land, Wohnort, Sprachen) — kontrol listesiyle öz değerlendirme; Goethe A1 Sprechen Teil 1 kartları (Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby?) ile ilk deneme.

#### Ünite 2 — Zahlen & Kontakte *(Sayılar ve iletişim bilgileri)*
- **Hedefler:** Sayılar 0–100; yaş, telefon, adres, e‑posta söyleme/anlama; basit form doldurma.
- **Gramer:** G06 (düzenli fiiller tüm kişiler), G07 Ja/Nein‑Fragen, G08 sayılar, G23 *und/aber*.
- **Kelime (~40):** sayılar, *Adresse, Straße, Hausnummer, Postleitzahl, Telefonnummer, Handy, E‑Mail, @ (at), Formular, Geburtsdatum, ledig/verheiratet*.
- **Diyalog:** Spor salonuna üyelik — "Wie ist Ihre Adresse? — Lindenstraße 23, 50667 Köln. — Und Ihre Handynummer?"
- **Bitiş görevi:** Goethe A1 Schreiben Teil 1 tipi form (5 bilgi) + 5 telefon numarası dikte.

#### Ünite 3 — Meine Familie *(Ailem)*
- **Hedefler:** Aile üyelerini tanıtma; medeni durum; yaş; fotoğraf hakkında konuşma.
- **Gramer:** G09 *haben*, G10 der/die/das, G12 mein/dein/Ihr (Nom), G13 Plural (giriş: Brüder, Schwestern, Kinder, Eltern).
- **Kelime (~45):** *der Vater, die Mutter, die Eltern (Pl.), der Bruder, die Schwester, die Geschwister, der Sohn, die Tochter, der Opa, die Oma, der Mann, die Frau, das Kind, der Freund, verheiratet, geschieden*…
- **Diyalog:** Fotoğrafa bakarak — "Wer ist das? — Das ist meine Schwester. Sie heißt Zeynep und wohnt in Ankara. — Hast du auch Brüder? — Ja, ich habe zwei Brüder."
- **Bitiş görevi:** Görsel aile ağacı oluştur, 5 cümlelik metin yaz + kaydet.
- **Landeskunde:** Patchwork‑Familie; Almanya'da aile büyüklüğü.

#### Ünite 4 — Essen & Trinken *(Yiyecek ve içecek)*
- **Hedefler:** Yiyecek/içecek adları; sevdiği/sevmediği yiyecekler; kafede sipariş ve ödeme; kahvaltı alışkanlıkları.
- **Gramer:** G11 ein/eine, G10 tekrar, G14 *möchte / hätte gern*, G15 Akkusativ giriş (*einen Kaffee, den Salat*).
- **Kelime (~55):** *der Kaffee, der Tee, das Wasser, der Saft, die Milch, das Brot, das Brötchen, der Käse, die Wurst, das Ei, der Apfel, die Banane, der Kuchen, das Frühstück, die Speisekarte, die Rechnung, lecker, süß, warm, kalt*…
- **Diyalog:** Kafede — "Was möchten Sie? — Ich hätte gern einen Kaffee und ein Stück Kuchen. — Mit Milch? — Ja, bitte. … — Zahlen, bitte! — Zusammen oder getrennt?"
- **Bitiş görevi:** Sesli sipariş rol oyunu (garsonun repliklerine sesle cevap) + menü okuma görevi.
- **Landeskunde:** Kaffee und Kuchen, Brötchen kültürü, bahşiş (%5–10, "Stimmt so").
- **Tam JSON örneği:** §11.

#### Ünite 5 — Einkaufen *(Alışveriş)*
- **Hedefler:** Markette ürün sorma/fiyat; miktar ve ambalaj; alışveriş listesi; ödeme yöntemleri.
- **Gramer:** G15 Akkusativ (tam: Nom/Akk tablosu), G16 *nicht/kein*, G13 Plural (pekiştirme), G08 100–1000 + Preise (2,99 €).
- **Kelime (~50):** *das Kilo, das Gramm, der Liter, die Flasche, die Packung, die Dose, das Stück, der Supermarkt, die Kasse, der Euro, der Cent, billig, teuer, das Angebot, das Gemüse, das Obst, die Tomate, die Kartoffel, das Fleisch, der Fisch, der Reis, das Öl, der Zucker*…
- **Diyalog:** Pazarda — "Was kostet ein Kilo Tomaten? — 2,49 Euro. — Dann nehme ich zwei Kilo. Haben Sie auch Paprika? — Nein, heute leider keine Paprika."
- **Bitiş görevi:** Tarif için alışveriş listesi oluştur + market kasası dinleme (fiyat yazma).
- **Landeskunde:** Pfand sistemi, pazar günü kapalı dükkanlar, Bio.

#### Ünite 6 — Mein Tag *(Günüm)*
- **Hedefler:** Saat sorma/söyleme (resmî/gayriresmî); günlük rutin; haftanın günleri ve gün bölümleri; açılış saatleri.
- **Gramer:** G18 trennbare Verben + Satzklammer, G19 um/am/von…bis, G20 Uhrzeit, G04 Inversion (*Um 7 Uhr stehe ich auf*).
- **Kelime (~45):** *aufstehen, frühstücken, anfangen, arbeiten, einkaufen, kochen, fernsehen, schlafen, der Morgen, der Vormittag, der Mittag, der Nachmittag, der Abend, die Nacht, Montag…Sonntag, das Wochenende, früh, spät, immer, oft, manchmal, nie*.
- **Diyalog:** İki iş arkadaşı — "Wann stehst du auf? — Um halb sechs! — Was? So früh? — Ja, die Arbeit fängt um sieben an."
- **Bitiş görevi:** Bir günlük rutin metni (6 cümle, ≥3 trennbares Verb) + saat dinleme testi (10 madde).

#### Ünite 7 — Freizeit & Hobbys *(Boş zaman ve hobiler)*
- **Hedefler:** Hobiler hakkında konuşma; yapabildiklerini/yapamadıklarını söyleme; buluşma teklif etme, kabul/ret.
- **Gramer:** G17 kök ünlü değişimi (lesen, sehen, fahren, essen, treffen), G21 *können*, G22 *gern/lieber/am liebsten*, G23 *aber/oder*.
- **Kelime (~45):** *schwimmen, tanzen, singen, lesen, Rad fahren, Fußball spielen, wandern, fotografieren, das Kino, das Konzert, der Park, das Schwimmbad, die Musik, das Spiel, der Verein, Zeit haben, Lust haben*.
- **Diyalog:** Telefonda — "Hast du am Samstag Zeit? Wir können ins Kino gehen. — Samstag kann ich leider nicht. Aber Sonntag geht."
- **Bitiş görevi:** Arkadaşa WhatsApp mesajı: teklif + yer + saat (Goethe A1 Schreiben Teil 2'ye hazırlık).
- **Kontrol Noktası 1 (A1.1 Zwischentest)** — bkz. §10.

#### Ünite 8 — Wohnen *(Konut)*
- **Hedefler:** Evi/odaları tarif etme; mobilya; ev ilanı okuma; ev sahibine/arkadaşa ev hakkında yazma.
- **Gramer:** G24 Possessivartikel tümü, G25 *es gibt*, G26 Adjektiv prädikativ, Plural tekrar.
- **Kelime (~55):** *die Wohnung, das Haus, das Zimmer, die Küche, das Bad, das Schlafzimmer, das Wohnzimmer, der Balkon, der Garten, der Tisch, der Stuhl, das Bett, der Schrank, das Sofa, die Lampe, die Miete, die Nebenkosten, der Quadratmeter, hell, dunkel, groß, klein, ruhig, laut, modern*…
- **Diyalog:** Ev bakma — "Wie viele Zimmer hat die Wohnung? — Drei Zimmer, Küche, Bad. Es gibt auch einen Balkon. — Und wie hoch ist die Miete?"
- **Bitiş görevi:** Bir ev ilanını analiz et (Lesen) + kendi evini anlat (Sprechen 60 sn).
- **Landeskunde:** WG, Kaltmiete/Warmmiete, Mülltrennung.

#### Ünite 9 — In der Stadt *(Şehirde)*
- **Hedefler:** Şehirdeki yerler; yol sorma/tarif etme; ulaşım araçları; kibar rica (Imperativ Sie).
- **Gramer:** G27 Imperativ Sie, G28 Dativ giriş (*mit dem Bus, zum Bahnhof, zur Post, bei der Bank*), G29 Ordnungszahlen (*die zweite Straße links*).
- **Kelime (~50):** *der Bahnhof, die Post, die Bank, die Apotheke, das Krankenhaus, die Haltestelle, der Bus, die U‑Bahn, die Straßenbahn, das Auto, das Fahrrad, zu Fuß, geradeaus, links, rechts, die Kreuzung, die Ampel, gegenüber, in der Nähe*.
- **Diyalog:** Sokakta — "Entschuldigung, wie komme ich zum Bahnhof? — Gehen Sie hier geradeaus und dann die zweite Straße links. — Ist das weit? — Nein, nur fünf Minuten zu Fuß."
- **Bitiş görevi:** İnteraktif harita: sesli tarifi dinle → rotayı çiz; yazılı tarif ver.

#### Ünite 10 — Arbeit & Beruf *(İş ve meslek)*
- **Hedefler:** Meslekler; iş yeri ve görevler; çalışma saatleri; geçmişte nerede çalıştığını söyleme (war/hatte); zorunluluk/izin.
- **Gramer:** G30 *müssen/wollen/dürfen*, G31 *war/hatte*, G32 Beruf maskulin/feminin.
- **Kelime (~50):** *der Arzt/die Ärztin, der Lehrer/die Lehrerin, der Verkäufer, der Koch, der Ingenieur, der Kellner, die Krankenschwester/Pflegekraft, der Mechaniker, die Firma, das Büro, der Kollege, der Chef, die Arbeitszeit, Vollzeit, Teilzeit, verdienen, arbeitslos*.
- **Diyalog:** Partide — "Was machst du beruflich? — Ich bin Krankenpfleger. Ich muss oft nachts arbeiten. — Und vorher? — Vorher war ich in der Türkei Lehrer."
- **Bitiş görevi:** "Mein Beruf" kısa sunum (kayıt) + iş ilanı okuma.

#### Ünite 11 — Termine & Zeit *(Randevular ve zaman)*
- **Hedefler:** Ay, tarih, mevsim; randevu alma, erteleme, iptal; geçmiş olayları basitçe anlatma (Perfekt haben).
- **Gramer:** G33 Perfekt mit *haben* (düzenli + sık düzensiz: *gemacht, gekauft, gearbeitet, gegessen, getrunken*), G29 Datum (*am dritten März*), G19 im/am/um tekrar.
- **Kelime (~45):** aylar, mevsimler, *der Termin, der Kalender, das Datum, gestern, heute, morgen, letzte Woche, nächste Woche, absagen, verschieben, vereinbaren, pünktlich, zu spät*.
- **Diyalog:** Kuaföre telefon — "Ich möchte einen Termin machen. — Geht es am Donnerstag um 10 Uhr? — Nein, da muss ich arbeiten. Geht es auch am Freitag?"
- **Bitiş görevi:** Goethe A1 Schreiben Teil 2: Randevu iptali e‑postası (~30 kelime, 3 içerik noktası).

#### Ünite 12 — Körper & Gesundheit *(Vücut ve sağlık)*
- **Hedefler:** Vücut bölümleri; şikâyet bildirme; doktor tavsiyesini anlama; arkadaşa tavsiye verme.
- **Gramer:** G35 Imperativ du/ihr, G30 *sollen*, G24 Possessiv Akkusativ (*Ich habe meinen Termin vergessen*), Dativ chunk *Mir ist schlecht / Mir tut … weh*.
- **Kelime (~50):** *der Kopf, der Bauch, der Rücken, der Arm, das Bein, der Fuß, die Hand, das Auge, das Ohr, der Hals, der Zahn, die Schmerzen, das Fieber, der Husten, die Erkältung, krank, gesund, das Rezept, die Tablette, die Praxis, die Versichertenkarte*.
- **Diyalog:** Muayenehanede — "Was fehlt Ihnen? — Ich habe Halsschmerzen und Fieber. — Seit wann? — Seit zwei Tagen. — Nehmen Sie diese Tabletten und bleiben Sie im Bett."
- **Bitiş görevi:** Doktor rol oyunu (sesli) + işe hastalık bildirme mesajı.
- **Landeskunde:** Hausarzt sistemi, Krankmeldung (AU), Notruf 112.

#### Ünite 13 — Kleidung & Wetter *(Giyim ve hava)*
- **Hedefler:** Kıyafetler, renkler, beden; mağazada deneme/satın alma; hava durumu; hafta sonunu anlatma (Perfekt sein).
- **Gramer:** G34 Perfekt mit *sein* + düzensiz Partizipien, G36 Personalpronomen Akk (*Ich nehme ihn*), G37 *welch‑/dies‑*.
- **Kelime (~50):** *die Hose, das Hemd, die Bluse, das Kleid, der Rock, die Jacke, der Mantel, der Pullover, die Schuhe, die Größe, die Farbe, rot, blau, grün…, passen, anprobieren, die Sonne, der Regen, der Schnee, der Wind, warm, kalt, es regnet*.
- **Diyalog:** Mağazada — "Kann ich die Jacke anprobieren? — Welche? — Diese hier, in Größe M. … — Und? Passt sie? — Ja, ich nehme sie."
- **Bitiş görevi:** "Mein Wochenende" — Perfekt ile 6 cümle (yazılı + sesli).

#### Ünite 14 — Unterwegs *(Yolda — A1 kapanış)*
- **Hedefler:** Bilet alma; tren/otobüs bilgisi; anonsları anlama; konum belirtme; gerekçe (denn).
- **Gramer:** G38 Dativ zamirler (*Können Sie mir helfen? Das gefällt mir*), G39 Wechselpräpositionen (wo? + Dativ), G40 *denn* + **genel A1 tekrarı**.
- **Kelime (~40):** *der Zug, das Gleis, die Fahrkarte, die Abfahrt, die Ankunft, umsteigen, die Verspätung, der Flughafen, der Koffer, die Reise, das Hotel, das Zimmer (reservieren)*.
- **Diyalog:** Gişede — "Eine Fahrkarte nach Hamburg, bitte. — Einfach oder hin und zurück? — Hin und zurück. Muss ich umsteigen? — Ja, in Hannover."
- **Bitiş görevi:** **Kontrol Noktası 2 + Start Deutsch 1 tam simülasyonu.**

#### Ünite 15 — Erinnerungen *(Anılar / çocukluk)*
- **Hedefler:** Çocukluk ve okul anıları; geçmişte yapmak zorunda olduklarını/istediklerini anlatma; gerekçe sunma.
- **Gramer:** G41 Präteritum Modalverben + Perfekt tekrarı, G42 *weil*.
- **Kelime (~45):** *die Kindheit, die Schule, der Lehrer, das Zeugnis, die Note, das Spielzeug, früher, damals, als Kind, streng, lustig, sich erinnern* (chunk), *umziehen*.
- **Diyalog:** Eski fotoğraflar — "Wo hast du als Kind gewohnt? — In einem Dorf bei Konya. Ich musste jeden Tag zu Fuß zur Schule gehen, weil es keinen Bus gab."
- **Bitiş görevi:** 90 sn "Meine Kindheit" anlatımı + blog yazısı okuma (Richtig/Falsch).

#### Ünite 16 — Urlaub & Reisen *(Tatil ve seyahat)*
- **Hedefler:** Tatil planlama ve anlatma; konaklama rezervasyonu; nereye/nerede gittiğini söyleme.
- **Gramer:** G43 Wechselpräpositionen tam (wohin/wo), *legen/liegen, stellen/stehen, hängen*; G44 *nach/in/an/zu* ile yer.
- **Kelime (~55):** *der Urlaub, das Meer, der Strand, die Berge, der See, die Insel, das Ausland, die Unterkunft, die Ferienwohnung, die Jugendherberge, das Doppelzimmer, die Halbpension, buchen, packen, der Pass, das Visum, die Sehenswürdigkeit*.
- **Diyalog:** "Wohin fährst du im Sommer? — Ans Meer, nach Antalya. Und du? — Ich fahre in die Berge, in die Schweiz."
- **Bitiş görevi:** Goethe A2 Schreiben Teil 1 tipi tatil kartpostalı (~40 kelime) + otel e‑postası okuma.

#### Ünite 17 — Nachbarn & Zusammenleben *(Komşular ve birlikte yaşam)*
- **Hedefler:** Komşuluk ilişkileri, ev kuralları (Hausordnung); fikir bildirme; rica/şikâyet.
- **Gramer:** G45 *dass* + Meinung, G46 *deshalb*, G42 *weil* pekiştirme.
- **Kelime (~45):** *der Nachbar, die Hausordnung, der Hausmeister, die Ruhezeit, der Lärm, der Müll, die Mülltonne, das Treppenhaus, leihen, stören, sich beschweren* (chunk), *rücksichtsvoll, freundlich*.
- **Diyalog:** "Entschuldigung, ich finde, dass die Musik ein bisschen zu laut ist. Mein Kind schläft schon. — Oh, tut mir leid! Ich mache sie leiser."
- **Bitiş görevi:** Komşuya not yazma (rica + gerekçe) + Hausordnung okuma.

#### Ünite 18 — Restaurant & Einladung *(Restoran ve davet)*
- **Hedefler:** Masa ayırtma; menü okuma; sipariş, şikâyet (reklamieren); davete gitme, yemek tarif etme.
- **Gramer:** G47 Adjektivdeklination (unbestimmt/Nullartikel, Nom/Akk), G48 Konjunktiv II nezaket (*Könnten Sie…? Ich hätte gern… Ich würde gern…*).
- **Kelime (~50):** *die Vorspeise, das Hauptgericht, die Nachspeise, die Beilage, vegetarisch, scharf, gebraten, gekocht, das Besteck, die Gabel, das Messer, der Löffel, reservieren, bestellen, die Gastgeberin, mitbringen*.
- **Diyalog:** "Ich hätte gern einen großen Salat und ein kleines Wasser. … Entschuldigung, die Suppe ist leider kalt. Könnten Sie sie bitte noch einmal warm machen?"
- **Bitiş görevi:** 3 aşamalı sesli rol oyunu (telefonla rezervasyon → sipariş → şikâyet).

#### Ünite 19 — Beim Arzt & in der Apotheke *(Doktorda ve eczanede)*
- **Hedefler:** Belirtileri ayrıntılı tarif; telefonla randevu; ilaç talimatlarını anlama; sağlıklı yaşam koşulları.
- **Gramer:** G49 reflexive Verben (*sich fühlen, sich erkälten, sich ausruhen*), G50 *wenn*.
- **Kelime (~55):** *die Allergie, die Verletzung, der Unfall, die Grippe, die Salbe, die Tropfen, der Beipackzettel, die Nebenwirkung, die Überweisung, der Facharzt, die Notaufnahme, sich verletzen, husten, niesen, schwindlig*.
- **Diyalog:** "Wenn Sie Fieber bekommen, nehmen Sie eine Tablette. — Muss ich die Tabletten vor oder nach dem Essen nehmen? — Nach dem Essen, dreimal täglich."
- **Bitiş görevi:** Muayenehane telesekreter mesajını anla + randevu telefon konuşması kaydı.

#### Ünite 20 — Geschenke & Mode *(Hediyeler ve moda)*
- **Hedefler:** Hediye seçme, tavsiye etme; ürünleri karşılaştırma; beğeni bildirme.
- **Gramer:** G51 Dat+Akk fiiller (*schenken, geben, empfehlen*), G52 Komparativ/Superlativ, G53 Adjektivdekl. bestimmter Artikel.
- **Kelime (~50):** *das Geschenk, der Gutschein, der Schmuck, die Kette, die Uhr, das Parfüm, die Tasche, der Stil, modern, altmodisch, bequem, elegant, praktisch, günstig, gefallen, passen, stehen*.
- **Diyalog:** "Was schenkst du deiner Mutter? — Vielleicht die rote Tasche. — Die schwarze ist aber eleganter und billiger. — Stimmt, die nehme ich."
- **Bitiş görevi:** İki ürün ilanını karşılaştırıp seçimini gerekçelendir (yazılı).

#### Ünite 21 — Medien & Kommunikation *(Medya ve iletişim)*
- **Hedefler:** Medya alışkanlıkları; telefon/internet sorunları; kibar dolaylı soru; ilgi alanlarını ifade etme.
- **Gramer:** G54 indirekte Fragen (ob/W‑), G55 Verben mit Präpositionen (*sich interessieren für, warten auf, sprechen über*).
- **Kelime (~50):** *das Handy, der Computer, das Internet, die App, die Nachricht, das Passwort, herunterladen, speichern, löschen, drucken, die Zeitung, die Sendung, die Werbung, online, der Vertrag*.
- **Diyalog:** Mağazada — "Können Sie mir sagen, ob der Vertrag monatlich kündbar ist? — Ja, das ist er."
- **Bitiş görevi:** Mini anket sonuçları grafiğini oku + kendi medya alışkanlıklarını yaz.
- **Kontrol Noktası 3 (A2.1 Zwischentest).**

#### Ünite 22 — Arbeitswelt & Bewerbung *(İş hayatı ve başvuru)*
- **Hedefler:** İş ilanı okuma; başvuru, CV; iş görüşmesinde kendini anlatma; iş yerinde dilek/tavsiye.
- **Gramer:** G56 Konjunktiv II (Wunsch, Ratschlag: *Du solltest…*), G57 Infinitiv mit *zu*.
- **Kelime (~55):** *die Stelle, die Stellenanzeige, die Bewerbung, der Lebenslauf, das Vorstellungsgespräch, die Erfahrung, die Ausbildung, das Praktikum, das Gehalt, der Arbeitsvertrag, die Probezeit, kündigen, sich bewerben, die Kenntnisse, zuverlässig, flexibel*.
- **Diyalog:** Görüşmede — "Warum möchten Sie bei uns arbeiten? — Weil ich gern im Team arbeite und Erfahrung in der Gastronomie habe."
- **Bitiş görevi:** Tablo CV + kısa başvuru e‑postası (şablon destekli).

#### Ünite 23 — Ämter & Dienstleistungen *(Resmi daireler ve hizmetler)*
- **Hedefler:** Bürgeramt'ta adres kaydı (Anmeldung); bankada hesap açma; postanede paket; formları ve talimatları anlama.
- **Gramer:** G58 seit/vor/nach/ab (+Dat), G59 Passiv Präsens (tanıma).
- **Kelime (~55 + 30 pasif):** *das Amt, das Bürgeramt, die Ausländerbehörde, die Anmeldung, der Antrag, das Formular, der Ausweis, der Reisepass, die Aufenthaltserlaubnis, die Unterschrift, unterschreiben, ausfüllen, das Konto, die Überweisung, die Gebühr, das Paket, der Brief, die Briefmarke, die Wartenummer*.
- **Diyalog:** "Ich möchte mich anmelden. — Haben Sie einen Termin? — Ja, um 9:30. — Gut. Ich brauche Ihren Pass und die Wohnungsgeberbestätigung."
- **Bitiş görevi:** Anmeldung formunu doldur + gişe rol oyunu (sesli).
- **Landeskunde:** Termin kültürü, Wohnungsgeberbestätigung, Steuer‑ID.

#### Ünite 24 — Feste & Feiern *(Bayramlar ve kutlamalar)*
- **Hedefler:** Bayramlar (Weihnachten, Ostern, Silvester, Ramazan/Kurban Bayramı karşılaştırma); davet etme/kabul/ret; tebrik; ortak parti planlama.
- **Gramer:** G60 Genitiv‑s / von, G61 *als* vs *wenn*, G53 Dativ sıfat tekrar.
- **Kelime (~45):** *das Fest, die Feier, der Geburtstag, die Hochzeit, Weihnachten, Ostern, Silvester, das Neujahr, der Gast, die Einladung, einladen, feiern, gratulieren, schmücken, die Kerze, das Feuerwerk*.
- **Diyalog:** "Als ich das erste Mal Weihnachten in Deutschland gefeiert habe, war alles neu für mich."
- **Bitiş görevi:** Goethe A2 Sprechen Teil 3: iki takvimle parti/ziyaret planlama (sesli; partner replikleri önceden kaydedilmiş) + davet e‑postasına cevap (Schreiben Teil 2).

#### Ünite 25 — Beziehungen & Gefühle *(İlişkiler ve duygular)*
- **Hedefler:** Arkadaşlık, aşk, aile ilişkileri; duyguları ifade etme; tavsiye isteme/verme.
- **Gramer:** G62 reflexive Verben mit Präposition (*sich ärgern über, sich verlieben in, sich streiten mit*), G55 da(r)/wo(r) tanıma.
- **Kelime (~45):** *die Beziehung, die Freundschaft, die Liebe, der Streit, sich trennen, heiraten, das Gefühl, glücklich, traurig, wütend, eifersüchtig, enttäuscht, nervös, Angst haben, vertrauen*.
- **Diyalog:** "Worüber ärgerst du dich? — Über meinen Mitbewohner. Er räumt nie auf!"
- **Bitiş görevi:** Dergi tavsiye köşesi mektubunu oku + cevap yaz (~50 kelime).

#### Ünite 26 — Natur, Wetter & Umwelt *(Doğa, hava ve çevre)*
- **Hedefler:** Hava tahminini anlama; mevsim ve iklim karşılaştırma; çevre alışkanlıkları; kurallar (man darf/muss).
- **Gramer:** G63 *man, jemand, niemand, etwas, nichts*, G64 Futur I (*Morgen wird es regnen*).
- **Kelime (~45):** *das Klima, die Temperatur, der Grad, das Gewitter, der Nebel, bewölkt, die Umwelt, der Müll, recyceln, Energie sparen, die Natur, der Wald, das Tier, die Pflanze, schützen*.
- **Diyalog:** Radyo — "Morgen wird es im Norden bewölkt, im Süden scheint die Sonne bei 25 Grad."
- **Bitiş görevi:** Radyo hava durumu (Goethe A2 Hören Teil 1 tipi) + 60 sn "Was tue ich für die Umwelt?".

#### Ünite 27 — Lernen & Zukunft *(Öğrenme ve gelecek planları)*
- **Hedefler:** Okul sistemi, kurslar, dil öğrenme; gelecek planları ve hayaller; karşıtlık bildirme.
- **Gramer:** G65 *werden* (ana fiil), G66 *sondern / entweder…oder*, G46 *trotzdem*.
- **Kelime (~40):** *die Ausbildung, das Studium, die Universität, die Prüfung, das Zertifikat, der Kurs, die Weiterbildung, der Abschluss, das Ziel, der Plan, der Traum, bestehen, durchfallen, sich vorbereiten*.
- **Diyalog:** "Was willst du nach dem Kurs machen? — Ich werde eine Ausbildung als Erzieherin machen. Das ist nicht leicht, trotzdem probiere ich es."
- **Bitiş görevi:** Goethe A2 Sprechen Teil 2 kartı ("Pläne für die Zukunft") ile 2 dk monolog.

#### Ünite 28 — Mein Leben in D‑A‑CH *(A2 kapanış)*
- **Hedefler:** Kendi hayat hikâyesini bağlantılı anlatma; tüm A2 becerilerini birleştirme; sınav stratejileri.
- **Gramer:** G67 Relativsatz (tanıma) + seçmeli tekrar (sistem zayıf konuları SRS verisinden seçer).
- **Kelime (~15):** sınav dili (*ankreuzen, zuordnen, die Aufgabe, der Antwortbogen*).
- **Diyalog:** Röportaj — "Seit wann leben Sie in Deutschland? Was war am Anfang schwierig?"
- **Bitiş görevi:** **Kontrol Noktası 4 + Goethe-Zertifikat A2 tam simülasyonu.**

---

## 9. Ünite içi ders yapısı

### 9.1 Standart ünite iskeleti (6 ders + tekrar + test)

| Sıra | Ders | Süre | Odak | Tipik içerik / alıştırma tipleri |
|---|---|---|---|---|
| L1 | **Wörter** — Kelime girişi | 20–25 dk | Kelime (ilk 50–60%) | Görsel + ses + artikel rengi; dinle‑tekrar; artikel seçme; eşleştirme; ilk SRS kartları |
| L2 | **Dialog** — Hören & Verstehen | 20–25 dk | Dinleme, chunk | Ünite diyaloğu (yavaş/normal hız); anlama soruları; boşluklu transkript; chunk'ları işaretleme (*noticing*); gölgeleme (shadowing) |
| L3 | **Grammatik 1** | 25 dk | Ana gramer konusu | Diyalogdan örnek → keşif sorusu → kural kartı (TR açıklama + tablo + `trNote`) → kontrollü alıştırma (seçme, boşluk, dönüşüm, sıralama) |
| L4 | **Grammatik 2 + Wörter 2** | 25 dk | 2. gramer konusu / genişletme + kalan kelimeler | Aynı döngü; kelimenin geri kalanı; karışık alıştırma |
| L5 | **Lesen & Schreiben** | 25–30 dk | Okuma + yazma | Otantik‑benzeri metin (ilan, e‑posta, menü, form); Goethe tipi görev; yönlendirmeli yazma (şablon → serbest) + model cevap + öz değerlendirme kontrol listesi |
| L6 | **Sprechen & Aussprache** | 20–25 dk | Konuşma + telaffuz | Aussprache-Ecke (10 dk, §7); rol oyunu (kayıt); sesli soru-cevap; bitiş görevine hazırlık |
| R | **Wiederholung** | 15–20 dk | Karma tekrar | Ünite + önceki 2 ünitenin zayıf öğeleri (SRS + hata defteri), "Kannst du das?" can‑do öz değerlendirmesi |
| T | **Einheitstest** + Bitiş görevi | 25–30 dk | Ölçme | 4 beceri; geçme eşiği %70 (her bölüm ≥%50); kalırsa hatalı konulara özel tekrar seti açılır |

Ünite başına ≈ 3–3,5 saat yeni içerik + ≈ 1,5–2 saat SRS/tekrar ⇒ **~5 saat/ünite**, 2 haftada bir ünite (günde ~30–45 dk).

### 9.2 Ders içi mikro‑akış (her ders)

1. **Aufwärmen (2–3 dk):** SRS vadesi gelen 10–20 kart.
2. **Input:** Ses/metin/görsel (anlamaya odaklı).
3. **Noticing:** "Bu cümlelerde fiil nerede?" tipi keşif sorusu.
4. **Erklärung:** Kısa Türkçe açıklama + tablo + 3 örnek; `trNote` ("Türkçeden farkı").
5. **Kontrollü pratik:** 8–15 madde, anında geri bildirim + açıklama.
6. **Yarı serbest / serbest üretim:** Cümle kurma, kayıt, kısa yazı.
7. **Exit-Check:** 3–5 soruluk mini test → sonuç ilerleme modeline.

### 9.3 Alıştırma tipleri kataloğu (veri modelindeki `type` değerleri)

| `type` | Açıklama | Beceri |
|---|---|---|
| `mc` | Çoktan seçmeli (metin/ses/görsel) | Tümü |
| `tf` | Richtig/Falsch (Goethe tipi) | Lesen/Hören |
| `cloze` | Boşluk doldurma (yazarak) | Gramer/kelime |
| `cloze_choice` | Boşluk doldurma (seçenekli dropdown) | Gramer |
| `artikel` | der/die/das(/Plural) seçimi, renk geri bildirimi | Kelime |
| `match` | Eşleştirme (DE↔TR, soru↔cevap, resim↔kelime) | Kelime |
| `order` | Kelime sıralama (cümle kurma — V2/Satzklammer için kritik) | Gramer |
| `transform` | Dönüştürme (Präsens→Perfekt, Hauptsatz→weil‑Satz) | Gramer |
| `conjugate` | Çekim tablosu doldurma | Gramer |
| `dictation` | Dinle‑yaz (kelime/sayı/cümle) | Hören/Schreiben |
| `listen_select` | Minimal çift / ses ayırt etme | Aussprache |
| `speak_repeat` | Dinle‑tekrar et (kayıt, opsiyonel ASR) | Sprechen |
| `roleplay` | Sıralı replikli diyalog; kullanıcı rolüne sesle/yazıyla cevap | Sprechen |
| `write_free` | Serbest yazma + içerik noktası kontrol listesi + model cevap | Schreiben |
| `form` | Form doldurma (Goethe A1 Schreiben T1) | Schreiben/Lesen |
| `map_route` | Harita üzerinde yol | Hören |
| `clock` | Saat ayarlama/okuma | Hören |

---

## 10. İlerleme kontrol noktaları ve sınav simülasyonu

### 10.1 Kontrol noktaları

| Kontrol noktası | Konum | Kapsam | Format | Geçme ölçütü | Kalırsa |
|---|---|---|---|---|---|
| Ünite testi | Her ünite sonu | Ünite | 4 beceri, ~25 madde + bitiş görevi | ≥%70 toplam, her beceri ≥%50 | Hatalı gramer/kelime ID'lerinden otomatik "Reparatur-Set" |
| **KN1 — A1.1 Zwischentest** | Ünite 7 sonrası | Ünite 0–7 | Goethe A1 formatının kısaltılmışı (her bölüm ~yarım) | ≥%65 | Zayıf ünitelerin R+T dersleri tekrar açılır |
| **KN2 — A1 Abschluss** | Ünite 14 | Ünite 0–14 | **Start Deutsch 1 tam simülasyon** | ≥60/100 (Goethe eşiği); sistem önerisi ≥70 | A2'ye geçiş "önerilmez" uyarısı (kilitlenmez) |
| **KN3 — A2.1 Zwischentest** | Ünite 21 sonrası | Ünite 15–21 (+A1 spiral) | Goethe A2 formatının kısaltılmışı | ≥%65 | Aynı |
| **KN4 — A2 Abschluss** | Ünite 28 | Tümü | **Goethe-Zertifikat A2 tam simülasyon** | ≥60/100; hedef ≥70 | Kişisel tekrar planı (4 hafta) |

> **Not:** Konuşma ve serbest yazma bölümleri tarayıcıda tam otomatik puanlanamaz. Öneri: (a) kontrol listesi ile **öz değerlendirme** (içerik noktaları, kelime/gramer kontrolü), (b) model cevapla yan yana karşılaştırma, (c) opsiyonel Web Speech API ile anahtar kelime tespiti. Sistem bu bölümlerin puanını "öz değerlendirme" olarak ayrı işaretlemeli.

### 10.2 Start Deutsch 1 (A1) — format ve simülasyon

| Modül | Süre | Bölümler | Madde | Ham puan → ölçekli |
|---|---|---|---|---|
| **Hören** | ~20 dk | Teil 1: 6 kısa günlük diyalog, çoktan seçmeli (a/b/c), 2 kez dinlenir · Teil 2: 4 anons (istasyon, mağaza), Richtig/Falsch, 1 kez · Teil 3: 5 telesekreter mesajı, a/b/c, 2 kez | 15 | 15 → 25 |
| **Lesen** | ~25 dk | Teil 1: 2 kısa metin (mesaj/e‑posta), 5 R/F · Teil 2: 5 durum, iki ilan/web sitesinden doğrusunu seç (a/b) · Teil 3: 5 tabela/duyuru, R/F | 15 | 15 → 25 |
| **Schreiben** | ~20 dk | Teil 1: Bir kişinin bilgileriyle form doldurma (5 boşluk) · Teil 2: 3 içerik noktalı kısa mesaj/e‑posta (~30 kelime; davet, rica, bilgi) | 5 + 10 | 15 → 25 |
| **Sprechen** | ~15 dk (grup) | Teil 1: Kendini tanıtma (Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby) + harf/sayı · Teil 2: Konu kartlarıyla soru sor‑cevap ver (ör. *Thema: Essen — Kartenwort: Frühstück*) · Teil 3: Resim kartlarıyla rica formüle et ve tepki ver | — | 15 → 25 (yaklaşık; Teil 1: 3, Teil 2: 6, Teil 3: 6) |
| **Toplam** | ~65 dk + Sprechen | | | **100 puan; geçme ≥ 60** |

**Sistemdeki simülasyon kuralları**
- Zamanlayıcı ve "Sadece 1/2 kez dinle" kısıtı (ses oynatıcı sayaç kilidi).
- Sprechen Teil 2/3: Sistem kart gösterir → kullanıcı soru/rica kaydeder → model örnekler ve kontrol listesi ile öz puanlama (0/0,5/1 her madde).
- Schreiben Teil 2: 3 içerik noktası kontrolü (her biri 0/1,5/3 puan, iletişimsel tasarım 0/0,5/1) — Goethe değerlendirme ölçütlerine paralel kontrol listesi.
- Sonuç ekranı: Modül puanları, geçti/kaldı, beceri zayıflık haritası, ilgili ünite linkleri.

### 10.3 Goethe‑Zertifikat A2 — format ve simülasyon

| Modül | Süre | Bölümler | Madde | Puan |
|---|---|---|---|---|
| **Hören** | ~30 dk | Teil 1: 5 kısa radyo/telefon metni (a/b/c), 2 kez · Teil 2: Bir diyalog, 5 kişiyi/günü bilgiyle eşleştirme, 1 kez · Teil 3: 5 kısa günlük diyalog (resim/metin seçimi), 2 kez · Teil 4: Radyo röportajı, 5 Ja/Nein, 2 kez | 20 | 25 |
| **Lesen** | ~30 dk | Teil 1: Gazete haberi/blog, 5 a/b/c · Teil 2: Mağaza rehberi/program, 5 a/b/c · Teil 3: E‑posta/mektup, 5 a/b/c · Teil 4: 6 (7) kişi ↔ ilanlar eşleştirme (bir kişi için ilan yok "0") | 20 | 25 |
| **Schreiben** | ~30 dk | Teil 1: SMS/kısa mesaj (~20–30 kelime, 3 içerik noktası) · Teil 2: Yarı resmi e‑posta/mesaj (~30–40 kelime, 3 içerik noktası; davet cevabı, rica, iptal) | 2 | 25 |
| **Sprechen** | ~15 dk (çift) | Teil 1: Kartlarla birbirine kişisel sorular sorma (4 kart) · Teil 2: Bir konu kartına göre kendi hayatından anlatma (ör. *Wohnen, Freizeit, Essen*) + partnerin sorusuna cevap · Teil 3: Birlikte bir şey planlama (iki farklı randevu takvimi ile ortak zaman bulma) | — | 25 |
| **Toplam** | | | | **100; geçme ≥ 60** (yazılı modüller 75 + sözlü 25) |

**Sistemdeki simülasyon:** A2 Sprechen "çift" format gerektirdiğinden, partner replikleri önceden kaydedilmiş ses dosyalarıdır; Teil 3'te kullanıcıya bir takvim, "partnere" farklı takvim verilir; partner öneri yapar ("Hast du am Samstag um 10 Zeit?"), kullanıcı kendi takvimine bakıp sesle cevaplar; dal yapısı (`branches`) ile 3–4 adımlı senaryo.

### 10.4 Sınav banka hacmi önerisi

| Seviye | Tam simülasyon seti | Kısaltılmış (KN) seti | Not |
|---|---|---|---|
| A1 | 3 tam set (Modelltest 1–3) | 2 set | Goethe'nin kendi ücretsiz Übungssatz'ı dışarıdan link olarak önerilebilir (telif nedeniyle içerik kopyalanmaz). |
| A2 | 3 tam set | 2 set | Aynı |

---

## 11. JSON veri modeli

### 11.1 Dosya organizasyonu (öneri)

```
/data
  curriculum.json          # seviye → ünite listesi, kontrol noktaları
  grammar.json             # G01–G67 (id, title, prereq, trNote, difficulty, mode, tables)
  chunks.json              # §6 kalıplar
  sounds.json              # P01–P24 telaffuz birimleri
  units/
    u00.json … u28.json    # her ünite tek dosya (lazy load)
  exams/
    a1-modell-1.json …     # sınav setleri
/audio
  u04/ d1.mp3, v_kaffee.mp3 …
```

### 11.2 Tam ünite örneği — Ünite 4 "Essen & Trinken" (kısaltılmamış yapı, temsilî içerik)

> Kelime listesi örnek amacıyla 12 madde gösterir; gerçek dosyada ~55 aktif + ~15 pasif madde bulunur. Diğer alanlar tam yapıdadır.

```json
{
  "id": "u04",
  "level": "A1.1",
  "order": 4,
  "title": { "de": "Essen & Trinken", "tr": "Yiyecek ve içecek" },
  "estimatedMinutes": 300,
  "prerequisites": { "units": ["u03"], "grammar": ["G09", "G10"] },
  "goals": [
    { "id": "u04.g1", "skill": "sprechen", "de": "Ich kann im Café etwas bestellen und bezahlen.", "tr": "Kafede sipariş verip ödeme yapabilirim." },
    { "id": "u04.g2", "skill": "sprechen", "de": "Ich kann sagen, was ich gern / nicht gern esse und trinke.", "tr": "Neyi sevip sevmediğimi söyleyebilirim." },
    { "id": "u04.g3", "skill": "lesen",    "de": "Ich kann eine einfache Speisekarte verstehen.", "tr": "Basit bir menüyü anlayabilirim." },
    { "id": "u04.g4", "skill": "hoeren",   "de": "Ich kann Preise und Bestellungen im Café verstehen.", "tr": "Kafedeki fiyat ve siparişleri anlayabilirim." },
    { "id": "u04.g5", "skill": "schreiben","de": "Ich kann eine Einkaufsliste / mein Frühstück beschreiben.", "tr": "Kahvaltımı yazılı tarif edebilirim." }
  ],
  "grammar": [
    {
      "ref": "G11",
      "status": "introduced",
      "title": { "de": "Unbestimmter Artikel: ein / eine", "tr": "Belirsiz artikel: ein / eine" },
      "summary_tr": "Sayılabilen tekil isimlerden önce 'bir' anlamında ein (der/das) veya eine (die) kullanılır.",
      "table": {
        "headers": ["", "maskulin", "neutral", "feminin", "Plural"],
        "rows": [["bestimmt", "der Kaffee", "das Brot", "die Milch", "die Äpfel"],
                 ["unbestimmt", "ein Kaffee", "ein Brot", "eine Banane", "– Äpfel"]]
      },
      "examples": [
        { "de": "Das ist ein Apfel.", "tr": "Bu bir elma." },
        { "de": "Das ist eine Banane.", "tr": "Bu bir muz." }
      ],
      "trNote": "Türkçede 'bir' çoğu zaman düşer ('Elma yiyorum'). Almancada sayılabilen tekil isimde artikel zorunludur."
    },
    {
      "ref": "G14",
      "status": "introduced",
      "title": { "de": "Ich möchte … / Ich hätte gern …", "tr": "İstek bildirme" },
      "summary_tr": "Kibar istek için 'möchte' veya 'hätte gern' kullanılır. İkinci bir fiil varsa cümlenin sonuna gider.",
      "table": {
        "headers": ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"],
        "rows": [["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"]]
      },
      "examples": [
        { "de": "Ich möchte einen Tee.", "tr": "Bir çay istiyorum." },
        { "de": "Ich möchte einen Tee trinken.", "tr": "Bir çay içmek istiyorum." }
      ],
      "trNote": "İkinci fiil sonda — Türkçe sıralamaya benzer: '... içmek istiyorum'."
    },
    {
      "ref": "G15",
      "status": "introduced",
      "title": { "de": "Akkusativ (Einführung): einen / den", "tr": "Akkusativ'e giriş" },
      "summary_tr": "Fiilin doğrudan nesnesi Akkusativ'dedir. Sadece maskulin değişir: der → den, ein → einen.",
      "table": {
        "headers": ["", "maskulin", "neutral", "feminin", "Plural"],
        "rows": [["Nominativ", "der / ein Kaffee", "das / ein Brot", "die / eine Cola", "die / – Eier"],
                 ["Akkusativ", "den / einen Kaffee", "das / ein Brot", "die / eine Cola", "die / – Eier"]]
      },
      "examples": [
        { "de": "Ich nehme einen Kaffee.", "tr": "Bir kahve alıyorum." },
        { "de": "Ich esse den Kuchen.", "tr": "Pastayı yiyorum." }
      ],
      "trNote": "Türkçedeki belirtme eki (-ı/-i) ile benzer: 'Pastayı yiyorum' = den Kuchen. Ama Almancada belirsiz nesne de çekimlidir: 'bir kahve' = einen Kaffee."
    }
  ],
  "vocab": [
    { "id": "v.kaffee",   "de": "Kaffee",   "pos": "noun", "artikel": "der", "plural": "-s",  "pluralForm": "Kaffees",   "tr": "kahve",     "example": { "de": "Ich hätte gern einen Kaffee.", "tr": "Bir kahve alabilir miyim?" }, "audio": "audio/u04/v_kaffee.mp3", "freq": 1, "goethe": "A1", "active": true, "note_tr": "Almanya'da vurgu başta: KAffee; Avusturya'da sonda." },
    { "id": "v.tee",      "de": "Tee",      "pos": "noun", "artikel": "der", "plural": "-s",  "pluralForm": "Tees",      "tr": "çay",       "example": { "de": "Möchtest du einen Tee?", "tr": "Çay ister misin?" }, "audio": "audio/u04/v_tee.mp3", "freq": 1, "goethe": "A1", "active": true },
    { "id": "v.wasser",   "de": "Wasser",   "pos": "noun", "artikel": "das", "plural": "-",   "pluralForm": "Wasser",    "tr": "su",        "example": { "de": "Ein Wasser, bitte.", "tr": "Bir su, lütfen." }, "audio": "audio/u04/v_wasser.mp3", "freq": 1, "goethe": "A1", "active": true },
    { "id": "v.milch",    "de": "Milch",    "pos": "noun", "artikel": "die", "plural": null,  "pluralForm": null,        "tr": "süt",       "example": { "de": "Mit Milch und Zucker?", "tr": "Sütlü ve şekerli mi?" }, "audio": "audio/u04/v_milch.mp3", "freq": 1, "goethe": "A1", "active": true, "uncountable": true },
    { "id": "v.broetchen","de": "Brötchen", "pos": "noun", "artikel": "das", "plural": "-",   "pluralForm": "Brötchen",  "tr": "küçük ekmek, sandviç ekmeği", "example": { "de": "Ich esse zwei Brötchen.", "tr": "İki küçük ekmek yiyorum." }, "audio": "audio/u04/v_broetchen.mp3", "freq": 2, "goethe": "A1", "active": true, "variants": { "AT": "die Semmel", "CH": "das Brötli" }, "rule": "-chen → das" },
    { "id": "v.apfel",    "de": "Apfel",    "pos": "noun", "artikel": "der", "plural": "¨",   "pluralForm": "Äpfel",     "tr": "elma",      "example": { "de": "Der Apfel ist süß.", "tr": "Elma tatlı." }, "audio": "audio/u04/v_apfel.mp3", "freq": 2, "goethe": "A1", "active": true },
    { "id": "v.ei",       "de": "Ei",       "pos": "noun", "artikel": "das", "plural": "-er", "pluralForm": "Eier",      "tr": "yumurta",   "example": { "de": "Zum Frühstück esse ich ein Ei.", "tr": "Kahvaltıda bir yumurta yerim." }, "audio": "audio/u04/v_ei.mp3", "freq": 2, "goethe": "A1", "active": true },
    { "id": "v.kuchen",   "de": "Kuchen",   "pos": "noun", "artikel": "der", "plural": "-",   "pluralForm": "Kuchen",    "tr": "pasta, kek","example": { "de": "Der Kuchen ist lecker.", "tr": "Pasta lezzetli." }, "audio": "audio/u04/v_kuchen.mp3", "freq": 2, "goethe": "A1", "active": true },
    { "id": "v.rechnung", "de": "Rechnung", "pos": "noun", "artikel": "die", "plural": "-en", "pluralForm": "Rechnungen","tr": "hesap, fatura", "example": { "de": "Die Rechnung, bitte!", "tr": "Hesap lütfen!" }, "audio": "audio/u04/v_rechnung.mp3", "freq": 2, "goethe": "A1", "active": true, "rule": "-ung → die" },
    { "id": "v.essen",    "de": "essen",    "pos": "verb", "tr": "yemek (yemek yemek)", "forms": { "er": "isst", "partizip": "gegessen", "aux": "haben" }, "separable": false, "irregular": true, "example": { "de": "Was isst du gern?", "tr": "Ne yemeyi seversin?" }, "audio": "audio/u04/v_essen.mp3", "freq": 1, "goethe": "A1", "active": true, "note_tr": "du isst / er isst (e→i). Kök değişimi Ünite 7'de ayrıntılı." },
    { "id": "v.lecker",   "de": "lecker",   "pos": "adj",  "tr": "lezzetli", "example": { "de": "Das Brot ist lecker.", "tr": "Ekmek lezzetli." }, "audio": "audio/u04/v_lecker.mp3", "freq": 2, "goethe": "A1", "active": true },
    { "id": "v.speisekarte","de": "Speisekarte","pos": "noun","artikel": "die","plural": "-n","pluralForm": "Speisekarten","tr": "menü, yemek listesi", "example": { "de": "Die Speisekarte, bitte.", "tr": "Menü lütfen." }, "audio": "audio/u04/v_speisekarte.mp3", "freq": 3, "goethe": "A1", "active": false }
  ],
  "chunks": ["c17", "c18", "c19", "c20", "c21", "c22", "c23", "c48"],
  "dialogs": [
    {
      "id": "u04.d1",
      "title": { "de": "Im Café", "tr": "Kafede" },
      "setting_tr": "Elif bir kafede sipariş veriyor.",
      "audio": { "normal": "audio/u04/d1.mp3", "slow": "audio/u04/d1_slow.mp3" },
      "speakers": { "K": "Kellner", "E": "Elif" },
      "lines": [
        { "s": "K", "de": "Guten Tag! Was möchten Sie?",                 "tr": "İyi günler! Ne istersiniz?", "t": [0.0, 2.1] },
        { "s": "E", "de": "Ich hätte gern einen Kaffee, bitte.",          "tr": "Bir kahve alabilir miyim, lütfen.", "t": [2.3, 4.6], "highlight": ["hätte gern", "einen Kaffee"] },
        { "s": "K", "de": "Mit Milch und Zucker?",                         "tr": "Sütlü ve şekerli mi?", "t": [4.8, 6.2] },
        { "s": "E", "de": "Nur mit Milch. Und ein Stück Kuchen, bitte.",   "tr": "Sadece sütlü. Bir de bir dilim pasta, lütfen.", "t": [6.4, 9.3], "highlight": ["ein Stück Kuchen"] },
        { "s": "K", "de": "Gern. … So, bitte schön.",                       "tr": "Memnuniyetle. … Buyurun.", "t": [9.5, 11.6] },
        { "s": "E", "de": "Danke. … Zahlen, bitte!",                        "tr": "Teşekkürler. … Hesap lütfen!", "t": [11.8, 13.9] },
        { "s": "K", "de": "Das macht 6,80 Euro.",                           "tr": "6,80 Euro ediyor.", "t": [14.1, 15.9] },
        { "s": "E", "de": "Sieben Euro. Stimmt so.",                        "tr": "Yedi Euro. Üstü kalsın.", "t": [16.1, 18.0] },
        { "s": "K", "de": "Vielen Dank! Schönen Tag noch!",                 "tr": "Çok teşekkürler! İyi günler!", "t": [18.2, 20.0] }
      ],
      "comprehension": [
        { "type": "mc", "q": { "de": "Was trinkt Elif?", "tr": "Elif ne içiyor?" }, "options": ["Tee", "Kaffee mit Milch", "Kaffee mit Zucker"], "answer": 1 },
        { "type": "tf", "q": { "de": "Elif bezahlt 6,80 Euro.", "tr": "Elif 6,80 Euro ödüyor." }, "answer": false, "explain_tr": "Elif 7 Euro verir ve 'Stimmt so' der (üstü kalsın)." }
      ]
    }
  ],
  "lessons": [
    { "id": "u04.l1", "type": "words",      "title": { "de": "Wörter: Frühstück & Café", "tr": "Kelimeler" }, "vocab": ["v.kaffee","v.tee","v.wasser","v.milch","v.broetchen","v.apfel","v.ei","v.kuchen"], "exercises": ["u04.e1","u04.e2"] },
    { "id": "u04.l2", "type": "dialog",     "title": { "de": "Im Café", "tr": "Kafede" }, "dialog": "u04.d1", "exercises": ["u04.e3"] },
    { "id": "u04.l3", "type": "grammar",    "grammar": ["G11","G14"], "exercises": ["u04.e4","u04.e5"] },
    { "id": "u04.l4", "type": "grammar",    "grammar": ["G15"], "vocab": ["v.rechnung","v.essen","v.lecker","v.speisekarte"], "exercises": ["u04.e6","u04.e7"] },
    { "id": "u04.l5", "type": "read_write", "exercises": ["u04.e8","u04.e9"] },
    { "id": "u04.l6", "type": "speak",      "sounds": ["P05","P06"], "exercises": ["u04.e10","u04.e11"] },
    { "id": "u04.r",  "type": "review",     "source": "srs+errors", "scope": ["u02","u03","u04"] },
    { "id": "u04.t",  "type": "test",       "exercises": ["u04.t1","u04.t2","u04.t3","u04.t4"], "passScore": 0.7, "minPerSkill": 0.5 }
  ],
  "exercises": [
    { "id": "u04.e1", "type": "artikel", "items": ["v.kaffee","v.tee","v.wasser","v.milch","v.broetchen","v.apfel","v.ei","v.kuchen"], "options": ["der","die","das"] },
    { "id": "u04.e2", "type": "match", "pairs": [["der Apfel","elma"],["das Ei","yumurta"],["die Milch","süt"],["der Kuchen","pasta"]] },
    { "id": "u04.e3", "type": "dictation", "audio": "audio/u04/e3_preise.mp3", "items": [{ "answer": "6,80" }, { "answer": "2,50" }, { "answer": "12,90" }], "instruction_tr": "Fiyatları dinleyin ve yazın." },
    { "id": "u04.e4", "type": "cloze_choice", "grammar": "G11",
      "items": [
        { "text": "Das ist ___ Apfel.",   "options": ["ein","eine"], "answer": "ein" },
        { "text": "Das ist ___ Banane.",  "options": ["ein","eine"], "answer": "eine" },
        { "text": "Das ist ___ Brötchen.","options": ["ein","eine"], "answer": "ein", "hint_tr": "-chen ile biten isimler hep 'das'." }
      ] },
    { "id": "u04.e5", "type": "order", "grammar": "G14",
      "items": [
        { "tokens": ["Ich","möchte","einen","Tee","trinken"], "answer": "Ich möchte einen Tee trinken.", "explain_tr": "İkinci fiil (trinken) cümlenin sonunda." }
      ] },
    { "id": "u04.e6", "type": "cloze", "grammar": "G15",
      "items": [
        { "text": "Ich nehme ___ Kaffee. (ein)", "answer": "einen", "explain_tr": "der Kaffee → maskulin → Akkusativ: einen." },
        { "text": "Ich esse ___ Kuchen. (der)",  "answer": "den" },
        { "text": "Ich trinke ___ Cola. (eine)", "answer": "eine", "explain_tr": "Feminin Akkusativ'de değişmez." }
      ] },
    { "id": "u04.e7", "type": "transform", "grammar": "G15", "instruction_tr": "Cümleyi 'Ich hätte gern ...' ile yeniden yazın.",
      "items": [ { "from": "Das ist ein Salat.", "answer": "Ich hätte gern einen Salat." } ] },
    { "id": "u04.e8", "type": "tf", "skill": "lesen", "text": { "de": "Café Sonne – Frühstück von 8 bis 11 Uhr. Kaffee 2,80 €, Tee 2,20 €, Brötchen mit Käse 3,50 €. Montag Ruhetag." },
      "items": [ { "q": "Am Montag ist das Café zu.", "answer": true }, { "q": "Ein Tee kostet 2,80 €.", "answer": false } ] },
    { "id": "u04.e9", "type": "write_free", "skill": "schreiben", "prompt": { "de": "Was essen und trinken Sie zum Frühstück? Schreiben Sie 4–5 Sätze.", "tr": "Kahvaltıda ne yiyip içiyorsunuz? 4–5 cümle yazın." },
      "checklist": [ { "tr": "En az 3 yiyecek/içecek adı (artikelli)" }, { "tr": "'gern' veya 'nicht gern' kullanımı" }, { "tr": "En az bir Akkusativ (einen/den)" } ],
      "keywords": ["Kaffee","Tee","Brötchen","Ei","gern"],
      "model": { "de": "Zum Frühstück trinke ich einen Tee. Ich esse gern Brot mit Käse und ein Ei. Ich trinke nicht gern Kaffee.", "tr": "Kahvaltıda bir çay içerim. ..." } },
    { "id": "u04.e10", "type": "listen_select", "sound": "P05/P06", "items": [ { "audio": "audio/u04/p_milch.mp3", "options": ["[ç] Ich-Laut","[x] Ach-Laut"], "answer": 0 }, { "audio": "audio/u04/p_kuchen.mp3", "options": ["[ç] Ich-Laut","[x] Ach-Laut"], "answer": 1 } ] },
    { "id": "u04.e11", "type": "roleplay", "skill": "sprechen", "role": "E", "dialog": "u04.d1", "mode": "user_speaks_role",
      "prompts_tr": ["Garsona bir çay ve bir dilim pasta sipariş edin.", "Hesabı isteyin.", "Üstünün kalmasını söyleyin."],
      "expected": [["Ich hätte gern einen Tee", "Ich möchte einen Tee"], ["Zahlen, bitte", "Die Rechnung, bitte"], ["Stimmt so"]],
      "asr": { "lang": "de-DE", "matchMode": "keywords" } }
  ],
  "finalTask": {
    "id": "u04.final",
    "title": { "de": "Bestellen im Café", "tr": "Kafede sipariş" },
    "description_tr": "Garsonun sorularını dinleyin ve sesli cevap verin: 2 ürün sipariş edin, bir soruya cevap verin, hesabı ödeyin.",
    "skills": ["hoeren","sprechen"],
    "rubric": [ { "tr": "Kibar sipariş kalıbı (hätte gern/möchte)", "points": 2 }, { "tr": "Doğru Akkusativ (einen …)", "points": 2 }, { "tr": "Hesap isteme + ödeme kalıbı", "points": 2 } ],
    "selfAssessment": true
  },
  "landeskunde": { "tr": "Almanya'da 'Kaffee und Kuchen' öğleden sonra geleneğidir. Bahşiş genelde %5–10; ödeme sırasında toplamı yuvarlayıp söylenir: 'Sieben Euro, stimmt so.'" },
  "canDoCheck": ["u04.g1", "u04.g2", "u04.g3", "u04.g4", "u04.g5"]
}
```

### 11.3 grammar.json kaydı örneği

```json
{
  "id": "G15",
  "title": { "de": "Akkusativ", "tr": "Akkusativ (-i hâli)" },
  "level": "A1.1",
  "units": { "introduced": "u04", "expanded": ["u05", "u12", "u13"], "reviewed": ["u14", "u28"] },
  "prerequisites": ["G11"],
  "difficultyTR": 4,
  "mode": "P",
  "trNote": "Türkçe belirtme hâli (-ı/-i) ile köprü; ama sadece maskulin artikel değişir ve belirsiz nesne de çekimlidir.",
  "commonErrors": [
    { "wrong": "Ich habe ein Bruder.", "right": "Ich habe einen Bruder.", "why_tr": "haben + Akkusativ; der Bruder → einen." }
  ]
}
```

### 11.4 Doğrulama kuralları (içerik lint scripti için)

1. Her `vocab` ismi: `artikel` ∈ {der, die, das} ve `plural` alanı tanımlı (null = çoğulsuz).
2. `example.de` içindeki her kelime: bu ünite veya önceki ünitelerin `vocab`/`chunks` listesinde ya da stopword (*ich, und, ist…*) listesinde olmalı (bilinmeyen kelime ≤1 tolerans).
3. Alıştırmada referans verilen `grammar` ID'si o ünitede veya öncesinde `introduced` olmalı.
4. Her ünitede 4 becerinin her biri için ≥1 alıştırma; `finalTask` zorunlu.
5. Ses dosyası yolları mevcut olmalı (build sırasında).
6. Toplam kelime: A1 ünitelerinde aktif ≥ 680, A2 sonunda ≥ 1300; Goethe listesi kapsaması ≥ %95 (§5.4).

---

## 12. Türkçe konuşanlara özgü zorluklar

| Alan | Zorluk | Avantaj / köprü | Sistem önlemi |
|---|---|---|---|
| Artikel / cinsiyet | Türkçede yok → en kalıcı hata kaynağı | — | Renk kodu, artikel kuralları kartı, her isim artikel ile SRS, "Artikel-Training" günlük mini oyun |
| Kelime sırası V2 / Inversion | SOV alışkanlığı | — | `order` alıştırmaları her ünitede; renkli pozisyon şeması (Pos.1 / Verb / … / Ende) |
| Satzklammer (Modal, trennbar, Perfekt) | Fiilin parçalanması | Türkçe "fiil sonda" sezgisi | Çerçeve görselleştirmesi |
| Nebensatz (weil, dass, wenn, ob) | Virgül ve fiil‑fiil sırası | **Fiil sonda — Türkçeye benzer** | "Türkçe gibi düşün" ipucu |
| Hâller (Akk/Dat) | Edat → hâl ezberi | Türkçe ‑i / ‑e / ‑de / ‑den ile kısmi eşleşme | Karşılaştırma tablosu + istisnalar (fragen + Akk) |
| Çoğul | Çok sayıda kalıp; sayıdan sonra çoğul | — | Plural her isim kartında; "zwei Bücher" uyarısı |
| Zamir er/sie/es (eşya) | "o" tek | — | Eşyaları zamirle gösterme alıştırmaları |
| Sie / du | — | sen/siz ayrımı aynı mantık | Erken tanıtım |
| Umlaut ö/ü | — | Türkçede var | Hızlı geçiş |
| Ünlü uzunluğu, ei/ie, z, s, v/w | Fonolojik farklar | — | Minimal çift, Ünite 0 + Aussprache-Ecke |
| Ünsüz kümeleri (Str‑, Schr‑, Pf‑) | Ünlü ekleme (epentez) | — | Hece hece yavaş → hızlı tekrar |
| Auslautverhärtung | — | kitap/kitabı ile aynı | Köprü olarak anlat |
| Sayılar (21–99), saat (halb) | Ters okuma, "halb drei" | — | Yoğun dikte, saat oyunu |
| Ayrılabilir fiil, Perfekt haben/sein | Analogu yok | — | Fiil kartında `separable`, `aux` alanı |
| Konjunktiv II nezaket | — | ‑ebilir miydiniz / ‑sa ile köprü | Önce chunk |
| "seit + Präsens" | Türkçe ‑dir ile aynı zaman mantığı | Avantaj | Vurgula |

---

## 13. Açık sorular

1. **Ses üretimi:** Tüm ses dosyaları (≈ 1350 kelime + ~1500 örnek cümle + ~60 diyalog + sınav setleri) için TTS mi (ör. önceden üretilmiş neural TTS), yoksa tarayıcıda Web Speech API mi? Sınav simülasyonu için önceden üretilmiş dosya önerilir (tutarlılık, hız kontrolü). → *Teknik mimari kolu*.
2. **Konuşma değerlendirmesi:** Web Speech API sadece Chromium'da güvenilir; Firefox/Safari'de öz değerlendirmeye düşülmeli. → *Teknik/pedagoji kolu*.
3. **Telif:** Goethe Modelltest içerikleri kopyalanmamalı; sistem kendi özgün sınav setlerini Goethe *formatında* üretir, resmi Übungssätze'ye link verilir.
4. **D‑A‑CH varyantları:** Pasif tutuldu; kullanıcı Avusturya/İsviçre'ye gidecekse ayar ile aktifleştirilebilir.
5. **Integrationskurs/DTZ uyumu:** Kullanıcı Almanya'da yaşıyorsa, A2.2 ünitelerine (22–23) DTZ (Deutsch-Test für Zuwanderer) formatı opsiyonel olarak eklenebilir.
6. **SRS algoritması ve ilerleme modeli** (FSRS/SM‑2, ünite kilitleme kuralları) → *Öğrenme bilimi / SRS kolu*.
