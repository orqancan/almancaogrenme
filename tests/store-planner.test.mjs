import test from 'node:test';
import assert from 'node:assert/strict';
import { load, CORE, contentFiles } from './_load.mjs';

function fresh() { const DE = load([...CORE, ...contentFiles()]); DE.store.load(); return DE; }
const DAY = 86400000;

test('içerik hatasız yüklenir', () => {
  const DE = fresh();
  assert.equal(DE.content.errors.length, 0, DE.content.errors.join('\n'));
  assert.equal(DE.content.validateAll().length, 0);
  assert.ok(DE.content.units.length >= 4);
});

test('ilk plan: ilk ders, tekrar yok', () => {
  const DE = fresh();
  const p = DE.planner.today();
  assert.equal(p.due, 0);
  assert.equal(p.steps[0].kind, 'lesson');
  assert.equal(p.steps[0].lesson.id, DE.content.allLessons()[0].id);
});

test('ders bitince kartlar yarın vadeli olur ve kuyrukta görünür', () => {
  const DE = fresh();
  const lesson = DE.content.allLessons()[1];
  const created = DE.store.finishLesson(lesson, 0.9, {});
  assert.ok(created > 0);
  const now = Date.now();
  assert.equal(DE.store.dueCount(now), 0);
  const tomorrow = DE.util.startOfDay(now) + DAY + 12 * 3600 * 1000;
  const q = DE.store.dueQueue(null, tomorrow);
  assert.ok(q.length > 0);
  // Kardeş gömme: aynı kelimeden tek kart
  const words = q.map((c) => c.w);
  assert.equal(new Set(words).size, words.length);
  assert.equal(DE.planner.lessonStatus(DE.content.allLessons()[2]), 'available');
});

test('artQuiz:false olan isimlere artikel kartı açılmaz', () => {
  const DE = fresh();
  const w = DE.content.words['w.deutschland'];
  assert.ok(w);
  DE.store.finishLesson(DE.content.lessonById[w.lessonId], 1, {});
  assert.ok(DE.store.state.cards['w.deutschland#de-tr']);
  assert.equal(DE.store.state.cards['w.deutschland#art'], undefined);
});

test('tanıma kartı oturunca üretim kartı açılır', () => {
  const DE = fresh();
  const lesson = DE.content.allLessons()[1];
  DE.store.finishLesson(lesson, 1, {});
  const id = Object.keys(DE.store.state.cards).find((k) => k.endsWith('#de-tr'));
  const c = DE.store.state.cards[id];
  let now = c.due;
  for (let i = 0; i < 3; i++) { DE.store.gradeCard(id, 3, now); now = DE.store.state.cards[id].due; }
  assert.ok(DE.store.state.cards[c.w + '#tr-de']);
});

test('ünite testi adımları otomatik puanlanan alıştırmalardan oluşur', () => {
  const DE = fresh();
  const u = DE.content.units[1];
  const steps = DE.planner.testSteps(u);
  assert.ok(steps.length >= 10);
  for (const s of steps) {
    const ex = DE.planner.exerciseById(s.id);
    assert.ok(ex, s.id);
    assert.ok(!['speak', 'write', 'match'].includes(ex.type));
  }
});

test('her ders adımı çözümlenebilir', () => {
  const DE = fresh();
  for (const l of DE.content.allLessons()) {
    for (const s of DE.planner.lessonSteps(l)) {
      if (s.k === 'ex') assert.ok(DE.planner.exerciseById(s.id), l.id + ' → ' + s.id);
      if (s.k === 'word') assert.ok(DE.content.words[s.id], s.id);
    }
  }
});

test('yedek dışa/içe aktarma', () => {
  const DE = fresh();
  DE.store.finishLesson(DE.content.allLessons()[0], 0.7, {});
  const json = DE.store.exportJson();
  const n = Object.keys(DE.store.state.cards).length;
  DE.store.reset();
  assert.equal(Object.keys(DE.store.state.cards).length, 0);
  DE.store.importJson(json);
  assert.equal(Object.keys(DE.store.state.cards).length, n);
  assert.throws(() => DE.store.importJson('{"x":1}'));
});

test('15 dakikalık günde yeni ders önerilmez', () => {
  const DE = fresh();
  DE.store.setTodayMinutes(15);
  assert.ok(!DE.planner.today().steps.some((s) => s.kind === 'lesson'));
});
