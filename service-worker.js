const CACHE = 'genevieve-food-v24-20260729';
const APP_SHELL = [
  '/', '/index.html', '/app.js?v=24.0.0', '/logic.js?v=24.0.0', '/styles.css?v=24.0.0',
  '/manifest.webmanifest', '/assets/vendor/zxing-browser.min.js?v=0.2.1'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
        return response;
      })
      .catch(() => caches.match(event.request).then(hit => hit || caches.match('/index.html')))
  );
});
