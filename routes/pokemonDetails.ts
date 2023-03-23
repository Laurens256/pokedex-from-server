import express, { Request } from 'express';
import { getFullPokemonDetails } from '../utils/dataFetch';
import { Pokemon, Species } from '../types';

const router = express.Router({ mergeParams: true });

export interface ReqWithParams extends Request {
	params: { name: string };
}

router.get('/', async (req: ReqWithParams, res) => {
	const name = req.params.name;

	const pokemonDatas = (await getFullPokemonDetails([name]))[0];

	const pokemon = { ...pokemonDatas[0], ...pokemonDatas[1] };
	const cleanedPokemon = cleanPokemonData(pokemon);

	res.render('pokemonDetails', {
		...res.locals,
		css: ['pokemon-details'],
		js: ['pokemonDetails'],
		pokemon: cleanedPokemon
	});
});

interface FullPokemonData extends Pokemon, Species {}
const cleanPokemonData = (pokemon: FullPokemonData) => {
	const cleanedPokemon = {
		name: pokemon.name,
		id: pokemon.id,
		height: pokemon.height,
		weight: pokemon.weight,
		flavorText: chooseFlavorText(pokemon.flavor_text_entries),
		sprites: pokemon.sprites
	};

	return cleanedPokemon;
};

const chooseFlavorText = (flavorTextEntries: Species['flavor_text_entries']) => {
	const englishEntries = flavorTextEntries.filter(
		(entry) => entry.language.name === 'en'
	);
	const randomEntry = englishEntries[
		Math.floor(Math.random() * englishEntries.length)
	].flavor_text.replace(//g, ' ');

	return randomEntry;
};

export default router;
