import { Pokemon, Species } from '../types';

const baseApiUrl = 'https://pokeapi.co/api/v2/';
const defaultRegion = 'kanto';
const getDataFromAPI = async (query: string) => {
	const url = query.includes('//') ? query : baseApiUrl + query;
	return await (await fetch(url)).json();
};

const getFullPokemonDetails = async (name: string) => {
	const pokemonSpecies: Promise<Species> = getDataFromAPI(`pokemon-species/${name}`);
	const pokemon: Promise<Pokemon> = getDataFromAPI(`pokemon/${name}`);

	return Promise.all([pokemonSpecies, pokemon]);
};

const getPokemonByRegion = async (regionStr: string = defaultRegion) => {
	const urlArr: string[] = (await getDataFromAPI(`pokedex/${regionStr}`)).pokemon_entries.map(
		(entry: { pokemon_species: { url: string; }; }) => entry.pokemon_species.url
	);

	const pokemonIdArr: string[] = idArrFromUrlArr(urlArr);

	const promises: Promise<Pokemon>[] = pokemonIdArr.map(async (id: string) => {
		return getDataFromAPI(`pokemon/${id}`);
	});

	return Promise.all(promises);
};

// hele wacky manier om de id's te krijgen maar zorgt ervoor dat we geen extra request naar pokemon-species hoeven doen
const idArrFromUrlArr = (urlArr: string[]) => {
	return urlArr.map((url: string) => {
		return url.split('/')[url.split('/').length - 2];
	});
};

export { getPokemonByRegion, getFullPokemonDetails };
