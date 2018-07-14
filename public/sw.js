var EXTRA_FILES = [];

var CHECKSUM = "v1";

var FILES = [
  '/',
  '/?lang=th',
  '/?lang=en',
  '/?lang=de',
  'https://fontuni.com/boon/css/boon-all.css',
  '/index.html',
  '/index.html?lang=th',
  '/index.html?lang=en',
  '/index.html?lang=de',
  '/resources/icon/apple-touch-icon-57x57.png',
  '/resources/icon/apple-touch-icon-114x114.png',
  '/resources/icon/apple-touch-icon-72x72.png',
  '/resources/icon/apple-touch-icon-144x144.png',
  '/resources/icon/apple-touch-icon-60x60.png',
  '/resources/icon/apple-touch-icon-120x120.png',
  '/resources/icon/apple-touch-icon-76x76.png',
  '/resources/icon/apple-touch-icon-152x152.png',
  '/resources/icon/favicon-196x196.png',
  '/resources/icon/favicon-96x96.png',
  '/resources/icon/favicon-32x32.png',
  '/resources/icon/favicon-16x16.png',
  '/resources/icon/favicon-128.png',
  '/resources/icon/mstile-144x144.png',
  '/resources/icon/mstile-70x70.png',
  '/resources/icon/mstile-150x150.png',
  '/resources/icon/mstile-310x150.png',
  '/resources/icon/mstile-310x310.png',
  '/resources/css/firework.css',
  '/resources/css/main.css',
  '/resources/misc/song.mp3',
  '/resources/icon/th-TH.png',
  '/resources/icon/en-US.png',
  '/resources/icon/de-DE.png',
  '/resources/js/locale.js',
  '/resources/js/darkmode.js',
  '/resources/js/main.js',
  '/resources/locale/th.json',
  '/resources/locale/en.json',
  '/resources/locale/de.json'
].concat(EXTRA_FILES || []);

var CACHENAME = 'birth-tu-' + CHECKSUM;

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHENAME).then(function (cache) {
    return cache.addAll(FILES);
  }));
});

self.addEventListener('activate', function (event) {
  return event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) {
      if (k != CACHENAME && k.indexOf('birth-tu-') == 0) {
        return caches.delete(k);
      } else {
        return Promise.resolve();
      }
    }));
  }));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
    .catch(() => {
      if (event.request.mode == 'navigate') {
        return caches.match('/offline.html');
      }
    })
  );
});