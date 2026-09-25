var CACHE="bina-panel-v3";
var ASSETS=["./","./index.html","./manifest.json","./bina-ikon-192.png","./bina-ikon-512.png"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){self.skipWaiting();}));
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){
      if(k.indexOf("bina-panel")===0&&k!==CACHE){return caches.delete(k);}
    }));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(function(r){
    return r||fetch(e.request).then(function(res){
      try{var copy=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,copy);});}catch(x){}
      return res;
    }).catch(function(){return caches.match("./index.html");});
  }));
});