import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from './_load.mjs';

const DE = load(['js/core/util.js', 'js/core/answer.js']);
const check = (i, a) => DE.answer.check(i, a);

test('birebir ve noktalama/büyük harf toleransı', () => {
  assert.equal(check('Ich heiße Anna.', ['Ich heiße Anna.']).level, 'exact');
  assert.ok(check('ich heiße anna', ['Ich heiße Anna.']).ok); // özel ad küçük → uyarılı doğru
  assert.equal(check('  Wie geht es dir ? ', ['Wie geht es dir?']).level, 'exact');
  assert.equal(check('Wie gehts', ["Wie geht's?"]).level, 'exact');
});

test('isim küçük harfle yazılınca uyarı ama doğru', () => {
  const r = check('Das ist mein vater', ['Das ist mein Vater.']);
  assert.equal(r.level, 'minor');
  assert.ok(r.ok);
  assert.ok(r.tags.includes('spelling.caps'));
});

test('ae/oe/ue/ss kabul edilir', () => {
  const r = check('Ich heisse Mueller', ['Ich heiße Müller']);
  assert.equal(r.level, 'minor');
  assert.ok(r.ok);
});

test('anlam değiştiren umlaut eksikliği yanlış', () => {
  const r = check('Das ist schon', ['Das ist schön']);
  assert.equal(r.ok, false);
  assert.ok(r.tags.includes('spelling.umlaut'));
});

test('artikel hatası yazım hatası sayılmaz', () => {
  const r = check('Ich habe ein Bruder', ['Ich habe einen Bruder']);
  assert.equal(r.ok, false);
  assert.ok(r.tags.includes('article'));
  const r2 = check('die Tisch', ['der Tisch']);
  assert.equal(r2.ok, false);
});

test('isimde artikel eksik → kısmi', () => {
  const r = check('Tisch', ['der Tisch']);
  assert.equal(r.level, 'partial');
  assert.equal(r.ok, false);
});

test('fiil çekimi farkı yazım hatası sayılmaz', () => {
  const r = check('Ich wohnt in Köln', ['Ich wohne in Köln']);
  assert.equal(r.ok, false);
  assert.ok(r.tags.includes('verb.conj'));
});

test('tek harflik yazım hatası kabul', () => {
  const r = check('Ich komme aus Deutschlnd', ['Ich komme aus Deutschland']);
  assert.equal(r.level, 'minor');
});

test('kelime sırası hatası teşhis edilir', () => {
  const r = check('Heute ich komme', ['Heute komme ich']);
  assert.equal(r.ok, false);
  assert.ok(r.tags.includes('word_order'));
});

test('Türkçe harf ipucu', () => {
  const r = check('Şule', ['Schule']);
  assert.equal(r.ok, true);
  assert.ok(r.tags.includes('spelling.tr'));
});

test('telefon numarası: boşluk ve tire farkı önemsiz', () => {
  assert.equal(check('0176 123 45', ['017612345']).level, 'exact');
  assert.equal(check('0176/12345', ['0176 12345']).level, 'exact');
});

test('birden çok kabul edilen cevap', () => {
  assert.ok(check('Mein Name ist Anna', ['Ich heiße Anna.', 'Mein Name ist Anna.']).ok);
});

test('Türkçe locale küçültme kullanılmaz (I → i)', () => {
  assert.ok(check('ICH BIN', ['Ich bin']).ok);
});

test('diff eksik ve fazla kelimeleri gösterir', () => {
  const d = DE.answer.diff('Ich bin Anna', 'Ich heiße Anna');
  assert.equal(d.map((x) => x.op).join(','), 'same,add,del,same');
});
