/**
 * Created by doru.muntean on 16/07/17.
 */
var express = require('express');
var router = express.Router();

/* GET test. */
router.get('/:id', function(req, res, next) {
	res.render('test', { output: req.params.id });
});

router.post('/submit', function(req,res,next) {
	var id = req.body.id;
	res.redirect('/test/' + id);
});

module.exports = router;

