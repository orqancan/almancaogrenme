// Yazarak cevaplanan alıştırmalar: type (TR→DE), cloze (boşluk), listen (dikte), order (sıralama).
(function (DE) {
  'use strict';

  var h = DE.util.h;
  var X = DE.exercises;

  function finish(ctx, input, answers, extra) {
    var r = DE.answer.check(input, answers);
    r.given = input;
    if (extra) Object.assign(r, extra);
    ctx.done(r);
  }

  X.register('type', {
    render: function (ex, ctx) {
      var el = h('div.ex.ex-type', h('div.q', ex.q || 'Almancaya çevir:'));
      if (ex.tr) el.appendChild(h('div.tr-line', ex.tr));
      var inp = X.textInput(function (v) { inp.lock(); finish(ctx, v, ex.answers); });
      el.appendChild(inp);
      return el;
    }
  });

  X.register('cloze', {
    render: function (ex, ctx) {
      var parts = ex.de.split('___');
      var el = h('div.ex.ex-cloze', h('div.q', ex.q || 'Boşluğu doldur:'));
      var sentence = h('div.de-line.cloze', { lang: 'de' }, parts[0], h('span.gap', '…'), parts[1]);
      if (ex.hint) sentence.appendChild(h('span.hint', ' (' + ex.hint + ')'));
      el.appendChild(sentence);
      el.appendChild(h('div.tr-line', ex.tr));
      var inp = X.textInput(function (v) {
        inp.lock();
        var full = ex.answers.map(function (a) { return parts[0] + a + parts[1]; });
        // Boşluğa yazılanı tam cümle içinde değerlendir (ör. büyük harf, artikel teşhisi için).
        var r = DE.answer.check(parts[0] + v + parts[1], full);
        r.given = v;
        r.expected = r.ok ? null : ex.answers[0];
        sentence.querySelector('.gap').textContent = r.ok ? v : ex.answers[0];
        sentence.querySelector('.gap').classList.add(r.ok ? 'right' : 'wrong');
        ctx.done(r);
        DE.audio.speak(full[0]);
      }, { placeholder: 'Boşluğa gelen…' });
      el.appendChild(inp);
      return el;
    }
  });

  X.register('listen', {
    render: function (ex, ctx) {
      var el = h('div.ex.ex-listen', h('div.q', ex.q || 'Dinle ve duyduğunu yaz:'),
        h('div.listen-big',
          h('button.btn.big', { type: 'button', onclick: function () { DE.audio.speak(ex.de); } }, '🔊 Dinle'),
          h('button.btn.ghost', { type: 'button', onclick: function () { DE.audio.speak(ex.de, { slow: true }); } }, '🐢 Yavaş')));
      setTimeout(function () { DE.audio.speak(ex.de); }, 250);
      var inp = X.textInput(function (v) {
        inp.lock();
        finish(ctx, v, ex.answers && ex.answers.length ? ex.answers : [ex.de], { notes: [] });
        el.appendChild(h('div.tr-line', ex.de + ' — ' + ex.tr));
      });
      el.appendChild(inp);
      el.onKey = function (k) { if (k === ' ' && document.activeElement !== inp.input) DE.audio.speak(ex.de); };
      return el;
    }
  });

  // Kelime sıralama: karışık kelime kartlarına tıklayarak cümle kur.
  X.register('order', {
    render: function (ex, ctx) {
      var toks = ex.answer.trim().split(/\s+/).map(function (t) { return t.replace(/[.,!?]+$/, ''); });
      var pool = DE.util.shuffle(toks.concat(ex.extra || []).map(function (t, i) { return { t: t, i: i }; }));
      var picked = [];
      var el = h('div.ex.ex-order', h('div.q', ex.q || 'Cümleyi kur:'), h('div.tr-line', ex.tr));
      var line = h('div.order-line', { lang: 'de' });
      var bank = h('div.order-bank', { lang: 'de' });
      var check = h('button.btn.primary', { type: 'button', disabled: true }, 'Kontrol et');
      var locked = false;

      function draw() {
        line.innerHTML = ''; bank.innerHTML = '';
        picked.forEach(function (p, idx) {
          line.appendChild(h('button.chip', { type: 'button', onclick: function () { if (locked) return; picked.splice(idx, 1); draw(); } }, p.t));
        });
        pool.forEach(function (p) {
          var used = picked.indexOf(p) >= 0;
          bank.appendChild(h('button.chip' + (used ? '.used' : ''), { type: 'button', disabled: used || locked, onclick: function () { picked.push(p); DE.audio.speak(p.t); draw(); } }, p.t));
        });
        check.disabled = locked || picked.length === 0;
      }
      check.onclick = function () {
        locked = true; draw();
        var given = picked.map(function (p) { return p.t; }).join(' ');
        var r = DE.answer.check(given, [ex.answer].concat(ex.alt || []));
        if (r.level === 'minor') r.level = 'exact';
        r.given = given;
        ctx.done(r);
        DE.audio.speak(ex.answer);
      };
      el.appendChild(line); el.appendChild(bank); el.appendChild(h('div.actions', check));
      draw();
      return el;
    }
  });
})(window.DE = window.DE || {});
