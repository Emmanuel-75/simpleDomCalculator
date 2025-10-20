// const {cache} = require("react");

const cacheName = 'v1'

const cacheAssets = [
    '/DomCalculator.html',
    '/DomCalculator-lightMode.css',
    '/DomCalculator-darkMode.css',
    '/DomCalculator.js'
];

//Call Install Event
self.addEventListener('install', (e) =>{ 
    console.log('Service worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching files');
                cache.addAll(cacheAssets)
            })
            .then(()=> self.skipWaiting())
        );
});

//Call Activate Event
self.addEventListener('activate', (e) =>{
    console.log('Service worker: Activated')
    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName){
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

//call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})