import filters from '../routes/filters';
import pokemonDetails from '../routes/pokemonDetails';
import pokemonList from '../routes/pokemonList';
import splash from '../routes/splash';
import error from '../routes/error';

const routes = [
	{ path: '/filters', view: filters },
	{ path: '/pokemon/:name', view: pokemonDetails },
	{ path: '/pokemon', view: pokemonList },
	{ path: '/', view: splash },
	{ path: '*', view: error }
];

export default routes;