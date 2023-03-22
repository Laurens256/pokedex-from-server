import { Pokemon, Species } from '../types';

let pokemonArr: Pokemon[] | Promise<Pokemon[]>;

const baseApiUrl = 'https://pokeapi.co/api/v2/';
const defaultRegion = 'kanto';

// generieke function om data op te halen
const getDataFromAPI = async (query: string) => {
	const url = query.includes('//') ? query : baseApiUrl + query;
	return await (await fetch(url)).json();
};

// function om volledige pokemon details op te halen (pokemon + pokemon-species)
const getFullPokemonDetails = async (names: string[]) => {
	const promises = names.map(async (name: string) => {
		const pokemonSpecies: Promise<Species> = getDataFromAPI(`pokemon-species/${name}`);
		const pokemon: Promise<Pokemon> = getDataFromAPI(`pokemon/${name}`);

		return Promise.all([pokemonSpecies, pokemon]);
	});

	return Promise.all(promises);
};

// function om pokemon per region op te halen
const getPokemonByRegion = async (regionStr: string = defaultRegion) => {
	if (pokemonArr) {
		return pokemonArr;
	}

	const urlArr: string[] = await getUrlArr(regionStr);
	const pokemonIdArr: string[] = idArrFromUrlArr(urlArr);

	const promises: Promise<Pokemon>[] = pokemonIdArr.map(async (id: string) => {
		return getDataFromAPI(`pokemon/${id}`);
	});

	pokemonArr = Promise.all(promises);

	return Promise.all(promises);
};

// haalt lijst met urls op van pokemon per region
const getUrlArr = async (regionStr: string = defaultRegion) => {
	const urlArr: string[] = (await getDataFromAPI(`pokedex/${regionStr}`)).pokemon_entries.map(
		(entry: { pokemon_species: { url: string; }; }) => entry.pokemon_species.url
	);
	return urlArr;
};

// hele wacky manier om de id's te krijgen maar zorgt ervoor dat we geen extra request naar pokemon-species hoeven te doen
const idArrFromUrlArr = (urlArr: string[]) => {
	return urlArr.map((url: string) => {
		return url.split('/')[url.split('/').length - 2];
	});
};

export { getPokemonByRegion, getFullPokemonDetails };
