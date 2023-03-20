const getHeaderEntries = (header: string) => {
	return 'header';
};

const headers = {
	listview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
	},
	detailview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
	},
	filterview: {
		h1: 'POKéDEX',
		h2: 'TABLE OF CONTENTS'
	},
	errorview: {
		h1: '404',
		h2: 'PAGE NOT FOUND'
	}
};

const getFooterEntries = (footer: string) => {
	return 'footer';
};

export { getHeaderEntries, getFooterEntries };