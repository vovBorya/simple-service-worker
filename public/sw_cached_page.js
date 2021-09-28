const cacheName = "v1";

const cacheAssets = [
    "index.html",
    "about.html",
    "/css/styles.css",
    "/js/script.js"
];

// Call Install Event
self.addEventListener("install", e => {

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("SW: Caching Files");
                cache
                    .addAll(cacheAssets)
                    .then(() => self.skipWaiting())
            })
    )
});

// Call Activate event
self.addEventListener("activate", e => {

    // Remove unwanted caches

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log("SW: Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

//Call fetch event
self.addEventListener("fetch", e => {
    console.log("SW: fetching");

    e.respondWith(
        fetch(e.request.url)
            .catch(() => caches.match(e.request))
    );
    e.request.url
})