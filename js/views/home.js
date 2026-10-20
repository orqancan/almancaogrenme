// "Bugün" ve "Kurs" ekranları.
(function (DE) {
  'use strict';

  var h = DE.util.h;
  var DAY_NAMES = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  function weekStrip() {
    var S = DE.store.state;
    var days = DE.util.weekDays();
    var today = DE.util.dayKey();
    var active = days.filter(function (d) { return DE.store.isActiveDay(d); }).length;
    return h('div.week',
      h('div.week-days', days.map(function (d, i) {
        var on = DE.store.isActiveDay(d);
        return h('div.wd' + (on ? '.on' : '') + (d === today ? '.today' : ''), h('div.dot', on ? '✓' : ''), h('div.tiny', DAY_NAMES[i]));
      })),
      h('div.small.muted', 'Bu hafta ' + active + '/' + S.settings.weeklyGoal + ' gün' + (active >= S.settings.weeklyGoal ? ' — haftalık hedef tamam 🎉' : '')));
  }

  function minutesPicker() {
    var cur = DE.store.todayMinutes();
    return h('div.minutes',
      h('div.small', 'Bugün ne kadar vaktin var?'),
      h('div.row.wrap', [15, 30, 45, 60].map(function (m) {
        return h('button.chip' + (m === cur ? '.active' : ''), { type: 'button', onclick: function () { DE.store.setTodayMinutes(m); DE.app.route(); } }, m === 60 ? '60+ dk' : m + ' dk');
      })),
      cur === 15 ? h('div.tiny.muted', 'Kısa gün: sadece tekrar. Seri bozulmaz, 5 dakika bile sayılır.') : null);
  }

  function backupBanner() {
    var S = DE.store.state;
    var hasProgress = Object.keys(S.cards).length > 0;
    var last = S.settings.lastExport || 0;
    if (!hasProgress || Date.now() - last < 7 * DE.util.DAY) return null;
    return h('div.banner',
      '💾 ', last ? 'Son yedeğin ' + Math.floor((Date.now() - last) / DE.util.DAY) + ' gün önce.' : 'Henüz hiç yedek almadın.',
      ' İlerlemen sadece bu tarayıcıda duruyor; tarayıcı verisi silinirse kaybolur. ',
      h('a', { href: '#/settings' }, 'Yedeği indir'));
  }

  function today(root) {
    var S = DE.store.state;
    var plan = DE.planner.today();
    var d = DE.store.day();
    root.appendChild(h('div.today',
      h('h1', greeting()),
      backupBanner(),
      weekStrip(),
      minutesPicker(),
      h('div.small.muted', 'Bugün çalıştığın süre: ' + Math.round(d.sec / 60) + ' dk')));

    var list = h('div.plan');
    var primary = null;
    plan.steps.forEach(function (s) {
      var item;
      if (s.kind === 'resume') {
        item = planItem('⏯', 'Yarım kalan: ' + DE.views.runTitle(s.run), 'Adım ' + (s.run.pos + 1) + '/' + s.run.steps.length,
          s.run.type === 'test' ? '#/test/' + s.run.id : '#/lesson/' + s.run.id, 'Devam et');
      } else if (s.kind === 'review') {
        item = planItem('🗂', 'Tekrar: ' + s.count + ' kart', '≈ ' + Math.max(1, Math.round(s.count / 5)) + ' dk' + (s.total > s.count ? ' · toplam bekleyen ' + s.total : ''), '#/review', 'Başla');
      } else if (s.kind === 'test') {
        item = planItem('📝', 'Ünite testi: ' + s.unit.title, 'Geçme sınırı %' + Math.round(DE.planner.PASS * 100) + ' · ' + 15 + ' soru', '#/test/' + s.unit.id, 'Başla');
      } else if (s.kind === 'lesson') {
        var u = DE.content.unitById[s.lesson.unitId];
        item = planItem('📗', 'Yeni ders: ' + s.lesson.title, 'Ünite ' + u.order + ' · ' + u.title + ' · ders ' + (s.lesson.index + 1) + '/' + u.lessons.length, '#/lesson/' + s.lesson.id, 'Başla');
      }
      if (!primary) primary = item.href;
      list.appendChild(item.el);
    });

    if (!plan.steps.length) {
      var extra = plan.next ? h('a.btn', { href: '#/lesson/' + plan.next.id }, 'Bir ders daha: ' + plan.next.title) : null;
      list.appendChild(h('div.card.done-card', h('h2', '✓ Bugünlük plan tamam'),
        h('p', plan.due === 0 ? 'Tekrar borcun yok. ' : '', plan.lessonsDoneToday ? 'Bugün ' + plan.lessonsDoneToday + ' ders bitirdin. ' : '', 'Yarın tekrarların hazır olacak.'),
        h('p.small.muted', 'Enerjin varsa: Kelimeler ekranında sesli tekrar, ya da aşağıdaki dış kaynaklardan biri.'),
        extra));
    }
    if (plan.blockedByDebt) {
      list.appendChild(h('div.note', '⏸ Bekleyen tekrar sayısı yüksek (' + plan.due + '). Yeni ders yerine önce tekrarları azaltmak daha verimli. Yine de istersen ',
        h('a', { href: '#/lesson/' + plan.next.id }, 'yeni derse başla'), '.'));
    }

    if (primary) root.appendChild(h('a.btn.primary.big.wide.cta', { href: primary }, 'Devam ▶'));
    root.appendChild(list);
    root.appendChild(externalTips(plan));
  }

  function planItem(icon, title, sub, href, cta) {
    var el = h('a.plan-item', { href: href }, h('div.pi-icon', icon), h('div.pi-body', h('div.pi-title', title), h('div.tiny.muted', sub)), h('div.pi-cta', cta + ' →'));
    return { el: el, href: href };
  }

  function greeting() {
    var hr = new Date().getHours();
    return hr < 11 ? 'Guten Morgen! ☀️' : hr < 18 ? 'Guten Tag! 👋' : 'Guten Abend! 🌙';
  }

  // Sistem dışı kaynak önerileri (bağlantı; içerik kopyalanmaz).
  function externalTips(plan) {
    var u = plan.next ? DE.content.unitById[plan.next.unitId] : null;
    var tips = [
      { t: 'DW "Nicos Weg" (A1) — ücretsiz video kurs; hikâyeyle dinleme', url: 'https://learngerman.dw.com/de/nicos-weg/c-36519789' },
      { t: 'Easy German — sokak röportajları (Almanca altyazıyla)', url: 'https://www.youtube.com/@EasyGerman' },
      { t: 'DW "Deutsch – warum nicht?" — başlangıç dinleme dizisi', url: 'https://learngerman.dw.com/' }
    ];
    if (u && u.order >= 8) tips.push({ t: 'DW "Langsam gesprochene Nachrichten" — yavaş haberler (A2 sonrası)', url: 'https://learngerman.dw.com/de/langsam-gesprochene-nachrichten/s-60040332' });
    return h('details.card.ext', h('summary', '🌍 Sistem dışı pratik önerileri'),
      h('ul', tips.map(function (x) { return h('li', h('a', { href: x.url, target: '_blank', rel: 'noopener' }, x.t)); })),
      h('p.tiny.muted', 'Haftada 1–2 kez, Pazar "hafif gün" için ideal. Anlamadığın yerler normal: amaç kulağı alıştırmak.'));
  }

  // ---- Kurs haritası ------------------------------------------------------------------

  function path(root) {
    var S = DE.store.state;
    root.appendChild(h('h1', 'Kurs'));
    var next = DE.planner.nextLesson();
    DE.content.units.forEach(function (u) {
      var done = u.lessons.filter(function (l) { return DE.planner.lessonDone(l.id); }).length;
      var passed = DE.planner.unitPassed(u);
      var open = next && next.unitId === u.id;
      var box = h('details.card.unit' + (passed ? '.passed' : ''), { open: open },
        h('summary',
          h('div.unit-title', h('span.unit-no', u.order === 0 ? '0' : String(u.order)), ' ', u.title, h('span.muted.small', ' — ' + u.titleTr)),
          h('div.tiny.muted', u.level + ' · ' + done + '/' + u.lessons.length + ' ders' + (passed ? ' · test ✓ ' + Math.round(S.units[u.id].testBest * 100) + '%' : ''))));
      box.appendChild(h('ul.goals', u.goals.map(function (g) { return h('li', g); })));
      var ol = h('ol.lessons');
      u.lessons.forEach(function (l) {
        var st = DE.planner.lessonStatus(l);
        var rec = S.lessons[l.id];
        ol.appendChild(h('li.lesson.' + st + (next === l ? '.next' : ''),
          h('a', {
            href: '#/lesson/' + l.id,
            onclick: function (e) {
              if (st === 'locked' && !confirm('Önceki dersleri henüz bitirmedin. Sıralı gitmek daha verimli. Yine de açılsın mı?')) e.preventDefault();
            }
          }, h('span.st', st === 'done' ? '✓' : st === 'locked' ? '🔒' : '▶'), ' ', l.title,
          rec && rec.done ? h('span.tiny.muted', ' ' + Math.round(rec.best * 100) + '%') : null)));
      });
      var allDone = DE.planner.unitLessonsDone(u);
      ol.appendChild(h('li.lesson.test' + (allDone ? '' : '.locked'),
        h('a', { href: '#/test/' + u.id, onclick: function (e) { if (!allDone && !confirm('Ünitenin dersleri bitmedi. Test yine de açılsın mı?')) e.preventDefault(); } },
          h('span.st', passed ? '✓' : '📝'), ' Ünite testi')));
      box.appendChild(ol);
      root.appendChild(box);
    });
    root.appendChild(h('p.small.muted', 'Şu an Ünite 0–' + (DE.content.units.length - 1) + ' hazır. Yeni üniteler eklendikçe burada görünecek.'));
  }

  DE.views = DE.views || {};
  DE.views.today = today;
  DE.views.path = path;
})(window.DE = window.DE || {});
