// Kalıcı durum (localStorage), kartlar, tekrar kuyruğu, istatistikler, yedekleme.
// file:// altında Chrome tüm yerel sayfalar için tek bir depo kullanır; klasörü taşımak ilerlemeyi silmez.
// Tarayıcı verisi temizlenirse ilerleme gider → düzenli JSON yedeği (Ayarlar) şart.
(function (DE) {
  'use strict';

  var KEY = 'almanca.state.v1';
  var PREV_KEY = 'almanca.state.v1.prev';
  var LOG_CAP = 20000;
  var MISTAKE_CAP = 300;
  var U = DE.util;

  var DEFAULT_AI = [
    { name: 'ChatGPT', url: 'https://chatgpt.com/?q={q}' },
    { name: 'Claude', url: 'https://claude.ai/new?q={q}' },
    { name: 'Gemini', url: 'https://gemini.google.com/app' }
  ];

  function fresh() {
    return {
      v: 1,
      created: Date.now(),
      settings: { minutes: 30, showEn: true, voice: '', rate: 0.95, weeklyGoal: 5, stt: false, ai: DEFAULT_AI.slice(), lastExport: 0 },
      today: { day: '', minutes: 0 },
      lessons: {},      // lessonId → { done, best, last, runs }
      units: {},        // unitId → { testBest, testPassed, last }
      run: null,        // yarım kalan ders/test oturumu
      cards: {},        // cardId → kart
      log: [],          // [ts, id, grade, kind]
      days: {},         // YYYY-MM-DD → { sec, reviews, items }
      tags: {},         // hata etiketi → { n, wrong, last }
      mistakes: []      // Hata Defteri: { ts, id, q, given, expected, tags }
    };
  }

  var state = null;
  var listeners = [];

  function load() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { /* depolama kapalı */ }
    var s = null;
    if (raw) { try { s = JSON.parse(raw); } catch (e) { console.error('Kayıt okunamadı', e); } }
    state = migrate(s || fresh());
    return state;
  }

  function migrate(s) {
    var base = fresh();
    Object.keys(base).forEach(function (k) { if (s[k] == null) s[k] = base[k]; });
    Object.keys(base.settings).forEach(function (k) { if (s.settings[k] == null) s.settings[k] = base.settings[k]; });
    return s;
  }

  var lastPrevSave = 0;
  function save() {
    try {
      var json = JSON.stringify(state);
      // Günde bir, bir önceki sürümü ayrı anahtarda tut (bozulmaya karşı).
      if (Date.now() - lastPrevSave > 6 * 3600 * 1000) {
        var old = localStorage.getItem(KEY);
        if (old) localStorage.setItem(PREV_KEY, old);
        lastPrevSave = Date.now();
      }
      localStorage.setItem(KEY, json);
    } catch (e) {
      console.error('Kayıt yazılamadı', e);
      alert('İlerleme kaydedilemedi: ' + e.message + '\nAyarlar › Yedeği indir ile hemen yedek al.');
    }
    listeners.forEach(function (f) { f(state); });
  }

  function onChange(f) { listeners.push(f); }

  // ---- Günlük süre ve aktivite ---------------------------------------------------------

  function day(key) {
    key = key || U.dayKey();
    return state.days[key] || (state.days[key] = { sec: 0, reviews: 0, items: 0 });
  }

  var lastTick = 0;
  /** Bir cevap/etkileşim olduğunda çağrılır; aradaki süreyi (en fazla 90 sn) çalışma süresine ekler. */
  function tick() {
    var now = Date.now();
    var d = lastTick ? Math.min(90, (now - lastTick) / 1000) : 15;
    lastTick = now;
    var dd = day();
    dd.sec += d;
    dd.items++;
  }
  function pauseTick() { lastTick = 0; }

  function todayMinutes() {
    if (state.today.day !== U.dayKey()) return state.settings.minutes;
    return state.today.minutes;
  }
  function setTodayMinutes(m) { state.today = { day: U.dayKey(), minutes: m }; save(); }

  function isActiveDay(key) { var d = state.days[key]; return !!d && (d.sec >= 300 || d.reviews >= 20); }

  // ---- Kartlar --------------------------------------------------------------------------

  function cardId(wordId, dir) { return wordId + '#' + dir; }

  /** Ders bitince kelimeler için kart oluşturur. wrongWords: derste yanlış yapılan kelime id'leri. */
  function addCardsForLesson(lesson, wrongWords, now) {
    now = now || Date.now();
    var tomorrow = U.startOfDay(now) + U.DAY + 4 * 3600 * 1000;
    var created = 0;
    (lesson.words || []).forEach(function (w) {
      var dirs = ['de-tr'];
      if (w.pos === 'n' && w.artQuiz !== false) dirs.push('art');
      dirs.forEach(function (dir) {
        var id = cardId(w.id, dir);
        if (state.cards[id]) return;
        var c = { id: id, w: w.id, dir: dir, reps: 0, lapses: 0 };
        c = DE.fsrs.review(c, wrongWords && wrongWords[w.id] ? 1 : 2, now);
        c.due = Math.max(c.due, tomorrow);
        state.cards[id] = c;
        created++;
      });
    });
    return created;
  }

  /** Tanıma kartı (de-tr) yeterince oturunca üretim kartını (tr-de) aç. */
  function maybeUnlockProduction(card, now) {
    if (card.dir !== 'de-tr' || card.s < 3) return;
    var id = cardId(card.w, 'tr-de');
    if (state.cards[id]) return;
    state.cards[id] = { id: id, w: card.w, dir: 'tr-de', reps: 0, lapses: 0, due: U.startOfDay(now) + U.DAY + 4 * 3600 * 1000 };
  }

  function gradeCard(id, g, now) {
    now = now || Date.now();
    var c = state.cards[id];
    if (!c) return null;
    var n = DE.fsrs.review(c, g, now);
    state.cards[id] = n;
    maybeUnlockProduction(n, now);
    log(id, g, 'card');
    var d = day(); d.reviews++;
    d.words = d.words || {};
    d.words[c.w] = 1;
    save();
    return n;
  }

  /**
   * Bugünkü tekrar kuyruğu: vadesi gelmiş kartlar, en düşük hatırlanma olasılığı önce,
   * aynı kelimeden günde tek kart (kardeş gömme), limit kadar.
   */
  function dueQueue(limit, now) {
    now = now || Date.now();
    var endOfDay = U.startOfDay(now) + U.DAY;
    var seenToday = (state.days[U.dayKey(now)] || {}).words || {};
    var byWord = {};
    Object.keys(state.cards).forEach(function (id) {
      var c = state.cards[id];
      if (!DE.content.words[c.w]) return; // içerikten kaldırılmış kelime
      var relearn = c.due - c.last <= 15 * 60 * 1000; // bugün "Tekrar" denmiş kart
      if (c.due > (relearn ? now + 15 * 60 * 1000 : endOfDay)) return;
      if (seenToday[c.w] && !relearn) return;
      var r = DE.fsrs.recall(c, now);
      if (!byWord[c.w] || r < byWord[c.w].r) byWord[c.w] = { c: c, r: r };
    });
    var list = Object.keys(byWord).map(function (k) { return byWord[k]; });
    list.sort(function (a, b) { return a.r - b.r; });
    return list.slice(0, limit == null ? Infinity : limit).map(function (x) { return x.c; });
  }

  function dueCount(now) { return dueQueue(null, now).length; }

  // ---- Ders, test, hata kaydı ------------------------------------------------------------

  function log(id, g, kind) {
    state.log.push([Date.now(), id, g, kind]);
    if (state.log.length > LOG_CAP) state.log.splice(0, state.log.length - LOG_CAP);
  }

  /** Alıştırma sonucu: etiket istatistikleri + Hata Defteri. */
  function recordAttempt(ex, ok, info) {
    log(ex.id, ok ? 3 : 1, 'ex');
    var tags = (info && info.tags && info.tags.length ? info.tags : []).concat(ex.tags || []);
    tags.forEach(function (t) {
      var s = state.tags[t] || (state.tags[t] = { n: 0, wrong: 0, last: 0 });
      s.n++; if (!ok) { s.wrong++; s.last = Date.now(); }
    });
    if (!ok && info) {
      state.mistakes.push({ ts: Date.now(), id: ex.id, q: info.q || '', given: info.given || '', expected: info.expected || '', tags: tags });
      if (state.mistakes.length > MISTAKE_CAP) state.mistakes.splice(0, state.mistakes.length - MISTAKE_CAP);
    }
  }

  function finishLesson(lesson, score, wrongWords) {
    var l = state.lessons[lesson.id] || (state.lessons[lesson.id] = { done: false, best: 0, runs: 0 });
    l.done = true;
    l.best = Math.max(l.best || 0, score);
    l.last = Date.now();
    l.runs++;
    var created = addCardsForLesson(lesson, wrongWords);
    state.run = null;
    save();
    return created;
  }

  function finishTest(unitId, score) {
    var u = state.units[unitId] || (state.units[unitId] = { testBest: 0, testPassed: false });
    u.testBest = Math.max(u.testBest || 0, score);
    u.last = Date.now();
    if (score >= DE.planner.PASS) u.testPassed = true;
    state.run = null;
    save();
  }

  // ---- Yedekleme ------------------------------------------------------------------------

  function exportJson() {
    state.settings.lastExport = Date.now();
    save();
    return JSON.stringify({ app: 'almanca-ogrenme', v: 1, exportedAt: new Date().toISOString(), state: state }, null, 1);
  }

  function importJson(text) {
    var obj = JSON.parse(text);
    if (!obj || obj.app !== 'almanca-ogrenme' || !obj.state || !obj.state.cards) throw new Error('Bu dosya bu uygulamanın yedeği değil.');
    state = migrate(obj.state);
    save();
  }

  function reset() { state = fresh(); save(); }

  DE.store = {
    load: load, save: save, onChange: onChange, get state() { return state; },
    tick: tick, pauseTick: pauseTick, day: day, todayMinutes: todayMinutes, setTodayMinutes: setTodayMinutes, isActiveDay: isActiveDay,
    cardId: cardId, addCardsForLesson: addCardsForLesson, gradeCard: gradeCard, dueQueue: dueQueue, dueCount: dueCount,
    recordAttempt: recordAttempt, finishLesson: finishLesson, finishTest: finishTest,
    exportJson: exportJson, importJson: importJson, reset: reset, _fresh: fresh,
    _setState: function (s) { state = migrate(s); }
  };
})(typeof window !== 'undefined' ? (window.DE = window.DE || {}) : (globalThis.DE = globalThis.DE || {}));
