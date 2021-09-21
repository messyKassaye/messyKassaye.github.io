const CACHE_NAME = 'v2-cache'
const URLS_TO_CACHE = [
    'index.html',
    'about.html',
    '/css/index.css',
    '/js/main.js'
]

//installing sw
self.addEventListener('install',(event)=>{
    console.log('sw installed')
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('cache is opened')
            return cache.addAll(URLS_TO_CACHE)
        }).then(()=>self.skipWaiting())
    )
})

//activating sw
self.addEventListener('activate',(event)=>{
    event.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache!==CACHE_NAME){
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//fetch
self.addEventListener('fetch',(event)=>{
    console.log('SW fetching...')
    event.respondWith(fetch(event.request).catch(()=>caches.match(e.request)))
})