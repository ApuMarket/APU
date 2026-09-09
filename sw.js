// Service Worker minimal — sert uniquement à satisfaire les critères
// d'installabilité PWA d'Android (WebAPK). Ne fait aucune mise en cache
// complexe : chaque requête part directement sur le réseau.

const CACHE_NAME = 'apu-shell-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Passe-plat réseau, avec repli sur le cache si hors-ligne.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
