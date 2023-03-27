import { generateFooterControls } from './utils/footerControls.js';

const init = () => {
	const currentViewEl: HTMLMetaElement | null = document.querySelector(
		'head meta[name="currentView"]'
	);
	if (currentViewEl) {
		const currentView = currentViewEl.content;
		generateFooterControls(currentView);
	}

	registerServiceWorker();
};

const registerServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('/scripts/dist/service-worker.js').then(
				function (registration) {
					console.log(
						'ServiceWorker registration successful with scope:',
						registration.scope
					);
				},
				function (err) {
					console.log('ServiceWorker registration failed: ', err);
				}
			);
		});
	}
};

init();
