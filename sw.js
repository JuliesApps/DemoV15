const CACHE='clearframe-static-v15-20261111l';
const FILES=['./','./index.html','./style.css?v=20261111-v15l','./preferences.css?v=20261111-v15l','./v10-catalog.js?v=20261111-v15l','./v10-book1-additions.js?v=20261111-v15l','./v10-source-expansion.js?v=20261111-v15l','./v10-role-examples.js?v=20261111-v15l','./v10-clinical-names.js?v=20261111-v15l','./v10-source-index.js?v=20261111-v15l','./reasoner.js?v=20261111-v15l','./store.js?v=20261111-v15l','./perspective.js?v=20261111-v15l','./interpretive-engine.js?v=20261111-v15l','./matcher.js?v=20261111-v15l','./app.js?v=20261111-v15l','./book1-v10-source-ledger.json','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('clearframe-static-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  // Recheck the online HTML shell while retaining a cached offline fallback.
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
