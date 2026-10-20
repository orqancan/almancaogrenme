# İçerik Şeması (v1)

Uygulama `index.html` çift tıklanarak (`file://`) açıldığı için içerik JSON değil, **JS dosyası** olarak yazılır. Her ünite bir dosyadır:

```
content/a1/unit-01.js   →   DE.content.registerUnit({ ... });
```

Yeni bir dosya `index.html`'deki içerik `<script>` listesine eklenmelidir. Doğrulama:

```
node tools/validate-content.mjs --stats
```

Bu komut her hatayı satır satır listeler. Hata varsa içerik geçersiz sayılır.

## Ünite

```js
DE.content.registerUnit({
  id: 'u01',                 // uNN
  order: 1,                  // sıralama
  level: 'A1.1',
  title: 'Hallo! Ich bin …', // Almanca başlık
  titleTr: 'Merhaba! Ben …',
  goals: ['Kendimi tanıtabilirim.', '…'],   // can-do listesi (Türkçe, "-abilirim")
  lessons: [ /* Ders[] */ ]
});
```

Ünite testi ve tekrar oturumu motor tarafından ünitenin alıştırmalarından **otomatik** üretilir; ayrıca yazılmaz.

## Ders

```js
{
  id: 'u01.l1',              // <ünite id>.lN
  title: 'Selamlaşma',       // Türkçe veya Almanca kısa başlık
  kind: 'words',             // isteğe bağlı: words | dialog | grammar | read-write | speak | life
  intro: 'Bu derste …',      // isteğe bağlı, 1–2 cümle Türkçe
  dialog: {                  // isteğe bağlı; derse bağlam veren sesli diyalog
    title: 'Kursta ilk gün',
    lines: [ { s: 'Elif', de: 'Hallo, ich bin Elif.', tr: 'Merhaba, ben Elif.' } ]
  },
  words: [ /* Kelime[] — bu derste YENİ olan kelimeler/kalıplar */ ],
  grammar: [ { title: 'sein fiili', html: '<p>…</p><table>…</table>' } ],
  culture: 'Almanya\'da hayat notu (isteğe bağlı, Türkçe)',
  exercises: [ /* Alıştırma[] — en az 3, ideal 8–12, en az 4 farklı tip */ ]
}
```

Ders akışı: intro → diyalog → yeni kelimeler (kart olarak tanıtılır) → gramer → alıştırmalar → özet. Motor, yeni kelimelerden otomatik olarak artikel ve anlam soruları da ekler; bunları ayrıca yazmaya gerek yok.

### Gramer `html`
Basit HTML: `p, b, i, br, ul, li, table, tr, th, td, span`. Artikel renkleri için `<span class="der">der</span>`, `<span class="die">die</span>`, `<span class="das">das</span>`, `<span class="pl">die (Pl.)</span>`. Türkçe köprü kutusu için `<p class="bridge">🇹🇷 …</p>`, İngilizce için `<p class="bridge en">🇬🇧 …</p>`. Kısa tut: bir blok ekranın yarısını geçmesin.

## Kelime

```js
{ id: 'w.tisch', de: 'Tisch', pos: 'n', art: 'der', pl: 'Tische',
  tr: 'masa', en: 'table',
  ex: { de: 'Der Tisch ist neu.', tr: 'Masa yeni.' },
  note: 'isteğe bağlı kısa not', ff: 'isteğe bağlı: İngilizce sahte arkadaş uyarısı' }
```

| Alan | Kural |
|---|---|
| `id` | `w.` + küçük harf ASCII (ä→ae, ö→oe, ü→ue, ß→ss), boşluk yerine `_`. Kalıplarda kısa anlamlı ad: `w.wie_gehts`. Aynı kelime başka ünitede geçiyorsa **aynı id ile tekrar tanımlanmaz**, sadece yeni olan derste tanımlanır. |
| `de` | İsimlerde artikelsiz (`Tisch`), büyük harfle. Fiillerde mastar (`wohnen`). Kalıplarda tam ifade (`Wie geht's?`). |
| `pos` | `n` isim, `v` fiil, `adj`, `adv`, `phr` kalıp/ifade, `pron`, `num`, `prep`, `conj`, `art`, `q` soru kelimesi, `other` |
| `art` | Sadece isimlerde, zorunlu: `der/die/das`. Sadece çoğul isimlerde (`Eltern`) `die` + `plOnly: true`. |
| `pl` | İsimlerde çoğul, artikelsiz (`Tische`); çoğulu yoksa `'-'`. |
| `tr`, `en` | Kısa anlam. `en` önerilir. |
| `ex` | Örnek cümle; seviyeye uygun ve sadece bilinen kelimelerle. |
| `artQuiz` | `false`: artikelsiz kullanılan isimlerde (Deutschland, Deutsch) otomatik artikel sorusu ve artikel kartı üretilmez. |

## Alıştırma tipleri

Her alıştırmada isteğe bağlı: `explain` (cevaptan sonra gösterilen kısa Türkçe açıklama), `tags` (hata etiketleri: `sein`, `verb.conj`, `word_order`, `article`, `case.acc`, `plural`, `number`, `spelling`, `vocab`, `pron`, `question`, `negation`, `possessive`, `formal`).

| type | Alanlar | Ne yapar |
|---|---|---|
| `mcq` | `q` (Türkçe soru), `de?` (sesli okunacak Almanca), `options[]`, `answer` (doğru seçeneğin indeksi) | Çoktan seçmeli |
| `type` | `q?` (talimat), `tr` (çevrilecek Türkçe), `answers[]` (kabul edilen Almanca cevaplar; ilki esas) | TR→DE yazma |
| `cloze` | `de` (tam bir `___` içerir), `tr`, `answers[]` (boşluğa gelen kabul edilen kelime/ler), `hint?` (ör. `sein`) | Boşluk doldurma |
| `order` | `tr`, `answer` (doğru cümle; boşlukla bölünüp karıştırılır), `alt[]?` (başka doğru sıralar), `extra[]?` (çeldirici kelime) | Kelime sıralama |
| `listen` | `de` (dinletilecek cümle), `tr`, `answers[]?` (varsayılan: `de`) | Dikte: dinle ve yaz |
| `article` | `word` (bir isim kelimenin id'si) | der/die/das seç |
| `match` | `pairs: [['Almanca','Türkçe'], …]` (3–6 çift) | Eşleştirme |
| `speak` | `de`, `tr` | Dinle, sesli tekrar et (Chrome/Edge'de konuşma tanıma ile kontrol) |
| `write` | `task` (Türkçe görev), `taskDe?`, `minWords?`, `checklist[]?` (öz-kontrol maddeleri), `model` (örnek cevap) | Serbest yazma; yerel kontrol + "Yapay zekâya sor" |

Cevap kontrolü büyük/küçük harf, sondaki noktalama ve fazla boşluk konusunda hoşgörülüdür; `ae/oe/ue/ss` yazımı uyarıyla kabul edilir. Bu yüzden `answers` içine bu varyantları yazmaya gerek yok. Gerçekten farklı doğru cevapları (`Ich heiße Anna.` / `Mein Name ist Anna.`) ayrı ayrı yazın.

## İçerik kalite kuralları

1. Almanca doğru, doğal ve Standart Almanca (Hochdeutsch) olmalı. Emin olunmayan cümle kullanılmaz.
2. Seviye: sadece o ana kadar öğretilmiş gramer. Kelimelerin büyük çoğunluğu daha önce veya aynı derste tanıtılmış olmalı.
3. Türkçe açıklamalar kısa, samimi ("sen" diliyle) ve Türkçeden köprü kurarak.
4. Bağlam Almanya'da gerçek hayat: kurs, Bürgeramt, süpermarket, komşu, iş yeri.
5. Telif: Goethe/DW/ders kitabı metinleri kopyalanmaz; her şey özgün yazılır.
