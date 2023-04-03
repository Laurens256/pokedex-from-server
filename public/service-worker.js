const offlineCacheName = 'offline';
const offlineCacheFiles = ['/styles/main.css', '/offline.html'];

self.addEventListener('install', (event) => {
	console.log('install');
	event.waitUntil(addToCache(offlineCacheName, offlineCacheFiles));
});

const addToCache = async (cacheName, resources) => {
	const cache = await caches.open(cacheName);
	await cache.addAll(resources);
};

self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request)
			.then((response) => {
				return response;
			})
			.catch(async () => {
				// If there's no network, serve the cached response
				// const response = await caches.match(event.request);
				// if (response) {
				// 	return response;
				// } else {
					// If there's no cached response, serve the fallback HTML page
					return caches.match('/fallback.html');
				// }
			})
	);
});
