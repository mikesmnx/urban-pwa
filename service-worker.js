var cacheName = 'urban-pwa-1';
var urbanCacheName = 'urban-data-1';

self.addEventListener('install', function(evt) {
    console.log('urban-pwa worker installed');

    evt.waitUntil(caches.open(cacheName).then(function(cache) {
        return cache.addAll([
            /*'/styles/inline.css',*/
            '/scripts/localforage.min.js',
            /*'/scripts/app.js'*/
        ]);
    }));
});

self.addEventListener('activate', function(evt) {
    console.log('urban-pwa worker activated');

    evt.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== urbanCacheName) {
                    console.log('old pwa cache deleted ', key);
                    
                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
    console.log('pwa-worker-fetch ', evt.request.url);

    if (~evt.request.url.indexOf('https://api.urbandictionary.com/')) {
        console.log('outer request (urban api)');

        evt.respondWith(
            caches.open(urbanCacheName).then(function(cache) {
                return fetch(evt.request).then(function(response){
                    cache.put(evt.request.url, response.clone());
                    
                    return response;
                });
            })
        );
    }
    else {
        evt.respondWith(
            caches.match(evt.request).then(function(response) {
                return response || fetch(evt.request);
            })
        );
    }
});