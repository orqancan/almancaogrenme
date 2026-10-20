# 01 — Öğrenme Bilimi ve Pedagoji Analizi

> **Kapsam:** Türkçe ana dilli, sıfırdan başlayan bir yetişkinin, öğretmensiz ve yalnızca tarayıcıda çalışan statik bir HTML/JS sistemiyle **A1 → A2** seviyesine ulaşması için gereken pedagojik temeller ve bunların **sistem özelliklerine** dönüşümü.
>
> **Durum:** Analiz / tasarım girdisi. Diğer kollar (içerik, ses/telaffuz, teknik mimari, UX vb.) için referans belgedir.
>
> **Kanıt düzeyi notasyonu:** **[Kanıt: güçlü]** meta-analiz / çok sayıda replikasyon · **[Kanıt: orta]** birkaç sağlam çalışma, bağlama duyarlı · **[Kanıt: zayıf]** yaygın kabul ama doğrudan kanıt sınırlı / kuramsal.

---

## İçindekiler

1. [Yönetici özeti](#1-yönetici-özeti)
2. [Aralıklı tekrar (SRS): SM-2 vs FSRS](#2-aralıklı-tekrar-srs-sm-2-vs-fsrs)
3. [Bellek ve öğrenme ilkeleri](#3-bellek-ve-öğrenme-ilkeleri)
4. [İkinci dil edinimi (SLA) kuramları ve A1–A2 uygulaması](#4-ikinci-dil-edinimi-sla-kuramları-ve-a1a2-uygulaması)
5. [Kelime, chunk ve artikel öğretimi](#5-kelime-chunk-ve-artikel-öğretimi)
6. [Türkçe konuşanlar için zorluklar ve pozitif transfer](#6-türkçe-konuşanlar-için-zorluklar-ve-pozitif-transfer)
7. [Oturum, gün ve hafta yapısı](#7-oturum-gün-ve-hafta-yapısı)
8. [Motivasyon, alışkanlık, metakognisyon, geri bildirim, mastery](#8-motivasyon-alışkanlık-metakognisyon-geri-bildirim-mastery)
9. [Süre tahmini ve takvim](#9-süre-tahmini-ve-takvim)
10. [İlke → Sistem özelliği eşleme tablosu](#10-ilke--sistem-özelliği-eşleme-tablosu)
11. [Kritik tasarım kararları ve açık sorular](#11-kritik-tasarım-kararları-ve-açık-sorular)
12. [Kaynakça](#12-kaynakça)

---

## 1. Yönetici özeti

Öğretmensiz bir sistemin başarısı üç şeye bağlıdır: **(a)** doğru şeyi doğru zamanda tekrar ettirmek (SRS + retrieval), **(b)** anlaşılır ama hafif zorlayıcı bol girdi sunmak (i+1, dinleme/okuma), **(c)** öğrenciyi her gün geri getirmek (alışkanlık, görünür ilerleme). Dilbilgisi açıklaması gerekli ama küçük bir paydır; zamanın büyük kısmı **anlamlı girdi + aktif hatırlama + kısa üretim** olmalıdır.

Ana öneriler:

- **Planlayıcı:** FSRS (ts-fsrs kütüphanesi, istemci tarafında), hedef hatırlama `0.90`, varsayılan parametrelerle başla; ~1000 tekrar biriktikten sonra tarayıcıda kişisel optimizasyon opsiyonel.
- **Öğrenme birimi:** Tek kelime değil **cümle içinde kelime + chunk**. Her isim kartı artikel + çoğul ile birlikte; renk kodlu (der=mavi, die=kırmızı, das=yeşil).
- **Kart tipleri:** Tanıma (DE→TR) değil, ağırlıklı olarak **üretim** (TR→DE yazma), **cloze**, **dinle-yaz (dikte)**.
- **Oturum:** 30 dk temel (60 dk genişletilmiş) — tekrar → yeni girdi → kontrollü pratik → serbest üretim → özet.
- **Mastery kapısı:** Bir ünite ancak ünite testinde **≥%85** ve aktif kartların hatırlama oranı ≥%80 ise "tamamlandı" sayılır; ama yeni üniteye geçiş **yumuşak kilitli** (uyarı, engel değil).
- **Süre:** A1 ≈ 100–150 saat, A2 ≈ +120–180 saat (kümülatif ≈ 220–330 saat). Günlük 30 dk ile A2 ≈ 13–18 ay, günlük 60 dk ile ≈ 7–10 ay.

---

## 2. Aralıklı tekrar (SRS): SM-2 vs FSRS

### 2.1 Arka plan [Kanıt: güçlü]

- **Ebbinghaus (1885)** unutma eğrisi; **aralık etkisi (spacing effect)** psikolojinin en çok replike edilen bulgularından biridir. Cepeda ve ark. (2006) 254 çalışmalık meta-analizde dağıtık çalışmanın yığılmış çalışmaya belirgin üstünlüğünü göstermiştir. Cepeda ve ark. (2008): optimal aralık, hedef saklama süresinin ~%10–20'si civarındadır.
- **SRS** = her öğe için bir sonraki tekrarı, unutmanın eşiğine yaklaştığı ana planlamak.

### 2.2 SM-2 (SuperMemo 2, Woźniak 1987; Anki'nin eski varsayılanı)

| Özellik | Açıklama |
|---|---|
| Durum | Kart başına `ease factor (EF)` (başlangıç 2.5, alt sınır 1.3), `interval`, `repetitions` |
| Güncelleme | Notu 0–5 (Anki'de 4 düğme). `I(1)=1, I(2)=6, I(n)=I(n-1)×EF` |
| Artı | Basit (~30 satır kod), şeffaf, öngörülebilir, iyi bilinir |
| Eksi | **"Ease hell"**: "Zor/Again" basıldıkça EF düşer ve kart kalıcı olarak çok sık gelir; gecikmiş tekrarları dikkate almaz; hedef hatırlama oranı ayarlanamaz; kişiselleşmez |

### 2.3 FSRS (Free Spaced Repetition Scheduler — Jarrett Ye / open-spaced-repetition)

- **Model:** DSR (Difficulty–Stability–Retrievability) bellek modeli. Her kart için:
  - **D (difficulty)** 1–10,
  - **S (stability)**: hatırlanabilirliğin %90'a düştüğü gün sayısı,
  - **R (retrievability)**: şu an hatırlama olasılığı, `R(t) = (1 + F·t/S)^C` biçiminde bir güç-yasası unutma eğrisi.
- Sonraki aralık, **hedef hatırlama (desired retention)** değerine göre hesaplanır: R bu eşiğe düştüğünde kart gelir.
- Akademik temel: Ye, Su & Cao (2022), *"A Stochastic Shortest Path Algorithm for Optimizing Spaced Repetition Scheduling"* (KDD '22); Su, Ye ve ark. (2023, IEEE TKDE).
- Anki 23.10'dan itibaren yerleşik; sonraki sürümlerde varsayılan planlayıcı konumuna gelmiştir.
- Açık kaynak benchmark'ta (open-spaced-repetition/srs-benchmark, yüz milyonlarca Anki tekrar kaydı) tahmin hatası SM-2'den belirgin biçimde düşüktür; pratikte **aynı hatırlama oranı için ~%20–30 daha az tekrar** iddia edilir (bu yüzdelik kaynaklar arasında 15–40 arası değişir, dikkatle alınmalı).
- JS/TS uygulaması: **`ts-fsrs`** (npm, MIT) — backend gerektirmez, tarayıcıda çalışır; optimizer'ın WASM sürümü de (`fsrs-browser`) mevcuttur.

### 2.4 Karşılaştırma

| Ölçüt | SM-2 | FSRS |
|---|---|---|
| Uygulama karmaşıklığı | Çok düşük | Orta (hazır kütüphane ile düşük) |
| Hatırlama hedefi ayarı | Yok | Var (`request_retention`) |
| Gecikmiş tekrarı doğru ele alma | Zayıf | İyi (R'yi geçen gerçek süreye göre hesaplar) |
| Ease hell | Var | Yok (D ortalamaya geri çekilir) |
| Kişiselleştirme | Yok | Tekrar geçmişinden parametre optimizasyonu |
| Tekrar yükü (aynı retention) | Referans | ~%20–30 daha az (benchmark iddiası) |
| Tatil/ara sonrası toparlanma | Kötü (yığılma) | Daha iyi; R'ye göre önceliklendirme mümkün |
| Statik HTML uyumu | Mükemmel | Mükemmel (`ts-fsrs` saf JS) |

### 2.5 Öneri: **FSRS**

Gerekçe: Öğretmensiz bir sistemde en kıt kaynak öğrencinin zamanı ve motivasyonudur; FSRS daha az tekrarla aynı hatırlamayı sağlar ve **ara verip geri dönen** öğrencide (kendi kendine öğrenmenin en tipik durumu) çok daha iyi davranır. Yedek plan: kütüphane yüklenemezse SM-2 fallback'i (aynı kart veri modeliyle).

### 2.6 Önerilen parametreler

| Parametre | Değer | Gerekçe |
|---|---|---|
| `request_retention` | **0.90** (ayarlanabilir 0.85–0.93) | Varsayılan; 0.95'e çıkmak tekrar yükünü yaklaşık 2 katına çıkarır |
| `maximum_interval` | 365 gün (A1–A2 için) | Kısa vadeli hedef; uzun aralıklar zaten gerekmiyor |
| `enable_fuzz` | true | Aynı gün eklenen kartların aynı gün yığılmasını önler |
| `enable_short_term` | true | Aynı gün içi öğrenme adımları |
| Öğrenme adımları | 1 dk → 10 dk (yeni kart), relearn 10 dk | Anki ile uyumlu, kanıtlanmış pratik |
| Puanlama | **4 düğme** (Again / Hard / Good / Easy) — ama yazma kartlarında **otomatik puan** (bkz. 2.8) | |
| Optimizasyon | Varsayılan `w` ile başla; ≥1000 tekrar sonrası "Kişisel ayar" düğmesi | Az veriyle optimizasyon aşırı uyum yapar |

### 2.7 Günlük yeni kart ve tekrar limitleri

Kural: **günlük tekrar yükü ≈ yeni kart/gün × 8–10** (FSRS, retention 0.9, kararlı durumda kabaca).

| Senaryo | Yeni kart/gün | Beklenen tekrar/gün (kararlı) | SRS süresi |
|---|---|---|---|
| 30 dk/gün | **8–10** (hafta sonu 0–5) | 70–100 | ~12–15 dk |
| 60 dk/gün | **15–20** | 130–180 | ~20–25 dk |
| İlk 2 hafta (her iki senaryo) | 5–8 | — | Alışma dönemi |

Ek kurallar:
- **Maksimum tekrar/gün:** 200 (sert sınır), ama tekrarlar **yeni karttan önce** gelir.
- **Dinamik yeni kart freni:** Bekleyen (due) tekrar sayısı > `yeniKartLimiti × 12` ise o gün yeni kart sayısını yarıya indir; > ×20 ise sıfırla ve "Tekrar günü" ilan et.
- **Ara sonrası geri dönüş modu:** 3+ gün ara verildiyse, birikmiş kartları R'si en düşük olandan başlayarak günde en fazla 150 tane göster; geri kalanı birkaç güne yay (suçluluk duygusu üretmeyen mesajla).
- **Kelime sayısı hedefi:** A1 sonunda ~650–800 aktif öğe (kelime + chunk), A2 sonunda ~1300–1600 öğe. 8–10 yeni/gün × ~300 çalışma günü ≈ 2400–3000 kart — kelime + chunk + dilbilgisi kalıp kartları toplamı için yeterli.

### 2.8 Kart tipi ve puanlama

| Kart tipi | Yön | Etkinlik | Puanlama |
|---|---|---|---|
| Tanıma | DE → TR (ses + metin) | En kolay; yeni kartın ilk 1–2 görünümü | Öz-değerlendirme (4 düğme) |
| **Üretim** | TR → DE (yaz) | **Ana tip** (generation effect) | Otomatik: tam doğru → Good; yalnızca artikel/umlaut/büyük harf hatası → Hard; yanlış → Again; hızlı + doğru (< ~5 sn) → Easy önerisi |
| **Cloze** | DE cümlede boşluk | Bağlamlı üretim, artikel/çekim | Otomatik |
| **Dikte** | Ses → yaz | Dinleme + yazım | Otomatik (Levenshtein toleransı + vurgulu fark) |
| Artikel çabuk | İsim → der/die/das | Hızlı 3 düğme | Otomatik |
| Konuşma | TR/görsel → sesli söyle | Shadowing/üretim | Öz-değerlendirme (kayıt + model ses karşılaştırma) |

**Önemli:** Bir "not" (ör. *der Bahnhof*) birden fazla kart üretir (tanıma, üretim, cloze, dikte). Kardeş kartlar aynı gün gösterilmez (**sibling burying**).

---

## 3. Bellek ve öğrenme ilkeleri

### 3.1 Retrieval practice / testing effect [Kanıt: güçlü]
- **Bulgu:** Bilgiyi tekrar okumak yerine **hatırlamaya çalışmak** uzun vadeli saklamayı belirgin artırır (Roediger & Karpicke, 2006; Karpicke & Roediger, 2008, *Science*; Rowland 2014 meta-analizi, g ≈ 0.50; Adesope ve ark. 2017).
- Dil öğreniminde: Karpicke & Roediger (2008) — Swahili-İngilizce kelime çiftlerinde test edilen grup %80, yalnız tekrar çalışan grup %36 hatırladı (1 hafta sonra).
- **Uygulama:** Sistemde "sadece oku" ekranı minimumda tutulur. Her yeni girdi en geç **2–3 dakika** içinde bir hatırlama sorusuyla izlenir. Ünite özetleri bile "boşluk doldur" biçimindedir.

### 3.2 Interleaving (karıştırma) [Kanıt: orta]
- **Bulgu:** Benzer kategorilerin karışık çalışılması ayırt etmeyi geliştirir (Rohrer & Taylor 2007; Kornell & Bjork 2008; Brunmair & Richter 2019 meta-analizi — etki, birbirine benzeyen ve karıştırılan kategorilerde en güçlü, kelime listelerinde zayıf).
- **Uygulama:** Yeni dilbilgisi konusu ilk tanıtımda **bloklu** (yalnız Akkusativ), ikinci gün ve sonrasında **karışık** (Nominativ/Akkusativ/Dativ birlikte; *ich/du/er* çekimleri karışık; *der/die/das* karışık). Karışık alıştırma setleri "Hangi hal?" sorusunu açıkça sorar.

### 3.3 Elaboration ve elaborative interrogation [Kanıt: orta]
- **Bulgu:** "Neden böyle?" sorusu ve yeni bilgiyi eski bilgiye bağlamak kalıcılığı artırır (Dunlosky ve ark. 2013: orta fayda).
- **Uygulama:** Dilbilgisi kartlarında "Neden *dem*?" ipucu düğmesi → kısa açıklama ("*mit* her zaman Dativ ister; *der Freund* → *dem Freund*"). Türkçe karşılaştırma notları (bkz. §6).

### 3.4 Dual coding (ikili kodlama) [Kanıt: orta]
- **Bulgu:** Sözel + görsel kodlama birlikte daha iyi hatırlanır (Paivio 1971/1986; Mayer'in multimedya ilkeleri). Somut isimlerde güçlü, soyut kelimelerde zayıf.
- **Uygulama:** Somut isimlere basit ikon/emoji/SVG görsel; renkli artikel kodlaması da bir dual coding biçimidir. **Ses her zaman var** (görsel + yazı + ses). Ama Mayer'in "redundancy" ilkesine dikkat: uzun metinde ses + aynı metni okutma yükü artırabilir; dinleme alıştırmasında metin varsayılan olarak gizli olmalı.

### 3.5 Generation effect (üretme etkisi) [Kanıt: güçlü]
- **Bulgu:** Kişinin kendisinin ürettiği bilgi, okunan bilgiden daha iyi hatırlanır (Slamecka & Graf 1978; Bertsch ve ark. 2007 meta-analizi, d ≈ 0.40).
- **Uygulama:** Çoktan seçmeli yerine **yazma** ağırlıklı. Çoktan seçmeli yalnızca ilk tanıtım ve hız çalışmalarında. Öğrenci kendi örnek cümlesini yazabilir ("Benim cümlem" alanı → kişisel kart).

### 3.6 Desirable difficulties (istenen zorluklar) [Kanıt: güçlü]
- **Bjork (1994):** Öğrenme sırasında zorluk yaratan (aralık, karıştırma, test, bağlam değişimi) koşullar performansı anlık düşürüp uzun vadeli öğrenmeyi artırır. **Uyarı:** Zorluk "istenen" olmalı — öğrenci başarabilmeli. A1 başında aşırı zorluk motivasyonu öldürür.
- **Uygulama:** Hedef başarı oranı oturum başına **%75–90**. Sistem son 20 maddede başarı %70'in altına düşerse kolaylaştırır (ipucu, çoktan seçmeliye düşme), %95'in üstündeyse zorlaştırır (ipucusuz yazma, ses-yalnız). Bu, "%85 kuralı" ile uyumludur (Wilson ve ark. 2019, *Nature Communications* — öğrenmenin ~%85 doğruluk civarında optimal olduğu bulgusu; idealleştirilmiş modeller için, yaklaşık rehber).

### 3.7 Cloze (boşluk doldurma) [Kanıt: orta]
- Bağlam içinde hedef biçimi üretmeyi zorlar; hem kelime hem çekim/hal için ideal. Clozemaster/Anki "sentence cloze" pratiği yaygın.
- **Uygulama:** Üç seviye:
  1. *Seçmeli cloze:* `Ich trinke ___ Kaffee.` [den / dem / der]
  2. *İpuçlu cloze:* `Ich trinke ___ Kaffee. (der Kaffee, Akk.)`
  3. *Serbest cloze:* `Ich fahre mit ___ Bus.` (ipucusuz)

### 3.8 Sentence mining (cümle madenciliği) [Kanıt: orta]
- Kişinin karşılaştığı ve **tam olarak bir bilinmeyen** içeren cümleleri (i+1 cümleler) karta dönüştürmesi. Lexical approach ve i+1 ile uyumlu; topluluk pratiği güçlü, kontrollü çalışma sınırlı.
- **Uygulama (A2'de):** Okuma/dinleme metninde bir kelimeye tıklayınca "Bu cümleyi kartıma ekle" → cloze kartı otomatik üretilir. A1'de sistem önceden seçilmiş cümleleri sunar (öğrenci henüz i+1 cümleyi seçemez).

---

## 4. İkinci dil edinimi (SLA) kuramları ve A1–A2 uygulaması

### 4.1 Comprehensible input — Krashen (1982, 1985), i+1 [Kanıt: orta]
- **İddia:** Edinim, mevcut seviyenin biraz üstündeki (i+1) **anlaşılır girdi** ile olur. Kuram tamamen tartışmasız değil (ölçülemezlik eleştirisi, McLaughlin 1987), ama **bol girdinin gerekli olduğu** geniş kabul görür.
- **Ölçülebilir karşılık:** Metin kapsama oranı. Hu & Nation (2000), Laufer & Ravenhorst-Kalovski (2010): rahat okuma için tokenların **%95–98'ini** bilmek gerekir.
- **A1–A2 uygulaması:**
  - Her ünitede **graded text** (seviyelendirilmiş metin/diyalog): öğrencinin bilinen kelime havuzuna göre **≥%95 kapsama**; bilinmeyenler tıkla-gör sözlükle.
  - Sistem kapsama oranını **hesaplar** (öğrencinin SRS'teki kelimeleri vs metindeki lemmalar) ve metinleri "Şimdi okunabilir / Yakında / Zor" diye etiketler.
  - TPRS / "story" tekniği: aynı yapıyı çok farklı bağlamda tekrar eden kısa hikâyeler.

### 4.2 Output hypothesis — Swain (1985, 1995) [Kanıt: orta]
- Üretim; boşlukları fark ettirme (noticing the gap), hipotez test etme ve metalinguistik düşünme işlevi görür. Girdi tek başına doğruluk için yetmez (Kanada immersion öğrencileri anlama iyi, üretim hatalı).
- **Uygulama:** Her oturumda en az bir **serbest üretim** görevi: 2–5 cümle yaz (A1: "Kendini tanıt", "Sabah rutinin"), sesli söyle ve kaydet. Sistem kalıp-tabanlı kontrol yapar (beklenen yapıların varlığı: fiil 2. pozisyonda mı, büyük harf, artikel), tam düzeltme yapamaz; öğrenci **model cevapla karşılaştırır**.

### 4.3 Noticing hypothesis — Schmidt (1990) [Kanıt: orta]
- Girdi, ancak **fark edilirse** "intake" olur. Görsel öne çıkarma (input enhancement; Sharwood Smith 1993) etkisi karışık ama sıfır başlangıçlı öğrencide faydalı.
- **Uygulama:** Metinlerde hedef yapı vurgulu: fiil 2. pozisyon **kalın**, Nebensatz'ta sondaki fiil altı çizili, hal ekleri renkli (`de**n**`, `de**m**`). "Fark et" mini görevi: "Metinde *mit*'ten sonra gelen tüm kelimeleri işaretle."

### 4.4 Shadowing [Kanıt: orta]
- Ses kaydını yarım saniye geriden eşzamanlı tekrar etme. Prozodi, akıcılık ve dinleme algısı için kanıt var (Hamada 2016; Kadota 2019); daha çok Japon EFL bağlamında çalışılmış.
- **A1–A2 uygulaması (kademeli):**
  1. *Dinle-tekrarla* (listen & repeat, cümle sonu duraklamalı) — A1 başı
  2. *Metinli shadowing* (mumbling → tam ses)
  3. *Metinsiz shadowing* — A1 sonu / A2
  - Hız: 0.75× → 1.0×. Kayıt (MediaRecorder API) + model sesle art arda dinleme. Konuşma tanıma (Web Speech API) **opsiyonel**, güvenilirliği tarayıcıya bağlı — puan vermek için değil, kaba geri bildirim için.

### 4.5 Dictation (dikte) [Kanıt: orta]
- Dinleme, ses-yazı eşlemesi, kısa süreli bellek ve dilbilgisini birlikte çalıştırır (Oller 1979'dan beri bütünleşik beceri testi olarak kabul görür). Almanca yazım nispeten düzenli → dikte çok verimli.
- **Uygulama:** Kelime dikte → cümle dikte → kısa paragraf (A2). Otomatik karşılaştırma, hatalar türüne göre renklendirilir (umlaut, büyük harf, ß/ss, ie/ei, ch/sch). Hata türleri istatistiği "zayıf alanlar" paneline gider.

### 4.6 Extensive reading / listening [Kanıt: orta]
- Bol, kolay, keyifli okuma (Day & Bamford 1998; Nakanishi 2015 meta-analizi, okuma hızı/anlama artışı). Kriter: **%98 kapsama**, sözlüksüz akış.
- **A1–A2 uygulaması:**
  - Sistem içi "Kütüphane": 100–400 kelimelik graded hikâyeler, hepsi sesli.
  - Haftalık hedef: A1'de haftada 2–3 kısa metin; A2'de günlük 1 metin veya 5–10 dk dinleme.
  - Dış kaynak önerileri (link listesi): Deutsche Welle "Nicos Weg" (A1–B1, ücretsiz), DW "Langsam gesprochene Nachrichten" (B1 ama A2 sonu denenebilir), "Easy German" (YouTube, altyazılı), Hueber/Klett graded readers (Lektüren A1/A2), podcast "Coffee Break German".
  - **İntensive vs extensive ayrımı:** Ünite metni = yoğun (her şey analiz edilir, kart çıkarılır). Kütüphane = yaygın (anlamaya odak, kart çıkarma opsiyonel).

### 4.7 Explicit grammar instruction [Kanıt: güçlü]
- Norris & Ortega (2000) ve Spada & Tomita (2010) meta-analizleri: **açık (explicit) dilbilgisi öğretimi + pratik**, yalnız örtük maruz kalmadan daha etkilidir, özellikle yetişkinlerde ve basit kurallarda. Yetişkin, sıfır başlangıç ve öğretmensiz bağlamda açık öğretim şart.
- **Uygulama:** "Kısa kural kartı" (≤150 kelime, Türkçe, 2–4 Almanca örnek, 1 tablo) → hemen kontrollü alıştırma. PPP (Present–Practice–Produce) iskeleti + görev temelli öğeler.

### 4.8 Sesbilgisi ve dinleme algısı
- Yetişkinler yeni ses kategorilerini **yüksek değişkenlikte ses eğitimi (HVPT)** ile öğrenebilir (Logan, Lively & Pisoni 1991; Thomson 2018 incelemesi) [Kanıt: güçlü].
- **Uygulama:** Minimal çift dinleme alıştırmaları, farklı seslerden (en az 2–3 konuşmacı / TTS sesi): *Kirche–Kirsche*, *Bach–Bauch*, *Miete–Mitte*, *Stadt–Staat*, *ihn–in*, *Höhle–Hölle*, *lesen–lösen*.

---

## 5. Kelime, chunk ve artikel öğretimi

### 5.1 Lexical approach — Lewis (1993); formulaic language — Wray (2002) [Kanıt: orta]
- Akıcılığın büyük kısmı hazır kalıplardan (chunks) gelir. Başlangıçta dilbilgisini analiz edemeyen öğrenci, kalıbı bütün olarak kullanabilir.
- **A1 chunk örnekleri (bütün olarak öğretilir, analiz sonra):**

| Chunk | Türkçe | Sonradan açılacak dilbilgisi |
|---|---|---|
| *Wie geht's?* / *Wie geht es Ihnen?* | Nasılsın / Nasılsınız? | Dativ zamiri, *es* |
| *Ich hätte gern …* | … istiyorum (kibar) | Konjunktiv II (A2/B1) |
| *Ich möchte …* | … isterim | Modalverb |
| *Wie viel kostet das?* | Bu ne kadar? | |
| *Es gibt …* | … var | *geben* + Akk. |
| *Ich komme aus der Türkei.* | Türkiye'denim. | *aus* + Dativ, ülke artikeli |
| *Kann ich mit Karte zahlen?* | Kartla ödeyebilir miyim? | Modal + inversiyon |
| *Wie bitte?* / *Noch einmal, bitte.* | Efendim? / Bir daha lütfen | |
| *Ich verstehe das nicht.* | Bunu anlamıyorum. | Negation |
| *Mir ist kalt.* / *Mir gefällt …* | Üşüyorum / … hoşuma gidiyor | Dativ (Türkçede "bana" ile köprü!) |
| *Um wie viel Uhr …?* | Saat kaçta? | |
| *Ich habe Hunger / Durst.* | Acıktım / Susadım | |

- **Uygulama:** Chunk'lar kendi kart tipine sahiptir; "Hayatta kalma ifadeleri" destesi ilk haftada (20–30 chunk). İçerik kolu chunk listesini Goethe A1 Wortliste'deki "Ausdrücke"lardan çıkarabilir.

### 5.2 Frekans listeleri [Kanıt: güçlü]
- Nation (2001, 2013): En sık ~1000 kelime ailesi konuşma dilinin ~%80+'ını kapsar. Almanca için en sık 100 kelime metin tokenlarının yaklaşık yarısıdır (Jones & Tschirner, *A Frequency Dictionary of German*, 2006 — 4034 lemma).
- **Kaynak önerileri (içerik kolu için):** Goethe-Zertifikat **A1 Wortliste** (~650 kelime) ve **A2 Wortliste** (~1300 kümülatif) — sınav hizalı, resmi; Jones & Tschirner frekans sözlüğü; DeReWo (IDS Mannheim) kelime listesi; SUBTLEX-DE (altyazı frekansları, konuşma diline yakın).
- **İlke:** Sıralama = **frekans × ünite teması × iletişimsel ihtiyaç**. Yalnız frekansa göre sıralamak tema bütünlüğünü bozar; yalnız temaya göre sıralamak düşük frekanslı kelimeleri öne çıkarır (ör. *die Giraffe*). Goethe listesi + frekans ile kesiştirme önerilir.

### 5.3 Artikel (der/die/das) öğretimi

Türkçede dilbilgisel cinsiyet ve artikel **yoktur** → Türk öğrenciler için 1 numaralı kalıcı zorluk. Strateji katmanlı olmalı:

#### (a) Kelime + artikel + çoğul **tek birim** [Kanıt: güçlü] (yaygın uzlaşı)
- Kart ön yüzü/cevabı her zaman `der Tisch, -e` biçiminde. Artikelsiz isim **asla** gösterilmez. Yazma kartında artikel eksikse cevap "Hard" değil **yanlış** sayılır (ilk 2 haftadan sonra).

#### (b) Renk kodlama (dual coding) [Kanıt: orta]
- **der = mavi, die = kırmızı, das = yeşil, çoğul die = turuncu/gri** (ders kitaplarında yaygın konvansiyon; *Menschen*, *Schritte* vb. benzeri renkler kullanır).
- Renk her yerde tutarlı: kartlar, metin içi isimler (opsiyonel "artikel renklendirme" modu), tablolar.
- Renk körlüğü için ikinci kodlama: ikon/şekil (der = üçgen, die = daire, das = kare) veya alt çizgi stili.

#### (c) Görsel mnemonic / "mekân" tekniği [Kanıt: orta]
- Keyword/imagery mnemonics kelime öğreniminde etkili (Atkinson & Raugh 1975) [Kanıt: güçlü]; artikel için yaygın uyarlama: her cinsiyete bir **imge/mekân** atamak (Gabriel Wyner, *Fluent Forever*: der = patlayan/ateş, die = buz/eriyen, das = cam kırılan; ya da der = bir erkek karakter, die = bir kadın karakter, das = bir robot/bebek).
- **Uygulama:** Opsiyonel "hafıza hikâyesi" alanı: *der Löffel* → "kaşık **alev alıyor**". Sistem yalnızca zor kartlarda (3+ "Again") mnemonic önerir; tüm kartlara zorunlu değil (yük artar).

#### (d) Cinsiyet ipucu kuralları (sonek kuralları) [Kanıt: güçlü] (dilbilimsel olarak sağlam; Köpcke 1982, Köpcke & Zubin)
Öğrenciye **en güvenilir kurallar** erken ve az sayıda verilmeli:

| Kural | Cinsiyet | Güvenilirlik | Örnek |
|---|---|---|---|
| *-ung, -heit, -keit, -schaft, -ion, -tät, -ik, -ei, -ur, -enz/-anz* | **die** | ~%100 | *die Zeitung, die Freiheit, die Information, die Bäckerei* |
| *-e* (iki heceli isimler) | **die** (çoğunlukla) | ~%90 | *die Lampe, die Straße* (ama *der Junge, der Name, das Ende*) |
| *-chen, -lein* (küçültme) | **das** | %100 | *das Mädchen, das Brötchen* |
| *-um, -ment, -o* (çoğu), *Ge-* topluluk isimleri | **das** | yüksek | *das Museum, das Dokument, das Auto, das Gebäude* |
| Mastar isimleşmesi | **das** | %100 | *das Essen, das Schwimmen* |
| *-er* (fiilden yapan kişi/alet), *-ling, -ismus, -ig, -or* | **der** | yüksek | *der Lehrer, der Computer, der Frühling, der Honig* |
| Günler, aylar, mevsimler, yönler | **der** | %100 | *der Montag, der Mai, der Winter, der Norden* |
| Bileşik isim = **son** kelimenin cinsiyeti | — | %100 | *das Haus + die Tür → die Haustür* |
| Erkek/kadın canlılar | biyolojik | yüksek | *der Vater, die Mutter* (ama *das Mädchen*!) |

- **Uygulama:** Kural kartları SRS'e girer; isim kartının arkasında, kurala uyuyorsa "Kural: -ung → die" gibi kural rozeti; istisnaysa "İstisna" rozeti (istisnalar daha sık tekrar edilmeli → otomatik ek etiket).
- **"Artikel ısınması":** Her oturumun başında 30–60 sn hızlı der/die/das turu (interleaved, kural destekli).
- **Bileşik kelime tekniği:** Türk öğrenci için güçlü bir kaldıraç — *Bahnhof (der Hof) → der Bahnhof, Hauptbahnhof, Bahnhofstraße (die Straße!)*.

#### (e) Hal tablosu ile birlikte öğrenme
- Artikel tek başına değil, A1 ortasından itibaren **Nominativ–Akkusativ** (yalnız *der → den* değişir — "sadece erkek değişir" kuralı) ve A1 sonu/A2'de Dativ ile paket hâlinde. Sıra:
  1. Nominativ (der/die/das, ein/eine/ein)
  2. Akkusativ (*den/einen* — yalnız maskulin değişir)
  3. Dativ (*dem/der/dem/den+n*)
  4. Possessiv/kein aynı ekleri alır

---

## 6. Türkçe konuşanlar için zorluklar ve pozitif transfer

### 6.1 Pozitif transfer (köprüler) — sistem bunları **açıkça söylemeli**

| Alan | Türkçe | Almanca | Pedagojik köprü |
|---|---|---|---|
| **Hal sistemi** | Yalın, -i (belirtme), -e (yönelme), -de, -den, -in | Nominativ, Akkusativ, Dativ, Genitiv | Türk öğrenci "hal" kavramını zaten bilir. *Ich sehe **den** Mann* ≈ "Adam**ı** görüyorum" (belirtme = Akkusativ). *Ich gebe **dem** Mann das Buch* ≈ "Adam**a** kitabı veriyorum" (yönelme ≈ Dativ, alıcı). **Uyarı:** Eşleme kısmi — Almancada hal ekleri artikelde, Türkçede isimde; edat (Präposition) hali belirler (*mit* + Dat. = "ile" ama Türkçede hal değil), *helfen* + Dativ ("birine yardım etmek" — Türkçede de yönelme! güzel köprü), ama *fragen* + Akk. ("birine sormak" — Türkçede yönelme, Almancada Akk. → negatif transfer). |
| **Fiil sonda (Nebensatz)** | SOV: "…çünkü yorgun**um**" | *…, weil ich müde **bin**.* | Nebensatz'taki fiil-sonda yapısı Türk için doğaldır. *dass, weil, wenn, ob* → "fiil Türkçe gibi sona!" |
| **Satzklammer** | Fiil sonda | *Ich **habe** gestern Pizza **gegessen**.* / *Ich **möchte** Kaffee **trinken**.* | Ana fiil (Partizip/Infinitiv) sonda → Türkçe kelime düzenine yakın. Ayrılabilen fiil: *Ich **stehe** um 7 Uhr **auf**.* |
| **Ünlüler** | ü, ö mevcut | ü, ö | Büyük avantaj: *über, schön, müde, hören* sorunsuz. (Uzun/kısa ayrımı yeni: *Höhle/Hölle*.) |
| **Sesli-yazı tutarlılığı** | Fonetik yazım | Görece tutarlı | Okuma kuralları öğretilince doğru telaffuz tahmini mümkün. |
| **Alıntı kelimeler** | Almanca kökenli/aynı uluslararası kelimeler | | *Otobüs/der Bus, şoför/der Chauffeur, kuaför/der Friseur, bira/das Bier, şalter/der Schalter, şnitzel/das Schnitzel, aysberg/der Eisberg, otoban/die Autobahn, teknik/die Technik, üniversite/die Universität, doktor/der Doktor, telefon/das Telefon, banka/die Bank, taksi/das Taxi, otel/das Hotel, müze/das Museum, restoran/das Restaurant, problem/das Problem, kültür/die Kultur, politika/die Politik, müzik/die Musik.* — Sistem bunları "Bunları zaten biliyorsun!" destesi olarak ilk gün sunmalı (motivasyon + artikel pratiği için yük olmadan kelime). |
| **Almancada Türkçe alıntılar** | | *der Döner, der Joghurt, der Kiosk, der Kaviar* | Eğlenceli motivasyon öğesi. |
| **Soru partikeli yok, tonlama** | "mi" | Inversiyon: *Kommst du?* | Kısmen yeni; ama Türkçede de soru ayrı işaretlenir, kavram tanıdık. |
| **Ses: ş, ç, z (ses olarak)** | ş, ç, z var | *sch, tsch*, *s* (sesli: *Sonne* [z]) | *sch* = ş, *tsch* = ç, ünlüden önce *s* = Türkçe z → yazım farkı, ses tanıdık. |

### 6.2 Tipik zorluklar (negatif transfer ve yeni kategoriler)

| Zorluk | Açıklama | Tipik hata | Sistemdeki önlem |
|---|---|---|---|
| **Artikel/cinsiyet** | Türkçede yok | *Ich habe ein Tisch* | §5.3 bütün paket; artikel hata istatistiği |
| **Belirlilik (definite/indefinite)** | Türkçede belirsiz "bir" var, belirli artikel yok (belirtme eki kısmen) | Artikel düşürme: *Ich trinke Kaffee* (doğru) ama *Ich sehe Mann* (yanlış) | "Artikel unutma" hata tipi ayrı sayılır |
| **V2 kuralı (ana cümle)** | Türkçe SOV; Almanca ana cümlede fiil **2. pozisyon** | *Morgen ich gehe ins Kino.* / *Ich morgen ins Kino gehe.* | Kelime sıralama (sürükle-bırak) alıştırmaları; fiil kutusu her zaman 2. slotta renkli; "Pozisyon 1'e ne koyarsan koy, fiil 2'de" |
| **Edatlar (Präposition) öne** | Türkçe son ek/son edat: "ev**de**", "masa**nın üstünde**" | *Haus in* değil ama edat-hal seçimi zor | Edat + hal chunk'ları: *mit dem Bus, in der Stadt, nach Hause, zu Hause* |
| **Wechselpräpositionen** | *in den Park* (yön, Akk.) vs *im Park* (yer, Dat.) | | **Köprü:** Türkçe "park**a**" (yönelme) = Akk., "park**ta**" (bulunma) = Dat. — Türk öğrenci için mükemmel köprü (yalnızca bu kategori için; Wohin? → -e, Wo? → -de). |
| **Çoğul biçimleri** | Türkçe tek ek (-ler/-lar), Almanca ~8 kalıp | *die Tische, die Autos, die Frauen, die Kinder, die Männer, die Lehrer* | Her isim kartında çoğul zorunlu; çoğul kalıp kartları |
| **Fiil çekimi şahıs** | Türkçe de çekimli (avantaj: şahıs eki kavramı tanıdık) | *ich bin/du bist/er ist* düzensizliği | Çekim tablosu + interleaved çekim kartları |
| **Sesler: ch** | [ç] *ich-Laut* ve [x] *ach-Laut* Türkçede yok (Türkçe "h" bazen [x]'e yakın, ör. "ahşap") | *ich* → "iş" / "ik" | Minimal çift + ağız konumu animasyonu; "ich" = "hi" deki h'yi dil damağa yakın |
| **r** | Almanca uvular [ʁ], hece sonunda ünlüleşme [ɐ] (*Lehrer* ≈ "leha") | Türk alveolar r'si anlaşılır, ama *-er* sonunun okunuşu algıda zor | Dinleme önceliği; üretimde Türk r'si kabul edilebilir (anlaşılırlık hedefi) |
| **z** | [ts] | *Zeit* → "zayt" | "z = ts" kuralı erken; *Zug, Zeit, zehn, Pizza* |
| **ei / ie** | *ei* = [aɪ] "ay", *ie* = [iː] uzun "i" | *Wien/Wein*, *Bier* → "biyer" | Okuma kuralı kartı + minimal çift dikte |
| **eu/äu** | [ɔʏ] "oy" | *heute* → "heute" | Okuma kuralı |
| **v / w** | *v* = [f] (çoğu), *w* = [v] | *Vater* → "vater", *Wasser* → "uasser" | |
| **Uzun/kısa ünlü** | Türkçede fonemik değil (alıntılar hariç) | *Staat/Stadt, Miete/Mitte, Ofen/offen* | Minimal çift dinleme |
| **Ünsüz kümeleri** | Türkçe başta küme sevmez → araya ünlü ekleme (*epentez*) | *Straße* → "sitraße", *Schwester* → "şıvester" | Shadowing + yavaş ses; farkındalık notu |
| **Hece sonu sertleşme** | *Hund* [hʊnt], *Tag* [taːk] | Türkçede de var! (kitap/kitabı) → pozitif | Köprü: "Türkçedeki *kitap–kitabı* gibi" |
| **Büyük harf** | Almancada tüm isimler büyük | *ich habe einen hund* | Yazma kartında büyük harf hatası ayrı işaretlenir |
| **Sie/du hitap** | Türkçe "siz/sen" var → **pozitif transfer** | *Sie* fiili 3. çoğul çekilir (yeni) | Köprü + uyarı |
| **Zaman: Perfekt (haben/sein)** | Türkçe tek ek (-dı/-miş) | *Ich bin gegangen / Ich habe gegessen* | Hareket/durum değişimi → sein listesi chunk olarak |

### 6.3 Sahte arkadaşlar (Türkçe–Almanca, A1–A2 seviyesinde sık)

| Almanca | Gerçek anlam | Türkçe sanılan | Not |
|---|---|---|---|
| *das Gymnasium* | Lise (akademik) | Jimnastik salonu ("jimnastik") | |
| *die Rente* | Emekli maaşı | "rant" (TR: getiri/kazanç) | Kısmi |
| *der Chef* | Patron/şef (iş yeri) | "şef" = aşçıbaşı | Kısmi |
| *die Fabrik* | Fabrika | — | Doğru eşleşme (true friend) |
| *das Bad* | Banyo | "bad" (İng. kötü) | İngilizce bilen için |
| *bekommen* | Almak, elde etmek | (İng. become) | İngilizce bilen Türk için tipik |
| *also* | Yani, öyleyse | (İng. also = de/da) | |
| *der Kiosk* | Büfe | Köşk | Tarihsel bağ, anlam farkı |
| *das Lokal* | Lokanta/meyhane | "lokal" = yerel | Kısmi |
| *die Pension* | Pansiyon **ve** emeklilik | Yalnız pansiyon | |
| *die Promotion* | Doktora | "promosyon" | |
| *das Handy* | Cep telefonu | (İng. kullanışlı) | |
| *der Termin* | Randevu | "termin" (TR: teslim tarihi) | Kısmi — iyi köprü |

> İçerik kolu bu listeyi genişletmeli; öğrencinin İngilizce bilgisi varsa "İngilizce sahte arkadaşlar" ek destesi (bekommen, also, wer/where, wo/who, will/will, Gift/hediye, Rat…) çok değerlidir. Başlangıç anketinde "İngilizce biliyor musun?" sorulmalı.

---

## 7. Oturum, gün ve hafta yapısı

### 7.1 Oturum yapısı (30 dk temel)

Bilişsel yük kuramı (Sweller 1988) ve dikkat süreleri gözetilerek; PPP + retrieval + task iskeleti:

| # | Aşama | Süre (30 dk) | Süre (60 dk) | İçerik | İlke |
|---|---|---|---|---|---|
| 1 | **Isınma** | 2 dk | 3 dk | Artikel ısınması (10 hızlı soru) / dünkü ünitenin 3 chunk'ı sesli | Retrieval, aktivasyon |
| 2 | **SRS tekrar** | 10–12 dk | 18–22 dk | FSRS due kartları (karışık tip) | Spacing, testing |
| 3 | **Yeni girdi** | 6 dk | 12 dk | Kısa diyalog/metin (sesli) → anlama soruları → kural kartı (noticing) | i+1, noticing, explicit |
| 4 | **Kontrollü pratik** | 6 dk | 12 dk | Cloze, sıralama, çekim, dikte, minimal çift | Generation, interleaving (2. günden itibaren) |
| 5 | **Serbest üretim** | 3 dk | 7 dk | 2–5 cümle yaz/söyle, model cevapla karşılaştır; shadowing | Output, self-assessment |
| 6 | **Özet / kapanış** | 1–2 dk | 3–4 dk | 3 soruluk "çıkış bileti" (exit ticket), "Bugün ne öğrendim?" can-do işareti, yarının ön izlemesi | Metakognisyon, retrieval |
| (7) | **Bonus girdi** (opsiyonel) | — | +5–10 dk | Kütüphaneden yaygın okuma/dinleme | Extensive input |

Kurallar:
- Yeni kartlar oturumun **yeni girdi** aşamasında tanıtılır, SRS'e oturum sonunda eklenir (öğrenme adımları aynı oturumda 1–2 kez gelir).
- Bir oturumda **en fazla 1 yeni dilbilgisi konusu**.
- Oturum yarıda bırakılırsa ilerleme kaydedilir; "mikro oturum" (5 dk = yalnız SRS) her zaman mümkün.

### 7.2 Günlük hedef
- **Minimum geçerli gün ("streak'i koruyan gün"):** Bekleyen SRS tekrarları bitti **veya** 10 dk çalışıldı. (Düşük eşik → alışkanlık sürdürülebilirliği; Fogg "Tiny Habits", Clear "Atomic Habits" — kanıt düzeyi [Kanıt: zayıf].)
- **Hedef gün:** Tam oturum (30 veya 60 dk).
- **Ölçüt zaman değil, aktivite:** "X dk" yerine "SRS bitti + 1 ders adımı + 1 üretim" — zaman ölçümü sekme açık bırakmayla şişer.

### 7.3 Haftalık döngü (öneri)

| Gün | Odak |
|---|---|
| Pzt | Yeni ünite girişi (diyalog + kelime + kural 1) |
| Sal | Kural 1 pratiği (karışık) + yeni kelime |
| Çar | Kural 2 / ünite metni 2 + dikte |
| Per | Karışık pratik + konuşma/shadowing ağırlıklı |
| Cum | Ünite metni 3 + yazma görevi |
| Cmt | **Ünite testi (mastery check)** + yaygın okuma/dinleme |
| Paz | **Hafif gün:** yalnız SRS (yeni kart yok) + haftalık öz-değerlendirme (can-do listesi) + "zayıf alanlar" tekrarı |

- Ünite ≈ 1 hafta (60 dk senaryoda) veya ≈ 2 hafta (30 dk senaryoda). Sistem takvime göre değil **tamamlanan adımlara göre** ilerler; haftalık şablon önerdir.
- **Her 4 ünitede bir "kümülatif tekrar haftası"** (A1'de modül sonu): önceki 4 ünitenin karma testi + eksik kapatma. Bu, seyrek konuların (Genitiv, Imperativ vb.) unutulmasını önler.

---

## 8. Motivasyon, alışkanlık, metakognisyon, geri bildirim, mastery

### 8.1 Motivasyon — Self-Determination Theory (Deci & Ryan 1985, 2000) [Kanıt: güçlü]
Üç temel ihtiyaç ve sistem karşılıkları:

| İhtiyaç | Sistem karşılığı |
|---|---|
| **Yetkinlik** (competence) | Görünür ilerleme: öğrenilen kelime sayısı, can-do rozetleri, "Bu metni artık %96 anlıyorsun", ünite haritası, A1/A2 ilerleme çubuğu |
| **Özerklik** (autonomy) | Konu sırası esnekliği (bazı üniteler seçmeli), yeni kart limiti ayarı, kendi cümlelerini ekleme, tema seçimi (iş, seyahat, aile) |
| **Bağlılık** (relatedness) | Tek kullanıcılı sistemde zayıf → kişisel hedef ("Neden Almanca?" — Almanya'ya taşınma, iş, aile); gerçek dünya görevleri ("Bir fırında sipariş ver" senaryosu); opsiyonel paylaşılabilir ilerleme özeti |

- **Dörnyei (2009) L2 Motivational Self System:** "İdeal L2 benlik" görselleştirmesi güçlü motivatördür → başlangıçta öğrencinin kendi hedef senaryosunu yazması, her ünite sonunda bu hedefe ne kadar yaklaştığı.
- **Gamification uyarısı:** Streak, XP gibi dışsal ödüller kısa vadede etkili ama içsel motivasyonu gölgeleyebilir (overjustification; Deci, Koestner & Ryan 1999) [Kanıt: orta]. Öneri: streak **var ama affedici** (haftada 1–2 "dondurma" hakkı otomatik), XP yok/az; ödül = gerçek yetkinlik göstergesi.

### 8.2 Alışkanlık [Kanıt: orta]
- Lally ve ark. (2010): Alışkanlık otomatikliği ortalama ~66 gün (18–254 aralık); tek günlük kaçırma süreci bozmuyor.
- **Uygulama intentions** (Gollwitzer 1999, "eğer-o zaman" planları, d ≈ 0.65) [Kanıt: güçlü] → Başlangıçta: "Her gün **[saat/durum]** olunca Almanca çalışacağım" planı alınır; sistem bunu ana ekranda gösterir.
- Tarayıcı bildirimleri (Notification API + PWA) opsiyonel hatırlatma; statik site için service worker ile çevrimdışı çalışma.
- **Sürtünmeyi azalt:** Sayfa açılınca tek büyük düğme: "Bugünkü oturumu başlat" (ne yapacağına karar vermek gerekmez).

### 8.3 Metakognisyon ve öz-değerlendirme [Kanıt: orta]
- Öğrenciler öğrenmelerini sistematik olarak **yanlış tahmin eder** (Kornell & Bjork 2008: karıştırmayı daha kötü sanırlar; "fluency illusion" — tekrar okumak tanıdık hissettirir). Sistem öğrencinin sezgisini değil **veriyi** göstermeli.
- **Uygulamalar:**
  - **Can-do listeleri:** CEFR/Goethe "Ich kann …" tanımlayıcıları (ör. *Ich kann mich vorstellen.* / *Ich kann im Café bestellen.*). Her ünite sonunda öğrenci işaretler → sistem objektif test sonucu ile **karşılaştırır** ("Kendini %90 hazır hissediyorsun, testte %70 aldın → şu alanlara bak").
  - **Güven puanı (confidence rating):** Bazı sorularda cevap öncesi "Ne kadar eminsin?" → kalibrasyon grafiği (aşırı güven farkındalığı).
  - **Haftalık yansıma:** 3 soru: Ne iyi gitti? Ne zordu? Gelecek hafta neyi farklı yapacağım?
  - **Zayıf alan paneli:** Hata türlerine göre (artikel, V2, hal, çoğul, yazım-umlaut, dinleme) dağılım + "Bunu çalış" düğmesi.

### 8.4 Hata geri bildirimi [Kanıt: güçlü]
- Lyster & Ranta (1997) sınıf içi düzeltme türleri; Li (2010) ve Lyster & Saito (2010) meta-analizleri: düzeltici geri bildirim etkili; **açık (explicit) düzeltme ve "prompts" (öğrenciyi kendini düzeltmeye iten ipucu)** genelde örtük "recast"lerden daha etkili, özellikle başlangıç düzeyinde ve yazılı modda.
- Shute (2008) "formative feedback" incelemesi: geri bildirim **spesifik, zamanında, görev odaklı** olmalı; kişiliğe değil göreve.
- **Önerilen kademeli geri bildirim (sistem için):**

| Deneme | Geri bildirim türü | Örnek (*Ich fahre mit ___ Bus.* → öğrenci: *der*) |
|---|---|---|
| 1. yanlış | **Metalinguistik ipucu** (prompt) — cevap verilmez | "Hal'e dikkat: *mit* hangi hali ister?" |
| 2. yanlış | **Daha güçlü ipucu** | "*mit* + Dativ. *der Bus* Dativ'de → d_ _" |
| 3. yanlış / "Göster" | **Açık düzeltme + kural + karşılaştırma** | "Doğrusu: ***dem*** Bus. Senin cevabın: *der*. Kural: mit → Dativ; der → dem." |
| Doğru ama kusurlu | **Kısmi doğru** (ör. büyük harf, umlaut eksik) | "Neredeyse! *Bus* büyük harfle. 'Hard' olarak sayıldı." |

  - SRS kartlarında (hız önemli) → doğrudan açık düzeltme (1 adım); ders alıştırmalarında → kademeli ipucu (2–3 adım).
  - **Fark görselleştirme:** Öğrenci cevabı vs doğru cevap harf düzeyinde renkli diff.
  - Hata **sınıflandırma** (artikel / hal / çekim / kelime sırası / yazım / kelime) → zayıf alan paneline.
  - Serbest üretimde sistem tam düzeltme yapamaz (backend/LLM yok) → **model cevap + kontrol listesi** ("Fiil 2. pozisyonda mı? Her isimde artikel var mı? İsimler büyük harfle mi?"). *(Mimari kolu opsiyonel bir LLM API anahtarı entegrasyonunu değerlendirebilir; pedagojik olarak çok değerli ama "backend'siz" kısıtını kullanıcıya bırakır.)*

### 8.5 Mastery learning [Kanıt: güçlü]
- Bloom (1968, 1984 "2 sigma"); Kulik, Kulik & Bangert-Drowns (1990) meta-analizi: mastery programları ortalama ~0.5 SD kazanç. Kilit unsurlar: net hedefler, formatif test, **düzeltici çalışma**, yeniden test.
- **Eşikler (öneri):**

| Kapı | Eşik | Başarısızlıkta |
|---|---|---|
| Ders adımı (alıştırma seti) | ≥ %80 doğru (ilk deneme) | Hatalı maddeler kısa süre sonra tekrar gelir (aynı oturumda) |
| **Ünite testi** | **≥ %85** | Hedefli düzeltici paket (hata türüne göre) → 24 saat sonra paralel form ile yeniden test |
| Modül (4 ünite) testi | ≥ %80 | Zayıf ünitelere yönlendirme |
| A1 "seviye bitti" | Goethe Start Deutsch 1 formatına benzer deneme sınavında ≥ %70 (Goethe geçme: %60) + can-do %90 | |
| SRS sağlığı | Gerçek hatırlama oranı (son 30 gün) ≥ %80 | Yeni kart hızı otomatik düşürülür |

- **Yumuşak kilit:** Öğrenci eşiği geçmeden sonraki üniteye geçebilir ama sistem uyarır ve testi "bekleyen" olarak işaretler. Sert kilit öğretmensiz bağlamda tıkanma ve bırakma riski yaratır.

---

## 9. Süre tahmini ve takvim

### 9.1 Kaynaklar
- **Goethe-Institut** kurs/sınav referans tablosu: yaklaşık **A1 ≈ 150 UE, A2 ≈ 300 UE, B1 ≈ 450 UE** (kümülatif; 1 Unterrichtseinheit = 45 dk) → **A1 ≈ 110 saat, A2 ≈ 225 saat (kümülatif)**. Goethe'nin başka sayfalarında A1 için 60–150 UE gibi daha geniş aralıklar da görülür; bunlar sınıf içi süredir, ev çalışması hariç.
- **CEFR** belgeleri seviye başına saat vermez; **Cambridge** / ALTE kılavuz tahminleri: A1 ~90–100, A2 ~180–200 saat (kümülatif, rehberli öğrenme).
- **FSI** (ABD Dışişleri): Almanca İngilizce ana dilliler için "Category II", profesyonel düzeye ~900 sınıf saati — Türkçe ana dilli için Almanca daha uzak olabilir (Hint-Avrupa değil), ama öğrenci genelde İngilizce biliyorsa kelime transferi artar.
- **Öz-çalışma düzeltmesi:** Öğretmensiz çalışmada etkileşim/konuşma pratiği daha zayıf, ama SRS ve bireysel tempo verimliliği yüksek. Net olarak **%0–30 ek süre** varsaymak gerçekçi.

### 9.2 Bu sistem için gerçekçi hedef

| Seviye | Saat (bu seviye) | Kümülatif | Kelime/chunk (aktif+pasif) | Dilbilgisi kapsamı |
|---|---|---|---|---|
| **A1** | **100–150** | 100–150 | ~650–800 | Präsens, V2, Ja/Nein-Frage, W-Frage, Nom/Akk, Possessiv, Modalverben, trennbare Verben, Imperativ, Perfekt (temel), Präpositionen (temel), Negation (nicht/kein) |
| **A2** | **120–180** | **220–330** | ~1300–1600 | Dativ (tam), Wechselpräpositionen, Perfekt (tam), Präteritum (sein/haben/Modal), Nebensätze (weil, dass, wenn), Komparativ/Superlativ, Reflexivverben, Adjektivdeklination (temel), Konjunktiv II (würde/hätte/könnte — kalıp) |

### 9.3 Takvim senaryoları (haftada 6 çalışma günü + 1 hafif gün)

| Senaryo | Haftalık saat | A1 bitişi | A2 bitişi (kümülatif) |
|---|---|---|---|
| **30 dk/gün** (~3.25 sa/hafta) | ~3–3.5 | **7–11 ay** (≈ 30–46 hafta) | **15–24 ay** (≈ 65–100 hafta) |
| **45 dk/gün** (~5 sa/hafta) | ~5 | 5–7 ay | 10–15 ay |
| **60 dk/gün** (~6.5 sa/hafta) | ~6.5 | **4–5.5 ay** (≈ 16–23 hafta) | **8–12 ay** (≈ 34–50 hafta) |
| Yoğun 2 sa/gün | ~13 | 2–3 ay | 4–6 ay |

> **Not:** 30 dk/gün senaryosunda A2'ye ulaşmak 1.5–2 yıl sürebilir. Bu, motivasyon açısından şeffaf biçimde söylenmeli; sistem "aralık hedefleri" (her 4–6 haftada bir modül) ile bu uzun yolu kısa, ulaşılabilir parçalara bölmeli. Ayrıca **SRS dışı girdi** (dizi, podcast, okuma) sistemin dışında yapılırsa kümülatif saatlere sayılmalı → sistemde **"dış çalışma günlüğü"** (manuel ekleme) özelliği.

### 9.4 Önerilen müfredat iskeleti (gün/oturum hesabıyla)
- **A1:** 12 ünite + 3 modül tekrar haftası + 1 deneme sınavı haftası. 60 dk'da ünite ≈ 1 hafta (≈ 6–7 saat) → ~16–18 hafta. 30 dk'da ünite ≈ 2 hafta → ~32–36 hafta.
- **A2:** 12–14 ünite, benzer yapı; ünite ≈ 8–10 saat (daha uzun metinler, daha fazla dilbilgisi).
- Ünite sırası ve içerik ayrıntısı **içerik/müfredat kolunun** işidir; bu belge yalnız oranları belirler: **zaman bütçesi ≈ %35–40 SRS, %25 girdi (okuma/dinleme), %20 kontrollü pratik, %10–15 üretim (yazma/konuşma), %5 dilbilgisi açıklaması/meta.**

---

## 10. İlke → Sistem özelliği eşleme tablosu

| # | İlke / Kanıt | Sistem özelliği (HTML/JS) | Öncelik | Teknik not |
|---|---|---|---|---|
| 1 | Spacing effect, FSRS | **FSRS planlayıcı** (ts-fsrs), retention 0.90, fuzz, sibling bury | P0 | IndexedDB'de kart durumu + review log (optimizasyon için) |
| 2 | Testing effect | Tüm kart ve alıştırmalar **aktif hatırlama**; "sadece oku" ekranı yok | P0 | |
| 3 | Generation effect | **Yazma kartı** (TR→DE), otomatik puanlama; çoktan seçmeli yalnız tanıtımda | P0 | Normalize: Unicode NFC, ß/ss, umlaut alternatif (ae/oe/ue) toleransı opsiyonel |
| 4 | Dinamik yük kontrolü | Yeni kart limiti + **due-tabanlı otomatik fren** + ara sonrası geri dönüş modu | P0 | |
| 5 | Kelime+artikel+çoğul birimi | Not şeması: `{lemma, artikel, plural, gender_rule, examples[], audio}` | P0 | İçerik kolu ile ortak şema |
| 6 | Dual coding (artikel) | **Renk kodu** der/die/das/Plural + şekil yedeği; metinde "artikel renklendirme" anahtarı | P0 | CSS değişkenleri, erişilebilir kontrast |
| 7 | Gender kuralları | Kural rozetleri ("Kural: -ung → die" / "İstisna"), istisna kartlarına ek tekrar ağırlığı | P1 | Sonek eşleştirici fonksiyon |
| 8 | Mnemonic | Zor kartlarda (lapses ≥3) "hafıza hikâyesi yaz" önerisi + kişisel not alanı | P2 | |
| 9 | Cloze | 3 seviyeli cloze motoru (seçmeli / ipuçlu / serbest) | P0 | Cümle içinde `{{c1::dem}}` işaretleme |
| 10 | Interleaving | Ders 2. günden itibaren **karma alıştırma setleri**; "Hangi hal?" soruları | P1 | Etiket tabanlı karıştırma |
| 11 | Comprehensible input (i+1) | **Kapsama hesaplayıcı**: metindeki lemmalar vs öğrencinin bildikleri → "%96 anlaşılır" etiketi; kütüphane filtreleme | P1 | Önceden lemmatize edilmiş metinler (JSON) |
| 12 | Extensive reading/listening | **Kütüphane**: sesli graded hikâyeler, tıkla-çevir, hız ayarı | P1 | `<audio>` + playbackRate; senkron metin (timestamp) |
| 13 | Noticing | Metinde **yapı vurgulama** modları (fiil pozisyonu, hal ekleri, Nebensatz fiili) | P1 | Önceden etiketlenmiş token JSON |
| 14 | Explicit grammar | ≤150 kelimelik **kural kartları** (Türkçe, tablo + örnek), ünite içinde ve referans sayfasında | P0 | |
| 15 | Output (Swain) | **Serbest üretim görevi** her oturumda; model cevap + kontrol listesi | P0 | |
| 16 | Shadowing | **Dinle-tekrarla / shadowing oynatıcı**: cümle cümle, 0.75–1.0×, kayıt + karşılaştırma | P1 | MediaRecorder; kayıtlar yerelde |
| 17 | Dikte | **Dikte modu**, hata türü renkli diff | P0 | Levenshtein + özel kurallar |
| 18 | HVPT / sesbilgisi | **Minimal çift** dinleme alıştırmaları (çok konuşmacı) | P1 | Ses kolunun üreteceği ses dosyaları |
| 19 | Lexical approach | **Chunk kartları** + "Hayatta kalma ifadeleri" başlangıç destesi | P0 | |
| 20 | Frekans | İçerik sıralama: Goethe Wortliste ∩ frekans; her kelimede frekans bandı | P0 | İçerik kolu |
| 21 | Pozitif transfer | **"Türkçe köprü" notları** (hal ↔ Kasus, SOV ↔ Nebensatz, -e/-de ↔ Wohin/Wo) ders içinde; "Zaten biliyorsun" alıntı kelime destesi | P0 | |
| 22 | Negatif transfer | **Hata türü sınıflandırıcı** (artikel, V2, hal, çoğul, büyük harf, umlaut, ei/ie) → zayıf alan paneli | P1 | Kural tabanlı hata analizi |
| 23 | Sahte arkadaşlar | "Sahte arkadaş" etiketli kartlar + ayrı mini deste (TR ve İngilizce) | P2 | |
| 24 | V2 kelime düzeni | **Sürükle-bırak cümle kurma**, fiil slotu sabit renkli | P1 | Dokunmatik uyumlu |
| 25 | Oturum yapısı | **"Bugünkü oturum" sihirbazı**: ısınma → SRS → girdi → pratik → üretim → çıkış bileti | P0 | Durum makinesi; yarıda kalınca devam |
| 26 | Desirable difficulty / %85 | **Adaptif zorluk**: son 20 maddede başarı <%70 → ipucu/kolaylaştır, >%95 → zorlaştır | P1 | |
| 27 | Feedback (Lyster, Shute) | **Kademeli geri bildirim** (ipucu → güçlü ipucu → açık düzeltme + kural); SRS'te doğrudan düzeltme | P0 | Alıştırma verisinde `hints[]` alanı |
| 28 | Mastery learning | **Ünite testi ≥%85**, düzeltici paket, 24 sa sonra paralel test; yumuşak kilit | P0 | Soru havuzundan paralel form |
| 29 | Metakognisyon | **Can-do listeleri** + test sonucu karşılaştırması; güven puanı; haftalık yansıma | P1 | |
| 30 | SDT – yetkinlik | **İlerleme paneli**: kelime sayısı, ünite haritası, A1/A2 çubuğu, retention grafiği, saat sayacı | P0 | |
| 31 | SDT – özerklik | Ayarlar: günlük süre (30/45/60), yeni kart limiti, retention, seçmeli tema üniteleri, kişisel kart ekleme | P1 | |
| 32 | Alışkanlık | **Tek düğmeli başlangıç**, affedici streak (dondurma hakkı), "eğer-o zaman" planı, opsiyonel bildirim | P0 | PWA + Notification API |
| 33 | Sentence mining | Metinde kelimeye tıkla → "Bu cümleden kart yap" (A2) | P2 | |
| 34 | Haftalık döngü | Haftalık plan görünümü (önerilen gün odakları), Pazar hafif gün, 4 ünitede bir tekrar haftası | P1 | |
| 35 | Dış girdi | **Dış çalışma günlüğü** (Nicos Weg, podcast vb. süresi manuel) + önerilen kaynak listesi | P2 | |
| 36 | Seviye doğrulama | **Deneme sınavı** (Start Deutsch 1 / Goethe A2 formatına benzer: Hören, Lesen, Schreiben, Sprechen-öz değerlendirme) | P1 | Formatı taklit, resmi materyal kopyalanmaz |
| 37 | Veri güvenliği / süreklilik | Yerel kayıt (IndexedDB) + **JSON dışa/içe aktarma** yedeği | P0 | Statik sistemde veri kaybı = motivasyon kaybı |

---

## 11. Kritik tasarım kararları ve açık sorular

### 11.1 En kritik 5 tasarım kararı

1. **FSRS (ts-fsrs) + üretim ağırlıklı kartlar.** Planlayıcı FSRS, retention 0.90; kartların çoğu TR→DE yazma / cloze / dikte; otomatik puanlama ile öz-değerlendirme yanlılığı azaltılır. Günlük yeni kart 8–10 (30 dk) / 15–20 (60 dk), due-tabanlı otomatik fren.
2. **Artikel = kelimenin ayrılmaz parçası.** Her isim `artikel + tekil + çoğul` olarak, tutarlı renk kodu (der mavi / die kırmızı / das yeşil) ve güvenilir sonek kuralları ile öğretilir; hata analizi artikel hatalarını ayrıca izler.
3. **Türkçe'den köprü kuran dilbilgisi anlatımı.** Hal ekleri ↔ Kasus (özellikle -e/-de ↔ Wohin/Wo, -i ↔ Akkusativ), SOV ↔ Nebensatz/Satzklammer, siz/sen ↔ Sie/du; aynı zamanda V2, artikel, ünsüz kümeleri, ch/z/ei-ie gibi negatif transfer noktaları için hedefli alıştırmalar.
4. **Sabit, rehberli oturum akışı + mastery kapısı.** "Bugünkü oturum" tek düğme: ısınma → SRS → yeni girdi (i+1, noticing) → kontrollü pratik → serbest üretim → çıkış bileti. Ünite testi ≥%85, düzeltici paket, yumuşak kilit.
5. **Ölçülebilir anlaşılır girdi.** Tüm metin/dinlemeler sesli ve lemmatize; sistem öğrencinin kelime bilgisine göre kapsama oranını hesaplar (≥%95 ünite metni, ≥%98 yaygın okuma); her oturumda girdi + her oturumda üretim.

### 11.2 Açık sorular (diğer kollar / kullanıcı için)
- Öğrenci İngilizce biliyor mu? (Kelime transferi ve sahte arkadaş destesi bunu değiştirir.)
- Ses kaynağı: önceden kaydedilmiş/üretilmiş ses dosyaları mı, tarayıcı TTS (Web Speech API, kalitesi platforma göre değişken) mi? Pedagojik öneri: **önceden üretilmiş, doğal ve en az 2 farklı ses** (HVPT için).
- Serbest üretim için opsiyonel LLM geri bildirimi (kullanıcının kendi API anahtarıyla) kabul edilebilir mi? Pedagojik kazanç yüksek; "backend'siz" ilkesi korunabilir (istemciden doğrudan çağrı) ama gizlilik/maliyet kararı kullanıcıda.
- Hedef sınav (Goethe A1/A2 sertifikası) var mı? Varsa deneme sınavı formatı ve can-do listeleri sınava hizalanmalı.
- Konuşma değerlendirmesi: Web Speech API tanıması Almancada makul ama tarayıcıya bağlı (Chrome iyi, Firefox zayıf) — P2 opsiyonel özellik olarak mı tutulmalı?

---

## 12. Kaynakça

**Aralıklı tekrar ve bellek**
- Ebbinghaus, H. (1885). *Über das Gedächtnis.*
- Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. *Psychological Bulletin, 132*(3).
- Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing effects in learning: A temporal ridgeline of optimal retention. *Psychological Science, 19*(11).
- Woźniak, P. A. (1990). *Optimization of learning* (SM-2 algoritması). supermemo.com.
- Ye, J., Su, J., & Cao, Y. (2022). A stochastic shortest path algorithm for optimizing spaced repetition scheduling. *KDD '22.*
- Su, J., Ye, J., Nie, L., Cao, Y., & Chen, Y. (2023). Optimizing spaced repetition schedule by capturing the dynamics of memory. *IEEE TKDE.*
- open-spaced-repetition: `fsrs4anki` wiki, `srs-benchmark`, `ts-fsrs` (GitHub).
- Anki Manual — "What spaced repetition algorithm does Anki use?": https://docs.ankiweb.net/faqs/what-spaced-repetition-algorithm

**Öğrenme stratejileri**
- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. *Psychological Science, 17*(3).
- Karpicke, J. D., & Roediger, H. L. (2008). The critical importance of retrieval for learning. *Science, 319*.
- Rowland, C. A. (2014). The effect of testing versus restudy on retention: A meta-analytic review. *Psychological Bulletin, 140*(6).
- Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking the use of tests: A meta-analysis of practice testing. *Review of Educational Research, 87*(3).
- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving students' learning with effective learning techniques. *Psychological Science in the Public Interest, 14*(1).
- Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning. *Instructional Science, 35*.
- Kornell, N., & Bjork, R. A. (2008). Learning concepts and categories: Is spacing the "enemy of induction"? *Psychological Science, 19*(6).
- Brunmair, M., & Richter, T. (2019). Similarity matters: A meta-analysis of interleaved learning. *Psychological Bulletin, 145*(11).
- Slamecka, N. J., & Graf, P. (1978). The generation effect. *JEP: Human Learning and Memory, 4*(6).
- Bertsch, S., Pesta, B. J., Wiscott, R., & McDaniel, M. A. (2007). The generation effect: A meta-analytic review. *Memory & Cognition, 35*(2).
- Bjork, R. A. (1994). Memory and metamemory considerations in the training of human beings.
- Paivio, A. (1986). *Mental Representations: A Dual Coding Approach.* Mayer, R. E. (2009). *Multimedia Learning* (2nd ed.).
- Wilson, R. C., Shenhav, A., Straccia, M., & Cohen, J. D. (2019). The Eighty Five Percent Rule for optimal learning. *Nature Communications, 10*.
- Sweller, J. (1988). Cognitive load during problem solving. *Cognitive Science, 12*.
- Atkinson, R. C., & Raugh, M. R. (1975). An application of the mnemonic keyword method to the acquisition of a Russian vocabulary. *JEP: Human Learning and Memory, 1*(2).

**İkinci dil edinimi**
- Krashen, S. (1982). *Principles and Practice in Second Language Acquisition.* (1985) *The Input Hypothesis.*
- Swain, M. (1985, 1995). Output hypothesis.
- Schmidt, R. (1990). The role of consciousness in second language learning. *Applied Linguistics, 11*(2).
- Sharwood Smith, M. (1993). Input enhancement in instructed SLA. *SSLA, 15*.
- Norris, J. M., & Ortega, L. (2000). Effectiveness of L2 instruction: A research synthesis and quantitative meta-analysis. *Language Learning, 50*(3).
- Spada, N., & Tomita, Y. (2010). Interactions between type of instruction and type of language feature: A meta-analysis. *Language Learning, 60*(2).
- Lyster, R., & Ranta, L. (1997). Corrective feedback and learner uptake. *SSLA, 19*.
- Li, S. (2010). The effectiveness of corrective feedback in SLA: A meta-analysis. *Language Learning, 60*(2).
- Lyster, R., & Saito, K. (2010). Oral feedback in classroom SLA: A meta-analysis. *SSLA, 32*.
- Shute, V. J. (2008). Focus on formative feedback. *Review of Educational Research, 78*(1).
- Hu, M., & Nation, I. S. P. (2000). Unknown vocabulary density and reading comprehension. *Reading in a Foreign Language, 13*(1).
- Laufer, B., & Ravenhorst-Kalovski, G. C. (2010). Lexical threshold revisited. *Reading in a Foreign Language, 22*(1).
- Nation, I. S. P. (2013). *Learning Vocabulary in Another Language* (2nd ed.).
- Day, R., & Bamford, J. (1998). *Extensive Reading in the Second Language Classroom.*
- Nakanishi, T. (2015). A meta-analysis of extensive reading research. *TESOL Quarterly, 49*(1).
- Hamada, Y. (2016). *Teaching EFL Learners Shadowing for Listening.* Kadota, S. (2019). *Shadowing as a Practice in Second Language Acquisition.*
- Logan, J. S., Lively, S. E., & Pisoni, D. B. (1991). Training Japanese listeners to identify English /r/ and /l/. *JASA, 89*. Thomson, R. I. (2018). High variability [pronunciation] training (HVPT). *Journal of Second Language Pronunciation, 4*(2).
- Lewis, M. (1993). *The Lexical Approach.* Wray, A. (2002). *Formulaic Language and the Lexicon.*
- Jones, R. L., & Tschirner, E. (2006). *A Frequency Dictionary of German.* Routledge.
- Köpcke, K.-M. (1982). *Untersuchungen zum Genussystem der deutschen Gegenwartssprache.* Köpcke, K.-M., & Zubin, D. (1984/1996) gender assignment çalışmaları.
- Wyner, G. (2014). *Fluent Forever.* (artikel imgeleme tekniği — popüler kaynak)

**Motivasyon, alışkanlık, mastery**
- Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits. *Psychological Inquiry, 11*(4).
- Deci, E. L., Koestner, R., & Ryan, R. M. (1999). A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation. *Psychological Bulletin, 125*(6).
- Dörnyei, Z. (2009). The L2 Motivational Self System.
- Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed. *European Journal of Social Psychology, 40*(6).
- Gollwitzer, P. M. (1999). Implementation intentions. *American Psychologist, 54*(7).
- Bloom, B. S. (1968). Learning for mastery. (1984). The 2 sigma problem. *Educational Researcher, 13*(6).
- Kulik, C.-L. C., Kulik, J. A., & Bangert-Drowns, R. L. (1990). Effectiveness of mastery learning programs: A meta-analysis. *Review of Educational Research, 60*(2).

**Seviye ve süre**
- Council of Europe (2001/2020). *Common European Framework of Reference for Languages* (+ Companion Volume).
- Goethe-Institut — Kurs ve sınav bilgileri (Unterrichtseinheiten tablosu): https://goethe.de/ins/hr/de/spr/unt/kum.html ; https://www.goethe.de/ins/in/de/spr/kur/onk.html
- Goethe-Zertifikat A1 / A2 Wortlisten (Prüfungsziele, Testbeschreibung).
- Deutsche Welle — *Nicos Weg* (A1–B1), dw.com/learn-german.
