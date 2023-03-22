import { playCry } from './utils/sfx.js';

const backButton: HTMLAnchorElement | null = document.querySelector('a.back');

// back button logic zodat query string worden onthouden
const backButtonLogic = () => {
	const queryString = sessionStorage.getItem('queryString') || '';
	backButton?.setAttribute('href', `/pokemon${queryString}`);
};

const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === ' ') {
		e.preventDefault();
		playCry();
	} else if (e.key === 'Escape' || e.key === 'b') {
		e.preventDefault();
		backButton?.click();
	}
};

const init = () => {
	playCry(false);
	backButtonLogic();
	document.addEventListener('keydown', handleKeyDown);
};

init();
