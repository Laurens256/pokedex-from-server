import express from 'express';
import { generateHeaderFooter } from '../utils/footerHeader';

const router = express.Router();

const sortOrders = [
	{ name: 'numerical', class: 'numerical' },
	{ name: 'smallest', class: 'smallest' },
	{ name: 'lightest', class: 'lightest' },
	{ name: 'type', class: 'type' },
	{ name: 'a to z', class: 'alphabetical' }
];

const filters = [
	{ name: 'rare', class: 'rare' },
	{ name: 'urban', class: 'urban' },
	{ name: 'rough-terrain', class: 'rough-terrain' },
	{ name: 'mountain', class: 'mountain' },
	{ name: 'cave', class: 'cave' },
	{ name: 'sea', class: 'sea' },
	{ name: "water's edge", class: 'waters-edge' },
	{ name: 'forest', class: 'forest' },
	{ name: 'grassland', class: 'grassland' }
];

router.get('/', async (req, res) => {
	const { header, footer } = generateHeaderFooter(req.baseUrl);
	res.render('filters', {
		css: ['filters', '/components/select-item'],
		headings: header,
		footerControls: footer,
		sortOrders: sortOrders,
		filters: filters
	});
});

module.exports = router;
