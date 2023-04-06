const list: HTMLOListElement | HTMLUListElement = document.querySelector('.select-list')!;
const listItems = Array.from(list.querySelectorAll('a'));
let topBoundary = 0;
let bottomBoundary = 0;
let listItemHeight = 0;

// returned de lijst met zichtbare items
const getVisibleItems = () => {
	const visibleItems = listItems.filter(
		(listItem) =>
			listItem.getBoundingClientRect().top >= topBoundary &&
			listItem.getBoundingClientRect().bottom <= bottomBoundary
	);
	return visibleItems;
};

let isRunning = false;
// verplaats het pijltje omhoog of omlaag
const moveArrow = async (direction: number) => {
	if (isRunning) return;
	isRunning = true;
	const focusedItem = document.activeElement as HTMLAnchorElement;

	// return als je boven of onderaan bent
	if (
		(focusedItem === listItems[0] && direction === -1) ||
		(focusedItem === listItems[listItems.length - 1] && direction === 1)
	) {
		isRunning = false;
		return;
	}

	if (listItems.includes(focusedItem)) {
		const focusedItemIndex = listItems.indexOf(focusedItem);
		const nextItem = listItems[focusedItemIndex + direction];
		if (nextItem) {
			nextItem.focus();
		}
	} else {
		// focus op het midden van de lijst als er geen item geselecteerd is
		const visibleItems = getVisibleItems();
		visibleItems[Math.floor(visibleItems.length / 2)].focus();
	}
	playBeepSound();
	
	await delay(90);
	isRunning = false;
};

// function om de list te laten scrollen als je binnen een marge van de boven- of ondergrens bent
const followScroll = () => {
	const visibleItems = getVisibleItems();

	const focusedItem = document.activeElement as HTMLAnchorElement;
	const focusedItemIndex = visibleItems.indexOf(focusedItem);

	// magische nummers
	const scrollMarginDown = visibleItems.length > 5 ? 3 : 1;
	const scrollMarginUp = visibleItems.length > 5 ? 2 : 1;

	if (focusedItemIndex >= visibleItems.length - scrollMarginDown || focusedItemIndex === -1) {
		list.scrollTop += listItemHeight;
	} else if (focusedItemIndex <= scrollMarginUp || focusedItemIndex === 0) {
		list.scrollTop -= listItemHeight;
	}
};


// berekenen van de boven- en ondergrens van de list, gebeurt bij resize en init
const calcBoundingRect = () => {
	listItemHeight = listItems[0].getBoundingClientRect().height;
	topBoundary = list.getBoundingClientRect().top;
	bottomBoundary = list.getBoundingClientRect().bottom;
};

const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === 'ArrowUp') {
		e.preventDefault();
		moveArrow(-1);
	} else if (e.key === 'ArrowDown') {
		e.preventDefault();
		moveArrow(1);
	} else if (e.key === 'a') {
		e.preventDefault();
		const focusedItem = document.activeElement as HTMLAnchorElement;
		if (listItems.includes(focusedItem)) {
			focusedItem.click();
		}
	}
};

const initialFocus = () => {
	const focusIdentifier = sessionStorage.getItem('listFocus');
	if (focusIdentifier) {
		const focusItem: HTMLElement | null = document.querySelector(`[data-identifier="${focusIdentifier}"]`);
		if (focusItem) {
			focusItem.focus();
		} else {
			listItems[0].focus();
		}
	}
};

const saveFocus = () => {
	const focusedItem = document.activeElement as HTMLAnchorElement;
	if (listItems.includes(focusedItem) && focusedItem.dataset.identifier) {
		sessionStorage.setItem('listFocus', focusedItem.dataset.identifier);
	}
};


// beep
const playBeepSound = () => {
	const focusAudio = new Audio('/audio/select_effect.wav');
	focusAudio.play();
};

const delay = (n: number) => {
	return new Promise((resolve) => setTimeout(resolve, n));
};

const initList = () => {
	listItems.forEach((listItem) => {
		listItem.addEventListener('focus', followScroll);
		listItem.addEventListener('click', saveFocus);
	});

	window.addEventListener('keydown', handleKeyDown);

	calcBoundingRect();
	initialFocus();
};

export { initList };