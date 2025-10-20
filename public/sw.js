const CACHE_NAME = 'wl-calc-v3';
const BASE_PATH = '/weightlifting-calculator';

const ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/icons/site.webmanifest`,
  `${BASE_PATH}/icons/favicon.ico`,
  `${BASE_PATH}/icons/android-chrome-192x192.png`,
  `${BASE_PATH}/icons/android-chrome-512x512.png`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('⚠️ Failed to cache', asset, err);
        }
      }
    })()
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for HTML/JS/CSS; cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (
    request.mode === 'navigate' ||
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style'
  ) {
    event.respondWith(
      fetch(request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return resp;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for other assets (images, icons, etc.)
  event.respondWith(
    caches.match(request).then((resp) => resp || fetch(request))
  );
});
