const CACHE_NAME = 'restaurant-static-v1';
const urlsToCache = [
  './',
  './index.html',
  './restaurant.html',
  './data/restaurants.json',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
]


//init SW - adding a cache
self.addEventListener('install', function(event) {
  console.log('Installing Service Worker....')
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Cache opened');
      return cache.addAll(urlsToCache);
    })
    .catch(function(err) {
      console.log(`Cache wasn't setup up. Error: ${err}`);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
    .catch(function(err) {
      console.log(`Error with fetching data: ${err}`);
    })
  );
});
