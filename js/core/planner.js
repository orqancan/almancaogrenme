// Müfredat ilerlemesi ve "Bugün" planı; ders/test adımlarının üretimi.
(function (DE) {
  'use strict';

  var PASS = 0.8;              // ünite testi geçme eşiği
  var TEST_SIZE = 15;
  var CARDS_PER_MIN = 5;       // tekrar hızı tahmini
  var NEW_LESSON_MIN = { 15: 0, 30: 1, 45: 1, 60: 2 };

  function S() { return DE.store.state; }
  function C() { return DE.content; }

  function lessonDone(id) { var l = S().lessons[id]; return !!(l && l.done); }
  function unitLessonsDone(u) { return u.lessons.every(function (l) { return lessonDone(l.id); }); }
  function unitPassed(u) { var x = S().units[u.id]; return !!(x && x.testPassed); }

  /** 'done' | 'available' | 'locked' (yumuşak kilit: açılabilir ama önerilmez). */
  function lessonStatus(lesson) {
    if (lessonDone(lesson.id)) return 'done';
    var all = C().allLessons();
    var i = all.indexOf(lesson);
    if (i <= 0) return 'available';
    return lessonDone(all[i - 1].id) ? 'available' : 'locked';
  }

  function nextLesson() {
    var all = C().allLessons();
    for (var i = 0; i < all.length; i++) if (!lessonDone(all[i].id)) return all[i];
    return null;
  }

  /** Dersleri bitmiş ama testi geçilmemiş ilk ünite. */
  function pendingTest() {
    var us = C().units;
    for (var i = 0; i < us.length; i++) {
      if (unitLessonsDone(us[i]) && !unitPassed(us[i])) return us[i];
    }
    return null;
  }

  /**
   * Bugünün planı. Sıra: yarım kalan oturum → tekrar → ünite testi → yeni ders.
   * Tekrar borcu bütçenin çok üstündeyse yeni ders önerilmez.
   */
  function today(now) {
    var minutes = DE.store.todayMinutes();
    var due = DE.store.dueCount(now);
    var reviewBudget = Math.max(10, Math.round(minutes * (minutes <= 15 ? 0.8 : 0.35) * CARDS_PER_MIN));
    var steps = [];
    var run = S().run;
    if (run) steps.push({ kind: 'resume', run: run });
    if (due > 0) steps.push({ kind: 'review', count: Math.min(due, reviewBudget), total: due });
    var test = pendingTest();
    if (test && minutes >= 30) steps.push({ kind: 'test', unit: test });
    var next = nextLesson();
    var doneToday = lessonsDoneToday(now);
    var allowed = NEW_LESSON_MIN[minutes] == null ? 1 : NEW_LESSON_MIN[minutes];
    var debtTooHigh = due > reviewBudget * 2;
    if (next && !test && doneToday < allowed && !debtTooHigh) steps.push({ kind: 'lesson', lesson: next });
    return {
      minutes: minutes, due: due, reviewBudget: reviewBudget, steps: steps, next: next,
      blockedByDebt: !!(next && debtTooHigh && !test), lessonsDoneToday: doneToday, allowedLessons: allowed
    };
  }

  function lessonsDoneToday(now) {
    var start = DE.util.startOfDay(now);
    var n = 0;
    Object.keys(S().lessons).forEach(function (k) { if ((S().lessons[k].last || 0) >= start) n++; });
    return n;
  }

  // ---- Otomatik alıştırmalar -------------------------------------------------------------

  /** id → alıştırma nesnesi (otomatik üretilenler dahil). */
  function exerciseById(id) {
    if (id.indexOf('auto:art:') === 0) {
      return { id: id, type: 'article', word: id.slice(9), tags: ['article'] };
    }
    if (id.indexOf('auto:match:') === 0) {
      var ids = id.slice(11).split(',');
      return {
        id: id, type: 'match', tags: ['vocab'],
        pairs: ids.map(function (w) { var x = C().words[w]; return x ? [(x.art ? x.art + ' ' : '') + x.de, x.tr] : null; }).filter(Boolean)
      };
    }
    var lessonId = id.replace(/\.e\d+$/, '');
    var l = C().lessonById[lessonId];
    if (!l) return null;
    for (var i = 0; i < l.exercises.length; i++) if (l.exercises[i].id === id) return l.exercises[i];
    return null;
  }

  /** Ders adımları: giriş/diyalog → kelimeler → gramer → alıştırmalar → kültür → özet. */
  function lessonSteps(lesson) {
    var steps = [];
    if (lesson.intro || lesson.dialog) steps.push({ k: 'intro' });
    (lesson.words || []).forEach(function (w) { steps.push({ k: 'word', id: w.id }); });
    (lesson.grammar || []).forEach(function (g, i) { steps.push({ k: 'grammar', i: i }); });

    var words = lesson.words || [];
    // Eşleştirme: anlamı karıştırılmayacak kelimelerle 4–6'lık gruplar.
    var forMatch = words.filter(function (w) { return w.pos !== 'num'; });
    for (var i = 0; i + 3 <= forMatch.length; i += 6) {
      var group = forMatch.slice(i, i + 6);
      if (group.length >= 3) steps.push({ k: 'ex', id: 'auto:match:' + group.map(function (w) { return w.id; }).join(',') });
    }
    var authoredArt = {};
    lesson.exercises.forEach(function (e) { if (e.type === 'article') authoredArt[e.word] = true; });
    words.forEach(function (w) { if (w.pos === 'n' && w.artQuiz !== false && !authoredArt[w.id]) steps.push({ k: 'ex', id: 'auto:art:' + w.id }); });
    lesson.exercises.forEach(function (e) { steps.push({ k: 'ex', id: e.id }); });

    if (lesson.culture) steps.push({ k: 'culture' });
    return steps;
  }

  /** Ünite testi: ünitenin otomatik puanlanan alıştırmalarından rastgele örneklem. */
  function testSteps(unit, rnd) {
    var pool = [];
    unit.lessons.forEach(function (l) {
      l.exercises.forEach(function (e) {
        if (['speak', 'write', 'match'].indexOf(e.type) < 0) pool.push(e.id);
      });
      (l.words || []).forEach(function (w) { if (w.pos === 'n' && w.artQuiz !== false) pool.push('auto:art:' + w.id); });
    });
    // Ders başına dengeli dağılım için önce karıştır, sonra kes.
    return DE.util.sample(pool, Math.min(TEST_SIZE, pool.length), rnd).map(function (id) { return { k: 'ex', id: id }; });
  }

  DE.planner = {
    PASS: PASS, lessonStatus: lessonStatus, lessonDone: lessonDone, unitLessonsDone: unitLessonsDone, unitPassed: unitPassed,
    nextLesson: nextLesson, pendingTest: pendingTest, today: today, exerciseById: exerciseById,
    lessonSteps: lessonSteps, testSteps: testSteps
  };
})(typeof window !== 'undefined' ? (window.DE = window.DE || {}) : (globalThis.DE = globalThis.DE || {}));
