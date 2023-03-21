import express from 'express';

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
	res.render('filters', {
		...res.locals,
		css: ['filters', '/components/select-item'],
		js: ['filters', 'generalList'],
		sortOrders: sortOrders,
		filters: filters
	});
});

export default router;