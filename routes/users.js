const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Get Login page
// 
passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
 }));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
router.get('/login', (req, res) => {
	res.render("login")
});



router.post('/login', (req, res) => {
	const username = req.sanitize('username').escape().trim()
	const password = req.sanitize('password').escape().trim()
	req.checkBody("username")
		.notEmpty().withMessage("Username Should not be empty")
	req.checkBody("password")
		.notEmpty().withMessage("Name Should not be empty")
	const errors = req.validationErrors();
	if(errors){
		console.log(errors)
		res.redirect("/users/login")
	}
	else{
		passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login'}),
  		(req, res) => {
    		res.redirect('/');
  		}
	}
	res.redirect("/users/login")
	console.log(req.body)
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
		const newUser = new User(data)
		User.createUser(newUser, (err, res) => {
			if(err) throw err
			console.log("New user added to db")
			console.log(res)
		})
		res.send("values accepted" + JSON.stringify(data))
	}

})
module.exports = router;