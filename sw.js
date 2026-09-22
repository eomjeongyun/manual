const CACHE = 'manual-shell-v1';
const SHELL = [
  './','./index.html','./style.css','./app.js','./manifest.webmanifest',
  './icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png',
  './fonts/GangwonEduSaeeum.woff2','./fonts/Pretendard-Regular.woff2',
  './ocr/tesseract.min.js','./ocr/worker.min.js','./ocr/tesseract-core-lstm.wasm.js','./ocr/tesseract-core-lstm.wasm',
  './ocr/lang/kor.traineddata.gz','./ocr/lang/eng.traineddata.gz'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
