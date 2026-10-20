// Ünite 0 — Laute & Buchstaben (Sesler ve harfler)
// Telaffuz başlangıç modülü: alfabe, ünlüler, diftonglar, ünsüzler, sondaki sertleşme, vurgu, tonlama.
// Plan: docs/analiz/02-mufredat.md §7.1–7.2. Şema: docs/icerik-semasi.md
DE.content.registerUnit({
  id: 'u00',
  order: 0,
  level: 'A1.1',
  title: 'Laute & Buchstaben',
  titleTr: 'Sesler ve harfler',
  goals: [
    'Günün saatine ve ortama uygun selamlaşıp vedalaşabilirim.',
    'Almanca alfabeyi tanır, adımı harf harf söyleyebilirim.',
    '0–10 arası sayıları anlayıp söyleyebilirim.',
    'Almanca kelimeleri yazılışından doğru okuyabilirim (ei, ie, z, sch, ch …).',
    'Anlamadığımda "Wie bitte?" ve "Langsam, bitte." diyebilirim.'
  ],
  lessons: [

    // ───────────────────────────── 0.1 ─────────────────────────────
    {
      id: 'u00.l1',
      title: 'Hallo! Das Alphabet',
      kind: 'words',
      intro: "Almanya'daki ilk gününde en çok neye ihtiyacın var? Selam vermek ve adını harf harf söylemek. Bu derste ikisini de öğreniyorsun.",
      dialog: {
        title: 'Dil kursunda kayıt masası',
        lines: [
          { s: 'Frau Krüger', de: 'Guten Tag!', tr: 'İyi günler!' },
          { s: 'Mehmet', de: 'Guten Tag!', tr: 'İyi günler!' },
          { s: 'Frau Krüger', de: 'Wie ist Ihr Name?', tr: 'Adınız nedir?' },
          { s: 'Mehmet', de: 'Yilmaz. Mehmet Yilmaz.', tr: 'Yılmaz. Mehmet Yılmaz.' },
          { s: 'Frau Krüger', de: 'Wie bitte?', tr: 'Efendim? / Pardon?' },
          { s: 'Mehmet', de: 'Yilmaz.', tr: 'Yılmaz.' },
          { s: 'Frau Krüger', de: 'Wie schreibt man das?', tr: 'Nasıl yazılıyor?' },
          { s: 'Mehmet', de: 'Y-I-L-M-A-Z.', tr: 'Y-I-L-M-A-Z.' },
          { s: 'Frau Krüger', de: 'Danke, Herr Yilmaz!', tr: 'Teşekkürler, Yılmaz Bey!' },
          { s: 'Mehmet', de: 'Bitte! Auf Wiedersehen!', tr: 'Rica ederim! Hoşça kalın!' }
        ]
      },
      words: [
        { id: 'w.hallo', de: 'Hallo', pos: 'phr', tr: 'merhaba (samimi)', en: 'hello, hi',
          ex: { de: 'Hallo, Anna!', tr: 'Merhaba Anna!' } },
        { id: 'w.guten_morgen', de: 'Guten Morgen!', pos: 'phr', tr: 'günaydın', en: 'good morning',
          ex: { de: 'Guten Morgen, Frau Weber!', tr: 'Günaydın Weber Hanım!' },
          note: 'Sabah, yaklaşık saat 10–11’e kadar.' },
        { id: 'w.guten_tag', de: 'Guten Tag!', pos: 'phr', tr: 'iyi günler; merhaba (resmi)', en: 'hello, good day (formal)',
          ex: { de: 'Guten Tag, Herr Schmidt!', tr: 'İyi günler Schmidt Bey!' },
          note: 'Gün boyu kullanılan resmi selam. Vedalaşmada değil, karşılaşmada söylenir.' },
        { id: 'w.guten_abend', de: 'Guten Abend!', pos: 'phr', tr: 'iyi akşamlar', en: 'good evening',
          ex: { de: 'Guten Abend, Frau Becker!', tr: 'İyi akşamlar Becker Hanım!' },
          note: 'Akşam, yaklaşık saat 18’den sonra.' },
        { id: 'w.gute_nacht', de: 'Gute Nacht!', pos: 'phr', tr: 'iyi geceler', en: 'good night',
          ex: { de: 'Gute Nacht, Mama!', tr: 'İyi geceler anne!' },
          note: 'Sadece yatmadan önce ya da gece ayrılırken; selam olarak değil.' },
        { id: 'w.tschuess', de: 'Tschüss!', pos: 'phr', tr: 'hoşça kal, görüşürüz (samimi)', en: 'bye',
          ex: { de: 'Tschüss, Lena!', tr: 'Hoşça kal Lena!' },
          note: '“Tschüs” diye tek s ile de yazılır; ikisi de doğru.' },
        { id: 'w.auf_wiedersehen', de: 'Auf Wiedersehen!', pos: 'phr', tr: 'hoşça kalın (resmi)', en: 'goodbye (formal)',
          ex: { de: 'Auf Wiedersehen, Frau Krüger!', tr: 'Hoşça kalın Krüger Hanım!' } },
        { id: 'w.danke', de: 'danke', pos: 'phr', tr: 'teşekkürler, sağ ol', en: 'thanks, thank you',
          ex: { de: 'Ja, danke!', tr: 'Evet, teşekkürler!' },
          note: 'Daha kibar: Danke schön! / Vielen Dank!' },
        { id: 'w.bitte', de: 'bitte', pos: 'phr', tr: 'lütfen; rica ederim; buyurun', en: "please; you're welcome",
          ex: { de: 'Danke! — Bitte!', tr: 'Teşekkürler! — Rica ederim!' },
          note: 'Üç anlamı var: lütfen, rica ederim (danke’ye cevap) ve buyurun.' },
        { id: 'w.wie_bitte', de: 'Wie bitte?', pos: 'phr', tr: 'Efendim? / Pardon, anlamadım?', en: 'Pardon? Sorry?',
          ex: { de: 'Wie bitte? Wie schreibt man das?', tr: 'Efendim? Bu nasıl yazılıyor?' },
          note: 'Duyamadığında ya da anlamadığında kibarca tekrar istemek için.' },
        { id: 'w.wie_schreibt_man_das', de: 'Wie schreibt man das?', pos: 'phr', tr: 'Bu nasıl yazılır?', en: 'How do you spell that?',
          ex: { de: 'Wie schreibt man das? — M-A-R-I-A.', tr: 'Nasıl yazılıyor? — M-A-R-I-A.' } }
      ],
      grammar: [
        {
          title: 'Almanca alfabe (das Alphabet)',
          html: `<p>Harflerin çoğu tanıdık, ama <b>adları</b> farklı. Kırmızıyla işaretli olanlara dikkat:</p>
<table>
<tr><th>Harf</th><th>Okunuş</th><th>Harf</th><th>Okunuş</th><th>Harf</th><th>Okunuş</th></tr>
<tr><td>A</td><td>a</td><td>J</td><td><b>yot</b></td><td>S</td><td>es</td></tr>
<tr><td>B</td><td>be</td><td>K</td><td>ka</td><td>T</td><td>te</td></tr>
<tr><td>C</td><td><b>tse</b></td><td>L</td><td>el</td><td>U</td><td>u</td></tr>
<tr><td>D</td><td>de</td><td>M</td><td>em</td><td>V</td><td><b>fau</b></td></tr>
<tr><td>E</td><td>e</td><td>N</td><td>en</td><td>W</td><td><b>ve</b></td></tr>
<tr><td>F</td><td>ef</td><td>O</td><td>o</td><td>X</td><td>iks</td></tr>
<tr><td>G</td><td>ge</td><td>P</td><td>pe</td><td>Y</td><td><b>üpsilon</b></td></tr>
<tr><td>H</td><td><b>ha</b></td><td>Q</td><td><b>ku</b></td><td>Z</td><td><b>tset</b></td></tr>
<tr><td>I</td><td>i</td><td>R</td><td>er</td><td>ß</td><td><b>es-tset</b></td></tr>
</table>
<p>Ek harfler: <b>Ä</b> (e), <b>Ö</b> (ö), <b>Ü</b> (ü) ve <b>ß</b> (Eszett, “keskin s”).</p>
<p class="bridge">🇹🇷 Almancada ç, ğ, ı, ş harfleri yok. Türkçe isimler resmî yazışmalarda genelde C, G, I, S ile yazılır: Yılmaz → Yilmaz. Ö ve Ü ise Almancada da var!</p>
<p class="bridge en">🇬🇧 İngilizce harf adlarını kullanma: J “cey” değil “yot”, W “dabılyu” değil “ve”, E “i” değil “e”, I “ay” değil “i”.</p>`
        },
        {
          title: 'Wie schreibt man das? — Harf harf söyleme',
          html: `<p>Almanya’da adını telefonda, Bürgeramt’ta, doktorda sık sık harf harf söyleyeceksin (<i>buchstabieren</i>). İki ipucu:</p>
<ul>
<li>Çift harf: <b>Doppel-L</b> ya da <b>zwei L</b> → Hallo: H-A-Doppel-L-O.</li>
<li>Karışabilecek harfi bir kelimeyle netleştir: <b>B wie Berlin</b>, <b>M wie München</b>, <b>D wie Düsseldorf</b>.</li>
</ul>
<table>
<tr><th>Harf</th><th>Şehirle</th><th>Eski usul (isimle)</th></tr>
<tr><td>A</td><td>A wie Aachen</td><td>A wie Anton</td></tr>
<tr><td>B</td><td>B wie Berlin</td><td>B wie Berta</td></tr>
<tr><td>H</td><td>H wie Hamburg</td><td>H wie Heinrich</td></tr>
<tr><td>K</td><td>K wie Köln</td><td>K wie Kaufmann</td></tr>
<tr><td>Z</td><td>Z wie Zwickau</td><td>Z wie Zeppelin</td></tr>
</table>
<p class="bridge">🇹🇷 “wie” burada “gibi” demek: <b>B wie Berlin</b> = “Berlin’deki B”. Her iki usul de anlaşılır.</p>`
        },
        {
          title: 'Selamlaşma: ne zaman hangisi?',
          html: `<table>
<tr><th></th><th>Samimi (du)</th><th>Resmi (Sie)</th></tr>
<tr><td>Selam</td><td>Hallo!</td><td>Guten Morgen! / Guten Tag! / Guten Abend!</td></tr>
<tr><td>Veda</td><td>Tschüss!</td><td>Auf Wiedersehen!</td></tr>
</table>
<p><b>Gute Nacht!</b> sadece yatarken ya da gece ayrılırken söylenir, selam değildir.</p>
<p class="bridge">🇹🇷 Türkçedeki “merhaba / iyi günler” ve “hoşça kal / hoşça kalın” ayrımı gibi düşün.</p>
<p class="bridge en">🇬🇧 Guten Tag ≈ “Good day”, Guten Morgen ≈ “Good morning”. Tag sondaki g yüzünden “taak” okunur.</p>`
        }
      ],
      culture: "Almanca sadece Almanya'da değil, Avusturya ve İsviçre'de de konuşulur: kısaca D-A-CH (Deutschland, Österreich, Schweiz). Bölgeye göre selam değişir: Bavyera ve Avusturya'da \"Grüß Gott!\" ve samimi \"Servus!\", İsviçre'de \"Grüezi!\", Kuzey Almanya'da günün her saatinde \"Moin!\" duyarsın. \"Guten Tag\" ise her yerde anlaşılır ve her zaman doğrudur.",
      exercises: [
        { type: 'match', pairs: [
            ['Guten Morgen!', 'Günaydın!'],
            ['Guten Abend!', 'İyi akşamlar!'],
            ['Gute Nacht!', 'İyi geceler!'],
            ['Tschüss!', 'Hoşça kal! (samimi)'],
            ['Auf Wiedersehen!', 'Hoşça kalın! (resmi)']
          ], tags: ['vocab'] },
        { type: 'mcq', q: 'Saat 20:00, kursta öğretmenini selamlıyorsun. Ne dersin?',
          options: ['Guten Morgen!', 'Guten Abend!', 'Gute Nacht!', 'Tschüss!'], answer: 1,
          explain: 'Akşam selamı “Guten Abend!”. “Gute Nacht!” sadece yatarken ya da gece ayrılırken söylenir.', tags: ['vocab'] },
        { type: 'mcq', q: "Bürgeramt'ta memurla vedalaşıyorsun. En uygun hangisi?",
          options: ['Tschüss!', 'Auf Wiedersehen!', 'Hallo!'], answer: 1,
          explain: 'Resmi ortamda “Auf Wiedersehen!”. “Tschüss!” samimidir, “Hallo!” ise selamdır.', tags: ['formal', 'vocab'] },
        { type: 'mcq', q: 'J harfinin Almanca adı nasıl okunur?',
          options: ['“cey”', '“yot”', '“je”'], answer: 1,
          explain: 'J = “yot”. Almancada j harfi Türkçedeki y sesidir: ja = “ya”.', tags: ['spelling'] },
        { type: 'mcq', q: 'W harfinin Almanca adı nasıl okunur?',
          options: ['“dabılyu”', '“ve”', '“fau”'], answer: 1,
          explain: 'W = “ve”. “fau” ise V harfinin adı. İngilizce harf adlarını karıştırma!', tags: ['spelling'] },
        { type: 'mcq', q: 'Hangi harfi duydun?', de: 'V',
          options: ['V (fau)', 'W (ve)', 'F (ef)'], answer: 0,
          explain: 'V harfinin adı “fau”.', tags: ['spelling'] },
        { type: 'mcq', q: 'Hangi harfi duydun?', de: 'Z',
          options: ['C (tse)', 'Z (tset)', 'S (es)'], answer: 1,
          explain: 'Z harfinin adı “tset”. C ise “tse”: ikisi çok benzer, sondaki t’ye dikkat.', tags: ['spelling'] },
        { type: 'mcq', q: 'Telefonda adındaki M harfini netleştirmek istiyorsun. Hangisi doğru?',
          options: ['M wie München', 'M wie Nürnberg', 'M wie Berlin'], answer: 0,
          explain: 'Harfi, o harfle başlayan bir kelimeyle söylersin: M wie München.', tags: ['spelling'] },
        { type: 'listen', de: 'Guten Abend!', tr: 'İyi akşamlar!' },
        { type: 'speak', de: 'Wie schreibt man das?', tr: 'Bu nasıl yazılır?' },
        { type: 'cloze', de: 'Wie ___ man das?', tr: 'Bu nasıl yazılır?', answers: ['schreibt'],
          explain: 'Kalıbı bütün olarak ezberle: Wie schreibt man das?', tags: ['spelling'] },
        { type: 'type', q: 'Almanca yaz.', tr: 'Teşekkürler!', answers: ['Danke!', 'Danke schön!', 'Vielen Dank!'], tags: ['vocab'] }
      ]
    },

    // ───────────────────────────── 0.2 ─────────────────────────────
    {
      id: 'u00.l2',
      title: 'Vokale & Zahlen 0–10',
      kind: 'words',
      intro: 'Almanca ünlüler Türkçedekilere çok benzer, ö ve ü ise aynısı! Asıl yeni şey: ünlünün uzun mu kısa mı olduğu anlamı değiştirebilir. Bir de 0–10 sayılarını öğreniyorsun.',
      words: [
        { id: 'w.null', de: 'null', pos: 'num', tr: 'sıfır', en: 'zero',
          note: 'u kısa: “nul”.' },
        { id: 'w.eins', de: 'eins', pos: 'num', tr: 'bir', en: 'one',
          note: 'ei = “ay” → “ayns”.' },
        { id: 'w.zwei', de: 'zwei', pos: 'num', tr: 'iki', en: 'two',
          ex: { de: 'Zwei Kaffee, bitte.', tr: 'İki kahve, lütfen.' },
          note: 'z = “ts”, w = “v”, ei = “ay” → “tsvay”.' },
        { id: 'w.drei', de: 'drei', pos: 'num', tr: 'üç', en: 'three',
          ex: { de: 'Drei Wasser, bitte.', tr: 'Üç su, lütfen.' },
          note: '“dray”.' },
        { id: 'w.vier', de: 'vier', pos: 'num', tr: 'dört', en: 'four',
          note: 'v = “f”, ie = uzun i, sondaki r neredeyse “a” → “fiia”.' },
        { id: 'w.fuenf', de: 'fünf', pos: 'num', tr: 'beş', en: 'five',
          note: 'ü Türkçedeki gibi → “fünf”.' },
        { id: 'w.sechs', de: 'sechs', pos: 'num', tr: 'altı', en: 'six',
          note: 'Baştaki s = “z”, chs = “ks” → “zeks”.' },
        { id: 'w.sieben', de: 'sieben', pos: 'num', tr: 'yedi', en: 'seven',
          note: 's = “z”, ie = uzun i → “ziiben”.' },
        { id: 'w.acht', de: 'acht', pos: 'num', tr: 'sekiz', en: 'eight',
          note: 'ch gırtlaktan, sert bir “h” → “aht”.' },
        { id: 'w.neun', de: 'neun', pos: 'num', tr: 'dokuz', en: 'nine',
          note: 'eu = “oy” → “noyn”.' },
        { id: 'w.zehn', de: 'zehn', pos: 'num', tr: 'on', en: 'ten',
          note: 'z = “ts”, h okunmaz ve e’yi uzatır → “tseen”.' }
      ],
      grammar: [
        {
          title: 'Ünlüler: a e i o u + ä ö ü',
          html: `<p><b>a, e, i, o, u</b> Türkçedeki gibi temiz okunur. <b>e</b> hiçbir zaman “ı” değildir: <i>Tee</i> = “tee”.</p>
<p><b>ö</b> ve <b>ü</b> Türkçedekinin aynısı: <i>schön</i>, <i>fünf</i>. Bu senin büyük avantajın!</p>
<p><b>ä</b> = açık bir “e”: <i>Käse</i> (peynir) “keeze”, <i>Männer</i> (erkekler) “mener”.</p>
<p>Vurgusuz sondaki <b>-e</b> çok hafif okunur, “e” ile “ı” arası: <i>bitte</i> ≈ “bitı”, <i>danke</i> ≈ “dankı”.</p>
<p class="bridge">🇹🇷 Umlaut anlamı değiştirir: <b>schon</b> (zaten) ↔ <b>schön</b> (güzel), <b>Mutter</b> (anne) ↔ <b>Mütter</b> (anneler). Klavyede yoksa ae, oe, ue yazabilirsin.</p>`
        },
        {
          title: 'Uzun mu, kısa mı?',
          html: `<p>Türkçede ünlü uzunluğu pek fark etmez; Almancada <b>anlamı değiştirir</b>: <b>Staat</b> (devlet, uzun a) ↔ <b>Stadt</b> (şehir, kısa a).</p>
<table>
<tr><th>Uzun ünlü</th><th>Kısa ünlü</th></tr>
<tr><td>ünlü + h: <i>zehn, Sohn</i></td><td>çift ünsüzden önce: <i>Bett, Mutter, bitte</i></td></tr>
<tr><td>çift ünlü: <i>Tee, Staat, Boot</i></td><td>ck / tz’den önce: <i>Zucker, Katze</i></td></tr>
<tr><td>ie: <i>vier, sieben</i></td><td>genelde iki ünsüzden önce: <i>acht, fünf</i></td></tr>
<tr><td>genelde tek ünsüzden önce: <i>Name, Tag</i></td><td></td></tr>
</table>
<p class="bridge">🇹🇷 Uzun ünlüyü Türkçe “saat” kelimesindeki “aa” gibi uzat.</p>`
        },
        {
          title: 'Sayılar 0–10',
          html: `<table>
<tr><th></th><th>Almanca</th><th>Okunuş</th><th></th><th>Almanca</th><th>Okunuş</th></tr>
<tr><td>0</td><td>null</td><td>nul</td><td>6</td><td>sechs</td><td>zeks</td></tr>
<tr><td>1</td><td>eins</td><td>ayns</td><td>7</td><td>sieben</td><td>ziiben</td></tr>
<tr><td>2</td><td>zwei</td><td>tsvay</td><td>8</td><td>acht</td><td>aht</td></tr>
<tr><td>3</td><td>drei</td><td>dray</td><td>9</td><td>neun</td><td>noyn</td></tr>
<tr><td>4</td><td>vier</td><td>fiia</td><td>10</td><td>zehn</td><td>tseen</td></tr>
<tr><td>5</td><td>fünf</td><td>fünf</td><td></td><td></td><td></td></tr>
</table>
<p class="bridge en">🇬🇧 İngilizceyle karşılaştır: drei/three, vier/four, fünf/five, sechs/six, sieben/seven, acht/eight, neun/nine, zehn/ten. Kökler aynı!</p>`
        }
      ],
      culture: "Telefonda zwei ve drei birbirine karışabildiği için Almanlar 2 için sık sık \"zwo\" der: \"null, eins, sieben, zwo …\". Bir numarayı dinlerken \"zwo\" duyarsan şaşırma, o da 2'dir.",
      exercises: [
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'Staat', options: ['Staat', 'Stadt'], answer: 0,
          explain: 'Staat (devlet): uzun a, “ştaat”. Stadt (şehir): kısa a, “ştat”.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'bitten', options: ['bieten', 'bitten'], answer: 1,
          explain: 'bitten (rica etmek): kısa i. bieten (sunmak): ie = uzun i.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'Hütte', options: ['Hüte', 'Hütte'], answer: 1,
          explain: 'Hütte (kulübe): çift t’den önce kısa ü. Hüte (şapkalar): uzun ü.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'schön', options: ['schon', 'schön'], answer: 1,
          explain: 'schön = güzel, schon = zaten. Umlaut anlamı değiştirir.', tags: ['pron'] },
        { type: 'mcq', q: '“Sohn” (oğul) kelimesinde o uzun mu, kısa mı?', de: 'Sohn', options: ['uzun', 'kısa'], answer: 0,
          explain: 'Ünlüden sonraki h okunmaz, ünlüyü uzatır: “zoon”.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangisinde ünlü KISA?', options: ['Tee', 'Bett', 'Name', 'Tag'], answer: 1,
          explain: 'Bett (yatak): çift t’den önceki ünlü kısadır. Tee çift ünlü, Name ve Tag tek ünsüzden önce → uzun.', tags: ['pron'] },
        { type: 'match', pairs: [
            ['eins', '1'], ['drei', '3'], ['fünf', '5'], ['sieben', '7'], ['neun', '9'], ['zehn', '10']
          ], tags: ['number'] },
        { type: 'listen', de: 'vier', tr: '4', tags: ['number'] },
        { type: 'listen', de: 'sechs', tr: '6', tags: ['number'] },
        { type: 'speak', de: 'null, eins, zwei, drei', tr: '0, 1, 2, 3' },
        { type: 'speak', de: 'Mutter, Mütter', tr: 'anne, anneler' },
        { type: 'type', q: 'Almanca yaz.', tr: 'sekiz (8)', answers: ['acht'], tags: ['number'] }
      ]
    },

    // ───────────────────────────── 0.3 ─────────────────────────────
    {
      id: 'u00.l3',
      title: 'ei, ie, eu, äu, au',
      kind: 'speak',
      intro: 'İki ünlü yan yana gelince Almancada tek bir ses çıkar. En önemli kural: ei = “ay”, ie = uzun “i”. Bunu öğrenirsen okuma hatalarının yarısı biter!',
      words: [
        { id: 'w.nein', de: 'nein', pos: 'other', tr: 'hayır', en: 'no',
          ex: { de: 'Nein, danke.', tr: 'Hayır, teşekkürler.' },
          note: 'ei = “ay” → “nayn”.' }
      ],
      grammar: [
        {
          title: 'ei = “ay”, ie = uzun “i”',
          html: `<table>
<tr><th>Yazılış</th><th>Ses</th><th>Örnek</th></tr>
<tr><td><b>ei</b> (ai)</td><td>ay</td><td><i>drei</i> “dray”, <i>nein</i> “nayn”, <i>Zeit</i> “tsayt”, <i>Mai</i></td></tr>
<tr><td><b>ie</b></td><td>uzun i</td><td><i>vier</i> “fiia”, <i>sieben</i> “ziiben”, <i>wie</i> “vii”, <i>Sie</i> “zii”</td></tr>
</table>
<p><b>Hafıza hilesi:</b> ikinci harfi İngilizce adıyla oku. <b>ei</b> → i’nin İngilizce adı “ay”. <b>ie</b> → e’nin İngilizce adı “i”.</p>
<p class="bridge en">🇬🇧 <i>Wein</i> (şarap) neredeyse İngilizce <i>wine</i> gibi okunur: “vayn”. <i>Wien</i> (Viyana) ise “viin”.</p>
<p>İstisna: bazı yabancı kökenli kelimelerde i-e ayrı okunur: <i>Familie</i> = “fa-mi-li-e”.</p>`
        },
        {
          title: 'eu / äu = “oy”, au = “au”',
          html: `<table>
<tr><th>Yazılış</th><th>Ses</th><th>Örnek</th></tr>
<tr><td><b>eu</b>, <b>äu</b></td><td>oy</td><td><i>neun</i> “noyn”, <i>heute</i> “hoyte”, <i>Deutsch</i> “doyç”, <i>Häuser</i> “hoyza”</td></tr>
<tr><td><b>au</b></td><td>au</td><td><i>Frau</i>, <i>Haus</i>, <i>auch</i>, <i>Auto</i></td></tr>
</table>
<p class="bridge">🇹🇷 “e-u” diye ayrı okuma: <b>heute</b> “he-u-te” değil, “hoyte”.</p>
<p class="bridge en">🇬🇧 <i>Haus</i> = house, <i>Maus</i> = mouse: au sesi İngilizcedeki “ou” gibi.</p>`
        }
      ],
      culture: "Deutsch (Almanca) ve Deutschland (Almanya) kelimelerinde eu = \"oy\": \"doyç\", \"doyçlant\". Avusturya'nın başkenti Wien (\"viin\"), şarap ise Wein (\"vayn\"). Viyana'da kafede bu farkı bilmek işine yarar!",
      exercises: [
        { type: 'mcq', q: '“drei” kelimesinde ei nasıl okunur?', de: 'drei', options: ['“e-i”', '“ay”', '“ii”'], answer: 1,
          explain: 'ei her zaman “ay”: drei = “dray”.', tags: ['pron'] },
        { type: 'mcq', q: '“sieben” kelimesinde ie nasıl okunur?', de: 'sieben', options: ['“ay”', 'uzun “i”', '“i-e”'], answer: 1,
          explain: 'ie = uzun i: sieben = “ziiben”.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'Wien', options: ['Wein', 'Wien'], answer: 1,
          explain: 'Wien (Viyana) = “viin”; Wein (şarap) = “vayn”.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'Reise', options: ['Riese', 'Reise'], answer: 1,
          explain: 'Reise (yolculuk) = “rayze”; Riese (dev) = “riize”.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'Leute', options: ['Laute', 'Leute'], answer: 1,
          explain: 'Leute (insanlar) = “loyte”; Laute (sesler) = “laute”.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangisinde “ay” sesi var?', options: ['Bier', 'Wein', 'Liebe', 'wie'], answer: 1,
          explain: 'Wein: ei = “ay”. Diğerlerinde ie var, yani uzun i.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangisinde “oy” sesi var?', options: ['heute', 'Haus', 'Hose'], answer: 0,
          explain: 'heute: eu = “oy” → “hoyte”.', tags: ['pron'] },
        { type: 'match', pairs: [
            ['drei', 'üç'], ['vier', 'dört'], ['neun', 'dokuz'], ['nein', 'hayır'], ['eins', 'bir']
          ], tags: ['vocab', 'number'] },
        { type: 'listen', de: 'Nein, danke.', tr: 'Hayır, teşekkürler.' },
        { type: 'listen', de: 'heute', tr: 'bugün', tags: ['spelling'] },
        { type: 'speak', de: 'drei, vier, neun', tr: '3, 4, 9' },
        { type: 'speak', de: 'Wie bitte? Nein, danke.', tr: 'Efendim? Hayır, teşekkürler.' }
      ]
    },

    // ───────────────────────────── 0.4 ─────────────────────────────
    {
      id: 'u00.l4',
      title: 'z, s, v, w, j, sch, sp, st',
      kind: 'speak',
      intro: 'Bu ünsüzler Türkçe okuma alışkanlığını en çok şaşırtanlar: z “ts”, v “f”, w “v” olur. sch ise tam bizim “ş”!',
      dialog: {
        title: "Bürgeramt'ta",
        lines: [
          { s: 'Frau Wagner', de: 'Guten Tag! Wie ist Ihr Name?', tr: 'İyi günler! Adınız nedir?' },
          { s: 'Elif', de: 'Entschuldigung, ich verstehe nicht.', tr: 'Affedersiniz, anlamıyorum.' },
          { s: 'Frau Wagner', de: 'Ihr Name, bitte.', tr: 'Adınız, lütfen.' },
          { s: 'Elif', de: 'Ah, ja! Demir. D-E-M-I-R.', tr: 'Ha, evet! Demir. D-E-M-I-R.' },
          { s: 'Frau Wagner', de: 'Danke schön, Frau Demir.', tr: 'Çok teşekkürler, Demir Hanım.' }
        ]
      },
      words: [
        { id: 'w.ja', de: 'ja', pos: 'other', tr: 'evet', en: 'yes',
          ex: { de: 'Ja, bitte.', tr: 'Evet, lütfen.' },
          note: 'j = Türkçe y → “ya”.' },
        { id: 'w.entschuldigung', de: 'Entschuldigung!', pos: 'phr', tr: 'Affedersiniz! / Pardon! / Özür dilerim!', en: 'Excuse me! / Sorry!',
          ex: { de: 'Entschuldigung, wie bitte?', tr: 'Affedersiniz, efendim?' },
          note: 'Okunuş: “ent-ŞUL-di-gung”. Birine bir şey sormadan önce de kullanılır.' },
        { id: 'w.ich_verstehe_nicht', de: 'Ich verstehe nicht.', pos: 'phr', tr: 'Anlamıyorum.', en: "I don't understand.",
          ex: { de: 'Entschuldigung, ich verstehe nicht.', tr: 'Affedersiniz, anlamıyorum.' },
          note: 'verstehen: st = “şt” → “fer-ŞTE-e”.' }
      ],
      grammar: [
        {
          title: 'z = “ts”, s = çoğu zaman “z”',
          html: `<p><b>z</b> (ve tz) her zaman <b>“ts”</b>: <i>zehn</i> “tseen”, <i>Zeit</i> “tsayt”, <i>Zoo</i> “tsoo”, <i>Katze</i> “katse”.</p>
<p><b>s</b> ünlüden önce <b>“z”</b>: <i>sieben</i> “ziiben”, <i>Sie</i> “zii”, <i>Sonne</i> “zone”.<br>Kelime sonunda <b>“s”</b>: <i>Haus</i>, <i>das</i>, <i>Bus</i>.</p>
<p><b>ß</b> ve <b>ss</b> her zaman sert <b>“s”</b>: <i>Straße</i>, <i>Wasser</i>.</p>
<p class="bridge">🇹🇷 Türkçe z sesini Almancada genelde <b>s</b> harfi verir; Almanca <b>z</b> harfi ise “ts” sesidir. Yani <i>Zoo</i> “zoo” değil, “tsoo”!</p>
<p class="bridge en">🇬🇧 z sesi İngilizce <i>cats</i> kelimesinin sonundaki “ts” gibi.</p>`
        },
        {
          title: 'v = “f”, w = “v”, j = “y”',
          html: `<table>
<tr><th>Harf</th><th>Ses</th><th>Örnek</th></tr>
<tr><td><b>v</b></td><td>f</td><td><i>Vater</i> “fata”, <i>vier</i>, <i>viel</i></td></tr>
<tr><td><b>w</b></td><td>v</td><td><i>Wasser</i> “vaser”, <i>wie</i>, <i>wir</i></td></tr>
<tr><td><b>j</b></td><td>y</td><td><i>ja</i> “ya”, <i>Juli</i> “yuli”</td></tr>
</table>
<p>Yabancı kökenli bazı kelimelerde v = “v”: <i>Video</i>, <i>Vase</i>.</p>
<p class="bridge en">🇬🇧 Almanca w, İngilizce w (water) gibi değil; dudaklar yuvarlanmaz, düz “v”: <i>Wasser</i> “vaser”. j de İngilizce “jam” gibi değil, “y”.</p>`
        },
        {
          title: 'sch = “ş”, sp/st başta = “şp/şt”',
          html: `<p><b>sch</b> tam Türkçe <b>ş</b>: <i>Schule</i> “şule”, <i>schön</i>, <i>Tisch</i> “tiş”. Avantaj!</p>
<p>Kelime ya da kök başında <b>sp</b> = “şp”, <b>st</b> = “şt”: <i>Sport</i> “şport”, <i>Straße</i> “ştraase”, <i>verstehen</i> “fer-ştee-en”.</p>
<p>Ortada ve sonda st normal “st”: <i>ist</i>, <i>Fenster</i>.</p>
<p class="bridge">🇹🇷 Başa ünlü ekleme: “ıstraase”, “ispor” değil. Ünsüzleri birleştirip tek seferde söyle: <b>ştraa-se</b>.</p>`
        }
      ],
      culture: "Resmî yerlerde (Bürgeramt, Ausländerbehörde, banka, doktor) tanımadığın yetişkinlere \"Guten Tag\" der ve Sie (siz) ile konuşursun. Hitap: Frau + soyadı, Herr + soyadı (Frau Wagner, Herr Yilmaz). Anlamadığında çekinme: \"Entschuldigung, ich verstehe nicht.\" demek tamamen normaldir.",
      exercises: [
        { type: 'mcq', q: '“zehn” kelimesinde z nasıl okunur?', de: 'zehn', options: ['Türkçe z gibi', '“ts”', '“s”'], answer: 1,
          explain: 'Almanca z her zaman “ts”: zehn = “tseen”.', tags: ['pron'] },
        { type: 'mcq', q: '“Vater” (baba) kelimesinde V nasıl okunur?', de: 'Vater', options: ['“v”', '“f”', 'İngilizce w gibi'], answer: 1,
          explain: 'Almanca v çoğunlukla “f”: Vater = “fata”.', tags: ['pron'] },
        { type: 'mcq', q: '“Wasser” (su) kelimesinde W nasıl okunur?', de: 'Wasser', options: ['“v”', '“f”', 'İngilizce w gibi (water)'], answer: 0,
          explain: 'Almanca w = “v”: Wasser = “vaser”.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'wir', options: ['wir (biz)', 'vier (dört)'], answer: 0,
          explain: 'wir = “viia” (w = v), vier = “fiia” (v = f). Tek fark ilk ses: v mi, f mi?', tags: ['pron'] },
        { type: 'mcq', q: '“Straße” (cadde) nasıl başlar?', de: 'Straße', options: ['“stra…”', '“ştra…”', '“ıstra…”'], answer: 1,
          explain: 'Başta st = “şt”, önüne ünlü eklenmez: “ştraase”.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangisinde st “şt” diye OKUNMAZ?', options: ['Stadt', 'verstehen', 'Fenster', 'Student'], answer: 2,
          explain: 'Fenster’de st kelimenin ortasında, kök başında değil → normal “st”.', tags: ['pron'] },
        { type: 'match', pairs: [
            ['Zeit', 'zaman'], ['Schule', 'okul'], ['Wasser', 'su'], ['Vater', 'baba'], ['Sport', 'spor']
          ], tags: ['vocab'] },
        { type: 'listen', de: 'Entschuldigung!', tr: 'Affedersiniz!', tags: ['spelling'] },
        { type: 'listen', de: 'Ich verstehe nicht.', tr: 'Anlamıyorum.' },
        { type: 'speak', de: 'Entschuldigung, ich verstehe nicht.', tr: 'Affedersiniz, anlamıyorum.' },
        { type: 'speak', de: 'Schule, Sport, Straße', tr: 'okul, spor, cadde' },
        { type: 'cloze', de: 'Ich ___ nicht.', tr: 'Anlamıyorum.', answers: ['verstehe'] }
      ]
    },

    // ───────────────────────────── 0.5 ─────────────────────────────
    {
      id: 'u00.l5',
      title: 'ch, -ig, chs, r, h, ng, pf',
      kind: 'speak',
      intro: 'Almancanın en “Almanca” sesi: ch. İki türlü okunur; hangisinin geleceğini önündeki ünlü söyler. Bir de sondaki r’nin neredeyse “a” olduğunu öğreniyorsun.',
      words: [
        { id: 'w.langsam_bitte', de: 'Langsam, bitte.', pos: 'phr', tr: 'Yavaş, lütfen.', en: 'Slowly, please.',
          ex: { de: 'Ich verstehe nicht. Langsam, bitte.', tr: 'Anlamıyorum. Yavaş, lütfen.' },
          note: 'ng tek ses (İngilizce sing gibi): “lang-zam”, g ayrıca okunmaz.' }
      ],
      grammar: [
        {
          title: 'ch: ach-Laut ve ich-Laut',
          html: `<table>
<tr><th>Ne zaman?</th><th>Ses</th><th>Örnek</th></tr>
<tr><td><b>a, o, u, au</b>’dan sonra</td><td><b>ach-Laut</b>: gırtlaktan, hırıltılı sert “h”</td><td><i>acht, Nacht, Buch, auch</i></td></tr>
<tr><td>diğer her yerde (i, e, ä, ö, ü, ei, eu, l, n, r’den sonra; -chen)</td><td><b>ich-Laut</b>: ince, dilin ortasından</td><td><i>ich, nicht, Milch, Mädchen</i></td></tr>
</table>
<p><b>ich-Laut</b> için: “hiç” kelimesindeki h’yi daha ince ve sürtünmeli söyle; ya da “yi” deyip sesi fısılda. Ama <b>“iş”</b> veya <b>“ik”</b> deme: <i>Kirche</i> (kilise) ≠ <i>Kirsche</i> (kiraz)!</p>
<p>Aynı kelimede değişebilir: <i>Buch</i> (ach) → <i>Bücher</i> (ich).</p>
<p class="bridge en">🇬🇧 ach-Laut, İskoçça <i>loch</i> kelimesindeki ses gibi.</p>`
        },
        {
          title: '-ig = “iç”, chs = “ks”',
          html: `<p>Sondaki <b>-ig</b> = “iç” (ich-Laut): <i>zwanzig</i> “tsvantsiç”, <i>billig</i> (ucuz), <i>König</i> (kral). Güney Almanya ve Avusturya’da “-ik” de duyarsın; ikisi de doğru.</p>
<p><b>chs</b> = “ks”: <i>sechs</i> “zeks”, <i>Fuchs</i> (tilki) “fuks”.</p>`
        },
        {
          title: 'r: başta boğazdan, sonda “a”',
          html: `<p>Ünlüden önce r boğazdan, gargara yapar gibi: <i>rot, drei, Frau</i>. Türkçe dil ucu r’si de anlaşılır, merak etme.</p>
<p>Asıl önemli kural: <b>sonda ve -er’de r neredeyse “a”</b> olur:</p>
<p><i>hier</i> “hiia”, <i>Uhr</i> “uua”, <i>vier</i> “fiia”, <i>Vater</i> “fata”, <i>Mutter</i> “muta”.</p>
<p class="bridge en">🇬🇧 İngiliz İngilizcesindeki gibi: <i>teacher</i>, <i>water</i> sonundaki r okunmaz.</p>`
        },
        {
          title: 'h, ng, pf',
          html: `<p><b>h</b> başta okunur: <i>Hallo, Haus</i>. Ünlüden sonra <b>okunmaz</b>, ünlüyü uzatır: <i>Uhr, zehn, gehen</i>.</p>
<p><b>ng</b> tek ses, g ayrıca okunmaz: <i>lang, singen, Entschuldigung</i>. <b>nk</b> = ng + k: <i>danke</i> “dang-ke”.</p>
<p><b>pf</b>: p ve f birlikte, f’ye indirgeme: <i>Apfel</i> (elma), <i>Kopf</i> (baş).</p>
<p class="bridge en">🇬🇧 ng, İngilizce <i>sing, long</i> kelimelerindeki gibi.</p>`
        }
      ],
      culture: "Almanya'da resmi bir yerde adını söylerken memur genelde hemen yazmak ister. Hızlı konuşursa \"Langsam, bitte.\" de; bu kaba değil, tam tersine işini doğru yapmasına yardım edersin.",
      exercises: [
        { type: 'mcq', q: '“Buch” (kitap) kelimesindeki ch hangisi?', de: 'Buch',
          options: ['ach-Laut (gırtlaktan, sert)', 'ich-Laut (ince)'], answer: 0,
          explain: 'u’dan sonra ch gırtlaktan okunur: ach-Laut.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangisinde ince ch (ich-Laut) var?', options: ['acht', 'Nacht', 'Milch', 'Buch'], answer: 2,
          explain: 'Milch: l’den sonra ch → ich-Laut. Diğerlerinde a ya da u’dan sonra → ach-Laut.', tags: ['pron'] },
        { type: 'mcq', q: 'Hangi kelimeyi duydun?', de: 'Kirche', options: ['Kirche (kilise)', 'Kirsche (kiraz)'], answer: 0,
          explain: 'Kirche’de ince ch, Kirsche’de sch = “ş”. ich-Laut’u “ş” yapma!', tags: ['pron'] },
        { type: 'mcq', q: '“zwanzig” (yirmi) nasıl biter?', de: 'zwanzig', options: ['“-zig” (g ile)', '“-tsiç”'], answer: 1,
          explain: 'Sondaki -ig = “iç”; z = “ts”: “tsvantsiç”.', tags: ['pron', 'number'] },
        { type: 'mcq', q: '“sechs” nasıl okunur?', de: 'sechs', options: ['“seç”', '“zeks”', '“seçs”'], answer: 1,
          explain: 'Baştaki s = “z”, chs = “ks”: “zeks”.', tags: ['pron', 'number'] },
        { type: 'mcq', q: '“Uhr” (saat) kelimesinde h okunur mu?', de: 'Uhr',
          options: ['Evet: “uhr”', 'Hayır: h ünlüyü uzatır, r de “a” olur: “uua”'], answer: 1,
          explain: 'Ünlüden sonraki h sessizdir; sondaki r neredeyse “a”.', tags: ['pron'] },
        { type: 'match', pairs: [
            ['acht', 'sekiz'], ['sechs', 'altı'], ['danke', 'teşekkürler'], ['Apfel', 'elma'], ['Uhr', 'saat'], ['hier', 'burada']
          ], tags: ['vocab'] },
        { type: 'listen', de: 'Langsam, bitte.', tr: 'Yavaş, lütfen.' },
        { type: 'listen', de: 'acht', tr: '8', tags: ['number'] },
        { type: 'speak', de: 'ich, acht, sechs', tr: 'ben, sekiz, altı' },
        { type: 'speak', de: 'Ich verstehe nicht. Langsam, bitte.', tr: 'Anlamıyorum. Yavaş, lütfen.' },
        { type: 'type', q: 'Almanca yaz.', tr: 'Yavaş, lütfen.', answers: ['Langsam, bitte.', 'Bitte langsam.'] }
      ]
    },

    // ───────────────────────────── 0.6 ─────────────────────────────
    {
      id: 'u00.l6',
      title: 'Auslaut, Betonung, Melodie',
      kind: 'speak',
      intro: 'Son ders: kelime sonundaki sertleşme (Türkçeden tanıdık!), vurgu ve ses tonu. Sonunda bütün üniteyi karışık tekrar ediyorsun.',
      dialog: {
        title: "Bürgeramt'ta danışma",
        lines: [
          { s: 'Herr Braun', de: 'Guten Morgen! Ihr Name, bitte?', tr: 'Günaydın! Adınız, lütfen?' },
          { s: 'Selin', de: 'Guten Morgen! Özdemir. Selin Özdemir.', tr: 'Günaydın! Özdemir. Selin Özdemir.' },
          { s: 'Herr Braun', de: 'Wie schreibt man das?', tr: 'Nasıl yazılıyor?' },
          { s: 'Selin', de: 'Ö-Z-D-E-M-I-R.', tr: 'Ö-Z-D-E-M-I-R.' },
          { s: 'Herr Braun', de: 'Danke. Und die Hausnummer?', tr: 'Teşekkürler. Peki kapı numarası?' },
          { s: 'Selin', de: 'Sieben.', tr: 'Yedi.' },
          { s: 'Herr Braun', de: 'Sieben? Gut. Auf Wiedersehen, Frau Özdemir!', tr: 'Yedi mi? Tamam. Hoşça kalın Özdemir Hanım!' },
          { s: 'Selin', de: 'Danke! Auf Wiedersehen!', tr: 'Teşekkürler! Hoşça kalın!' }
        ]
      },
      grammar: [
        {
          title: 'Sonda sertleşme: b → p, d → t, g → k',
          html: `<p>Kelime (ya da hece) sonunda <b>b, d, g</b> sertleşir:</p>
<table>
<tr><th>Yazılış</th><th>Okunuş</th><th>Ama:</th></tr>
<tr><td><i>Tag</i></td><td>taak</td><td><i>Tage</i> “taage” (g)</td></tr>
<tr><td><i>Hund</i> (köpek)</td><td>hunt</td><td><i>Hunde</i> “hunde” (d)</td></tr>
<tr><td><i>und</i> (ve)</td><td>unt</td><td></td></tr>
<tr><td><i>gelb</i> (sarı)</td><td>gelp</td><td><i>gelbe</i> (b)</td></tr>
</table>
<p>Bu yüzden <i>Rad</i> (bisiklet) ve <i>Rat</i> (tavsiye) aynı okunur: “raat”. İstisna: sondaki <b>-ig</b> “iç” olur (zwanzig).</p>
<p class="bridge">🇹🇷 Türkçede de aynısı var: <b>kitap</b> → kita<b>b</b>ı, <b>ağaç</b> → ağa<b>c</b>ı. Sonda sert, ünlüden önce yumuşak. Bu kuralı zaten biliyorsun!</p>`
        },
        {
          title: 'Kelime vurgusu',
          html: `<p>Almanca kelimelerin çoğunda vurgu <b>ilk hecede</b>: <b>VA</b>ter, <b>MUT</b>ter, <b>DAN</b>ke, <b>BIT</b>te.</p>
<p><b>be-, ver-, ent-</b> ile başlayanlarda vurgu bu ekte değil, sonraki hecede: ver<b>STE</b>hen, ent<b>SCHUL</b>digung.</p>
<p>Yabancı kökenli kelimelerde genelde sonda: Stu<b>DENT</b>, Informa<b>TION</b>, Mu<b>SIK</b>.</p>
<p class="bridge">🇹🇷 Türkçede vurgu çoğu zaman sondadır (araBA). Almanca kelimelerde bunu taşıma: “faTER” değil, “<b>FA</b>ter”.</p>`
        },
        {
          title: 'Ses tonu: soru mu, cümle mi?',
          html: `<ul>
<li>Düz cümle: ses sonda <b>alçalır ↘</b> — <i>Ich verstehe nicht.</i></li>
<li>W-sorusu (wie, was, wo …): genelde <b>alçalır ↘</b> — <i>Wie ist Ihr Name?</i></li>
<li>Evet/hayır sorusu: ses sonda <b>yükselir ↗</b> — <i>Sieben?</i> <i>Sprechen Sie Deutsch?</i></li>
</ul>
<p><b>Name? ↗</b> (“Adınız?”) ↔ <b>Name. ↘</b> (bilgi veriyorsun)</p>
<p class="bridge">🇹🇷 Türkçede soruyu “mi” eki gösterir; Almancada böyle bir ek yok. Soruyu ses tonu ve fiilin başa gelmesi gösterir.</p>`
        }
      ],
      culture: "Kuzey Almanya'da (Hamburg, Bremen, Kiel) günün her saatinde \"Moin!\" ya da \"Moin moin!\" diye selamlaşılır, sabah olması gerekmez. Telefonda vedalaşırken de \"Auf Wiedersehen\" yerine \"Auf Wiederhören!\" (tekrar duyuşmak üzere) denir.",
      exercises: [
        { type: 'mcq', q: '“Tag” kelimesinin sonu nasıl okunur?', de: 'Tag', options: ['“g”', '“k”'], answer: 1,
          explain: 'Sonda g → k: “taak”. Türkçedeki kitap/kitabı kuralı gibi.', tags: ['pron'] },
        { type: 'mcq', q: '“Hund” (köpek) nasıl okunur?', de: 'Hund', options: ['“hund”', '“hunt”'], answer: 1,
          explain: 'Sonda d → t: “hunt”. Çoğulda (Hunde) ünlüden önce d geri gelir.', tags: ['pron'] },
        { type: 'mcq', q: '“Rad” (bisiklet) ve “Rat” (tavsiye) nasıl okunur?', de: 'Rad, Rat', options: ['Aynı', 'Farklı'], answer: 0,
          explain: 'Sondaki d sertleşip t olur: ikisi de “raat”. Anlamı bağlamdan anlarsın.', tags: ['pron'] },
        { type: 'mcq', q: '“verstehen” kelimesinde vurgu hangi hecede?', de: 'verstehen',
          options: ['VER-ste-hen', 'ver-STE-hen', 'ver-ste-HEN'], answer: 1,
          explain: 'ver- vurgusuzdur; vurgu kökte: ver-STE-hen.', tags: ['pron'] },
        { type: 'mcq', q: '“Student” kelimesinde vurgu hangi hecede?', de: 'Student',
          options: ['STU-dent', 'stu-DENT'], answer: 1,
          explain: 'Yabancı kökenli kelimelerde vurgu genelde sonda: stu-DENT.', tags: ['pron'] },
        { type: 'mcq', q: 'Evet/hayır sorusunda ses sonda ne olur?', options: ['Yükselir ↗', 'Alçalır ↘'], answer: 0,
          explain: 'Evet/hayır sorusu yükselir: Sprechen Sie Deutsch? ↗', tags: ['question'] },
        { type: 'mcq', q: 'Dinle: bu bir soru mu?', de: 'Sieben?',
          options: ['Evet, soru (ses yükseliyor ↗)', 'Hayır, düz cümle (ses alçalıyor ↘)'], answer: 0,
          explain: 'Tek kelime bile yükselen tonla soru olur: Sieben? ↗ = “Yedi mi?”', tags: ['question'] },
        { type: 'match', pairs: [
            ['Wie bitte?', 'Efendim? / Anlamadım?'],
            ['Langsam, bitte.', 'Yavaş, lütfen.'],
            ['Ich verstehe nicht.', 'Anlamıyorum.'],
            ['Entschuldigung!', 'Affedersiniz!'],
            ['Wie schreibt man das?', 'Bu nasıl yazılır?']
          ], tags: ['vocab'] },
        { type: 'listen', de: 'Guten Tag! Wie ist Ihr Name?', tr: 'İyi günler! Adınız nedir?' },
        { type: 'listen', de: 'drei, sieben, zehn', tr: '3, 7, 10', tags: ['number'] },
        { type: 'speak', de: 'Tag, Hund, und', tr: 'gün, köpek, ve' },
        { type: 'type', q: 'Almanca yaz.', tr: 'Anlamıyorum. Yavaş, lütfen.',
          answers: ['Ich verstehe nicht. Langsam, bitte.', 'Ich verstehe nicht. Bitte langsam.'] }
      ]
    }
  ]
});
