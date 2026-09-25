var CACHE="bina-panel-v1";
var ASSETS=["./","./index.html","./manifest.webmanifest","./bina-ikon-192.png","./bina-ikon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}));self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim());});
self.addEventListener("fetch",function(e){
  e.respondWith(caches.match(e.request).then(function(r){
    return r||fetch(e.request).then(function(res){
      try{var copy=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,copy);});}catch(x){}
      return res;
    }).catch(function(){return caches.match("./index.html");});
  }));
});