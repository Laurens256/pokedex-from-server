import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import hbsHelpers from './utils/handlebars/globalHelpers';
import pokemonHelpers from './utils/handlebars/pokemonHelpers';
import { setHeaderFooter } from './middleware/setHeaderFooter';
import routes from './routes/routes';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

// handlebars stuff
app.engine('handlebars', engine());
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

// middleware for header and footer
app.use(setHeaderFooter);

// routes
routes.forEach((route) => {
	app.use(route.path, route.view);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
