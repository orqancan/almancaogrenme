// Tekrar (FSRS) oturumu. Kart yönleri: de-tr (tanı, kendin değerlendir), art (artikel seç), tr-de (yaz).
(function (DE) {
  'use strict';

  var h = DE.util.h;
  var X = DE.exercises;
  var LABELS = ['Tekrar', 'Zor', 'İyi', 'Kolay'];

  function view(root, arg) {
    var plan = DE.planner.today();
    var limit = arg === 'all' ? null : plan.reviewBudget;
    var queue = DE.store.dueQueue(limit);
    var total = queue.length, done = 0, again = 0, requeued = {};
    var stage = h('div.stage');
    var bar = h('div.bar');
    root.appendChild(h('div.player',
      h('div.player-head', h('a.back', { href: '#/today' }, '✕'), h('div.progress', bar), h('div.small.muted.ptitle', 'Tekrar')),
      stage));

    var keyHandler = null;
    DE.views.review.onKey = function (e) { if (keyHandler) keyHandler(e); };

    if (!queue.length) {
      stage.appendChild(h('div.card.end', h('h2', '✓ Bugün tekrar edilecek kart yok'), h('p', 'Yeni kartlar dersleri bitirdikçe gelir.')));
      stage.appendChild(h('div.actions', h('a.btn.primary', { href: '#/today' }, 'Bugün ekranı')));
      return;
    }

    function grade(card, g) {
      DE.store.tick();
      DE.store.gradeCard(card.id, g);
      done++;
      if (g === 1) {
        again++;
        if ((requeued[card.id] || 0) < 2) {
          requeued[card.id] = (requeued[card.id] || 0) + 1;
          queue.splice(Math.min(queue.length, 3 + Math.floor(Math.random() * 3)), 0, DE.store.state.cards[card.id]);
          total++;
        }
      }
      next();
    }

    function next() {
      DE.audio.stop();
      keyHandler = null;
      stage.innerHTML = '';
      bar.style.width = Math.round(100 * done / Math.max(1, total)) + '%';
      var card = queue.shift();
      if (!card) return finish();
      var w = DE.content.words[card.w];
      if (!w) return next();
      if (card.dir === 'art') return showArticle(card, w);
      if (card.dir === 'tr-de') return showProduce(card, w);
      return showRecognize(card, w);
    }

    function gradeButtons(card) {
      var prev = DE.fsrs.preview(card, Date.now());
      var row = h('div.grades', LABELS.map(function (l, i) {
        return h('button.btn.grade.g' + (i + 1), { type: 'button', onclick: function () { grade(card, i + 1); } },
          h('span.kbd', String(i + 1)), ' ', l, h('span.tiny', DE.util.fmtInterval(prev[i])));
      }));
      keyHandler = function (e) { var n = parseInt(e.key, 10); if (n >= 1 && n <= 4) grade(card, n); };
      return row;
    }

    function showRecognize(card, w) {
      var full = (w.art ? w.art + ' ' : '') + w.de;
      var back = h('div.back', { hidden: true },
        h('div.meaning', w.tr, DE.store.state.settings.showEn && w.en ? h('span.en', ' · 🇬🇧 ' + w.en) : null),
        w.pos === 'n' && w.pl && w.pl !== '-' ? h('div.muted', 'Çoğul: die ' + w.pl) : null,
        w.ex ? h('div.example', h('div', { lang: 'de' }, w.ex.de, ' ', DE.audio.button(w.ex.de)), h('div.muted', w.ex.tr)) : null);
      var reveal = h('button.btn.primary.wide', { type: 'button', onclick: show }, 'Cevabı göster (boşluk)');
      var actions = h('div.actions', reveal);
      function show() {
        back.hidden = false;
        actions.innerHTML = '';
        actions.appendChild(gradeButtons(card));
      }
      stage.appendChild(h('div.card.flash',
        h('div.tiny.muted', 'Anlamı ne?'),
        h('div.big-word', { lang: 'de' }, X.wordEl(w), ' ', DE.audio.button(full)),
        back));
      stage.appendChild(actions);
      keyHandler = function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); show(); } };
      DE.audio.speak(full);
    }

    function afterAuto(card, res, ex) {
      var g = res.ok ? (res.level === 'exact' ? 3 : 2) : (res.level === 'partial' ? 2 : 1);
      var fb = X.feedback(res, ex);
      var buttons = [];
      if (!res.ok && card.dir === 'tr-de') buttons.push(h('button.btn.ghost', { type: 'button', onclick: function () { grade(card, 3); } }, 'Aslında doğruydu'));
      var go = h('button.btn.primary', { type: 'button', onclick: function () { grade(card, g); } }, 'Devam ↵');
      buttons.push(go);
      stage.appendChild(fb);
      stage.appendChild(h('div.actions', buttons));
      setTimeout(function () { go.focus(); }, 20);
      keyHandler = function (e) { if (e.key === 'Enter' && e.target.tagName !== 'INPUT') { e.preventDefault(); grade(card, g); } };
    }

    function showArticle(card, w) {
      var ex = { id: card.id, type: 'article', word: w.id };
      var el = X.render(ex, { done: function (res) { keyHandler = null; afterAuto(card, res, ex); } });
      stage.appendChild(h('div.card', el));
      keyHandler = function (e) { if (el.onKey) el.onKey(e.key); };
    }

    function showProduce(card, w) {
      var target = (w.art ? w.art + ' ' : '') + w.de;
      var ex = { id: card.id, type: 'type' };
      var el = h('div.ex',
        h('div.q', 'Almancası?' + (w.art ? ' (artikeliyle)' : '')),
        h('div.tr-line.big', w.tr, DE.store.state.settings.showEn && w.en ? h('span.en', ' · 🇬🇧 ' + w.en) : null));
      var inp = X.textInput(function (v) {
        inp.lock();
        var res = DE.answer.check(v, [target]);
        res.given = v;
        DE.audio.speak(target);
        afterAuto(card, res, ex);
      });
      el.appendChild(inp);
      stage.appendChild(h('div.card', el));
    }

    function finish() {
      bar.style.width = '100%';
      var plan2 = DE.planner.today();
      var lessonStep = plan2.steps.find(function (s) { return s.kind === 'lesson' || s.kind === 'test'; });
      stage.appendChild(h('div.card.end',
        h('h2', '✓ Tekrar bitti'),
        h('p', done + ' kart tekrar edildi' + (again ? ', ' + again + ' kez "Tekrar" dedin — normal, unutmak öğrenmenin parçası.' : '.')),
        plan2.due > 0 ? h('p.small.muted', 'Bekleyen ' + plan2.due + ' kart daha var. İstersen hepsini bitirebilirsin.') : null));
      stage.appendChild(h('div.actions',
        plan2.due > 0 ? h('a.btn', { href: '#/review/all', onclick: function () { setTimeout(function () { DE.app.route(); }, 0); } }, 'Kalan tekrarlar') : null,
        lessonStep ? h('a.btn.primary', { href: lessonStep.kind === 'lesson' ? '#/lesson/' + lessonStep.lesson.id : '#/test/' + lessonStep.unit.id },
          lessonStep.kind === 'lesson' ? 'Yeni derse geç →' : 'Ünite testine geç →') : h('a.btn.primary', { href: '#/today' }, 'Bugün ekranı')));
    }

    next();
  }

  DE.views = DE.views || {};
  DE.views.review = view;
})(window.DE = window.DE || {});
