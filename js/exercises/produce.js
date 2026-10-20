// Serbest üretim: speak (dinle-tekrar et, kayıt, konuşma tanıma) ve write (yazma + yerel kontrol + yapay zekâya sor).
// İkisi de öz-değerlendirmelidir; ders puanına girmez.
(function (DE) {
  'use strict';

  var h = DE.util.h;
  var X = DE.exercises;

  X.register('speak', {
    render: function (ex, ctx) {
      var el = h('div.ex.ex-speak', h('div.q', ex.q || 'Dinle ve yüksek sesle tekrar et:'),
        h('div.de-line.big', { lang: 'de' }, ex.de, ' ', DE.audio.button(ex.de)),
        h('div.tr-line', ex.tr));
      setTimeout(function () { DE.audio.speak(ex.de); }, 250);

      var status = h('div.small.muted');
      var tools = h('div.row.wrap');

      // Kendi sesini kaydet → model sesle karşılaştır.
      var rec = DE.audio.recorder();
      if (rec.supported) {
        var recording = false, playback = h('div.row');
        var recBtn = h('button.btn', { type: 'button', onclick: function () {
          if (!recording) {
            rec.start().then(function () { recording = true; recBtn.textContent = '⏹ Durdur'; status.textContent = 'Kayıt yapılıyor… cümleyi söyle.'; })
              .catch(function (e) { status.textContent = 'Mikrofon açılamadı: ' + e.message; });
          } else {
            rec.stop().then(function (url) {
              recording = false; recBtn.textContent = '🎙 Tekrar kaydet'; status.textContent = 'Kendi sesini ve modeli sırayla dinle, farkı bul.';
              playback.innerHTML = '';
              playback.appendChild(h('button.btn.ghost', { type: 'button', onclick: function () { new Audio(url).play(); } }, '▶ Benim sesim'));
              playback.appendChild(h('button.btn.ghost', { type: 'button', onclick: function () { DE.audio.speak(ex.de); } }, '▶ Model'));
            });
          }
        } }, '🎙 Kaydet');
        tools.appendChild(recBtn);
        el.appendChild(playback);
      }

      // Konuşma tanıma (Chrome/Edge, ses Google/Microsoft sunucusuna gider → ayarlardan açılır).
      if (DE.audio.sttAvailable() && DE.store.state.settings.stt) {
        tools.appendChild(h('button.btn', { type: 'button', onclick: function () {
          status.textContent = '🎧 Dinliyorum… şimdi söyle.';
          DE.audio.listen().then(function (alts) {
            if (!alts.length) { status.textContent = 'Bir şey duyamadım, tekrar dene.'; return; }
            var best = alts.map(function (a) { return { a: a, s: DE.answer.overlap(a, ex.de) }; }).sort(function (x, y) { return y.s - x.s; })[0];
            var pct = Math.round(best.s * 100);
            status.innerHTML = '';
            status.appendChild(h('div', 'Anlaşılan: ', h('b', { lang: 'de' }, best.a)));
            status.appendChild(h('div', 'Anlaşılırlık: ' + pct + '% ' + (pct >= 90 ? '👍' : pct >= 60 ? '🙂 bazı kelimeler anlaşılmadı' : '— yavaş ve net tekrar dene')));
            status.appendChild(h('div.diff', DE.answer.diff(best.a, ex.de).map(function (d) { return h('span.' + d.op, d.t); })));
            status.appendChild(h('div.tiny.muted', 'Not: Bu skor telaffuzunun "anlaşılır" olup olmadığını ölçer; mükemmel telaffuzu değil.'));
          }).catch(function (e) { status.textContent = e.message; });
        } }, '🗣 Konuşma tanıma ile dene'));
      }

      el.appendChild(tools);
      el.appendChild(status);
      el.appendChild(h('div.actions',
        h('button.btn', { type: 'button', onclick: function () { ctx.done({ ok: true, self: true, level: 'exact', notes: ['Bu cümleyi ileride tekrar çalışacağız.'], selfGrade: 1 }); } }, 'Zorlandım'),
        h('button.btn.primary', { type: 'button', onclick: function () { ctx.done({ ok: true, self: true, level: 'exact', selfGrade: 3 }); } }, 'Söyledim ✓')));
      return el;
    }
  });

  /** Basit yerel yazma kontrolleri (öğretmen yokken ilk süzgeç). */
  function localChecks(text, ex) {
    var notes = [];
    var words = text.trim().split(/\s+/).filter(Boolean);
    if (ex.minWords && words.length < ex.minWords) notes.push('En az ' + ex.minWords + ' kelime yaz (şu an ' + words.length + ').');
    if (/[ışğİŞĞ]/.test(text)) notes.push('Türkçe harf (ı/ş/ğ) kullandın; Almancada yok.');
    var sentences = text.split(/(?<=[.!?])\s+/).filter(function (s) { return s.trim(); });
    sentences.forEach(function (s) {
      if (s[0] && s[0] !== s[0].toUpperCase()) notes.push('Cümle büyük harfle başlamalı: "' + s.slice(0, 20) + '…"');
    });
    if (text.trim() && !/[.!?]$/.test(text.trim())) notes.push('Son cümleyi nokta ile bitir.');
    // Bilinen isimler küçük harfle yazılmış mı?
    var nouns = {};
    Object.keys(DE.content.words).forEach(function (k) { var w = DE.content.words[k]; if (w.pos === 'n') nouns[w.de.toLowerCase()] = w.de; });
    var low = [];
    words.forEach(function (raw) {
      var t = raw.replace(/[.,!?;:]/g, '');
      if (t && t === t.toLowerCase() && nouns[t] && low.indexOf(nouns[t]) < 0) low.push(nouns[t]);
    });
    if (low.length) notes.push('İsimler büyük harfle yazılır: ' + low.join(', '));
    return notes;
  }

  X.register('write', {
    render: function (ex, ctx) {
      var lesson = ctx.lesson;
      var el = h('div.ex.ex-write', h('div.q', '✍️ Yazma görevi'), h('div.task', ex.task));
      if (ex.taskDe) el.appendChild(h('div.de-line.small', { lang: 'de' }, ex.taskDe));
      var ta = h('textarea.answer', { rows: 6, lang: 'de', spellcheck: false, placeholder: 'Almanca yaz…' });
      var count = h('div.tiny.muted', '0 kelime');
      ta.addEventListener('input', function () { count.textContent = ta.value.trim().split(/\s+/).filter(Boolean).length + ' kelime'; });
      var keys = h('div.umlauts', ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(function (ch) {
        return h('button.key', { type: 'button', tabindex: -1, onmousedown: function (e) { e.preventDefault(); }, onclick: function () {
          var s = ta.selectionStart, e2 = ta.selectionEnd; ta.value = ta.value.slice(0, s) + ch + ta.value.slice(e2); ta.selectionStart = ta.selectionEnd = s + 1; ta.focus();
        } }, ch);
      }));
      var result = h('div');
      var checkBtn = h('button.btn.primary', { type: 'button', onclick: function () {
        var text = ta.value.trim();
        if (!text) return;
        result.innerHTML = '';
        var notes = localChecks(text, ex);
        result.appendChild(h('div.feedback.' + (notes.length ? 'partial' : 'neutral'),
          h('div.fb-title', notes.length ? 'Otomatik kontrol: ' + notes.length + ' not' : 'Otomatik kontrolde sorun bulunmadı'),
          notes.map(function (n) { return h('div.fb-note', n); }),
          h('div.tiny.muted', 'Otomatik kontrol sadece temel şeylere bakar; gramer için aşağıdaki listeyi ve yapay zekâyı kullan.')));
        if (ex.checklist && ex.checklist.length) {
          result.appendChild(h('div.checklist', h('div.small', h('b', 'Kendini kontrol et:')),
            ex.checklist.map(function (c) { return h('label.check', h('input', { type: 'checkbox' }), ' ', c); })));
        }
        result.appendChild(h('details.model', h('summary', 'Örnek cevabı göster'), h('div.de-line', { lang: 'de' }, ex.model, ' ', DE.audio.button(ex.model))));
        result.appendChild(DE.ai.panel(DE.ai.writePrompt({ level: DE.ai.levelOf(lesson), task: ex.task, text: text }), 'Yapay zekâya düzelttir (isteğe bağlı)'));
        result.appendChild(h('div.actions', h('button.btn.primary', { type: 'button', onclick: function () {
          ctx.done({ ok: true, self: true, level: 'exact', given: text });
        } }, 'Bitti, devam')));
      } }, 'Kontrol et');
      el.appendChild(ta); el.appendChild(count); el.appendChild(keys);
      el.appendChild(h('div.actions', checkBtn));
      el.appendChild(result);
      el.noAutoFeedback = true;
      return el;
    }
  });

  X.localWriteChecks = localChecks;
})(window.DE = window.DE || {});
