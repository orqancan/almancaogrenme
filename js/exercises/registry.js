// Alıştırma kayıt defteri ve ortak arayüz parçaları.
// Her tip: render(ex, ctx) → HTMLElement. Kullanıcı cevap verince ctx.done(result) çağrılır:
//   result = { ok, level, given, expected, notes[], tags[], diff[], self? (öz-değerlendirme), word? }
(function (DE) {
  'use strict';

  var h = DE.util.h;
  var types = {};

  function register(type, impl) { types[type] = impl; }

  function render(ex, ctx) {
    var impl = types[ex.type];
    if (!impl) return h('div.card', 'Bilinmeyen alıştırma tipi: ' + ex.type);
    return impl.render(ex, ctx);
  }

  /** Artikel renkli kelime HTML'i: "der Tisch" */
  function wordEl(w, opts) {
    opts = opts || {};
    var el = h('span.word');
    if (w.art && opts.art !== false) el.appendChild(h('span.art.' + w.art, w.art));
    if (w.art && opts.art !== false) el.appendChild(document.createTextNode(' '));
    el.appendChild(h('span.de', w.de));
    return el;
  }

  /** Almanca metin girişi + ä ö ü ß tuşları. onSubmit(value) */
  function textInput(onSubmit, opts) {
    opts = opts || {};
    var input = h('input.answer', { type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: false, placeholder: opts.placeholder || 'Almanca yaz…', lang: 'de' });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); if (input.value.trim()) onSubmit(input.value); }
    });
    var keys = h('div.umlauts', ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(function (ch) {
      return h('button.key', {
        type: 'button', tabindex: -1,
        onmousedown: function (e) { e.preventDefault(); },
        onclick: function () { insertAt(input, ch); }
      }, ch);
    }));
    var submit = h('button.btn.primary', { type: 'button', onclick: function () { if (input.value.trim()) onSubmit(input.value); } }, 'Kontrol et');
    var wrap = h('div.input-wrap', input, keys, h('div.actions', submit));
    wrap.input = input;
    wrap.lock = function () { input.disabled = true; submit.disabled = true; keys.querySelectorAll('button').forEach(function (b) { b.disabled = true; }); };
    setTimeout(function () { input.focus(); }, 30);
    return wrap;
  }

  function insertAt(input, text) {
    var s = input.selectionStart == null ? input.value.length : input.selectionStart;
    var e = input.selectionEnd == null ? s : input.selectionEnd;
    input.value = input.value.slice(0, s) + text + input.value.slice(e);
    input.selectionStart = input.selectionEnd = s + text.length;
    input.focus();
  }

  /** Sonek kurallarından artikel ipucu (kurala uymayan kelimeler için null). */
  function articleRule(noun) {
    var n = noun.toLowerCase();
    var rules = [
      [/(ung|heit|keit|schaft|ion|tät|ik|ei|ur)$/, 'die', '-ung, -heit, -keit, -schaft, -ion, -tät, -ik, -ei ile biten isimler hep die'],
      [/(chen|lein)$/, 'das', '-chen ve -lein (küçültme) ile bitenler hep das'],
      [/(ment|um)$/, 'das', '-ment ve -um ile bitenler çoğunlukla das'],
      [/(ling|ismus|or)$/, 'der', '-ling, -ismus, -or ile bitenler çoğunlukla der']
    ];
    for (var i = 0; i < rules.length; i++) if (rules[i][0].test(n)) return { art: rules[i][1], text: rules[i][2] };
    return null;
  }

  /** Cevap sonrası geri bildirim kutusu. */
  function feedback(res, ex) {
    var cls = res.self ? 'neutral' : res.ok ? (res.level === 'minor' ? 'ok minor' : 'ok') : (res.level === 'partial' ? 'partial' : 'bad');
    var title = res.self ? '✓ Kaydedildi' : res.ok ? (res.level === 'minor' ? '✓ Doğru (küçük not var)' : '✓ Doğru!') : (res.level === 'partial' ? '≈ Neredeyse' : '✗ Yanlış');
    var box = h('div.feedback.' + cls.split(' ').join('.'), h('div.fb-title', title));
    if (!res.ok && res.expected) {
      box.appendChild(h('div.fb-expected', 'Doğrusu: ', h('b', { lang: 'de' }, res.expected), ' ', DE.audio.button(res.expected, { slow: false })));
    }
    if (!res.ok && res.diff && res.diff.length && res.given) {
      box.appendChild(h('div.diff', res.diff.map(function (d) { return h('span.' + d.op, d.t); })));
    }
    (res.notes || []).forEach(function (n) { box.appendChild(h('div.fb-note', n)); });
    if (ex && ex.explain && (!res.ok || res.level === 'minor' || ex.type === 'mcq')) box.appendChild(h('div.fb-explain', '💡 ', ex.explain));
    return box;
  }

  DE.exercises = { register: register, render: render, types: types, wordEl: wordEl, textInput: textInput, articleRule: articleRule, feedback: feedback };
})(window.DE = window.DE || {});
