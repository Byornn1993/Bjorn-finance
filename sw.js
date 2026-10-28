// Bjorn Finance service worker: bewaart de app zelf (niet je gegevens) zodat hij snel opent.
const CACHE = 'bjorn-finance-v23';
const SHELL = ['./', 'index.html', 'supabase.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Gegevens en login (Supabase) gaan altijd rechtstreeks naar het internet.
  if (url.hostname.endsWith('supabase.co')) return;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== self.location.origin && !isFont) return;
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    // Eerst het netwerk, zonder de browsercache (zodat je altijd de nieuwste versie krijgt), anders de bewaarde versie.
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('index.html', copy)); return res; })
      .catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
