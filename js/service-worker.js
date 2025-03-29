self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('dot1xer-supreme-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/js/app.js',
                '/js/templates/base.js',
                '/js/templates/iosxe.js',
                '/js/templates/nxos.js',
                '/js/templates/arubaos.js',
                '/js/templates/juniper.js',
                '/js/templates/extreme.js',
                '/js/templates/arista.js',
                '/assets/icons/supreme-logo.png',
                '/assets/icons/wizard.png',
                '/assets/backgrounds/network-discovery-bg.jpg'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
