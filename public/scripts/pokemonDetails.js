import { playCry } from './utils/sfx.js';
const backButton = document.querySelector('a.back');
// back button logic zodat query string worden onthouden
const backButtonLogic = () => {
    const queryString = sessionStorage.getItem('queryString') || '';
    backButton === null || backButton === void 0 ? void 0 : backButton.setAttribute('href', `/pokemon${queryString}`);
};
const handleKeyDown = (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        playCry();
    }
    else if (e.key === 'Escape' || e.key === 'b') {
        e.preventDefault();
        backButton === null || backButton === void 0 ? void 0 : backButton.click();
    }
};
const init = () => {
    playCry(false);
    backButtonLogic();
    document.addEventListener('keydown', handleKeyDown);
};
init();
