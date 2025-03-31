const CACHE_NAME = 'dot1xer-supreme-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/templates/base.js',
  '/js/templates/iosxe.js',
  '/js/templates/nxos.js',
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
  '/assets/icons/supreme-logo.png'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
