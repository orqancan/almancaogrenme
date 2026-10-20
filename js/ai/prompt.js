// "Yapay zekâya sor": belirli bir servise bağlı olmadan, hazır istemi panoya kopyalar ve
// kullanıcının seçtiği sohbet sitesini açar. Servis listesi Ayarlar'dan düzenlenir.
// URL'de {q} varsa ve istem kısaysa doğrudan doldurulur; değilse kullanıcı yapıştırır.
(function (DE) {
  'use strict';

  var MAX_URL_Q = 1800;

  function levelOf(lesson) {
    var u = lesson && DE.content.unitById[lesson.unitId];
    return u ? u.level + ' (Ünite ' + u.order + ': ' + u.title + ')' : 'A1';
  }

  function writePrompt(o) {
    return [
      'Ben Almanca öğrenen bir Türk\'üm (İngilizce de biliyorum). Seviyem: ' + o.level + '.',
      'Görev: "' + o.task + '"',
      'Metnim:',
      '<<<',
      o.text,
      '>>>',
      'Lütfen:',
      '1) Hataları tek tek göster ve her birini Türkçe kısaca açıkla (hangi kural?).',
      '2) Düzeltilmiş tam metni ver.',
      '3) Aynı seviyede daha doğal bir alternatif öner.',
      'Benim seviyemin üstündeki gramer yapılarını kullanma. Cevabın kısa olsun.'
    ].join('\n');
  }

  function rolePrompt(o) {
    return [
      'Benimle Almanca bir rol yapma pratiği yap. Seviyem: ' + o.level + '. Ana dilim Türkçe.',
      'Senaryo: ' + o.scenario,
      'Kurallar: Sadece bu seviyedeki basit Almanca cümleler kur. Her seferinde tek bir kısa replik söyle ve benim cevabımı bekle.',
      'Ben hata yaparsam, cevabının sonunda parantez içinde Türkçe kısa bir düzeltme ekle.',
      'Ben "Ende" yazınca bitir ve en sık yaptığım 3 hatayı Türkçe özetle.',
      'İlk repliği sen söyle.'
    ].join('\n');
  }

  function explainPrompt(o) {
    return [
      'Almanca öğreniyorum (seviye ' + o.level + ', ana dilim Türkçe). Bir alıştırmada hata yaptım, nedenini anlamadım.',
      'Soru: ' + o.q,
      'Benim cevabım: ' + o.given,
      'Doğru cevap: ' + o.expected,
      'Neden böyle olduğunu Türkçe, kısaca ve 2–3 örnek cümleyle açıklar mısın?'
    ].join('\n');
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* yok say */ }
    ta.remove();
  }

  function urlFor(service, prompt) {
    var q = encodeURIComponent(prompt);
    if (service.url.indexOf('{q}') >= 0) {
      return q.length <= MAX_URL_Q ? service.url.replace('{q}', q) : service.url.replace(/[?&][^?&]*\{q\}.*/, '');
    }
    return service.url;
  }

  /** İstem + servis butonları olan küçük panel. */
  function panel(prompt, label) {
    var h = DE.util.h;
    var services = DE.store.state.settings.ai || [];
    var status = h('div.muted.small');
    var box = h('div.ai-panel',
      h('div.ai-title', '🤖 ' + (label || 'Yapay zekâya sor')),
      h('p.small.muted', 'İstem panoya kopyalanır ve seçtiğin site açılır. Açılan sayfada kutu boşsa Ctrl+V ile yapıştır.'),
      h('div.row.wrap', services.map(function (s) {
        return h('button.btn', {
          type: 'button',
          onclick: function () {
            copy(prompt).then(function () { status.textContent = '✓ İstem kopyalandı. ' + s.name + ' açılıyor…'; });
            window.open(urlFor(s, prompt), '_blank', 'noopener');
          }
        }, s.name);
      }), h('button.btn.ghost', { type: 'button', onclick: function () { copy(prompt).then(function () { status.textContent = '✓ İstem kopyalandı.'; }); } }, '📋 Sadece kopyala')),
      status,
      h('details', h('summary.small', 'İstemi göster'), h('pre.prompt', prompt))
    );
    return box;
  }

  DE.ai = { levelOf: levelOf, writePrompt: writePrompt, rolePrompt: rolePrompt, explainPrompt: explainPrompt, panel: panel, copy: copy, urlFor: urlFor };
})(window.DE = window.DE || {});
