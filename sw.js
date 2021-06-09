//sw
const cacheName = 'insulinaps-v1';
const staticAssets = [
	'./'
	,'./index.html'
	,'./calculadora.html'
	,'./loading.html'
	,'./css/style.css'
	,'./css/icon.css'
	,'./css/font.woff2'
	,'./css/bootstrap.min.css'
	,'./js/bootstrap.min.js'
	,'./js/jquery.min.js'
	,'./js/init.js'
	,'./img/logo1.png'
	,'./img/sus.png'
];

self.addEventListener('install',async e =>{
	const cache = await caches.open(cacheName);
	await cache.addAll(staticAssets);
	return self.skipWaiting();
});

self.addEventListener('activate', e =>{
	self.clients.claim();
});

self.addEventListener('push', e =>{
	const title = e.data.text();
	e.waitUntil(self.registration.showNotification(title));
});

self.addEventListener('fetch',async e =>{
	const req = e.request;
	const url = new URL(req.url);
	if(url.origin == location.origin){
		e.respondWith(cacheFirst(req));
	}else{
		e.respondWith(networkAndCache(req));
	}
});

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.example.com');
    notification.close();
  }
});

async function cacheFirst(req){
	const cache = await caches.open(cacheName);
	const cached = await cache.match(req);
	return cached || fetch(req);
}

async function networkAndCache(req){
	const cache = await caches.open(cacheName);
	try{
		const fresh = await fetch(req);
		await cache.put(req,fresh.clone());
		return fresh;
	}catch(e){
		const cached = await cache.match(req);
	}
}


//======================
