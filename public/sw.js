const CACHE_NAME = 'gehadservice-v1';
const ASSETS_TO_CACHE = ['/gehadservice/', '/gehadservice/index.html', '/gehadservice/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.map(n => n !== CACHE_NAME ? caches.delete(n) : null)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const {request} = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;
  event.respondWith(
    caches.match(request).then(response => response || fetch(request).then(response => {
      if (!response || response.status !== 200 || response.type === 'error') return response;
      const responseToCache = response.clone();
      caches.open(CACHE_NAME).then(cache => { cache.put(request, responseToCache); });
      return response;
    }).catch(error => {
      console.log('Fetch error:', error);
      return caches.match('/gehadservice/index.html');
    }))
  );
});
