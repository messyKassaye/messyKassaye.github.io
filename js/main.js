if(navigator.serviceWorker && 'PushManager' in window){
    window.addEventListener('load',()=>{
     const sw=   navigator.serviceWorker
        .register('../sw_cached_sites.js')
        .then(response=>console.log('SW registered'))
        .catch(error=>console.error(`Something is happening with :${error}`))

        //ask push notification permision
        const permission = window.Notification.requestPermission();
        if(Notification.permission==='granted'){
            showNotification('Hello there','This SW push notification',sw)
            console.log('granted')
        }
    })
}

const showNotification =(title,body,sw)=>{
    //sw.showNotification(title,body)
    console.log('send')
}
