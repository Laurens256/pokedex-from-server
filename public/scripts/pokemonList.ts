import { initList } from './utils/generalList.js';

const saveQueryString = () => {
	const queryString = window.location.search;
	sessionStorage.setItem('queryString', queryString);
};

const handleKeydown = (e: KeyboardEvent) => {
	if (e.key === 'Escape' || e.key === 'b') {
		e.preventDefault();
		window.location.href = '/filters';
	}
};

const init = ()=> {
	saveQueryString();
	initList();
	window.addEventListener('keydown', handleKeydown);
};

init();