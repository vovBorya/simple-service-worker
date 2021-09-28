const cacheName = "v2";

// Call Install Event
self.addEventListener("install", e => {
    console.log("SW: Installed")
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
            .then(res => {
                //Make copy/clone of response
                const resClone = res.clone();

                // Open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put(e.request, resClone)
                    })

                return res;
            })
            .catch(err => {
                caches
                    .match(e.request)
                    .then(res => res)
            })
    );
    e.request.url
})