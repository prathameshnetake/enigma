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

module.exports = router;