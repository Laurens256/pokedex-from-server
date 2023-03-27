const CACHE_NAME = 'my-cache';
// const urlsToCache = ['/', '/index.html', '/style.css', '/script.js'];

self.addEventListener('install', async (event) => {
	// const cache = await caches.open(CACHE_NAME);
	// await cache.addAll(urlsToCache);
	await self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
	const cacheNames = await caches.keys();
	await Promise.all(
		cacheNames
			.filter((cacheName) => cacheName !== CACHE_NAME)
			.map((cacheName) => caches.delete(cacheName))
	);
	await self.clients.claim();
});

self.addEventListener('fetch', async (event) => {
	const response = await caches.match(event.request);
	if (response) {
		console.log('returned from cache', response);
		return response;
	}
	try {
		const networkResponse = await fetch(event.request);
		console.log(networkResponse, networkResponse.status, networkResponse.type);
		if (
			networkResponse &&
			networkResponse.status === 200 &&
			networkResponse.type === 'basic'
		) {
			const cache = await caches.open(CACHE_NAME);
			await cache.put(event.request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		console.error('Fetch failed:', error);
		throw error;
	}
});
