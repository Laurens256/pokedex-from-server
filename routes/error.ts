import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
	res.render('error', {
		...res.locals,
		css: ['error'],
	});
});

export default router;