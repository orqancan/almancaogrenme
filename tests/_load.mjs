// Klasik script'leri (window.DE) Node'da bir vm bağlamında yükler.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function load(files, extra = {}) {
  const store = {};
  const ctx = {
    console, Math, Date, JSON,
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; }
    },
    alert: () => {},
    ...extra
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
  return ctx.DE;
}

export function contentFiles() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  return [...html.matchAll(/<script\s+src="(content\/[^"]+)"/g)].map((m) => m[1]);
}

export const CORE = ['js/core/util.js', 'js/core/content.js', 'js/core/answer.js', 'js/core/fsrs.js', 'js/core/store.js', 'js/core/planner.js'];
