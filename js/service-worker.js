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
                '/js/components/platform.js',
                '/js/components/basicInfo.js',
                '/js/components/aaa.js',
                '/js/components/radius.js',
                '/js/components/tacacs.js',
                '/js/components/dot1x.js',
                '/js/components/coa.js',
                '/js/components/radsec.js',
                '/js/components/deviceTracking.js',
                '/js/components/ibns.js',
                '/js/components/portnox.js',
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
