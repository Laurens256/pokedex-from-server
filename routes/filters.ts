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
	{ name: 'grassland', class: 'grassland' },
	{ name: 'forest', class: 'forest' },
	{ name: "water's edge", class: 'waters-edge' },
	{ name: 'sea', class: 'sea' },
	{ name: 'cave', class: 'cave' },
	{ name: 'mountain', class: 'mountain' },
	{ name: 'rough-terrain', class: 'rough-terrain' },
	{ name: 'urban', class: 'urban' },
	{ name: 'rare', class: 'rare' }
];

router.get('/', async (req, res) => {
	res.render('filters', {
		...res.locals,
		css: ['filters', '/components/select-item'],
		js: ['filters'],
		sortOrders: sortOrders,
		filters: filters
	});
});

export default router;
export { filters };
