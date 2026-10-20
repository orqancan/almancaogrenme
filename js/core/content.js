// İçerik kaydı ve doğrulaması. Tarayıcıda ve Node'da (tools/, tests/) aynı kod çalışır.
// İçerik dosyaları file:// altında fetch edilemediği için her ünite bir .js dosyasıdır
// ve DE.content.registerUnit({...}) çağırır. Şema: docs/icerik-semasi.md
(function (DE) {
  'use strict';

  var POS = ['n', 'v', 'adj', 'adv', 'phr', 'pron', 'num', 'prep', 'conj', 'art', 'q', 'other'];
  var ARTICLES = ['der', 'die', 'das'];
  var EX_TYPES = ['mcq', 'type', 'cloze', 'order', 'listen', 'article', 'match', 'speak', 'write'];
  var TR_ONLY = /[ışğİŞĞ]/;

  var content = {
    units: [],
    unitById: {},
    lessonById: {},
    words: {},
    errors: [],

    registerUnit: function (unit) {
      var errs = content.validateUnit(unit);
      if (errs.length) {
        content.errors = content.errors.concat(errs);
        if (typeof console !== 'undefined') console.error('İçerik hatası (' + (unit && unit.id) + '):\n' + errs.join('\n'));
      }
      if (!unit || !unit.id || content.unitById[unit.id]) return;
      content.units.push(unit);
      content.units.sort(function (a, b) { return a.order - b.order; });
      content.unitById[unit.id] = unit;
      (unit.lessons || []).forEach(function (lesson, li) {
        lesson.unitId = unit.id;
        lesson.index = li;
        content.lessonById[lesson.id] = lesson;
        (lesson.exercises || []).forEach(function (ex, i) { ex.id = ex.id || lesson.id + '.e' + (i + 1); });
        (lesson.words || []).forEach(function (w) {
          if (!content.words[w.id]) {
            w.unitId = unit.id;
            w.lessonId = lesson.id;
            content.words[w.id] = w;
          }
        });
      });
    },

    /** Tüm dersler, müfredat sırasıyla. */
    allLessons: function () {
      var out = [];
      content.units.forEach(function (u) { out = out.concat(u.lessons || []); });
      return out;
    },

    validateUnit: function (u) {
      var errs = [];
      function err(where, msg) { errs.push((u && u.id || '?') + (where ? ' › ' + where : '') + ': ' + msg); }
      function str(v) { return typeof v === 'string' && v.trim().length > 0; }
      function de(where, v) {
        if (!str(v)) return err(where, 'Almanca metin boş');
        if (TR_ONLY.test(v)) err(where, 'Almanca metinde Türkçe harf var: "' + v + '"');
      }

      if (!u || typeof u !== 'object') { errs.push('Ünite nesne değil'); return errs; }
      if (!/^u\d\d$/.test(u.id || '')) err('', 'id "uNN" biçiminde olmalı');
      if (typeof u.order !== 'number') err('', 'order sayı olmalı');
      ['level', 'title', 'titleTr'].forEach(function (k) { if (!str(u[k])) err('', k + ' eksik'); });
      if (!Array.isArray(u.goals) || !u.goals.length) err('', 'goals (can-do listesi) eksik');
      if (!Array.isArray(u.lessons) || !u.lessons.length) { err('', 'lessons boş'); return errs; }

      var seenWords = {};
      u.lessons.forEach(function (l, li) {
        var lw = 'ders ' + (li + 1) + (l && l.id ? ' (' + l.id + ')' : '');
        if (!new RegExp('^' + u.id + '\\.l\\d+$').test(l.id || '')) err(lw, 'id "' + u.id + '.lN" biçiminde olmalı');
        if (!str(l.title)) err(lw, 'title eksik');

        if (l.dialog) {
          if (!Array.isArray(l.dialog.lines) || !l.dialog.lines.length) err(lw, 'dialog.lines boş');
          else l.dialog.lines.forEach(function (line, i) {
            if (!str(line.s)) err(lw + ' dialog ' + (i + 1), 's (konuşan) eksik');
            de(lw + ' dialog ' + (i + 1), line.de);
            if (!str(line.tr)) err(lw + ' dialog ' + (i + 1), 'tr eksik');
          });
        }

        (l.grammar || []).forEach(function (g, i) {
          if (!str(g.title) || !str(g.html)) err(lw + ' grammar ' + (i + 1), 'title ve html gerekli');
          else if (/<script|on\w+=/i.test(g.html)) err(lw + ' grammar ' + (i + 1), 'html içinde script/olay niteliği yasak');
        });

        (l.words || []).forEach(function (w, i) {
          var ww = lw + ' kelime ' + (i + 1) + (w && w.id ? ' (' + w.id + ')' : '');
          if (!/^w\.[a-z0-9_.-]+$/.test(w.id || '')) err(ww, 'id "w.kucuk_harf" biçiminde olmalı');
          if (seenWords[w.id]) err(ww, 'aynı ünitede tekrar eden kelime id');
          seenWords[w.id] = true;
          de(ww, w.de);
          if (!str(w.tr)) err(ww, 'tr eksik');
          if (POS.indexOf(w.pos) < 0) err(ww, 'pos şunlardan biri olmalı: ' + POS.join(', '));
          if (w.pos === 'n') {
            if (ARTICLES.indexOf(w.art) < 0) err(ww, 'isimde art der/die/das olmalı');
            if (/^(der|die|das) /i.test(w.de)) err(ww, 'de alanına artikel yazılmaz (art alanında)');
            if (w.de && w.de[0] !== w.de[0].toUpperCase()) err(ww, 'isim büyük harfle başlamalı');
          } else if (w.art) err(ww, 'art sadece isimlerde (pos: n) kullanılır');
          if (w.ex) { de(ww + ' ex', w.ex.de); if (!str(w.ex.tr)) err(ww + ' ex', 'tr eksik'); }
        });

        if (!Array.isArray(l.exercises) || l.exercises.length < 3) err(lw, 'en az 3 alıştırma gerekli');
        (l.exercises || []).forEach(function (ex, i) {
          var ew = lw + ' alıştırma ' + (i + 1) + ' [' + (ex && ex.type) + ']';
          if (EX_TYPES.indexOf(ex.type) < 0) return err(ew, 'bilinmeyen tip; geçerli: ' + EX_TYPES.join(', '));
          if (ex.tags && !Array.isArray(ex.tags)) err(ew, 'tags dizi olmalı');
          switch (ex.type) {
            case 'mcq':
              if (!str(ex.q)) err(ew, 'q eksik');
              if (!Array.isArray(ex.options) || ex.options.length < 2) err(ew, 'en az 2 seçenek');
              else if (typeof ex.answer !== 'number' || ex.answer < 0 || ex.answer >= ex.options.length) err(ew, 'answer geçerli bir seçenek indeksi olmalı');
              if (ex.de) de(ew, ex.de);
              break;
            case 'type':
              if (!str(ex.tr) && !str(ex.q)) err(ew, 'tr veya q gerekli');
              if (!Array.isArray(ex.answers) || !ex.answers.length) err(ew, 'answers eksik');
              else ex.answers.forEach(function (a) { de(ew, a); });
              break;
            case 'cloze':
              de(ew, ex.de);
              if (str(ex.de) && ex.de.split('___').length !== 2) err(ew, 'de içinde tam olarak bir ___ olmalı');
              if (!Array.isArray(ex.answers) || !ex.answers.length) err(ew, 'answers eksik');
              if (!str(ex.tr)) err(ew, 'tr eksik');
              break;
            case 'order':
              de(ew, ex.answer);
              if (str(ex.answer) && ex.answer.trim().split(/\s+/).length < 2) err(ew, 'answer en az 2 kelime');
              if (!str(ex.tr)) err(ew, 'tr eksik');
              (ex.alt || []).forEach(function (a) { de(ew + ' alt', a); });
              break;
            case 'listen':
              de(ew, ex.de);
              if (!str(ex.tr)) err(ew, 'tr eksik');
              break;
            case 'article':
              if (!str(ex.word)) err(ew, 'word (kelime id) gerekli');
              break;
            case 'match':
              if (!Array.isArray(ex.pairs) || ex.pairs.length < 3) err(ew, 'en az 3 çift');
              else ex.pairs.forEach(function (p) { if (!Array.isArray(p) || p.length !== 2) err(ew, 'her çift [almanca, türkçe]'); else de(ew, p[0]); });
              break;
            case 'speak':
              de(ew, ex.de);
              if (!str(ex.tr)) err(ew, 'tr eksik');
              break;
            case 'write':
              if (!str(ex.task)) err(ew, 'task eksik');
              if (!str(ex.model)) err(ew, 'model (örnek cevap) eksik');
              break;
          }
        });
      });
      return errs;
    },

    /** Ünitelerarası kontroller (Node doğrulayıcısı kullanır). */
    validateAll: function () {
      var errs = content.errors.slice();
      var defs = {};
      content.units.forEach(function (u) {
        u.lessons.forEach(function (l) {
          (l.words || []).forEach(function (w) {
            var prev = defs[w.id];
            if (prev) errs.push(l.id + ': ' + w.id + ' zaten ' + prev.where + ' içinde tanımlı; tekrar tanımlama, sadece kullan');
            if (!prev) defs[w.id] = { de: w.de, art: w.art, where: l.id };
          });
        });
      });
      content.units.forEach(function (u) {
        u.lessons.forEach(function (l) {
          (l.exercises || []).forEach(function (ex, i) {
            if (ex.type === 'article') {
              var w = content.words[ex.word];
              if (!w) errs.push(l.id + ' alıştırma ' + (i + 1) + ': article kelimesi bulunamadı: ' + ex.word);
              else if (w.pos !== 'n') errs.push(l.id + ' alıştırma ' + (i + 1) + ': article kelimesi isim değil: ' + ex.word);
            }
          });
        });
      });
      return errs;
    }
  };

  DE.content = content;
})(typeof window !== 'undefined' ? (window.DE = window.DE || {}) : (globalThis.DE = globalThis.DE || {}));
