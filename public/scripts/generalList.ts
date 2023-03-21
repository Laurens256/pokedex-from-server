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
	// playBeepSound();
	// followScroll();
	
	// await delay(90);
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

	console.log(focusedItemIndex);

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


const init = () => {
	listItems.forEach((listItem) => {
		listItem.addEventListener('focus', followScroll);
	});
	calcBoundingRect();
};

init();