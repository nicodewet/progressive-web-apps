var cacheName = 'camera.makaro.io-v1';

// Cache our known resources during install by tapping into the Service Worker installation event.
// This is known as "pre-caching".
self.addEventListener('install', event => {

  // https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './js/jquery-3.2.1/jquery.slim.min.js',
        './js/popper-1.12.9/umd/popper.min.js',
        './js/bootstrap-4.0.0-beta.3/bootstrap.min.js',
        './css/bootstrap-4.0.0-beta.3/bootstrap.min.css',
        './css/starter-template.css',
        './index.html'
      ]))
  );
});

// Read assets from our primed cache AND cache any new resources as they are fetched
self.addEventListener('fetch', function (event) {
  event.respondWith(
    // Check if an incoming URL matches anything in our cache and ignore any querystring parameters
    // so you don't get any cache misses
    caches.match(event.request, { ignoreSearch: true })
      .then(function (response) {
        if (response) {
           // we have a match in our cache so return the resource from the cache
          return response;
        }
        // clone the request since request is a stream and can only be
        // consumed once
        var fetchRequest = event.request.clone();

        // resource doesn't exist in cache so fetch the requested resource
        // by trying to make the original HTTP request as intended
        // https://developer.mozilla.org/en/docs/Web/API/Fetch_API
        return fetch(fetchRequest).then(
          function (response) {
            if (!response || response.status !== 200) {
              // if the request fails or the server returns an error code return 
              // the error immediately
              return response;
            }

            // clone the response because we need to both add it into the cache AND 
            // because it is used as the final returned response
            var responseToCache = response.clone();
            caches.open(cacheName)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
