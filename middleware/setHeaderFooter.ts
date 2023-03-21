import { Request, Response, NextFunction } from 'express';
import { generateHeaderFooter } from '../utils/footerHeader';

const setHeaderFooter = (req: Request, res: Response, next: NextFunction) => {
	let view = '';
	const segments = req.url.split('/').filter((segment) => segment !== '');

	if(segments[0] === 'pokemon' && segments[1]) {
		view = 'pokemonDetails';
	} else {
		view = req.url;
	}

	const { header, footer } = generateHeaderFooter(view);

	res.locals.headings = header;
	res.locals.footerControls = footer;

	next();
};

export { setHeaderFooter };