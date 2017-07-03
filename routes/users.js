var express = require('express');
var router = express.Router();
// Get Login page
router.get('/login', (req, res) => {
	res.render("login")
})

router.post('/login', (req, res) => {
	console.log(req.body)
	res.send("Login data recieved");
})

// Get registe page
router.get('/register', (req, res) => {
	res.render("register")
})

router.post('/register', (req, res) => {
	// get data from the user
	const name = req.sanitize('name').escape().trim()
	const username = req.sanitize('username').escape().trim()
	const email = req.sanitize('email').escape().trim()
	const password = req.sanitize('password').escape().trim()
	const password2 = req.sanitize('password2').escape().trim()

	req.assert('email', 'Invalid mail')
		.notEmpty().withMessage('Email should not be empty')
		.isEmail()
	req.checkBody("name")
		.notEmpty().withMessage("Name Should not be empty")
	req.checkBody("username")
		.notEmpty().withMessage("Username Should not be empty")
	req.checkBody("password")
		.notEmpty().withMessage("Name Should not be empty")
		.equals(password2).withMessage("Password do not match")

	const errors = req.validationErrors();

	const data = {
		name,
		username,
		email,
		password
	}

	if(errors){
		console.log(errors)
		res.redirect("/users/register")
	}
	else{
		console.log("All clear ready to go");
		console.log(data);
		res.send("values accepted" + JSON.stringify(data))
	}

})
module.exports = router;