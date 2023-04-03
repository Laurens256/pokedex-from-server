import { initList } from './utils/generalList.js';

const saveQueryString = () => {
	const queryString = window.location.search;
	sessionStorage.setItem('queryString', queryString);
};

const handleKeydown = (e: KeyboardEvent) => {
	if (e.key === 'Escape' || e.key === 'b') {
		window.location.href = '/filters';
	}
};

const init = ()=> {
	saveQueryString();
	initList();
	document.addEventListener('keydown', handleKeydown);
};

init();