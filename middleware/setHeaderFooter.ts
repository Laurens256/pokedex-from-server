import { Request, Response, NextFunction } from 'express';
import { generateHeaderFooter } from '../utils/footerHeader';
import { findRoute } from '../utils/findRoute';

const setHeaderFooter = async (req: Request, res: Response, next: NextFunction) => {
	// haal viewname op
	const viewName = (await findRoute(req.url.split('?')[0])).route.viewName;

	const { header, footer } = generateHeaderFooter(viewName);

	res.locals.headings = header;
	res.locals.footerControls = footer;

	next();
};

export { setHeaderFooter };
