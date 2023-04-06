import { initList } from './generalList';

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

(()=> {
	saveQueryString();
	initList();
	window.addEventListener('keydown', handleKeydown);
})();