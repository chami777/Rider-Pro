const CACHE_NAME = 'rider-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. App එක Install කරන වෙලාවෙදි ෆයිල් ටික Cache එකට දාගැනීම
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. App එක පාවිච්චි කරන වෙලාවට ඉන්ටර්නෙට් නැත්නම් Cache එකෙන් ෆයිල් ලබා දීම (Offline වැඩ කිරීමට)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache එකේ තියෙනවා නම් ඒක දෙනවා, නැත්නම් ඉන්ටර්නෙට් එකෙන් ගන්නවා
        return response || fetch(event.request);
      })
  );
});