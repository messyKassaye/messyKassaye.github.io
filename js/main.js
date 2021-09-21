if(navigator.serviceWorker){
    window.addEventListener('load',()=>{
        navigator.serviceWorker
        .register('../sw_cached_sites.js')
        .then(response=>console.log('SW registered'))
        .catch(error=>console.error(`Something is happening with :${error}`))
    })
    console.log('SW is supported')
}