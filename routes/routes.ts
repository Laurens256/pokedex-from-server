import filters from '../routes/filters';
import pokemonDetails from '../routes/pokemonDetails';
import pokemonList from '../routes/pokemonList';
import splash from '../routes/splash';
import error from '../routes/error';

const routes = [
	{ path: '/filters', view: filters, viewName: 'FilterView' },
	{ path: '/pokemon/:name', view: pokemonDetails, viewName: 'PokemonDetailsView' },
	{ path: '/pokemon', view: pokemonList, viewName: 'PokemonListView' },
	{ path: '/', view: splash, viewName: 'SplashView' },
	{ path: '*', view: error, viewName: 'ErrorView' }
];

export default routes;