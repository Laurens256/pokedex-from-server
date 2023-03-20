import express, { Express, Request, Response } from 'express';
import path from 'path';
import { engine } from 'express-handlebars';

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.engine('handlebars', engine());
app.engine(
	'hbs',
	engine({
		layoutsDir: `${path.join(__dirname)}/views`,
		partialsDir: `${path.join(__dirname)}/views/partials`,
		defaultLayout: 'main',
		extname: '.hbs'
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

// app.get('/', (req, res) => {
// 	res.render('splash', { title: 'Home' });
// });

app.use(express.static(path.join(__dirname, 'public')));
// ================================
// 				routes
// ================================
app.use('/', require('./routes/splash'));


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
