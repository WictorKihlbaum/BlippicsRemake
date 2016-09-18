
const cacheName = 'blippics-cache';
const jsBaseURL = '/assets/js/';
const cssBaseURL = '/assets/css/';
const urlsToCache = [
  '/',
  `${jsBaseURL}framework/material.min.js`,
  `${cssBaseURL}framework/material.min.css`
];


self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        //console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
