const init = () => {
	const currentViewEl: HTMLMetaElement | null = document.querySelector(
		'head meta[name="currentView"]'
	);
	if (currentViewEl) {
		const currentView = currentViewEl.content;
		generateFooterControls(currentView);
	}
	window.addEventListener('load', registerServiceWorker);
};

const registerServiceWorker = async () => {
	// Check if the browser supports service workers
	if ('serviceWorker' in navigator) {
		// Register the service worker
		try {
			await navigator.serviceWorker.register('/service-worker.js');
		} catch (error) {
			console.error('Service worker registration failed:', error);
		}
	}
};

const footerElement = document.querySelector('footer');
const footerList = footerElement?.querySelector('ul');

const generateFooterControls = (view: string) => {
	if (!footerList || !footerControls.hasOwnProperty(view)) return;

	for (const control of footerControls[view as keyof typeof footerControls]) {
		const li = document.createElement('li');
		const button = document.createElement('button');
		button.textContent = control.text;
		li.classList.add(...control.classes);

		setControl(button, control.key);

		li.appendChild(button);
		footerList.appendChild(li);
	}
};

const setControl = (element: HTMLButtonElement, key: string) => {
	element.addEventListener('mousedown', (e) => {
		e.preventDefault();
		const event = new KeyboardEvent('keydown', { key });
		window.dispatchEvent(event);
	});
};

const footerControls = {
	FilterView: [
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' }
	],
	PokemonListView: [
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' }
	],
	PokemonDetailsView: [
		{ classes: ['control-icon', 'space-bar'], text: 'CRY', key: ' ' },
		{
			classes: ['control-icon', 'd-pad', 'right', 'left'],
			text: 'SWITCH',
			key: 'ArrowRight'
		},
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' }
	],
	ErrorView: [
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'horizontal'], text: 'PICK', key: 'ArrowRight' }
	]
};

init();
