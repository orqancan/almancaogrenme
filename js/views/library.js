// Kelime defteri, gramer referansı ve Hata Defteri.
(function (DE) {
  'use strict';

  var h = DE.util.h;

  function learnedWordIds() {
    var S = DE.store.state;
    var ids = {};
    Object.keys(S.cards).forEach(function (k) { ids[S.cards[k].w] = true; });
    return ids;
  }

  function strength(wid) {
    var c = DE.store.state.cards[wid + '#de-tr'];
    if (!c) return null;
    return Math.round(c.s);
  }

  function words(root) {
    var S = DE.store.state;
    var learned = learnedWordIds();
    var filter = { q: '', mode: Object.keys(learned).length ? 'learned' : 'all' };
    root.appendChild(h('h1', 'Kelimeler'));
    var search = h('input.search', { type: 'search', placeholder: 'Ara (Almanca, Türkçe veya İngilizce)…', oninput: function () { filter.q = search.value.toLowerCase(); draw(); } });
    var modes = h('div.row.wrap', [['learned', 'Öğrendiklerim'], ['all', 'Tümü'], ['ff', '⚠️ Sahte arkadaşlar'], ['weak', 'Zayıflar']].map(function (m) {
      return h('button.chip', { type: 'button', 'data-m': m[0], onclick: function () { filter.mode = m[0]; draw(); } }, m[1]);
    }));
    var list = h('div.wordlist');
    root.appendChild(search); root.appendChild(modes); root.appendChild(list);

    function draw() {
      modes.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('active', c.getAttribute('data-m') === filter.mode); });
      list.innerHTML = '';
      var all = DE.content.allLessons().reduce(function (acc, l) { return acc.concat(l.words || []); }, []);
      var seen = {};
      var rows = all.filter(function (w) {
        if (seen[w.id]) return false; seen[w.id] = true;
        if (filter.mode === 'learned' && !learned[w.id]) return false;
        if (filter.mode === 'ff' && !w.ff) return false;
        if (filter.mode === 'weak') { var c = S.cards[w.id + '#de-tr']; if (!c || (c.lapses || 0) < 1) return false; }
        if (filter.q) {
          var hay = [w.de, w.tr, w.en || '', w.art || ''].join(' ').toLowerCase();
          if (hay.indexOf(filter.q) < 0 && DE.answer.fold(hay).indexOf(DE.answer.fold(filter.q)) < 0) return false;
        }
        return true;
      });
      if (!rows.length) list.appendChild(h('p.muted', filter.mode === 'learned' ? 'Henüz kelime yok. İlk dersi bitirince burada görünecek.' : 'Sonuç yok.'));
      rows.forEach(function (w) {
        var st = strength(w.id);
        list.appendChild(h('div.wrow', { onclick: function () { DE.audio.speak((w.art ? w.art + ' ' : '') + w.de); } },
          h('div.wde', { lang: 'de' }, DE.exercises.wordEl(w), w.pos === 'n' && w.pl && w.pl !== '-' ? h('span.tiny.muted', ' · ' + w.pl) : null),
          h('div.wtr', w.tr, S.settings.showEn && w.en ? h('span.en', ' · ' + w.en) : null, w.ff ? h('div.tiny.warn', '⚠️ ' + w.ff) : null),
          h('div.wst.tiny.muted', st == null ? '' : st >= 21 ? '●●●' : st >= 5 ? '●●○' : '●○○')));
      });
      list.appendChild(h('p.tiny.muted', rows.length + ' kelime · ●○○ yeni, ●●○ oturuyor, ●●● sağlam. Satıra dokununca okunur.'));
    }
    draw();
  }

  function grammar(root) {
    var S = DE.store.state;
    var next = DE.planner.nextLesson();
    var showAll = false;
    root.appendChild(h('h1', 'Gramer'));
    var search = h('input.search', { type: 'search', placeholder: 'Konu ara (sein, Artikel, soru…)', oninput: draw });
    var toggle = h('label.small', h('input', { type: 'checkbox', onchange: function (e) { showAll = e.target.checked; draw(); } }), ' Henüz gelmediğim konuları da göster');
    var legend = h('div.card.legend', h('b', 'Artikel renkleri: '), h('span.art.der', 'der'), ' maskulin · ', h('span.art.die', 'die'), ' feminin · ', h('span.art.das', 'das'), ' nötr · ', h('span.art.pl', 'die'), ' çoğul');
    var list = h('div');
    root.appendChild(search); root.appendChild(toggle); root.appendChild(legend); root.appendChild(list);

    function draw() {
      list.innerHTML = '';
      var q = search.value.toLowerCase();
      var count = 0;
      DE.content.units.forEach(function (u) {
        var blocks = [];
        u.lessons.forEach(function (l) {
          var reached = DE.planner.lessonDone(l.id) || l === next;
          if (!reached && !showAll) return;
          (l.grammar || []).forEach(function (g) {
            if (q && (g.title + ' ' + g.html).toLowerCase().indexOf(q) < 0) return;
            blocks.push(h('details.card.grammar', h('summary', g.title, h('span.tiny.muted', ' · ' + l.title)), h('div.ghtml', { html: g.html })));
          });
        });
        if (blocks.length) { count += blocks.length; list.appendChild(h('h3', 'Ünite ' + u.order + ' · ' + u.title)); blocks.forEach(function (b) { list.appendChild(b); }); }
      });
      if (!count) list.appendChild(h('p.muted', 'Henüz konu yok. Dersleri bitirdikçe gramer kartları burada birikir.'));
      list.querySelectorAll('.ghtml td, .ghtml b').forEach(function (el) {
        if (/[A-Za-zÄÖÜäöüß]/.test(el.textContent) && el.textContent.length < 80) { el.classList.add('speakable'); el.onclick = function () { DE.audio.speak(el.textContent); }; }
      });
    }
    draw();
  }

  var TAG_NAMES = {
    article: 'Artikel (der/die/das)', 'article.missing': 'Artikeli unutmak', 'verb.conj': 'Fiil çekimi', word_order: 'Kelime sırası',
    spelling: 'Yazım', 'spelling.umlaut': 'Umlaut (ä/ö/ü)', 'spelling.caps': 'İsimlerde büyük harf', 'spelling.tr': 'Türkçe harf kullanımı',
    vocab: 'Kelime anlamı', sein: 'sein fiili', plural: 'Çoğul', number: 'Sayılar', pron: 'Telaffuz', question: 'Soru cümlesi',
    negation: 'Olumsuzluk', possessive: 'İyelik (mein/dein)', formal: 'du / Sie', 'case.acc': 'Akkusativ'
  };

  function mistakes(root) {
    var S = DE.store.state;
    root.appendChild(h('h1', 'Hata Defteri'));
    root.appendChild(h('p.small.muted', 'Hatalar öğrenmenin hammaddesi. Burada en sık zorlandığın konular ve son hataların var.'));
    var tags = Object.keys(S.tags).map(function (k) { return { k: k, n: S.tags[k].n, w: S.tags[k].wrong }; })
      .filter(function (t) { return t.w > 0 && t.n >= 3; })
      .sort(function (a, b) { return (b.w / b.n) - (a.w / a.n); }).slice(0, 6);
    if (tags.length) {
      root.appendChild(h('div.card', h('h3', 'Zayıf noktalar'), tags.map(function (t) {
        var pct = Math.round(100 * t.w / t.n);
        return h('div.tagrow', h('div', TAG_NAMES[t.k] || t.k), h('div.meter', h('div', { style: { width: pct + '%' } })), h('div.tiny.muted', pct + '% hata · ' + t.n + ' deneme'));
      })));
    }
    var recent = S.mistakes.slice(-40).reverse();
    if (!recent.length) { root.appendChild(h('p.muted', 'Henüz kayıtlı hata yok.')); return; }
    root.appendChild(h('h3', 'Son hatalar'));
    recent.forEach(function (m) {
      var slot = h('div');
      root.appendChild(h('div.card.mistake',
        m.q ? h('div.small', m.q) : null,
        h('div', h('span.bad-text', m.given || '—'), ' → ', h('b', { lang: 'de' }, m.expected || '')),
        h('div.tiny.muted', new Date(m.ts).toLocaleDateString('tr-TR') + (m.tags.length ? ' · ' + m.tags.map(function (t) { return TAG_NAMES[t] || t; }).join(', ') : '')),
        m.expected ? h('button.btn.ghost.small', { type: 'button', onclick: function () {
          slot.innerHTML = '';
          slot.appendChild(DE.ai.panel(DE.ai.explainPrompt({ level: 'A1', q: m.q, given: m.given, expected: m.expected }), 'Nedenini sor'));
        } }, '🤖 Neden?') : null,
        slot));
    });
  }

  DE.views = DE.views || {};
  DE.views.words = words;
  DE.views.grammar = grammar;
  DE.views.mistakes = mistakes;
})(window.DE = window.DE || {});
