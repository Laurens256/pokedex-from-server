import express from 'express';

import { getPokemonByRegion } from '../utils/dataFetch';

const router = express.Router();

router.get('/', async (req, res) => {
	const pokemon = await getPokemonByRegion();

	res.render('pokemonList', {
		...res.locals,
		css: ['pokemon-list', 'components/select-item', 'components/type-badges'],
		pokemon: pokemon,
	});
});

export default router;
