import { Request, Response, NextFunction } from 'express';
import { findRoute } from '../utils/findRoute';

const setMeta = async (req: Request, res: Response, next: NextFunction) => {
	const view = await findRoute(req.url.split('?')[0]);
	const viewName = view.route.viewName as keyof typeof metaData || 'Fallback';

	if (view.route.viewName === 'PokemonDetailsView') {
		metaData.PokemonDetailsView.title = `POKéDEX | ${view.param?.toUpperCase()}`;
	}

	res.locals.meta = metaData[viewName] ?? metaData.Fallback;
	res.locals.meta.viewName = viewName;

	next();
};

const metaData = {
	FilterView: {
		title: 'POKéDEX | Filters',
		description: 'Filter or sort the Pokémon in the POKéDEX.'
	},
	PokemonDetailsView: {
		title: 'POKéDEX',
		description:
			'Here you can find all the information you need about the Pokémon in the world of Pokémon.'
	},
	PokemonListView: {
		title: 'POKéDEX | Pokémon list',
		description:
			'Here you can find all the information you need about the Pokémon in the world of Pokémon.'
	},
	SplashView: {
		title: 'POKéDEX',
		description:
			'Welcome to the POKéDEX! Here you can find all the information you need about the Pokémon in the world of Pokémon.'
	},
	ErrorView: {
		title: 'POKéDEX | 404',
		description: 'Oops! Something went wrong.'
	},
	Fallback: {
		title: 'POKéDEX',
		description:
			'Welcome to the POKéDEX! Here you can find all the information you need about the Pokémon in the world of Pokémon.'
	}
};

export { setMeta };
