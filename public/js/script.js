(() => {
    if (!("serviceWorker" in navigator)) return;

    console.log("SW supported")

    window.addEventListener("load", () => {

        navigator
            .serviceWorker
            // .register("/sw_cached_page.js")
            .register("/sw_cached_site.js")
            .then(() => console.log(`SW: Registered`))
            .catch(err => console.error(`SW Error: ${err}`))
    })
})();
