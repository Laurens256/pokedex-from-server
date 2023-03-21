const generateHeaderFooter = (_view: string) => {
	// remove leading slash using regexp and split on query string
	const view = _view.replace(/^\/+/, '').split('?')[0];

	let headerFooter: {
		header?: {};
		footer?: {};
	} = {};

	if (headers.hasOwnProperty(view)) {
		headerFooter.header = headers[view as keyof typeof headers];
	}
	if (footerControls.hasOwnProperty(view)) {
		headerFooter.footer = footerControls[view as keyof typeof footerControls];
	}

	return headerFooter;
};

const headers = {
	filters: ['POKéDEX', 'TABLE OF CONTENTS'],
	pokemon: ['POKéMON&nbsp;&nbsp;LIST'],
	pokemonDetails: ['POKéMON&nbsp;&nbsp;DETAILS'],
	error: ['404', 'PAGE NOT FOUND']
};

const footerControls = {
	filters: [
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' }
	],
	pokemon: [
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' }
	],
	pokemonDetails: [
		{ classes: ['control-icon', 'space-bar'], text: 'CRY', key: ' ' },
		{
			classes: ['control-icon', 'd-pad', 'right', 'left'],
			text: 'SWITCH',
			key: 'ArrowRight'
		},
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' }
	],
	error: [
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'horizontal'], text: 'PICK', key: 'ArrowRight' }
	]
};

export { generateHeaderFooter };
