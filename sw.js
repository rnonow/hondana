// アプリ本体をキャッシュしてオフラインでも開けるようにする（本のデータは端末の localStorage）
const V = 'hondana-v24';
const IMG = 'hondana-img'; // 表紙画像（更新のたびに取り直さないよう端末に保存）
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-180.png', 'lib/zxing-reader.js', 'lib/zxing_reader.wasm'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== IMG).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.hostname === 'books.google.com' && u.pathname === '/books/content' && !u.searchParams.has('r')) {
    // 表紙：端末に保存したものを先に使う。無ければネットから取って保存
    e.respondWith(caches.open(IMG).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()).catch(() => {}); return r; }))));
    return;
  }
  if (u.origin !== location.origin) return; // 書籍APIは常にネットから
  // 自分のファイルはネット優先、つながらない時だけキャッシュ
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(ca => ca.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
