// Cevap kontrol motoru: normalize → karşılaştır → teşhis. Saf fonksiyonlar (tests/answer.test.mjs).
//
// Sonuç seviyeleri:
//   exact   — doğru
//   minor   — doğru sayılır, küçük uyarı (ae/oe/ue, tek harflik yazım hatası, isim küçük harf)
//   partial — neredeyse (ör. isimde artikel eksik); öğrenmede "Zor" sayılır
//   wrong   — yanlış; teşhis etiketleri ve açıklama ile
(function (DE) {
  'use strict';

  var ARTICLE_FORMS = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines',
    'kein', 'keine', 'keinen', 'keinem', 'keiner', 'mein', 'meine', 'meinen', 'meinem', 'meiner',
    'dein', 'deine', 'deinen', 'deinem', 'deiner', 'ihr', 'ihre', 'ihren', 'ihrem', 'ihrer', 'sein', 'seine', 'seinen', 'seinem', 'seiner'];
  var BARE_ARTICLES = ['der', 'die', 'das'];

  // Umlaut'un anlamı değiştirdiği sık çiftler: umlaut'suz yazım burada "yanlış" sayılır.
  var UMLAUT_PAIRS = ['schon', 'bruder', 'mutter', 'vater', 'tochter', 'zahlen', 'drucken', 'konnte', 'wurde', 'musste',
    'hatte', 'ware', 'schwul', 'zahlt', 'fur', 'uber', 'horen', 'konnen', 'mussen', 'durfen', 'mochte'];

  function normalize(s) {
    return String(s == null ? '' : s)
      .normalize('NFC')
      .replace(/[‘’‚‛`´']/g, '')
      .replace(/[“”„«»"]/g, '')
      .replace(/[.,!?;:¿¡()\[\]…–—]/g, ' ')
      .replace(/-/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Not: toLocaleLowerCase('tr') KULLANILMAZ — "I" → "ı" olur.
  function lower(s) { return s.toLowerCase(); }

  function fold(s) {
    return lower(s).replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  }

  function stripUmlauts(s) {
    return lower(s).replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
  }

  /** Türkçe klavyeden gelen harfleri Almanca karşılığa yaklaştırır (sadece teşhis için). */
  function deTurk(s) {
    return s.replace(/ı/g, 'i').replace(/İ/g, 'I').replace(/ş/g, 'sch').replace(/Ş/g, 'Sch').replace(/ç/g, 'tsch').replace(/ğ/g, 'g');
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var prev = new Array(n + 1), cur = new Array(n + 1);
    for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      var t = prev; prev = cur; cur = t;
    }
    return prev[n];
  }

  function tokens(s) { return normalize(s).split(' ').filter(Boolean); }

  /** Token düzeyinde LCS farkı: [{t, op:'same'|'add'|'del'}] (add = kullanıcı fazladan yazmış, del = eksik). */
  function diff(input, expected) {
    var a = tokens(input), b = tokens(expected);
    var A = a.map(fold), B = b.map(fold);
    var m = a.length, n = b.length, L = [];
    for (var i = 0; i <= m; i++) { L.push(new Array(n + 1).fill(0)); }
    for (i = m - 1; i >= 0; i--) for (var j = n - 1; j >= 0; j--) {
      L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    }
    var out = []; i = 0; j = 0;
    while (i < m && j < n) {
      if (A[i] === B[j]) { out.push({ t: b[j], op: 'same' }); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) { out.push({ t: a[i], op: 'add' }); i++; }
      else { out.push({ t: b[j], op: 'del' }); j++; }
    }
    while (i < m) out.push({ t: a[i++], op: 'add' });
    while (j < n) out.push({ t: b[j++], op: 'del' });
    return out;
  }

  function sameMultiset(a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  }

  /** Tek bir beklenen cevapla karşılaştırma. */
  function compareOne(input, expected, opts) {
    opts = opts || {};
    var i = normalize(input), e = normalize(expected);
    var res = { level: 'wrong', expected: expected, notes: [], tags: [] };
    if (!i) { res.notes.push('Cevap boş.'); return res; }

    if (i === e) { res.level = 'exact'; return res; }

    // Rakam dizileri (telefon, posta kodu): boşluk, / ve - farkı önemsiz.
    if (/^[\d\s\/+]+$/.test(String(input).trim()) && /^[\d\s\/+-]+$/.test(String(expected).trim())) {
      if (String(input).replace(/\D/g, '') === String(expected).replace(/\D/g, '')) { res.level = 'exact'; return res; }
    }

    if (lower(i) === lower(e)) {
      res.level = 'exact';
      // Cümle başı dışında büyük harfle yazılan kelime (isimler) küçük yazılmışsa uyar.
      var it = i.split(' '), et = e.split(' ');
      var nouns = [];
      for (var k = 1; k < et.length; k++) {
        if (et[k][0] !== lower(et[k][0]) && it[k] && it[k][0] === lower(it[k][0])) nouns.push(et[k]);
      }
      if (nouns.length) { res.level = 'minor'; res.tags.push('spelling.caps'); res.notes.push('Almancada isimler (ve özel adlar) büyük harfle yazılır: ' + nouns.join(', ')); }
      return res;
    }

    if (fold(i) === fold(e)) {
      res.level = 'minor'; res.tags.push('spelling.umlaut');
      res.notes.push('ä/ö/ü/ß yerine ae/oe/ue/ss yazdın; kabul edildi. Doğrusu: ' + expected);
      return res;
    }

    var ti = tokens(i).map(lower), te = tokens(e).map(lower);
    var fi = ti.map(fold), fe = te.map(fold);

    // İsimde artikel eksik: "Tisch" ↔ "der Tisch"
    if (fe.length === fi.length + 1 && BARE_ARTICLES.indexOf(te[0]) >= 0 && fe.slice(1).join(' ') === fi.join(' ')) {
      res.level = 'partial'; res.tags.push('article.missing');
      res.notes.push('Artikeli unutma: ' + expected + '. Almancada isim artikeliyle birlikte öğrenilir.');
      return res;
    }

    if (fe.length === fi.length) {
      var diffs = [];
      for (k = 0; k < fe.length; k++) if (fe[k] !== fi[k]) diffs.push(k);

      if (diffs.length && diffs.every(function (d) { return ARTICLE_FORMS.indexOf(fe[d]) >= 0 && ARTICLE_FORMS.indexOf(fi[d]) >= 0; })) {
        res.tags.push('article');
        res.notes.push('Artikel/ek yanlış: ' + diffs.map(function (d) { return '"' + ti[d] + '" değil "' + te[d] + '"'; }).join(', ') + '.');
        return res;
      }

      if (diffs.length === 1) {
        var d = diffs[0], got = ti[d], want = te[d];
        if (stripUmlauts(got) === stripUmlauts(want)) {
          if (UMLAUT_PAIRS.indexOf(stripUmlauts(want)) >= 0) {
            res.tags.push('spelling.umlaut');
            res.notes.push('Umlaut anlamı değiştirir: "' + got + '" değil "' + want + '".');
            return res;
          }
          res.level = 'minor'; res.tags.push('spelling.umlaut');
          res.notes.push('Umlaut eksik: "' + want + '" (noktaları unutma).');
          return res;
        }
        if (/[ışçğ]/.test(got) && fold(deTurk(got)) === fold(want)) {
          res.level = 'minor'; res.tags.push('spelling.tr');
          res.notes.push('Türkçe harf kullandın: "' + got + '" → "' + want + '". Almancada ş = sch, ı yok.');
          return res;
        }
        if (want.length >= 4 && levenshtein(fold(got), fold(want)) === 1 && !opts.strictSpelling) {
          // Fiil çekiminde tek harf (wohne/wohnt) anlamı değiştirir: son harf farkı yazım hatası sayılmaz.
          var endDiff = got.slice(0, -1) === want.slice(0, -1) || got.slice(0, -2) === want.slice(0, -2);
          if (!endDiff) {
            res.level = 'minor'; res.tags.push('spelling');
            res.notes.push('Küçük yazım hatası: "' + got + '" → "' + want + '".');
            return res;
          }
        }
        if (got.length > 2 && want.length > 2 && got.slice(0, 3) === want.slice(0, 3)) {
          res.tags.push('verb.conj');
          res.notes.push('Ek/çekim hatası: "' + got + '" değil "' + want + '".');
          return res;
        }
      }
    }

    if (sameMultiset(fi, fe)) {
      res.tags.push('word_order');
      res.notes.push('Kelimeler doğru, sıra yanlış. Ana cümlede çekimli fiil 2. sırada olur.');
      return res;
    }

    return res;
  }

  var RANK = { exact: 3, minor: 2, partial: 1, wrong: 0 };

  /**
   * Birden çok kabul edilen cevaba karşı kontrol; en iyi sonucu döndürür.
   * @returns {{level:string, ok:boolean, expected:string, notes:string[], tags:string[], diff:Array}}
   */
  function check(input, answers, opts) {
    var list = Array.isArray(answers) ? answers : [answers];
    var best = null;
    list.forEach(function (a) {
      var r = compareOne(input, a, opts);
      if (!best || RANK[r.level] > RANK[best.level]) best = r;
    });
    best.ok = best.level === 'exact' || best.level === 'minor';
    if (!best.ok) {
      // En yakın cevabı göster.
      var closest = list[0], dist = Infinity;
      list.forEach(function (a) { var dd = levenshtein(fold(normalize(input)), fold(normalize(a))); if (dd < dist) { dist = dd; closest = a; } });
      best.expected = best.tags.length ? best.expected : closest;
      best.diff = diff(input, best.expected);
      if (/[ışğ]/.test(input) && best.tags.indexOf('spelling.tr') < 0) best.notes.push('Türkçe harf (ı/ş/ğ) Almancada yok.');
    }
    return best;
  }

  /** Konuşma tanıma sonucu ile hedef cümlenin kelime bazında örtüşmesi (0–1). */
  function overlap(heard, target) {
    var d = diff(heard, target);
    var same = d.filter(function (x) { return x.op === 'same'; }).length;
    var total = tokens(target).length || 1;
    return Math.min(1, same / total);
  }

  DE.answer = { normalize: normalize, fold: fold, levenshtein: levenshtein, diff: diff, check: check, overlap: overlap, tokens: tokens };
})(typeof window !== 'undefined' ? (window.DE = window.DE || {}) : (globalThis.DE = globalThis.DE || {}));
