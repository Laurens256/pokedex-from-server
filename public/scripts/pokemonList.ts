import { initList } from './utils/generalList.js';


const saveQueryString = () => {
	const queryString = window.location.search;
	sessionStorage.setItem('queryString', queryString);
};

const init = ()=> {
	saveQueryString();
	initList();
};

init();