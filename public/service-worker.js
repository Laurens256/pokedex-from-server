"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CACHE_NAME = 'my-cache';
const urlsToCache = ['/', '/index.html', '/style.css', '/script.js'];
self.addEventListener('install', (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('installed');
    const cache = yield caches.open(CACHE_NAME);
    yield cache.addAll(urlsToCache);
    yield self.skipWaiting();
}));
self.addEventListener('activate', (event) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheNames = yield caches.keys();
    yield Promise.all(cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName)));
    yield self.clients.claim();
}));
self.addEventListener('fetch', (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('fetch', event.request.url);
    const response = yield caches.match(event.request);
    console.log(response);
    if (response) {
        return response;
    }
    try {
        const networkResponse = yield fetch(event.request);
        console.log(networkResponse, networkResponse.status, networkResponse.type);
        if (networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic') {
            console.log('put to cache');
            const cache = yield caches.open(CACHE_NAME);
            yield cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
    }
    catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
}));
