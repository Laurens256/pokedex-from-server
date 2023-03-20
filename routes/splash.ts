import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('splash', { css: ['splash'], js: ['splash'] });
});

module.exports = router;
