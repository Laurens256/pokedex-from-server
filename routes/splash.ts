import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('splash', { css: ['splash'] });
});


module.exports = router;