import filters from '../routes/filters.js';
import pokemonDetails from '../routes/pokemonDetails.js';
import pokemonList from '../routes/pokemonList.js';
import splash from '../routes/splash.js';
import error from '../routes/error.js';

const routes = [
	{ path: '/filters', view: filters, viewName: 'FilterView' },
	{ path: '/pokemon/:name', view: pokemonDetails, viewName: 'PokemonDetailsView' },
	{ path: '/pokemon', view: pokemonList, viewName: 'PokemonListView' },
	{ path: '/', view: splash, viewName: 'SplashView' },
	{ path: '*', view: error, viewName: 'ErrorView' }
];

export default routes;