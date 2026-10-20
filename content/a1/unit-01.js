// A1 · Ünite 1 — Hallo! Ich bin … (Merhaba! Ben …)
// Kapsam: kendini tanıtma (isim, köken, ikamet, diller), başkasına sorma, du/Sie, anlamadığını söyleme.
// Gramer: G02 kişi zamirleri, G03 sein, G04 V2, G05 W-Fragen, G06 Präsens (heißen, kommen, wohnen, sprechen, lernen).
// Ünite 0'da tanımlı kelimeler (w.hallo, w.danke, w.wie_bitte, w.ich_verstehe_nicht, w.langsam_bitte,
// w.wie_schreibt_man_das, w.entschuldigung, sayılar …) burada tekrar tanımlanmaz, sadece kullanılır.
DE.content.registerUnit({
  id: "u01",
  order: 1,
  level: "A1.1",
  title: "Hallo! Ich bin …",
  titleTr: "Merhaba! Ben …",
  goals: [
    "Kendimi tanıtabilirim: adım, nereli olduğum, nerede oturduğum ve hangi dilleri konuştuğum.",
    "Birine adını, nereli olduğunu ve nerede oturduğunu sorabilirim.",
    "du ile Sie arasındaki farkı bilir, duruma göre doğru hitabı seçebilirim.",
    "Anlamadığımda bunu söyleyebilir, adımı harf harf kodlayabilirim.",
    "Kurs için kısa bir tanıtım metni yazabilirim."
  ],
  lessons: [

    // ───────────────────────────── DERS 1 ─────────────────────────────
    {
      id: "u01.l1",
      title: "Wörter: Länder und Sprachen",
      kind: "words",
      intro: "Bu derste ülke ve dil adlarını, bir de “nerelisin?” sorusunu öğreniyorsun. Hedef: “Ich komme aus der Türkei.” cümlesini rahatça kurmak.",
      words: [
        { id: "w.ich", de: "ich", pos: "pron", tr: "ben", en: "I",
          ex: { de: "Ich komme aus der Türkei.", tr: "Türkiye'denim." },
          note: "Cümle başında değilse küçük harfle yazılır (İngilizce “I” gibi büyük değil)." },
        { id: "w.du", de: "du", pos: "pron", tr: "sen", en: "you (informal)",
          ex: { de: "Woher kommst du?", tr: "Nerelisin?" },
          note: "Arkadaş, aile, çocuk, kurs arkadaşı için." },
        { id: "w.kommen", de: "kommen", pos: "v", tr: "gelmek", en: "to come",
          ex: { de: "Ich komme aus Izmir.", tr: "İzmirliyim. (İzmir'den geliyorum.)" },
          note: "ich komme · du kommst · er/sie kommt · Sie kommen. kommen aus … = …'li olmak." },
        { id: "w.aus", de: "aus", pos: "prep", tr: "-den/-dan (köken)", en: "from",
          ex: { de: "Ich komme aus Deutschland.", tr: "Almanya'danım." } },
        { id: "w.woher", de: "woher", pos: "q", tr: "nereden", en: "where … from",
          ex: { de: "Woher kommst du?", tr: "Nerelisin? (Nereden geliyorsun?)" },
          note: "wo = nerede, woher = nereden. Türkçeyle birebir!" },
        { id: "w.deutschland", de: "Deutschland", pos: "n", art: "das", artQuiz: false, pl: "-", tr: "Almanya", en: "Germany",
          ex: { de: "Ich komme aus Deutschland.", tr: "Almanya'danım." },
          note: "Artikelsiz kullanılır: aus Deutschland, in Deutschland." },
        { id: "w.tuerkei", de: "Türkei", pos: "n", art: "die", pl: "-", tr: "Türkiye", en: "Turkey (Türkiye)",
          ex: { de: "Ich komme aus der Türkei.", tr: "Türkiye'denim." },
          note: "Hep artikelle: die Türkei → aus der Türkei, in der Türkei." },
        { id: "w.oesterreich", de: "Österreich", pos: "n", art: "das", artQuiz: false, pl: "-", tr: "Avusturya", en: "Austria",
          ex: { de: "Ich komme aus Österreich.", tr: "Avusturyalıyım." },
          note: "Avusturya'da da Almanca konuşulur. Artikelsiz: aus Österreich." },
        { id: "w.schweiz", de: "Schweiz", pos: "n", art: "die", pl: "-", tr: "İsviçre", en: "Switzerland",
          ex: { de: "Ich komme aus der Schweiz.", tr: "İsviçreliyim." },
          note: "Türkei gibi artikelle: aus der Schweiz, in der Schweiz." },
        { id: "w.land", de: "Land", pos: "n", art: "das", pl: "Länder", tr: "ülke", en: "country",
          ex: { de: "Land: Türkei", tr: "Ülke: Türkiye" },
          note: "Formlarda sık görürsün." },
        { id: "w.stadt", de: "Stadt", pos: "n", art: "die", pl: "Städte", tr: "şehir", en: "city, town",
          ex: { de: "Stadt: Köln", tr: "Şehir: Köln" } },
        { id: "w.sprache", de: "Sprache", pos: "n", art: "die", pl: "Sprachen", tr: "dil (lisan)", en: "language",
          ex: { de: "Sprachen: Türkisch, Englisch", tr: "Diller: Türkçe, İngilizce" } },
        { id: "w.sprechen", de: "sprechen", pos: "v", tr: "konuşmak", en: "to speak",
          ex: { de: "Ich spreche Türkisch.", tr: "Türkçe konuşuyorum." },
          note: "Dikkat: du sprichst, er/sie spricht (e → i). ich spreche, Sie sprechen normal." },
        { id: "w.tuerkisch", de: "Türkisch", pos: "n", art: "das", artQuiz: false, pl: "-", tr: "Türkçe", en: "Turkish (language)",
          ex: { de: "Ich spreche Türkisch.", tr: "Türkçe konuşuyorum." },
          note: "Dil adları büyük harfle yazılır ve genelde artikelsiz kullanılır. Türkei = ülke, Türkisch = dil." },
        { id: "w.deutsch", de: "Deutsch", pos: "n", art: "das", artQuiz: false, pl: "-", tr: "Almanca", en: "German (language)",
          ex: { de: "Ich spreche Deutsch.", tr: "Almanca konuşuyorum." },
          note: "Deutschland = ülke, Deutsch = dil." },
        { id: "w.englisch", de: "Englisch", pos: "n", art: "das", artQuiz: false, pl: "-", tr: "İngilizce", en: "English (language)",
          ex: { de: "Ich spreche Englisch.", tr: "İngilizce konuşuyorum." } }
      ],
      grammar: [
        {
          title: "Nerelisin? — Ich komme aus …",
          html:
            "<p>Nereli olduğunu söylemek için: <b>Ich komme aus …</b> (…'den geliyorum).</p>" +
            "<table><tr><th>Ülke</th><th>Nerelisin?</th><th>Dil</th></tr>" +
            "<tr><td>Deutschland</td><td>Ich komme aus Deutschland.</td><td>Deutsch</td></tr>" +
            "<tr><td><span class=\"die\">die</span> Türkei</td><td>Ich komme aus <b>der</b> Türkei.</td><td>Türkisch</td></tr>" +
            "<tr><td>Österreich</td><td>Ich komme aus Österreich.</td><td>Deutsch</td></tr>" +
            "<tr><td><span class=\"die\">die</span> Schweiz</td><td>Ich komme aus <b>der</b> Schweiz.</td><td>Deutsch (ve başka diller)</td></tr></table>" +
            "<p>Çoğu ülke artikelsiz kullanılır. Ama <b>die Türkei</b> ve <b>die Schweiz</b> artikelle: <b>aus der Türkei</b>. Bunu şimdilik kalıp olarak ezberle.</p>" +
            "<p class=\"bridge\">🇹🇷 Türkçede “Türkiye'den<b>im</b>” tek kelime. Almancada her şey ayrı: Ich (ben) komme (geliyorum) aus (-den) der Türkei (Türkiye).</p>" +
            "<p class=\"bridge en\">🇬🇧 I come from Turkey = Ich komme aus der Türkei. aus = from.</p>"
        },
        {
          title: "Dil adları",
          html:
            "<p>Dil adları <b>büyük harfle</b> yazılır: <b>Türkisch, Deutsch, Englisch</b>.</p>" +
            "<p><b>Ich spreche</b> Türkisch. · <b>Du sprichst</b> Deutsch. (sen formunda e → i olur!)</p>" +
            "<p class=\"bridge en\">🇬🇧 İngilizcede de dil adları büyük: English, German, Turkish. Almancada ise <i>tüm</i> isimler büyük harfle başlar.</p>"
        }
      ],
      culture: "Almanca sadece Almanya'da değil, Avusturya'da ve İsviçre'nin büyük bölümünde de konuşulur. Bu üç ülkeye kısaca D-A-CH denir (Deutschland, Austria, Confoederatio Helvetica). Avusturya'da selam “Grüß Gott!”, İsviçre'de “Grüezi!” duyabilirsin.",
      exercises: [
        { type: "match", pairs: [["Deutschland", "Almanya"], ["die Türkei", "Türkiye"], ["Österreich", "Avusturya"], ["die Schweiz", "İsviçre"]],
          explain: "D-A-CH: Deutschland, Österreich, die Schweiz. Türkei ve Schweiz artikelle kullanılır.", tags: ["vocab"] },
        { type: "match", pairs: [["Türkisch", "Türkçe"], ["Deutsch", "Almanca"], ["Englisch", "İngilizce"], ["die Sprache", "dil"], ["das Land", "ülke"]],
          explain: "Ülke ≠ dil: Deutschland (ülke) → Deutsch (dil), Türkei (ülke) → Türkisch (dil).", tags: ["vocab"] },
        { type: "article", word: "w.tuerkei",
          explain: "die Türkei — bu yüzden “aus der Türkei” diyoruz.", tags: ["article"] },
        { type: "article", word: "w.sprache",
          explain: "die Sprache. -e ile biten isimlerin çoğu die'dir.", tags: ["article"] },
        { type: "article", word: "w.land",
          explain: "das Land (çoğul: die Länder).", tags: ["article"] },
        { type: "mcq", q: "“Türkiye'denim.” Almancası hangisi?",
          options: ["Ich komme aus Türkei.", "Ich komme aus der Türkei.", "Ich komme aus die Türkei."], answer: 1,
          explain: "Türkei artikelli bir ülke: die Türkei. “aus” ile birlikte “aus der Türkei” olur. Şimdilik kalıp olarak ezberle.", tags: ["article"] },
        { type: "mcq", q: "“Almanca” (dil) hangisi?",
          options: ["Deutschland", "Deutsch", "Österreich"], answer: 1,
          explain: "Deutschland = Almanya (ülke). Deutsch = Almanca (dil). Türkei / Türkisch ikilisi gibi.", tags: ["vocab"] },
        { type: "cloze", de: "Ich komme ___ Deutschland.", tr: "Almanya'danım.", answers: ["aus"],
          explain: "Köken için “aus” kullanılır: aus Deutschland = Almanya'dan (İngilizce: from).", tags: ["vocab"] },
        { type: "mcq", q: "“woher” ne demek?", de: "Woher kommst du?",
          options: ["nerede", "nereden", "ne zaman"], answer: 1,
          explain: "woher = nereden. “Woher kommst du?” = Nerelisin? (Nereden geliyorsun?)", tags: ["question"] },
        { type: "type", tr: "Türkçe konuşuyorum.", answers: ["Ich spreche Türkisch."],
          explain: "ich → spreche. Dil adı büyük harfle: Türkisch (Türkei değil, o ülke!).", tags: ["verb.conj", "vocab"] },
        { type: "order", tr: "Türkiye'denim.", answer: "Ich komme aus der Türkei.", extra: ["die"],
          explain: "Ich (1) komme (2) aus der Türkei. “aus” ile birlikte die → der olur.", tags: ["word_order", "article"] },
        { type: "listen", de: "Ich komme aus Österreich.", tr: "Avusturyalıyım.",
          explain: "Österreich: ö sesi Türkçedeki ö gibi; sondaki -reich “rayh” gibi okunur.", tags: ["spelling"] }
      ]
    },

    // ───────────────────────────── DERS 2 ─────────────────────────────
    {
      id: "u01.l2",
      title: "Dialog: Der erste Kurstag",
      kind: "dialog",
      intro: "Elif, Köln'de entegrasyon kursunun ilk gününde. Önce diyaloğu dinle, sonra soruları cevapla. du ile Sie arasındaki farka dikkat et!",
      dialog: {
        title: "Kursta ilk gün",
        lines: [
          { s: "Jonas", de: "Hallo! Ich bin Jonas. Und wer bist du?", tr: "Merhaba! Ben Jonas. Ya sen kimsin?" },
          { s: "Elif", de: "Hallo, Jonas! Ich heiße Elif.", tr: "Merhaba Jonas! Benim adım Elif." },
          { s: "Jonas", de: "Freut mich, Elif. Woher kommst du?", tr: "Memnun oldum Elif. Nerelisin?" },
          { s: "Elif", de: "Ich komme aus der Türkei, aus Izmir. Und du?", tr: "Türkiye'denim, İzmir'den. Ya sen?" },
          { s: "Jonas", de: "Ich komme aus Litauen.", tr: "Ben Litvanya'danım." },
          { s: "Elif", de: "Wie bitte? Woher?", tr: "Efendim? Nereden?" },
          { s: "Jonas", de: "Aus Litauen. L, I, T, A, U, E, N.", tr: "Litvanya'dan. L, İ, T, A, U, E, N." },
          { s: "Elif", de: "Ah, danke! Und wo wohnst du jetzt?", tr: "Ha, teşekkürler! Peki şimdi nerede oturuyorsun?" },
          { s: "Jonas", de: "Ich wohne in Köln.", tr: "Köln'de oturuyorum." },
          { s: "Elif", de: "Ich auch!", tr: "Ben de!" },
          { s: "Jonas", de: "Ich spreche Litauisch, Englisch und ein bisschen Deutsch. Und du?", tr: "Litvanca, İngilizce ve biraz Almanca konuşuyorum. Ya sen?" },
          { s: "Elif", de: "Türkisch und Englisch. Und Deutsch lerne ich jetzt!", tr: "Türkçe ve İngilizce. Almancayı da şimdi öğreniyorum!" },
          { s: "Frau Becker", de: "Guten Morgen! Ich bin Frau Becker. Wie heißen Sie?", tr: "Günaydın! Ben Becker Hanım (öğretmen). Adınız ne?" },
          { s: "Elif", de: "Guten Morgen, Frau Becker! Ich heiße Elif Kaya.", tr: "Günaydın Becker Hanım! Adım Elif Kaya." },
          { s: "Frau Becker", de: "Woher kommen Sie, Frau Kaya?", tr: "Nerelisiniz, Kaya Hanım?" },
          { s: "Elif", de: "Aus der Türkei.", tr: "Türkiye'den." },
          { s: "Frau Becker", de: "Freut mich, Frau Kaya.", tr: "Memnun oldum, Kaya Hanım." }
        ]
      },
      words: [
        { id: "w.wer", de: "wer", pos: "q", tr: "kim", en: "who",
          ex: { de: "Wer bist du?", tr: "Sen kimsin?" },
          ff: "Sahte arkadaş! wer = who (kim). “where” DEĞİL — “nerede” Almancada wo." },
        { id: "w.wie", de: "wie", pos: "q", tr: "nasıl; (ad sorarken) ne", en: "how",
          ex: { de: "Wie heißt du?", tr: "Adın ne? (Nasıl adlandırılıyorsun?)" },
          note: "Ad sorarken Türkçede “ne”, Almancada “wie” kullanılır." },
        { id: "w.heissen", de: "heißen", pos: "v", tr: "adı … olmak", en: "to be called",
          ex: { de: "Ich heiße Elif.", tr: "Benim adım Elif." },
          note: "ich heiße · du heißt · er/sie heißt · Sie heißen. du heißt (heißst DEĞİL)." },
        { id: "w.wohnen", de: "wohnen", pos: "v", tr: "oturmak, ikamet etmek", en: "to live (reside)",
          ex: { de: "Ich wohne in Köln.", tr: "Köln'de oturuyorum." },
          note: "ich wohne · du wohnst · er/sie wohnt · Sie wohnen." },
        { id: "w.in", de: "in", pos: "prep", tr: "-de/-da (yer); içinde", en: "in",
          ex: { de: "Ich wohne in Köln.", tr: "Köln'de oturuyorum." } },
        { id: "w.wo", de: "wo", pos: "q", tr: "nerede", en: "where",
          ex: { de: "Wo wohnst du?", tr: "Nerede oturuyorsun?" },
          ff: "wo = where (nerede). İngilizce “who” ile karıştırma; “kim” = wer." },
        { id: "w.jetzt", de: "jetzt", pos: "adv", tr: "şimdi, artık", en: "now",
          ex: { de: "Ich wohne jetzt in Köln.", tr: "Şimdi Köln'de oturuyorum." } },
        { id: "w.lernen", de: "lernen", pos: "v", tr: "öğrenmek", en: "to learn",
          ex: { de: "Ich lerne Deutsch.", tr: "Almanca öğreniyorum." },
          note: "ich lerne · du lernst · er/sie lernt · Sie lernen." },
        { id: "w.und", de: "und", pos: "conj", tr: "ve", en: "and",
          ex: { de: "Und du?", tr: "Ya sen?" },
          note: "“Und du?” / “Und Sie?” = “Ya sen?” / “Ya siz?”" },
        { id: "w.auch", de: "auch", pos: "adv", tr: "de/da (dahi)", en: "also, too",
          ex: { de: "Ich wohne auch in Köln.", tr: "Ben de Köln'de oturuyorum." },
          note: "“Ich auch!” = “Ben de!”" },
        { id: "w.ein_bisschen", de: "ein bisschen", pos: "phr", tr: "biraz", en: "a little",
          ex: { de: "Ich spreche ein bisschen Deutsch.", tr: "Biraz Almanca konuşuyorum." } },
        { id: "w.freut_mich", de: "Freut mich!", pos: "phr", tr: "Memnun oldum!", en: "Nice to meet you!",
          ex: { de: "Freut mich, Frau Becker.", tr: "Memnun oldum, Becker Hanım." },
          note: "Hem du hem Sie ile kullanılır. Cevap: “Freut mich auch!” (Ben de memnun oldum)." },
        { id: "w.frau", de: "Frau", pos: "n", art: "die", pl: "Frauen", tr: "kadın; Hanım (hitap)", en: "woman; Mrs./Ms.",
          ex: { de: "Guten Morgen, Frau Becker!", tr: "Günaydın, Becker Hanım!" },
          note: "Hitapta soyadıyla kullanılır: Frau Becker (Türkçede ön adla: Ayşe Hanım)." },
        { id: "w.herr", de: "Herr", pos: "n", art: "der", pl: "Herren", tr: "bay; Bey (hitap)", en: "Mr.; gentleman",
          ex: { de: "Guten Tag, Herr Schulz!", tr: "İyi günler, Schulz Bey!" },
          note: "Herr + SOYADI: Herr Schulz. Ön adla (Herr Jonas) söylenmez." }
      ],
      grammar: [
        {
          title: "du mu, Sie mi?",
          html:
            "<table><tr><th>du (sen)</th><th>Sie (siz, resmi)</th></tr>" +
            "<tr><td>Wie heißt du?</td><td>Wie heißen Sie?</td></tr>" +
            "<tr><td>Woher kommst du?</td><td>Woher kommen Sie?</td></tr>" +
            "<tr><td>Wo wohnst du?</td><td>Wo wohnen Sie?</td></tr></table>" +
            "<p><b>du</b>: arkadaş, aile, çocuk, kurs arkadaşı. <b>Sie</b>: öğretmen, memur, doktor, tanımadığın yetişkin. <b>Sie</b> her zaman büyük S ile yazılır.</p>" +
            "<p class=\"bridge\">🇹🇷 Türkçedeki sen/siz farkının aynısı! Emin değilsen <b>Sie</b> de. Frau/Herr + soyadı kullanıyorsan → Sie.</p>" +
            "<p class=\"bridge en\">🇬🇧 İngilizcede sadece “you” var; Almancada ise du/Sie ayrımı önemli.</p>"
        }
      ],
      culture: "Entegrasyon kursunda (Integrationskurs) kursiyerler birbirine genelde du der. Öğretmene ise çoğunlukla Sie ve “Frau/Herr + soyadı” ile hitap edilir; öğretmen ad ve du önerirse sen de du diyebilirsin.",
      exercises: [
        { type: "mcq", q: "Elif nereli?", de: "Ich komme aus der Türkei, aus Izmir.",
          options: ["Almanya", "Türkiye", "Litvanya"], answer: 1,
          explain: "“aus der Türkei, aus Izmir” = Türkiye'den, İzmir'den.", tags: ["vocab"] },
        { type: "mcq", q: "Jonas şimdi nerede oturuyor?", de: "Ich wohne in Köln.",
          options: ["Köln'de", "İzmir'de", "Litvanya'da"], answer: 0,
          explain: "wohnen in … = …'de oturmak. Jonas Litvanyalı (kommen aus), ama Köln'de oturuyor (wohnen in).", tags: ["vocab"] },
        { type: "mcq", q: "Jonas hangi dilleri konuşuyor?", de: "Ich spreche Litauisch, Englisch und ein bisschen Deutsch.",
          options: ["Litvanca, İngilizce ve biraz Almanca", "Sadece Almanca", "Türkçe ve İngilizce"], answer: 0,
          explain: "ein bisschen = biraz. und = ve.", tags: ["vocab"] },
        { type: "mcq", q: "Frau Becker, Elif'e neden “Sie” diyor?",
          options: ["Elif çocuk olduğu için", "Öğretmen–kursiyer ilişkisi resmi olduğu için", "Elif Türk olduğu için"], answer: 1,
          explain: "Resmi ilişkide Sie kullanılır ve hitap “Frau Kaya” olur. Kursiyerler (Elif–Jonas) arasında ise du.", tags: ["formal"] },
        { type: "mcq", q: "“wer” ne demek?", de: "Wer bist du?",
          options: ["nerede (where)", "kim (who)", "ne (what)"], answer: 1,
          explain: "Tuzak! wer = who = kim. “Nerede” = wo. İngilizce “where” ile karıştırma.", tags: ["question", "vocab"] },
        { type: "cloze", de: "Hallo, Elif! Woher ___ du?", tr: "Merhaba Elif! Nerelisin?", answers: ["kommst"], hint: "kommen",
          explain: "du → -st: du kommst. (ich komme, du kommst)", tags: ["verb.conj"] },
        { type: "cloze", de: "Und wo ___ du jetzt?", tr: "Peki şimdi nerede oturuyorsun?", answers: ["wohnst"], hint: "wohnen",
          explain: "du → -st: du wohnst.", tags: ["verb.conj"] },
        { type: "match", pairs: [["Freut mich!", "Memnun oldum!"], ["Und du?", "Ya sen?"], ["Ich auch!", "Ben de!"], ["Wie bitte?", "Efendim? / Pardon?"], ["ein bisschen", "biraz"]],
          explain: "Bu kalıpları bütün olarak ezberle; günlük konuşmada çok sık geçer.", tags: ["vocab"] },
        { type: "order", tr: "Nerelisin?", answer: "Woher kommst du?", extra: ["wo"],
          explain: "Soru kelimesi başta, fiil 2. sırada: Woher (1) kommst (2) du? “wo” = nerede, burada “woher” (nereden) lazım.", tags: ["word_order", "question"] },
        { type: "type", q: "Resmi sor:", tr: "Adınız ne?", answers: ["Wie heißen Sie?"],
          explain: "Resmi → Sie, fiil -en ile biter: Wie heißen Sie? (Samimi olsaydı: Wie heißt du?)", tags: ["formal", "question"] },
        { type: "listen", de: "Ich wohne in Köln.", tr: "Köln'de oturuyorum.",
          explain: "wohnen: “h” okunmaz, sadece o sesini uzatır: [vo:nə].", tags: ["spelling"] },
        { type: "speak", de: "Freut mich, Frau Becker.", tr: "Memnun oldum, Becker Hanım.",
          explain: "Freut: “eu” = [oy] gibi okunur → “froyt”." }
      ]
    },

    // ───────────────────────────── DERS 3 ─────────────────────────────
    {
      id: "u01.l3",
      title: "Grammatik: ich, du, er … und sein",
      kind: "grammar",
      intro: "Kişi zamirlerini ve en önemli fiil olan “sein” (olmak) fiilini öğreniyorsun. Türkçede “-im, -sin” eki ne yapıyorsa Almancada sein onu yapar.",
      words: [
        { id: "w.sein", de: "sein", pos: "v", tr: "olmak (-im, -sin, -dir)", en: "to be",
          ex: { de: "Ich bin Elif.", tr: "Ben Elif'im." },
          note: "Düzensiz: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind." },
        { id: "w.er", de: "er", pos: "pron", tr: "o (erkek)", en: "he",
          ex: { de: "Jonas ist neu hier. Er ist aus Litauen.", tr: "Jonas burada yeni. O Litvanyalı." } },
        { id: "w.sie_sg", de: "sie", pos: "pron", tr: "o (kadın)", en: "she",
          ex: { de: "Elif ist neu hier. Sie ist aus Izmir.", tr: "Elif burada yeni. O İzmirli." },
          note: "Fiil tekil: sie ist. Cümle başında büyük yazılır (Sie ist …) — fiile bakarak anlarsın." },
        { id: "w.es", de: "es", pos: "pron", tr: "o (nötr, das-kelimeler için)", en: "it",
          note: "das-kelimeler için: das Land → es. Türkçede tek “o” var, Almancada üç: er, sie, es." },
        { id: "w.wir", de: "wir", pos: "pron", tr: "biz", en: "we",
          ex: { de: "Wir sind neu hier.", tr: "Biz burada yeniyiz." } },
        { id: "w.ihr", de: "ihr", pos: "pron", tr: "siz (samimi, birden çok kişi)", en: "you (plural, informal)",
          ex: { de: "Ihr seid neu hier.", tr: "Siz burada yenisiniz." },
          note: "Birden çok arkadaşa: ihr. Tek kişiye resmi: Sie." },
        { id: "w.sie_pl", de: "sie", pos: "pron", tr: "onlar", en: "they",
          ex: { de: "Elif und Jonas sind neu hier. Sie lernen Deutsch.", tr: "Elif ve Jonas burada yeni. Onlar Almanca öğreniyor." },
          note: "Fiil çoğul: sie sind, sie lernen." },
        { id: "w.sie_formal", de: "Sie", pos: "pron", tr: "siz (resmi; bir veya çok kişi)", en: "you (formal)",
          ex: { de: "Wie heißen Sie?", tr: "Adınız ne?" },
          note: "Her zaman büyük S. Fiil “onlar” ile aynı: Sie sind, Sie heißen." },
        { id: "w.muede", de: "müde", pos: "adj", tr: "yorgun", en: "tired",
          ex: { de: "Ich bin müde.", tr: "Yorgunum." } },
        { id: "w.neu", de: "neu", pos: "adj", tr: "yeni", en: "new",
          ex: { de: "Ich bin neu hier.", tr: "Burada yeniyim." } },
        { id: "w.hier", de: "hier", pos: "adv", tr: "burada, burası", en: "here",
          ex: { de: "Ich bin neu hier.", tr: "Burada yeniyim." } }
      ],
      grammar: [
        {
          title: "Kişi zamirleri",
          html:
            "<table><tr><th>Almanca</th><th>Türkçe</th><th>Almanca</th><th>Türkçe</th></tr>" +
            "<tr><td>ich</td><td>ben</td><td>wir</td><td>biz</td></tr>" +
            "<tr><td>du</td><td>sen</td><td>ihr</td><td>siz (samimi)</td></tr>" +
            "<tr><td>er / sie / es</td><td>o (erkek / kadın / nötr)</td><td>sie</td><td>onlar</td></tr>" +
            "<tr><td colspan=\"2\"></td><td><b>Sie</b></td><td>siz (resmi)</td></tr></table>" +
            "<p class=\"bridge\">🇹🇷 Türkçede tek bir “o” var; Almancada üç tane: <b>er</b> (erkek), <b>sie</b> (kadın), <b>es</b> (nötr).</p>" +
            "<p>Üç farklı “sie”: <b>sie ist</b> = o (kadın) · <b>sie sind</b> = onlar · <b>Sie sind</b> = siz (resmi, büyük S). İpucu: fiile bak!</p>"
        },
        {
          title: "sein (olmak)",
          html:
            "<table><tr><th>Kişi</th><th>sein</th><th>Örnek</th></tr>" +
            "<tr><td>ich</td><td><b>bin</b></td><td>Ich bin müde.</td></tr>" +
            "<tr><td>du</td><td><b>bist</b></td><td>Du bist neu hier.</td></tr>" +
            "<tr><td>er / sie / es</td><td><b>ist</b></td><td>Sie ist aus Izmir.</td></tr>" +
            "<tr><td>wir</td><td><b>sind</b></td><td>Wir sind in Köln.</td></tr>" +
            "<tr><td>ihr</td><td><b>seid</b></td><td>Ihr seid neu hier.</td></tr>" +
            "<tr><td>sie / Sie</td><td><b>sind</b></td><td>Sie sind neu hier.</td></tr></table>" +
            "<p class=\"bridge\">🇹🇷 Yorgun<b>um</b> = Ich <b>bin</b> müde. Türkçede “-um” bir ek; Almancada ayrı bir fiil ŞART. “Ich müde” yanlış!</p>" +
            "<p class=\"bridge en\">🇬🇧 I am = ich bin, you are = du bist, he/she is = er/sie ist, we are = wir sind.</p>"
        }
      ],
      exercises: [
        { type: "cloze", de: "Hallo! Ich ___ Elif.", tr: "Merhaba! Ben Elif.", answers: ["bin"], hint: "sein",
          explain: "ich → bin (I am). Türkçede “Ben Elif'im” derken ek var; Almancada fiil gerekir.", tags: ["sein"] },
        { type: "cloze", de: "Du ___ neu hier.", tr: "Sen burada yenisin.", answers: ["bist"], hint: "sein",
          explain: "du → bist (you are).", tags: ["sein"] },
        { type: "cloze", de: "Jonas ___ müde.", tr: "Jonas yorgun.", answers: ["ist"], hint: "sein",
          explain: "Jonas = er (o) → ist (he is).", tags: ["sein"] },
        { type: "cloze", de: "Wir ___ neu hier.", tr: "Biz burada yeniyiz.", answers: ["sind"], hint: "sein",
          explain: "wir → sind (we are).", tags: ["sein"] },
        { type: "cloze", de: "Ihr ___ in Köln.", tr: "Siz (arkadaşlar) Köln'desiniz.", answers: ["seid"], hint: "sein",
          explain: "ihr → seid (sonda d). Birden çok arkadaşa “siz” derken ihr kullanılır.", tags: ["sein"] },
        { type: "cloze", de: "Elif und Jonas ___ hier.", tr: "Elif ve Jonas burada.", answers: ["sind"], hint: "sein",
          explain: "Elif und Jonas = sie (onlar) → sind.", tags: ["sein"] },
        { type: "mcq", q: "“Sie ist aus Izmir.” — Burada “Sie” kim?",
          options: ["o (kadın)", "siz (resmi)", "onlar"], answer: 0,
          explain: "Fiile bak: “ist” tekil → o (kadın). Cümle başında olduğu için büyük yazıldı. Siz veya onlar olsaydı “sind” olurdu.", tags: ["pron"] },
        { type: "mcq", q: "Birden çok arkadaşına “Siz burada yenisiniz” diyorsun. Hangisi?",
          options: ["Ihr seid neu hier.", "Sie ist neu hier.", "Du bist neu hier."], answer: 0,
          explain: "Birden çok kişiye samimi hitap: ihr → seid. Tek kişiye resmi olsaydı: Sie sind neu hier.", tags: ["pron", "sein"] },
        { type: "match", pairs: [["ich", "ben"], ["du", "sen"], ["er", "o (erkek)"], ["wir", "biz"], ["ihr", "siz (samimi)"], ["Sie", "siz (resmi)"]],
          explain: "Resmi Sie hep büyük S ile; samimi çoğul “siz” ise ihr.", tags: ["pron"] },
        { type: "type", tr: "Yorgunum.", answers: ["Ich bin müde."],
          explain: "Türkçede “-um” eki yeter, Almancada fiil şart: Ich BIN müde. “Ich müde” yanlış.", tags: ["sein"] },
        { type: "type", tr: "Burada yeniyim.", answers: ["Ich bin neu hier.", "Ich bin hier neu."],
          explain: "Ich (1) bin (2) neu hier. Fiil yine 2. sırada.", tags: ["sein", "word_order"] },
        { type: "listen", de: "Er ist müde.", tr: "O (erkek) yorgun.",
          explain: "müde: ü sesi Türkçedeki ü gibi; uzun okunur.", tags: ["spelling", "sein"] }
      ]
    },

    // ───────────────────────────── DERS 4 ─────────────────────────────
    {
      id: "u01.l4",
      title: "Grammatik: Verben, Verbposition und W-Fragen",
      kind: "grammar",
      intro: "Fiillerin kişiye göre nasıl değiştiğini, Almancanın altın kuralını (fiil 2. sırada!) ve soru kelimelerini öğreniyorsun.",
      words: [
        { id: "w.was", de: "was", pos: "q", tr: "ne", en: "what",
          ex: { de: "Was lernst du? — Deutsch.", tr: "Ne öğreniyorsun? — Almanca." },
          ff: "was = what (ne). İngilizce “was” (idi) ile ilgisi yok." },
        { id: "w.name", de: "Name", pos: "n", art: "der", pl: "Namen", tr: "isim, ad", en: "name",
          ex: { de: "Mein Name ist Elif Kaya.", tr: "Benim adım Elif Kaya." } },
        { id: "w.mein_name_ist", de: "Mein Name ist …", pos: "phr", tr: "Benim adım …", en: "My name is …",
          ex: { de: "Mein Name ist Becker.", tr: "Benim adım Becker." },
          note: "Biraz daha resmi. Günlük: Ich heiße … / Ich bin …" },
        { id: "w.vorname", de: "Vorname", pos: "n", art: "der", pl: "Vornamen", tr: "ad (ön ad)", en: "first name",
          ex: { de: "Mein Vorname ist Elif.", tr: "Adım Elif." } },
        { id: "w.nachname", de: "Nachname", pos: "n", art: "der", pl: "Nachnamen", tr: "soyadı", en: "last name, surname",
          ex: { de: "Mein Nachname ist Kaya.", tr: "Soyadım Kaya." } },
        { id: "w.kurs", de: "Kurs", pos: "n", art: "der", pl: "Kurse", tr: "kurs", en: "course",
          ex: { de: "Der Kurs ist neu.", tr: "Kurs yeni." } },
        { id: "w.lehrer", de: "Lehrer", pos: "n", art: "der", pl: "Lehrer", tr: "öğretmen (erkek)", en: "teacher (male)",
          ex: { de: "Herr Wagner ist Lehrer.", tr: "Wagner Bey öğretmen." },
          note: "Meslek söylerken artikel kullanılmaz: Er ist Lehrer." },
        { id: "w.lehrerin", de: "Lehrerin", pos: "n", art: "die", pl: "Lehrerinnen", tr: "öğretmen (kadın)", en: "teacher (female)",
          ex: { de: "Frau Becker ist Lehrerin.", tr: "Becker Hanım öğretmen." },
          note: "-in eki kadın formu yapar ve hep die'dir: der Lehrer → die Lehrerin." },
        { id: "w.sehr_gut", de: "sehr gut", pos: "phr", tr: "çok iyi", en: "very good, very well",
          ex: { de: "Du sprichst sehr gut Deutsch!", tr: "Çok iyi Almanca konuşuyorsun!" } }
      ],
      grammar: [
        {
          title: "Fiil çekimi (Präsens)",
          html:
            "<p>Mastardan <b>-en</b>'i at, kişiye göre ek getir:</p>" +
            "<table><tr><th></th><th>wohnen</th><th>kommen</th><th>heißen</th><th>sprechen</th></tr>" +
            "<tr><td>ich</td><td>wohn<b>e</b></td><td>komm<b>e</b></td><td>heiß<b>e</b></td><td>sprech<b>e</b></td></tr>" +
            "<tr><td>du</td><td>wohn<b>st</b></td><td>komm<b>st</b></td><td>heiß<b>t</b> (!)</td><td>spr<b>i</b>ch<b>st</b> (!)</td></tr>" +
            "<tr><td>er / sie</td><td>wohn<b>t</b></td><td>komm<b>t</b></td><td>heiß<b>t</b></td><td>spr<b>i</b>ch<b>t</b> (!)</td></tr>" +
            "<tr><td>Sie / wir / sie</td><td>wohn<b>en</b></td><td>komm<b>en</b></td><td>heiß<b>en</b></td><td>sprech<b>en</b></td></tr></table>" +
            "<p>lernen de wohnen gibi: ich lerne, du lernst, er lernt, Sie lernen.</p>" +
            "<p class=\"bridge\">🇹🇷 Türkçe gibi kişi eki var: gel-iyor-<b>um</b> / komm-<b>e</b>, gel-iyor-<b>sun</b> / komm-<b>st</b>.</p>"
        },
        {
          title: "Altın kural: fiil 2. sırada (V2)",
          html:
            "<table><tr><th>1</th><th>2 (fiil)</th><th>…</th></tr>" +
            "<tr><td>Ich</td><td><b>wohne</b></td><td>jetzt in Köln.</td></tr>" +
            "<tr><td>Jetzt</td><td><b>wohne</b></td><td>ich in Köln.</td></tr>" +
            "<tr><td>Deutsch</td><td><b>lerne</b></td><td>ich jetzt.</td></tr></table>" +
            "<p>1. sıraya ne gelirse gelsin, çekimli fiil <b>hep 2. sırada</b>. Başka bir şey başa gelirse özne fiilin arkasına geçer.</p>" +
            "<p class=\"bridge\">🇹🇷 Türkçede fiil sonda: “Ben şimdi Köln'de otur<b>uyorum</b>.” Almancada fiili 2. kutuya koy: “Jetzt <b>wohne</b> ich in Köln.” “Jetzt ich wohne” yanlış!</p>"
        },
        {
          title: "W-Fragen (soru kelimeleri)",
          html:
            "<table><tr><th>Almanca</th><th>Türkçe</th><th>Örnek</th></tr>" +
            "<tr><td>wer?</td><td>kim?</td><td>Wer bist du?</td></tr>" +
            "<tr><td>wie?</td><td>nasıl? / (ad) ne?</td><td>Wie heißt du?</td></tr>" +
            "<tr><td>woher?</td><td>nereden?</td><td>Woher kommst du?</td></tr>" +
            "<tr><td>wo?</td><td>nerede?</td><td>Wo wohnst du?</td></tr>" +
            "<tr><td>was?</td><td>ne?</td><td>Was lernst du?</td></tr></table>" +
            "<p>Soru kelimesi <b>1.</b>, fiil <b>2.</b>, özne <b>3.</b> sırada: <b>Wo</b> | <b>wohnst</b> | du?</p>" +
            "<p class=\"bridge\">🇹🇷 wo = nerede, woher = nereden: birebir aynı mantık! Ama Türkçede soru kelimesi ortada kalabilir (“Sen nerede oturuyorsun?”); Almancada hep başa gelir.</p>" +
            "<p class=\"bridge en\">🇬🇧 Dikkat: <b>wer = who</b>, <b>wo = where</b>. Sesleri ters gibi duyulur, karıştırma!</p>"
        }
      ],
      exercises: [
        { type: "cloze", de: "Woher ___ du?", tr: "Nerelisin?", answers: ["kommst"], hint: "kommen",
          explain: "du → kök + -st: komm + st = kommst.", tags: ["verb.conj"] },
        { type: "cloze", de: "Jonas ___ in Köln.", tr: "Jonas Köln'de oturuyor.", answers: ["wohnt"], hint: "wohnen",
          explain: "Jonas = er → kök + -t: wohnt.", tags: ["verb.conj"] },
        { type: "cloze", de: "Wie ___ du?", tr: "Adın ne?", answers: ["heißt"], hint: "heißen",
          explain: "Kök zaten ß (s sesi) ile bitiyor, du formunda sadece -t eklenir: du heißt. “heißst” yanlış.", tags: ["verb.conj"] },
        { type: "cloze", de: "Elif ___ Türkisch und Englisch.", tr: "Elif Türkçe ve İngilizce konuşuyor.", answers: ["spricht"], hint: "sprechen",
          explain: "sprechen'de du ve er/sie formunda e → i olur: er/sie spricht, du sprichst.", tags: ["verb.conj"] },
        { type: "cloze", de: "Herr Schulz, wo ___ Sie?", tr: "Schulz Bey, nerede oturuyorsunuz?", answers: ["wohnen"], hint: "wohnen",
          explain: "Sie (resmi) → mastarla aynı: Sie wohnen.", tags: ["verb.conj", "formal"] },
        { type: "mcq", q: "Hangisi doğru?",
          options: ["Jetzt ich wohne in Köln.", "Jetzt wohne ich in Köln.", "Jetzt ich in Köln wohne."], answer: 1,
          explain: "Fiil hep 2. sırada! “Jetzt” 1. sırayı aldı → fiil (wohne) 2., özne (ich) 3. Türkçedeki gibi fiili sona koyma.", tags: ["word_order"] },
        { type: "mcq", q: "Cevap: “Ich wohne in Hamburg.” Soru hangisi?",
          options: ["Wo wohnst du?", "Woher kommst du?", "Wer bist du?"], answer: 0,
          explain: "wohnen in … → wo? (nerede?). Woher kommst du? sorusunun cevabı “Ich komme aus …” olurdu.", tags: ["question"] },
        { type: "mcq", q: "“___ lernst du? — Deutsch.” Boşluğa hangisi gelir?",
          options: ["Wer", "Was", "Wo"], answer: 1,
          explain: "Cevap bir şey (Deutsch) → was? (ne?). wer = kim, wo = nerede.", tags: ["question"] },
        { type: "order", tr: "Şimdi Köln'de oturuyorum.", answer: "Jetzt wohne ich in Köln.", alt: ["Ich wohne jetzt in Köln."],
          explain: "İki doğru sıra var; ikisinde de fiil (wohne) 2. sırada.", tags: ["word_order"] },
        { type: "order", tr: "Nerede oturuyorsunuz? (resmi)", answer: "Wo wohnen Sie?", extra: ["wohnst"],
          explain: "Soru kelimesi + fiil + özne. Sie ile fiil -en: wohnen.", tags: ["word_order", "formal"] },
        { type: "type", tr: "Ne öğreniyorsun?", answers: ["Was lernst du?"],
          explain: "was (ne) + lernst (du formu: -st) + du.", tags: ["question", "verb.conj"] },
        { type: "article", word: "w.nachname",
          explain: "der Nachname — Name, Vorname, Nachname: hepsi der.", tags: ["article"] }
      ]
    },

    // ───────────────────────────── DERS 5 ─────────────────────────────
    {
      id: "u01.l5",
      title: "Lesen & Schreiben: Wer ist neu im Kurs?",
      kind: "read-write",
      intro: "Bir online Almanca kursunun panosunda üç yeni kursiyer kendini tanıtıyor. Önce oku, sonra sıra sende: kendi tanıtım metnini yaz.",
      dialog: {
        title: "Kurs panosu: Wir sind neu!",
        lines: [
          { s: "Ahmet", de: "Hallo! Mein Name ist Ahmet Yilmaz. Ich komme aus der Türkei, aus Istanbul. Jetzt wohne ich in München. Ich spreche Türkisch. Englisch spreche ich ein bisschen.",
            tr: "Merhaba! Benim adım Ahmet Yılmaz. Türkiye'denim, İstanbul'dan. Şimdi München'de oturuyorum. Türkçe konuşuyorum. İngilizceyi biraz konuşuyorum." },
          { s: "Olena", de: "Hallo, ich bin Olena. Ich komme aus der Ukraine, aus Kyjiw. Ich wohne jetzt in Köln. Ich spreche Ukrainisch und Englisch. Deutsch lerne ich jetzt.",
            tr: "Merhaba, ben Olena. Ukrayna'danım, Kiev'den. Şimdi Köln'de oturuyorum. Ukraynaca ve İngilizce konuşuyorum. Almancayı şimdi öğreniyorum." },
          { s: "Karim", de: "Guten Tag! Ich heiße Karim. Ich komme aus Syrien. Ich wohne in Hamburg. Ich spreche Arabisch, Englisch und ein bisschen Deutsch. Viele Grüße!",
            tr: "İyi günler! Adım Karim. Suriye'denim. Hamburg'da oturuyorum. Arapça, İngilizce ve biraz Almanca konuşuyorum. Selamlar!" }
        ]
      },
      words: [
        { id: "w.viele_gruesse", de: "Viele Grüße", pos: "phr", tr: "Selamlar / Sevgiler (yazının sonunda)", en: "Best regards",
          ex: { de: "Viele Grüße, Elif", tr: "Selamlar, Elif" },
          note: "Mesaj ve e-postaların sonunda adından önce yazılır." }
      ],
      grammar: [
        {
          title: "Kendini tanıtma kalıpları",
          html:
            "<table><tr><th>Konu</th><th>Kalıp</th></tr>" +
            "<tr><td>Ad</td><td>Ich heiße … / Ich bin … / Mein Name ist …</td></tr>" +
            "<tr><td>Köken</td><td>Ich komme aus … (aus der Türkei)</td></tr>" +
            "<tr><td>İkamet</td><td>Ich wohne in … / Jetzt wohne ich in …</td></tr>" +
            "<tr><td>Diller</td><td>Ich spreche … und ein bisschen Deutsch.</td></tr></table>" +
            "<p>Yazarken: <b>isimler ve dil adları büyük harfle</b> (Name, Türkisch); <b>du</b> küçük, <b>Sie</b> büyük. Her cümlede fiil 2. sırada.</p>" +
            "<p class=\"bridge\">🇹🇷 kommen aus = nereli olduğun (köken), wohnen in = şu an oturduğun yer. Türkçede “nerelisin” ve “nerede oturuyorsun” gibi iki ayrı soru.</p>"
        }
      ],
      exercises: [
        { type: "mcq", q: "Ahmet şimdi nerede oturuyor?",
          options: ["İstanbul'da", "München'de", "Köln'de"], answer: 1,
          explain: "“aus Istanbul” köken (woher?), “Jetzt wohne ich in München” ikamet (wo?). woher ≠ wo!", tags: ["vocab"] },
        { type: "mcq", q: "Olena nereli?",
          options: ["Ukrayna", "Türkiye", "Suriye"], answer: 0,
          explain: "“aus der Ukraine” — die Ukraine da die Türkei gibi artikelle kullanılır.", tags: ["vocab"] },
        { type: "mcq", q: "Kim Arapça konuşuyor?",
          options: ["Ahmet", "Olena", "Karim"], answer: 2,
          explain: "Karim: “Ich spreche Arabisch, Englisch und ein bisschen Deutsch.”", tags: ["vocab"] },
        { type: "mcq", q: "Ahmet ne kadar İngilizce konuşuyor?",
          options: ["Çok iyi", "Biraz", "Hiç"], answer: 1,
          explain: "“Englisch spreche ich ein bisschen.” → biraz. Dikkat: “Englisch” başta ama fiil yine 2. sırada (spreche).", tags: ["vocab", "word_order"] },
        { type: "mcq", q: "Metindeki Almanca cümlelerden hangisi Olena için DOĞRU?",
          options: ["Sie wohnt in Hamburg.", "Sie wohnt in Köln.", "Sie kommt aus Syrien."], answer: 1,
          explain: "Olena: “Ich wohne jetzt in Köln.” Başkası anlatınca: Sie wohnt in Köln (sie → -t).", tags: ["verb.conj"] },
        { type: "cloze", de: "Karim ___ in Hamburg.", tr: "Karim Hamburg'da oturuyor.", answers: ["wohnt"], hint: "wohnen",
          explain: "Karim = er → wohnt.", tags: ["verb.conj"] },
        { type: "cloze", de: "Olena ___ aus der Ukraine.", tr: "Olena Ukrayna'dan geliyor.", answers: ["kommt"], hint: "kommen",
          explain: "Olena = sie (o) → kommt. (Olena da “Ich komme” diyordu; şimdi biz onu anlatıyoruz.)", tags: ["verb.conj"] },
        { type: "order", tr: "Ahmet şimdi München'de oturuyor.", answer: "Ahmet wohnt jetzt in München.", alt: ["Jetzt wohnt Ahmet in München."],
          explain: "İki sıra da doğru; fiil (wohnt) her zaman 2. sırada.", tags: ["word_order"] },
        { type: "type", tr: "Biraz Almanca konuşuyorum.", answers: ["Ich spreche ein bisschen Deutsch."],
          explain: "ich spreche + ein bisschen + Deutsch. Dil adı büyük harfle.", tags: ["verb.conj", "vocab"] },
        { type: "listen", de: "Ich spreche Türkisch und ein bisschen Deutsch.", tr: "Türkçe ve biraz Almanca konuşuyorum.",
          explain: "“sp” kelime başında [şp] okunur: sprechen → “şprehen”.", tags: ["spelling"] },
        { type: "write",
          task: "Kurs panosu için kendini tanıtan kısa bir metin yaz (en az 25 kelime). Adını, nereli olduğunu, nerede oturduğunu ve hangi dilleri konuştuğunu yaz. Selamla başla, “Viele Grüße” ve adınla bitir.",
          taskDe: "Name? Land? Wohnort? Sprachen?",
          minWords: 25,
          checklist: [
            "Selamla başladım (Hallo! / Guten Tag!).",
            "Adımı yazdım (Ich heiße … / Mein Name ist …).",
            "Nereli olduğumu yazdım (Ich komme aus …).",
            "Nerede oturduğumu yazdım (Ich wohne in …).",
            "Konuştuğum dilleri yazdım (Ich spreche …).",
            "Her cümlede fiil 2. sırada.",
            "İsimler ve dil adları büyük harfle (Name, Türkisch, Deutsch).",
            "Sonda “Viele Grüße” ve adım var."
          ],
          model: "Hallo! Mein Name ist Elif Kaya. Ich komme aus der Türkei, aus Izmir. Jetzt wohne ich in Köln. Ich spreche Türkisch, Englisch und ein bisschen Deutsch. Ich lerne jetzt Deutsch. Viele Grüße, Elif",
          explain: "Model metindeki kalıpları kendi bilgilerinle değiştir. Türkçe harfleri (ı, ş, ğ) Almanca metinde kullanma: Izmir, Istanbul.",
          tags: ["word_order", "verb.conj"] }
      ]
    },

    // ───────────────────────────── DERS 6 ─────────────────────────────
    {
      id: "u01.l6",
      title: "Almanya'da hayat: Adını harfle, kendini tanıt",
      kind: "life",
      intro: "Bürgeramt'tasın: memur adını, soyadını ve nereli olduğunu soruyor. Adını harf harf söylemeyi ve anlamadığında bunu söylemeyi çalışıyorsun. Sonunda sınav tarzı tanıtım kartlarıyla kendini tanıtacaksın.",
      dialog: {
        title: "Bürgeramt'ta",
        lines: [
          { s: "Herr Schulz", de: "Guten Tag! Ihr Nachname, bitte?", tr: "İyi günler! Soyadınız, lütfen?" },
          { s: "Elif", de: "Entschuldigung, ich verstehe nicht. Langsam, bitte.", tr: "Affedersiniz, anlamıyorum. Yavaş, lütfen." },
          { s: "Herr Schulz", de: "Ihr Nachname. Wie heißen Sie?", tr: "Soyadınız. Adınız ne?" },
          { s: "Elif", de: "Ah! Ich heiße Elif Kaya. Kaya ist mein Nachname.", tr: "Ha! Adım Elif Kaya. Kaya benim soyadım." },
          { s: "Herr Schulz", de: "Wie schreibt man das? Buchstabieren Sie bitte.", tr: "Nasıl yazılıyor? Harf harf söyleyin lütfen." },
          { s: "Elif", de: "K, A, Y, A.", tr: "K, A, Y, A." },
          { s: "Herr Schulz", de: "Danke. Und Ihr Vorname?", tr: "Teşekkürler. Ya adınız?" },
          { s: "Elif", de: "Elif. E, L, I, F.", tr: "Elif. E, L, İ, F." },
          { s: "Herr Schulz", de: "Woher kommen Sie, Frau Kaya?", tr: "Nerelisiniz, Kaya Hanım?" },
          { s: "Elif", de: "Ich komme aus der Türkei, aus Izmir.", tr: "Türkiye'denim, İzmir'den." },
          { s: "Herr Schulz", de: "Und wo wohnen Sie jetzt?", tr: "Peki şimdi nerede oturuyorsunuz?" },
          { s: "Elif", de: "In Köln.", tr: "Köln'de." },
          { s: "Herr Schulz", de: "Sehr gut, danke. Auf Wiedersehen, Frau Kaya!", tr: "Çok iyi, teşekkürler. Hoşça kalın, Kaya Hanım!" },
          { s: "Elif", de: "Auf Wiedersehen!", tr: "Hoşça kalın!" }
        ]
      },
      words: [
        { id: "w.wie_ist_ihr_name", de: "Wie ist Ihr Name?", pos: "phr", tr: "Adınız nedir?", en: "What is your name?",
          ex: { de: "Wie ist Ihr Name? — Kaya.", tr: "Adınız nedir? — Kaya." },
          note: "Resmi yerlerde çok sık. “Ihr Nachname, bitte?” = Soyadınız, lütfen?" },
        { id: "w.buchstabieren", de: "buchstabieren", pos: "v", tr: "harf harf söylemek, harflemek", en: "to spell",
          ex: { de: "Buchstabieren Sie bitte.", tr: "Harf harf söyleyin lütfen." },
          note: "Memurlar ve telefonda çok sık söylenir. Harfleri Ünite 0'da öğrendin." },
        { id: "w.wohnort", de: "Wohnort", pos: "n", art: "der", pl: "Wohnorte", tr: "ikamet yeri (oturduğun şehir)", en: "place of residence",
          ex: { de: "Wohnort: Köln", tr: "İkamet yeri: Köln" },
          note: "Formlarda ve sınav kartlarında çıkar. Cevap: Ich wohne in …" }
      ],
      grammar: [
        {
          title: "Resmi yerde kısa cevaplar",
          html:
            "<table><tr><th>Memur sorar</th><th>Sen cevap verirsin</th></tr>" +
            "<tr><td>Wie ist Ihr Name?</td><td>Mein Name ist Kaya, Elif Kaya.</td></tr>" +
            "<tr><td>Ihr Vorname?</td><td>Elif. E, L, I, F.</td></tr>" +
            "<tr><td>Woher kommen Sie?</td><td>Aus der Türkei.</td></tr>" +
            "<tr><td>Wo wohnen Sie?</td><td>In Köln.</td></tr></table>" +
            "<p>Anlamadın mı? <b>Wie bitte?</b> · <b>Entschuldigung, ich verstehe nicht.</b> · <b>Langsam, bitte.</b></p>" +
            "<p class=\"bridge\">🇹🇷 Türkçede “Türkiye'den.” diye kısa cevap verdiğimiz gibi, Almancada da kısa cevap doğaldır: “Aus der Türkei.”</p>"
        }
      ],
      culture: "Almanya'da resmi yerlerde (Bürgeramt, Ausländerbehörde, Jobcenter) hep Sie kullanılır ve formlarda önce soyadı (Nachname / Familienname) sorulur. Adında ı, ş, ğ gibi harfler varsa memur bunları bilmeyebilir: pasaportunu göster ve harflerken “I ohne Punkt” (noktasız i) gibi açıklamalar yapabilirsin. Anlamadığında utanma: “Langsam, bitte.” demek tamamen normal.",
      exercises: [
        { type: "mcq", q: "Memur “Ihr Nachname, bitte?” diyor. Ne istiyor?",
          options: ["Adını", "Soyadını", "Şehrini"], answer: 1,
          explain: "Nachname = soyadı. Vorname = ad. Formlarda genelde önce soyadı sorulur.", tags: ["vocab"] },
        { type: "mcq", q: "Memur çok hızlı konuştu, anlamadın. Ne dersin?",
          options: ["Tschüss!", "Entschuldigung, ich verstehe nicht. Langsam, bitte.", "Freut mich!"], answer: 1,
          explain: "Anlamadığını kibarca söyle ve yavaş konuşmasını iste. “Wie bitte?” de olur.", tags: ["vocab"] },
        { type: "mcq", q: "Bürgeramt'ta memur sana nereli olduğunu soruyor. Hangi soruyu duyarsın?",
          options: ["Woher kommst du?", "Woher kommen Sie?", "Wo wohnen Sie?"], answer: 1,
          explain: "Resmi yerde Sie: Woher kommen Sie? “Wo wohnen Sie?” ise nerede oturduğunu sorar.", tags: ["formal", "question"] },
        { type: "match", pairs: [["Name?", "Adın"], ["Land?", "Ülken (nerelisin?)"], ["Wohnort?", "Oturduğun şehir"], ["Sprachen?", "Konuştuğun diller"], ["Alter?", "Yaşın"]],
          explain: "Sınavdaki tanıtım kartları (Goethe A1 Sprechen Teil 1 tarzı). Her karta bir cümleyle cevap verirsin.", tags: ["vocab"] },
        { type: "mcq", q: "Kartta “Wohnort?” yazıyor. Ne söylersin?",
          options: ["Ich komme aus der Türkei.", "Ich wohne in Köln.", "Ich spreche Türkisch."], answer: 1,
          explain: "Wohnort = oturduğun yer → Ich wohne in … “Land?” kartı için: Ich komme aus …", tags: ["vocab"] },
        { type: "mcq", q: "Kartta “Alter?” yazıyor. Ne söylemen gerekiyor?",
          options: ["Yaşını", "Adresini", "Mesleğini"], answer: 0,
          explain: "Alter = yaş. Cevap kalıbı: Ich bin … Jahre alt. 10'dan büyük sayıları Ünite 2'de öğreneceksin; şimdilik kartı tanıman yeter.", tags: ["vocab"] },
        { type: "order", tr: "Adınız nedir?", answer: "Wie ist Ihr Name?",
          explain: "Resmi kalıp: Wie (1) ist (2) Ihr Name? “Ihr” = sizin (büyük I).", tags: ["word_order", "formal"] },
        { type: "type", q: "Memura kısaca cevap ver:", tr: "Köln'de oturuyorum.", answers: ["Ich wohne in Köln.", "In Köln."],
          explain: "Tam cümle: Ich wohne in Köln. Kısa cevap “In Köln.” de doğal.", tags: ["verb.conj"] },
        { type: "speak", de: "Mein Nachname ist Kaya. K, A, Y, A.", tr: "Soyadım Kaya. K, A, Y, A.",
          explain: "Harfleri Almanca söyle: K [ka], A [a], Y [üpsilon]. Sonra aynısını kendi soyadınla dene!" },
        { type: "speak", de: "Entschuldigung, ich verstehe nicht. Langsam, bitte.", tr: "Affedersiniz, anlamıyorum. Yavaş, lütfen.",
          explain: "Bu cümle Almanya'daki ilk haftalarında hayat kurtarır. Akıcı söyleyene kadar tekrar et." },
        { type: "speak", de: "Ich heiße Elif Kaya. Ich komme aus der Türkei, aus Izmir.", tr: "Adım Elif Kaya. Türkiye'denim, İzmir'den.",
          explain: "Önce Elif gibi söyle, sonra kendi adın ve şehrinle tekrarla." },
        { type: "speak", de: "Ich wohne jetzt in Köln. Ich spreche Türkisch, Englisch und ein bisschen Deutsch.", tr: "Şimdi Köln'de oturuyorum. Türkçe, İngilizce ve biraz Almanca konuşuyorum.",
          explain: "Bitiş görevi: Name, Land, Wohnort, Sprachen — dördünü 30 saniyede kendi bilgilerinle söyleyebiliyor musun? Dene!" }
      ]
    }
  ]
});
