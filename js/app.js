// Uygulama başlangıcı ve hash yönlendirici: #/today, #/path, #/lesson/<id>, #/test/<unit>, #/review, #/words, #/grammar, #/mistakes, #/settings
(function (DE) {
  'use strict';

  var h = DE.util.h;
  var NAV = [
    ['today', '🏠', 'Bugün'], ['path', '🗺', 'Kurs'], ['review', '🗂', 'Tekrar'],
    ['words', '📒', 'Kelimeler'], ['grammar', '📘', 'Gramer'], ['mistakes', '🩹', 'Hatalar'], ['settings', '⚙️', 'Ayarlar']
  ];
  var FULLSCREEN = { lesson: 1, test: 1, review: 1 };
  var current = null;

  function parse() {
    var m = (location.hash || '').replace(/^#\/?/, '').split('/');
    return { name: m[0] || 'today', arg: m.slice(1).join('/') || null };
  }

  function route() {
    var r = parse();
    var view = DE.views[r.name];
    if (!view) { location.hash = '#/today'; return; }
    DE.audio.stop();
    DE.store.pauseTick();
    current = r.name;
    var main = document.getElementById('main');
    main.innerHTML = '';
    document.body.classList.toggle('focus', !!FULLSCREEN[r.name]);
    document.querySelectorAll('nav.tabs a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-v') === r.name); });
    if (r.name === 'review') {
      var due = DE.store.dueCount();
      var badge = document.querySelector('nav.tabs a[data-v=review] .badge');
      if (badge) badge.textContent = due ? String(due) : '';
    }
    view(main, r.arg);
    updateBadge();
  }

  function updateBadge() {
    var badge = document.querySelector('nav.tabs a[data-v=review] .badge');
    if (!badge) return;
    var due = DE.store.dueCount();
    badge.textContent = due ? String(due) : '';
  }

  function nav() {
    return h('nav.tabs', NAV.map(function (n) {
      return h('a', { href: '#/' + n[0], 'data-v': n[0] }, h('span.ni', n[1]), h('span.nl', n[2]), n[0] === 'review' ? h('span.badge') : null);
    }));
  }

  function boot() {
    DE.store.load();
    document.body.appendChild(nav());
    document.body.appendChild(h('main', { id: 'main' }));
    window.addEventListener('hashchange', route);
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var v = DE.views[current];
      if (v && v.onKey) v.onKey(e);
    });
    if (DE.content.errors.length) console.warn('İçerik hataları var; Ayarlar ekranının altında listelenir.');
    route();
  }

  DE.app = { route: route, boot: boot };
  document.addEventListener('DOMContentLoaded', boot);
})(window.DE = window.DE || {});
