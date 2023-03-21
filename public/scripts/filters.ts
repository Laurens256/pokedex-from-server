import { initList } from './utils/generalList.js';

const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
	'.filters li a[data-img]'
);
const sideSprite: HTMLImageElement = document.querySelector('.filters img')!;
const head = document.querySelector('head')!;

let imgUrls: string[] = [];

const initSideSprite = () => {
	links.forEach((link) => {
		const imgUrl = link.dataset.img;
		imgUrls.push(imgUrl!);
		link.addEventListener('focus', changeSprite);
	});
};

// preload images terwijl je door de lijst scrolled
const preloadImages = (current: HTMLAnchorElement) => {
	// niet preloaden voor mobile omdat img daar niet zichtbaar is
	if(window.matchMedia('(max-width: 600px)').matches) return;

	const index = Array.from(links).indexOf(current);
	const next = links[index + 1];

	if (next) {
		const link = head.querySelector(`link[href*="${next.dataset.img}"]`);
		if (!link) {
			head.insertAdjacentHTML('beforeend', `<link rel="preload" type="image/png" href="/img/pokedex-icons/${next.dataset.img}.png" as="image">`);
		}
	}
};

// sprite rechts van de filters veranderen
const changeSprite = (e: FocusEvent) => {
	const activeElement = e.target;
	if (activeElement instanceof HTMLAnchorElement) {
		sideSprite.src = `/img/pokedex-icons/${activeElement.dataset.img}.png`;
		preloadImages(activeElement);
	}
};

initList();
initSideSprite();