#!/usr/bin/env node
// Tek dosya derlemesi: index.html'deki tüm CSS ve script'leri gömerek
// dist/almanca-ogrenme.html üretir (WhatsApp/e-posta ile gönderilebilir, tek başına açılır).
// Kullanım: node tools/build-single.mjs          (üret)
//           node tools/build-single.mjs --check  (dist güncel mi? değilse hata)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

let html = read('index.html');

html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) =>
  `<style>/* ${href} */\n${read(href)}\n</style>`);

html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => {
  const code = read(src).replace(/<\/script/gi, '<\\/script');
  return `<script>/* ${src} */\n${code}\n</script>`;
});

html = html.replace(/<!-- Sıra önemli:[\s\S]*?-->\n/, '<!-- Tek dosya sürümü: tools/build-single.mjs ile üretildi. Düzenlemeyi kaynak dosyalarda yap. -->\n');

if (/<script src=|<link rel="stylesheet"/.test(html)) throw new Error('Gömülemeyen dış dosya kaldı');

const out = path.join(root, 'dist', 'almanca-ogrenme.html');
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (cur !== html) { console.error('✗ dist/almanca-ogrenme.html güncel değil: npm run build çalıştır.'); process.exit(1); }
  console.log('✓ dist güncel');
  process.exit(0);
}
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(out, html);
console.log(`✓ ${path.relative(root, out)} (${Math.round(html.length / 1024)} KB)`);
