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

const registerServiceWorker = async () => {
	// Check if the browser supports service workers
	if ('serviceWorker' in navigator) {
		// Register the service worker
		try {
			await navigator.serviceWorker.register('/service-worker.js');
		} catch (error) {
			console.error('Service worker registration failed:', error);
		}
	}
};

init();
