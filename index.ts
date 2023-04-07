import express, { Express, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import path from 'path';

// hbs
import { engine } from 'express-handlebars';
import hbsHelpers from './utils/handlebars/globalHelpers.js';
import pokemonHelpers from './utils/handlebars/pokemonHelpers.js';

// middlewares
import { setHeaderFooter } from './middleware/setHeaderFooter.js';
import { setMeta } from './middleware/meta.js';
import { setCacheHeaders } from './middleware/cache.js';

import routes from './routes/routes.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

// handlebars stuff
app.engine(
	'hbs',
	engine({
		layoutsDir: `${path.join(__dirname)}/views`,
		partialsDir: `${path.join(__dirname)}/views/partials`,
		defaultLayout: 'main',
		extname: '.hbs',
		helpers: { ...hbsHelpers, ...pokemonHelpers }
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(setCacheHeaders);
app.use(compression());
app.use(setHeaderFooter);
app.use(setMeta);

// routes
routes.forEach((route) => {
	app.use(route.path, route.view);
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});