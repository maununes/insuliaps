(function($){
  $(function(){



  }); // end of document ready
})(jQuery); // end of jQuery name space


window.addEventListener('load',()=>{
  fetchData();
  registerSW();
});


async function fetchData(){
    
}



async function registerSW(){
  if('serviceWorker' in navigator){
      try{
          await navigator.serviceWorker.register('sw.js').then(reg=>{
            register(reg);
            //subscribe(reg);
          });
          
      }catch(e){
          console.log('Register SW failed.');
          console.log(e);
      }
  }
}

//register
function register(reg){
    reg.pushManager.subscribe({
      userVisibleOnly: true
      ,applicationServerKey: 'insulinapsQWEQWEQWeQWeQweQe'
    }).then(sub=>{
      //send sub.toJSON()
      console.log(sub);
    }); 
}

//check subscribe
function subscribe(reg){
  reg.pushManager.getSubscription().then(sub=>{
    if(sub == undefined){
      //askSubscribe();
    }else{
      console.log('Subscription:');
      console.log(sub);
    }
  }); 
}

function askSubscribe(){
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
    
    if(status == 'granted'){
      //displayNotification();
    }    
  });
  
  
}

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'img/touch/48.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'img/touch/check.png'},
          {action: 'close', title: 'Close notification',
            icon: 'img/touch/close.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}






