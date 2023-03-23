import { generateFooterControls } from './utils/footerControls.js';

const init = () => {
	const currentViewEl: HTMLMetaElement | null = document.querySelector('head meta[name="currentView"]');
	if (currentViewEl) {
		const currentView = currentViewEl.content;
		generateFooterControls(currentView);
	}
};

init();
