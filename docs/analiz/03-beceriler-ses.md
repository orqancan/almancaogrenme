# 03 — Dört Beceri, Telaffuz ve Tarayıcı Teknolojisi

> Kol: Hören · Lesen · Schreiben · Sprechen + Aussprache
> Hedef: Türkçe ana dilli, sıfırdan başlayan öğrenci; öğretmensiz; statik HTML/JS (backend yok); A1 → A2.
> Tarih: Ekim 2026. Tarayıcı desteğiyle ilgili ifadeler bu tarihteki durumu yansıtır. Yine de uygulama, her özelliği çalışma anında **feature detection** ile kontrol etmeli, kendi notlarımıza güvenmemeli.

---

## 0. Yönetici özeti (kararlar)

| Konu | Öneri | Gerekçe |
|---|---|---|
| **Dinleme sesi (TTS)** | **Hibrit.** Müfredattaki tüm sabit içerik (kelimeler, örnek cümleler, diyaloglar, dikteler, minimal pair'ler) **önceden üretilmiş ses dosyası** olarak repoya konur. Kullanıcının sonradan eklediği kartlar gibi dinamik içerik için **Web Speech `speechSynthesis`** yedek olarak kullanılır. | Tarayıcı TTS'inin kalitesi ve de-DE sesinin bulunup bulunmaması cihaza göre çok değişiyor. Önceden üretilmiş ses her cihazda aynı kaliteyi verir, offline çalışır ve kelime zaman damgaları (karaoke vurgusu) sağlar. |
| **Ses üretim motoru (build zamanı)** | 1. tercih: **Azure AI Speech** (resmî ücretsiz katman, nöral de-DE sesleri, kelime sınırı zaman damgaları). Tamamen açık lisans istenirse: **Piper** (`de_DE-thorsten-high`, CC0). `edge-tts` yalnızca kişisel kullanım için "gri bölge" olarak değerlendirilmeli. | Kalite, lisans netliği ve zaman damgası bu üçünün dengesi. |
| **Ses formatı** | Mono **MP3, 48 kbps, 24 kHz** (gerekirse 32 kbps). Cümle başına ayrı dosya, içerik-hash'li dosya adı. Service Worker ile ünite bazında önbellek. | MP3 her tarayıcıda, iOS dahil, sorunsuz çalışır. Opus daha küçük olsa da Safari'de konteyner sorunları çıkabiliyor. |
| **Konuşma tanıma (STT)** | **Üç katman:** (a) her zaman çalışan **kaydet-dinle-karşılaştır** (MediaRecorder), (b) varsa **Web Speech `SpeechRecognition`**: kelime bazlı "anlaşılırlık skoru", kullanıcı onayıyla, (c) opsiyonel **offline Whisper** (transformers.js, `whisper-base` veya `whisper-small`, WebGPU). | STT her tarayıcıda yok; Chrome'da ses Google sunucusuna gidiyor. Kayıt ve karşılaştırma ise her yerde çalışır ve telaffuz eğitiminin asıl omurgasıdır. |
| **Telaffuz skoru** | Ölçtüğümüz şey **"anlaşılırlık"**, fonem doğruluğu değil. Bunu UI'da açıkça söyle. Fonem düzeyi değerlendirme (wav2vec2 fonem modelleri) şimdilik tarayıcı için fazla ağır; ileri faz. | STT'nin dil modeli hatalı telaffuzu "düzeltir". Skor yanıltıcı olabilir. |
| **Yazma geri bildirimi** | 4 katmanlı: **L0** yerel kural motoru (her zaman), **L1** LanguageTool (opt-in), **L2** kullanıcının kendi Claude API anahtarıyla LLM düzeltmesi (opt-in), **L3** model metin + öz-kontrol listesi (her zaman). | Öğretmen yokken en değerli geri bildirim L2. Ama sistem L2 olmadan da tam kullanılabilir kalmalı. |
| **Klavye** | Ekran butonları `ä ö ü ß Ä Ö Ü`. Türk klavyesinde `ü ö` zaten var, eksik olan yalnızca `ä` ve `ß`. `ae/oe/ue/ss` girişleri **kabul edilir ama işaretlenir**. Türkçe `ı/İ/ş/ğ/ç` karakterleri ayrıca normalize edilir. | Türk kullanıcıya özgü bir avantaj ve tuzak var (bkz. §7). |
| **Gizlilik** | Varsayılan olarak **hiçbir ses ya da metin dışarı gitmez**. Sunucuya veri gönderen her özellik (Chrome STT, LanguageTool, Claude) ayarlardan ayrı ayrı açılır ve ilk kullanımda uyarı gösterir. | Kişisel kullanım; yine de bilinçli onay şart. |

---

## 1. Mimari ilkeler

1. **Progressive enhancement.** Her alıştırmanın, hiçbir gelişmiş API olmadan çalışan bir taban sürümü olmalı. Örneğin Sprechen alıştırması STT yoksa "kaydet, model sesle karşılaştır, kendini puanla" moduna düşer.
2. **Feature detection, user-agent sniffing değil.** `'speechSynthesis' in window`, `window.SpeechRecognition || window.webkitSpeechRecognition`, `MediaRecorder.isTypeSupported(...)`, `navigator.gpu`.
3. **Offline-first.** Uygulama kabuğu ve aktif ünitenin sesleri Service Worker ile önbelleklenir. Kullanıcı kayıtları IndexedDB'de tutulur. Ağ gerektiren özellikler (Chrome STT, LanguageTool, Claude) offline'da gri görünür.
4. **İçerik verisi build zamanında zenginleştirilir.** Lemma, artikel, çoğul, ayrılabilir fiil işaretleri ve ses zaman damgaları önceden JSON'a yazılır. Tarayıcıda NLP çalıştırmayız.
5. **Tek "yetenek" (capability) modülü.** Açılışta bir kez test edilir, sonuç ayarlar ekranında gösterilir:

```js
// capabilities.js
export async function detectCapabilities() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const caps = {
    tts: 'speechSynthesis' in window,
    ttsGermanVoices: [],
    stt: !!SR,
    sttLocal: false,                 // on-device tanıma mümkün mü?
    recorder: 'MediaRecorder' in window && !!navigator.mediaDevices?.getUserMedia,
    recorderMime: pickRecorderMime(),
    webgpu: !!navigator.gpu,
    online: navigator.onLine,
  };
  if (caps.tts) caps.ttsGermanVoices = await loadGermanVoices();
  // Yeni spesifikasyon: SpeechRecognition.available({langs, processLocally})
  if (SR && typeof SR.available === 'function') {
    try {
      const st = await SR.available({ langs: ['de-DE'], processLocally: true });
      caps.sttLocal = st === 'available';      // 'downloadable' ise install() önerilebilir
      caps.sttLocalStatus = st;
    } catch { /* eski tarayıcı */ }
  }
  return caps;
}

function pickRecorderMime() {
  if (!('MediaRecorder' in window)) return null;
  const c = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/webm'];
  return c.find(t => MediaRecorder.isTypeSupported(t)) ?? '';
}
```

---

## 2. HÖREN (Dinleme)

### 2.1 Seçenek A: Web Speech API `speechSynthesis`

**Artıları:** Sıfır boyut, dinamik metin okuyabilir, hız/perde ayarı var.
**Eksileri:** Ses kalitesi ve mevcudiyet cihaza bağlı, kelime sınırı olayları (`boundary`) güvenilmez, bazı sesler aslında çevrimiçi.

| Platform | Tipik de-DE sesleri | Kalite | Notlar |
|---|---|---|---|
| Chrome (Windows/macOS/Linux) | "Google Deutsch" + işletim sistemi sesleri | Orta-iyi | "Google ..." sesleri **ağ gerektirir** (`voice.localService === false`). Uzun metinde ~15 sn sonra kesilme hatası bilinir; cümle cümle konuşturulmalı. |
| Edge (Windows/macOS) | "Microsoft Katja/Conrad/Amala... Online (Natural)" | **Çok iyi** (nöral) | Online nöral sesler. Offline'da yalnızca yerel Windows sesleri (Hedda/Katja/Stefan) kalır. |
| Safari macOS / iOS | Anna (varsayılan), indirilebilir Enhanced/Premium sesler (ör. Anna, Helena, Martin, Petra) | Varsayılan orta, Premium iyi | Kullanıcı Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler'den Almanca premium ses indirmeli. İlk `speak()` **kullanıcı etkileşimi** içinde çağrılmalı. `voiceschanged` olayı güvenilir değil, polling gerekir. |
| Android Chrome | Google TTS motoru de-DE (dil verisi yüklüyse) | İyi | Telefonda "Google Konuşma Hizmetleri"nin Almanca paketi yüklü olmalı. |
| iOS'ta Chrome/Firefox | Safari ile aynı (WebKit) | Safari gibi | iOS'ta tüm tarayıcılar WebKit kullanır. |
| Firefox (Win/mac) | İşletim sistemi sesleri | OS'e bağlı | |
| Firefox (Linux) | speech-dispatcher / eSpeak | **Kötü** | Öğretim için kullanılmamalı. |

**Sonuç:** `speechSynthesis` öğretimin **ana** ses kaynağı olamaz. Telaffuz modelini taklit edeceğimiz ses tutarlı ve doğal olmalı. Ancak yedek olarak ve kullanıcı kartları için değerlidir.

```js
// tts.js: güvenli Almanca seslendirme
let germanVoice = null;

export function loadGermanVoices(timeoutMs = 2000) {
  return new Promise(resolve => {
    const pick = () => {
      const all = speechSynthesis.getVoices().filter(v => v.lang?.toLowerCase().startsWith('de'));
      if (all.length) {
        // Tercih sırası: nöral/premium > yerel > diğer
        const score = v =>
          (/natural|premium|enhanced|neural/i.test(v.name) ? 4 : 0) +
          (v.lang === 'de-DE' ? 2 : 0) +
          (v.localService ? 1 : 0);
        all.sort((a, b) => score(b) - score(a));
        germanVoice = all[0];
        resolve(all);
        return true;
      }
      return false;
    };
    if (pick()) return;
    speechSynthesis.addEventListener('voiceschanged', pick, { once: true });
    // Safari'de voiceschanged gelmeyebilir: polling
    const t0 = Date.now();
    const iv = setInterval(() => {
      if (pick() || Date.now() - t0 > timeoutMs) { clearInterval(iv); resolve(speechSynthesis.getVoices().filter(v => v.lang?.startsWith('de'))); }
    }, 150);
  });
}

/** Cümle cümle konuşur (Chrome'un ~15 sn kesilme hatasından kaçınmak için). */
export function speakGerman(text, { rate = 0.9, onSentence } = {}) {
  speechSynthesis.cancel();
  const sentences = text.match(/[^.!?]+[.!?]*/g) ?? [text];
  return sentences.reduce((p, s, i) => p.then(() => new Promise((res, rej) => {
    const u = new SpeechSynthesisUtterance(s.trim());
    u.lang = 'de-DE';
    if (germanVoice) u.voice = germanVoice;
    u.rate = rate;           // 0.6 = yavaş, 0.9 = öğrenci, 1.0 = doğal
    u.onstart = () => onSentence?.(i);
    u.onend = res;
    u.onerror = e => (e.error === 'interrupted' || e.error === 'canceled') ? res() : rej(e);
    speechSynthesis.speak(u);
  })), Promise.resolve());
}
```

### 2.2 Seçenek B: Önceden üretilmiş ses dosyaları (önerilen ana kaynak)

| Motor | Kalite (de) | Lisans / kullanım | Kelime zaman damgası | Maliyet | Değerlendirme |
|---|---|---|---|---|---|
| **Azure AI Speech** (nöral: Katja, Conrad, Amala, Killian, Seraphina vb.) | Çok iyi; SSML ile hız, vurgu ve duraklama | Resmî API; üretilen sesin uygulamada kullanılması hizmet şartlarına göre serbest | **Var** (WordBoundary) | Ücretsiz F0 katmanı: aylık ~0,5 M karakter. A1–A2 içeriği bunun altında kalır. | **1. tercih** |
| **Google Cloud TTS** (WaveNet/Neural2/Chirp) | Çok iyi | Resmî | SSML `<mark>` ile kısmi | Aylık ücretsiz kota var | Azure'a denk alternatif |
| **edge-tts** (Python; Edge "Read Aloud" uç noktası) | Azure ile aynı sesler | **Resmî olmayan** uç nokta; Microsoft şartlarında gri alan. Kişisel kullanım için yaygın ama herkese açık repoda yeniden dağıtım riskli. | **Var** | Ücretsiz | Kişisel ve özel repo için kabul edilebilir; kamuya açık proje için önerilmez |
| **Piper** (`de_DE-thorsten-high`, `thorsten_emotional`, `eva_k`, `kerstin`, `ramona`...) | İyi (Thorsten-high oldukça doğal, hafif robotik) | Motor açık kaynak. **Ses lisansları değişken:** Thorsten **CC0**. Diğerlerinin model kartı tek tek kontrol edilmeli. | Yok (gerekirse forced alignment: aeneas / WhisperX / MFA) | Ücretsiz, offline, CPU'da hızlı | **Tam açık lisans** gerekiyorsa tercih |
| Coqui XTTS / diğer | İyi | XTTS lisansı ticari olmayan (CPML) | Yok | GPU gerekir | Gerek yok |

**Önerilen üretim hattı (build script, Node veya Python):**

```
content/units/*.json  ──►  scripts/build-audio  ──►  audio/<sha1(text+voice+rate)>.mp3
                                                 └─►  audio/<hash>.json   (kelime zaman damgaları)
```

- Her cümle ayrı dosya. Dosya adı içerik hash'i olur: metin değişince yalnızca o dosya yeniden üretilir, önbellek de doğru kırılır.
- Diyaloglarda **iki farklı ses** (kadın/erkek) kullan; dinleme anlamada konuşmacı ayrımı önemli.
- Her cümle için iki hız üretmeye **gerek yok**. Tarayıcıda `playbackRate` ve `preservesPitch` ile 0.6–1.0 aralığı yeterli kalitede. Yalnızca "çok yavaş, hece hece" modu için SSML ile `rate="-30%"` ayrı bir varyant düşünülebilir.
- Minimal pair ve tek kelime kayıtları için SSML ile cümle sonu tonlaması yerine nötr okuma (kelimeyi `.` ile bitir).

**Boyut tahmini:**

| Kalem | Adet (A1+A2) | Ort. süre | Toplam süre |
|---|---|---|---|
| Kelime (lemma + artikel) | ~1.300–1.500 | 1,2 sn | ~30 dk |
| Örnek cümle | ~3.000 | 2,5 sn | ~125 dk |
| Diyalog/okuma metni | ~120 metin | 60 sn | ~120 dk |
| Dikte + minimal pair | ~600 | 2 sn | ~20 dk |
| **Toplam** | | | **~5 saat** |

48 kbps ≈ 6 KB/sn olduğundan toplam ≈ **105 MB**, 32 kbps'de ≈ **70 MB**. Git reposu için kabul edilebilir, ama:
- Ünite başına lazy-load yap; ilk açılışta her şeyi indirme.
- Repo büyürse ses klasörünü ayrı bir branch'e, Git LFS'e ya da GitHub Releases/Pages'e taşı.
- Opsiyonel olarak "tüm sesleri offline için indir" butonu.

**Tarayıcı içi Piper (dinamik içerik için offline yüksek kalite).** `piper-tts-web` / `vits-web` gibi WASM+ONNX paketleri ile Thorsten modeli (~60–75 MB, medium ~ 60 MB) tarayıcıda çalıştırılabilir. Bu, kullanıcı kartlarını offline ve tutarlı sesle okumak için **opsiyonel bir eklenti** olarak değerlendirilebilir; MVP'de gerekmez.

### 2.3 Oynatıcı: cümle cümle, hız, tekrar, karaoke

```js
// player.js
const audio = new Audio();
audio.preservesPitch = true;           // yavaşlatınca ses kalınlaşmasın

export async function playClip(src, { rate = 1, loop = 1 } = {}) {
  audio.src = src;
  audio.playbackRate = rate;           // 0.6 / 0.75 / 0.9 / 1.0
  for (let i = 0; i < loop; i++) {
    await audio.play();
    await new Promise(r => audio.addEventListener('ended', r, { once: true }));
  }
}

// Karaoke: build zamanında üretilen kelime zaman damgaları [{w:"Ich", t:0.05, d:0.18}, ...]
export function bindKaraoke(spans, marks) {
  audio.ontimeupdate = () => {
    const t = audio.currentTime;
    marks.forEach((m, i) => spans[i].classList.toggle('active', t >= m.t && t < m.t + m.d));
  };
}
```

Oynatıcı özellikleri:
- **Cümle navigasyonu:** ◀ önceki · ⟲ tekrar · ▶ sonraki. Klavye kısayolları: `Space` tekrar, `←/→` gezinme, `S` yavaş.
- **Hız düğmeleri:** 0.6 / 0.75 / 0.9 / 1.0. A1 başı varsayılan 0.9.
- **Metin görünürlüğü:** gizli → yalnız Almanca → Almanca + Türkçe (dinleme önce körlemesine yapılmalı).
- **"Tekrar sayacı":** aynı cümle kaç kez dinlendi; zorluk metriği olarak SRS'e beslenir.

### 2.4 Dinleme alıştırma tipleri

1. **Dinle ve seç (resim/kelime):** Ses çalar, 3–4 seçenek. A1'in ilk haftası için.
2. **Minimal pair ayırt etme (AX / ABX):** "Duyduğun hangisi: *Hüte* mi *Hütte* mi?", ya da "İki kelime aynı mı farklı mı?"
3. **Diktat (dikte):** Cümle çalar, kullanıcı yazar. Kelime bazlı hizalama ile hatalar renklendirilir (bkz. §3.4 ve §7). Kademeli: önce **boşluk doldurma dikte** (cümlede 1–2 kelime eksik), sonra tam cümle.
4. **Sayı / saat / fiyat / telefon numarası dikte:** Goethe A1 Hören'de çok çıkar; rastgele üretilip TTS ile okunabilir (`speechSynthesis` ya da önceden üretilmiş rakam parçaları). "einundzwanzig" tipi ters sayı sırası Türk öğrenci için kritik.
5. **Richtig/Falsch ve çoktan seçmeli:** Goethe A1 Hören Teil 1–3 formatı (kısa diyalog, anons, telesekreter mesajı).
6. **Diyalog sıralama:** Karışık replikleri dinleyerek sıraya koy.
7. **Shadowing hazırlığı:** Bkz. §3.6.

### 2.5 Türk öğrenci için minimal pair seti (telaffuz odakları)

Türkçe'de `ü, ö` zaten var; bu büyük bir avantaj. Zorluklar başka yerlerde:

| Odak | Örnek çiftler | Neden zor |
|---|---|---|
| Ünlü uzunluğu | *Staat – Stadt*, *Miete – Mitte*, *Höhle – Hölle*, *Hüte – Hütte*, *bieten – bitten*, *Saat – satt* | Türkçede uzunluk anlam ayırt etmez (yabancı kelimeler hariç). |
| `ä` [ɛ/ɛː] vs `e` [eː] | *Ähre – Ehre*, *Bären – Beeren*, *Käse* | Türkçe `e` bu ikisi arasında. |
| İndirgenmiş `-e` [ə] ve `-er` [ɐ] | *bitte – bitter*, *Lehre – Lehrer*, *Kinde – Kinder* | Türk öğrenci `-er`'i "er" diye okur. |
| *ich-Laut* [ç] | *Kirche – Kirsche*, *Fichte – fischte*, *mich – misch* | Türkçede yok; öğrenci "ş" ya da "h" der. |
| *ach-Laut* [x] | *Dach – Tag*, *Bach*, *lachen – lagen* | Türkçedeki hırıltılı "h" ile kısmen benzer; iyi öğretilebilir. |
| `h` başta | *Hund – und*, *Hände – Ende* | |
| `z` [ts] | *Zahl – Saal*, *Zoo* | Türk öğrenci "z" okur. |
| `s` başta [z] | *sie*, *Sonne* | Türk öğrenci "s" okur. |
| `w` [v] / `v` [f] | *Wein – Vers*, *Vater* | Yazım tuzağı. |
| `sp-`, `st-` [ʃp, ʃt] | *Sport, Straße, spielen* | Ayrıca Türkçedeki ünsüz kümesi önüne ünlü ekleme alışkanlığı: "ıştraße" / "sıport". |
| Ünsüz kümeleri | *Herbst, Strumpf, du schreibst* | Araya ünlü sokma. |
| `ei` [aɪ] – `ie` [iː] | *Wein – wien*, *Bein – Biene*, *leiden – lieben* | Yazım ↔ ses eşlemesi. |
| `eu/äu` [ɔʏ] | *heute, Häuser* | Yazıdan okumada hata. |
| `r` (uvular ya da vokalize) | *rot, Tür, Uhr* | Türkçe dil ucu r'si anlaşılır; düşük öncelik. |
| Glottal stop | *be-achten*, *ver-eisen* | Bağlama alışkanlığı. |
| Vurgu (ilk hece) | *ˈArbeit, ˈHandy*, ama *Hoˈtel, Fabˈrik* | Türkçede vurgu çoğunlukla sonda. |

Not: Auslautverhärtung (*Tag* [taːk], *Hund* [hʊnt]) Türkçede de var (*kitap/kitabı*), bu yüzden kolay; bir kez göstermek yeterli.

---

## 3. SPRECHEN (Konuşma) ve AUSSPRACHE (Telaffuz)

Öğretmen yokken en zor alan bu. Hiçbir tarayıcı teknolojisi şu an bir fonetikçinin geri bildirimini veremiyor. Strateji, **üç zayıf sinyali birleştirmek**:

1. **Kulak eğitimi + karşılaştırmalı dinleme:** Kullanıcı kendi sesini model sesin hemen ardından duyar. Pedagojik olarak en sağlam yöntem bu.
2. **STT anlaşılırlık testi:** "Bir Alman makinesi seni anladı mı?" Bu sorunun cevabı motive edicidir ve kabaca doğrudur.
3. **Basit akustik ölçümler:** Süre oranı (uzun/kısa ünlü, akıcılık), duraksama sayısı, opsiyonel tonlama eğrisi.

### 3.1 Web Speech `SpeechRecognition`: destek ve sınırlamalar (Ekim 2026)

| Tarayıcı | Durum | İşleme yeri | Notlar |
|---|---|---|---|
| Chrome masaüstü | ✔ `SpeechRecognition` / `webkitSpeechRecognition` | **Varsayılan: Google sunucusu.** Yeni sürümlerde `processLocally: true` + `SpeechRecognition.available()/install()` ile on-device dil paketi (dil desteği sınırlı, de-DE durumu çalışma anında kontrol edilmeli). | Online gerekir (local hariç). `continuous`, `interimResults`, `maxAlternatives` çalışır. |
| Chrome Android | ✔ | Google (cihaz servisi) | İyi çalışır. |
| Edge | ✔ | Azure sunucusu; Microsoft dokümanına göre yeni sürümlerde **Almanca dahil** birkaç dil için **yerel** tanıma | Edge, Almanca için şu an en iyi seçenek olabilir. |
| Safari macOS / iOS | ✔ `webkitSpeechRecognition` (iOS 14.5+) | Apple (Siri/Dikte altyapısı; cihazda ya da Apple sunucusunda) | Siri/Dikte açık olmalı. `continuous` güvenilmez. Kısa ifadelerle (tek cümle) kullan. |
| iOS'ta Chrome/Firefox/Edge | Safari ile aynı | | WebKit zorunluluğu. |
| Firefox | ✘ (varsayılan kapalı; bayrak arkasında geliştirme sürüyor) | | Kayıt ve karşılaştırma modu ve opsiyonel Whisper kullanılır. |
| Brave / Opera / Vivaldi | Genelde ✘ ya da hata (`network`) | | Chromium tabanlı olsalar da Google anahtarı yok. |
| Samsung Internet | Kısmi | | |

**Kritik pedagojik sınırlama:** STT motorları, güçlü bir dil modeliyle **en olası doğru cümleyi** tahmin eder. "Ish heise Ali" büyük ihtimalle "Ich heiße Ali" olarak tanınır. Yani:
- **Yüksek skor ≠ doğru telaffuz** (yalnızca "anlaşılır" demek).
- **Düşük skor ≈ gerçek sorun** (anlaşılmadı). Asıl değerli sinyal bu.
- Tek kelime tanıma (bağlamsız) cümleden daha "dürüst" sonuç verir, çünkü dil modeli daha az yardım eder. Minimal pair'lerde tek kelime söylet ve `maxAlternatives = 5` ile alternatiflere bak: *Hütte* söylerken alternatiflerde *Hüte* üstteyse uzunluk sorunu var demektir.
- `confidence` değeri tarayıcıya göre anlamsız olabilir (Safari genelde 0 veya sabit). Skorda düşük ağırlık ver.

```js
// stt.js
export function recognizeOnce({ lang = 'de-DE', maxAlternatives = 5, preferLocal = true } = {}) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return Promise.reject(new Error('no-stt'));
  return new Promise((resolve, reject) => {
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = maxAlternatives;
    if (preferLocal && 'processLocally' in rec) rec.processLocally = true;
    let done = false;
    rec.onresult = e => {
      done = true;
      const alts = Array.from(e.results[0]).map(a => ({ text: a.transcript, conf: a.confidence }));
      resolve(alts);
    };
    rec.onerror = e => { done = true; reject(new Error(e.error)); }; // 'not-allowed','network','no-speech','language-not-supported'
    rec.onend = () => { if (!done) resolve([]); };
    rec.start();                       // kullanıcı etkileşimi içinde çağrılmalı
  });
}
```

### 3.2 Hedef cümle ile karşılaştırma: kelime bazlı skor

Adımlar:
1. **Normalize:** küçük harf, noktalama sil, `ß→ss`, sayıları yazıya çevir (STT "3 Uhr" döndürebilir, hedef "drei Uhr" olabilir), Türkçe karakter düzeltmesi.
2. **Token hizalama:** Kelime dizileri arasında Levenshtein (kelime düzeyi DP), hizalama yolu geri izlenir: `match / sub / del / ins`.
3. **Yerine koyma kelimelerine kısmi puan:** Karakter düzeyi benzerlik + **Kölner Phonetik** (Almanca için Soundex benzeri) eşleşmesi. Örneğin *Hüte* ↔ *Hütte*, *Kirche* ↔ *Kirsche* "fonetik yakın, kısmi doğru" sayılır ve ilgili telaffuz ipucuna bağlanır.
4. **Alternatifler arasından en iyisi:** `maxAlternatives` sonuçlarının her biri skorlanır, en yükseği alınır. Ama en üstteki alternatif hedef değilse bu durum not edilir.

```js
// compare.js
const NUM = { '0':'null','1':'eins','2':'zwei','3':'drei','4':'vier','5':'fünf','6':'sechs','7':'sieben','8':'acht','9':'neun','10':'zehn','11':'elf','12':'zwölf' };

export function normalizeDe(s) {
  return s
    .replace(/ı/g, 'i').replace(/İ/g, 'I')                 // Türk klavyesi kazaları
    .toLowerCase()                                          // toLocaleLowerCase('tr') KULLANMA
    .replace(/ß/g, 'ss')
    .replace(/[„“”"'‚‘’.,!?;:()\-–—]/g, ' ')
    .split(/\s+/).filter(Boolean)
    .map(w => NUM[w] ?? w);
}

/** Kölner Phonetik (sadeleştirilmiş, A1 için yeterli) */
export function koelner(word) {
  const w = word.toLowerCase().replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'s').replace(/[^a-z]/g,'');
  let out = '';
  for (let i = 0; i < w.length; i++) {
    const c = w[i], p = w[i-1] ?? '', n = w[i+1] ?? '';
    let code;
    if ('aeijouy'.includes(c)) code = '0';
    else if (c === 'h') code = '';
    else if (c === 'b' || (c === 'p' && n !== 'h')) code = '1';
    else if ('dt'.includes(c)) code = 'csz'.includes(n) ? '8' : '2';
    else if ('fvw'.includes(c) || (c === 'p' && n === 'h')) code = '3';
    else if ('gkq'.includes(c)) code = '4';
    else if (c === 'c') code = (i === 0 ? 'ahkloqrux' : 'ahkoqux').includes(n) && !'sz'.includes(p) ? '4' : '8';
    else if (c === 'x') code = 'ckq'.includes(p) ? '8' : '48';
    else if (c === 'l') code = '5';
    else if ('mn'.includes(c)) code = '6';
    else if (c === 'r') code = '7';
    else if ('sz'.includes(c)) code = '8';
    else code = '';
    out += code;
  }
  out = out.replace(/(.)\1+/g, '$1');            // ardışık tekrarları sil
  if (!out) return '';
  return out[0] + out.slice(1).replace(/0/g, ''); // baştaki hariç 0'ları sil
}

function lev(a, b) {                               // karakter düzeyi
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[a.length][b.length];
}

function wordCredit(target, heard) {
  if (target === heard) return 1;
  const sim = 1 - lev(target, heard) / Math.max(target.length, heard.length);
  if (koelner(target) === koelner(heard)) return Math.max(0.6, sim); // fonetik olarak yakın
  return sim >= 0.75 ? 0.4 : 0;
}

/** Kelime düzeyi hizalama → [{target, heard, op, credit}] ve 0..100 skor */
export function alignWords(targetText, heardText) {
  const T = normalizeDe(targetText), H = normalizeDe(heardText);
  const n = T.length, m = H.length;
  const cost = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) cost[i][0] = i;
  for (let j = 0; j <= m; j++) cost[0][j] = j;
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      cost[i][j] = Math.min(
        cost[i-1][j] + 1,                                   // söylenmedi
        cost[i][j-1] + 1,                                   // fazladan
        cost[i-1][j-1] + (1 - wordCredit(T[i-1], H[j-1]))   // eşleşme / yerine koyma
      );
  const ops = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && cost[i][j] === cost[i-1][j-1] + (1 - wordCredit(T[i-1], H[j-1]))) {
      const c = wordCredit(T[i-1], H[j-1]);
      ops.unshift({ target: T[i-1], heard: H[j-1], op: c === 1 ? 'ok' : 'sub', credit: c }); i--; j--;
    } else if (i > 0 && cost[i][j] === cost[i-1][j] + 1) {
      ops.unshift({ target: T[i-1], heard: null, op: 'del', credit: 0 }); i--;
    } else {
      ops.unshift({ target: null, heard: H[j-1], op: 'ins', credit: 0 }); j--;
    }
  }
  const earned = ops.reduce((s, o) => s + o.credit, 0);
  const extra = ops.filter(o => o.op === 'ins').length;
  const score = Math.max(0, Math.round(100 * (earned - 0.25 * extra) / Math.max(1, n)));
  return { score, ops };
}

/** Alternatifler içinde en iyisini seç */
export function bestOf(target, alternatives) {
  return alternatives
    .map((a, idx) => ({ idx, ...alignWords(target, a.text) }))
    .sort((a, b) => b.score - a.score)[0] ?? { score: 0, ops: [] };
}
```

**Gösterim:** Hedef cümle kelime kelime renklendirilir: yeşil = tam, sarı = yakın (ipucu linki, ör. "*Kirche* ↔ *Kirsche*: ich-Laut'a bak"), kırmızı = anlaşılmadı. Bir de 0–100 skor. Eşikler: ≥85 "sehr gut", 65–84 "gut, noch einmal?", <65 "dinle ve tekrar et".

**Hata → ipucu eşleme tablosu** (veri dosyası): hedef/duyulan kelime çiftinin farkından kural türetilir. Örneğin hedefte `ch` var ve duyulanda `sch` var → ich-Laut ipucu; hedefte çift ünsüz var, duyulanda tek ünsüz var (ya da tersi) → ünlü uzunluğu ipucu; `z` ↔ `s` → [ts] ipucu. Her ipucu kısa bir açıklama ve minimal pair alıştırmasına link içerir.

### 3.3 Kaydet, dinle, karşılaştır (her tarayıcıda çalışan omurga)

```js
// recorder.js
export async function recordClip({ maxMs = 8000, mimeType } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
  });
  const rec = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  const chunks = [];
  rec.ondataavailable = e => e.data.size && chunks.push(e.data);
  const stopped = new Promise(r => rec.onstop = r);
  rec.start();
  const timer = setTimeout(() => rec.state !== 'inactive' && rec.stop(), maxMs);
  return {
    stop: () => rec.state !== 'inactive' && rec.stop(),
    result: stopped.then(() => {
      clearTimeout(timer);
      stream.getTracks().forEach(t => t.stop());       // mikrofon ışığını kapat
      return new Blob(chunks, { type: rec.mimeType }); // iOS: audio/mp4, Chrome: audio/webm
    }),
  };
}
```

UI akışı ("Vergleichen" ekranı):
1. ▶ **Model** (önceden üretilmiş ses, ister normal hızda ister 0.75).
2. ● **Kaydet** (bas-konuş ya da otomatik: model bitince 300 ms sonra kayıt başlar, sessizlik algılanınca durur).
3. ⇄ **A/B:** Model → Ben → Model → Ben. Tek tuşla döngü.
4. **Görsel karşılaştırma** (Web Audio API): İki dalga formu ya da enerji zarfı alt alta, süreleri hizalı. Bu görüntü öğrenciye "daha uzun/kısa, nerede duraksadın" bilgisini sözsüz verir. İleri seviyede **perde (F0) eğrisi** eklenebilir: soru cümlesinde yükselen ton, düz cümlede düşen ton. Otokorelasyon ya da YIN algoritması birkaç yüz satır JS'dir, ek kütüphane gerekmez.
5. **Öz-değerlendirme:** 😀 / 😐 / 😟 → SRS zorluk girdisi. Yanında kontrol listesi: "*ch* sesi doğru mu? Uzun ünlüleri uzattın mı? Son *-er* 'a' gibi mi çıktı?" (cümleye özgü, veriden).
6. Kayıtlar IndexedDB'de son N adet tutulur. "1. hafta vs 6. hafta" karşılaştırması motivasyon için çok etkili.

**Basit otomatik metrikler (STT'siz):**
- **Süre oranı:** `kayıt_konuşma_süresi / model_süresi`. 1.6'dan büyükse "akıcılık" uyarısı verilir. Sessizlik kırpma RMS eşiğiyle yapılır.
- **Duraksama sayısı:** 300 ms üstü sessizlik blokları.
- **Ses seviyesi/kırpılma:** Mikrofon kalibrasyonu.

### 3.4 Dikte ve konuşma için aynı hizalama motoru

`alignWords` fonksiyonu Diktat'ta da kullanılır (hedef ↔ yazılan). Tek fark: dikte modunda Kölner Phonetik kredisi **yazım hatası** olarak raporlanır ("sesi doğru duydun, yazımı yanlış: *Strasse → Straße*").

### 3.5 Offline STT: Whisper'ı tarayıcıda çalıştırmak

| Seçenek | Model | İndirme boyutu (yaklaşık, kuantize) | Hız | Almanca kalite | Not |
|---|---|---|---|---|---|
| transformers.js + ONNX Runtime Web (WebGPU, yoksa WASM) | `onnx-community/whisper-tiny` | ~40–75 MB | WebGPU'da gerçek zamandan hızlı | Zayıf-orta | Kısa cümlelerde kabul edilebilir |
| aynı | `whisper-base` | ~80–200 MB (dtype'a göre) | WebGPU'da hızlı, WASM'da birkaç sn/cümle | Orta | **Makul denge** |
| aynı | `whisper-small` | ~250–500 MB | WebGPU şart | İyi | Masaüstü için opsiyonel |
| whisper.cpp WASM | ggml tiny/base (q5) | ~30–60 MB | WASM SIMD, multithread için COOP/COEP başlıkları gerekir | Aynı | GitHub Pages'te COOP/COEP başlığı verilemez (service worker hilesi gerekir) |

WebGPU durumu: Chrome/Edge (masaüstü ve Android), Safari 26 (macOS/iOS), Firefox (Windows'ta etkin, diğer platformlarda kısmi).

**Değerlendirme:**
- Teknik olarak **mümkün** ve gizlilik açısından ideal (ses cihazdan çıkmaz, Firefox'ta da çalışır).
- Ama Whisper'ın dil modeli önyargısı Google STT'den de güçlü. Hatalı telaffuzu düzeltme eğilimi yüksek, hatta hiç söylenmeyen metni "halüsinasyon" olarak üretebilir. Kısa ses ve `language: 'german'`, `task: 'transcribe'` ile kullanılmalı. Sessizlik kontrolü (VAD/RMS) şart.
- Model ilk kullanımda indirilir ve **Cache Storage**'da tutulur (transformers.js bunu kendisi yapar). Repoya konmaz; Hugging Face CDN'den çekilir. Tamamen offline isteniyorsa model dosyaları `/models/` altına self-host edilebilir.
- **Öneri:** Faz 2'de "Offline konuşma tanıma (Beta), ~150 MB indirilecek" ayarı olarak ekle. MVP'de Web Speech + kayıt/karşılaştırma yeterli.

```js
// whisper.js (opsiyonel modül, dinamik import ile yalnızca açıldığında yüklenir)
let asr;
export async function whisperTranscribe(blob) {
  if (!asr) {
    const { pipeline } = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.5');
    asr = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-base', {
      device: navigator.gpu ? 'webgpu' : 'wasm',
      dtype: navigator.gpu ? { encoder_model: 'fp32', decoder_model_merged: 'q4' } : 'q8',
    });
  }
  const ctx = new AudioContext({ sampleRate: 16000 });
  const pcm = (await ctx.decodeAudioData(await blob.arrayBuffer())).getChannelData(0);
  const out = await asr(pcm, { language: 'german', task: 'transcribe' });
  return [{ text: out.text.trim(), conf: null }];
}
```
*(Sürüm numarası uygulama yazılırken o anki kararlı sürümle sabitlenmeli. CDN yerine npm ile vendoring de olur.)*

**Fonem düzeyi değerlendirme (gelecek):** `wav2vec2-xlsr-53-espeak-cv-ft` gibi fonem tanıyan modeller + GOP (Goodness of Pronunciation) skoru, gerçek telaffuz değerlendirmesi verir. Ancak model boyutu ~300 MB–1,2 GB, kurulumu karmaşık. A1–A2 hedefi için maliyet/fayda düşük. Not edilip ertelenmeli.

### 3.6 Konuşma alıştırma tipleri

1. **Nachsprechen (tekrar et):** Kelime → kısa ifade → cümle. STT varsa skorlanır, yoksa kayıt/karşılaştırma.
2. **Minimal pair üretimi:** Ekranda *Hütte* yazar, kullanıcı söyler; STT alternatiflerinde *Hüte* çıkarsa uyarı verilir.
3. **Shadowing:** Model ses çalarken kullanıcı **aynı anda** konuşur; kayıt sürer. Kulaklık önerilir (yankı). Ardından model ve kayıt üst üste ya da ardışık dinlenir. Aşamalar: (a) metinle, 0.75 hız; (b) metinle, 1.0; (c) metinsiz.
4. **Okuyarak konuşma (Vorlesen):** Kısa paragraf, cümle bazlı skor.
5. **Soru-cevap (yarı serbest):** TTS soru sorar ("Woher kommst du?"), kullanıcı cevaplar. STT metni, **beklenen kalıplar listesi** (regex / anahtar kelimeler) ile kontrol edilir: `/ich komme aus \w+/`. Serbest cevabın birebir karşılaştırılması yapılmaz.
6. **Goethe A1 Sprechen simülasyonu:**
   - Teil 1 *Sich vorstellen:* Ekranda anahtar kelimeler (Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby). 1 dk kayıt. STT varsa her anahtar başlığın geçip geçmediği kontrol edilir; ardından model cevap dinletilir.
   - Teil 2 *Fragen stellen und beantworten:* Konu ve kelime kartı (ör. Thema *Essen*, Karte *Frühstück*). Kullanıcı soru üretir; soru kalıbı kontrol edilir (W-Frage/Ja-Nein, fiil konumu).
   - Teil 3 *Bitten formulieren:* Resim kartı → "Können Sie bitte ...?" kalıbı.
   - A2'de: hayatından anlatma, birlikte plan yapma. Partner rolü önceden üretilmiş sesle oynanır.
7. **Rol yapma diyalogu:** Diyalogda bir rolü sistem (ses dosyası), diğerini kullanıcı üstlenir. Kullanıcının repliği gösterilir, sonra gizlenir (fading).
8. **(Opsiyonel L2) Serbest konuşma partneri:** STT ile metin → Claude ile A1 seviyesinde cevap + düzeltme → TTS. Kullanıcı anahtarı gerekir; §5.4'teki gizlilik notları geçerli.

---

## 4. LESEN (Okuma)

### 4.1 İçerik modeli (build zamanında zenginleştirilmiş)

```json
{
  "id": "a1-u03-text1",
  "level": "A1.1",
  "title": "Familie Yılmaz in Köln",
  "sentences": [
    {
      "de": "Herr Yılmaz ruft seine Mutter an.",
      "tr": "Bay Yılmaz annesini arıyor.",
      "audio": "audio/3f9a1c.mp3",
      "tokens": [
        {"t": "Herr", "lemma": "Herr", "pos": "NOUN", "gen": "m", "gloss": "bay"},
        {"t": "Yılmaz", "pos": "PROPN"},
        {"t": "ruft", "lemma": "anrufen", "pos": "VERB", "sep": 1, "gloss": "aramak (telefonla)"},
        {"t": "seine", "lemma": "sein", "pos": "DET", "gloss": "onun"},
        {"t": "Mutter", "lemma": "Mutter", "pos": "NOUN", "gen": "f", "pl": "Mütter", "gloss": "anne"},
        {"t": "an", "lemma": "anrufen", "pos": "PART", "sep": 1},
        {"t": "."}
      ]
    }
  ],
  "questions": [
    {"type": "rf", "q": "Herr Yılmaz ruft seinen Vater an.", "a": false}
  ]
}
```

- Lemma/POS **build zamanında** spaCy (`de_core_news_md`) ile otomatik çıkarılır, sonra **elle düzeltilir**. A1–A2 metinleri az olduğu için bu yapılabilir.
- **Ayrılabilir fiiller** (`sep` grup kimliği) önemli: *ruft ... an* tıklandığında iki parça birlikte vurgulanır ve sözlükte *anrufen* gösterilir.
- Kelime sözlüğü (`lexicon.json`) ile ortak: `lemma → {artikel, çoğul, tr, örnek, ses}`.

### 4.2 Okuyucu UI

- **Tıklanabilir kelime → pop-up:** Lemma, artikel rengi (der/die/das için renk kodu), çoğul, Türkçe anlam, ▶ ses, **"+ Karta ekle"** (SRS modülüne, cümle bağlamıyla birlikte: cümle-kart / *cloze*). Uzun basma ya da çift tıklama ile seçili kelime grubu (ör. *es gibt*) eklenebilir.
- **Görünüm modları:** (1) yalnız Almanca; (2) cümle altında gizli Türkçe (tıkla-göster); (3) **interlinear** (kelime altı glos, yalnızca A1 başı için; erken bırakılmalı); (4) paralel iki sütun.
- **Read-along:** Cümle sesi çalar, karaoke vurgusu yapılır (§2.3).
- **Kapsama göstergesi:** "Bu metindeki kelimelerin %92'sini biliyorsun" (SRS durumundan). Graded reader hedefi %95+ bilinen kelimedir; yeni kelimeler önceden kartlara eklenir.
- **Bilinmeyen kelime vurgusu (opsiyonel):** SRS'te olmayan lemmalar ince alt çizgiyle gösterilir.

### 4.3 Okuma alıştırma tipleri

1. **Richtig/Falsch** (Goethe A1 Lesen Teil 1 formatı).
2. **Çoktan seçmeli / ilan eşleştirme** (Teil 2: iki ilan, hangisi uygun?).
3. **Tabela / not anlama** (Teil 3: kısa kamu metinleri, *Öffnungszeiten*, *Hinweisschilder*).
4. **Cümle sıralama**, metin parçası–başlık eşleştirme.
5. **W-Fragen'e kısa cevap** (yazarak; tolerans kuralları §7).
6. **Kelime avı:** "Metinde geçen 3 ayrılabilir fiili bul".
7. **Graded reader serisi:** Aynı karakterlerle süren hikâye. Her ünitede bir bölüm, ünite kelimeleriyle yazılmış.

---

## 5. SCHREIBEN (Yazma)

Serbest yazmaya geri bildirim, öğretmensiz sistemin en zayıf noktası. Strateji:
(1) A1'de yazmayı **yapılandırılmış** tut, yani doğru cevabı bilinen görevler kullan;
(2) yarı serbest görevlerde kural tabanlı ve içerik kontrolü yap;
(3) serbest yazmada opsiyonel dış araçlar ve öz-kontrol kullan.

### 5.1 Yazma görevleri (kolaydan zora)

| # | Görev | Doğru cevap bilinir mi? | Geri bildirim |
|---|---|---|---|
| 1 | Abschreiben (kopyala) + harf/umlaut pratiği | Evet | Birebir karşılaştırma |
| 2 | Boşluk doldurma (çekim, artikel, edat) | Evet (birden fazla kabul edilebilir) | Tolerans kuralları |
| 3 | Kelime sıralama (sürükle-bırak → sonra yazarak) | Evet (birden fazla sıra kabul edilebilir: *Heute gehe ich* / *Ich gehe heute*) | Kabul listesi |
| 4 | Diktat | Evet | `alignWords` |
| 5 | Dönüştürme (Präsens→Perfekt, du→Sie, tekil→çoğul) | Evet | Kabul listesi + tolerans |
| 6 | Çeviri TR→DE (kısa, kalıp cümle) | Kısmen (çoklu kabul) | Kabul listesi + en yakına diff + L1/L2 |
| 7 | **Form doldurma** (Goethe A1 Schreiben Teil 1): metni oku, formda 5 alanı doldur | Evet | Alan bazlı kontrol |
| 8 | **Kısa mesaj/e-posta** (A1 Teil 2: ~30 kelime, 3 içerik noktası; A2: ~30–40 kelime ×2) | Hayır | L0 + L3, opsiyonel L1/L2 |
| 9 | Günlük / serbest paragraf | Hayır | L0 + L1/L2 + L3 |

### 5.2 L0: Yerel kural motoru (her zaman, offline)

Kural tabanlı kontroller sınırlıdır ama A1 hatalarının büyük kısmını yakalar. Hepsi `lexicon.json` (lemma, artikel, POS, çekimler) üzerinde çalışır:

| Kontrol | Yöntem | Güvenilirlik |
|---|---|---|
| **İsimlerin büyük harfi** | Kelime sözlükte NOUN ise ve küçük harfle yazılmışsa uyarı | Yüksek (sözlükteki kelimeler için) |
| **Cümle başı büyük harf / nokta** | Regex | Yüksek |
| **Fiil 2. pozisyon (V2) ana cümlede** | Cümleyi tokenle; ilk "öğe"yi (tek kelime ya da bilinen öbek: *am Montag*, *heute*, *ich*) atla; 2. token çekimli fiil mi? Çekimli fiil formları sözlükten (A1 fiilleri × 6 şahıs ≈ birkaç bin form). | Orta: ilk öğe çok kelimeliyse yanılabilir. "Uyarı", "hata" değil. |
| **Yan cümlede fiil sonda** | `weil/dass/wenn/ob` sonrası virgüle/noktaya kadar son token çekimli fiil mi? | Orta-yüksek |
| **Özne-fiil uyumu** | *ich + -e/-st/...* sözlük formu kontrolü (`ich gehst` → hata) | Yüksek (bilinen fiiller için) |
| **Artikel-isim cinsiyeti (Nominativ)** | `der/die/das/ein/eine` + sözlükteki isim: cinsiyet uyumsuzsa uyarı. Akkusativ (*einen*) basit kalıplarda (`ich habe einen ...`). | Orta (çekimli durumlar sınırlı) |
| **du/Sie tutarlılığı** | Hitap (*Liebe Anna* → du; *Sehr geehrte* → Sie) ile metindeki zamirlerin uyumu | Yüksek |
| **E-posta kalıbı** | Hitap, kapanış (*Viele Grüße*, *Liebe Grüße*), imza var mı? | Yüksek |
| **İçerik noktaları** | Görev tanımındaki her nokta için anahtar kelime/regex seti. Örn. "saat söyle" → `/\b(um\s+)?\d{1,2}(\s*uhr|:\d{2})\b/`. | Orta (eşanlamlılar listelenmeli) |
| **Kelime sayısı** | Sayaç (A1 Teil 2 ≈ 30) | Kesin |
| **Bilinmeyen kelime / yazım** | Sözlükte (ve Hunspell de_DE listesinde) olmayan kelimeler işaretlenir | Orta. Opsiyonel: `nspell` + de_DE sözlüğü (~1,5 MB) ile tarayıcıda yazım denetimi |

```js
// writing-rules.js (örnek iki kural)
export function checkNounCapitalization(tokens, lexicon) {
  return tokens
    .filter(t => /^[a-zäöü]/.test(t.text))
    .filter(t => lexicon.byLower[t.text]?.some(e => e.pos === 'NOUN') &&
                 !lexicon.byLower[t.text]?.some(e => e.pos !== 'NOUN'))
    .map(t => ({ at: t.i, rule: 'NOUN_CAP', msg: `İsimler büyük harfle başlar: ${t.text[0].toUpperCase() + t.text.slice(1)}` }));
}

const SUBORD = new Set(['weil', 'dass', 'wenn', 'ob', 'als']);
export function checkVerbFinal(sentenceTokens, isFiniteVerb) {
  const i = sentenceTokens.findIndex(t => SUBORD.has(t.lower));
  if (i < 0) return [];
  const clause = sentenceTokens.slice(i + 1);
  const end = clause.findIndex(t => t.text === ',' || /[.!?]/.test(t.text));
  const words = clause.slice(0, end < 0 ? undefined : end);
  const last = words.at(-1);
  if (last && !isFiniteVerb(last.lower) && words.some(w => isFiniteVerb(w.lower)))
    return [{ at: last.i, rule: 'VERB_FINAL', msg: `"${sentenceTokens[i].text}" ile başlayan yan cümlede çekimli fiil sona gider.` }];
  return [];
}
```

Mesaj dili Türkçe, kısa, kurala linkli ("→ Gramer: V2 kuralı").

### 5.3 L1: LanguageTool (opt-in)

- **Public API:** `POST https://api.languagetool.org/v2/check` (`text`, `language=de-DE`). Ücretsiz limit IP başına **dakikada 20 istek / 75.000 karakter** (tepe değer, garanti yok). LanguageTool dokümanı public API'yi "manuel/düşük hacimli kullanım" için tanımlıyor. Bizim senaryo (kullanıcı "Kontrol et" butonuna basar) buna uygun. Otomatik "her tuşta kontrol" yapılmamalı.
- **CORS:** Tarayıcı eklentileri ve birçok web istemcisi bu uç noktayı doğrudan çağırıyor. Ancak bu analiz ortamından doğrulanamadı (ağ kısıtı). **Uygulama yazılırken ilk iş olarak test edilmeli.** CORS kapalıysa alternatifler: kullanıcının kendi makinesinde Docker ile LanguageTool (`erikvl87/languagetool`, `http://localhost:8010/v2/check`; ayarlardan URL girilebilir) ya da Premium API.
- **Gizlilik:** Metin LanguageTool GmbH'ya (Almanya, GDPR) gider. Ayarlarda açık onayla aktif edilmeli.
- **A1 için değeri:** Yazım, büyük harf, bazı artikel/çekim ve uyum hataları. Kelime sırası hatalarını sınırlı yakalar. Mesajlar Almanca/İngilizce gelir; kural ID'leri (`GERMAN_SPELLER_RULE`, `DE_AGREEMENT`, `DE_CASE`...) bir tabloyla Türkçe açıklamaya eşlenebilir (`motherTongue=tr` parametresi bazı yanlış-dost kurallarını da açar).

```js
export async function languageToolCheck(text, endpoint = 'https://api.languagetool.org/v2/check') {
  const body = new URLSearchParams({ text, language: 'de-DE', motherTongue: 'tr', level: 'default' });
  const r = await fetch(endpoint, { method: 'POST', body });
  if (r.status === 429) throw new Error('rate-limit');
  if (!r.ok) throw new Error('lt-' + r.status);
  const { matches } = await r.json();
  return matches.map(m => ({
    offset: m.offset, length: m.length,
    rule: m.rule.id, category: m.rule.category.id,
    msg: m.message, suggestions: m.replacements.slice(0, 3).map(x => x.value),
  }));
}
```

### 5.4 L2: Kullanıcının kendi Claude API anahtarıyla düzeltme (opt-in modül)

En zengin geri bildirim bu: hataların açıklaması (Türkçe), düzeltilmiş metin, seviyeye uygun öneri, içerik noktalarının değerlendirmesi, Goethe ölçütlerine göre puan.

**Teknik:**
- Statik sayfadan doğrudan `https://api.anthropic.com/v1/messages` çağrılır. Tarayıcıdan doğrudan erişim için `anthropic-dangerous-direct-browser-access: true` başlığı gerekir. Build adımı olmadığı için `fetch` ile ham HTTP kullanmak burada en sade yol.
- **Anahtar saklama:** Yalnızca kullanıcının kendi cihazında `localStorage` (ya da her oturumda sorulur). **Asla** repoya ya da içerik dosyasına yazılmaz. Ayarlar ekranında "Anahtarı sil" butonu olur. Kişisel cihaz olduğu için kabul edilebilir risk. Ancak sayfaya üçüncü taraf script eklenmemeli (XSS = anahtar sızıntısı); CDN kullanımı minimumda tutulmalı ve SRI hash'leri eklenmeli.
- **Yapılandırılmış çıktı:** `output_config.format` ile JSON şeması verilir; UI cevabı güvenle işler.
- **Model:** Varsayılan `claude-opus-5-5`. Ayarlarda kullanıcı daha ucuz bir model seçebilir (ör. `claude-haiku-5-5`); kısa A1 metinleri için maliyet zaten çok düşük.
- **Gizlilik:** Metin Anthropic'e gider. Açık onay alınır, ilk kullanımda uyarı gösterilir.

```js
// llm-feedback.js
const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['corrected', 'errors', 'contentPoints', 'score', 'tip'],
  properties: {
    corrected: { type: 'string' },
    errors: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      required: ['original', 'correction', 'category', 'explanation_tr'],
      properties: {
        original: { type: 'string' }, correction: { type: 'string' },
        category: { type: 'string', enum: ['Rechtschreibung', 'Großschreibung', 'Wortstellung', 'Konjugation', 'Artikel/Kasus', 'Wortwahl', 'Zeichensetzung', 'Sonstiges'] },
        explanation_tr: { type: 'string' },
      } } },
    contentPoints: { type: 'array', items: {
      type: 'object', additionalProperties: false, required: ['point', 'fulfilled'],
      properties: { point: { type: 'string' }, fulfilled: { type: 'boolean' } } } },
    score: { type: 'integer', minimum: 0, maximum: 100 },
    tip: { type: 'string' },
  },
};

export async function claudeFeedback({ apiKey, model = 'claude-opus-5-5', task, text, level = 'A1' }) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: 4000,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
      system:
        `Du bist eine geduldige DaF-Lehrerin für türkischsprachige Lernende auf Niveau ${level}. ` +
        `Korrigiere nur echte Fehler, nicht den Stil. Erkläre jeden Fehler kurz auf Türkisch. ` +
        `Die korrigierte Fassung soll so nah wie möglich am Original und auf Niveau ${level} bleiben. ` +
        `Bewerte, ob die Inhaltspunkte der Aufgabe erfüllt sind.`,
      messages: [{ role: 'user', content: `AUFGABE:\n${task}\n\nTEXT DER LERNENDEN:\n${text}` }],
    }),
  });
  if (!r.ok) throw new Error(`claude-${r.status}: ${await r.text()}`);
  const msg = await r.json();
  if (msg.stop_reason === 'refusal') throw new Error('refusal');
  const block = msg.content.find(b => b.type === 'text');
  return JSON.parse(block.text);
}
```

**Pedagojik tasarım:** Düzeltmeyi hemen gösterme. Önce hataların **yeri ve kategorisi** gösterilir ("2. cümlede kelime sırası hatası var"), kullanıcı kendisi düzeltmeyi dener, sonra çözüm açılır. Bu "self-repair" adımı öğrenmeyi belirgin biçimde artırır. Tekrarlayan hata kategorileri istatistiğe yazılır ve ilgili gramer ünitesi tekrar önerilir.

### 5.5 L3: Model metin ve öz-kontrol (her zaman)

- Her serbest/yarı serbest görevin **1–2 model cevabı** olur (biri minimal, biri biraz zengin; ikisi de seviyeye uygun). Kullanıcı kendi metnini gönderdikten sonra açılır; yan yana gösterilir.
- **Öz-kontrol listesi** (gönder butonundan önce zorunlu tik kutuları):
  - ☐ Hitap ve kapanış var mı? (*Liebe/Lieber …, Viele Grüße*)
  - ☐ 3 içerik noktasının hepsine değindim mi?
  - ☐ Her cümlede fiil 2. sırada mı?
  - ☐ *weil/dass* sonrası fiil sonda mı?
  - ☐ Bütün isimler büyük harfle mi?
  - ☐ du/Sie karışmadı mı?
  - ☐ ~30 kelime oldu mu?
- **Goethe değerlendirme ölçütleri** sadeleştirilmiş haliyle (görev yerine getirme, iletişimsel tasarım, biçimsel doğruluk) öz-puanlama için gösterilir.

### 5.6 Yazma: form ve e-posta görev şablonu (veri)

```json
{
  "id": "a1-schreiben-email-07",
  "type": "email",
  "level": "A1",
  "situation_tr": "Arkadaşın Maria'yı doğum günü partine davet et.",
  "situation_de": "Sie möchten Ihre Freundin Maria zu Ihrer Geburtstagsparty einladen.",
  "points": [
    {"de": "Wann ist die Party?", "check": "(\\bam\\b|\\bum\\b|uhr|samstag|sonntag|freitag|\\d{1,2}\\.)"},
    {"de": "Wo ist die Party?",   "check": "(\\bin\\b|\\bbei\\b|zu hause|adresse|straße)"},
    {"de": "Was soll Maria mitbringen?", "check": "(mitbringen|bring|bitte .* mit)"}
  ],
  "register": "du",
  "words": [25, 40],
  "models": ["Liebe Maria, am Samstag habe ich Geburtstag ..."]
}
```

---

## 6. Alıştırma tipleri ve teknoloji tablosu

| Beceri | Alıştırma | Temel teknoloji | Yedek (fallback) | Ağ? |
|---|---|---|---|---|
| Hören | Dinle-seç (resim/kelime) | `<audio>` + önceden üretilmiş MP3 | `speechSynthesis` | Hayır |
| Hören | Minimal pair (AX/ABX) | MP3 | `speechSynthesis` (önerilmez) | Hayır |
| Hören | Diktat (boşluklu / tam) | MP3 + `alignWords` | `speechSynthesis` | Hayır |
| Hören | Sayı/saat/fiyat dikte | Rakam ses parçaları birleştirme ya da `speechSynthesis` | — | Hayır* |
| Hören | Diyalog anlama (R/F, MC) | MP3 + karaoke JSON | — | Hayır |
| Hören | Hız/tekrar oynatıcı | `playbackRate`, `preservesPitch` | — | Hayır |
| Sprechen | Nachsprechen | MediaRecorder + Web Speech STT + `alignWords` | Kayıt + öz-değerlendirme | STT: Evet (local hariç) |
| Sprechen | Minimal pair üretimi | STT `maxAlternatives` | Kayıt + A/B | Evet |
| Sprechen | Shadowing | MP3 + MediaRecorder (+ kulaklık) | — | Hayır |
| Sprechen | Ses görselleştirme | Web Audio `AnalyserNode`, YIN pitch | — | Hayır |
| Sprechen | Soru-cevap (kalıp) | STT + regex kalıpları | Kayıt + model cevap | Evet |
| Sprechen | Goethe Sprechen simülasyonu | MP3 partner + zamanlayıcı + kayıt (+ STT anahtar kelime) | Kayıt + model cevap | Opsiyonel |
| Sprechen | Offline STT | transformers.js Whisper (WebGPU/WASM) | Web Speech | İlk indirme |
| Sprechen | Serbest sohbet (opsiyonel) | STT + Claude API + TTS | — | Evet |
| Lesen | Graded reader | Statik JSON + DOM | — | Hayır |
| Lesen | Pop-up sözlük + karta ekle | `lexicon.json` + IndexedDB (SRS) | — | Hayır |
| Lesen | Read-along | MP3 + zaman damgası | — | Hayır |
| Lesen | R/F, MC, eşleştirme, sıralama | JS bileşenleri | — | Hayır |
| Schreiben | Kopyala / boşluk / sıralama / dönüştürme | Kabul listesi + tolerans (§7) | — | Hayır |
| Schreiben | Form doldurma | Alan bazlı doğrulama | — | Hayır |
| Schreiben | E-posta / serbest | L0 kurallar + L3 model metin | L1 LanguageTool, L2 Claude | L1/L2: Evet |
| Schreiben | Yazım denetimi | `nspell` + de_DE Hunspell (opsiyonel) | Sözlük kontrolü | Hayır |
| Hepsi | Ä/ß giriş | Ekran butonları + normalizasyon | — | Hayır |

\* Rakam parçaları önceden üretilirse offline çalışır.

---

## 7. Klavye ve cevap toleransı

### 7.1 Özel karakter girişi

- **Türk klavyesi avantajı:** `ü Ü ö Ö` zaten var. Eksik olanlar: `ä Ä ß` (ve ileride `„ “`).
- **Ekran butonları:** Input'un altında `ä ö ü ß` (Shift ile `Ä Ö Ü`). Butonlar `mousedown`'da `preventDefault` yapar ki odak inputtan çıkmasın; imleç konumuna ekleme yapılır.
- **Kısayollar:** `Alt+a → ä`, `Alt+s → ß` (bazı sistemlerde çakışabilir; ayarlanabilir). Mobilde uzun basma zaten çalışır.
- **Tetikleyici dönüşüm (opsiyonel):** `a:` → `ä`, `s:` → `ß` gibi; yazarken anında çevrilir.

```js
export function attachUmlautBar(input, bar) {
  bar.addEventListener('mousedown', e => {
    const ch = e.target.dataset?.ch; if (!ch) return;
    e.preventDefault();
    const s = input.selectionStart, en = input.selectionEnd;
    input.setRangeText(ch, s, en, 'end');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
}
```

### 7.2 Türkçe'ye özgü tuzaklar

- **`toLocaleLowerCase('tr')` KULLANMA.** `"IST".toLocaleLowerCase('tr')` → `"ıst"` olur. Tüm karşılaştırmalarda `toLowerCase()` ya da `toLocaleLowerCase('de')`.
- Kullanıcı Türk klavyesinde **`ı` (noktasız) yazabilir**: *bıtte*, *Kınd*. Normalizasyonda `ı→i` ve `İ→I` yapılır, cevap "doğru, ama i yerine ı yazdın" uyarısıyla kabul edilir.
- `ş, ğ, ç` Almanca'da yoktur; bunlar görülürse yazım hatası sayılır ama özel ipucu verilir (`ş → sch`, `ç → tsch`). Bu, Türk öğrencinin fonetik yazım alışkanlığını yakalar: *şön → schön*.
- `z` ↔ `s`, `v` ↔ `w` karışıklıkları tipik yazım hatalarıdır. Özel mesaj verilir.

### 7.3 Cevap değerlendirme sınıfları

Her cevap şu sınıflardan birine düşer. SRS'e giden not buna göre belirlenir:

| Sınıf | Örnek (hedef: *die Straße*) | Sonuç | SRS notu |
|---|---|---|---|
| **Tam doğru** | `die Straße` | ✔ | Normal |
| **Biçimsel tolerans** | `die strasse`, `Die Straße.`, `die  Straße` | ✔ + bilgi notu ("ß kullan", "isim büyük harfle") | Normal (ya da bir kademe düşük; ayarlanabilir) |
| **Transliterasyon** | `die Strasse`, `Mueller`/`Müller`, `schoen` | ✔ + uyarı "ä/ö/ü/ß yaz" | Normal. Ama Umlaut **anlam farkı yaratıyorsa** (*schon/schön*, *zahlen/zählen*, *Bruder/Brüder*) ✘ |
| **Küçük yazım hatası** | `die Strase` (Levenshtein 1, kelime ≥5 harf) | ~ "neredeyse" | Zor (tekrar sık) |
| **Artikel eksik** | `Straße` (kart isim + artikel istiyorsa) | ~ Yarım puan | Zor. Artikel öğrenimi kritik olduğu için tam doğru sayılmaz. |
| **Artikel yanlış** | `der Straße` | ✘ "isim doğru, cinsiyet yanlış" | Yanlış. Artikel-renk ipucu gösterilir. |
| **Yanlış** | diğer | ✘ + doğru cevap + diff | Yanlış |

Kurallar:
- Büyük/küçük harf: Kelime kartlarında tolere edilir ve bildirilir. **Yazma görevlerinde** isim büyük harfi kontrol hedefidir (L0).
- Noktalama ve fazla boşluk her zaman yok sayılır (dikte hariç: dikte modunda virgül hatası bilgi notu olarak verilir).
- **Kabul listesi:** Her öğe birden fazla doğru cevap barındırabilir (`["Ich gehe heute ins Kino.", "Heute gehe ich ins Kino."]`). Kısaltmalar (*z.B.*), sayılar (`3` = `drei`) normalize edilir.
- Kısmi çekim hatası (*ich gehst*) yazım hatası sayılmaz; "çekim hatası" olarak ayrı sınıflanır (dil bilgisi istatistiği).
- Tüm toleranslar `settings.strictness = 'lenient' | 'normal' | 'strict'` ile ayarlanabilir; A1 başında `lenient`.

```js
// lexiconHas(word): küçük harfli kelime sözlükte gerçek bir kelime mi? (lexicon.json'dan)
export function gradeAnswer(input, accepted, { requireArticle = true } = {}) {
  const canon = s => s.trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '');
  const fold = s => canon(s).replace(/ı/g, 'i').replace(/İ/g, 'I').toLowerCase();
  const translit = s => fold(s).replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  const notes = [];
  for (const a of accepted) {
    if (canon(input) === canon(a)) return { grade: 'correct', notes };
    if (fold(input) === fold(a)) return { grade: 'correct', notes: ['Büyük/küçük harfe dikkat'] };
    if (translit(input) === translit(a))                     // "schoen", "Strasse"
      return { grade: 'correct', notes: ['ä/ö/ü/ß karakterlerini kullan'] };
    const stripped = fold(a).replace(/[äöü]/g, m => ({ ä: 'a', ö: 'o', ü: 'u' }[m]));
    if (stripped !== fold(a) && fold(input) === stripped)   // "schon" yazılmış, hedef "schön"
      return { grade: lexiconHas(stripped) ? 'wrong' : 'almost',
               notes: ['Umlaut eksik! (schon ≠ schön, zahlen ≠ zählen)'] };
  }
  const [art, ...rest] = fold(accepted[0]).split(' ');
  if (requireArticle && ['der', 'die', 'das'].includes(art)) {
    if (fold(input) === rest.join(' ')) return { grade: 'partial', notes: ['Artikel eksik: ' + art] };
    const [ia, ...irest] = fold(input).split(' ');
    if (['der', 'die', 'das'].includes(ia) && irest.join(' ') === rest.join(' '))
      return { grade: 'wrong', notes: [`Artikel yanlış: doğru "${art}"`] };
  }
  // yakınlık (Levenshtein ≤1 ve uzunluk ≥5) → 'almost'
  return { grade: 'wrong', notes };
}
```

---

## 8. Gizlilik, offline ve uyumluluk

### 8.1 Veri akışı ve onay

| Özellik | Veri nereye gider? | Varsayılan | Onay metni |
|---|---|---|---|
| Önceden üretilmiş sesler | Hiçbir yere (statik dosya) | Açık | — |
| `speechSynthesis` | Yerel ses: hiçbir yere. "Google"/"Online (Natural)" sesler: metin Google/Microsoft'a gider | Açık (yalnızca dinamik içerik) | Ayarlarda "online sesleri kullan" seçeneği |
| Mikrofon kaydı | Yalnızca cihaz (IndexedDB) | İlk kullanımda tarayıcı izni | "Kayıtların cihazından çıkmaz" |
| Web Speech STT | Chrome: Google; Edge: Microsoft; Safari: Apple (local mod hariç) | **Kapalı**, ilk kullanımda sorulur | "Sesin tanıma için {sağlayıcı}'ya gönderilir" |
| Whisper (offline) | Model indirme dışında hiçbir yere | Kapalı (büyük indirme) | "~150 MB indirilecek" |
| LanguageTool | LanguageTool GmbH (AB) | Kapalı | "Metnin LanguageTool sunucusuna gönderilir" |
| Claude API | Anthropic; kullanıcının kendi anahtarı | Kapalı | "Metnin ve anahtarın yalnızca bu cihazda saklanır; istek Anthropic'e gider" |

Ek önlemler:
- Sayfada **analitik/izleme yok**.
- Content-Security-Policy `<meta>` etiketi: `connect-src` yalnızca etkinleştirilebilir alan adlarına izin verir (`api.languagetool.org`, `api.anthropic.com`, `huggingface.co`, `cdn.jsdelivr.net`).
- Mikrofon yalnızca HTTPS'te ya da `localhost`'ta çalışır. GitHub Pages HTTPS olduğu için sorun yok. `file://` ile açılırsa mikrofon ve SW çalışmaz; bu durum belgelenmeli (`npx serve` ya da Python `http.server` önerisi).

### 8.2 Offline stratejisi

- **Service Worker:** Uygulama kabuğu (HTML/CSS/JS/JSON) *precache*. Ses dosyaları *cache-first* ve ünite bazında. "Bu üniteyi offline indir" butonu. Toplam kota tarayıcıya göre değişir (Safari daha kısıtlı); `navigator.storage.persist()` istenmeli.
- **IndexedDB:** SRS durumu, kullanıcı kartları, kayıtlar (son N), yazma görevleri geçmişi, hata istatistikleri.
- **Offline'da devre dışı kalanlar:** Chrome/Safari STT (local mod hariç), online TTS sesleri, LanguageTool, Claude. UI bunları açıklamayla gri gösterir.

### 8.3 Uyumluluk matrisi (Ekim 2026, çalışma anında doğrulanmalı)

| Özellik | Chrome (masaüstü) | Edge | Safari macOS | iOS (tüm tarayıcılar) | Android Chrome | Firefox |
|---|---|---|---|---|---|---|
| `<audio>` MP3 + `playbackRate` + `preservesPitch` | ✔ | ✔ | ✔ | ✔ (kullanıcı etkileşimiyle başlat) | ✔ | ✔ |
| `speechSynthesis` de-DE | ✔ (Google sesi online) | ✔ (nöral online, yerel yedek) | ✔ (Premium ses indirilebilir) | ✔ (gesture şart) | ✔ (dil paketi gerekir) | ✔ OS'e bağlı; Linux kötü |
| `SpeechRecognition` de-DE | ✔ sunucu; local mod yeni sürümlerde | ✔ sunucu + Almanca local | ✔ `webkit` | ✔ `webkit`, Siri açık olmalı; `continuous` zayıf | ✔ | ✘ |
| `MediaRecorder` (ses) | ✔ webm/opus | ✔ webm/opus | ✔ mp4/aac | ✔ mp4/aac (14.3+) | ✔ webm/opus | ✔ ogg/webm opus |
| Web Audio (görselleştirme, pitch) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| WebGPU (Whisper hızlı) | ✔ | ✔ | ✔ (Safari 26) | ✔ (iOS 26) | ✔ (çoğu cihaz) | Windows ✔, diğerleri kısmi |
| WASM SIMD (Whisper yavaş yol) | ✔ | ✔ | ✔ | ✔ (bellek sınırı dikkat) | ✔ | ✔ |
| Service Worker / Cache / IndexedDB | ✔ | ✔ | ✔ | ✔ (kota daha düşük; 7 gün kullanılmazsa veri silinebilir → PWA olarak ana ekrana ekle) | ✔ | ✔ |

**Önerilen birincil platform:** Masaüstünde **Edge veya Chrome**, mobilde **Android Chrome** ya da **iOS Safari (PWA)**. Firefox kullanıcısı her şeyi kullanabilir; STT için Whisper modülünü açması gerekir.

---

## 9. Önerilen modül yapısı (bu kol için)

```
src/
  core/capabilities.js     – feature detection, ayarlar ekranı rozeti
  audio/player.js          – <audio> oynatıcı, hız, döngü, karaoke
  audio/tts.js             – speechSynthesis yedeği
  audio/recorder.js        – MediaRecorder, sessizlik kırpma, IndexedDB
  audio/visualize.js       – dalga formu / enerji zarfı / YIN pitch
  speech/stt.js            – Web Speech STT sarmalayıcı
  speech/whisper.js        – (opsiyonel, dinamik import)
  speech/compare.js        – normalizeDe, koelner, alignWords, ipucu eşleme
  reading/reader.js        – token render, pop-up sözlük, karta ekle
  writing/rules.js         – L0 kural motoru
  writing/languagetool.js  – L1
  writing/llm.js           – L2 (Claude)
  input/umlaut-bar.js      – ekran klavyesi
  input/grade.js           – cevap tolerans sınıfları
scripts/
  build-audio.(py|mjs)     – Azure/Piper ile MP3 + zaman damgası üretimi
  enrich-text.py           – spaCy ile lemma/POS + elle düzeltme dosyası
content/
  lexicon.json, units/*.json, texts/*.json, minimal-pairs.json, hints-pron.json
audio/                     – <hash>.mp3, <hash>.json
```

---

## 10. Riskler ve açık sorular

1. **STT skorunun yanıltıcılığı:** Kullanıcı yüksek skoru "telaffuzum mükemmel" diye okuyabilir. UI metni: "Makine seni anladı (anlaşılırlık)". Kayıt/karşılaştırma her zaman önerilmeli.
2. **LanguageTool public API CORS ve limit politikası** değişebilir. İlk prototipte test edilmeli; olmazsa self-host seçeneği ayarlarda yer almalı.
3. **edge-tts lisans belirsizliği:** Repo herkese açık olacaksa Azure (resmî) ya da Piper/Thorsten (CC0) tercih edilmeli.
4. **iOS kısıtları:** Otomatik oynatma yasak; her ses zinciri bir dokunuşla başlamalı. `continuous` STT yok. Depolama kotası düşük ve tahliye riski var (PWA kurulumu önerilir).
5. **Ses dosyası hacmi** (~70–100 MB): Repo stratejisi (LFS / ayrı branch / Releases) diğer kollarla birlikte karar verilmeli.
6. **Claude anahtarının tarayıcıda tutulması:** Yalnızca kişisel cihazda kabul edilebilir. Paylaşılan bilgisayarda "oturum boyunca hatırla" seçeneği (sessionStorage) sunulmalı.
7. **Fonem düzeyi telaffuz değerlendirmesi** bu mimaride yok. A2 sonrası ya da modeller küçüldükçe tekrar değerlendirilmeli.
8. **Rakam/saat dikte üretimi:** `speechSynthesis` ile dinamik sayı okutmak cihaz sesine bağlıdır. Rakam parçalarını önceden üretip birleştirmek daha tutarlı ama prozodisi doğal değil. Pratikte 0–100 arası sayılar ve saatler tamamen önceden üretilebilir (~300 dosya).

---

### Kaynaklar (araştırma, Ekim 2026)

- MDN, `SpeechRecognition.processLocally`: https://developer.mozilla.org/docs/Web/API/SpeechRecognition/processLocally
- Chromium "Intent to Ship: On-device Web Speech API": https://groups.google.com/a/chromium.org/g/blink-dev/c/VNOok2dbmHM/m/TQpe9shjCgAJ
- W3C TAG, Web Speech on-device recognition quality review: https://tag-github-bot.w3.org/gh/w3ctag/design-reviews/1189
- Microsoft Edge speech recognition (yerel diller, Almanca dahil): https://learn.microsoft.com/microsoft-edge/web-platform/speech-recognition-api
- LanguageTool public HTTP API ve limitleri: https://dev.languagetool.org/public-http-api, https://help.languagetool.org/hc/en-us/articles/39254488835095
- Tarayıcıda Whisper (transformers.js/WebGPU): https://blog.logrocket.com/how-to-build-a-real-time-voice-ai-agent-in-the-browser, https://offlinetts.com/blog/browser-speech-recognition-whisper-comparison/
- iOS Safari `webkitSpeechRecognition` (14.5+): https://www.assemblyai.com/blog/speech-recognition-javascript-web-speech-api
