// Ünite 2 — Zahlen & Kontakte (Sayılar ve iletişim bilgileri)
// Gramer: G06 (düzenli fiiller, tüm kişiler), G07 Ja/Nein-Fragen, G08 sayılar 11–100, G23 und/aber.
// Ön bilgi: Ünite 0 (selam, alfabe, 0–10) ve Ünite 1 (zamirler, sein, heißen, kommen, wohnen, W-Fragen, V2).
DE.content.registerUnit({
  id: 'u02',
  order: 2,
  level: 'A1.1',
  title: 'Zahlen & Kontakte',
  titleTr: 'Sayılar ve iletişim bilgileri',
  goals: [
    '100\'e kadar sayıları anlayabilir ve söyleyebilirim.',
    'Yaşımı söyleyebilir, başkasına yaşını sorabilirim.',
    'Telefon numaramı, adresimi ve e-posta adresimi söyleyebilir, duyduğumda yazabilirim.',
    'Düzenli fiilleri (wohnen, lernen, arbeiten …) bütün kişilerle çekebilirim.',
    'Evet/hayır soruları sorabilir ve cevaplayabilirim.',
    'Basit bir kayıt formunu doldurabilirim.'
  ],
  lessons: [
    // ─────────────────────────────────────────────── L1 — Sayılar 11–100
    {
      id: 'u02.l1',
      title: 'Zahlen 11–100',
      kind: 'words',
      intro: 'Sıfırdan ona kadar biliyorsun. Şimdi 100\'e kadar gidiyoruz. Dikkat: 21–99 arası Almancada ters söylenir!',
      words: [
        { id: 'w.zahl', de: 'Zahl', pos: 'n', art: 'die', pl: 'Zahlen', tr: 'sayı', en: 'number',
          ex: { de: 'Die Zahl ist siebzehn.', tr: 'Sayı on yedi.' } },
        { id: 'w.elf', de: 'elf', pos: 'num', tr: 'on bir (11)', en: 'eleven',
          ex: { de: 'Zehn und eins ist elf.', tr: 'On artı bir on bir eder.' },
          note: 'İngilizce eleven ile akraba.' },
        { id: 'w.zwoelf', de: 'zwölf', pos: 'num', tr: 'on iki (12)', en: 'twelve',
          ex: { de: 'Zehn und zwei ist zwölf.', tr: 'On artı iki on iki eder.' },
          note: 'İngilizce twelve ile akraba. ö sesi Türkçedeki gibi.' },
        { id: 'w.dreizehn', de: 'dreizehn', pos: 'num', tr: 'on üç (13)', en: 'thirteen',
          ex: { de: 'Zehn und drei ist dreizehn.', tr: 'On artı üç on üç eder.' },
          note: '13–19: önce birler, sonra zehn (on). İngilizce thir-teen gibi.' },
        { id: 'w.vierzehn', de: 'vierzehn', pos: 'num', tr: 'on dört (14)', en: 'fourteen',
          ex: { de: 'Zehn und vier ist vierzehn.', tr: 'On artı dört on dört eder.' } },
        { id: 'w.fuenfzehn', de: 'fünfzehn', pos: 'num', tr: 'on beş (15)', en: 'fifteen',
          ex: { de: 'Zehn und fünf ist fünfzehn.', tr: 'On artı beş on beş eder.' } },
        { id: 'w.sechzehn', de: 'sechzehn', pos: 'num', tr: 'on altı (16)', en: 'sixteen',
          ex: { de: 'Zehn und sechs ist sechzehn.', tr: 'On artı altı on altı eder.' },
          note: 'Dikkat: sechs → sech-zehn (s düşer).' },
        { id: 'w.siebzehn', de: 'siebzehn', pos: 'num', tr: 'on yedi (17)', en: 'seventeen',
          ex: { de: 'Zehn und sieben ist siebzehn.', tr: 'On artı yedi on yedi eder.' },
          note: 'Dikkat: sieben → sieb-zehn (en düşer).' },
        { id: 'w.achtzehn', de: 'achtzehn', pos: 'num', tr: 'on sekiz (18)', en: 'eighteen',
          ex: { de: 'Neun und neun ist achtzehn.', tr: 'Dokuz artı dokuz on sekiz eder.' } },
        { id: 'w.neunzehn', de: 'neunzehn', pos: 'num', tr: 'on dokuz (19)', en: 'nineteen',
          ex: { de: 'Zehn und neun ist neunzehn.', tr: 'On artı dokuz on dokuz eder.' } },
        { id: 'w.zwanzig', de: 'zwanzig', pos: 'num', tr: 'yirmi (20)', en: 'twenty',
          ex: { de: 'Zehn und zehn ist zwanzig.', tr: 'On artı on yirmi eder.' },
          note: 'Onluklar -zig ile biter (İngilizce -ty gibi).' },
        { id: 'w.dreissig', de: 'dreißig', pos: 'num', tr: 'otuz (30)', en: 'thirty',
          ex: { de: 'Zwanzig und zehn ist dreißig.', tr: 'Yirmi artı on otuz eder.' },
          note: 'Tek istisna: -zig değil -ßig!' },
        { id: 'w.vierzig', de: 'vierzig', pos: 'num', tr: 'kırk (40)', en: 'forty',
          ex: { de: 'Zwanzig und zwanzig ist vierzig.', tr: 'Yirmi artı yirmi kırk eder.' } },
        { id: 'w.fuenfzig', de: 'fünfzig', pos: 'num', tr: 'elli (50)', en: 'fifty',
          ex: { de: 'Vierzig und zehn ist fünfzig.', tr: 'Kırk artı on elli eder.' } },
        { id: 'w.sechzig', de: 'sechzig', pos: 'num', tr: 'altmış (60)', en: 'sixty',
          ex: { de: 'Dreißig und dreißig ist sechzig.', tr: 'Otuz artı otuz altmış eder.' },
          note: 'sechs → sech-zig (s düşer, 16 gibi).' },
        { id: 'w.siebzig', de: 'siebzig', pos: 'num', tr: 'yetmiş (70)', en: 'seventy',
          ex: { de: 'Sechzig und zehn ist siebzig.', tr: 'Altmış artı on yetmiş eder.' },
          note: 'sieben → sieb-zig (en düşer, 17 gibi).' },
        { id: 'w.achtzig', de: 'achtzig', pos: 'num', tr: 'seksen (80)', en: 'eighty',
          ex: { de: 'Vierzig und vierzig ist achtzig.', tr: 'Kırk artı kırk seksen eder.' } },
        { id: 'w.neunzig', de: 'neunzig', pos: 'num', tr: 'doksan (90)', en: 'ninety',
          ex: { de: 'Achtzig und zehn ist neunzig.', tr: 'Seksen artı on doksan eder.' } },
        { id: 'w.hundert', de: 'hundert', pos: 'num', tr: 'yüz (100)', en: 'hundred',
          ex: { de: 'Fünfzig und fünfzig ist hundert.', tr: 'Elli artı elli yüz eder.' },
          note: 'einhundert de denir.' },
        { id: 'w.zwo', de: 'zwo', pos: 'num', tr: 'iki (telefonda, "zwei" yerine)', en: 'two (on the phone)',
          ex: { de: 'Null zwo zwo eins: zwo ist zwei.', tr: '0221: "zwo", "zwei" demek.' },
          note: 'zwei ve drei telefonda karışmasın diye çok kullanılır.' }
      ],
      grammar: [
        {
          title: '11–19: birler + zehn',
          html: '<table><tr><th>11</th><td>elf</td><th>16</th><td>sech<b>zehn</b> (s yok!)</td></tr>' +
            '<tr><th>12</th><td>zwölf</td><th>17</th><td>sieb<b>zehn</b> (en yok!)</td></tr>' +
            '<tr><th>13</th><td>drei<b>zehn</b></td><th>18</th><td>acht<b>zehn</b></td></tr>' +
            '<tr><th>14</th><td>vier<b>zehn</b></td><th>19</th><td>neun<b>zehn</b></td></tr>' +
            '<tr><th>15</th><td>fünf<b>zehn</b></td><th>20</th><td>zwanzig</td></tr></table>' +
            '<p class="bridge en">🇬🇧 İngilizcedeki gibi: thir<b>teen</b> = drei<b>zehn</b>. 11 ve 12 de özel: eleven/twelve = elf/zwölf.</p>'
        },
        {
          title: '21–99: ters söylenir!',
          html: '<p>Almanca önce <b>birleri</b>, sonra <b>onlukları</b> söyler ve arasına <b>und</b> (ve) koyar. Hepsi <b>bitişik</b> yazılır.</p>' +
            '<table><tr><th>21</th><td><b>ein</b>und<b>zwanzig</b></td><td>bir-ve-yirmi</td></tr>' +
            '<tr><th>34</th><td><b>vier</b>und<b>dreißig</b></td><td>dört-ve-otuz</td></tr>' +
            '<tr><th>57</th><td><b>sieben</b>und<b>fünfzig</b></td><td>yedi-ve-elli</td></tr>' +
            '<tr><th>99</th><td><b>neun</b>und<b>neunzig</b></td><td>dokuz-ve-doksan</td></tr></table>' +
            '<p class="bridge">🇹🇷 Türkçede "yirmi bir" (önce onluk). Almancada "bir-ve-yirmi". Dinlerken ilk duyduğun rakam <b>sağa</b> yazılır: <i>vierund…</i> → _4, <i>…dreißig</i> → 34.</p>' +
            '<p class="bridge en">🇬🇧 İngilizcede twenty-one; eski İngilizcede "four-and-twenty" Almanca gibiydi.</p>' +
            '<p>Onluklar: 30 drei<b>ß</b>ig (tek istisna), 40 vierzig, 50 fünfzig, 60 sechzig, 70 siebzig, 80 achtzig, 90 neunzig, 100 hundert. 21, 31 … : <b>eins</b> değil <b>ein</b>und…</p>'
        }
      ],
      exercises: [
        { type: 'match', pairs: [['elf', '11'], ['zwölf', '12'], ['sechzehn', '16'], ['siebzehn', '17'], ['zwanzig', '20']], tags: ['number'] },
        { type: 'match', pairs: [['dreißig', '30'], ['vierzig', '40'], ['fünfzig', '50'], ['sechzig', '60'], ['siebzig', '70'], ['neunzig', '90']], tags: ['number'] },
        { type: 'mcq', q: 'Dinle: hangi sayı?', de: 'vierundfünfzig', options: ['45', '54', '44', '55'], answer: 1,
          explain: 'vier-und-fünfzig = dört-ve-elli → 54. Önce birler (4), sonra onluk (50).', tags: ['number'] },
        { type: 'listen', de: 'dreiundzwanzig', tr: 'Duyduğun sayıyı yaz (rakamla ya da yazıyla).', answers: ['23', 'dreiundzwanzig'],
          explain: 'drei (3) + und + zwanzig (20) = 23. İlk duyduğun rakam sağa!', tags: ['number'] },
        { type: 'listen', de: 'siebenundsechzig', tr: 'Duyduğun sayıyı yaz (rakamla ya da yazıyla).', answers: ['67', 'siebenundsechzig'],
          explain: 'sieben (7) + sechzig (60) = 67. 76 olsaydı: sechsundsiebzig.', tags: ['number'] },
        { type: 'listen', de: 'achtunddreißig', tr: 'Duyduğun sayıyı yaz (rakamla ya da yazıyla).', answers: ['38', 'achtunddreißig'],
          explain: 'acht (8) + dreißig (30) = 38.', tags: ['number'] },
        { type: 'mcq', q: 'Dinle: hangi sayı?', de: 'neunundneunzig', options: ['19', '90', '99', '89'], answer: 2,
          explain: 'neun-und-neunzig = dokuz-ve-doksan → 99.', tags: ['number'] },
        { type: 'type', q: 'Sayıyı Almanca yazıyla yaz.', tr: '21', answers: ['einundzwanzig'],
          explain: 'eins değil ein: ein-und-zwanzig. Hepsi bitişik yazılır.', tags: ['number', 'spelling'] },
        { type: 'type', q: 'Sayıyı Almanca yazıyla yaz.', tr: '76', answers: ['sechsundsiebzig'],
          explain: 'sechs (6) + und + siebzig (70). siebzig\'de "en" düşer: sieb-zig.', tags: ['number', 'spelling'] },
        { type: 'mcq', q: '16 Almancada nasıl yazılır?', options: ['sechszehn', 'sechzehn', 'sechzig', 'seckzehn'], answer: 1,
          explain: 'sechs\'in sonundaki s düşer: sech-zehn. 60 da öyle: sech-zig.', tags: ['number', 'spelling'] },
        { type: 'cloze', de: 'Zwanzig und zehn ist ___.', tr: '20 + 10 = 30', answers: ['dreißig'],
          explain: '30 tek istisna: drei-ßig (-zig değil).', tags: ['number', 'spelling'] },
        { type: 'speak', de: 'elf, zwölf, dreizehn, vierzehn, fünfzehn', tr: '11, 12, 13, 14, 15' }
      ]
    },

    // ─────────────────────────────────────────────── L2 — Telefon, adres, e-posta (diyalog)
    {
      id: 'u02.l2',
      title: 'Nummer, Adresse, E-Mail',
      kind: 'dialog',
      intro: 'Kurstan Elif, Jonas\'tan numarasını, adresini ve e-posta adresini istiyor. Almanlar bunları nasıl söylüyor, dinle.',
      dialog: {
        title: 'Kursta numara alışverişi',
        lines: [
          { s: 'Elif', de: 'Jonas, wie ist deine Handynummer?', tr: 'Jonas, cep numaran ne?' },
          { s: 'Jonas', de: 'Null eins sieben sechs, zwo vier acht, drei sechs neun eins.', tr: '0176 248 3691.' },
          { s: 'Elif', de: 'Zwo? Was ist „zwo“?', tr: '"Zwo" mu? "Zwo" ne?' },
          { s: 'Jonas', de: 'Zwo ist zwei. Am Telefon sagt man oft „zwo“.', tr: 'Zwo, iki demek. Telefonda sık sık "zwo" denir.' },
          { s: 'Elif', de: 'Ah, danke! Und wie ist deine Adresse?', tr: 'Ha, teşekkürler! Peki adresin ne?' },
          { s: 'Jonas', de: 'Bergstraße vierzehn, fünf null sieben drei neun Köln.', tr: 'Bergstraße 14, 50739 Köln.' },
          { s: 'Elif', de: 'Und wie ist deine E-Mail-Adresse?', tr: 'Peki e-posta adresin ne?' },
          { s: 'Jonas', de: 'Jonas Punkt Vilkas at web Punkt de.', tr: 'jonas.vilkas@web.de' },
          { s: 'Elif', de: 'Wie bitte? Langsam, bitte!', tr: 'Efendim? Yavaş lütfen!' },
          { s: 'Jonas', de: 'Jonas – Punkt – Vilkas – at – web – Punkt – de.', tr: 'jonas – . – vilkas – @ – web – . – de' },
          { s: 'Elif', de: 'Danke, Jonas!', tr: 'Teşekkürler, Jonas!' },
          { s: 'Jonas', de: 'Bitte! Und deine Nummer, Elif?', tr: 'Rica ederim! Ya senin numaran, Elif?' },
          { s: 'Elif', de: 'Null eins fünf zwo, drei acht sechs, eins sieben vier neun.', tr: '0152 386 1749.' }
        ]
      },
      words: [
        { id: 'w.adresse', de: 'Adresse', pos: 'n', art: 'die', pl: 'Adressen', tr: 'adres', en: 'address',
          ex: { de: 'Wie ist deine Adresse?', tr: 'Adresin ne?' }, note: 'Almancada çift s: Adresse (İngilizcede address, çift d).' },
        { id: 'w.strasse', de: 'Straße', pos: 'n', art: 'die', pl: 'Straßen', tr: 'sokak, cadde', en: 'street',
          ex: { de: 'Die Straße heißt Bergstraße.', tr: 'Sokağın adı Bergstraße.' }, note: 'Kısaltması: Str. Sokak adına bitişik yazılır: Bergstraße.' },
        { id: 'w.hausnummer', de: 'Hausnummer', pos: 'n', art: 'die', pl: 'Hausnummern', tr: 'kapı numarası, bina no', en: 'house number',
          ex: { de: 'Die Hausnummer ist vierzehn.', tr: 'Kapı numarası on dört.' }, note: 'Sokak adından SONRA gelir: Bergstraße 14.' },
        { id: 'w.postleitzahl', de: 'Postleitzahl', pos: 'n', art: 'die', pl: 'Postleitzahlen', tr: 'posta kodu', en: 'postcode, ZIP code',
          ex: { de: 'Die Postleitzahl ist fünf null sieben drei neun.', tr: 'Posta kodu 50739.' }, note: 'Kısaltması PLZ. Beş haneli, şehirden ÖNCE yazılır: 50739 Köln.' },
        { id: 'w.nummer', de: 'Nummer', pos: 'n', art: 'die', pl: 'Nummern', tr: 'numara', en: 'number',
          ex: { de: 'Wie ist deine Nummer?', tr: 'Numaran ne?' }, note: 'Telefon, kapı numarası gibi "numara". Sayı (matematik) = die Zahl.' },
        { id: 'w.telefonnummer', de: 'Telefonnummer', pos: 'n', art: 'die', pl: 'Telefonnummern', tr: 'telefon numarası', en: 'phone number',
          ex: { de: 'Wie ist Ihre Telefonnummer?', tr: 'Telefon numaranız ne?' } },
        { id: 'w.handy', de: 'Handy', pos: 'n', art: 'das', pl: 'Handys', tr: 'cep telefonu', en: 'mobile phone, cell phone',
          ex: { de: 'Wo ist mein Handy?', tr: 'Telefonum nerede?' },
          ff: 'İngilizce "handy" = kullanışlı demek. Almanca das Handy = cep telefonu (İngilizcede mobile/cell phone). İngilizce konuşana "handy" deme!' },
        { id: 'w.handynummer', de: 'Handynummer', pos: 'n', art: 'die', pl: 'Handynummern', tr: 'cep telefonu numarası', en: 'mobile number',
          ex: { de: 'Wie ist deine Handynummer?', tr: 'Cep numaran ne?' }, note: 'Handy (das) + Nummer (die) → die Handynummer: artikeli SON kelime belirler.' },
        { id: 'w.e_mail', de: 'E-Mail', pos: 'n', art: 'die', pl: 'E-Mails', tr: 'e-posta', en: 'email',
          ex: { de: 'Wie ist deine E-Mail-Adresse?', tr: 'E-posta adresin ne?' }, note: 'Adres için: die E-Mail-Adresse.' },
        { id: 'w.punkt', de: 'Punkt', pos: 'n', art: 'der', pl: 'Punkte', tr: 'nokta', en: 'dot, point',
          ex: { de: 'web Punkt de', tr: 'web.de' } },
        { id: 'w.at', de: 'at', pos: 'other', tr: '@ işareti ("et")', en: 'at (@)',
          ex: { de: 'Emre Punkt Polat at web Punkt de', tr: 'emre.polat@web.de' }, note: 'İngilizce gibi "et" okunur. Bazen şakayla "Klammeraffe" de denir.' }
      ],
      grammar: [
        {
          title: 'Kalıp: Wie ist deine / Ihre …?',
          html: '<p>Bilgi sormak için: <b>Wie ist deine …?</b> (sen) / <b>Wie ist Ihre …?</b> (siz, resmi). Cevap: <b>Meine … ist …</b></p>' +
            '<table><tr><th>sen</th><td>Wie ist <b>deine</b> Adresse?</td></tr>' +
            '<tr><th>siz</th><td>Wie ist <b>Ihre</b> Handynummer?</td></tr>' +
            '<tr><th>cevap</th><td><b>Meine</b> Adresse ist Bergstraße 14.</td></tr></table>' +
            '<p>Güzel haber: <span class="die">die</span> Adresse, <span class="die">die</span> Nummer, <span class="die">die</span> Telefonnummer, <span class="die">die</span> Handynummer, <span class="die">die</span> E-Mail — hepsi <b>die</b>, yani hepsinde <b>meine / deine / Ihre</b>.</p>' +
            '<p class="bridge">🇹🇷 Türkçede "Adresin ne?" Almancada "Adresin <i>nasıl</i>?" (Wie ist …?) denir. "Was ist deine Adresse?" yanlış değil ama doğal olan <b>Wie</b>.</p>'
        },
        {
          title: 'Numara ve e-posta nasıl söylenir?',
          html: '<ul><li>Telefon numarası <b>rakam rakam</b> (null eins sieben sechs …) ya da <b>ikişer ikişer</b> (… zweiundfünfzig, achtundvierzig) söylenir.</li>' +
            '<li>Telefonda 2 için çoğu zaman <b>zwo</b> denir (zwei ile drei karışmasın).</li>' +
            '<li>Adres: <b>Straße + Hausnummer</b>, sonra <b>Postleitzahl + Stadt</b>: Bergstraße 14, 50739 Köln.</li>' +
            '<li>E-posta: <b>@ = at</b>, <b>. = Punkt</b>, <b>- = Bindestrich</b>. ".de" harf harf okunur: "de-e".</li></ul>'
        }
      ],
      culture: 'Almanya\'da cep numaraları 015…, 016… veya 017… ile başlar. Sabit hatlarda önce şehir kodu (Vorwahl) gelir: Köln 0221, Berlin 030. Posta kodu (PLZ) her zaman 5 hanelidir.',
      exercises: [
        { type: 'mcq', q: 'Diyalogda Jonas\'ın cep numarası hangisi?', options: ['0176 248 3691', '0176 284 3691', '0167 248 3691'], answer: 0,
          explain: 'Null eins sieben sechs (0176), zwo vier acht (248), drei sechs neun eins (3691).', tags: ['number'] },
        { type: 'mcq', q: '"zwo" ne demek?', options: ['iki', 'üç', 'on iki', 'yirmi'], answer: 0,
          explain: 'zwo = zwei (2). Telefonda zwei ile drei karışmasın diye kullanılır.', tags: ['number', 'vocab'] },
        { type: 'listen', de: 'null eins fünf zwo, drei acht sechs, eins sieben vier neun', tr: 'Duyduğun telefon numarasını rakamla yaz.',
          answers: ['0152 386 1749', '01523861749', '0152 3861749', '0152-3861749', '0152/3861749'],
          explain: 'Rakam rakam söylendi; zwo = 2. Numara: 0152 386 1749.', tags: ['number'] },
        { type: 'cloze', de: 'Wie ist deine ___?', tr: 'Cep numaran ne?', answers: ['Handynummer'],
          explain: 'Handy + Nummer = die Handynummer. İsim olduğu için büyük harfle.', tags: ['vocab'] },
        { type: 'match', pairs: [['die Straße', 'sokak, cadde'], ['die Hausnummer', 'kapı numarası'], ['die Postleitzahl', 'posta kodu'], ['die Stadt', 'şehir'], ['das Handy', 'cep telefonu']], tags: ['vocab'] },
        { type: 'article', word: 'w.handy', explain: 'das Handy — ama die Handynummer: bileşik isimde artikeli son kelime (die Nummer) belirler.' },
        { type: 'article', word: 'w.adresse' },
        { type: 'type', tr: 'Adresin ne? (sen)', answers: ['Wie ist deine Adresse?'],
          explain: 'Almancada "adresin nasıl?" diye sorulur: Wie ist deine Adresse?', tags: ['question'] },
        { type: 'type', tr: 'Telefon numaranız ne? (resmi)', answers: ['Wie ist Ihre Telefonnummer?', 'Wie ist Ihre Nummer?'],
          explain: 'Resmi konuşmada Ihre (büyük I ile): Wie ist Ihre Telefonnummer?', tags: ['question', 'formal'] },
        { type: 'order', tr: 'E-posta adresin ne?', answer: 'Wie ist deine E-Mail-Adresse?', extra: ['Was'], tags: ['question', 'word_order'] },
        { type: 'mcq', q: '"emre.polat@web.de" nasıl söylenir?',
          options: ['Emre Punkt Polat at web Punkt de', 'Emre Komma Polat at web Komma de', 'Emre Punkt Polat und web Punkt de'], answer: 0,
          explain: '. = Punkt, @ = at. "und" sadece "ve" demek.', tags: ['vocab'] },
        { type: 'speak', de: 'Wie ist deine Handynummer?', tr: 'Cep numaran ne?' }
      ]
    },

    // ─────────────────────────────────────────────── L3 — Präsens: düzenli fiiller, tüm kişiler
    {
      id: 'u02.l3',
      title: 'Fiil çekimi: wohnen, lernen, arbeiten',
      kind: 'grammar',
      intro: 'ich wohne, du wohnst … Ünite 1\'de bazı kişileri gördün. Şimdi tablonun tamamı: ich\'ten Sie\'ye kadar.',
      dialog: {
        title: 'Kursta: Frau Becker soruyor',
        lines: [
          { s: 'Frau Becker', de: 'Guten Morgen! Woher kommt ihr?', tr: 'Günaydın! Nerelisiniz? (siz, çoğul)' },
          { s: 'Elif', de: 'Ich komme aus Izmir und Emre kommt aus Ankara.', tr: 'Ben İzmirliyim, Emre de Ankaralı.' },
          { s: 'Frau Becker', de: 'Und wo wohnt ihr?', tr: 'Peki nerede oturuyorsunuz?' },
          { s: 'Emre', de: 'Wir wohnen in Köln.', tr: 'Köln\'de oturuyoruz.' },
          { s: 'Frau Becker', de: 'Und was macht ihr?', tr: 'Peki ne yapıyorsunuz?' },
          { s: 'Elif', de: 'Ich arbeite in Bonn und ich lerne Deutsch.', tr: 'Bonn\'da çalışıyorum ve Almanca öğreniyorum.' },
          { s: 'Emre', de: 'Ich arbeite auch. Wir lernen hier Deutsch!', tr: 'Ben de çalışıyorum. Burada Almanca öğreniyoruz!' }
        ]
      },
      words: [
        { id: 'w.arbeiten', de: 'arbeiten', pos: 'v', tr: 'çalışmak', en: 'to work',
          ex: { de: 'Ich arbeite in Köln.', tr: 'Köln\'de çalışıyorum.' },
          note: 'du arbeitest, er arbeitet, ihr arbeitet (araya e girer).' },
        { id: 'w.machen', de: 'machen', pos: 'v', tr: 'yapmak', en: 'to do, to make',
          ex: { de: 'Was machst du? – Ich lerne Deutsch.', tr: 'Ne yapıyorsun? – Almanca öğreniyorum.' } }
      ],
      grammar: [
        {
          title: 'Präsens: kök + kişi eki',
          html: '<p>Mastardan <b>-en</b> at → kök kalır (wohn-, lern-, komm-). Köke kişi ekini ekle:</p>' +
            '<table><tr><th></th><th>ek</th><th>wohnen</th><th>lernen</th><th>kommen</th></tr>' +
            '<tr><td>ich</td><td><b>-e</b></td><td>wohne</td><td>lerne</td><td>komme</td></tr>' +
            '<tr><td>du</td><td><b>-st</b></td><td>wohnst</td><td>lernst</td><td>kommst</td></tr>' +
            '<tr><td>er/sie/es</td><td><b>-t</b></td><td>wohnt</td><td>lernt</td><td>kommt</td></tr>' +
            '<tr><td>wir</td><td><b>-en</b></td><td>wohnen</td><td>lernen</td><td>kommen</td></tr>' +
            '<tr><td>ihr</td><td><b>-t</b></td><td>wohnt</td><td>lernt</td><td>kommt</td></tr>' +
            '<tr><td>sie/Sie</td><td><b>-en</b></td><td>wohnen</td><td>lernen</td><td>kommen</td></tr></table>' +
            '<p>Kolaylık: <b>wir</b>, <b>sie</b> (onlar) ve <b>Sie</b> (siz, resmi) = mastarın aynısı. <b>er</b> ve <b>ihr</b> aynı: -t.</p>' +
            '<p class="bridge">🇹🇷 Türkçede de kişi eki var: otur-uyor-<b>um</b> / -<b>sun</b> / -<b>uz</b>. Almancada ek doğrudan köke gelir: wohn-<b>e</b> / wohn-<b>st</b> / wohn-<b>en</b>.</p>' +
            '<p class="bridge en">🇬🇧 İngilizcede sadece he/she -s alır (he lives). Almancada <b>her kişinin</b> eki var.</p>'
        },
        {
          title: 'arbeiten: araya e girer',
          html: '<p>Kök <b>-t</b> veya <b>-d</b> ile bitiyorsa (arbeit-), du / er / ihr formunda araya <b>e</b> girer. Yoksa "arbeitst" söylenemez!</p>' +
            '<table><tr><td>ich</td><td>arbeite</td><td>wir</td><td>arbeiten</td></tr>' +
            '<tr><td>du</td><td>arbeit<b>e</b>st</td><td>ihr</td><td>arbeit<b>e</b>t</td></tr>' +
            '<tr><td>er/sie/es</td><td>arbeit<b>e</b>t</td><td>sie/Sie</td><td>arbeiten</td></tr></table>' +
            '<p>Hatırlatma: <b>heißen</b> → du hei<b>ßt</b> (ß + st → sadece t eklenir).</p>'
        }
      ],
      exercises: [
        { type: 'cloze', de: 'Ich ___ in Köln.', hint: 'wohnen', tr: 'Köln\'de oturuyorum.', answers: ['wohne'],
          explain: 'ich → -e: wohn-e.', tags: ['verb.conj'] },
        { type: 'cloze', de: 'Du ___ Deutsch.', hint: 'lernen', tr: 'Almanca öğreniyorsun.', answers: ['lernst'],
          explain: 'du → -st: lern-st.', tags: ['verb.conj'] },
        { type: 'cloze', de: 'Elif ___ in Bonn.', hint: 'arbeiten', tr: 'Elif Bonn\'da çalışıyor.', answers: ['arbeitet'],
          explain: 'Elif = sie → -t. Kök -t ile bitiyor, araya e: arbeit-e-t.', tags: ['verb.conj'] },
        { type: 'cloze', de: 'Wir ___ aus der Türkei.', hint: 'kommen', tr: 'Türkiye\'den geliyoruz.', answers: ['kommen'],
          explain: 'wir → -en, yani mastarın aynısı: kommen.', tags: ['verb.conj'] },
        { type: 'cloze', de: 'Du ___ in Berlin.', hint: 'arbeiten', tr: 'Berlin\'de çalışıyorsun.', answers: ['arbeitest'],
          explain: '"arbeitst" söylenemez; araya e girer: arbeit-e-st.', tags: ['verb.conj', 'spelling'] },
        { type: 'mcq', q: 'Boşluğa hangisi gelir? "Jonas und Elif ___ Deutsch."', options: ['lernt', 'lernen', 'lernst', 'lerne'], answer: 1,
          explain: 'Jonas und Elif = sie (onlar) → -en: lernen.', tags: ['verb.conj'] },
        { type: 'mcq', q: 'Boşluğa hangisi gelir? "Was ___ ihr?"', options: ['machst', 'machen', 'macht', 'mache'], answer: 2,
          explain: 'ihr → -t: macht. (er macht ile aynı.)', tags: ['verb.conj'] },
        { type: 'match', pairs: [['ich arbeite', 'ben çalışıyorum'], ['du arbeitest', 'sen çalışıyorsun'], ['er arbeitet', 'o (erkek) çalışıyor'], ['wir arbeiten', 'biz çalışıyoruz'], ['ihr arbeitet', 'siz (çoğul) çalışıyorsunuz']], tags: ['verb.conj'] },
        { type: 'type', tr: 'Biz Almanca öğreniyoruz.', answers: ['Wir lernen Deutsch.'],
          explain: 'wir + mastar: Wir lernen Deutsch.', tags: ['verb.conj'] },
        { type: 'type', tr: 'O (erkek) Köln\'de çalışıyor.', answers: ['Er arbeitet in Köln.'],
          explain: 'er → arbeit-e-t.', tags: ['verb.conj'] },
        { type: 'order', tr: 'Nerede oturuyorsunuz? (resmi)', answer: 'Wo wohnen Sie?', extra: ['wohnt'],
          explain: 'Sie (resmi) → -en: wohnen. Soru kelimesi 1., fiil 2. sırada.', tags: ['verb.conj', 'formal', 'word_order'] },
        { type: 'speak', de: 'Ich arbeite in Köln und ich lerne Deutsch.', tr: 'Köln\'de çalışıyorum ve Almanca öğreniyorum.' }
      ]
    },

    // ─────────────────────────────────────────────── L4 — Ja/Nein-Fragen, und/aber, yaş
    {
      id: 'u02.l4',
      title: 'Ja/Nein-Fragen, und/aber, yaş',
      kind: 'grammar',
      intro: '"Köln\'de mi oturuyorsun?" Almancada -mi eki yok; fiili başa alırsın. Bir de yaş sormayı ve "ama" demeyi öğreniyoruz.',
      dialog: {
        title: 'Kursta mola',
        lines: [
          { s: 'Jonas', de: 'Elif, wie alt bist du?', tr: 'Elif, kaç yaşındasın?' },
          { s: 'Elif', de: 'Ich bin achtundzwanzig Jahre alt. Und du?', tr: 'Yirmi sekiz yaşındayım. Ya sen?' },
          { s: 'Jonas', de: 'Ich bin einunddreißig. Arbeitest du in Köln?', tr: 'Otuz bir yaşındayım. Köln\'de mi çalışıyorsun?' },
          { s: 'Elif', de: 'Nein, ich arbeite in Bonn, aber ich wohne in Köln.', tr: 'Hayır, Bonn\'da çalışıyorum ama Köln\'de oturuyorum.' },
          { s: 'Jonas', de: 'Lernst du auch Englisch?', tr: 'İngilizce de öğreniyor musun?' },
          { s: 'Elif', de: 'Nein. Ich spreche Türkisch und Englisch, aber ich lerne Deutsch.', tr: 'Hayır. Türkçe ve İngilizce konuşuyorum ama Almanca öğreniyorum.' }
        ]
      },
      words: [
        { id: 'w.alt', de: 'alt', pos: 'adj', tr: 'yaşlı; eski; … yaşında', en: 'old',
          ex: { de: 'Wie alt bist du?', tr: 'Kaç yaşındasın?' }, note: 'Wie alt …? = Kaç yaşında …?' },
        { id: 'w.jahr', de: 'Jahr', pos: 'n', art: 'das', pl: 'Jahre', tr: 'yıl', en: 'year',
          ex: { de: 'Ich bin dreißig Jahre alt.', tr: 'Otuz yaşındayım.' } },
        { id: 'w.alter', de: 'Alter', pos: 'n', art: 'das', pl: '-', tr: 'yaş', en: 'age',
          ex: { de: 'Alter: achtundzwanzig Jahre', tr: 'Yaş: 28' }, note: 'Formlarda görürsün. Konuşurken: Wie alt sind Sie?' },
        { id: 'w.aber', de: 'aber', pos: 'conj', tr: 'ama, fakat', en: 'but',
          ex: { de: 'Ich arbeite in Bonn, aber ich wohne in Köln.', tr: 'Bonn\'da çalışıyorum ama Köln\'de oturuyorum.' }, note: 'Önüne virgül gelir.' }
      ],
      grammar: [
        {
          title: 'Ja/Nein-Fragen: fiil başa',
          html: '<table><tr><th>Cümle</th><td>Du <b>wohnst</b> in Köln.</td></tr>' +
            '<tr><th>Soru</th><td><b>Wohnst</b> du in Köln?</td></tr>' +
            '<tr><th>Cevap</th><td>Ja, ich wohne in Köln. / Nein, ich wohne in Bonn.</td></tr></table>' +
            '<p class="bridge">🇹🇷 Türkçede soru eki var: Köln\'de oturuyor <b>musun</b>? Almancada ek yok: fiili <b>1. sıraya</b> al, sesi sonda yükselt ↗.</p>' +
            '<p class="bridge en">🇬🇧 İngilizcedeki "do" yok: Do you live …? → <b>Wohnst du</b> …? ("Lives you…?" gibi). Are you…? → Bist du…? ile aynı mantık.</p>' +
            '<p>Karşılaştır: W-sorusunda fiil <b>2.</b> sırada (<i>Wo wohnst du?</i>), evet/hayır sorusunda <b>1.</b> sırada (<i>Wohnst du …?</i>).</p>'
        },
        {
          title: 'und / aber',
          html: '<p><b>und</b> (ve) ve <b>aber</b> (ama) iki cümleyi bağlar; <b>kelime sırasını bozmaz</b> (0. pozisyon). Arkadan gelen cümle normal başlar.</p>' +
            '<ul><li>Ich komme aus der Türkei <b>und</b> ich wohne in Köln.</li>' +
            '<li>Ich komme aus der Türkei<b>, aber</b> ich wohne in Köln.</li></ul>' +
            '<p>aber\'den önce <b>virgül</b> konur.</p>'
        },
        {
          title: 'Yaş: Wie alt …?',
          html: '<table><tr><th>sen</th><td>Wie alt <b>bist</b> du?</td></tr>' +
            '<tr><th>siz</th><td>Wie alt <b>sind</b> Sie?</td></tr>' +
            '<tr><th>cevap</th><td>Ich <b>bin</b> 30 Jahre alt. / Ich bin 30.</td></tr></table>' +
            '<p class="bridge">🇹🇷 Türkçede "30 yaşındayım". Almancada kelimesi kelimesine "30 yıl yaşlıyım": <b>sein</b> + sayı + <b>Jahre alt</b>.</p>' +
            '<p class="bridge en">🇬🇧 İngilizceyle birebir aynı: I am 30 years old = Ich bin 30 Jahre alt.</p>'
        }
      ],
      exercises: [
        { type: 'order', tr: 'Köln\'de mi oturuyorsun?', answer: 'Wohnst du in Köln?',
          explain: 'Evet/hayır sorusunda fiil başa: Wohnst du …?', tags: ['question', 'word_order'] },
        { type: 'order', tr: 'Almanca mı öğreniyorsunuz? (resmi)', answer: 'Lernen Sie Deutsch?',
          explain: 'Fiil 1. sırada, sonra Sie.', tags: ['question', 'word_order', 'formal'] },
        { type: 'order', tr: 'Türkiye\'den geliyorum ama Köln\'de oturuyorum.', answer: 'Ich komme aus der Türkei, aber ich wohne in Köln.',
          explain: 'aber sırayı bozmaz: aber + ich + wohne …', tags: ['word_order'] },
        { type: 'mcq', q: 'Hangisi evet/hayır sorusu?', options: ['Wo arbeitest du?', 'Arbeitest du in Köln?', 'Du arbeitest in Köln.'], answer: 1,
          explain: 'Fiil başta ve soru kelimesi yok → evet/hayır sorusu.', tags: ['question'] },
        { type: 'mcq', q: '"Wohnst du in Bonn?" — "Hayır, Köln\'de oturuyorum." Hangisi?',
          options: ['Ja, ich wohne in Köln.', 'Nein, ich wohne in Köln.', 'Nein, du wohnst in Köln.'], answer: 1,
          explain: 'Hayır = Nein. Kendinden bahsediyorsun: ich wohne.', tags: ['question'] },
        { type: 'cloze', de: '___ du in Köln?', hint: 'arbeiten', tr: 'Köln\'de mi çalışıyorsun?', answers: ['Arbeitest'],
          explain: 'Fiil başa geçer ve du ile çekilir: Arbeit-e-st du …?', tags: ['question', 'verb.conj'] },
        { type: 'cloze', de: 'Ich spreche Türkisch, ___ ich lerne Deutsch.', tr: 'Türkçe konuşuyorum ama Almanca öğreniyorum.', answers: ['aber'],
          explain: 'ama = aber. Önünde virgül var.', tags: ['vocab'] },
        { type: 'cloze', de: 'Wie alt ___ Sie?', hint: 'sein', tr: 'Kaç yaşındasınız?', answers: ['sind'],
          explain: 'Sie (resmi) → sind.', tags: ['sein', 'formal'] },
        { type: 'type', tr: 'Kaç yaşındasın?', answers: ['Wie alt bist du?'],
          explain: 'Wie alt + sein + kişi: Wie alt bist du?', tags: ['question'] },
        { type: 'type', tr: 'Otuz yaşındayım.', answers: ['Ich bin dreißig Jahre alt.', 'Ich bin 30 Jahre alt.', 'Ich bin dreißig.', 'Ich bin 30.'],
          explain: 'Ich bin + sayı + Jahre alt. "Jahre alt" söylenmese de olur.', tags: ['sein', 'number'] },
        { type: 'listen', de: 'Ich bin vierunddreißig Jahre alt.', tr: 'Duyduğun cümleyi yaz (sayıyı rakamla da yazabilirsin).',
          answers: ['Ich bin vierunddreißig Jahre alt.', 'Ich bin 34 Jahre alt.'],
          explain: 'vier-und-dreißig = 34.', tags: ['number'] },
        { type: 'speak', de: 'Wohnst du in Köln?', tr: 'Köln\'de mi oturuyorsun? (sonda sesi yükselt ↗)' }
      ]
    },

    // ─────────────────────────────────────────────── L5 — Okuma & yazma: kayıt formu
    {
      id: 'u02.l5',
      title: 'Lesen & Schreiben: das Formular',
      kind: 'read-write',
      intro: 'Almanya\'da her yerde form doldurursun: dil kursu, spor salonu, doktor. Önce Aylin\'i dinle, sonra onun bilgileriyle formu doldur, en sonda kendin yaz.',
      dialog: {
        title: 'Aylin kendini anlatıyor',
        lines: [
          { s: 'Aylin', de: 'Hallo! Ich heiße Aylin Arslan.', tr: 'Merhaba! Benim adım Aylin Arslan.' },
          { s: 'Aylin', de: 'Ich komme aus der Türkei, aus Bursa, aber ich wohne in Hamburg.', tr: 'Türkiye\'den, Bursa\'dan geliyorum ama Hamburg\'da oturuyorum.' },
          { s: 'Aylin', de: 'Ich bin vierunddreißig Jahre alt und ich bin verheiratet.', tr: 'Otuz dört yaşındayım ve evliyim.' },
          { s: 'Aylin', de: 'Meine Adresse ist Schillerstraße fünfundvierzig, zwei zwei sieben sechs sieben Hamburg.', tr: 'Adresim Schillerstraße 45, 22767 Hamburg.' },
          { s: 'Aylin', de: 'Meine Handynummer ist null eins fünf sieben, zwo neun vier, sechs eins acht drei.', tr: 'Cep numaram 0157 294 6183.' },
          { s: 'Aylin', de: 'Meine E-Mail-Adresse ist Aylin Punkt Arslan at web Punkt de.', tr: 'E-posta adresim aylin.arslan@web.de.' },
          { s: 'Aylin', de: 'Ich arbeite in Hamburg und ich lerne Deutsch.', tr: 'Hamburg\'da çalışıyorum ve Almanca öğreniyorum.' }
        ]
      },
      words: [
        { id: 'w.formular', de: 'Formular', pos: 'n', art: 'das', pl: 'Formulare', tr: 'form', en: 'form',
          ex: { de: 'Hier ist das Formular.', tr: 'İşte form.' } },
        { id: 'w.geburtsdatum', de: 'Geburtsdatum', pos: 'n', art: 'das', pl: 'Geburtsdaten', tr: 'doğum tarihi', en: 'date of birth',
          ex: { de: 'Wie ist Ihr Geburtsdatum?', tr: 'Doğum tarihiniz ne?' }, note: 'Formda gün.ay.yıl yazılır: 05.08.1990.' },
        { id: 'w.geburtsort', de: 'Geburtsort', pos: 'n', art: 'der', pl: 'Geburtsorte', tr: 'doğum yeri', en: 'place of birth',
          ex: { de: 'Mein Geburtsort ist Izmir.', tr: 'Doğum yerim İzmir.' } },
        { id: 'w.familienstand', de: 'Familienstand', pos: 'n', art: 'der', pl: '-', tr: 'medeni hâl', en: 'marital status',
          ex: { de: 'Wie ist Ihr Familienstand?', tr: 'Medeni hâliniz ne?' } },
        { id: 'w.ledig', de: 'ledig', pos: 'adj', tr: 'bekâr', en: 'single, unmarried',
          ex: { de: 'Ich bin ledig.', tr: 'Bekârım.' } },
        { id: 'w.verheiratet', de: 'verheiratet', pos: 'adj', tr: 'evli', en: 'married',
          ex: { de: 'Aylin ist verheiratet.', tr: 'Aylin evli.' } },
        { id: 'w.geschieden', de: 'geschieden', pos: 'adj', tr: 'boşanmış', en: 'divorced',
          ex: { de: 'Er ist geschieden.', tr: 'O boşanmış.' } },
        { id: 'w.unterschrift', de: 'Unterschrift', pos: 'n', art: 'die', pl: 'Unterschriften', tr: 'imza', en: 'signature',
          ex: { de: 'Ihre Unterschrift, bitte.', tr: 'İmzanız, lütfen.' } }
      ],
      grammar: [
        {
          title: 'Bir kayıt formu (Anmeldung Sprachschule)',
          html: '<table><tr><th>Nachname</th><td>soyadı</td></tr>' +
            '<tr><th>Vorname</th><td>ad</td></tr>' +
            '<tr><th>Geburtsdatum</th><td>doğum tarihi (TT.MM.JJJJ → 05.08.1990)</td></tr>' +
            '<tr><th>Geburtsort</th><td>doğum yeri</td></tr>' +
            '<tr><th>Straße, Hausnummer</th><td>sokak, kapı no (Schillerstraße 45)</td></tr>' +
            '<tr><th>PLZ, Ort</th><td>posta kodu, şehir (22767 Hamburg)</td></tr>' +
            '<tr><th>Telefonnummer</th><td>telefon numarası</td></tr>' +
            '<tr><th>E-Mail</th><td>e-posta</td></tr>' +
            '<tr><th>Familienstand</th><td>☐ ledig ☐ verheiratet ☐ geschieden</td></tr>' +
            '<tr><th>Unterschrift</th><td>imza</td></tr></table>' +
            '<p class="bridge">🇹🇷 Tarih Türkiye\'deki gibi: önce gün, sonra ay (05.08.1990 = 5 Ağustos). ABD gibi ay önce değil!</p>'
        }
      ],
      culture: 'Almanya\'da formlarda soyadı (Nachname) genelde ADDAN önce sorulur. "Ort" = yer, şehir. Formun sonunda tarih ve imza (Datum, Unterschrift) istenir.',
      exercises: [
        { type: 'mcq', q: 'Aylin nerede oturuyor?', options: ['Bursa', 'Hamburg', 'Köln'], answer: 1,
          explain: '"… aber ich wohne in Hamburg." Bursa memleketi.', tags: ['vocab'] },
        { type: 'mcq', q: 'Aylin\'in Familienstand\'ı ne?', options: ['ledig', 'verheiratet', 'geschieden'], answer: 1,
          explain: '"Ich bin verheiratet." = Evliyim.', tags: ['vocab'] },
        { type: 'type', q: 'Formu Aylin için doldur: Nachname?', tr: 'Aylin\'in soyadı', answers: ['Arslan'],
          explain: 'Nachname = soyadı (Arslan). Vorname = ad (Aylin).', tags: ['vocab'] },
        { type: 'type', q: 'Formu Aylin için doldur: PLZ?', tr: 'Aylin\'in posta kodu (rakamla)', answers: ['22767'],
          explain: 'zwei zwei sieben sechs sieben → 22767. Posta kodu rakam rakam söylendi.', tags: ['number'] },
        { type: 'type', q: 'Formu Aylin için doldur: Hausnummer?', tr: 'Aylin\'in kapı numarası (rakamla)', answers: ['45'],
          explain: 'fünf-und-vierzig = 45.', tags: ['number'] },
        { type: 'type', q: 'Formu Aylin için doldur: Alter?', tr: 'Aylin\'in yaşı (rakamla)', answers: ['34'],
          explain: 'vier-und-dreißig = 34.', tags: ['number'] },
        { type: 'match', pairs: [['Vorname', 'ad'], ['Nachname', 'soyadı'], ['Geburtsdatum', 'doğum tarihi'], ['Geburtsort', 'doğum yeri'], ['Familienstand', 'medeni hâl'], ['Unterschrift', 'imza']], tags: ['vocab'] },
        { type: 'mcq', q: 'Doğum günün 5 Ağustos 1990. Almanca formda "Geburtsdatum" alanına ne yazarsın?',
          options: ['05.08.1990', '08/05/1990', '1990-08-05'], answer: 0,
          explain: 'Gün.Ay.Yıl, noktayla — Türkiye\'deki gibi.' },
        { type: 'article', word: 'w.formular' },
        { type: 'cloze', de: 'Meine ___ ist Schillerstraße 45, 22767 Hamburg.', tr: 'Adresim Schillerstraße 45, 22767 Hamburg.', answers: ['Adresse'],
          explain: 'die Adresse → meine Adresse.', tags: ['vocab'] },
        { type: 'listen', de: 'Ich bin ledig.', tr: 'Bekârım.', tags: ['vocab'] },
        {
          type: 'write',
          task: 'Köln\'de bir dil kursuna (Sprachschule) kayıt oluyorsun. Formdaki bilgilerini cümlelerle yaz: adın, yaşın, nereden geldiğin ve nerede oturduğun, adresin, cep numaran, e-posta adresin, medeni hâlin. En az bir cümlede "und" ya da "aber" kullan.',
          minWords: 30,
          checklist: [
            'Adımı ve yaşımı yazdım (Ich heiße … / Ich bin … Jahre alt.)',
            'Nereden geldiğimi ve nerede oturduğumu yazdım (aus … / in …).',
            'Adresimi doğru sırayla yazdım: Straße + Hausnummer, PLZ + Stadt.',
            'Cep numaramı ve e-posta adresimi yazdım (Meine … ist …).',
            'Medeni hâlimi yazdım (ledig / verheiratet).',
            'En az bir cümlede und veya aber var.',
            'Her cümlede fiil 2. sırada; isimler büyük harfle.'
          ],
          model: 'Ich heiße Emre Polat. Ich bin achtundzwanzig Jahre alt. Ich komme aus der Türkei, aus Ankara, aber ich wohne in Köln. Meine Adresse ist Lindenstraße 23, 50667 Köln. Meine Handynummer ist 0176 52489137. Meine E-Mail-Adresse ist emre.polat@web.de. Ich bin ledig. Ich arbeite in Köln und ich lerne Deutsch.'
        }
      ]
    },

    // ─────────────────────────────────────────────── L6 — Almanya'da hayat: spor salonuna kayıt
    {
      id: 'u02.l6',
      title: 'Almanya\'da hayat: Fitnessstudio\'ya kayıt',
      kind: 'life',
      intro: 'Emre bir spor salonuna üye oluyor. Kayıt masasında adını, adresini, numarasını veriyor. Sonra sıra sende: hem söyle hem de duyduğunu yaz.',
      dialog: {
        title: 'Kayıt masasında',
        lines: [
          { s: 'Herr Schulz', de: 'Guten Tag! Wie ist Ihr Name, bitte?', tr: 'İyi günler! Adınız ne, lütfen?' },
          { s: 'Emre', de: 'Emre Polat.', tr: 'Emre Polat.' },
          { s: 'Herr Schulz', de: 'Wie schreibt man das?', tr: 'Nasıl yazılıyor?' },
          { s: 'Emre', de: 'P – O – L – A – T.', tr: 'P – O – L – A – T.' },
          { s: 'Herr Schulz', de: 'Danke. Wie alt sind Sie, Herr Polat?', tr: 'Teşekkürler. Kaç yaşındasınız, Bay Polat?' },
          { s: 'Emre', de: 'Ich bin achtundzwanzig Jahre alt.', tr: 'Yirmi sekiz yaşındayım.' },
          { s: 'Herr Schulz', de: 'Und wie ist Ihre Adresse?', tr: 'Peki adresiniz ne?' },
          { s: 'Emre', de: 'Lindenstraße dreiundzwanzig, fünf null sechs sechs sieben Köln.', tr: 'Lindenstraße 23, 50667 Köln.' },
          { s: 'Herr Schulz', de: 'Lindenstraße dreiunddreißig?', tr: 'Lindenstraße 33 mü?' },
          { s: 'Emre', de: 'Nein, dreiundzwanzig. Zwei, drei.', tr: 'Hayır, yirmi üç. İki, üç.' },
          { s: 'Herr Schulz', de: 'Ah, dreiundzwanzig. Danke. Und Ihre Handynummer?', tr: 'Ha, yirmi üç. Teşekkürler. Peki cep numaranız?' },
          { s: 'Emre', de: 'Null eins sieben sechs, zweiundfünfzig, achtundvierzig, einundneunzig, siebenunddreißig.', tr: '0176 52 48 91 37.' },
          { s: 'Herr Schulz', de: 'Noch einmal, bitte. Langsam, bitte.', tr: 'Bir kez daha lütfen. Yavaş lütfen.' },
          { s: 'Emre', de: 'Null – eins – sieben – sechs – fünf – zwo – vier – acht – neun – eins – drei – sieben.', tr: '0 – 1 – 7 – 6 – 5 – 2 – 4 – 8 – 9 – 1 – 3 – 7.' },
          { s: 'Herr Schulz', de: 'Danke. Und Ihre E-Mail-Adresse?', tr: 'Teşekkürler. Peki e-posta adresiniz?' },
          { s: 'Emre', de: 'Emre Punkt Polat at web Punkt de.', tr: 'emre.polat@web.de' },
          { s: 'Herr Schulz', de: 'Super, vielen Dank, Herr Polat! Auf Wiedersehen!', tr: 'Süper, çok teşekkürler, Bay Polat! Hoşça kalın!' },
          { s: 'Emre', de: 'Auf Wiedersehen!', tr: 'Hoşça kalın!' }
        ]
      },
      words: [
        { id: 'w.fitnessstudio', de: 'Fitnessstudio', pos: 'n', art: 'das', pl: 'Fitnessstudios', tr: 'spor salonu', en: 'gym',
          ex: { de: 'Das Fitnessstudio ist in Köln.', tr: 'Spor salonu Köln\'de.' }, note: 'Üç s ile yazılır: Fitness + Studio.' },
        { id: 'w.noch_einmal', de: 'Noch einmal, bitte.', pos: 'phr', tr: 'Bir kez daha, lütfen.', en: 'Once more, please.',
          ex: { de: 'Wie bitte? Noch einmal, bitte.', tr: 'Efendim? Bir kez daha, lütfen.' }, note: 'Anlamadığında hayat kurtarır. Kısaca: Noch mal, bitte.' },
        { id: 'w.vielen_dank', de: 'Vielen Dank!', pos: 'phr', tr: 'Çok teşekkürler!', en: 'Thank you very much!',
          ex: { de: 'Vielen Dank, Herr Schulz!', tr: 'Çok teşekkürler, Bay Schulz!' } }
      ],
      culture: 'Almanya\'da adres Türkiye\'deki sıranın tersine yakındır: önce sokak, sonra kapı numarası (Lindenstraße 23), alt satırda posta kodu ve şehir (50667 Köln). Telefonda bilgi verirken numarayı yavaş, rakam rakam söylemek normaldir; görevli de genelde tekrar eder. Anlamazsan "Noch einmal, bitte." de — hiç ayıp değil. Spor salonları genelde sözleşme (Vertrag) ve banka bilgisi (IBAN) de ister.',
      exercises: [
        { type: 'mcq', q: 'Emre\'nin adresi hangisi?', options: ['Lindenstraße 33, 50667 Köln', 'Lindenstraße 23, 50667 Köln', 'Lindenstraße 23, 56067 Köln'], answer: 1,
          explain: 'dreiundzwanzig = 23 (33 = dreiunddreißig). PLZ: fünf null sechs sechs sieben = 50667.', tags: ['number'] },
        { type: 'listen', de: 'null eins sechs zwo, dreiundsiebzig, fünfundvierzig, achtzehn', tr: 'Duyduğun telefon numarasını rakamla yaz.',
          answers: ['0162 73 45 18', '0162734518', '0162 734518', '0162-734518', '0162/734518'],
          explain: 'null eins sechs zwo = 0162; drei-und-siebzig = 73; fünf-und-vierzig = 45; achtzehn = 18.', tags: ['number'] },
        { type: 'listen', de: 'null zwo zwo eins, sechsundfünfzig, einunddreißig, neunzig', tr: 'Duyduğun telefon numarasını rakamla yaz (Köln, sabit hat).',
          answers: ['0221 56 31 90', '0221563190', '0221 563190', '0221-563190', '0221/563190'],
          explain: '0221 = Köln\'ün alan kodu. sechs-und-fünfzig = 56, ein-und-dreißig = 31, neunzig = 90.', tags: ['number'] },
        { type: 'listen', de: 'Goethestraße zweiundvierzig', tr: 'Duyduğun adresi yaz (numarayı rakamla).',
          answers: ['Goethestraße 42', 'Goethestraße zweiundvierzig', 'Goethestr. 42'],
          explain: 'zwei-und-vierzig = 42. Sokak adı + numara: Goethestraße 42.', tags: ['number', 'spelling'] },
        { type: 'listen', de: 'fünf null sechs sechs sieben Köln', tr: 'Posta kodunu ve şehri yaz (rakamla).',
          answers: ['50667 Köln'],
          explain: 'PLZ rakam rakam söylendi: 5-0-6-6-7. Önce PLZ, sonra şehir.', tags: ['number'] },
        { type: 'listen', de: 'Ali Punkt Demir at web Punkt de', tr: 'Duyduğun e-posta adresini yaz (@ ve . işaretleriyle).',
          answers: ['ali.demir@web.de'],
          explain: 'Punkt = . ve at = @ → ali.demir@web.de', tags: ['spelling'] },
        { type: 'type', tr: 'Adresiniz ne? (resmi)', answers: ['Wie ist Ihre Adresse?'],
          explain: 'Resmi: Ihre (büyük I). Sen diliyle: Wie ist deine Adresse?', tags: ['question', 'formal'] },
        { type: 'order', tr: 'Kaç yaşındasınız, Bay Polat?', answer: 'Wie alt sind Sie, Herr Polat?', extra: ['bist'],
          explain: 'Sie (resmi) → sind. bist sadece du ile.', tags: ['question', 'formal', 'sein'] },
        { type: 'cloze', de: 'Noch ___, bitte. Langsam, bitte.', tr: 'Bir kez daha lütfen. Yavaş lütfen.', answers: ['einmal', 'mal'],
          explain: 'Noch einmal (kısaca: noch mal) = bir kez daha.', tags: ['vocab'] },
        { type: 'mcq', q: 'Görevli "Noch einmal, bitte." diyor. Ne yapmalısın?',
          options: ['Bilgiyi tekrar, yavaşça söylemelisin.', 'Vedalaşmalısın.', 'Formu imzalamalısın.'], answer: 0,
          explain: 'Noch einmal = bir kez daha. Numarayı rakam rakam tekrar et.' },
        { type: 'speak', de: 'Meine Adresse ist Lindenstraße dreiundzwanzig, fünf null sechs sechs sieben Köln.', tr: 'Adresim Lindenstraße 23, 50667 Köln.' },
        { type: 'speak', de: 'Meine Handynummer ist null eins sieben sechs, zweiundfünfzig, achtundvierzig, einundneunzig, siebenunddreißig.', tr: 'Cep numaram 0176 52 48 91 37.' }
      ]
    }
  ]
});
