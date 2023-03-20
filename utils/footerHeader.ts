const generateHeaderFooter = (_view: string) => {
	// haalt slashes weg uit viewname, nog testen voor nested views
	const view = _view.replace(/\//g, '');

	let headerFooter: {
		header?: {};
		footer?: {};
	} = {};

	if (headers.hasOwnProperty(view)) {
		headerFooter.header = headers[view as keyof typeof headers];
	}
	if (headers.hasOwnProperty(view)) {
		headerFooter.footer = footerControls[view as keyof typeof footerControls];
	}

	return headerFooter;
};

const headers = {
	filters: ['POKéDEX', 'TABLE OF CONTENTS'],
	pokemon: {
		h1: 'POKéMON&nbsp;&nbsp;LIST'
	}
};

const footerControls = {
	pokemon: [
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' },
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
	],
	// detailview: [
	// 	{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' },
	// 	{ classes: ['control-icon', 'd-pad', 'right', 'left'], text: 'SWITCH', key: 'ArrowRight' },
	// 	{ classes: ['control-icon', 'space-bar'], text: 'CRY', key: ' ' },
	// ],
	filters: [
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
	],
	// errorview: [
	// 	{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
	// 	{ classes: ['control-icon', 'd-pad', 'horizontal'], text: 'PICK', key: 'ArrowRight' },
	// ]
};

export { generateHeaderFooter };
