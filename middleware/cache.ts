import { Request, Response, NextFunction } from 'express';

const setCacheHeaders = (req: Request, res: Response, next: NextFunction) => {
	const timeInSeconds = 60 * 60 * 24; // 1 day

	if (req.method == 'GET') {
		res.set('Cache-control', `public, max-age=${timeInSeconds}`);
	}

	next();
};

export { setCacheHeaders };
