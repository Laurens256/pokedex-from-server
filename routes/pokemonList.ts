import express from 'express';
import { generateHeaderFooter } from '../utils/footerHeader';

import { getPokemonByRegion } from '../utils/dataFetch';

const router = express.Router();

router.get('/', async (req, res) => {
	const pokemon = await getPokemonByRegion();
	const { header, footer } = generateHeaderFooter(req.baseUrl);

	console.log(pokemon);

	res.render('pokemonList', {
		css: ['pokemon-list', 'components/select-item', 'components/type-badges'],
		headings: header,
		footerControls: footer,
		pokemon: pokemon,
	});
});

module.exports = router;
