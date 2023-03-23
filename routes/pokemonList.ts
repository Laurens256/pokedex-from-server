import express from 'express';

import {
	getPokemonByRegion,
	getUrlArr,
	idArrFromUrlArr,
	getFullPokemonDetails
} from '../utils/dataFetch';
import { filters } from './filters';
import { Pokemon, PokemonTypes } from '../types';

const router = express.Router();

const possibleHabitats = filters.map((filter) => filter.class);
router.get('/', async (req, res) => {
	let order = req.query.order;
	let habitat = req.query.habitat;

	let pokemonArr: Pokemon[] = [];

	if (habitat && typeof habitat === 'string' && possibleHabitats.includes(habitat)) {
		const urlArr = await getUrlArr();
		const pokemonIdArr = idArrFromUrlArr(urlArr);

		const pokemonDatas = await getFullPokemonDetails(pokemonIdArr);

		pokemonDatas.forEach((pokemonData) => {
			const pokemon = { ...pokemonData[0], ...pokemonData[1] };
			if (pokemon.habitat.name === habitat) {
				pokemonArr.push(pokemon);
			}
		});
	} else {
		pokemonArr = await getPokemonByRegion();
	}

	if(order && typeof order === 'string') {
		pokemonArr = sortPokemonArray(pokemonArr, order);
	}

	res.render('pokemonList', {
		...res.locals,
		js: ['pokemonList'],
		css: ['pokemon-list', 'components/select-item', 'components/type-badges'],
		pokemon: pokemonArr
	});
});

const sortPokemonArray = (pokemonArr: Pokemon[], order: string) => {
	switch (order) {
		case 'numerical':
			pokemonArr.sort((a, b) => a.id - b.id);
			break;

		case 'alphabetical':
			pokemonArr.sort((a, b) =>
				a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
			);
			break;

		case 'lightest':
			pokemonArr.sort((a, b) => a.weight - b.weight);
			break;

		case 'smallest':
			pokemonArr.sort((a, b) => a.height - b.height);
			break;

		case 'type':
			// sorteer op type, dan op secundair type in volgorder van de array PokemonTypes
			pokemonArr.sort((a, b) => {
				const aType1 = a.types[0].type.name;
				const aType2 = a.types[1]?.type.name;
				const bType1 = b.types[0].type.name;
				const bType2 = b.types[1]?.type.name;

				const aType1Index = PokemonTypes.indexOf(aType1);
				const aType2Index = PokemonTypes.indexOf(aType2);
				const bType1Index = PokemonTypes.indexOf(bType1);
				const bType2Index = PokemonTypes.indexOf(bType2);

				if (aType1Index !== bType1Index) {
					return aType1Index - bType1Index;
				}
				if (aType2Index !== bType2Index) {
					return aType2Index - bType2Index;
				}
				return 0;
			});
			break;

		default:
			const habitat = new window.URLSearchParams(window.location.search).get('habitat');
			if (habitat) {
				window.history.replaceState({}, '', `${window.location.pathname}?order=numerical&habitat=${habitat}`);
			} else {
				window.history.replaceState({}, '', `${window.location.pathname}?order=numerical`);
			}
			break;
	}
	return pokemonArr;
};

export default router;
