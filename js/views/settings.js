// Ayarlar: ses, görünüm, hedefler, yapay zekâ servisleri, yedekleme.
(function (DE) {
  'use strict';

  var h = DE.util.h;

  function settings(root) {
    var S = DE.store.state;
    var st = S.settings;
    function set(k, v) { st[k] = v; DE.store.save(); }

    root.appendChild(h('h1', 'Ayarlar'));

    // Yedekleme
    var importInput = h('input', { type: 'file', accept: 'application/json,.json', hidden: true, onchange: function () {
      var f = importInput.files[0];
      if (!f) return;
      f.text().then(function (txt) {
        if (!confirm('Mevcut ilerlemenin yerine bu yedek yüklenecek. Emin misin?')) return;
        try { DE.store.importJson(txt); alert('Yedek yüklendi.'); location.hash = '#/today'; DE.app.route(); }
        catch (e) { alert('Yüklenemedi: ' + e.message); }
      });
    } });
    root.appendChild(h('div.card',
      h('h3', '💾 Yedek'),
      h('p.small', 'İlerlemen bu tarayıcının deposunda duruyor. Tarayıcı geçmişini/verilerini temizlersen ya da başka tarayıcı kullanırsan görünmez. Haftada bir yedek indir ve bu klasörde sakla.'),
      h('p.tiny.muted', st.lastExport ? 'Son yedek: ' + new Date(st.lastExport).toLocaleString('tr-TR') : 'Henüz yedek alınmadı.'),
      h('div.row.wrap',
        h('button.btn.primary', { type: 'button', onclick: function () {
          var blob = new Blob([DE.store.exportJson()], { type: 'application/json' });
          var a = h('a', { href: URL.createObjectURL(blob), download: 'almanca-ilerleme-' + DE.util.dayKey() + '.json' });
          document.body.appendChild(a); a.click(); a.remove();
          DE.app.route();
        } }, 'Yedeği indir'),
        h('button.btn', { type: 'button', onclick: function () { importInput.click(); } }, 'Yedekten yükle'),
        importInput)));

    // Ses
    var voices = DE.audio.germanVoices();
    var cur = DE.audio.pickVoice();
    root.appendChild(h('div.card',
      h('h3', '🔊 Ses'),
      voices.length ? h('label.field', 'Almanca ses',
        h('select', { onchange: function (e) { set('voice', e.target.value); DE.audio.speak('Hallo! Ich heiße Anna. Wie heißt du?'); } },
          h('option', { value: '' }, 'Otomatik (en iyisi)'),
          voices.map(function (v) { return h('option', { value: v.name, selected: st.voice === v.name }, v.name + (v.localService ? '' : ' (çevrimiçi)')); })))
        : h('p.small.warn', 'Bu tarayıcıda Almanca ses bulunamadı. Chrome veya Edge önerilir; Windows\'ta Ayarlar › Saat ve dil › Konuşma bölümünden Almanca ses paketi eklenebilir.'),
      cur ? h('p.tiny.muted', 'Şu an kullanılan: ' + cur.name) : null,
      h('label.field', 'Konuşma hızı: ', h('b', String(st.rate)),
        h('input', { type: 'range', min: 0.6, max: 1.2, step: 0.05, value: st.rate, oninput: function (e) { set('rate', parseFloat(e.target.value)); e.target.previousSibling.textContent = e.target.value; } })),
      h('button.btn.ghost', { type: 'button', onclick: function () { DE.audio.speak('Guten Tag! Ich komme aus der Türkei und wohne jetzt in Deutschland.'); } }, '▶ Dene'),
      h('label.check', h('input', { type: 'checkbox', checked: st.stt, onchange: function (e) { set('stt', e.target.checked); } }),
        ' Konuşma tanımayı aç ', DE.audio.sttAvailable() ? '' : h('span.warn', '(bu tarayıcıda yok)')),
      h('p.tiny.muted', 'Konuşma tanıma Chrome/Edge\'de çalışır ve sesin tanıma için Google/Microsoft sunucusuna gider. Kapalıyken de kayıt-dinle-karşılaştır her zaman çalışır.')));

    // Öğrenme
    root.appendChild(h('div.card',
      h('h3', '🎯 Öğrenme'),
      h('label.field', 'Varsayılan günlük süre',
        h('select', { onchange: function (e) { set('minutes', parseInt(e.target.value, 10)); } },
          [15, 30, 45, 60].map(function (m) { return h('option', { value: m, selected: st.minutes === m }, m + ' dk'); }))),
      h('label.field', 'Haftalık gün hedefi',
        h('select', { onchange: function (e) { set('weeklyGoal', parseInt(e.target.value, 10)); } },
          [3, 4, 5, 6, 7].map(function (m) { return h('option', { value: m, selected: st.weeklyGoal === m }, m + ' gün'); }))),
      h('label.check', h('input', { type: 'checkbox', checked: st.showEn, onchange: function (e) { set('showEn', e.target.checked); } }), ' İngilizce karşılıkları ve sahte arkadaş uyarılarını göster')));

    // Yapay zekâ servisleri
    var aiList = h('div');
    function drawAi() {
      aiList.innerHTML = '';
      st.ai.forEach(function (s, i) {
        aiList.appendChild(h('div.row.ai-row',
          h('input', { value: s.name, placeholder: 'Ad', onchange: function (e) { st.ai[i].name = e.target.value; DE.store.save(); } }),
          h('input.grow', { value: s.url, placeholder: 'https://…{q}', onchange: function (e) { st.ai[i].url = e.target.value; DE.store.save(); } }),
          h('button.btn-icon', { type: 'button', title: 'Sil', onclick: function () { st.ai.splice(i, 1); DE.store.save(); drawAi(); } }, '🗑')));
      });
    }
    drawAi();
    root.appendChild(h('div.card',
      h('h3', '🤖 Yapay zekâ servisleri'),
      h('p.small', '"Yapay zekâya sor" butonları bu listeyi kullanır. Hesap veya API anahtarı gerekmez: istem panoya kopyalanır ve site açılır. Adreste {q} varsa kısa istemler otomatik doldurulur.'),
      aiList,
      h('button.btn.ghost', { type: 'button', onclick: function () { st.ai.push({ name: 'Yeni', url: 'https://' }); DE.store.save(); drawAi(); } }, '+ Servis ekle')));

    // Sıfırla
    root.appendChild(h('div.card',
      h('h3', '⚠️ Sıfırla'),
      h('p.small', 'Tüm ilerlemeyi siler. Önce yedek indir.'),
      h('button.btn.danger', { type: 'button', onclick: function () {
        var t = prompt('Tüm ilerleme silinecek. Onaylamak için SIL yaz:');
        if (t && t.trim().toUpperCase() === 'SIL') { DE.store.reset(); location.hash = '#/today'; DE.app.route(); }
      } }, 'Her şeyi sil')));

    var errs = DE.content.errors;
    if (errs.length) root.appendChild(h('div.card.warn', h('h3', 'İçerik hataları (' + errs.length + ')'), h('pre.small', errs.join('\n'))));
    root.appendChild(h('p.tiny.muted', 'Almanca Öğrenme · yerel sürüm · içerik: ' + DE.content.units.length + ' ünite, ' + Object.keys(DE.content.words).length + ' kelime'));
  }

  DE.views = DE.views || {};
  DE.views.settings = settings;
})(window.DE = window.DE || {});
