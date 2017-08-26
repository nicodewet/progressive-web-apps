var cacheName = 'helloWorld';

// Tap into the Service Worker installation event.
// This is known as "pre-caching".
self.addEventListener('install', event => {
  // https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil
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

// Read assets from our primed cache ...
self.addEventListener('fetch', function (event) {
  event.respondWith(
    // Check if an incoming URL matches anything in our cache
    caches.match(event.request)
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
          function (fetchResponse) {
            if (!fetchResponse || fetchResponse.status !== 200) {
              // if the request fails or the server returns an error code return 
              // the error immediately
              return fetchResponse;
            }

            // clone the response because we need to both add it into the cache AND 
            // because it is used as the final returned response
            var responseToCache = fetchResponse.clone();

            // open our helloWorld cache
            caches.open(cacheName)
              .then(function (cache) {
                // add the response into the cache
                cache.put(event.request, responseToCache);
              });

            return fetchResponse;
          }
        );
      })
  );
});
