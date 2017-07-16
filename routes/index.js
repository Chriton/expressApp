var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Form validation', success: req.session.success, errors: req.session.errors });
	req.session.errors = null;
	req.session.success = null;
});

router.post('/submit', function(req,res,next) {
	//check validity
	req.check('email', 'Invalid email address').isEmail();
	req.check('password', 'Password is invalid').isLength({ min: 4}).equals(req.body.confirmPassword);

	var errors = req.getValidationResult();
	if (errors) {
		req.session.errors = errors;
	} else {
		req.session.success = true;
	}

	res.redirect('/');
});

module.exports = router;
