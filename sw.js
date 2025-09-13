const CACHE_NAME = 'wl-calc-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/src/main.jsx',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  '/src/index.css',
  '/src/App.css',
  '/src/App.jsx',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});