const PRIMARY_CACHE = "cache-primary";
const preCachedResource = [
  "/",
  "/index.html",
  "style/main.css",
  "imgs/Villa.jpeg",
  "imgs/Villa 2.png",
  "imgs/Villa 3.png"
];

self.addEventListener("install", async event => {
  console.log("Inside the install event!");
  try {
    const cache = await caches.open(PRIMARY_CACHE);
    await cache.addAll(preCachedResource);
  } catch (error) {
    console.log("Error caused in cache");
  }
});

self.addEventListener("fetch", async event => {
  console.log(`Inside the fetch event ${event.request.url}`);

  event.respondWith(
    caches
      .match(event.request)
      .then(cacheContent => cacheContent || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  console.log(event);
});

/* self.addEventListener('fetch', function(event){
    const req  = event.request;
    if(event.origin === location.origin)
        event.respondWith(cacheFirst(req));
    else
        event.respondWith(networkFirst(req));

}) */
