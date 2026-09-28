const CACHE="law-touch-v1";
const ASSETS=["./","./index.html","./questions.json","./manifest.webmanifest","./icon-180.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const clone=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,clone));return r}).catch(()=>caches.match("./")))));
