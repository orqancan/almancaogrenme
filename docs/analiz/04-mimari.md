# 04 — Yazılım Mimarisi, Veri Modeli ve Algoritmalar

> **Revizyon notu:** Uygulama bilgisayarda `index.html`'e çift tıklanarak (`file://`) açılacak. Bu modda ES modules ve `fetch()` çalışmadığı test edildi; bu yüzden aşağıdaki **ES modules, JSON fetch, PWA/service worker ve GitHub Pages deploy** kararları geçersizdir: kod klasik `<script src>` + global ad alanıyla, içerik `.js` sarmalı dosyalarla yüklenir. Veri modeli, FSRS, cevap kontrolü ve alıştırma registry'si aynen geçerlidir. Bağlayıcı kararlar: [00-ANA-PLAN.md §3.1](../00-ANA-PLAN.md).

> Kapsam: Türkçe ana dilli bir öğrencinin Almancayı sıfırdan A1→A2'ye **öğretmensiz** öğrenmesini sağlayacak, backend'siz, statik, GitHub Pages'te yayınlanan, telefona kurulabilen (PWA) bir web uygulamasının teknik tasarımı.
> Bu doküman diğer kolların (pedagoji, müfredat, beceriler/ses, alıştırma/değerlendirme, UX/motivasyon) ihtiyaçlarını taşıyacak **motoru** tanımlar. İçerik (ne öğretileceği) burada değil; içeriğin **hangi biçimde** yazılacağı ve **nasıl işleneceği** burada.

---

## 0. Özet (TL;DR)

| Karar | Seçim | Gerekçe (kısa) |
|---|---|---|
| Dil / yığın | **Saf HTML + CSS + vanilla JS (ES modules), build yok** | Tek kişi, uzun ömür, sıfır bağımlılık güncellemesi; tarayıcı doğrudan çalıştırır |
| Tip güvenliği | **JSDoc + `// @ts-check`** (opsiyonel `tsc --noEmit` yalnızca geliştirmede) | TypeScript'in faydası, build'in yükü olmadan |
| UI deseni | Küçük kendi `h()` / `render()` yardımcısı + ekran (view) modülleri, hash router | Framework öğrenme/güncelleme maliyeti yok |
| Kalıcılık | **IndexedDB** (asıl veri) + localStorage (yalnız küçük ayarlar) + `navigator.storage.persist()` | Kart sayısı binlerce, log'lar büyür; IDB asenkron ve kotası geniş |
| Yedek | Otomatik JSON export hatırlatıcısı + manuel indir/yükle; v2'de opsiyonel GitHub Gist senkronu | Tarayıcı verisi silinebilir → tek gerçek güvence dışa yedek |
| SRS | **FSRS-5** (ts-fsrs'in ESM dosyası `js/vendor/`'a kopyalanır **veya** ~150 satırlık kendi implementasyonu) | Anki'nin modern algoritması, SM-2'den daha az tekrarla aynı hatırlama |
| İçerik | Ünite başına JSON dosyaları + global sözlük (lexicon) dosyası, Node ile şema doğrulama | İçerik ↔ motor ayrımı; içerik yazarken hata erken yakalanır |
| Alıştırmalar | Eklenti tarzı **exercise registry** (`render / check / feedback`) | Yeni tip eklemek = 1 dosya + 1 satır kayıt |
| Ses | Önceden üretilmiş MP3/Opus (TTS veya kayıt) + yedek olarak Web Speech API | Offline çalışma ve tutarlı telaffuz |
| Test | `node --test` (sıfır bağımlılık), cevap kontrol & FSRS & planlayıcı saf fonksiyonları | Saf fonksiyon = DOM'suz test |
| Deploy | GitHub Pages (Actions ile: doğrula → test → yayınla) | Ücretsiz, HTTPS (PWA için şart) |

---

## 1. Teknoloji Yığını Değerlendirmesi

### 1.1 Seçenekler

| Kriter | A) Vanilla ES modules | B) Hafif framework via CDN (Preact+htm, Lit, Alpine) | C) Vite + React/Svelte/Vue |
|---|---|---|---|
| Build adımı | Yok | Yok | Var (node_modules, config) |
| 5 yıl sonra açınca çalışır mı? | **Evet** (web platformu geriye uyumlu) | Büyük ihtimalle (sürüm sabitlenirse) | Bağımlılık çürümesi riski yüksek |
| Offline/PWA | Kolay; dosyalar zaten statik | CDN dosyası SW ile cache'lenmeli ya da vendor'lanmalı | Kolay (vite-plugin-pwa) ama sihirli |
| Reaktivite / bileşen konforu | Elle (küçük yardımcıyla yeterli) | İyi | Çok iyi |
| Uygulamanın karmaşıklığı | Orta: ~10 ekran, ~12 alıştırma tipi | – | – |
| Hata ayıklama | Kaynak = çalışan kod | Neredeyse aynı | Source map'e bağlı |
| Öğrenme maliyeti | Sıfır | Düşük | Orta |

### 1.2 Öneri: **A) Vanilla ES modules, build yok**

- Uygulama durumu büyük ölçüde **"bir ekran → bir alıştırma → sonuç"** akışıdır; karmaşık, iç içe reaktif bileşen ağacı yok. Her ekran `mount(root, params)` / `unmount()` olan bir modül olur.
- DOM üretimi için 30 satırlık bir `h(tag, props, ...children)` yardımcısı yeterli. Şablon karmaşıklaşırsa **vendor'lanmış** (CDN değil, repo içine kopyalanmış) `lit-html` (~7 KB) eklenebilir — bu bir "kaçış kapısı", başlangıç kararı değil.
- Üçüncü taraf kod **asla runtime'da CDN'den** yüklenmez; gerekirse `js/vendor/` altına sabit sürümle kopyalanır (offline + kalıcılık).
- Tip güvenliği: dosya başına `// @ts-check` + JSDoc `@typedef`. VS Code bunu ekstra kurulum olmadan kontrol eder. İsteğe bağlı CI'da `npx tsc --noEmit -p jsconfig.json`.
- CSS: tek `base.css` (CSS değişkenleri ile tema, açık/koyu), `components.css`, ekran başına küçük dosya gerekmez. Preprocessor yok; native CSS nesting ve `:has()` yeterli.

**Node.js'in rolü:** yalnızca **geliştirme araçları** (içerik doğrulama, test, ses manifesti üretimi). Yayınlanan site Node'a ihtiyaç duymaz. `package.json` olur ama `dependencies` boş kalır; mümkünse `devDependencies` da boş (doğrulayıcıyı kendimiz yazarız, bkz. §5.6).

### 1.3 Tarayıcı hedefleri

Son 2 sürüm Chrome/Edge/Firefox, **iOS Safari 16.4+** (Web Push ve home-screen PWA iyileştirmeleri), Android Chrome. Kullanılan API'ler: ES modules, IndexedDB, Service Worker, Cache API, `structuredClone`, `Intl`, Web Speech API (opsiyonel), MediaRecorder (v1 telaffuz kaydı için, opsiyonel).

---

## 2. Dizin Yapısı

```
almancaogrenme/
├── index.html                 # tek sayfa; <main id="app">, modül giriş noktası
├── manifest.webmanifest
├── sw.js                      # service worker (kök dizinde olmalı → scope = /)
├── 404.html                   # GH Pages için index'e yönlendirme (hash router'da gereksiz ama zararsız)
├── css/
│   ├── base.css               # değişkenler, tipografi, açık/koyu tema
│   ├── components.css         # buton, kart, ilerleme çubuğu, toast
│   └── exercises.css          # alıştırma tiplerine özel stiller
├── icons/                     # 192, 512, maskable, apple-touch-icon (180)
├── js/
│   ├── main.js                # bootstrap: db aç, migrasyon, router başlat, SW kaydet
│   ├── core/
│   │   ├── db.js              # IndexedDB sarmalayıcı (promise tabanlı, ~120 satır)
│   │   ├── migrations.js      # şema sürüm yükseltmeleri
│   │   ├── store.js           # uygulama durumu + basit pub/sub
│   │   ├── router.js          # hash router (#/today, #/lesson/a1.u01.l02 ...)
│   │   ├── content.js         # içerik yükleyici + indeks (id → nesne), lazy unit yükleme
│   │   ├── srs/
│   │   │   ├── fsrs.js        # FSRS-5 çekirdeği (veya vendor/ts-fsrs sarmalayıcısı)
│   │   │   ├── cards.js       # kart üretimi (lexicon → yönler), sibling ilişkileri
│   │   │   └── queue.js       # günlük kuyruk oluşturma
│   │   ├── planner.js         # "Bugün ne yapmalıyım?"
│   │   ├── progression.js     # ders/ünite kilidi, mastery gating
│   │   ├── weakness.js        # hata etiketleri → zayıf nokta skorları
│   │   ├── answer/
│   │   │   ├── normalize.js   # metin normalizasyonu
│   │   │   ├── compare.js     # Levenshtein, token hizalama
│   │   │   └── diagnose.js    # hata sınıflandırıcı (artikel/kasus/çekim/sıra/yazım)
│   │   ├── audio.js           # ses çalma, önbellek, TTS yedeği
│   │   ├── backup.js          # export/import, otomatik yedek hatırlatma
│   │   ├── clock.js           # "gün" kavramı (gün dönümü 04:00), test için enjekte edilebilir
│   │   └── dom.js             # h(), $, olay yardımcıları
│   ├── exercises/
│   │   ├── registry.js        # tip kaydı
│   │   ├── flashcard.js       # SRS kartı (ön/arka + 4 buton)
│   │   ├── mcq.js             # çoktan seçmeli
│   │   ├── type-answer.js     # yazarak cevap (TR→DE)
│   │   ├── cloze.js           # boşluk doldurma
│   │   ├── article.js         # der/die/das seçimi
│   │   ├── order-words.js     # kelime dizme
│   │   ├── listen-type.js     # dinle → yaz (dikte)
│   │   ├── listen-choose.js   # dinle → seç
│   │   ├── match-pairs.js     # eşleştirme
│   │   ├── conjugate.js       # fiil çekim tablosu
│   │   └── speak.js           # (v1) sesli tekrar / kayıt-karşılaştır
│   ├── views/
│   │   ├── today.js           # ana ekran: günün planı
│   │   ├── path.js            # ünite/ders haritası
│   │   ├── lesson.js          # ders oynatıcı (adım adım)
│   │   ├── review.js          # SRS tekrar oturumu
│   │   ├── grammar.js         # dilbilgisi notları okuyucu
│   │   ├── stats.js           # istatistik, zayıf noktalar
│   │   └── settings.js        # ayarlar, yedekleme
│   └── vendor/                # (opsiyonel) ts-fsrs.mjs, lit-html.js — sürüm adıyla
├── content/
│   ├── manifest.json          # içerik sürümü, ünite listesi, dosya hash'leri
│   ├── lexicon/
│   │   ├── a1.json            # A1 kelime havuzu (tüm kelimeler tek yerde)
│   │   └── a2.json
│   ├── a1/
│   │   ├── unit-01.json       # dersler + cümleler + alıştırmalar + gramer notları
│   │   ├── unit-02.json
│   │   └── ...
│   ├── a2/ ...
│   └── grammar/               # uzun dilbilgisi anlatımları (Markdown benzeri basit format, JSON içinde)
├── audio/
│   ├── w/                     # kelime sesleri: w/tisch.n.mp3
│   ├── s/                     # cümle sesleri: s/a1u01-003.mp3
│   └── audio-manifest.json    # id → dosya, süre, boyut (tools ile üretilir)
├── tools/                     # SADECE geliştirme (Node), yayına dahil edilmez (ya da zararsız)
│   ├── validate-content.mjs   # şema + referans bütünlüğü kontrolü
│   ├── build-audio-manifest.mjs
│   ├── gen-tts.mjs            # (opsiyonel) TTS ile eksik sesleri üret
│   └── stats-content.mjs      # ünite başına kelime/cümle sayıları
├── tests/
│   ├── normalize.test.mjs
│   ├── diagnose.test.mjs
│   ├── fsrs.test.mjs
│   ├── queue.test.mjs
│   ├── planner.test.mjs
│   └── content.test.mjs       # tüm içerik validate-content'ten geçiyor mu
├── docs/
│   ├── analiz/                # bu analiz dokümanları
│   └── icerik-yazim-rehberi.md
├── package.json               # "type": "module", scripts: test, validate, serve
├── jsconfig.json              # checkJs ayarları
└── .github/workflows/pages.yml
```

**Neden `sw.js` kökte?** Service worker yalnızca kendi dizini ve altını kontrol edebilir. GitHub Pages'te proje sitesi `https://<user>.github.io/almancaogrenme/` altında yayınlanır; tüm yollar **göreli** (`./js/main.js`) yazılmalı, mutlak `/js/...` yazılmamalı.

---

## 3. PWA Tasarımı

### 3.1 manifest.webmanifest

```json
{
  "name": "Almanca Öğren — A1→A2",
  "short_name": "Almanca",
  "lang": "tr",
  "start_url": "./#/today",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#101418",
  "theme_color": "#1f6feb",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

`index.html` içinde iOS için ayrıca: `<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">`, `<meta name="apple-mobile-web-app-capable" content="yes">`, `<meta name="theme-color" ...>`.

### 3.2 Önbellek stratejisi

| Kaynak | Strateji | Cache adı |
|---|---|---|
| App shell (HTML, CSS, JS, ikonlar, manifest) | **Precache** (kurulumda), sonra *cache-first*; yeni sürüm SW güncellemesiyle gelir | `shell-v{APP_VERSION}` |
| İçerik JSON'ları (`content/**`) | **Stale-while-revalidate** (önce cache'ten göster, arka planda tazele) | `content-v1` |
| Ses dosyaları (`audio/**`) | **Cache-first**, ihtiyaç anında; ayrıca "Ünite seslerini indir" butonuyla toplu ön-yükleme | `audio-v1` (sürümsüz; dosya adı içerik değişince değişir) |
| Diğer her şey | Network-only | – |

**Sürümleme:** `sw.js` en üstünde `const APP_VERSION = '2026.10.20-1';` ve `PRECACHE = [...]` listesi. Liste elle tutulur (az dosya) veya `tools/` altında küçük bir script ile üretilir — bu "build" değil, opsiyonel bir yardımcı. Yanlış yol precache'i kırar → CI'da `tools/check-precache.mjs` her yolun var olduğunu kontrol eder.

**Güncelleme akışı:** yeni SW `installed` olunca uygulama alt kısımda "Yeni sürüm hazır — Yenile" toast'u gösterir; kullanıcı onaylayınca `postMessage({type:'SKIP_WAITING'})` → `controllerchange` → `location.reload()`. Ders ortasında zorla yenileme **yapılmaz**.

### 3.3 sw.js iskeleti

```js
// sw.js
const APP_VERSION = '2026.10.20-1';
const SHELL = `shell-${APP_VERSION}`;
const CONTENT = 'content-v1';
const AUDIO = 'audio-v1';
const PRECACHE = [
  './', './index.html', './manifest.webmanifest',
  './css/base.css', './css/components.css', './css/exercises.css',
  './js/main.js', /* ... tüm js modülleri ... */
  './content/manifest.json', './content/lexicon/a1.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(PRECACHE)));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = new Set([SHELL, CONTENT, AUDIO]);
    for (const k of await caches.keys()) if (!keep.has(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => { if (e.data?.type === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.includes('/audio/'))   return e.respondWith(cacheFirst(e.request, AUDIO));
  if (url.pathname.includes('/content/')) return e.respondWith(staleWhileRevalidate(e, CONTENT));
  e.respondWith(cacheFirst(e.request, SHELL, /*fallbackToIndex*/ e.request.mode === 'navigate'));
});

async function cacheFirst(req, cacheName, navFallback = false) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok && res.status === 200) cache.put(req, res.clone());
    return res;
  } catch (err) {
    if (navFallback) return (await caches.match('./index.html'));
    throw err;
  }
}

async function staleWhileRevalidate(event, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(event.request);
  const net = fetch(event.request).then(res => { if (res.ok) cache.put(event.request, res.clone()); return res; });
  if (hit) { event.waitUntil(net.catch(() => {})); return hit; }
  return net;
}
```

### 3.4 Ses dosyaları ve iOS özel durumları

- **Range request sorunu:** iOS Safari `<audio>` için `Range: bytes=0-1` isteği atar; cache'ten dönen tam 200 yanıtı bazen çalmaz. Çözüm: sesleri `<audio src>` yerine **`fetch` → `arrayBuffer` → `AudioContext.decodeAudioData`** ile çalmak (Web Audio API). Kısa klipler (<10 sn) için ideal, gecikme de düşük. `audio.js` bu yolu kullanır; `HTMLAudioElement` yalnızca yedek.
- **Autoplay:** ilk ses kullanıcı dokunuşuyla başlatılmalı; `AudioContext` ilk dokunuşta `resume()` edilir.
- **Boyut bütçesi:** A1+A2 ≈ 1.500 kelime + 2.500 cümle. Mono 32–48 kbps Opus/MP3 ile kelime ~8 KB, cümle ~25 KB → toplam ≈ **75 MB**. Bu yüzden sesler ünite ünite indirilir; ayarlarda "Önbellekteki sesler: 23 MB — Temizle" gösterilir. iOS'ta Opus desteği eskidir; **MP3 (veya AAC/m4a)** güvenli seçimdir.
- **TTS yedeği:** ses dosyası yoksa `speechSynthesis` ile `lang='de-DE'` sesi; kaliteli bir Almanca ses yoksa (bazı Android'lerde) butonu gri göster. TTS **asla birincil** kaynak olmamalı (cihazdan cihaza telaffuz farkı).
- Ses üretimi (dosya kaynakları, hız varyantları vb.) kararı "Beceriler/Ses" kolunundur; mimari sadece `audioId → dosya` eşlemesini ve `slow` varyantı için alan ayırır (`audio/s/a1u01-003.slow.mp3`).

### 3.5 Kurulum (telefon)

- **Android/Chrome:** `beforeinstallprompt` yakalanır, Ayarlar'da "Uygulamayı yükle" butonu gösterilir.
- **iOS/Safari:** programatik istem yok. `navigator.standalone === false` ve iOS ise tek seferlik rehber kartı: "Paylaş → Ana Ekrana Ekle". **Bu önemli:** iOS, ana ekrana eklenmemiş sitelerin script-yazılabilir verisini (IndexedDB dahil) **7 gün kullanılmazsa silebilir** (ITP). Ana ekrana eklenen PWA bu kuraldan muaftır. Bu yüzden iOS'ta kurulum güçlü biçimde önerilir ve yedekleme hatırlatıcısı daha sık çalışır.

---

## 4. Kalıcılık (Persistence)

### 4.1 localStorage vs IndexedDB

| | localStorage | IndexedDB |
|---|---|---|
| API | Senkron, sadece string | Asenkron, yapılandırılmış veri, indeksler |
| Kota | ~5 MB | Disk alanının önemli bir kısmı |
| Sorgu | Yok | İndeks ile (`due` tarihine göre kart çekme) |
| Transaction | Yok | Var (ders bitişinde kart + log + ilerleme tek atomik yazım) |

**Karar:** Tüm öğrenme verisi **IndexedDB**'de. localStorage yalnızca: tema, son açılan sekme, "iOS kurulum rehberini gördü" gibi kaybı önemsiz bayraklar. Bağımlılık yok; ~120 satırlık kendi `db.js` sarmalayıcımız (idb-keyval benzeri) yeterli.

Açılışta: `await navigator.storage.persist()` istenir (Chrome kurulu PWA'da genelde otomatik verir; Firefox sorar). Sonuç Ayarlar'da gösterilir: "Kalıcı depolama: ✔ / ✘".

### 4.2 Veritabanı şeması (`almanca-db`, sürüm 1)

| Store | keyPath | İndeksler | İçerik |
|---|---|---|---|
| `meta` | `key` | – | `schemaVersion`, `installId`, `createdAt`, `lastBackupAt`, `contentVersionSeen`, `settings` |
| `cards` | `id` | `due`, `noteId`, `state`, `unitId` | SRS kart durumu |
| `reviewLog` | `++autoIncrement` | `cardId`, `ts`, `day` | her tekrar cevabı (FSRS optimizasyonu ve istatistik için) |
| `lessonProgress` | `lessonId` | `status` | ders durumu, en iyi skor, tamamlanma |
| `exerciseLog` | `++autoIncrement` | `ts`, `lessonId`, `day` | ders içi alıştırma denemeleri (doğru/yanlış, hata etiketleri) |
| `errors` | `++autoIncrement` | `tag`, `ts`, `itemId` | hata günlüğü (zayıf nokta analizi) |
| `sessions` | `id` (ISO tarih+sıra) | `day` | oturum özeti: süre, yapılan, XP, seri (streak) |
| `skills` | `tag` | – | zayıf nokta skorları (türetilmiş, yeniden hesaplanabilir önbellek) |

**Tasarım ilkesi:** *Olay günlükleri (reviewLog, exerciseLog, errors) asıl kaynak; `cards`, `skills`, `lessonProgress` bunlardan türetilebilir.* Böylece algoritma değişirse (örn. FSRS parametreleri) kart durumları log'dan yeniden hesaplanabilir (`replay`).

#### Kayıt örnekleri

```json
// cards
{
  "id": "w.tisch.n#de-tr",
  "noteId": "w.tisch.n",            // kardeş kartlar aynı noteId'yi paylaşır
  "dir": "de-tr",                   // de-tr | tr-de | listen | cloze | article
  "unitId": "a1.u03",
  "state": 2,                       // 0 New, 1 Learning, 2 Review, 3 Relearning
  "due": 1761091200000,             // epoch ms
  "stability": 4.21,
  "difficulty": 5.6,
  "reps": 3,
  "lapses": 0,
  "learningStep": 0,
  "lastReview": 1760745600000,
  "suspended": false,
  "buriedUntilDay": null            // "2026-10-21" gibi
}

// reviewLog
{ "cardId": "w.tisch.n#de-tr", "ts": 1760745600000, "day": "2026-10-18",
  "rating": 3, "elapsedDays": 2.0, "scheduledDays": 2, "stateBefore": 2,
  "durationMs": 4100, "source": "review" }   // source: review | lesson | weak-drill

// errors
{ "ts": 1760745612000, "day": "2026-10-18", "itemId": "s.a1u03.012",
  "exerciseType": "type-answer", "tags": ["article", "case.akk"],
  "expected": "Ich habe einen Tisch.", "given": "Ich habe ein Tisch.",
  "grammarRefs": ["g.akkusativ-artikel"] }

// lessonProgress
{ "lessonId": "a1.u03.l02", "status": "mastered",   // locked|available|in_progress|completed|mastered
  "bestScore": 0.92, "attempts": 2, "completedAt": 1760745700000,
  "stepIndex": 0, "introducedNotes": ["w.tisch.n", "w.stuhl.m"] }

// meta.settings
{ "newCardsPerDay": 10, "maxReviewsPerDay": 150, "desiredRetention": 0.9,
  "dayStartsAtHour": 4, "dailyGoalMinutes": 20, "typingStrictness": "normal",
  "audioAutoplay": true, "fsrsWeights": null }
```

### 4.3 Migrasyon

`migrations.js` bir dizi `{ version, up(tx) }`. `indexedDB.open('almanca-db', LATEST)` → `onupgradeneeded` içinde `oldVersion+1 … newVersion` sırayla uygulanır. Kural: **asla veri silen migrasyon yazma**; alan yeniden adlandırmada önce kopyala, sonra eskisini bırak. Migrasyon öncesi otomatik "pre-migration" yedeği `meta` dışında bir JSON olarak indirilmez (kullanıcıyı rahatsız etmemek için) ama IDB'de `backups` store'una (son 3 adet) yazılır.

### 4.4 İçerik değişince kullanıcı verisi ne olur?

- Kartlar içeriğe **ID ile** bağlıdır. İçerikte bir kelime silinirse kart `orphan` olur → kuyruk oluşturucu atlar, Ayarlar'da "12 yetim kart" bilgisi; silinmez.
- Kelimenin metni düzeltilirse (yazım hatası) ID aynı kalır, ilerleme korunur.
- Anlamı değişen içerik için **yeni ID** verilir (bkz. §5.1).

### 4.5 Yedekleme ve veri kaybı stratejisi

Riskler: tarayıcı verisini temizleme, iOS 7-gün kuralı, telefon değişimi, tarayıcı profil bozulması, kendi kodumuzdaki bir migrasyon hatası.

**Katmanlı strateji:**

1. **Kalıcı depolama izni** (`storage.persist()`).
2. **IDB içi anlık görüntüler:** her gün ilk açılışta `backups` store'una sıkıştırılmamış JSON snapshot (son 7 gün tutulur). Kod hatasına karşı koruma (cihaz kaybına değil).
3. **Dosyaya export:** `almanca-yedek-2026-10-20.json`. Tetikleyiciler: Ayarlar butonu; son yedekten 7 gün geçtiyse "Bugün ne yapmalıyım" ekranında nazik kart ("Son yedek 9 gün önce — 1 dokunuşla yedekle"). Mobilde `navigator.share({ files: [...] })` ile doğrudan Drive/WhatsApp/e-posta'ya gönderme; desteklenmezse `<a download>`.
4. **Import:** dosya seç → şema sürümü kontrolü → **önizleme** ("Bu yedek 2026-10-12 tarihli, 812 kart, 34 ders; mevcut veri 2026-10-20 tarihli, 830 kart. Değiştir / Birleştir / İptal").
5. **(v2) GitHub Gist senkronu:** kullanıcı kendi *fine-grained PAT*'ını (yalnız `gist` yetkisi) girer; token localStorage'da değil IDB `meta`'da saklanır, export dosyasına **dahil edilmez**. Senkron = "son oturum sonunda gizli gist'e yedek dosyasını PATCH et" + "açılışta uzaktaki `exportedAt` daha yeniyse birleştirmeyi öner". Gerçek zamanlı senkron yok.

**Export formatı:**

```json
{
  "format": "almanca-backup",
  "formatVersion": 1,
  "schemaVersion": 1,
  "appVersion": "2026.10.20-1",
  "contentVersion": "a1-2026.10.15",
  "exportedAt": "2026-10-20T18:32:00Z",
  "installId": "b7e1c2…",
  "data": {
    "meta": [...], "cards": [...], "reviewLog": [...], "lessonProgress": [...],
    "exerciseLog": [...], "errors": [...], "sessions": [...]
  },
  "checksum": "sha256:…"            // data'nın SHA-256'sı (crypto.subtle) — bozuk dosyayı yakalar
}
```

**Birleştirme (merge) kuralları** (iki cihaz/yedek arasında):
- Log store'ları (`reviewLog`, `exerciseLog`, `errors`, `sessions`): `(ts, cardId/itemId)` anahtarıyla **birleşim** (duplicate'ler atılır).
- `cards`: log birleşiminden sonra **replay** ile yeniden hesaplanır (en güvenilir yöntem) — ya da basit mod: `lastReview` daha yeni olan kazanır.
- `lessonProgress`: alan bazında maksimum (`status` sıralaması, `bestScore` max).

---

## 5. İçerik Formatı

### 5.1 ID stratejisi

İlkeler: **insan tarafından okunabilir, kararlı, global olarak benzersiz, anlam değişince değişen.**

| Varlık | Desen | Örnek |
|---|---|---|
| Seviye | `a1`, `a2` | `a1` |
| Ünite | `{seviye}.u{NN}` | `a1.u03` |
| Ders | `{ünite}.l{NN}` | `a1.u03.l02` |
| Kelime (lexicon notu) | `w.{lemma-slug}.{pos}[.{n}]` | `w.tisch.n`, `w.bank.n.2` (banka), `w.gehen.v` |
| Cümle | `s.{seviye}u{NN}.{NNN}` | `s.a1u03.012` |
| Alıştırma (elle yazılmış) | `x.{ders}.{NN}` | `x.a1.u03.l02.05` |
| Dilbilgisi notu | `g.{slug}` | `g.akkusativ-artikel` |
| Kart | `{noteId}#{yön}` | `w.tisch.n#tr-de`, `s.a1u03.012#cloze.2` |
| Hata etiketi | noktalı hiyerarşi | `article`, `case.akk`, `verb.conj.pers`, `word_order.v2` |
| Ses | not ID'sinden türetilir | `audio/w/tisch.n.mp3`, `audio/s/a1u03-012.mp3` |

Slug kuralı: küçük harf, `ä→ae ö→oe ü→ue ß→ss`, boşluk → `-`. POS kısaltmaları: `n` (isim), `v` (fiil), `adj`, `adv`, `prep`, `pron`, `conj`, `num`, `phr` (kalıp ifade), `part`.

**Kural:** yayınlanmış bir ID asla başka bir şey için yeniden kullanılmaz. Silinen ID'ler `content/retired-ids.json`'a eklenir; doğrulayıcı bunların yeniden kullanılmasını engeller.

### 5.2 Lexicon (sözlük) girdisi — `content/lexicon/a1.json`

Kelimeler ünitelerden **ayrı** tek bir havuzda tutulur; üniteler onlara ID ile başvurur. Böylece bir kelime birden fazla ünitede geçebilir ama tek bir SRS notu olur.

```json
{
  "$schema": "../../tools/schemas/lexicon.schema.json",
  "level": "a1",
  "entries": [
    {
      "id": "w.tisch.n",
      "pos": "n",
      "de": "Tisch",
      "gender": "m",
      "plural": "Tische",
      "tr": ["masa"],
      "trNote": null,
      "introducedIn": "a1.u03.l02",
      "audio": "w/tisch.n",
      "example": "s.a1u03.004",
      "tags": ["mobilya", "ev"],
      "freqRank": 812,
      "falseFriendTr": null,
      "cards": ["de-tr", "tr-de", "article", "listen"]
    },
    {
      "id": "w.gehen.v",
      "pos": "v",
      "de": "gehen",
      "tr": ["gitmek", "yürümek"],
      "verb": {
        "aux": "sein",
        "partizip2": "gegangen",
        "praesens": { "ich": "gehe", "du": "gehst", "er": "geht", "wir": "gehen", "ihr": "geht", "sie": "gehen" },
        "praeteritum": { "ich": "ging", "er": "ging" },
        "separable": false, "irregular": true
      },
      "introducedIn": "a1.u02.l03",
      "audio": "w/gehen.v",
      "cards": ["de-tr", "tr-de", "conj"]
    },
    {
      "id": "w.wie-geht-es-ihnen.phr",
      "pos": "phr",
      "de": "Wie geht es Ihnen?",
      "tr": ["Nasılsınız?"],
      "register": "formal",
      "introducedIn": "a1.u01.l01",
      "audio": "w/wie-geht-es-ihnen.phr",
      "cards": ["de-tr", "tr-de", "listen"]
    }
  ]
}
```

Notlar:
- `tr` bir **dizi**: TR→DE yönünde ilk eleman gösterilir; DE→TR yazımlı cevapta hepsi kabul edilir.
- `cards`: o not için hangi kart yönlerinin üretileceği. Yoksa POS'a göre varsayılan (isim: `de-tr, tr-de, article`; fiil: `de-tr, tr-de, conj`).

### 5.3 Ünite dosyası — `content/a1/unit-03.json`

```json
{
  "$schema": "../../tools/schemas/unit.schema.json",
  "id": "a1.u03",
  "level": "a1",
  "order": 3,
  "title": { "tr": "Evim", "de": "Meine Wohnung" },
  "canDo": ["Evindeki eşyaları sayabilir", "Bir şeyin olup olmadığını söyleyebilir (haben + Akkusativ)"],
  "requires": ["a1.u02"],
  "grammar": [
    {
      "id": "g.akkusativ-artikel",
      "title": "Akkusativ: einen / eine / ein",
      "body": [
        { "t": "p", "text": "Türkçedeki **belirtme hâli (-ı)** gibi düşün: *Masayı görüyorum.*" },
        { "t": "table", "head": ["", "Nom.", "Akk."],
          "rows": [["m", "ein Tisch", "**einen** Tisch"], ["f", "eine Lampe", "eine Lampe"], ["n", "ein Bett", "ein Bett"]] },
        { "t": "tip", "text": "Sadece **eril** (der) değişir!" }
      ],
      "errorTags": ["case.akk", "article"]
    }
  ],
  "sentences": [
    {
      "id": "s.a1u03.012",
      "de": "Ich habe einen Tisch.",
      "tr": "Bir masam var.",
      "trLiteral": "Ben bir masaya sahibim.",
      "words": ["w.ich.pron", "w.haben.v", "w.ein.art", "w.tisch.n"],
      "tokens": ["Ich", "habe", "einen", "Tisch", "."],
      "annotations": [
        { "token": 2, "tags": ["case.akk", "article"], "note": "Tisch eril → Akk. einen" }
      ],
      "alt": ["Ich hab einen Tisch."],
      "audio": "s/a1u03-012",
      "srs": ["cloze", "listen"]
    }
  ],
  "lessons": [
    {
      "id": "a1.u03.l02",
      "order": 2,
      "title": { "tr": "Ev eşyaları ve Akkusativ" },
      "estMinutes": 12,
      "newWords": ["w.tisch.n", "w.stuhl.m", "w.lampe.n", "w.bett.n"],
      "grammarRefs": ["g.akkusativ-artikel"],
      "steps": [
        { "kind": "intro-words", "words": ["w.tisch.n", "w.stuhl.m", "w.lampe.n", "w.bett.n"] },
        { "kind": "grammar", "ref": "g.akkusativ-artikel" },
        { "kind": "exercise", "id": "x.a1.u03.l02.01" },
        { "kind": "exercise", "id": "x.a1.u03.l02.02" },
        { "kind": "auto", "generator": "article-drill", "from": "newWords", "count": 4 },
        { "kind": "exercise", "id": "x.a1.u03.l02.03" },
        { "kind": "checkpoint", "passScore": 0.8 }
      ],
      "exercises": [
        {
          "id": "x.a1.u03.l02.01",
          "type": "mcq",
          "prompt": { "tr": "Doğru artikeli seç:", "de": "Ich habe ___ Stuhl." },
          "options": ["einen", "eine", "ein"],
          "answer": 0,
          "tags": ["case.akk", "article"],
          "feedback": { "wrong": { "2": "Stuhl **eril** (der Stuhl). Akkusativ'de ein → einen." } },
          "audio": null
        },
        {
          "id": "x.a1.u03.l02.02",
          "type": "type-answer",
          "prompt": { "tr": "Bir masam var." },
          "answers": ["Ich habe einen Tisch."],
          "sentence": "s.a1u03.012",
          "tags": ["case.akk", "verb.conj"],
          "hints": ["haben → ich habe", "der Tisch → einen Tisch"]
        },
        {
          "id": "x.a1.u03.l02.03",
          "type": "order-words",
          "prompt": { "tr": "Bir lambam yok." },
          "tokens": ["Ich", "habe", "keine", "Lampe", "."],
          "distractors": ["keinen"],
          "tags": ["word_order", "negation.kein"]
        }
      ]
    }
  ],
  "unitTest": {
    "passScore": 0.8,
    "draw": [
      { "from": "unit.sentences", "type": "type-answer", "count": 5 },
      { "from": "unit.words", "type": "article", "count": 6 },
      { "from": "unit.sentences", "type": "listen-type", "count": 3 }
    ]
  }
}
```

**Önemli fikir — iki tür alıştırma kaynağı:**
1. **Elle yazılmış** (`exercises[]`): pedagojik olarak özel, özel geri bildirimli.
2. **Üretilmiş** (`{kind:"auto", generator}`): lexicon/cümle verisinden motorun ürettiği (artikel tatbikatı, çeldiricili MCQ, cloze, dikte, çekim). Bu, içerik yazma yükünü büyük ölçüde azaltır: 1 cümle yazmak = otomatik 3–5 alıştırma.

Generator'lar `js/core/generators.js` içinde: `article-drill`, `mcq-meaning` (çeldiriciler aynı POS + aynı ünite/komşu üniteden), `cloze-from-sentence` (annotation'lı token boşluk olur), `dictation`, `conj-drill`, `order-from-sentence`.

### 5.4 Alıştırma tipi şemaları (ortak alanlar)

Her alıştırma: `id`, `type`, `prompt`, `tags[]` (hata etiketleri; yanlışta `errors` store'una yazılır), opsiyonel `audio`, `hints[]`, `feedback`, `grammarRefs[]`. Tip başına ek alanlar:

| type | Ek alanlar | Kontrol |
|---|---|---|
| `mcq` | `options[]`, `answer` (index veya index dizisi) | eşitlik |
| `type-answer` | `answers[]` (kabul edilenler), `sentence?` | normalize + fuzzy + diagnose |
| `cloze` | `text` (`{{0}}` yer tutucular), `blanks: [{answers[], tags[]}]` | boşluk başına |
| `article` | `word` (lexicon id) | gender eşleşmesi |
| `order-words` | `tokens[]`, `distractors[]`, `answers?` (alternatif diziler) | dizi eşitliği; aynı küme farklı sıra → `word_order` |
| `listen-type` | `audio`, `answers[]` | type-answer ile aynı, noktalama esnek |
| `listen-choose` | `audio`, `options[]`, `answer` | eşitlik |
| `match-pairs` | `pairs: [[de, tr], ...]` | çift eşleşme |
| `conjugate` | `verb` (lexicon id), `tense`, `persons[]` | hücre başına; yanlış hücre → `verb.conj.{kişi}` |
| `speak` (v1) | `sentence`, `mode: shadow|record` | öz değerlendirme (kullanıcı kendini puanlar) |
| `read` (v1) | `text`, `questions[]` (mcq alt-alıştırmalar) | alt alıştırmalar |

### 5.5 `content/manifest.json`

```json
{
  "contentVersion": "a1-2026.10.15",
  "levels": [
    { "id": "a1", "lexicon": "lexicon/a1.json",
      "units": [
        { "id": "a1.u01", "file": "a1/unit-01.json", "title": "Merhaba!", "hash": "sha256-…", "audioBytes": 1830000 },
        { "id": "a1.u02", "file": "a1/unit-02.json", "title": "Ben kimim?", "hash": "sha256-…", "audioBytes": 2410000 }
      ] }
  ]
}
```

Uygulama açılışta yalnızca manifest + lexicon'u yükler; ünite JSON'ları **lazy** (ders açılınca, tekrar kuyruğunda o ünitenin cümlesi varsa) yüklenir ve `Map` indeksine eklenir.

### 5.6 İçerik doğrulama scripti (`tools/validate-content.mjs`)

İki katman:

1. **Yapısal (şema):** zorunlu alanlar, tipler, enum'lar (`pos`, `gender`, `type`), ID desenleri (regex). Seçenek: `ajv` devDependency'si **veya** ~100 satırlık kendi mini doğrulayıcımız (şemalar düz JS objesi). Öneri: başlangıçta **kendi mini doğrulayıcı** (bağımlılık sıfır); şemalar büyürse `ajv` + JSON Schema'ya geçiş kolay.
2. **Anlamsal (referans bütünlüğü + dilsel kontroller):**
   - Her ID global benzersiz; `retired-ids.json` ile çakışmıyor.
   - Her referans (`words`, `newWords`, `sentence`, `grammarRefs`, `example`, `requires`) var olan bir ID'ye işaret ediyor.
   - `introducedIn` ile ders `newWords` tutarlı; bir cümle, **kendi dersinden sonra** tanıtılan kelime kullanmıyor (A1 öğrencisine bilinmeyen kelime gösterme) → uyarı.
   - İsimlerde `gender` ve `plural` dolu; fiillerde `praesens` 6 kişi dolu.
   - `mcq.answer` index'i `options` aralığında; `order-words.tokens.join(' ')` normalize edilince `answers[0]` ile eşleşiyor.
   - `tokens` birleşimi `de` ile eşleşiyor.
   - Ses: `audio-manifest.json`'da karşılığı yoksa **uyarı** (hata değil; TTS yedeği var).
   - Etiketler bilinen etiket sözlüğünde (`content/tags.json`) mevcut.

```js
// tools/validate-content.mjs (iskelet)
import { readFile, readdir } from 'node:fs/promises';
import { schemas } from './schemas.mjs';
import { validate } from './mini-validator.mjs';

const errors = [], warnings = [];
const ids = new Map();               // id → dosya
const refs = [];                     // {from, to, file}

function registerId(id, file) {
  if (ids.has(id)) errors.push(`${file}: ID tekrarı ${id} (ilk: ${ids.get(id)})`);
  ids.set(id, file);
}

for (const file of await listJson('content')) {
  const json = JSON.parse(await readFile(file, 'utf8'));
  const kind = file.includes('/lexicon/') ? 'lexicon' : file.endsWith('manifest.json') ? 'manifest' : 'unit';
  for (const e of validate(json, schemas[kind])) errors.push(`${file}: ${e}`);
  collectIdsAndRefs(kind, json, file, registerId, refs);
}
for (const r of refs) if (!ids.has(r.to)) errors.push(`${r.file}: ${r.from} → bilinmeyen ${r.to}`);
checkVocabularyOrder(ids, warnings);          // cümle, henüz öğretilmemiş kelime kullanıyor mu?

warnings.forEach(w => console.warn('UYARI', w));
errors.forEach(e => console.error('HATA ', e));
console.log(`${ids.size} ID, ${errors.length} hata, ${warnings.length} uyarı`);
process.exit(errors.length ? 1 : 0);
```

`package.json`:

```json
{
  "name": "almancaogrenme",
  "private": true,
  "type": "module",
  "scripts": {
    "validate": "node tools/validate-content.mjs",
    "test": "node --test tests/",
    "check": "npm run validate && npm test",
    "serve": "python3 -m http.server 8080"
  }
}
```

---

## 6. SRS Motoru (FSRS)

### 6.1 Neden FSRS, nasıl entegre?

FSRS (Free Spaced Repetition Scheduler), her kart için **Stabilite (S)**, **Zorluk (D)** ve **Hatırlanabilirlik (R)** modelleyen; Anki'nin 23.10+ sürümlerinde yerleşik olan modern algoritma. SM-2'ye göre aynı hedef hatırlama oranı için belirgin şekilde daha az tekrar gerektirir ve "hedef hatırlama oranı" (`desiredRetention`, varsayılan 0.90) tek, anlaşılır bir ayardır.

İki seçenek:

| | **ts-fsrs** (resmi JS/TS implementasyonu) | **Kendi minimal FSRS-5** |
|---|---|---|
| Doğruluk | Referans implementasyon | Formüller kısa; testle doğrulanabilir |
| Entegrasyon | ESM dist dosyası `js/vendor/ts-fsrs.mjs` olarak kopyalanır (CDN'den runtime yükleme **yok**) | `js/core/srs/fsrs.js` (~150 satır) |
| Bakım | Sürüm takibi gerekir; ama sabitlenmiş dosya sonsuza kadar çalışır | Tamamen bizim |

**Öneri:** `fsrs.js` içinde **ince bir adaptör arayüzü** tanımla (`initCard`, `schedule(card, rating, now) → {card, log}`, `retrievability(card, now)`). MVP'de ts-fsrs'in tek-dosya ESM build'ini vendor'la (sürümü dosya adına yaz, ör. `ts-fsrs-5.x.mjs`; kurulumda güncel kararlı sürümü ve ESM dosya yolunu doğrula). Vendor'lama zorluk çıkarırsa aşağıdaki minimal implementasyon aynı arayüzü uygular. Uygulamanın geri kalanı yalnızca adaptörü görür. Testler (§11) her iki implementasyonun aynı girdilerde benzer aralıklar ürettiğini doğrular.

### 6.2 FSRS-5 minimal implementasyon (referans)

```js
// js/core/srs/fsrs.js — FSRS-5 (19 parametre), sadeleştirilmiş
// @ts-check
export const Rating = { Again: 1, Hard: 2, Good: 3, Easy: 4 };
export const State  = { New: 0, Learning: 1, Review: 2, Relearning: 3 };

// FSRS-5 varsayılan ağırlıkları (kurulumda ts-fsrs/fsrs-rs varsayılanlarıyla karşılaştır)
export const W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046,
  1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];

const DECAY = -0.5, FACTOR = 19 / 81;           // R(t=S) = 0.9
const DAY = 86_400_000;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

export const retrievability = (elapsedDays, S) => Math.pow(1 + FACTOR * elapsedDays / S, DECAY);
export const nextInterval = (S, retention = 0.9, maxIvl = 365) =>
  clamp(Math.round(S / FACTOR * (Math.pow(retention, 1 / DECAY) - 1)), 1, maxIvl);

const initS = g => Math.max(W[g - 1], 0.1);
const initD = g => clamp(W[4] - Math.exp(W[5] * (g - 1)) + 1, 1, 10);
function nextD(D, g) {
  const delta = -W[6] * (g - 3);
  const dPrime = D + delta * (10 - D) / 9;                 // doğrusal sönümleme
  return clamp(W[7] * initD(4) + (1 - W[7]) * dPrime, 1, 10); // ortalamaya dönüş
}
function sRecall(D, S, R, g) {
  const hard = g === 2 ? W[15] : 1, easy = g === 4 ? W[16] : 1;
  return S * (1 + Math.exp(W[8]) * (11 - D) * Math.pow(S, -W[9]) * (Math.exp(W[10] * (1 - R)) - 1) * hard * easy);
}
function sForget(D, S, R) {
  const s = W[11] * Math.pow(D, -W[12]) * (Math.pow(S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R));
  return Math.min(s, S);
}
const sShortTerm = (S, g) => S * Math.exp(W[17] * (g - 3 + W[18]));

/** Öğrenme adımları (dakika). Anki benzeri; kısa vadeli tekrar oturum içinde. */
const LEARN_STEPS = [1, 10];      // New/Learning
const RELEARN_STEPS = [10];

/**
 * @param {Card} c  @param {1|2|3|4} g  @param {number} now  @param {{retention:number}} opt
 * @returns {{card: Card, log: object}}
 */
export function schedule(c, g, now, opt = { retention: 0.9 }) {
  const card = { ...c };
  const elapsed = c.lastReview ? (now - c.lastReview) / DAY : 0;
  if (c.state === State.New) {
    card.stability = initS(g); card.difficulty = initD(g);
  } else if (elapsed < 1) {                        // aynı gün içi tekrar → kısa vadeli formül
    card.stability = sShortTerm(c.stability, g); card.difficulty = nextD(c.difficulty, g);
  } else {
    const R = retrievability(elapsed, c.stability);
    card.difficulty = nextD(c.difficulty, g);
    card.stability = g === Rating.Again ? sForget(c.difficulty, c.stability, R)
                                        : sRecall(c.difficulty, c.stability, R, g);
  }
  // durum makinesi
  const inLearning = c.state === State.New || c.state === State.Learning || c.state === State.Relearning;
  const steps = c.state === State.Relearning ? RELEARN_STEPS : LEARN_STEPS;
  if (g === Rating.Again) {
    if (c.state === State.Review) card.lapses++;
    card.state = c.state === State.Review || c.state === State.Relearning ? State.Relearning : State.Learning;
    card.learningStep = 0;
    card.due = now + steps[0] * 60_000;
  } else if (inLearning && g !== Rating.Easy && (c.learningStep ?? 0) + (g === Rating.Good ? 1 : 0) < steps.length) {
    card.learningStep = (c.learningStep ?? 0) + (g === Rating.Good ? 1 : 0);
    card.state = c.state === State.New ? State.Learning : c.state;
    card.due = now + steps[card.learningStep] * 60_000 * (g === Rating.Hard ? 1.5 : 1);
  } else {
    card.state = State.Review; card.learningStep = 0;
    card.due = now + nextInterval(card.stability, opt.retention) * DAY;
  }
  card.reps++; card.lastReview = now;
  return { card, log: { cardId: c.id, ts: now, rating: g, stateBefore: c.state, elapsedDays: elapsed } };
}
```

Not: Gün bazlı `due` hesaplarken "gün dönümü" 04:00 kabul edilir (`clock.js`); `due`'yu o günün başlangıcına yuvarlamak, kartların gün içinde dağınık saatlerde "olgunlaşması" sorununu önler.

### 6.3 Rating'in alıştırma sonucundan türetilmesi

Kullanıcıya her zaman 4 buton göstermek yorucudur ve öz değerlendirme yanlılığı içerir. Karar:

| Kart yönü / tip | Rating nasıl belirlenir |
|---|---|
| `de-tr` (tanıma, çevir-göster) | Klasik flashcard: kullanıcı 4 butondan seçer (Again/Hard/Good/Easy → **"Bilemedim / Zor / Bildim / Çok kolay"**) |
| `tr-de` (yazarak üretim), `listen` (dikte), `cloze`, `article` | **Otomatik:** yanlış → Again; doğru ama ipucu kullanıldı veya küçük yazım hatası (typo/umlaut) → Hard; doğru → Good; doğru ve `duration < hızlıEşik` (ör. kelime 4 sn, cümle 8 sn) ve ilk denemede → Easy. Kullanıcı "Aslında biliyordum (typo)" ile Again'i Hard'a **yükseltebilir** (bir kere). |

### 6.4 Kart yönleri

| Yön | Ön yüz | Beklenen | Kime üretilir | Tanıtım sırası |
|---|---|---|---|---|
| `de-tr` | Almanca kelime + ses | Türkçe anlam (göster/değerlendir) | tüm notlar | 1 (ders günü) |
| `tr-de` | Türkçe | Almanca yazım (isimde artikel dahil: "der Tisch") | tüm notlar | 2 (`de-tr` stabilitesi ≥ 3 gün olunca) |
| `listen` | sadece ses | yazım (dikte) | kelime + seçili cümleler | 3 |
| `cloze.N` | cümle, N. anotasyonlu token boş | eksik kelime | cümleler (`srs` alanı) | ders tamamlanınca |
| `article` | "___ Tisch" | der/die/das | isimler | 1 (ders günü) |
| `conj` | "gehen — du ___" (kişi rastgele) | çekim | fiiller | 2 |

**Kademeli yön açma ("sibling unlock"):** Tüm yönleri aynı gün açmak yeni kart yükünü 4–5 katına çıkarır. Bunun yerine bir notun ikincil yönleri, birincil yön `stability ≥ 3 gün` olunca **sessizce** kuyruğa eklenir (yeni-kart kotasının %30'u bu "kardeş açılımlarına" ayrılır).

### 6.5 Kardeş gömme (sibling burying)

Aynı `noteId`'ye sahip kartlar aynı gün art arda gelirse biri diğerinin cevabını sızdırır (de-tr'yi görmüş biri hemen ardından tr-de'yi kolay yapar → stabilite şişer).

Kurallar:
1. Bir gün içinde bir nottan **en fazla 1 review kartı** kuyruğa girer; diğerleri `buriedUntilDay = yarın` olur (due tarihleri değişmez, sadece bugün gösterilmez).
2. Bir kart cevaplandığında aynı notun bugünkü kuyruktaki **yeni** kartları gömülür.
3. Learning/Relearning adımındaki kartlar gömülmez (oturum içi tekrar zorunlu).
4. Cümle cloze kartları, içinde geçen kelimenin kartı bugün gösterildiyse... **gömülmez** (farklı not; bağlam faydalı), ama kuyrukta aralarına en az 5 kart mesafe konur.

### 6.6 Günlük kuyruk oluşturma algoritması

```
function buildDailyQueue(now, settings, db, content):
    today        = dayKey(now, settings.dayStartsAtHour)      // "2026-10-20"
    endOfToday   = dayEnd(today)

    // 1) Due kartlar
    due = db.cards.index('due').range(≤ endOfToday)
           .filter(c => !c.suspended && c.buriedUntilDay < today && content.has(c.noteId))

    learning  = due.filter(c => c.state ∈ {Learning, Relearning})       // dakika adımlı
    reviews   = due.filter(c => c.state == Review)

    // 2) Review önceliklendirme: en düşük R önce (en çok unutulma riski taşıyan)
    for c in reviews: c._R = retrievability(now - c.lastReview, c.stability)
    reviews.sort(by c._R ascending, then by unit order ascending)

    // 3) Kardeş gömme
    seenNotes = {}
    reviewsKept = []
    for c in reviews:
        if c.noteId in seenNotes: bury(c, today+1); continue
        seenNotes.add(c.noteId); reviewsKept.push(c)

    // 4) Günlük üst sınır ve borç yönetimi
    cap = settings.maxReviewsPerDay
    if len(reviewsKept) > cap:
        overflow = reviewsKept[cap:]        // yarına kalır (due değişmez, sadece bugün gösterilmez)
        reviewsKept = reviewsKept[:cap]

    // 5) Yeni kart kotası — borca göre dinamik
    backlog = len(reviews) (gömmeden önceki toplam)
    newQuota = settings.newCardsPerDay
    if backlog > 1.5 * avgDailyReviews(last 7 days): newQuota = 0            // "borç ödeme günü"
    elif backlog > avgDailyReviews:                  newQuota = floor(newQuota / 2)
    newQuota -= newCardsAlreadyIntroducedToday(today)

    // yeni kartlar DERS üzerinden gelir: ders sırasında intro edilen notların
    // birincil kartları "New" olarak yaratılır; burada sadece kardeş açılımları seçilir
    siblingUnlocks = notesWithPrimaryStable(minStabilityDays = 3)
                      .flatMap(nextLockedDirection)
                      .filter(c => c.noteId ∉ seenNotes)
                      .take(ceil(newQuota * 0.3))

    // 6) Karıştırma (interleaving)
    queue = interleave(
        learning (due ≤ now)  → en başa, zamanı gelenler,
        reviewsKept           → ana gövde,
        siblingUnlocks        → her 5 review'da 1 yeni
    )
    enforceSpacing(queue, sameNoteMinGap = 5, sameExerciseTypeMaxRun = 4)
    return queue

// Oturum sırasında: Again alan kart learning adımına girer ve due = now+1dk;
// oturum döngüsü her cevapta "due ≤ now olan learning kartı var mı?" diye bakıp onu araya sokar.
function nextCard(session):
    l = session.learning.filter(c => c.due ≤ now).minBy(due)
    if l: return l
    if session.queue.notEmpty: return session.queue.shift()
    l = session.learning.minBy(due)        // kuyruk bitti; bekleyen learning varsa
    if l and l.due - now < 5 min: return l // biraz erken göster (Anki "learn ahead")
    return null                             // oturum bitti
```

---

## 7. Ders Akışı Motoru

### 7.1 Ders/ünite durum makinesi

```
locked → available → in_progress → completed → mastered
```

| Geçiş | Koşul |
|---|---|
| `locked → available` | Önceki ders `completed` **ve** (ünitenin ilk dersi ise) `requires` ünitelerinin testi geçilmiş |
| `available → in_progress` | Ders açıldı (adım indeksi kaydedilir; yarıda bırakılabilir) |
| `in_progress → completed` | Tüm adımlar bitti **ve** `checkpoint` skoru ≥ `passScore` (0.8). Altındaysa: yanlış yapılan öğelerden mini tekrar turu → yeniden checkpoint |
| `completed → mastered` | Dersin `newWords` notlarının birincil kartlarının **%80'inin `stability ≥ 7 gün`** olması (yani gerçekten akılda kalıcı) |
| Ünite testi açılır | Ünitedeki tüm dersler `completed` |
| Sonraki ünite açılır | Ünite testi ≥ 0.8 **ve** ünitedeki derslerin ≥ %60'ı `mastered` |

**Neden iki eşik?** "Completed" kısa vadeli anlamayı, "mastered" uzun vadeli tutmayı ölçer. Sonraki üniteyi `mastered`'a bağlamak, öğrencinin tekrar yapmadan yeni ünitelere koşmasını (ve borcun çığ gibi büyümesini) engeller. Bu gating "yumuşak": kullanıcı **"Yine de devam et"** diyebilir (öğretmensiz sistemde katı kilit motivasyonu kırar), ama planlayıcı bunu önermez ve bir uyarı gösterir. Ayrıca her ünite için "**Atlama testi**" (placement): ünite testini geçen, üniteyi `completed` olarak işaretler ve kelimeleri `de-tr` kartı olarak `Review` durumunda, kısa stabiliteyle (S=2) başlatır.

### 7.2 Zayıf nokta tespiti

#### Hata etiketi taksonomisi (`content/tags.json`)

```
article                 # der/die/das yanlış (cinsiyet bilgisi)
article.definite / .indefinite
case.nom / case.akk / case.dat / case.gen(A2)
verb.conj               # şahıs çekimi (ich gehe / du gehst)
verb.conj.pers.{ich,du,er,wir,ihr,sie}
verb.aux                # Perfekt'te haben/sein seçimi (A2)
verb.partizip           # Partizip II biçimi
verb.separable          # ayrılabilen fiil (ich stehe ... auf)
verb.modal              # modal + mastar sonda
word_order.v2           # çekimli fiil 2. pozisyonda
word_order.verb_final   # yan cümle / modal / Perfekt: fiil sonda
word_order.question
negation.nicht / negation.kein
plural
adj.ending (A2)
preposition / preposition.case
spelling.umlaut / spelling.ss / spelling.capitalization   # isimler büyük harf!
vocab                   # kelime bilinmiyor / yanlış kelime
pronoun.possessive / pronoun.personal
```

#### Etiketlerin kaynağı

1. **Statik:** alıştırmanın `tags` alanı (içerik yazarı belirler) — yanlış cevapta tüm etiketler yazılır **ama zayıf ağırlıkla** (0.5).
2. **Dinamik (diagnose):** cevap kontrol motoru yanlışın *türünü* çıkarır → güçlü ağırlık (1.0). Örn. beklenen `einen Tisch`, verilen `ein Tisch` → yalnızca `case.akk` (ve `article`) — `vocab` değil.

#### Skorlama

Her etiket için üstel ağırlıklı hata oranı (son olaylar daha önemli):

```
for each event (attempt) with tag t at time ts, correct ∈ {0,1}, weight w:
    decay = 0.5 ^ ((now - ts) / HALF_LIFE)        // HALF_LIFE = 14 gün
    err[t]   += decay * w * (1 - correct)
    total[t] += decay * w
weakness[t] = (err[t] + 1) / (total[t] + 4)        // Bayes yumuşatma (prior ≈ %25 hata)
isWeak(t)   = total[t] ≥ 3 and weakness[t] ≥ 0.35
```

Doğru cevaplar da etiketli (`tags` alanından) sayılmalıdır, aksi halde oran hesaplanamaz → `exerciseLog` her denemede tags + correct tutar.

`skills` store'u bu skorların önbelleğidir; oturum sonunda artımlı güncellenir, istendiğinde log'dan baştan hesaplanır.

### 7.3 Oturum planlayıcı — "Bugün ne yapmalıyım?"

Girdi: kuyruk durumu, ilerleme, zayıf noktalar, kullanıcının günlük süre hedefi (varsayılan 20 dk), son günlerin performansı.
Çıktı: sıralı **blok listesi** (her blok bir kartta gösterilir, tek "Başla" butonu sırayla hepsini yürütür).

```
function planToday(now, state):
    budget = settings.dailyGoalMinutes * 60           // saniye
    plan = []
    q = buildDailyQueue(now, ...)
    avgSecPerReview = median(last 200 reviews.durationMs) / 1000 ?? 10

    // 0) Yedek hatırlatma / kurulum hatırlatma gibi "meta" kartlar (süre tüketmez)
    if daysSince(meta.lastBackupAt) ≥ 7: plan.push({kind:'backup-nudge'})

    // 1) Öğrenme adımındaki kartlar + gecikmiş tekrarlar HER ZAMAN önce (borç)
    reviewTime = len(q) * avgSecPerReview
    if reviewTime > 0:
        reviewBlock = q.take(min(len(q), floor(budget*0.6 / avgSecPerReview)))  // bütçenin max %60'ı
        plan.push({kind:'review', cards: reviewBlock}); budget -= len(reviewBlock)*avgSecPerReview

    // 2) Zayıf nokta tatbikatı (varsa en zayıf 1-2 etiket)
    weak = topWeakTags(limit=2).filter(isWeak)
    if weak.notEmpty and budget > 120:
        plan.push({kind:'weak-drill', tags: weak, items: pickItemsForTags(weak, n=8, onlyLearned=true),
                   grammarRefs: grammarFor(weak)})      // önce 30 sn'lik kural hatırlatma, sonra 8 alıştırma
        budget -= 8*20

    // 3) Yeni ders — yalnızca borç kontrol altındaysa
    debtOk = len(q) ≤ 1.2 * avgDailyReviews(7) and overdueCount(> 3 gün) < 20
    next = nextAvailableLesson()
    if next and debtOk and budget ≥ next.estMinutes*60*0.7:
        plan.push({kind:'lesson', lessonId: next.id}); budget -= next.estMinutes*60
    elif next and !debtOk:
        plan.push({kind:'info', text:'Bugün yeni ders yok: önce tekrar borcunu eritelim.'})

    // 4) Ünite testi hazırsa
    if unitTestReady(): plan.push({kind:'unit-test', unitId})

    // 5) Bütçe kaldıysa: kalan tekrarlar, sonra beceri pratiği (dinleme/okuma — v1)
    if budget > 60 and q.remaining: plan.push({kind:'review', cards: q.rest})
    elif budget > 180: plan.push({kind:'practice', mode: pickLeastPracticedSkill()}) // listen/read/speak

    return plan
```

Sıralama mantığı: **Tekrar → zayıf nokta → yeni ders**. Gerekçe: unutma eğrisi en pahalı kayıptır; yeni ders "ödül" olarak sona konur (UX kolu bunu motivasyon açısından değerlendirebilir; alternatif olarak tekrar bloğu ikiye bölünüp yeni ders ortaya alınabilir).

Planlayıcı **saf fonksiyon** olarak yazılır (`planToday(now, snapshot) → plan`); DB'den okuma ayrı katmanda. Böylece test edilebilir.

---

## 8. Cevap Kontrol Motoru

Tüm yazılı cevaplar 3 aşamadan geçer: **normalize → karşılaştır → teşhis**.

### 8.1 Normalizasyon

```js
// js/core/answer/normalize.js
export function normalize(s, { keepCase = false, keepPunct = false } = {}) {
  let t = s.normalize('NFC')
    .replace(/[’‘`´]/g, "'").replace(/[“”„]/g, '"')
    .replace(/\s+/g, ' ').trim();
  if (!keepPunct) t = t.replace(/[.,!?;:¿¡"]/g, '').replace(/\s+/g, ' ').trim();
  if (!keepCase) t = t.toLocaleLowerCase('de-DE');
  return t;
}
/** Umlaut alternatif yazımlarını (ae/oe/ue/ss) kanonik biçime çevirir — "yakın doğru" tespiti için */
export const foldUmlauts = t => t.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
```

Kurallar:
- Büyük/küçük harf: varsayılan **yok sayılır** ama Almanca isimler büyük harf olduğu için: cevap doğru fakat isim küçük yazılmışsa → doğru kabul + `spelling.capitalization` uyarısı (rating Good kalır, hata günlüğüne zayıf ağırlıkla yazılır). "Sıkı mod" ayarında Hard.
- Noktalama: yok sayılır.
- `ae/oe/ue/ss` yazımı (telefonda umlaut klavyesi yok): **doğru** kabul, nazik uyarı + ekranda `ä ö ü ß` hızlı-ekleme butonları zaten var.
- Türkçe klavye tuzakları: `ı/i` karışması (Almancada `ı` yok) → `ı → i` otomatik düzeltme.

### 8.2 Karşılaştırma ve sonuç sınıfları

```js
/** @typedef {'correct'|'correct_minor'|'typo'|'wrong'} Verdict */
export function compareAnswer(given, accepted /* string[] */) {
  const g = normalize(given), gf = foldUmlauts(g);
  let best = { verdict: 'wrong', target: accepted[0], dist: Infinity };
  for (const a of accepted) {
    const n = normalize(a);
    if (g === n) return { verdict: 'correct', target: a, dist: 0 };
    if (gf === foldUmlauts(n)) best = pick(best, { verdict: 'correct_minor', target: a, dist: 0, note: 'umlaut' });
    const d = damerauLevenshtein(g, n);
    const tol = n.length <= 4 ? 0 : n.length <= 10 ? 1 : 2;   // kısa kelimede tolerans yok (der/die!)
    if (d <= tol && !criticalTokenChanged(g, n)) best = pick(best, { verdict: 'typo', target: a, dist: d });
  }
  return best;
}
```

**`criticalTokenChanged`:** typo toleransı **asla** artikel/çekim farkını yutmamalı. `ein`→`einen` (1 harf), `die`→`der` (1–2 harf), `gehe`→`gehst` gibi farklar token bazında kontrol edilir: değişen token bir *kapalı sınıf* kelimesi (artikel, zamir, edat) ise veya fiilin çekim eki değişmişse → typo değil, **wrong** + teşhis.

### 8.3 Teşhis (diagnose)

Token hizalama (kelime düzeyinde Levenshtein / LCS) ile beklenen ve verilen cümle karşılaştırılır:

```
function diagnose(expectedTokens, givenTokens, lexicon, sentenceAnnotations):
    tags = []
    if multiset(lower(expected)) == multiset(lower(given)) and expected != given:
        tags.push(isVerbPositionDiff(...) ? 'word_order.v2' / 'word_order.verb_final' : 'word_order')
        return tags
    for (e, g) in align(expectedTokens, givenTokens):
        if e == g: continue
        if e is article/determiner (der/die/das/den/dem/des/ein*/kein*/mein*...):
            if sameLemma(e,g):        // ein vs einen → aynı kök, farklı hâl
                tags.push(caseTagFromAnnotation(e) ?? 'case')    // annotation varsa case.akk
            else: tags.push('article')                           // der vs die → cinsiyet
        elif e is verb form and lemma(e) == lemma(g): tags.push('verb.conj')
        elif foldUmlauts(e) == foldUmlauts(g): tags.push('spelling.umlaut')
        elif lower(e) == lower(g): tags.push('spelling.capitalization')
        elif e == 'nicht' and g startsWith 'kein' or vice versa: tags.push('negation')
        elif g is null (eksik): tags.push(e is verb ? 'word_order.verb_final' : 'missing_word')
        else: tags.push('vocab')
    return unique(tags)
```

Lemma/biçim bilgisi için lexicon'daki `verb.praesens` tabloları ve küçük bir sabit **determiner tablosu** (`der/die/das/den/dem/des/ein/eine/einen/einem/einer/eines/kein…/mein…`) yeterli; genel bir morfoloji analizörü gerekmez (A1–A2 kapsamı dar).

Geri bildirim metni teşhisten üretilir: "Neredeyse! **Tisch eril** (der Tisch). Akkusativ'de **ein → einen**." + ilgili `grammarRef` bağlantısı. Elle yazılmış `feedback` varsa öncelik onda.

---

## 9. Alıştırma Motoru — Exercise Registry

### 9.1 Arayüz

```js
// js/exercises/registry.js
// @ts-check
/**
 * @typedef {Object} ExerciseContext
 * @property {(audioId:string, opts?:{slow?:boolean})=>Promise<void>} play
 * @property {(id:string)=>any} lookup              // içerikte id → nesne
 * @property {{typingStrictness:'lenient'|'normal'|'strict'}} settings
 * @property {AbortSignal} signal                    // ekran kapanınca olay dinleyicilerini temizle
 *
 * @typedef {Object} CheckResult
 * @property {boolean} correct
 * @property {'correct'|'correct_minor'|'typo'|'wrong'} verdict
 * @property {string[]} tags        // hata etiketleri (yanlışta)
 * @property {string=} expected     // gösterilecek doğru cevap
 * @property {any=} detail          // tip-özel (örn. boşluk bazında sonuçlar)
 *
 * @typedef {Object} ExerciseType
 * @property {string} type
 * @property {(ex:any, ctx:ExerciseContext)=>string|null} validate  // içerik doğrulayıcı da kullanır (Node'da çalışır!)
 * @property {(root:HTMLElement, ex:any, ctx:ExerciseContext, api:{submit:(answer:any)=>void, setReady:(b:boolean)=>void})=>void} render
 * @property {(ex:any, answer:any, ctx:ExerciseContext)=>CheckResult} check   // SAF; DOM yok → unit test
 * @property {(root:HTMLElement, ex:any, result:CheckResult, ctx:ExerciseContext)=>void} feedback
 * @property {(result:CheckResult, meta:{durationMs:number, hintsUsed:number, attempts:number})=>1|2|3|4} [toRating]
 * @property {(ex:any)=>{min:number}} [estimate]    // süre tahmini (planlayıcı için)
 */

const types = new Map();
/** @param {ExerciseType} def */
export function register(def) {
  for (const k of ['type', 'render', 'check', 'feedback']) if (!def[k]) throw new Error(`exercise ${def.type}: ${k} eksik`);
  types.set(def.type, def);
}
export const get = t => { const d = types.get(t); if (!d) throw new Error(`Bilinmeyen alıştırma tipi: ${t}`); return d; };
export const all = () => [...types.values()];

export const defaultRating = (r, m) =>
  !r.correct ? 1 : (r.verdict !== 'correct' || m.hintsUsed > 0 || m.attempts > 1) ? 2 : 3;
```

`js/exercises/index.js` tüm tipleri içe aktarıp kaydeder (tek satır/tip). **Kural:** `check` ve `validate` DOM'a dokunmaz ve ayrı bir modülde (`*.logic.js`) yazılabilir ki Node testleri `render`'ı içe aktarmadan çalıştırsın.

### 9.2 Örnek tip — cloze

```js
// js/exercises/cloze.js
import { register } from './registry.js';
import { h } from '../core/dom.js';
import { compareAnswer } from '../core/answer/compare.js';
import { diagnoseToken } from '../core/answer/diagnose.js';

register({
  type: 'cloze',
  validate(ex) {
    const n = (ex.text.match(/\{\{\d+\}\}/g) || []).length;
    return n === ex.blanks.length ? null : `cloze ${ex.id}: ${n} boşluk / ${ex.blanks.length} cevap`;
  },
  render(root, ex, ctx, api) {
    const parts = ex.text.split(/(\{\{\d+\}\})/);
    const inputs = [];
    root.append(h('p', { class: 'cloze' }, ...parts.map(p => {
      const m = p.match(/\{\{(\d+)\}\}/);
      if (!m) return p;
      const inp = h('input', { class: 'blank', autocapitalize: 'off', autocomplete: 'off', spellcheck: false,
                               lang: 'de', size: Math.max(4, ex.blanks[+m[1]].answers[0].length) });
      inputs[+m[1]] = inp; return inp;
    })));
    root.addEventListener('input', () => api.setReady(inputs.every(i => i.value.trim())), { signal: ctx.signal });
    root.addEventListener('keydown', e => { if (e.key === 'Enter') api.submit(inputs.map(i => i.value)); }, { signal: ctx.signal });
    inputs[0]?.focus();
  },
  check(ex, answers) {
    const per = ex.blanks.map((b, i) => ({ ...compareAnswer(answers[i] ?? '', b.answers), blank: i }));
    const wrong = per.filter(p => p.verdict === 'wrong');
    const tags = wrong.flatMap(p => [...ex.blanks[p.blank].tags ?? [], ...diagnoseToken(p.target, answers[p.blank])]);
    const worst = wrong.length ? 'wrong' : per.some(p => p.verdict === 'typo') ? 'typo'
                : per.some(p => p.verdict === 'correct_minor') ? 'correct_minor' : 'correct';
    return { correct: !wrong.length, verdict: worst, tags: [...new Set(tags)],
             expected: ex.blanks.map(b => b.answers[0]).join(' · '), detail: per };
  },
  feedback(root, ex, res) {
    root.querySelectorAll('input.blank').forEach((inp, i) =>
      inp.classList.add(res.detail[i].verdict === 'wrong' ? 'is-wrong' : 'is-right'));
  }
});
```

### 9.3 Ders oynatıcı (lesson runner) akışı

```
runLesson(lessonId):
    lesson = await content.lesson(lessonId)
    progress = db.lessonProgress.get(lessonId) ?? {stepIndex: 0}
    steps = expandSteps(lesson.steps)             // 'auto' generator'lar burada somut alıştırmalara dönüşür (seed = lessonId+attempt → tekrarlanabilir)
    mistakes = []
    for i from progress.stepIndex:
        step = steps[i]
        switch step.kind:
          'intro-words': showWordCards(step.words); createCards(step.words, dirs=['de-tr','article'], state=New) ; mark introduced
          'grammar'    : showGrammar(step.ref)
          'exercise'   : res = await runExercise(step.ex)
                         log(exerciseLog, res); if !res.correct: errors.add(res); mistakes.push(step.ex)
                         // yanlış alıştırma 3 adım sonra tekrar sorulur (dersin içinde)
                         if !res.correct: steps.insert(i+3, {kind:'exercise', ex: step.ex, retry:true})
          'checkpoint' : score = correctFirstTry / total
                         if score < step.passScore: steps.insertAfter(i, remediation(mistakes), {kind:'checkpoint'})
        db.lessonProgress.put({...progress, stepIndex: i+1})   // yarıda kalırsa kaldığı yerden
    markCompleted(lessonId, score)   // tek transaction: lessonProgress + cards + sessions
```

---

## 10. Uygulama Katmanları ve Veri Akışı

```
┌─────────────── views/ (DOM) ────────────────┐
│ today  path  lesson  review  stats  settings │
└──────┬───────────────────────────────┬──────┘
       │ çağırır                         │ abone olur
┌──────▼────────── core/ (saf mantık) ──▼──────┐
│ planner  queue  fsrs  progression  weakness   │  ← Node'da test edilir (DOM yok, IDB yok)
│ answer/*  generators  exercises/*.check        │
└──────┬────────────────────────────────────────┘
       │ okur/yazar (repository fonksiyonları)
┌──────▼──────┐   ┌────────────┐   ┌──────────┐
│ db.js (IDB) │   │ content.js │   │ audio.js │
└─────────────┘   └────────────┘   └──────────┘
```

- **Saat enjeksiyonu:** tüm algoritmalar `now` parametresi alır; `Date.now()` yalnızca view katmanında çağrılır. (Testte "30 gün sonrası" simülasyonu mümkün.)
- **Rastgelelik:** çeldirici seçimi/karıştırma, tohumlu PRNG (`mulberry32(seed)`) ile → tekrar üretilebilir ve test edilebilir.
- **Store:** `store.js` = tek bir durum nesnesi + `subscribe(fn)`; karmaşık state kütüphanesi yok.
- **Router:** `#/today`, `#/path`, `#/lesson/:id`, `#/review`, `#/grammar/:id`, `#/stats`, `#/settings`. Hash router GitHub Pages'te 404 sorunu yaşatmaz.

---

## 11. Test Stratejisi

`node --test` (Node 20+ yerleşik; ek paket yok). Test edilen modüller **saf** olduğundan tarayıcı gerekmez.

| Test dosyası | Kapsam (örnekler) |
|---|---|
| `normalize.test.mjs` | `"  Ich  habe einen Tisch. "` ≡ `"ich habe einen tisch"`; `„Hallo“` tırnakları; `ı→i` |
| `compare.test.mjs` | `"Mädchen"` vs `"Maedchen"` → `correct_minor`; `"Tsich"` → `typo`; `"ein Tisch"` vs `"einen Tisch"` → **wrong** (typo değil!); `"die"` vs `"der"` → wrong |
| `diagnose.test.mjs` | `einen→ein` → `case.akk`; `der→die` → `article`; `"Ich gehe morgen"` vs `"Morgen ich gehe"` → `word_order.v2`; `du geht` → `verb.conj` |
| `fsrs.test.mjs` | New+Good → Learning, 10 dk; Review+Again → lapses++, Relearning; `nextInterval(S, 0.9) ≈ S`; Easy aralığı > Good > Hard; ts-fsrs ile karşılaştırmalı (vendor varsa) ±%10 |
| `queue.test.mjs` | Kardeş gömme (aynı note iki review → biri gömülür); düşük R önce; cap aşımı; borç varken yeni kota 0 |
| `planner.test.mjs` | Borç yüksek → plan'da `lesson` yok; zayıf etiket varsa `weak-drill`; bütçe hesabı |
| `progression.test.mjs` | Gating koşulları; atlama testi |
| `backup.test.mjs` | export → import round-trip eşitliği; merge'de duplicate log yok; bozuk checksum reddedilir |
| `content.test.mjs` | `validate-content` 0 hata ile geçmeli (tüm içerik her commit'te doğrulanır) |
| `exercises.test.mjs` | Her registry tipinin `check`'i için tablo tabanlı testler |

Örnek:

```js
// tests/compare.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareAnswer } from '../js/core/answer/compare.js';

const cases = [
  ['Ich habe einen Tisch', ['Ich habe einen Tisch.'], 'correct'],
  ['ich habe einen tisch.', ['Ich habe einen Tisch.'], 'correct'],
  ['Das Maedchen', ['Das Mädchen'], 'correct_minor'],
  ['Ich habe einen Tsich', ['Ich habe einen Tisch.'], 'typo'],
  ['Ich habe ein Tisch', ['Ich habe einen Tisch.'], 'wrong'],
  ['die Tisch', ['der Tisch'], 'wrong'],
];
for (const [given, acc, want] of cases)
  test(`${given} → ${want}`, () => assert.equal(compareAnswer(given, acc).verdict, want));
```

**Lint/format:** Build olmadığı için zorunlu değil. Öneri: editörde Prettier (format-on-save) + `// @ts-check`. CI'da opsiyonel `npx --yes tsc@<sabit-sürüm> --noEmit -p jsconfig.json` (repo'ya bağımlılık eklemeden). ESLint eklemek v1'e bırakılabilir.

**Manuel duman testi (her sürüm):** Telefonda (Android + iOS) offline modda bir ders + bir tekrar oturumu; uçak modunda ses çalma; export/import.

### 11.1 GitHub Pages deploy

`.github/workflows/pages.yml`:

```yaml
name: pages
on: { push: { branches: [main] }, workflow_dispatch: {} }
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: node tools/validate-content.mjs
      - run: node --test tests/
      - run: node tools/check-precache.mjs
      - name: Siteyi hazırla (tools/tests/docs hariç)
        run: |
          mkdir _site
          cp -r index.html 404.html manifest.webmanifest sw.js css js icons content audio _site/
      - uses: actions/upload-pages-artifact@v3
        with: { path: _site }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: '${{ steps.d.outputs.page_url }}' }
    steps:
      - id: d
        uses: actions/deploy-pages@v4
```

Bu bir "build" değil — sadece dosyaları kopyalayıp doğruluyor. Testler kırılırsa yayın olmaz (bozuk içerik telefona gitmez). Ses dosyaları büyürse (>500 MB) Git LFS GitHub Pages'te sorun çıkarır; o durumda sesleri ayrı bir repo/GitHub Releases yerine **aynı repoda, düşük bitrate** tutmak en basitidir (75 MB tahmini sorun değil; Pages site limiti 1 GB).

Yerel geliştirme: `python3 -m http.server 8080` veya `npx serve` (ES modules `file://` üzerinden çalışmaz; SW için `localhost` HTTPS sayılır).

---

## 12. Yol Haritası

### MVP (1–2 hafta) — "Her gün kullanılabilir çekirdek"

Hedef: Ünite 1–3 içeriğiyle uçtan uca döngü: **ders öğren → kartlar oluşsun → ertesi gün tekrar et → ilerleme kaybolmasın.**

| # | Özellik | Not |
|---|---|---|
| 1 | Dizin yapısı, `index.html`, hash router, `dom.js`, temel CSS (mobil öncelikli, koyu tema) | |
| 2 | `db.js` + şema v1 (`meta, cards, reviewLog, lessonProgress, exerciseLog, errors`) + `storage.persist()` | `sessions`, `skills` v1'e kalabilir |
| 3 | İçerik: manifest + `lexicon/a1.json` + `unit-01..03.json` (diğer kolların müfredatından) | |
| 4 | `tools/validate-content.mjs` (yapısal + referans bütünlüğü) | |
| 5 | Registry + 5 alıştırma tipi: `flashcard`, `mcq`, `type-answer`, `article`, `order-words` | `cloze` ve `listen-type` ilk v1 adayları |
| 6 | Cevap kontrolü: normalize + compare (typo/umlaut/criticalToken) — **diagnose basit sürüm** (article/case/word_order/spelling) | |
| 7 | FSRS (vendor ts-fsrs veya minimal) + `de-tr`, `tr-de`, `article` yönleri + kardeş gömme + günlük kuyruk | |
| 8 | Ders oynatıcı (adımlar, yanlışı 3 adım sonra tekrar, checkpoint ≥ %80, kaldığı yerden devam) | |
| 9 | Basit kilit: önceki ders `completed` → sonraki açılır | mastery gating v1'de |
| 10 | "Bugün" ekranı: **Tekrar (N kart) → Yeni ders** — basit planlayıcı | zayıf nokta bloğu v1 |
| 11 | Ses: kelime + cümle MP3 çalma (Web Audio), yoksa TTS yedeği | |
| 12 | Export / Import (JSON, checksum, önizleme) + 7 günde bir yedek hatırlatma | **MVP'de şart** — veri kaybı en büyük risk |
| 13 | PWA: manifest, SW (shell precache + audio cache-first), iOS kurulum rehberi | |
| 14 | `node --test`: normalize, compare, fsrs, queue | |
| 15 | GitHub Pages workflow (validate + test + deploy) | |

**MVP'de bilinçli olarak YOK:** istatistik grafikleri, streak/XP, zayıf nokta tatbikatı, konuşma, Gist senkron, dinleme/okuma metinleri, ünite testi/atlama testi, ayarlar ekranının çoğu.

### v1 (MVP + 3–6 hafta) — "Öğretmensiz A1"

- Kalan alıştırma tipleri: `cloze`, `listen-type`, `listen-choose`, `match-pairs`, `conjugate`.
- Otomatik generator'lar (`article-drill`, `mcq-meaning`, `cloze-from-sentence`, `dictation`, `conj-drill`).
- Tam **diagnose** + hata etiketi taksonomisi + `skills` skorlama + **zayıf nokta tatbikatı** bloğu.
- Tam planlayıcı (borç yönetimi, dinamik yeni kart kotası, bütçe).
- Mastery gating (completed/mastered), ünite testi, atlama testi.
- `listen`, `cloze`, `conj` kart yönleri + kademeli yön açma.
- İstatistik ekranı: günlük tekrar sayısı, hatırlama oranı, öngörülen yük (önümüzdeki 7 gün), zayıf etiketler, kelime sayısı (bilinen/öğrenilen).
- Motivasyon katmanı (UX kolunun önerileri: seri, günlük hedef, kilometre taşları).
- Dilbilgisi notları okuyucu + alıştırma geri bildiriminden ilgili nota bağlantı.
- Ses toplu indirme (ünite başına), ses önbelleği yönetimi, yavaş ses varyantı.
- `speak` (gölge okuma/shadowing; kayıt + kendini dinle + öz değerlendirme).
- IDB içi günlük snapshot'lar, migrasyon altyapısı.
- A1 içeriğinin tamamı.

### v2 — "A2 ve sağlamlaştırma"

- A2 içeriği (Perfekt, Dativ, yan cümleler, sıfat çekimleri) + ilgili diagnose kuralları (`verb.aux`, `adj.ending`, `word_order.verb_final`).
- **FSRS parametre optimizasyonu:** ~1000+ review log birikince kişisel ağırlıklar. Seçenek: log'u export edip FSRS optimizer'ı (Python/Rust aracı) yerelde çalıştırmak → ağırlıkları Ayarlar'a yapıştırmak (backend gerekmez). İleride WASM optimizer.
- GitHub Gist senkronu (PAT ile), iki cihaz birleştirme (log replay).
- Okuma/dinleme metinleri (kısa diyaloglar, anlama soruları), kelime üzerine dokununca sözlük.
- Telaffuz geri bildirimi: Web Speech `SpeechRecognition` (yalnızca Chrome/Android'de güvenilir; deneysel bayrakla).
- Bildirimler: iOS 16.4+ ve Android'de Web Push backend gerektirir → yerine "Takvim hatırlatıcısı (.ics) indir" basit çözümü.
- Erişilebilirlik denetimi, klavye kısayolları (masaüstü), `lit-html`'e geçiş ihtiyacı değerlendirmesi.

---

## 13. Riskler ve Önlemler

| Risk | Etki | Önlem |
|---|---|---|
| Tarayıcı verisinin silinmesi (iOS 7 gün, temizleme) | Tüm ilerleme kaybı | PWA kurulumu, `storage.persist()`, yedek hatırlatma, IDB snapshot, v2 Gist |
| İçerik hatası (yanlış artikel, kırık referans) | Yanlış öğrenme | Doğrulama scripti CI'da zorunlu; diğer kolun dilsel gözden geçirme listesi |
| Çok katı cevap kontrolü | Öğrenci "doğru yazdım ama yanlış dedi" → güven kaybı | `alt[]` kabul listesi, "Aslında doğruydu" butonu (kartı Good'a çevirir ve içeriğe not düşmek için `disputes` log'u), umlaut/typo toleransı |
| Çok gevşek kontrol | Artikel/çekim hataları gözden kaçar | `criticalTokenChanged` kuralı ve testleri |
| Tekrar borcu çığı | Bırakma | Dinamik yeni kart kotası, planlayıcıda borç önceliği, mastered gating |
| SW önbelleği eski sürümde takılı kalması | Güncelleme gelmez | Sürümlü cache adı, "Yeni sürüm" toast'u, Ayarlar'da "Önbelleği sıfırla" (veri değil, sadece cache) |
| Kapsam kayması (tek geliştirici) | Hiç bitmez | MVP listesine sadakat; her özellik "bugünkü öğrenmeye katkısı" ile önceliklendirilir |

---

## 14. Diğer Kollar ile Arayüz (beklentiler)

- **Müfredat kolu:** ünite/ders listesi §5 şemasıyla eşleşmeli; her derste `newWords` (önerilen 6–10), `grammarRefs`, `canDo`.
- **Alıştırma/değerlendirme kolu:** alıştırma tiplerinin listesi §5.4 ve registry'ye eşlenir; yeni tip = yeni modül. Hata etiketi taksonomisi (§7.2) ortak sözlük olarak `content/tags.json`'da tutulur.
- **Beceriler/ses kolu:** ses üretim yöntemi, `audioId` adlandırması (§5.1), yavaş varyant, dinleme/konuşma alıştırmalarının veri ihtiyacı.
- **Pedagoji kolu:** SRS parametreleri (yeni kart/gün, `desiredRetention`), checkpoint eşiği (0.8), mastery tanımı (S ≥ 7 gün), Türkçe karşılaştırmalı gramer açıklama blokları (`body[]` içindeki `p/table/tip` blok tipleri genişletilebilir: `compare-tr`, `example`, `warning`).
- **UX/motivasyon kolu:** planlayıcı çıktısı (blok listesi) "Bugün" ekranının veri modeli; streak/XP `sessions` store'undan türetilir.
