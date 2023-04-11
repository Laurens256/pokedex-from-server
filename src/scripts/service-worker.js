const offlineCacheName = 'offline';
const offlineCacheFiles = [
	'/main.css',
	'/offline.html',
	'/manifest.json',
	'/fonts/pokemon-fire-red.woff2',
	'/img/favicon.png',
];

// self.addEventListener('install', (event) => {
// 	event.waitUntil(
// 		(async () => {
// 			const cache = await caches.open(offlineCacheName);
// 			await cache.addAll(offlineCacheFiles);
// 		})()
// 	);
// });


// self.addEventListener('fetch', async (event) => {
// 	event.respondWith(
// 		fetch(event.request)
// 			.then((response) => {
// 				return response;
// 			})
// 			.catch(async () => {
// 				// If there's no network, serve the cached response
// 				const response = await caches.match(event.request);
// 				if (response) {
// 					return response;
// 				} else {
// 					// If there's no cached response, serve the fallback HTML page
// 					return caches.match('/offline.html');
// 				}
// 			})
// 	);
// });
