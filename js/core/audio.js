// Ses: Almanca seslendirme (Web Speech API), konuşma tanıma (Chrome/Edge) ve mikrofon kaydı.
// Önceden üretilmiş ses dosyaları eklendiğinde DE.audio.files (metin → yol) üzerinden öncelikli çalınır.
(function (DE) {
  'use strict';

  var synth = typeof speechSynthesis !== 'undefined' ? speechSynthesis : null;
  var voices = [];
  var PREFER = [/natural/i, /online/i, /google/i, /katja|conrad|amala|seraphina|florian|hedda|stefan|anna|markus|petra|yannick/i];

  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices().filter(function (v) { return /^de(-|_|$)/i.test(v.lang); });
  }
  if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }

  function germanVoices() { return voices.slice(); }

  function pickVoice() {
    var name = DE.store && DE.store.state && DE.store.state.settings.voice;
    if (name) { var v = voices.find(function (x) { return x.name === name; }); if (v) return v; }
    var de = voices.filter(function (v) { return /de-DE|de_DE/i.test(v.lang); });
    var pool = de.length ? de : voices;
    for (var i = 0; i < PREFER.length; i++) {
      var hit = pool.find(function (v) { return PREFER[i].test(v.name); });
      if (hit) return hit;
    }
    return pool[0] || null;
  }

  var current = null;

  /** Metni Almanca okur. opts.slow: yavaş. Promise döner (bitince). */
  function speak(text, opts) {
    opts = opts || {};
    stop();
    var file = DE.audio.files && DE.audio.files[text];
    if (file) {
      return new Promise(function (resolve) {
        current = new Audio(file);
        current.playbackRate = opts.slow ? 0.75 : 1;
        current.onended = resolve; current.onerror = resolve;
        current.play().catch(resolve);
      });
    }
    if (!synth) return Promise.resolve();
    return new Promise(function (resolve) {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      var v = pickVoice();
      if (v) u.voice = v;
      var base = (DE.store && DE.store.state && DE.store.state.settings.rate) || 0.95;
      u.rate = opts.slow ? base * 0.7 : base;
      u.onend = resolve; u.onerror = resolve;
      synth.speak(u);
    });
  }

  function stop() {
    if (current) { current.pause(); current = null; }
    if (synth) synth.cancel();
  }

  /** Küçük "çal" butonu. */
  function button(text, opts) {
    opts = opts || {};
    var h = DE.util.h;
    var wrap = h('span.play');
    wrap.appendChild(h('button.btn-icon', { title: 'Dinle', type: 'button', onclick: function (e) { e.stopPropagation(); speak(text); } }, '🔊'));
    if (opts.slow !== false) wrap.appendChild(h('button.btn-icon.slow', { title: 'Yavaş dinle', type: 'button', onclick: function (e) { e.stopPropagation(); speak(text, { slow: true }); } }, '🐢'));
    return wrap;
  }

  // ---- Konuşma tanıma ---------------------------------------------------------------------

  var Rec = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

  function sttAvailable() { return !!Rec; }

  /** Bir kez dinler, tanınan metin alternatiflerini döndürür. */
  function listen() {
    return new Promise(function (resolve, reject) {
      if (!Rec) return reject(new Error('Bu tarayıcı konuşma tanımayı desteklemiyor (Chrome veya Edge kullan).'));
      var r = new Rec();
      r.lang = 'de-DE';
      r.interimResults = false;
      r.maxAlternatives = 3;
      var done = false;
      r.onresult = function (e) {
        done = true;
        var alts = [];
        for (var i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
        resolve(alts);
      };
      r.onerror = function (e) { if (!done) { done = true; reject(new Error(e.error === 'not-allowed' ? 'Mikrofon izni verilmedi.' : e.error === 'network' ? 'Konuşma tanıma için internet gerekli.' : 'Tanıma hatası: ' + e.error)); } };
      r.onend = function () { if (!done) { done = true; resolve([]); } };
      r.start();
    });
  }

  // ---- Kayıt (kendi sesini model sesle karşılaştırma) ----------------------------------------

  function recorder() {
    var media = null, chunks = [], stream = null;
    return {
      supported: typeof MediaRecorder !== 'undefined' && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      start: function () {
        return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) {
          stream = s; chunks = [];
          media = new MediaRecorder(s);
          media.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); };
          media.start();
        });
      },
      stop: function () {
        return new Promise(function (resolve) {
          if (!media) return resolve(null);
          media.onstop = function () {
            stream.getTracks().forEach(function (t) { t.stop(); });
            resolve(URL.createObjectURL(new Blob(chunks, { type: media.mimeType || 'audio/webm' })));
          };
          media.stop();
        });
      }
    };
  }

  DE.audio = { speak: speak, stop: stop, button: button, germanVoices: germanVoices, pickVoice: pickVoice, sttAvailable: sttAvailable, listen: listen, recorder: recorder, files: DE.audio && DE.audio.files || {} };
})(window.DE = window.DE || {});
