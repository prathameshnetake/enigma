var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	 if(req.isAuthenticated()){
	 	res.render('index', {user: req.user});
	 }
	 else{
	 	res.redirect('/users/login')
	 }
	
});
module.exports = router;