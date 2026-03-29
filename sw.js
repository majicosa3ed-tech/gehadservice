const CACHE_NAME = 'gehadservice-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/gehadservice/',
  '/gehadservice/index.html',
  '/gehadservice/manifest.json',
  '/gehadservice/offline-app.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
        console.warn('Error caching assets:', error);
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) return response;
      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') return response;
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => { cache.put(request, responseToCache); });
          return response;
        })
        .catch((error) => {
          console.log('Fetch error, serving offline page:', error);
          return caches.match('/gehadservice/offline-app.html');
        });
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-codes') {
    event.waitUntil(
      fetch('/gehadservice/').then(() => { console.log('Service codes synced'); })
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
