const CACHE = 'daily-color-v1';
const ASSETS = [
  './',
  './index.html',
  './daily-color.html',
  './chakra-cat.html',
  './cat-room.html',
  './inner-space.html',
  './blessing.html',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './card-back.png',
  './room-bg.png',
  './cat-chakra-new.png',
  './cat-chakra.png',
  './去背的IMG_5459.png',
  './去背仙女棒 - 2.PNG',
  './去背愛心 - 1.PNG',
  './9997A2AF-60E0-4D23-BA45-7C395F3DCC5C.png',
  './9997A2AF-60E0-4D23-BA45-7C395F3DCC5C 2.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
