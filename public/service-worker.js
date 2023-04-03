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
				return caches.match('/fallback.html');
			})
	);
});
