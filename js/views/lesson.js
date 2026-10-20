// Ders ve ünite testi oynatıcısı. Oturum durumu store.state.run'da tutulur: sekme kapansa da kaldığı yerden devam eder.
(function (DE) {
  'use strict';

  var h = DE.util.h;
  var X = DE.exercises;
  var RETRY_GAP = 3;

  function lessonOfExercise(id) {
    if (id.indexOf('auto:art:') === 0) { var w = DE.content.words[id.slice(9)]; return w && DE.content.lessonById[w.lessonId]; }
    if (id.indexOf('auto:match:') === 0) { var w2 = DE.content.words[id.slice(11).split(',')[0]]; return w2 && DE.content.lessonById[w2.lessonId]; }
    return DE.content.lessonById[id.replace(/\.e\d+$/, '')];
  }

  function newRun(mode, id) {
    var steps = mode === 'test' ? DE.planner.testSteps(DE.content.unitById[id]) : DE.planner.lessonSteps(DE.content.lessonById[id]);
    steps.push({ k: 'end' });
    return { type: mode, id: id, steps: steps, pos: 0, first: {}, retried: {}, wrongWords: {}, started: Date.now() };
  }

  function view(root, id, mode) {
    var S = DE.store.state;
    var isTest = mode === 'test';
    var lesson = isTest ? null : DE.content.lessonById[id];
    var unit = isTest ? DE.content.unitById[id] : lesson && DE.content.unitById[lesson.unitId];
    if (!unit) { root.appendChild(h('div.card', 'Bulunamadı: ' + id)); return; }

    var run = S.run;
    if (!run || run.type !== mode || run.id !== id) {
      if (run && run.pos > 0 && !confirm('Yarım kalan bir oturumun var (' + runTitle(run) + '). Onu bırakıp bunu başlatayım mı?')) {
        location.hash = run.type === 'test' ? '#/test/' + run.id : '#/lesson/' + run.id;
        return;
      }
      run = S.run = newRun(mode, id);
      DE.store.save();
    }

    var header = h('div.player-head',
      h('a.back', { href: '#/today', title: 'Çık (ilerleme kaydedilir)' }, '✕'),
      h('div.progress', h('div.bar')),
      h('div.small.muted.ptitle', isTest ? 'Ünite testi · ' + unit.title : unit.title + ' · ' + lesson.title));
    var stage = h('div.stage');
    root.appendChild(h('div.player', header, stage));

    var keyHandler = null;
    view.onKey = function (e) { if (keyHandler) keyHandler(e); };

    function setProgress() {
      header.querySelector('.bar').style.width = Math.round(100 * run.pos / Math.max(1, run.steps.length - 1)) + '%';
    }

    function next() {
      run.pos++;
      DE.store.save();
      show();
    }

    function continueBtn(label) {
      var b = h('button.btn.primary.wide', { type: 'button', onclick: next }, label || 'Devam ↵');
      keyHandler = function (e) { if (e.key === 'Enter' && !isTyping(e)) { e.preventDefault(); next(); } };
      setTimeout(function () { b.focus(); }, 20);
      return h('div.actions', b);
    }

    function show() {
      DE.audio.stop();
      setProgress();
      stage.innerHTML = '';
      keyHandler = null;
      var step = run.steps[run.pos];
      if (!step) { location.hash = '#/today'; return; }
      window.scrollTo(0, 0);
      if (step.k === 'intro') return showIntro();
      if (step.k === 'word') return showWord(DE.content.words[step.id]);
      if (step.k === 'grammar') return showGrammar(lesson.grammar[step.i]);
      if (step.k === 'culture') return showCulture();
      if (step.k === 'ex') return showExercise(step);
      if (step.k === 'end') return showEnd();
    }

    function showIntro() {
      var card = h('div.card');
      if (lesson.intro) card.appendChild(h('p.intro', lesson.intro));
      if (lesson.dialog) card.appendChild(dialogEl(lesson.dialog));
      stage.appendChild(card);
      stage.appendChild(continueBtn());
    }

    function showWord(w) {
      if (!w) return next();
      var showEn = S.settings.showEn;
      var card = h('div.card.word-card',
        h('div.tiny.muted', 'Yeni kelime'),
        h('div.big-word', { lang: 'de' }, X.wordEl(w), ' ', DE.audio.button((w.art ? w.art + ' ' : '') + w.de)),
        w.pos === 'n' && w.pl ? h('div.muted', w.pl === '-' ? 'Çoğulu yok' : (w.plOnly ? 'Sadece çoğul' : 'Çoğul: die ' + w.pl)) : null,
        h('div.meaning', w.tr, showEn && w.en ? h('span.en', ' · 🇬🇧 ' + w.en) : null),
        w.ex ? h('div.example', h('div', { lang: 'de' }, w.ex.de, ' ', DE.audio.button(w.ex.de)), h('div.muted', w.ex.tr)) : null,
        w.note ? h('div.note', '💡 ', w.note) : null,
        w.ff && showEn ? h('div.note.warn', '⚠️ ', w.ff) : null);
      if (w.art) {
        var rule = X.articleRule(w.de);
        if (rule && rule.art === w.art) card.appendChild(h('div.note', '🎯 ', rule.text));
      }
      stage.appendChild(card);
      stage.appendChild(continueBtn());
      DE.audio.speak((w.art ? w.art + ' ' : '') + w.de);
    }

    function showGrammar(g) {
      stage.appendChild(h('div.card.grammar', h('h2', '📘 ' + g.title), h('div.ghtml', { html: g.html })));
      // Gramer içindeki Almanca örnekleri tıklayınca seslendir.
      stage.querySelectorAll('.ghtml [lang=de], .ghtml td, .ghtml b').forEach(function (el) {
        if (/[A-Za-zÄÖÜäöüß]/.test(el.textContent) && el.textContent.length < 80) {
          el.classList.add('speakable');
          el.addEventListener('click', function () { DE.audio.speak(el.textContent); });
        }
      });
      stage.appendChild(continueBtn());
    }

    function showCulture() {
      stage.appendChild(h('div.card.culture', h('h2', '🇩🇪 Almanya\'da hayat'), h('p', lesson.culture)));
      stage.appendChild(continueBtn());
    }

    function showExercise(step) {
      var ex = DE.planner.exerciseById(step.id);
      if (!ex) return next();
      var exLesson = lesson || lessonOfExercise(step.id);
      var answered = false;
      var feedbackSlot = h('div');
      var el = X.render(ex, {
        lesson: exLesson,
        done: function (res) {
          if (answered) return;
          answered = true;
          DE.store.tick();
          var firstTime = !(step.id in run.first);
          if (!res.self && firstTime) run.first[step.id] = !!res.ok;
          if (!res.self) {
            DE.store.recordAttempt(ex, res.ok, { q: ex.q || ex.tr || ex.de || '', given: res.given, expected: res.expected, tags: res.tags });
            if (!res.ok && res.word) run.wrongWords[res.word] = true;
            if (!res.ok && !isTest && !run.retried[step.id]) {
              run.retried[step.id] = true;
              run.steps.splice(Math.min(run.pos + 1 + RETRY_GAP, run.steps.length - 1), 0, { k: 'ex', id: step.id, retry: true });
            }
          }
          DE.store.save();
          if (el.noAutoFeedback) { next(); return; }
          feedbackSlot.appendChild(X.feedback(res, ex));
          var buttons = [];
          if (!res.ok && !res.self && ['type', 'cloze', 'listen'].indexOf(ex.type) >= 0) {
            buttons.push(h('button.btn.ghost', { type: 'button', onclick: function () {
              run.first[step.id] = true; DE.store.save(); next();
            } }, 'Aslında doğruydu'));
          }
          if (!res.ok && !res.self) {
            var aiSlot = h('div');
            buttons.push(h('button.btn.ghost', { type: 'button', onclick: function () {
              aiSlot.innerHTML = '';
              aiSlot.appendChild(DE.ai.panel(DE.ai.explainPrompt({ level: DE.ai.levelOf(exLesson), q: [ex.q, ex.tr, ex.de].filter(Boolean).join(' / '), given: res.given || '', expected: res.expected || '' }), 'Nedenini yapay zekâya sor'));
            } }, '🤖 Neden?'));
            feedbackSlot.appendChild(aiSlot);
          }
          feedbackSlot.appendChild(h('div.actions', buttons, continueBtn().firstChild));
        }
      });
      if (step.retry) stage.appendChild(h('div.tiny.muted', '↻ Bu soruyu tekrar deniyoruz'));
      stage.appendChild(h('div.card', el));
      stage.appendChild(feedbackSlot);
      keyHandler = function (e) { if (!answered && el.onKey && !isTyping(e)) el.onKey(e.key); };
    }

    function score() {
      var ids = Object.keys(run.first);
      if (!ids.length) return 1;
      return ids.filter(function (k) { return run.first[k]; }).length / ids.length;
    }

    function showEnd() {
      var sc = score();
      var pct = Math.round(sc * 100);
      var card = h('div.card.end');
      if (isTest) {
        DE.store.finishTest(unit.id, sc);
        var passed = sc >= DE.planner.PASS;
        card.appendChild(h('h2', passed ? '🎉 Ünite testini geçtin!' : 'Test bitti'));
        card.appendChild(h('div.score' + (passed ? '.good' : '.meh'), pct + '%'));
        card.appendChild(h('p', passed ? 'Bu ünitedeki konuları oturttun. Sonraki üniteye geçebilirsin.'
          : 'Geçme sınırı %' + Math.round(DE.planner.PASS * 100) + '. Yanlış yaptığın konuların derslerine göz at, tekrarlarını yap ve yarın testi yeniden dene.'));
        if (!passed) card.appendChild(h('p.small.muted', 'İpucu: "Hata Defteri"nde bu testte yaptığın hataları görebilirsin.'));
        // Testi açık bırakmamak için hedef: tekrar dene veya kursa dön.
        stage.appendChild(card);
        stage.appendChild(h('div.actions',
          h('a.btn', { href: '#/mistakes' }, 'Hata Defteri'),
          h('a.btn.primary', { href: '#/today' }, 'Bugün ekranına dön')));
      } else {
        var created = DE.store.finishLesson(lesson, sc, run.wrongWords);
        card.appendChild(h('h2', '✓ Ders tamamlandı'));
        card.appendChild(h('div.score' + (sc >= 0.8 ? '.good' : '.meh'), pct + '%'));
        card.appendChild(h('p', sc >= 0.8 ? 'Harika! ' : 'Bitirdin, bu önemli. '));
        if (created) card.appendChild(h('p', '🗂 ' + created + ' yeni kart tekrar destene eklendi. Yarın ilk tekrarları gelecek.'));
        if (sc < 0.6) card.appendChild(h('p.small', 'Bu ders zor geçti. İstersen yarın tekrardan sonra bu dersi bir kez daha yap (Kurs ekranından).'));
        stage.appendChild(card);
        var nl = DE.planner.nextLesson();
        stage.appendChild(h('div.actions',
          h('a.btn', { href: '#/today' }, 'Bugün ekranı'),
          nl ? h('a.btn.primary', { href: '#/lesson/' + nl.id }, 'Sonraki ders →') : null));
      }
      setProgress();
    }

    show();
  }

  function runTitle(run) {
    if (run.type === 'test') { var u = DE.content.unitById[run.id]; return 'Test: ' + (u ? u.title : run.id); }
    var l = DE.content.lessonById[run.id];
    return l ? l.title : run.id;
  }

  function isTyping(e) { var t = e.target; return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA'); }

  function dialogEl(d) {
    var showTr = false;
    var box = h('div.dialog');
    if (d.title) box.appendChild(h('div.dialog-title', '💬 ' + d.title));
    var lines = d.lines.map(function (l) {
      return h('div.line', { onclick: function () { DE.audio.speak(l.de); } },
        h('span.speaker', l.s + ':'), ' ', h('span.de', { lang: 'de' }, l.de), h('div.tr', l.tr));
    });
    lines.forEach(function (l) { box.appendChild(l); });
    var playing = false;
    box.appendChild(h('div.row.wrap',
      h('button.btn', { type: 'button', onclick: function () {
        if (playing) return; playing = true;
        var i = 0;
        (function step() {
          lines.forEach(function (x) { x.classList.remove('now'); });
          if (i >= d.lines.length) { playing = false; return; }
          lines[i].classList.add('now');
          DE.audio.speak(d.lines[i].de).then(function () { i++; setTimeout(step, 350); });
        })();
      } }, '▶ Diyaloğu dinle'),
      h('button.btn.ghost', { type: 'button', onclick: function (e) {
        showTr = !showTr; box.classList.toggle('show-tr', showTr); e.currentTarget.textContent = showTr ? 'Çeviriyi gizle' : 'Çeviriyi göster';
      } }, 'Çeviriyi göster')));
    box.appendChild(h('div.tiny.muted', 'Bir satıra dokununca o satır okunur. Önce çeviriye bakmadan anlamaya çalış.'));
    return box;
  }

  DE.views = DE.views || {};
  DE.views.lesson = function (root, id) { return view(root, id, 'lesson'); };
  DE.views.test = function (root, id) { return view(root, id, 'test'); };
  DE.views.lesson.onKey = function (e) { if (view.onKey) view.onKey(e); };
  DE.views.test.onKey = DE.views.lesson.onKey;
  DE.views.dialogEl = dialogEl;
  DE.views.runTitle = runTitle;
})(window.DE = window.DE || {});
