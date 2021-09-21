const CACHE_NAME = 'v3-cache'


//installing sw
self.addEventListener('install',(event)=>{
    console.log('sw installed')
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
    event.respondWith(
        fetch(event.request)
        .then(res=>{
            const resClone = res.clone()
            caches.open(CACHE_NAME)
            .then(cache=>{
                cache.put(event.request,resClone)
            })
            return res;
        }).catch(err=>caches.match(event.request).then(res=>res))
    )
})