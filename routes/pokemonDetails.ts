import express, { Request } from 'express';
import { getFullPokemonDetails } from '../utils/dataFetch';

const router = express.Router({ mergeParams: true });

export interface ReqWithParams extends Request {
	params: { name: string };
}

router.get('/', async (req: ReqWithParams, res) => {
	const name = req.params.name;

	const test = await getFullPokemonDetails(name);
	console.log(test);

	res.render('pokemonDetails', {
		css: ['pokemon-details'],

	});
});

module.exports = router;
