var cacheName = 'urban-pwa-1';

self.addEventListener('install', function(evt) {
    console.log('urban-pwa worker installed');

    evt.waitUntil(caches.open(cacheName).then(function(cache) {
        return cache.addAll([
            '/styles/inline.css'
        ]);
    }));
});

self.addEventListener('activate', function(evt) {
    console.log('urban-pwa worker activated');

    evt.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('non urban-pwa worker cache deleted ', key);
                    
                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
    console.log('pwa-worker-fetch ', evt.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});