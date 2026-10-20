#!/usr/bin/env node
// İçerik doğrulayıcı: index.html'de listelenen içerik script'lerini yükler, şemayı ve
// üniteler arası tutarlılığı kontrol eder, listelenmemiş içerik dosyalarını bildirir.
// Kullanım: node tools/validate-content.mjs [--stats]
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map((m) => m[1]);
const contentScripts = scripts.filter((s) => s.startsWith('content/'));

const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
const run = (rel) => vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), ctx, { filename: rel });

const errors = [];
run('js/core/content.js');
for (const s of contentScripts) {
  if (!fs.existsSync(path.join(root, s))) { errors.push(`index.html'de var ama dosya yok: ${s}`); continue; }
  try { run(s); } catch (e) { errors.push(`${s}: çalıştırılamadı: ${e.message}`); }
}

const listed = new Set(contentScripts);
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? walk(path.join(dir, d.name)) : [path.relative(root, path.join(dir, d.name)).split(path.sep).join('/')]);
for (const f of walk(path.join(root, 'content'))) {
  if (f.endsWith('.js') && !listed.has(f)) errors.push(`index.html'de listelenmemiş içerik dosyası: ${f}`);
}

const C = ctx.DE.content;
errors.push(...C.validateAll());

if (process.argv.includes('--stats')) {
  for (const u of C.units) {
    const words = u.lessons.reduce((n, l) => n + (l.words || []).length, 0);
    const exs = u.lessons.reduce((n, l) => n + (l.exercises || []).length, 0);
    console.log(`${u.id} ${u.title.padEnd(32)} ders:${u.lessons.length} kelime:${words} alıştırma:${exs}`);
  }
  console.log(`Toplam benzersiz kelime: ${Object.keys(C.words).length}`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} içerik hatası:\n` + [...new Set(errors)].map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ İçerik geçerli (${C.units.length} ünite, ${C.allLessons().length} ders)`);
