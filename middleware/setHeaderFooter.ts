import { Request, Response, NextFunction } from 'express';
import { generateHeaderFooter } from '../utils/footerHeader';

const setHeaderFooter = (req: Request, res: Response, next: NextFunction) => {
	let view = '';
	const firstSegment = req.baseUrl.split('/')[1];

	if(firstSegment === 'pokemon' && req.params.name) {
		view = 'pokemonDetails';
	} else {
		view = req.baseUrl;
	}

	const { header, footer } = generateHeaderFooter(view);

	res.locals.headings = header;
	res.locals.footerControls = footer;

	next();
};

export { setHeaderFooter };