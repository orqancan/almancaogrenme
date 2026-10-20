// Ortak yardımcılar: DOM oluşturma, tarih, rastgelelik.
(function (DE) {
  'use strict';

  var DAY = 24 * 60 * 60 * 1000;

  /**
   * Küçük DOM yardımcısı: h('div.card', {onclick: f}, 'metin', h('b', null, 'x'))
   * Nitelikler: class, html (innerHTML), on* (olay), style, diğerleri setAttribute.
   */
  function h(tag, attrs) {
    var parts = tag.split('.');
    var el = document.createElement(parts[0] || 'div');
    if (parts.length > 1) el.className = parts.slice(1).join(' ');
    var start = 2;
    // İkinci argüman nitelik nesnesi değilse (metin, dizi, eleman) çocuk sayılır.
    if (attrs != null && (typeof attrs !== 'object' || Array.isArray(attrs) || attrs.nodeType)) { start = 1; attrs = null; }
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') el.className += (el.className ? ' ' : '') + v;
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
        else if (k in el && k !== 'list' && k !== 'type') el[k] = v;
        else el.setAttribute(k, v === true ? '' : v);
      });
    }
    for (var i = start; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }

  function append(el, child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) return child.forEach(function (c) { append(el, c); });
    el.appendChild(typeof child === 'object' ? child : document.createTextNode(String(child)));
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /** Yerel saatle YYYY-MM-DD. */
  function dayKey(ts) {
    var d = new Date(ts == null ? Date.now() : ts);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function startOfDay(ts) {
    var d = new Date(ts == null ? Date.now() : ts);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  /** Pazartesi başlangıçlı haftanın günleri (YYYY-MM-DD). */
  function weekDays(ts) {
    var d = new Date(startOfDay(ts));
    var shift = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - shift);
    var out = [];
    for (var i = 0; i < 7; i++) { out.push(dayKey(d.getTime())); d.setDate(d.getDate() + 1); }
    return out;
  }

  function shuffle(arr, rnd) {
    var a = arr.slice();
    rnd = rnd || Math.random;
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function sample(arr, n, rnd) { return shuffle(arr, rnd).slice(0, n); }

  /** "3 gün", "2 sa", "10 dk" */
  function fmtInterval(ms) {
    var m = ms / 60000;
    if (m < 60) return Math.max(1, Math.round(m)) + ' dk';
    if (m < 60 * 24) return Math.round(m / 60) + ' sa';
    var d = m / 60 / 24;
    if (d < 31) return Math.round(d) + ' gün';
    if (d < 365) return Math.round(d / 30) + ' ay';
    return (d / 365).toFixed(1) + ' yıl';
  }

  DE.util = { DAY: DAY, h: h, esc: esc, dayKey: dayKey, startOfDay: startOfDay, weekDays: weekDays, shuffle: shuffle, sample: sample, fmtInterval: fmtInterval };
})(typeof window !== 'undefined' ? (window.DE = window.DE || {}) : (globalThis.DE = globalThis.DE || {}));
