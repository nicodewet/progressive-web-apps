var cacheName = 'helloWorld';

// Tap into the Service Worker installation event
self.addEventListener('install', event => {
  event.waitUntil(
    // Open the specified cache
    caches.open(cacheName)
    // Add the JavaScript and image into the cache
    .then(cache => cache.addAll([
      './js/script.js',
      './images/hello.png'
    ]))
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
