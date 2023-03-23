const footerElement = document.querySelector('footer');
const footerList = footerElement?.querySelector('ul');

const generateFooterControls = (view: string) => {
	if (!footerList || !footerControls.hasOwnProperty(view)) return;

	for (const control of footerControls[view as keyof typeof footerControls]) {
		const li = document.createElement('li');
		li.classList.add(...control.classes);
		li.textContent = control.text;
		footerList.appendChild(li);
	}
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

export { generateFooterControls };