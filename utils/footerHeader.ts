const generateHeaderFooter = (_view: string) => {
	// remove leading slash using regexp and split on query string
	const view = _view.replace(/^\/+/, '').split('?')[0];

	let headerFooter: {
		header?: {};
		hasFooter?: boolean;
	} = {};

	if (headers.hasOwnProperty(view)) {
		headerFooter.header = headers[view as keyof typeof headers];
	}
	if (hasFooter.includes(view)) {
		headerFooter.hasFooter = true;
	}

	return headerFooter;
};

const headers = {
	FilterView: ['POKéDEX', 'TABLE OF CONTENTS'],
	PokemonListView: ['POKéMON&nbsp;&nbsp;LIST'],
	PokemonDetailsView: ['POKéMON&nbsp;&nbsp;DETAILS'],
	ErrorView: ['404', 'PAGE NOT FOUND']
};

const hasFooter = [
	'FilterView',
	'PokemonListView',
	'PokemonDetailsView',
	'ErrorView'
];

export { generateHeaderFooter };
