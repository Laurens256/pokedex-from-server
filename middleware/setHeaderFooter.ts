import { Request, Response, NextFunction } from 'express';
import { generateHeaderFooter } from '../utils/footerHeader.js';
import { findRoute } from '../utils/findRoute.js';

const setHeaderFooter = async (req: Request, res: Response, next: NextFunction) => {
	// haal viewname op
	const viewName = (await findRoute(req.url.split('?')[0])).route.viewName;

	const { header, hasFooter } = generateHeaderFooter(viewName);

	res.locals.headings = header;
	res.locals.hasFooter = hasFooter;

	next();
};

export { setHeaderFooter };
