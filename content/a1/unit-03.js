// Ünite 3 — Meine Familie (Ailem)
// Gramer: G09 haben, G10 der/die/das (ilk sistemli giriş), G11 ein/eine (Nom., kalıp olarak einen),
// G12 mein/dein/Ihr (Nominativ), G13 Plural (giriş). Şema: docs/icerik-semasi.md
DE.content.registerUnit({
  id: "u03",
  order: 3,
  level: "A1.1",
  title: "Meine Familie",
  titleTr: "Ailem",
  goals: [
    "Aile üyelerimi tanıtabilirim (Das ist meine Mutter.).",
    "Bir fotoğrafa bakıp “Bu kim?” diye sorabilir ve cevap verebilirim.",
    "Kardeşim, çocuğum ya da evcil hayvanım olduğunu söyleyebilirim (Ich habe …).",
    "Medeni durumumu ve aile üyelerimin yaşını söyleyebilirim.",
    "İsimleri der/die/das ve çoğul hâliyle birlikte öğrenebilirim.",
    "Ailem hakkında 5 cümlelik kısa bir metin yazabilirim."
  ],
  lessons: [
    // ───────────────────────── L1: Wörter ─────────────────────────
    {
      id: "u03.l1",
      title: "Aile kelimeleri",
      kind: "words",
      intro: "Bu derste aile üyelerinin adlarını öğreniyorsun. Her ismi artikeliyle birlikte öğren: der Vater, die Mutter, das Kind.",
      words: [
        { id: "w.familie", de: "Familie", pos: "n", art: "die", pl: "Familien", tr: "aile", en: "family",
          ex: { de: "Die Familie wohnt in Köln.", tr: "Aile Köln'de oturuyor." },
          note: "-e ile biten isimlerin çoğu die: die Familie, die Tante, die Katze." },
        { id: "w.vater", de: "Vater", pos: "n", art: "der", pl: "Väter", tr: "baba", en: "father",
          ex: { de: "Der Vater kommt aus Izmir.", tr: "Baba İzmirli." },
          note: "İngilizce father ile aynı kök. Çoğulda Umlaut gelir: Väter." },
        { id: "w.mutter", de: "Mutter", pos: "n", art: "die", pl: "Mütter", tr: "anne", en: "mother",
          ex: { de: "Die Mutter wohnt in Ankara.", tr: "Anne Ankara'da oturuyor." },
          note: "-er ile bitiyor ama kadın olduğu için die. İnsanlarda biyolojik cinsiyet kazanır." },
        { id: "w.eltern", de: "Eltern", pos: "n", art: "die", plOnly: true, pl: "-", tr: "anne baba, ebeveyn", en: "parents",
          ex: { de: "Die Eltern wohnen in Istanbul.", tr: "Anne baba İstanbul'da oturuyor." },
          note: "Sadece çoğul kullanılır, tekili yok. Fiil de çoğul çekilir: die Eltern wohnen." },
        { id: "w.bruder", de: "Bruder", pos: "n", art: "der", pl: "Brüder", tr: "erkek kardeş, ağabey", en: "brother",
          ex: { de: "Der Bruder wohnt in Berlin.", tr: "Erkek kardeş Berlin'de oturuyor." },
          note: "Almancada ağabey/küçük kardeş ayrımı yok: ikisi de Bruder. İngilizce brother ile aynı kök." },
        { id: "w.schwester", de: "Schwester", pos: "n", art: "die", pl: "Schwestern", tr: "kız kardeş, abla", en: "sister",
          ex: { de: "Die Schwester heißt Zeynep.", tr: "Kız kardeşin adı Zeynep." },
          note: "Abla da kız kardeş de Schwester. İngilizce sister ile benzer." },
        { id: "w.geschwister", de: "Geschwister", pos: "n", art: "die", plOnly: true, pl: "-", tr: "kardeşler", en: "siblings",
          ex: { de: "Die Geschwister wohnen in Berlin.", tr: "Kardeşler Berlin'de oturuyor." },
          note: "Türkçe “kardeş” cinsiyetsiz. Almancada tek kişi için Bruder ya da Schwester dersin; Geschwister sadece çoğul." },
        { id: "w.kind", de: "Kind", pos: "n", art: "das", pl: "Kinder", tr: "çocuk", en: "child",
          ex: { de: "Das Kind ist fünf Jahre alt.", tr: "Çocuk beş yaşında." },
          note: "Çocuğun cinsiyeti fark etmez: hep das Kind.",
          ff: "İngilizce kind (nazik) ile karıştırma! Kind = çocuk. Kindergarten'ı düşün." },
        { id: "w.opa", de: "Opa", pos: "n", art: "der", pl: "Opas", tr: "dede", en: "grandpa",
          ex: { de: "Der Opa kommt aus Ankara.", tr: "Dede Ankaralı." },
          note: "Günlük dil. Daha resmi: der Großvater." },
        { id: "w.oma", de: "Oma", pos: "n", art: "die", pl: "Omas", tr: "nine, babaanne, anneanne", en: "grandma",
          ex: { de: "Die Oma ist achtzig Jahre alt.", tr: "Nine seksen yaşında." },
          note: "Almancada babaanne/anneanne ayrımı yok: ikisi de Oma." },
        { id: "w.grossvater", de: "Großvater", pos: "n", art: "der", pl: "Großväter", tr: "büyükbaba", en: "grandfather",
          ex: { de: "Der Großvater wohnt in Izmir.", tr: "Büyükbaba İzmir'de oturuyor." },
          note: "groß (büyük) + Vater: İngilizce grand + father ile aynı mantık." },
        { id: "w.grossmutter", de: "Großmutter", pos: "n", art: "die", pl: "Großmütter", tr: "büyükanne", en: "grandmother",
          ex: { de: "Die Großmutter heißt Fatma.", tr: "Büyükannenin adı Fatma." },
          note: "Bileşik isimde artikeli son kelime belirler: groß + die Mutter → die Großmutter." },
        { id: "w.grosseltern", de: "Großeltern", pos: "n", art: "die", plOnly: true, pl: "-", tr: "büyükanne ve büyükbaba", en: "grandparents",
          ex: { de: "Die Großeltern wohnen in Antalya.", tr: "Büyükanne ve büyükbaba Antalya'da oturuyor." },
          note: "Eltern gibi sadece çoğul." },
        { id: "w.wer_ist_das", de: "Wer ist das?", pos: "phr", tr: "Bu kim?", en: "Who is that?",
          ex: { de: "Wer ist das? – Das ist Zeynep.", tr: "Bu kim? – Bu Zeynep." } },
        { id: "w.das_ist", de: "Das ist …", pos: "phr", tr: "Bu …", en: "This is …",
          ex: { de: "Das ist die Familie Yilmaz.", tr: "Bu, Yılmaz ailesi." },
          note: "Buradaki das “bu” demek ve hiç değişmez: Das ist der Vater / die Mutter / das Kind." }
      ],
      grammar: [
        { title: "der, die, das: isimlerin cinsiyeti",
          html: "<p>Almancada her ismin bir artikeli var. Türkçede böyle bir şey yok, bu yüzden <b>artikeli ismin bir parçası gibi ezberle</b>: Vater değil, <span class=\"der\">der</span> Vater.</p>" +
            "<table><tr><th>Artikel</th><th>Örnek</th></tr>" +
            "<tr><td><span class=\"der\">der</span> (maskulin)</td><td><span class=\"der\">der</span> Vater, <span class=\"der\">der</span> Bruder, <span class=\"der\">der</span> Opa</td></tr>" +
            "<tr><td><span class=\"die\">die</span> (feminin)</td><td><span class=\"die\">die</span> Mutter, <span class=\"die\">die</span> Schwester, <span class=\"die\">die</span> Oma</td></tr>" +
            "<tr><td><span class=\"das\">das</span> (neutral)</td><td><span class=\"das\">das</span> Kind</td></tr>" +
            "<tr><td><span class=\"pl\">die (Pl.)</span></td><td><span class=\"pl\">die</span> Eltern, <span class=\"pl\">die</span> Geschwister</td></tr></table>" +
            "<p><b>İpucu 1:</b> Erkekler der, kadınlar die. <b>İpucu 2:</b> -e ile biten isimlerin çoğu die (die Familie). <b>İpucu 3:</b> Çoğulun artikeli her zaman die.</p>" +
            "<p class=\"bridge en\">🇬🇧 İngilizcedeki tek “the”, Almancada üçe ayrılıyor: der / die / das.</p>" }
      ],
      exercises: [
        { type: "match", pairs: [["der Vater", "baba"], ["die Mutter", "anne"], ["der Bruder", "erkek kardeş"], ["die Schwester", "kız kardeş"], ["das Kind", "çocuk"]], tags: ["vocab"] },
        { type: "article", word: "w.vater", explain: "Vater erkek → der Vater." },
        { type: "article", word: "w.mutter", explain: "Mutter -er ile bitiyor ama kadın → die Mutter. İnsanlarda cinsiyet kazanır." },
        { type: "article", word: "w.kind", explain: "Kind nötr: das Kind. Kız da olsa oğlan da olsa das." },
        { type: "mcq", q: "“die Eltern” ne demek?", de: "die Eltern", options: ["anne baba", "kardeşler", "büyükanne", "çocuklar"], answer: 0,
          explain: "Eltern = anne + baba. Sadece çoğul kullanılır.", tags: ["vocab"] },
        { type: "mcq", q: "Türkçe “kardeş” cinsiyetsiz. Kız ve erkek kardeşlerin hepsine birden Almancada ne denir?", options: ["die Geschwister", "die Brüder", "die Eltern", "die Schwestern"], answer: 0,
          explain: "Geschwister = kardeşler (cinsiyet fark etmez). Tek kişi için Bruder ya da Schwester demen gerekir.", tags: ["vocab"] },
        { type: "article", word: "w.schwester", explain: "Schwester kadın → die Schwester." },
        { type: "match", pairs: [["der Opa", "dede"], ["die Oma", "nine"], ["die Großeltern", "büyükanne ve büyükbaba"], ["die Familie", "aile"]], tags: ["vocab"] },
        { type: "cloze", de: "Wer ist ___? – Das ist Zeynep.", tr: "Bu kim? – Bu Zeynep.", answers: ["das"],
          explain: "Wer ist das? = Bu kim? Fotoğraf gösterirken çok kullanılır.", tags: ["question"] },
        { type: "listen", de: "Die Oma wohnt in Antalya.", tr: "Nine Antalya'da oturuyor." },
        { type: "type", q: "Artikeliyle birlikte yaz.", tr: "çocuk", answers: ["das Kind"],
          explain: "Her zaman artikeliyle yaz: das Kind.", tags: ["article"] },
        { type: "speak", de: "der Vater, die Mutter, das Kind", tr: "baba, anne, çocuk" }
      ]
    },

    // ───────────────────────── L2: Dialog ─────────────────────────
    {
      id: "u03.l2",
      title: "Bu kim? Fotoğraftaki aile",
      kind: "dialog",
      intro: "Elif kurstan sonra Jonas'a telefonundan bir aile fotoğrafı gösteriyor. Önce dinle, sonra soruları cevapla.",
      dialog: {
        title: "Telefondaki fotoğraf",
        lines: [
          { s: "Elif", de: "Hier ist ein Foto. Das ist meine Familie.", tr: "İşte bir fotoğraf. Bu benim ailem." },
          { s: "Jonas", de: "Oh, deine Familie ist groß!", tr: "Aa, ailen kalabalık!" },
          { s: "Elif", de: "Ja! Das sind meine Eltern.", tr: "Evet! Bunlar annemle babam." },
          { s: "Jonas", de: "Und wer ist das?", tr: "Peki bu kim?" },
          { s: "Elif", de: "Das ist meine Schwester. Sie heißt Zeynep und wohnt in Ankara.", tr: "Bu kız kardeşim. Adı Zeynep, Ankara'da oturuyor." },
          { s: "Jonas", de: "Hast du auch Brüder?", tr: "Erkek kardeşlerin de var mı?" },
          { s: "Elif", de: "Ja, ich habe zwei Brüder. Sie wohnen in Izmir. Und du? Hast du Geschwister?", tr: "Evet, iki erkek kardeşim var. İzmir'de oturuyorlar. Ya sen? Kardeşin var mı?" },
          { s: "Jonas", de: "Ja, ich habe eine Schwester. Sie ist neunzehn Jahre alt.", tr: "Evet, bir kız kardeşim var. On dokuz yaşında." },
          { s: "Elif", de: "Und wer ist das da? Ist das dein Hund?", tr: "Peki oradaki kim? Bu senin köpeğin mi?" },
          { s: "Jonas", de: "Ja, das ist Bruno. Er ist sehr lieb.", tr: "Evet, bu Bruno. Çok uslu/tatlıdır." }
        ]
      },
      words: [
        { id: "w.foto", de: "Foto", pos: "n", art: "das", pl: "Fotos", tr: "fotoğraf", en: "photo",
          ex: { de: "Hier ist das Foto.", tr: "Fotoğraf burada." },
          note: "-o ile biten isimlerin çoğu das: das Foto, das Auto, das Kino." },
        { id: "w.das_sind", de: "Das sind …", pos: "phr", tr: "Bunlar …", en: "These are …",
          ex: { de: "Das sind Zeynep und Can.", tr: "Bunlar Zeynep ve Can." },
          note: "Birden fazla kişi için ist yerine sind: Das sind meine Eltern." },
        { id: "w.da", de: "da", pos: "adv", tr: "orada; işte", en: "there",
          ex: { de: "Da ist die Oma.", tr: "İşte orada nine." } },
        { id: "w.haben", de: "haben", pos: "v", tr: "sahip olmak; (bir şeyi) olmak, var", en: "to have",
          ex: { de: "Ich habe zwei Brüder.", tr: "İki erkek kardeşim var." },
          note: "Türkçede “var” deriz; Almancada “sahibim” der gibi söylenir: Ich habe … Çekimi bir sonraki derste." },
        { id: "w.hund", de: "Hund", pos: "n", art: "der", pl: "Hunde", tr: "köpek", en: "dog",
          ex: { de: "Der Hund heißt Bruno.", tr: "Köpeğin adı Bruno." },
          note: "İngilizce hound (av köpeği) ile aynı kök." },
        { id: "w.gross", de: "groß", pos: "adj", tr: "büyük; uzun boylu; (aile) kalabalık", en: "big, tall",
          ex: { de: "Die Familie ist groß.", tr: "Aile kalabalık." },
          ff: "İngilizce gross (iğrenç) ile ilgisi yok: groß = büyük." },
        { id: "w.lieb", de: "lieb", pos: "adj", tr: "tatlı, uslu, sevimli", en: "sweet, kind",
          ex: { de: "Das Kind ist lieb.", tr: "Çocuk uslu." },
          note: "Çocuklar ve hayvanlar için çok kullanılır." },
        { id: "w.sehr", de: "sehr", pos: "adv", tr: "çok", en: "very",
          ex: { de: "Der Hund ist sehr lieb.", tr: "Köpek çok uslu." } }
      ],
      exercises: [
        { type: "mcq", q: "Zeynep nerede oturuyor?", de: "Sie heißt Zeynep und wohnt in Ankara.", options: ["Ankara'da", "İzmir'de", "Berlin'de", "Köln'de"], answer: 0 },
        { type: "mcq", q: "Elif'in kaç erkek kardeşi var?", de: "Ja, ich habe zwei Brüder.", options: ["iki", "bir", "üç", "hiç yok"], answer: 0,
          explain: "zwei Brüder = iki erkek kardeş. Brüder, Bruder'in çoğulu." },
        { type: "mcq", q: "Jonas'ın kardeşi hakkında hangisi doğru?", de: "Ja, ich habe eine Schwester. Sie ist neunzehn Jahre alt.", options: ["Bir kız kardeşi var, 19 yaşında.", "Bir erkek kardeşi var, 19 yaşında.", "İki kız kardeşi var.", "Kardeşi yok."], answer: 0 },
        { type: "cloze", de: "Wer ist ___? – Das ist meine Schwester.", tr: "Bu kim? – Bu benim kız kardeşim.", answers: ["das"], tags: ["question"] },
        { type: "cloze", de: "Das ___ meine Eltern.", tr: "Bunlar annemle babam.", answers: ["sind"], hint: "sein",
          explain: "Eltern çoğul → Das sind … (Das ist değil).", tags: ["sein", "plural"] },
        { type: "listen", de: "Hast du auch Brüder?", tr: "Erkek kardeşlerin de var mı?" },
        { type: "order", tr: "Bu benim kız kardeşim.", answer: "Das ist meine Schwester.", extra: ["sind"],
          explain: "Tek kişi → Das ist …", tags: ["word_order"] },
        { type: "match", pairs: [["Wer ist das?", "Bu kim?"], ["Das sind …", "Bunlar …"], ["hier", "burada"], ["da", "orada"], ["Hast du Geschwister?", "Kardeşin var mı?"]], tags: ["vocab"] },
        { type: "article", word: "w.foto", explain: "-o ile biten isimlerin çoğu das: das Foto." },
        { type: "article", word: "w.hund", explain: "der Hund. Hayvanlarda artikel cinsiyete göre değil, kelimeye göre: der Hund, die Katze." },
        { type: "speak", de: "Das ist meine Schwester. Sie heißt Zeynep.", tr: "Bu benim kız kardeşim. Adı Zeynep." },
        { type: "speak", de: "Ja, ich habe zwei Brüder.", tr: "Evet, iki erkek kardeşim var." }
      ]
    },

    // ───────────────────────── L3: Grammatik 1 ─────────────────────────
    {
      id: "u03.l3",
      title: "haben ve ein / eine",
      kind: "grammar",
      intro: "Türkçede “Bir kardeşim var” deriz. Almancada ise “Ben bir kardeşe sahibim” gibi söylenir: Ich habe einen Bruder. Bu derste haben fiilini ve ein/eine'yi öğreniyorsun.",
      words: [
        { id: "w.ein", de: "ein", pos: "art", tr: "bir (der- ve das-isimlerle)", en: "a, an",
          ex: { de: "Das ist ein Foto.", tr: "Bu bir fotoğraf." } },
        { id: "w.eine", de: "eine", pos: "art", tr: "bir (die-isimlerle)", en: "a, an",
          ex: { de: "Das ist eine Katze.", tr: "Bu bir kedi." } },
        { id: "w.mann", de: "Mann", pos: "n", art: "der", pl: "Männer", tr: "adam; koca, eş", en: "man; husband",
          ex: { de: "Der Mann kommt aus Köln.", tr: "Adam Kölnlü." },
          note: "Mann hem “adam” hem “koca” demek: mein Mann = kocam. Aynı şekilde Frau hem “kadın” hem “karı, eş”: meine Frau = karım/eşim." },
        { id: "w.sohn", de: "Sohn", pos: "n", art: "der", pl: "Söhne", tr: "oğul", en: "son",
          ex: { de: "Der Sohn heißt Ali.", tr: "Oğlun adı Ali." },
          note: "İngilizce son ile aynı kök. Çoğulda Umlaut: Söhne." },
        { id: "w.tochter", de: "Tochter", pos: "n", art: "die", pl: "Töchter", tr: "kız (evlat)", en: "daughter",
          ex: { de: "Ich habe eine Tochter.", tr: "Bir kızım var." },
          note: "Türkçe “kızım” (evladım) = meine Tochter. Genç kız ise başka kelime: das Mädchen." },
        { id: "w.baby", de: "Baby", pos: "n", art: "das", pl: "Babys", tr: "bebek", en: "baby",
          ex: { de: "Das Baby heißt Mia.", tr: "Bebeğin adı Mia." },
          note: "das Kind gibi nötr: das Baby." },
        { id: "w.katze", de: "Katze", pos: "n", art: "die", pl: "Katzen", tr: "kedi", en: "cat",
          ex: { de: "Ich habe eine Katze.", tr: "Bir kedim var." } }
      ],
      grammar: [
        { title: "haben (sahip olmak)",
          html: "<p><b>haben</b> çok önemli bir fiil. du ve er/sie/es'de <b>b</b> düşer:</p>" +
            "<table><tr><th>ich</th><td>habe</td><th>wir</th><td>haben</td></tr>" +
            "<tr><th>du</th><td><b>hast</b></td><th>ihr</th><td>habt</td></tr>" +
            "<tr><th>er / sie / es</th><td><b>hat</b></td><th>sie / Sie</th><td>haben</td></tr></table>" +
            "<p class=\"bridge\">🇹🇷 Türkçe: “Bir kızım <b>var</b>.” → Almanca: “Ich <b>habe</b> eine Tochter.” Türkçede sahip olunan şey özne olur; Almancada sahip olan kişi özne olur (ich).</p>" +
            "<p class=\"bridge en\">🇬🇧 have = haben: I have → ich habe, he has → er hat, do you have …? → Hast du …?</p>" },
        { title: "ein / eine (bir)",
          html: "<p>“Bir” anlamındaki artikel de cinsiyete göre değişir:</p>" +
            "<table><tr><th></th><th>belirli (the)</th><th>belirsiz (a)</th></tr>" +
            "<tr><td>maskulin</td><td><span class=\"der\">der</span> Sohn</td><td><span class=\"der\">ein</span> Sohn</td></tr>" +
            "<tr><td>feminin</td><td><span class=\"die\">die</span> Tochter</td><td><span class=\"die\">eine</span> Tochter</td></tr>" +
            "<tr><td>neutral</td><td><span class=\"das\">das</span> Kind</td><td><span class=\"das\">ein</span> Kind</td></tr>" +
            "<tr><td>çoğul</td><td><span class=\"pl\">die</span> Kinder</td><td>— (zwei Kinder)</td></tr></table>" +
            "<p>Türkçede “bir” çoğu zaman düşer (“Bu fotoğraf”). Almancada tekil, sayılabilen isimden önce artikel <b>şart</b>: Das ist <b>ein</b> Foto.</p>" },
        { title: "Kalıp: Ich habe einen …",
          html: "<p>haben'den sonra <b>der</b>-isimlerde ein → <b>einen</b> olur. die ve das isimler değişmez:</p>" +
            "<ul><li>Ich habe <span class=\"der\">einen</span> Bruder / <span class=\"der\">einen</span> Sohn / <span class=\"der\">einen</span> Hund.</li>" +
            "<li>Ich habe <span class=\"die\">eine</span> Schwester / <span class=\"die\">eine</span> Katze.</li>" +
            "<li>Ich habe <span class=\"das\">ein</span> Kind / <span class=\"das\">ein</span> Baby.</li></ul>" +
            "<p>Karşılaştır: Das ist <b>ein</b> Bruder. ↔ Ich habe <b>einen</b> Bruder. Şimdilik bunu <b>kalıp</b> olarak ezberle; nedenini (Akkusativ) ileride göreceğiz.</p>" }
      ],
      exercises: [
        { type: "cloze", de: "Ich ___ eine Schwester.", tr: "Bir kız kardeşim var.", answers: ["habe"], hint: "haben",
          explain: "ich → habe.", tags: ["verb.conj"] },
        { type: "cloze", de: "___ du Geschwister?", tr: "Kardeşin var mı?", answers: ["Hast"], hint: "haben",
          explain: "du → hast (b düşer). Ja/Nein sorusunda fiil başa gelir.", tags: ["verb.conj", "question"] },
        { type: "cloze", de: "Zeynep ___ eine Tochter.", tr: "Zeynep'in bir kızı var.", answers: ["hat"], hint: "haben",
          explain: "er/sie/es → hat. Türkçede “Zeynep'in … var”, Almancada “Zeynep hat …”.", tags: ["verb.conj"] },
        { type: "mcq", q: "Hangisi doğru? (Bir erkek kardeşim var.)", options: ["Ich habe einen Bruder.", "Ich habe ein Bruder.", "Ich habe eine Bruder.", "Ich bin einen Bruder."], answer: 0,
          explain: "der Bruder → haben'den sonra einen Bruder. “var” için sein değil haben kullanılır.", tags: ["case.acc", "article"] },
        { type: "cloze", de: "Ich habe ___ Kind.", tr: "Bir çocuğum var.", answers: ["ein"],
          explain: "das Kind → ein Kind. Sadece der-isimler einen olur.", tags: ["article"] },
        { type: "cloze", de: "Elif hat ___ Sohn.", tr: "Elif'in bir oğlu var.", answers: ["einen"],
          explain: "der Sohn → haben'den sonra einen Sohn.", tags: ["article", "case.acc"] },
        { type: "type", tr: "Bir kızım var.", answers: ["Ich habe eine Tochter."],
          explain: "die Tochter → eine Tochter. die-isimlerde eine değişmez.", tags: ["article", "verb.conj"] },
        { type: "article", word: "w.mann", explain: "der Mann. Erkek → der." },
        { type: "article", word: "w.tochter", explain: "die Tochter. -er ile bitiyor ama kadın → die." },
        { type: "order", tr: "Bir oğlun var mı?", answer: "Hast du einen Sohn?", extra: ["ein"],
          explain: "Ja/Nein sorusu: fiil başta. der Sohn → einen Sohn.", tags: ["word_order", "question"] },
        { type: "listen", de: "Wir haben ein Baby.", tr: "Bir bebeğimiz var." },
        { type: "speak", de: "Ich habe einen Bruder und eine Schwester.", tr: "Bir erkek kardeşim ve bir kız kardeşim var." }
      ]
    },

    // ───────────────────────── L4: Grammatik 2 + Wörter 2 ─────────────────────────
    {
      id: "u03.l4",
      title: "Annem, babam, kardeşlerim: mein/dein/Ihr ve çoğul",
      kind: "grammar",
      intro: "Türkçede “annem” deriz, ek sona gelir. Almancada iyelik önde ayrı bir kelimedir: meine Mutter. Ayrıca çoğula ilk adımı atıyoruz.",
      words: [
        { id: "w.mein", de: "mein", pos: "pron", tr: "benim (-im)", en: "my",
          ex: { de: "Das ist mein Vater.", tr: "Bu benim babam." },
          note: "die-isimlerde ve çoğulda meine: meine Mutter, meine Eltern." },
        { id: "w.dein", de: "dein", pos: "pron", tr: "senin (-in)", en: "your (informal)",
          ex: { de: "Ist das dein Bruder?", tr: "Bu senin erkek kardeşin mi?" },
          note: "du ile konuştuğun kişiye: dein Bruder, deine Schwester." },
        { id: "w.ihr_poss", de: "Ihr", pos: "pron", tr: "sizin (resmi)", en: "your (formal)",
          ex: { de: "Ist das Ihre Tochter?", tr: "Bu sizin kızınız mı?" },
          note: "Resmi Sie ile birlikte, her zaman büyük I ile: Ihr Sohn, Ihre Tochter." },
        { id: "w.onkel", de: "Onkel", pos: "n", art: "der", pl: "Onkel", tr: "amca, dayı, enişte", en: "uncle",
          ex: { de: "Mein Onkel wohnt in Bremen.", tr: "Amcam Bremen'de oturuyor." },
          note: "Amca da dayı da Onkel. Çoğulu aynı: die Onkel." },
        { id: "w.tante", de: "Tante", pos: "n", art: "die", pl: "Tanten", tr: "teyze, hala, yenge", en: "aunt",
          ex: { de: "Meine Tante ist jung.", tr: "Teyzem genç." },
          note: "Teyze, hala, yenge: hepsi Tante." },
        { id: "w.cousin", de: "Cousin", pos: "n", art: "der", pl: "Cousins", tr: "kuzen (erkek)", en: "cousin (male)",
          ex: { de: "Mein Cousin heißt Burak.", tr: "Kuzenimin adı Burak." },
          note: "Fransızcadan gelir: “kuzä” gibi okunur, sondaki n genizden çıkar." },
        { id: "w.cousine", de: "Cousine", pos: "n", art: "die", pl: "Cousinen", tr: "kuzen (kız)", en: "cousin (female)",
          ex: { de: "Meine Cousine wohnt in Hamburg.", tr: "Kuzenim Hamburg'da oturuyor." },
          note: "Okunuşu: “kuzine”." },
        { id: "w.freund", de: "Freund", pos: "n", art: "der", pl: "Freunde", tr: "arkadaş (erkek); erkek arkadaş, sevgili", en: "friend; boyfriend",
          ex: { de: "Das ist mein Freund Jonas.", tr: "Bu arkadaşım Jonas." },
          note: "Dikkat: mein Freund çoğu zaman “sevgilim” diye anlaşılır." },
        { id: "w.freundin", de: "Freundin", pos: "n", art: "die", pl: "Freundinnen", tr: "kız arkadaş; sevgili", en: "friend (female); girlfriend",
          ex: { de: "Meine Freundin heißt Lena.", tr: "Kız arkadaşımın adı Lena." },
          note: "-in eki kadını gösterir ve her zaman die: der Freund → die Freundin." },
        { id: "w.klein", de: "klein", pos: "adj", tr: "küçük; kısa boylu", en: "small, little",
          ex: { de: "Das Baby ist klein.", tr: "Bebek küçük." } },
        { id: "w.jung", de: "jung", pos: "adj", tr: "genç", en: "young",
          ex: { de: "Meine Mutter ist jung.", tr: "Annem genç." },
          note: "İngilizce young ile aynı kök. Zıttı: alt." },
        { id: "w.nett", de: "nett", pos: "adj", tr: "nazik, hoş, sevimli", en: "nice",
          ex: { de: "Mein Onkel ist nett.", tr: "Amcam nazik biri." },
          ff: "İngilizce net ile ilgisi yok: nett = nazik, hoş." }
      ],
      grammar: [
        { title: "mein / dein / Ihr",
          html: "<p>Türkçede iyelik eki sona gelir: anne<b>m</b>. Almancada önde ayrı bir kelime var ve ismin artikeline göre ek alır:</p>" +
            "<table><tr><th></th><th><span class=\"der\">der</span> / <span class=\"das\">das</span></th><th><span class=\"die\">die</span> / <span class=\"pl\">çoğul</span></th></tr>" +
            "<tr><td>benim</td><td>mein Vater, mein Kind</td><td>mein<b>e</b> Mutter, mein<b>e</b> Eltern</td></tr>" +
            "<tr><td>senin</td><td>dein Bruder</td><td>dein<b>e</b> Schwester</td></tr>" +
            "<tr><td>sizin (Sie)</td><td>Ihr Sohn</td><td>Ihr<b>e</b> Tochter</td></tr></table>" +
            "<p><b>Kural:</b> die-isimler ve çoğullar <b>-e</b> alır; der ve das eksiz kalır.</p>" +
            "<p class=\"bridge\">🇹🇷 annem → meine Mutter, babam → mein Vater, kardeşlerim → meine Geschwister.</p>" +
            "<p class=\"bridge en\">🇬🇧 my = mein, your = dein / Ihr. İngilizcede tek biçim var; Almancada -e eki eklenebilir.</p>" },
        { title: "Çoğul (Plural): ilk adım",
          html: "<p>Almancada çoğul tek bir ekle yapılmaz; her ismin çoğulunu kelimeyle birlikte öğren. Ama bir kural kesin: <b>çoğulun artikeli her zaman <span class=\"pl\">die</span></b>.</p>" +
            "<table><tr><th>Tekil</th><th>Çoğul</th></tr>" +
            "<tr><td><span class=\"der\">der</span> Bruder</td><td><span class=\"pl\">die</span> Brüder</td></tr>" +
            "<tr><td><span class=\"die\">die</span> Schwester</td><td><span class=\"pl\">die</span> Schwestern</td></tr>" +
            "<tr><td><span class=\"das\">das</span> Kind</td><td><span class=\"pl\">die</span> Kinder</td></tr>" +
            "<tr><td><span class=\"der\">der</span> Sohn</td><td><span class=\"pl\">die</span> Söhne</td></tr>" +
            "<tr><td>—</td><td><span class=\"pl\">die</span> Eltern, <span class=\"pl\">die</span> Geschwister</td></tr></table>" +
            "<p class=\"bridge\">🇹🇷 Dikkat: Türkçede “iki kardeş” deriz, isim tekil kalır. Almancada sayıdan sonra isim <b>çoğul</b> olur: zwei Brüder, drei Kinder (zwei Bruder değil!).</p>" }
      ],
      exercises: [
        { type: "cloze", de: "Das ist ___ Mutter.", tr: "Bu benim annem.", answers: ["meine"],
          explain: "die Mutter → meine Mutter. die-isimlerde -e eklenir.", tags: ["possessive"] },
        { type: "cloze", de: "Ist das ___ Bruder, Jonas?", tr: "Bu senin erkek kardeşin mi, Jonas?", answers: ["dein"],
          explain: "Jonas'a du diyorsun → dein. der Bruder → dein Bruder (eksiz).", tags: ["possessive"] },
        { type: "cloze", de: "Frau Schmidt, ist das ___ Tochter?", tr: "Schmidt Hanım, bu sizin kızınız mı?", answers: ["Ihre"],
          explain: "Frau Schmidt'e Sie diyorsun → Ihr. die Tochter → Ihre Tochter.", tags: ["possessive", "formal"] },
        { type: "mcq", q: "“kardeşlerim” Almancada nasıl?", options: ["meine Geschwister", "mein Geschwister", "meinen Geschwister"], answer: 0,
          explain: "Geschwister çoğul → çoğulda hep meine.", tags: ["possessive", "plural"] },
        { type: "mcq", q: "“İki erkek kardeşim var.” Hangisi doğru?", options: ["Ich habe zwei Brüder.", "Ich habe zwei Bruder.", "Ich habe zwei Bruders."], answer: 0,
          explain: "Türkçede sayıdan sonra isim tekil kalır, Almancada çoğul olur: zwei Brüder.", tags: ["plural"] },
        { type: "match", pairs: [["die Brüder", "erkek kardeşler"], ["die Schwestern", "kız kardeşler"], ["die Kinder", "çocuklar"], ["die Söhne", "oğullar"], ["die Töchter", "kız evlatlar"]], tags: ["plural"] },
        { type: "cloze", de: "Ich habe zwei ___.", tr: "İki çocuğum var.", answers: ["Kinder"], hint: "Kind",
          explain: "das Kind → die Kinder. Sayıdan sonra çoğul!", tags: ["plural"] },
        { type: "type", tr: "Bu benim teyzem.", answers: ["Das ist meine Tante."],
          explain: "die Tante → meine Tante. Teyze, hala, yenge: hepsi Tante.", tags: ["possessive"] },
        { type: "article", word: "w.onkel", explain: "der Onkel. -el ile bitiyor ve erkek → der." },
        { type: "article", word: "w.freundin", explain: "-in ile biten kadın isimleri her zaman die: die Freundin." },
        { type: "order", tr: "Bunlar senin anne baban mı?", answer: "Sind das deine Eltern?", extra: ["dein"],
          explain: "Eltern çoğul → sind ve deine.", tags: ["word_order", "possessive", "plural"] },
        { type: "speak", de: "Das ist meine Cousine. Sie wohnt in Hamburg.", tr: "Bu benim kuzenim. Hamburg'da oturuyor." }
      ]
    },

    // ───────────────────────── L5: Lesen & Schreiben ─────────────────────────
    {
      id: "u03.l5",
      title: "Okuma ve yazma: Benim ailem",
      kind: "read-write",
      intro: "Elif kurs için ailesini anlatan kısa bir metin yazdı. Önce oku ve dinle, sonra sen de aileni anlat.",
      dialog: {
        title: "Elif'in metni: Meine Familie",
        lines: [
          { s: "Elif", de: "Ich heiße Elif und wohne in Köln.", tr: "Adım Elif, Köln'de oturuyorum." },
          { s: "Elif", de: "Ich bin verheiratet. Mein Mann heißt Emre.", tr: "Evliyim. Kocamın adı Emre." },
          { s: "Elif", de: "Wir haben eine Tochter. Sie heißt Defne und ist drei Jahre alt.", tr: "Bir kızımız var. Adı Defne, üç yaşında." },
          { s: "Elif", de: "Meine Eltern leben zusammen in Izmir.", tr: "Annemle babam İzmir'de birlikte yaşıyor." },
          { s: "Elif", de: "Ich habe eine Schwester und zwei Brüder.", tr: "Bir kız kardeşim ve iki erkek kardeşim var." },
          { s: "Elif", de: "Meine Schwester Zeynep ist Single und wohnt in Ankara.", tr: "Kız kardeşim Zeynep bekâr ve Ankara'da oturuyor." },
          { s: "Elif", de: "Mein Bruder Mert ist geschieden. Er hat einen Sohn.", tr: "Erkek kardeşim Mert boşanmış. Bir oğlu var." },
          { s: "Elif", de: "Wir haben auch eine Katze. Sie heißt Minka und ist sehr lieb.", tr: "Bir de kedimiz var. Adı Minka, çok tatlı." }
        ]
      },
      words: [
        { id: "w.leben", de: "leben", pos: "v", tr: "yaşamak", en: "to live",
          ex: { de: "Meine Eltern leben in Izmir.", tr: "Annemle babam İzmir'de yaşıyor." },
          note: "wohnen = (bir adreste) oturmak, leben = yaşamak. Şehir için ikisi de olur. İngilizce live ile aynı kök." },
        { id: "w.zusammen", de: "zusammen", pos: "adv", tr: "birlikte", en: "together",
          ex: { de: "Wir wohnen zusammen.", tr: "Birlikte oturuyoruz." } },
        { id: "w.single", de: "Single", pos: "n", art: "der", artQuiz: false, pl: "Singles", tr: "bekâr (ilişkisi olmayan)", en: "single",
          ex: { de: "Ich bin Single.", tr: "Bekârım." },
          note: "Ich bin Single cümlesinde artikel yok. Resmi formlarda ise ledig yazılır." }
      ],
      exercises: [
        { type: "mcq", q: "Elif'in kocasının adı ne?", options: ["Emre", "Mert", "Can", "Defne"], answer: 0,
          explain: "Mein Mann heißt Emre. → Kocamın adı Emre." },
        { type: "mcq", q: "Defne kaç yaşında?", de: "Sie heißt Defne und ist drei Jahre alt.", options: ["üç", "iki", "on üç", "otuz"], answer: 0 },
        { type: "mcq", q: "Elif'in anne babası nerede yaşıyor?", options: ["İzmir'de", "Köln'de", "Ankara'da", "İstanbul'da"], answer: 0,
          explain: "Meine Eltern leben zusammen in Izmir." },
        { type: "mcq", q: "Mert hakkında hangisi doğru?", options: ["Boşanmış ve bir oğlu var.", "Evli ve bir kızı var.", "Bekâr.", "Köln'de oturuyor."], answer: 0,
          explain: "Mein Bruder Mert ist geschieden. Er hat einen Sohn." },
        { type: "cloze", de: "Meine Eltern leben ___ in Izmir.", tr: "Annemle babam İzmir'de birlikte yaşıyor.", answers: ["zusammen"], tags: ["vocab"] },
        { type: "cloze", de: "Mein Bruder ist ___. Er hat einen Sohn.", tr: "Erkek kardeşim boşanmış. Bir oğlu var.", answers: ["geschieden"], tags: ["vocab"] },
        { type: "order", tr: "Kız kardeşim bekâr.", answer: "Meine Schwester ist Single.",
          explain: "die Schwester → meine Schwester. Fiil (ist) 2. sırada.", tags: ["word_order", "possessive"] },
        { type: "type", tr: "Annemle babam Ankara'da yaşıyor.", answers: ["Meine Eltern leben in Ankara.", "Meine Eltern wohnen in Ankara."],
          explain: "Eltern çoğul → meine Eltern ve fiil çoğul: leben / wohnen.", tags: ["possessive", "verb.conj", "plural"] },
        { type: "listen", de: "Wir haben eine Tochter.", tr: "Bir kızımız var." },
        { type: "write",
          task: "Aileni anlat: en az 5 cümle yaz. Adın ve nerede oturduğun, medeni durumun, anne baban, kardeşlerin; varsa çocukların ya da evcil hayvanın.",
          taskDe: "Schreiben Sie über Ihre Familie.",
          minWords: 25,
          checklist: [
            "Her cümlede fiil 2. sırada mı? (Ich habe …, Mein Bruder wohnt …)",
            "Bütün isimler büyük harfle mi başlıyor? (Bruder, Mutter, Kinder)",
            "mein / meine doğru mu? (die-isimler ve çoğul → meine)",
            "Sayıdan sonra çoğul kullandın mı? (zwei Brüder, drei Kinder)",
            "haben + der-isimde einen yazdın mı? (einen Bruder, einen Sohn)"
          ],
          model: "Ich heiße Ayse und wohne in Berlin. Ich bin verheiratet. Mein Mann heißt Murat. Wir haben einen Sohn und eine Tochter. Mein Sohn ist sieben und meine Tochter ist vier Jahre alt. Meine Eltern leben in Istanbul. Ich habe auch zwei Schwestern. Sie wohnen in Bursa.",
          tags: ["possessive", "plural", "word_order"] }
      ]
    },

    // ───────────────────────── L6: Almanya'da hayat ─────────────────────────
    {
      id: "u03.l6",
      title: "Almanya'da hayat: Komşuna aileni anlat",
      kind: "life",
      intro: "Merdivende komşun Frau Becker ile karşılaşıyorsun; elinde telefonunda bir aile fotoğrafı var. Komşuyla Sie kullanırsın: Ihr, Ihre.",
      dialog: {
        title: "Merdivende komşuyla",
        lines: [
          { s: "Frau Becker", de: "Guten Tag, Frau Arslan! Oh, ein Foto! Ist das Ihre Familie?", tr: "İyi günler Arslan Hanım! Aa, bir fotoğraf! Bu sizin aileniz mi?" },
          { s: "Elif", de: "Ja, das ist meine Familie. Das ist mein Mann Emre, und das ist meine Tochter Defne.", tr: "Evet, bu benim ailem. Bu kocam Emre, bu da kızım Defne." },
          { s: "Frau Becker", de: "Wie alt ist Ihre Tochter?", tr: "Kızınız kaç yaşında?" },
          { s: "Elif", de: "Sie ist drei Jahre alt. Haben Sie auch Kinder, Frau Becker?", tr: "Üç yaşında. Sizin de çocuklarınız var mı, Becker Hanım?" },
          { s: "Frau Becker", de: "Ja, ich habe zwei Söhne. Sie wohnen in München. Und wer ist das hier?", tr: "Evet, iki oğlum var. Münih'te oturuyorlar. Peki buradaki kim?" },
          { s: "Elif", de: "Das sind meine Eltern. Sie leben in Izmir.", tr: "Bunlar annemle babam. İzmir'de yaşıyorlar." },
          { s: "Frau Becker", de: "Und Ihr Mann? Woher kommt er?", tr: "Ya kocanız? O nereli?" },
          { s: "Elif", de: "Er kommt auch aus der Türkei, aus Ankara.", tr: "O da Türkiyeli, Ankaralı." },
          { s: "Frau Becker", de: "Ihre Familie ist sehr nett!", tr: "Aileniz çok hoş!" },
          { s: "Elif", de: "Danke, Frau Becker!", tr: "Teşekkürler, Becker Hanım!" }
        ]
      },
      words: [
        { id: "w.verwitwet", de: "verwitwet", pos: "adj", tr: "dul (eşi ölmüş)", en: "widowed",
          ex: { de: "Meine Oma ist verwitwet.", tr: "Ninem dul." } },
        { id: "w.partner", de: "Partner", pos: "n", art: "der", pl: "Partner", tr: "partner, hayat arkadaşı (erkek)", en: "partner (male)",
          ex: { de: "Mein Partner heißt Tom.", tr: "Partnerimin adı Tom." },
          note: "Evli olmayan çiftler için çok kullanılır." },
        { id: "w.partnerin", de: "Partnerin", pos: "n", art: "die", pl: "Partnerinnen", tr: "partner, hayat arkadaşı (kadın)", en: "partner (female)",
          ex: { de: "Meine Partnerin heißt Anna.", tr: "Partnerimin adı Anna." },
          note: "-in → her zaman die." },
        { id: "w.kindergeld", de: "Kindergeld", pos: "n", art: "das", pl: "-", tr: "çocuk parası (devlet yardımı)", en: "child benefit",
          note: "Bileşik isim: das Kind + das Geld → das Kindergeld." },
        { id: "w.haustier", de: "Haustier", pos: "n", art: "das", pl: "Haustiere", tr: "evcil hayvan", en: "pet",
          ex: { de: "Hast du ein Haustier?", tr: "Evcil hayvanın var mı?" },
          note: "das Haus (ev) + das Tier (hayvan) → das Haustier." }
      ],
      grammar: [
        { title: "Formda aile bilgileri",
          html: "<p>Almanya'da birçok formda (Bürgeramt, Krankenkasse, iş yeri) şu alanları görürsün:</p>" +
            "<table><tr><th>Familienstand</th><td>ledig / verheiratet / geschieden / verwitwet</td></tr>" +
            "<tr><th>Kinder</th><td>ja / nein</td></tr>" +
            "<tr><th>Anzahl der Kinder</th><td>çocuk sayısı: 2</td></tr></table>" +
            "<p><b>Dikkat:</b> Konuşurken “Ich bin Single.” dersin, ama formda <b>ledig</b> işaretlersin.</p>" +
            "<p class=\"bridge\">🇹🇷 Komşuya ya da iş arkadaşına (Sie): Ist das <b>Ihre</b> Familie? Wie alt ist <b>Ihr</b> Sohn? Arkadaşa (du): <b>deine</b> Familie, <b>dein</b> Sohn.</p>" }
      ],
      culture: "Almanya'da aileler genelde küçük: kadın başına ortalama 1,4 civarı çocuk düşüyor ve evlerin yaklaşık %40'ında tek kişi yaşıyor. Patchwork-Familie çok yaygın: boşanan ya da ayrılan ebeveynler yeni partnerleriyle, önceki ilişkilerden olan çocuklarla birlikte yaşıyor (Stiefvater = üvey baba, Halbbruder = üvey kardeş). Evlenmeden birlikte yaşayan çiftler de çok; bu yüzden “mein Partner / meine Partnerin” sık duyarsın. Almanya'da yaşıyor ve vergi mükellefiysen, çocuğun için Familienkasse'den Kindergeld (çocuk parası) alabilirsin: çocuk başına ayda yaklaşık 250 € civarı, genelde 18 yaşına kadar (eğitimde ise 25'e kadar). Miktar ve koşullar değişebilir; güncel bilgiyi Familienkasse'den kontrol et.",
      exercises: [
        { type: "mcq", q: "Frau Becker'in kaç çocuğu var?", de: "Ja, ich habe zwei Söhne.", options: ["iki oğlu", "bir kızı", "iki kızı", "bir oğlu"], answer: 0,
          explain: "zwei Söhne = iki oğul. der Sohn → die Söhne." },
        { type: "mcq", q: "Formda “Familienstand: ledig” ne demek?", options: ["bekâr", "evli", "boşanmış", "dul"], answer: 0,
          explain: "ledig = bekâr (resmi). Konuşmada: Ich bin Single." },
        { type: "match", pairs: [["ledig", "bekâr"], ["verheiratet", "evli"], ["geschieden", "boşanmış"], ["verwitwet", "dul"], ["Kinder", "çocuklar"]], tags: ["vocab"] },
        { type: "cloze", de: "Frau Becker, wie alt sind ___ Söhne?", tr: "Becker Hanım, oğullarınız kaç yaşında?", answers: ["Ihre"],
          explain: "Komşuya Sie → Ihr. Söhne çoğul → Ihre.", tags: ["possessive", "formal", "plural"] },
        { type: "type", tr: "Sizin de çocuklarınız var mı?", answers: ["Haben Sie auch Kinder?"],
          explain: "Resmi: Haben Sie …? Sie her zaman büyük S ile.", tags: ["formal", "question"] },
        { type: "order", tr: "Bu sizin aileniz mi?", answer: "Ist das Ihre Familie?", extra: ["deine"],
          explain: "Komşuya Sie → Ihre. die Familie → Ihre Familie.", tags: ["word_order", "formal", "possessive"] },
        { type: "article", word: "w.haustier", explain: "Bileşik isimde son kelime belirler: das Tier → das Haustier." },
        { type: "article", word: "w.familienstand", explain: "Son kelime der Stand → der Familienstand." },
        { type: "speak", de: "Das ist mein Mann. Er heißt Emre.", tr: "Bu kocam. Adı Emre." },
        { type: "speak", de: "Wir haben eine Tochter. Sie ist drei Jahre alt.", tr: "Bir kızımız var. Üç yaşında." },
        { type: "speak", de: "Das sind meine Eltern. Sie leben in Izmir.", tr: "Bunlar annemle babam. İzmir'de yaşıyorlar." }
      ]
    }
  ]
});
