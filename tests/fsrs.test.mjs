import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from './_load.mjs';

const DE = load(['js/core/util.js', 'js/core/fsrs.js']);
const DAY = 86400000;
const noFuzz = () => 0.5;

test('yeni kart: derece arttıkça aralık uzar', () => {
  const now = Date.UTC(2026, 0, 1);
  const ivls = [1, 2, 3, 4].map((g) => DE.fsrs.review({ reps: 0 }, g, now, noFuzz).due - now);
  assert.ok(ivls[0] < ivls[1] && ivls[1] < ivls[2] && ivls[2] < ivls[3]);
  assert.equal(ivls[0], 10 * 60 * 1000); // Tekrar → 10 dk
});

test('başarılı tekrarlar aralığı büyütür, unutma küçültür', () => {
  let now = Date.UTC(2026, 0, 1);
  let c = DE.fsrs.review({ reps: 0 }, 3, now, noFuzz);
  const s1 = c.s;
  now = c.due; c = DE.fsrs.review(c, 3, now, noFuzz);
  assert.ok(c.s > s1);
  const s2 = c.s;
  now = c.due; c = DE.fsrs.review(c, 1, now, noFuzz);
  assert.ok(c.s < s2);
  assert.equal(c.lapses, 1);
});

test('zorluk 1–10 arasında kalır', () => {
  let c = { reps: 0 }; let now = 0;
  for (let i = 0; i < 30; i++) { c = DE.fsrs.review(c, 1, now, noFuzz); now += DAY; }
  assert.ok(c.d <= 10 && c.d >= 1);
  for (let i = 0; i < 30; i++) { c = DE.fsrs.review(c, 4, now, noFuzz); now = c.due; }
  assert.ok(c.d >= 1);
});

test('hatırlama olasılığı vade gününde ≈ hedef (0.9)', () => {
  const now = Date.UTC(2026, 0, 1);
  const c = DE.fsrs.review({ reps: 0 }, 3, now, noFuzz);
  const r = DE.fsrs.recall(c, c.due);
  assert.ok(Math.abs(r - 0.9) < 0.03, 'r=' + r);
});

test('en uzun aralık 365 gün', () => {
  let c = { reps: 0 }; let now = 0;
  for (let i = 0; i < 20; i++) { c = DE.fsrs.review(c, 4, now, noFuzz); now = c.due; }
  assert.ok((c.due - c.last) / DAY <= 366);
});
