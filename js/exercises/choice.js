// Seçmeli alıştırmalar: mcq, article, match.
(function (DE) {
  'use strict';

  var h = DE.util.h;
  var X = DE.exercises;

  // Çoktan seçmeli. Seçeneklerden biri ex.de ile aynıysa bu bir dinleme sorusudur:
  // Almanca metin gösterilmez, sadece seslendirilir.
  X.register('mcq', {
    render: function (ex, ctx) {
      var listening = ex.de && ex.options.some(function (o) { return DE.answer.normalize(o) === DE.answer.normalize(ex.de); });
      var order = DE.util.shuffle(ex.options.map(function (o, i) { return i; }));
      var answered = false;
      var el = h('div.ex.ex-mcq', h('div.q', ex.q));
      if (ex.de) {
        el.appendChild(listening
          ? h('div.listen-big', h('button.btn.big', { type: 'button', onclick: function () { DE.audio.speak(ex.de); } }, '🔊 Dinle'),
              h('button.btn.ghost', { type: 'button', onclick: function () { DE.audio.speak(ex.de, { slow: true }); } }, '🐢 Yavaş'))
          : h('div.de-line', { lang: 'de' }, ex.de, ' ', DE.audio.button(ex.de)));
        if (listening) setTimeout(function () { DE.audio.speak(ex.de); }, 250);
      }
      var opts = h('div.options');
      order.forEach(function (i, n) {
        var b = h('button.option', {
          type: 'button',
          onclick: function () {
            if (answered) return;
            answered = true;
            var ok = i === ex.answer;
            b.classList.add(ok ? 'right' : 'wrong');
            opts.children[order.indexOf(ex.answer)].classList.add('right');
            ctx.done({ ok: ok, level: ok ? 'exact' : 'wrong', given: ex.options[i], expected: ok ? null : ex.options[ex.answer], tags: [] });
          }
        }, h('span.kbd', String(n + 1)), ' ', ex.options[i]);
        opts.appendChild(b);
      });
      el.appendChild(opts);
      el.onKey = function (k) { var n = parseInt(k, 10); if (n >= 1 && n <= order.length) opts.children[n - 1].click(); };
      return el;
    }
  });

  X.register('article', {
    render: function (ex, ctx) {
      var w = DE.content.words[ex.word];
      if (!w) return h('div', 'Kelime bulunamadı: ' + ex.word);
      var answered = false;
      var el = h('div.ex.ex-article',
        h('div.q', 'Artikeli seç:'),
        h('div.big-word', { lang: 'de' }, h('span.blank-art', '___'), ' ', w.de, ' ', DE.audio.button(w.de, { slow: false })),
        h('div.muted', w.tr + (DE.store.state.settings.showEn && w.en ? ' · ' + w.en : '')));
      var row = h('div.options.row');
      ['der', 'die', 'das'].forEach(function (a, n) {
        row.appendChild(h('button.option.art-btn.' + a, {
          type: 'button',
          onclick: function (e) {
            if (answered) return;
            answered = true;
            var ok = a === w.art;
            e.currentTarget.classList.add(ok ? 'right' : 'wrong');
            el.querySelector('.blank-art').replaceWith(h('span.art.' + w.art, w.art));
            DE.audio.speak(w.art + ' ' + w.de);
            var notes = [];
            if (w.pl && w.pl !== '-') notes.push('Çoğul: die ' + w.pl);
            var rule = X.articleRule(w.de);
            if (rule && rule.art === w.art) notes.push('Kural: ' + rule.text + '.');
            ctx.done({ ok: ok, level: ok ? 'exact' : 'wrong', given: a + ' ' + w.de, expected: ok ? null : w.art + ' ' + w.de, notes: notes, tags: ok ? [] : ['article'], word: w.id });
          }
        }, h('span.kbd', String(n + 1)), ' ', a));
      });
      el.appendChild(row);
      el.onKey = function (k) { var n = parseInt(k, 10); if (n >= 1 && n <= 3) row.children[n - 1].click(); };
      return el;
    }
  });

  // Eşleştirme: soldan bir Almanca, sağdan bir Türkçe seç.
  X.register('match', {
    render: function (ex, ctx) {
      var left = DE.util.shuffle(ex.pairs.map(function (p, i) { return i; }));
      var right = DE.util.shuffle(ex.pairs.map(function (p, i) { return i; }));
      var sel = null, matched = 0, errors = 0;
      var el = h('div.ex.ex-match', h('div.q', ex.q || 'Eşleştir:'));
      var L = h('div.col'), R = h('div.col');
      left.forEach(function (i) {
        var b = h('button.option.small', { type: 'button', lang: 'de', onclick: function () {
          if (b.disabled) return;
          L.querySelectorAll('.sel').forEach(function (x) { x.classList.remove('sel'); });
          b.classList.add('sel'); sel = { i: i, b: b };
          DE.audio.speak(ex.pairs[i][0]);
        } }, ex.pairs[i][0]);
        L.appendChild(b);
      });
      right.forEach(function (i) {
        var b = h('button.option.small', { type: 'button', onclick: function () {
          if (b.disabled || !sel) return;
          if (sel.i === i) {
            sel.b.classList.remove('sel'); sel.b.classList.add('right'); b.classList.add('right');
            sel.b.disabled = true; b.disabled = true; sel = null; matched++;
            if (matched === ex.pairs.length) {
              var ok = errors <= 1;
              ctx.done({ ok: ok, level: ok ? 'exact' : 'wrong', notes: errors ? [errors + ' yanlış eşleştirme yaptın.'] : [], tags: ok ? [] : ['vocab'], given: errors + ' hata' });
            }
          } else {
            errors++;
            b.classList.add('wrong'); setTimeout(function () { b.classList.remove('wrong'); }, 500);
          }
        } }, ex.pairs[i][1]);
        R.appendChild(b);
      });
      el.appendChild(h('div.match-grid', L, R));
      return el;
    }
  });
})(window.DE = window.DE || {});
