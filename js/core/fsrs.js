// FSRS-5 aralıklı tekrar algoritması (minimal implementasyon, varsayılan parametreler).
// Kart durumu: { s: stability (gün), d: difficulty (1–10), reps, lapses, last (ms), due (ms) }
// Derece (grade): 1 = Tekrar (Again), 2 = Zor (Hard), 3 = İyi (Good), 4 = Kolay (Easy)
(function (DE) {
  'use strict';

  var W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192,
    1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
  var DECAY = -0.5;
  var FACTOR = Math.pow(0.9, 1 / DECAY) - 1; // 19/81
  var DAY = 86400000;
  var RELEARN_MS = 10 * 60 * 1000;

  var cfg = { retention: 0.9, maxIvl: 365, fuzz: true };

  function clampD(d) { return Math.min(10, Math.max(1, d)); }
  function retrievability(elapsedDays, s) { return Math.pow(1 + FACTOR * elapsedDays / s, DECAY); }
  function initS(g) { return Math.max(W[g - 1], 0.1); }
  function initD(g) { return clampD(W[4] - Math.exp(W[5] * (g - 1)) + 1); }
  function nextD(d, g) {
    var dp = d - W[6] * (g - 3) * (10 - d) / 9;
    return clampD(W[7] * initD(4) + (1 - W[7]) * dp);
  }
  function recallS(d, s, r, g) {
    var hard = g === 2 ? W[15] : 1, easy = g === 4 ? W[16] : 1;
    return s * (1 + Math.exp(W[8]) * (11 - d) * Math.pow(s, -W[9]) * (Math.exp((1 - r) * W[10]) - 1) * hard * easy);
  }
  function forgetS(d, s, r) {
    var sf = W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp((1 - r) * W[14]);
    return Math.min(sf, s / Math.exp(W[17] * W[18]));
  }
  function shortS(s, g) { return s * Math.exp(W[17] * (g - 3 + W[18])); }

  /** Hedef hatırlama oranı için gün cinsinden aralık. */
  function intervalDays(s) {
    var ivl = s / FACTOR * (Math.pow(cfg.retention, 1 / DECAY) - 1);
    return Math.min(cfg.maxIvl, Math.max(1, Math.round(ivl)));
  }

  function fuzz(ivl, rnd) {
    if (!cfg.fuzz || ivl < 3) return ivl;
    var r = (rnd || Math.random)();
    return Math.max(1, Math.round(ivl * (0.95 + 0.1 * r)));
  }

  /**
   * Kartı derecelendirir, yeni durumu döndürür (girdiyi değiştirmez).
   * @param {object} card
   * @param {number} g 1–4
   * @param {number} now ms
   */
  function review(card, g, now, rnd) {
    var c = Object.assign({}, card);
    var s, d;
    if (!c.reps) {
      s = initS(g); d = initD(g);
    } else {
      var elapsed = Math.max(0, (now - c.last) / DAY);
      if (elapsed < 1) { s = shortS(c.s, g); }
      else {
        var r = retrievability(elapsed, c.s);
        s = g === 1 ? forgetS(c.d, c.s, r) : recallS(c.d, c.s, r, g);
      }
      d = nextD(c.d, g);
    }
    c.s = Math.max(0.1, s);
    c.d = d;
    c.reps = (c.reps || 0) + 1;
    if (g === 1 && card.reps) c.lapses = (c.lapses || 0) + 1;
    c.last = now;
    c.due = g === 1 ? now + RELEARN_MS : now + fuzz(intervalDays(c.s), rnd) * DAY;
    return c;
  }

  /** Her derece için bir sonraki aralığın önizlemesi (ms). */
  function preview(card, now) {
    return [1, 2, 3, 4].map(function (g) { return review(card, g, now, function () { return 0.5; }).due - now; });
  }

  /** Kartın şu anki hatırlanma olasılığı. */
  function recall(card, now) {
    if (!card.reps) return 0;
    return retrievability(Math.max(0, (now - card.last) / DAY), card.s);
  }

  DE.fsrs = { cfg: cfg, review: review, preview: preview, recall: recall, intervalDays: intervalDays, W: W };
})(typeof window !== 'undefined' ? (window.DE = window.DE || {}) : (globalThis.DE = globalThis.DE || {}));
